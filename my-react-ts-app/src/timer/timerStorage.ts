const KEY_PREFIX = 'schnitzeljagd.timer.';

export interface StoredTimer {
  startedAt: number;
  /** Only stored for the test timer, whose duration is not in the config */
  durationMs?: number;
}

function keyFor(hash: string): string {
  return KEY_PREFIX + hash;
}

function safeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStoredTimer(hash: string): StoredTimer | null {
  const storage = safeStorage();
  if (!storage) return null;
  const raw = storage.getItem(keyFor(hash));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredTimer>;
    if (typeof parsed.startedAt !== 'number') return null;
    return {
      startedAt: parsed.startedAt,
      durationMs:
        typeof parsed.durationMs === 'number' ? parsed.durationMs : undefined,
    };
  } catch {
    return null;
  }
}

export function readStartedAt(hash: string): number | null {
  return readStoredTimer(hash)?.startedAt ?? null;
}

export function startTimer(hash: string, durationMs?: number): StoredTimer {
  const existing = readStoredTimer(hash);
  if (existing) return existing;
  const payload: StoredTimer = { startedAt: Date.now() };
  if (durationMs !== undefined) payload.durationMs = durationMs;
  safeStorage()?.setItem(keyFor(hash), JSON.stringify(payload));
  return payload;
}

export function clearAllTimers(): number {
  const storage = safeStorage();
  if (!storage) return 0;
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && key.startsWith(KEY_PREFIX)) keys.push(key);
  }
  keys.forEach((k) => storage.removeItem(k));
  return keys.length;
}
