import type {
  ProgressMap,
  Question,
  QuestionProgress,
  RoundSettings,
} from '../types';

const STORAGE_KEY = 'regeltest.progress.v1';
export const MAX_BOX = 5;
export const WEAK_BOX = 2;

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed ? (parsed as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Speicher blockiert (Private Window etc.): App läuft ohne Persistenz weiter
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorieren
  }
}

export function boxOf(map: ProgressMap, id: string): number {
  return map[id]?.box ?? 1;
}

export function recordAnswer(
  map: ProgressMap,
  id: string,
  known: boolean,
): ProgressMap {
  const prev: QuestionProgress = map[id] ?? {
    box: 1,
    seen: 0,
    right: 0,
    wrong: 0,
    last: 0,
  };
  const next: QuestionProgress = {
    box: known ? Math.min(MAX_BOX, prev.box + 1) : 1,
    seen: prev.seen + 1,
    right: prev.right + (known ? 1 : 0),
    wrong: prev.wrong + (known ? 0 : 1),
    last: Date.now(),
  };
  return { ...map, [id]: next };
}

export interface Stats {
  total: number;
  unseen: number;
  weak: number;
  learning: number;
  strong: number;
}

export function computeStats(questions: Question[], map: ProgressMap): Stats {
  const s: Stats = {
    total: questions.length,
    unseen: 0,
    weak: 0,
    learning: 0,
    strong: 0,
  };
  for (const q of questions) {
    const p = map[q.id];
    if (!p) s.unseen++;
    else if (p.box === 1) s.weak++;
    else if (p.box < MAX_BOX) s.learning++;
    else s.strong++;
  }
  return s;
}

export function filterPool(
  questions: Question[],
  map: ProgressMap,
  settings: RoundSettings,
): Question[] {
  return questions.filter((q) => {
    if (settings.topics.length && !settings.topics.includes(q.topic))
      return false;
    if (settings.mode === 'weak' && boxOf(map, q.id) > WEAK_BOX) return false;
    return true;
  });
}

// Gewichtete Ziehung ohne Zurücklegen: Gewicht = 6 - Box, d.h. neue/schwache Fragen kommen öfter.
export function pickRound(
  pool: Question[],
  map: ProgressMap,
  size: number,
): Question[] {
  const remaining = pool.map((q) => ({ q, w: MAX_BOX + 1 - boxOf(map, q.id) }));
  const target = size > 0 ? Math.min(size, remaining.length) : remaining.length;
  const picked: Question[] = [];
  while (picked.length < target && remaining.length) {
    const total = remaining.reduce((sum, r) => sum + r.w, 0);
    let roll = Math.random() * total;
    let idx = 0;
    for (; idx < remaining.length; idx++) {
      roll -= remaining[idx].w;
      if (roll < 0) break;
    }
    const [hit] = remaining.splice(Math.min(idx, remaining.length - 1), 1);
    picked.push(hit.q);
  }
  return shuffle(picked);
}

export function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
