export type AppMode = 'home' | 'video' | 'audio';

export type InteractionState = 
  | 'idle' 
  | 'listening' 
  | 'analyzing' 
  | 'feedback' 
  | 'comfort';

export type EmotionState = 'calm' | 'anxious' | 'tired' | 'happy' | null;

export interface SessionData {
  state: InteractionState;
  emotion: EmotionState;
}
