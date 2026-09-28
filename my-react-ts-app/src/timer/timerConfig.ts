export interface TimerDefinition {
  /** URL segment: /timer/<hash> */
  hash: string;
  /** Shown while waiting and counting down */
  label: string;
  minutes: number;
  /** Shown once the countdown reaches zero */
  message: string;
}

export const RESET_PATH_SEGMENT = 'reset';
/** /timer/test lets you pick the minutes yourself, for trying things out */
export const TEST_PATH_SEGMENT = 'test';

export const TIMERS: readonly TimerDefinition[] = [
  {
    hash: 'n4w8p2',
    label: 'Aufgabe 1',
    minutes: 2,
    message: 'Im schwarzen Necessaire ist der nächste Brief.',
  },
  {
    hash: 'q2m8x4',
    label: 'Aufgabe 2 - Escape Game',
    minutes: 10,
    message:
      'Der nächste Brief befindet sich in dem kleinen Schaltschrank auf dem Router bzw. der Fritzbox.',
  },
  {
    hash: 'a7f3k9',
    label: 'Aufgabe 3 - Infos beschaffen',
    minutes: 10,
    message: 'Der nächste Hinweis liegt im Bücherregal.',
  },
  {
    hash: 'z5t1r7',
    label: 'Aufgabe 4 - Höhepunkt',
    minutes: 3,
    message:
      'Der nächste Hinweis liegt im linken Fach des vorderen Fahrersitzes.',
  },
];

export function findTimer(hash: string): TimerDefinition | undefined {
  return TIMERS.find((t) => t.hash === hash);
}
