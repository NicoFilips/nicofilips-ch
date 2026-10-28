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
    minutes: 5,
    message:
      'Der nächste Hinweis befindet sich im Bad. Dort räume ich oft Dinge rein und raus.',
  },
  {
    hash: 'q2m8x4',
    label: 'Aufgabe 2',
    minutes: 10,
    message:
      'Der nächste Hinweis liegt im Keller. Dort wirst du etwas suchen müssen. Tipp: Es hat etwas mit der Hochzeit zu tun, auf der wir waren. 👠',
  },
  {
    hash: 'a7f3k9',
    label: 'Aufgabe 3',
    minutes: 20,
    message:
      'Der nächste Hinweis befindet sich irgendwo in dem kleinen Kleider- und Schuhschrank neben der Küche.',
  },
  {
    hash: 'z5t1r7',
    label: 'Aufgabe 4',
    minutes: 7,
    message:
      'Der letzte Hinweis befindet sich irgendwo auf der Rückbank meines Teslas. Du wirst meinen Schlüssel brauchen. Benutz einfach die Schlüsselkarte und halte sie mit der Gummihülle kontaktlos an die B-Säule der Beifahrertür. Die Teslakarte ist etwas versteckt an dem kleinen Regal hier im Wohnzimmer neben der Balkontür.',
  },
  {
    hash: 'h6c9v3',
    label: 'Aufgabe 5',
    minutes: 5,
    message: 'Der nächste Hinweis folgt.',
  },
];

export function findTimer(hash: string): TimerDefinition | undefined {
  return TIMERS.find((t) => t.hash === hash);
}
