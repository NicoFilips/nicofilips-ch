import { useEffect } from 'react';

/**
 * Alarm, sobald ein Timer abläuft: Ton, Vibration, System-Benachrichtigung,
 * und während des Countdowns den Bildschirm wach halten.
 *
 * Grenzen: Ist der Tab geschlossen oder das Handy gesperrt, kann die Seite
 * nichts auslösen (kein Push-Server). Auf iOS gibt es Web-Benachrichtigungen
 * nur als Home-Screen-App; Ton und Wake Lock funktionieren dort aber.
 */

let audioCtx: AudioContext | null = null;

/**
 * Im Klick auf "Timer starten" aufrufen. Die Nutzergeste entsperrt Audio
 * (nötig auf iOS) und erlaubt die Abfrage der Benachrichtigungs-Berechtigung.
 */
export function prepareAlerts(): void {
  if (notificationState() === 'default') {
    void Notification.requestPermission();
  }
  try {
    // iOS 17+: Ton auch bei umgelegtem Stummschalter abspielen
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = 'playback';
    audioCtx ??= new AudioContext();
    void audioCtx.resume();
  } catch {
    // kein Web Audio verfügbar, Alarm läuft dann ohne Ton
  }
}

export type NotificationState = NotificationPermission | 'unsupported';

/** Aktueller Stand der Benachrichtigungs-Berechtigung für diese Seite. */
export function notificationState(): NotificationState {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

/** Aus einem Klick aufrufen: fragt die Berechtigung ab und liefert den neuen Stand. */
export async function requestNotifications(): Promise<NotificationState> {
  if (notificationState() === 'unsupported') return 'unsupported';
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}

function beep(ctx: AudioContext, at: number, freq: number, dur: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(0.6, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

/** Beim Ablauf aufrufen: dreifacher Signalton, Vibration, Benachrichtigung. */
export function fireAlerts(title: string, body: string): void {
  if (audioCtx) {
    try {
      void audioCtx.resume();
      const t = audioCtx.currentTime + 0.05;
      for (let i = 0; i < 3; i++) {
        beep(audioCtx, t + i * 0.55, 880, 0.18);
        beep(audioCtx, t + i * 0.55 + 0.2, 1175, 0.28);
      }
    } catch {
      // Ton nicht möglich, Rest läuft weiter
    }
  }
  try {
    navigator.vibrate?.([300, 150, 300, 150, 700]);
  } catch {
    // kein Vibrationsmotor
  }
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, { body, tag: 'schnitzeljagd-timer' });
    } catch {
      // iOS Safari ohne Home-Screen-App wirft hier
    }
  }
}

/** Hält den Bildschirm wach, solange `active` true ist. */
export function useWakeLock(active: boolean): void {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return;
    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    const acquire = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        sentinel = await navigator.wakeLock.request('screen');
        if (cancelled) await sentinel.release();
      } catch {
        // z.B. Energiesparmodus: dann eben ohne Wake Lock
      }
    };
    const onVisibility = () => void acquire();

    void acquire();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      void sentinel?.release();
    };
  }, [active]);
}
