export type Topic =
  | 'Anspielort'
  | 'Icing'
  | 'Offside'
  | 'Tor'
  | 'Penalty'
  | 'Strafen'
  | 'Torhüter'
  | 'Ausrüstung'
  | 'Time-Out'
  | 'Allgemein'
  | 'Situationen';

export interface QuestionImage {
  /** Frage-Teil des Screenshots (Situationstabelle, Frage, Optionen) */
  question: string;
  /** Antwort-Teil des Screenshots (beiger Balken) */
  answer: string;
  width: number;
  height: number;
  answerWidth: number;
  answerHeight: number;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  topic: Topic;
  uncertain: boolean;
  /** Gesetzt bei Bildfragen (Strafen-Situationen) */
  image?: QuestionImage;
}

export interface ParseResult {
  cheatsheet: string;
  questions: Question[];
  stats: {
    formatA: number;
    formatB: number;
    duplicates: number;
    uncertain: number;
    perTopic: Record<string, number>;
  };
  warnings: string[];
}

const ANSWER_MARKER = 'Die richtige Antwort ist:';

const DETAILS_RE =
  /\*\*Frage:\*\*\s*([\s\S]*?)<details>\s*<summary>Antwort anzeigen<\/summary>\s*([\s\S]*?)<\/details>/g;

function cleanText(raw: string): string {
  return raw
    .replace(/\u00a0/g, ' ')
    .replace(/\*\*/g, '')
    .replace(/Wählen Sie eine Antwort:?/g, '')
    .replace(/Entscheid\s*\?\s*Entscheid\s*\?/g, 'Entscheid?')
    .replace(/[ \t]+/g, ' ')
    .replace(/ ([.,?!])/g, '$1')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .replace(/\s*\?\s*$/, '?')
    .trim();
}

export function normalizeKey(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

// djb2 as hex; stable across runs and runtimes, no crypto import needed in the browser.
export function hashId(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

const TOPIC_RULES: Array<[Topic, RegExp]> = [
  ['Icing', /\bicing\b/i],
  ['Offside', /\boffside\b|\babseits\b/i],
  ['Penalty', /penalty/i],
  ['Time-Out', /time-?\s?out/i],
  [
    'Anspielort',
    /wo (findet|erfolgt|wird) .*(anspiel|angespielt)|anspielort|\bEAP\b|spielfeldmitte|neutrale zone, nähe/i,
  ],
  ['Tor', /tor gültig|kein tor|zugesprochenes tor|tor ungültig|ist das tor/i],
  ['Torhüter', /torhüter|goalie/i],
  [
    'Ausrüstung',
    /ausrüstung|helm|visier|stockschaufel|ellbogenschoner|ellenbogenschoner|kinnband|trikot|tenue|schlittschuh/i,
  ],
  [
    'Strafen',
    /strafe|\bSPD\b|\bDIS\b|\bKLS\b|\b2'|\b5'|bestraf|verwarn|rapport/i,
  ],
];

export function classify(question: string, answer: string): Topic {
  const text = `${question}\n${answer}`;
  for (const [topic, re] of TOPIC_RULES) {
    if (re.test(text)) return topic;
  }
  return 'Allgemein';
}

export function parseRegeltest(markdown: string): ParseResult {
  const warnings: string[] = [];
  const firstAnswer = markdown.indexOf(ANSWER_MARKER);
  if (firstAnswer < 0)
    throw new Error(`Marker "${ANSWER_MARKER}" nicht gefunden`);

  const head = markdown.slice(0, firstAnswer);
  const lastRule = head.lastIndexOf('\n-----');
  const cheatsheetEnd =
    lastRule >= 0 ? markdown.indexOf('\n', lastRule + 1) : 0;
  const cheatsheet = cleanCheatsheet(markdown.slice(0, cheatsheetEnd));
  let body = markdown.slice(cheatsheetEnd);

  const raw: Array<{ question: string; answer: string }> = [];
  let formatB = 0;
  body = body.replace(DETAILS_RE, (_m, q: string, a: string) => {
    raw.push({ question: q, answer: a });
    formatB++;
    return '\n';
  });

  let formatA = 0;
  const parts = body.split(ANSWER_MARKER);
  // parts[0] is text before the first marker (a question); each following part starts with an answer line
  let pendingQuestion = parts[0];
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const nl = part.indexOf('\n');
    const answer = nl >= 0 ? part.slice(0, nl) : part;
    const rest = nl >= 0 ? part.slice(nl + 1) : '';
    raw.push({ question: pendingQuestion, answer });
    formatA++;
    pendingQuestion = rest;
  }
  if (cleanText(pendingQuestion)) {
    warnings.push(
      `Text ohne Antwort am Ende ignoriert: "${cleanText(pendingQuestion).slice(0, 60)}…"`,
    );
  }

  const byKey = new Map<string, Question>();
  let duplicates = 0;
  let uncertainCount = 0;
  for (const r of raw) {
    const question = cleanText(r.question)
      .replace(/Entscheid\?$/, '\nEntscheid?')
      .trim();
    let answer = cleanText(r.answer.replace(ANSWER_MARKER, ''));
    if (!question || !answer) {
      warnings.push(
        `Leere Frage oder Antwort übersprungen: q="${question.slice(0, 40)}" a="${answer}"`,
      );
      continue;
    }
    let uncertain = false;
    if (/\s*-\s*\?$/.test(answer)) {
      uncertain = true;
      answer = answer.replace(/\s*-\s*\?$/, '').trim();
    }
    const key = normalizeKey(question);
    const existing = byKey.get(key);
    if (existing) {
      duplicates++;
      if (normalizeKey(existing.answer) !== normalizeKey(answer)) {
        warnings.push(
          `Duplikat mit anderer Antwort: "${question.slice(0, 50)}…" → "${existing.answer}" vs "${answer}"`,
        );
      }
      continue;
    }
    if (uncertain) uncertainCount++;
    byKey.set(key, {
      id: hashId(key),
      question,
      answer,
      topic: classify(question, answer),
      uncertain,
    });
  }

  const questions = [...byKey.values()];
  const perTopic: Record<string, number> = {};
  for (const q of questions) perTopic[q.topic] = (perTopic[q.topic] ?? 0) + 1;

  return {
    cheatsheet,
    questions,
    stats: {
      formatA,
      formatB,
      duplicates,
      uncertain: uncertainCount,
      perTopic,
    },
    warnings,
  };
}

function cleanCheatsheet(raw: string): string {
  return raw
    .replace(/\u00a0/g, ' ')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .map((line) => {
      const m = line.match(/^-{5,}\s*(.*?)\s*-{5,}$/);
      if (m) return m[1] ? `## ${m[1]}` : '';
      if (/^-{5,}$/.test(line)) return '';
      return line;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
