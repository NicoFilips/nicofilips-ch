export type { Question, QuestionImage, Topic } from './lib/parse';

export interface QuestionProgress {
  box: number; // 1 (neu/schwach) … 5 (sicher)
  seen: number;
  right: number;
  wrong: number;
  last: number; // Unix ms
}

export type ProgressMap = Record<string, QuestionProgress>;

export type Screen = 'start' | 'round' | 'summary' | 'cheatsheet';

export type RoundMode = 'all' | 'weak';

export interface RoundSettings {
  topics: string[]; // leer = alle
  size: number; // 0 = alle
  mode: RoundMode;
}

export interface RoundResult {
  questionId: string;
  known: boolean;
}
