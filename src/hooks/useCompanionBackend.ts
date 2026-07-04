import { useState, useEffect, useRef, useCallback } from 'react';
import { EmotionState, InteractionState } from '../types';
import { encodeWAV } from '../lib/audioUtils';

const WS_URL = 'wss://ai-health-app.online/ws/companion';

export function useCompanionBackend(
  isActive: boolean,
  mode: 'video' | 'audio',
  onEmotionUpdate: (emotion: EmotionState, state: InteractionState) => void
) {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: mode === 'video',
        audio: true
      });
      streamRef.current = stream;
      if (videoRef && mode === 'video') {
        videoRef.srcObject = stream;
      }

      // Prepare Audio Context for resampling
      const audioCtx = new AudioContext({ sampleRate: 16000 });

      // WebSocket
      wsRef.current = new WebSocket(WS_URL);
      wsRef.current.onopen = () => {
        console.log('WS connected');
        onEmotionUpdate(null, 'listening');
      };
      
      wsRef.current.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.ok && data.type === 'companion_result') {
            const label = data.fusion_emotion?.label || data.audio_emotion?.label || data.face_emotion?.label;
            if (label) {
              const mappedEmotion = mapBackendEmotion(label);
              onEmotionUpdate(mappedEmotion, 'feedback');
            }
          }
        } catch (err) {
          console.error('Failed to parse WS message', err);
        }
      };

      // Set up Canvas for video frames
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
      }

      // Setup MediaRecorder for audio chunks
      const audioStream = new MediaStream(stream.getAudioTracks());
      const options = MediaRecorder.isTypeSupported('audio/webm') 
        ? { mimeType: 'audio/webm' } 
        : (MediaRecorder.isTypeSupported('audio/mp4') ? { mimeType: 'audio/mp4' } : undefined);
      
      mediaRecorderRef.current = options ? new MediaRecorder(audioStream, options) : new MediaRecorder(audioStream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      mediaRecorderRef.current.onstop = async () => {
        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current?.mimeType || 'audio/webm' });
          audioChunksRef.current = [];
          
          try {
            // Convert to WAV
            const arrayBuffer = await blob.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            const pcmData = audioBuffer.getChannelData(0);
            const base64Wav = encodeWAV(pcmData, 16000);
            
            sendDataToBackend(base64Wav);
          } catch (err) {
            console.error('Audio processing error', err);
          }
        }
        
        // Restart recording if still active
        if (streamRef.current) {
          mediaRecorderRef.current?.start();
          setTimeout(() => {
            if (mediaRecorderRef.current?.state === 'recording') {
              mediaRecorderRef.current.stop();
            }
          }, 4000);
        }
      };

      // Start initial audio recording
      mediaRecorderRef.current.start();
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 4000);

      // Video Frame Capture Interval
      const videoInterval = setInterval(() => {
        if (mode !== 'video') return;
        if (!videoRef || videoRef.readyState < 2) return;
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = videoRef.videoWidth;
          canvas.height = videoRef.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
            // Optionally, we could send video frame more frequently, but let's sync with audio for now
            // or just send it if audio is not ready. But backend requires user_text.
          }
        }
      }, 1000);

      let lastReplyTime = Date.now();

      const sendDataToBackend = (audioBase64: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        
        let imageBase64 = undefined;
        if (mode === 'video' && canvasRef.current) {
          imageBase64 = canvasRef.current.toDataURL('image/jpeg', 0.8);
        }
        
        onEmotionUpdate(null, 'analyzing');

        const now = Date.now();
        const requestReply = now - lastReplyTime >= 10000;
        if (requestReply) {
          lastReplyTime = now;
        }

        wsRef.current.send(JSON.stringify({
          user_text: "请根据我当前情绪给出简短陪伴回复",
          audio_base64: audioBase64,
          audio_format: "wav",
          image_base64: imageBase64,
          request_reply: requestReply
        }));
      };

      return () => {
        clearInterval(videoInterval);
        audioCtx.close();
      };
    } catch (err) {
      console.error('Failed to start media', err);
    }
  }, [isActive, mode, videoRef, onEmotionUpdate]);

  useEffect(() => {
    if (isActive) {
      const cleanup = startMedia();
      return () => {
        cleanup.then(fn => fn && fn());
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      };
    }
  }, [isActive, startMedia]);

  return {
    setVideoRef
  };
}

function mapBackendEmotion(label: string): EmotionState {
  const l = label.toLowerCase();
  if (['happy', 'joy'].includes(l)) return 'happy';
  if (['sad', 'tired', 'disgust'].includes(l)) return 'tired';
  if (['fear', 'angry', 'anxious'].includes(l)) return 'anxious';
  return 'calm'; // neutral or default
}
