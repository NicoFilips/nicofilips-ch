// Liest die Obsidian-Note ein und schreibt src/data/questions.json + src/data/cheatsheet.txt.
// Aufruf: pnpm questions  [-- /pfad/zur/_Regeltest.md]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseRegeltest } from '../src/regeltest/lib/parse.ts';

const DEFAULT_NOTE =
  '/home/nico/Documents/Obsidian/MyVault/Regeltest/_Regeltest.md';

const notePath = process.argv[2] ?? DEFAULT_NOTE;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outQuestions = resolve(root, 'src/regeltest/data/questions.json');
const outCheatsheet = resolve(root, 'src/regeltest/data/cheatsheet.txt');

const markdown = readFileSync(notePath, 'utf8');
const result = parseRegeltest(markdown);

writeFileSync(outQuestions, JSON.stringify(result.questions, null, 2) + '\n');
writeFileSync(outCheatsheet, result.cheatsheet + '\n');

const s = result.stats;
console.log(`Quelle:      ${notePath}`);
console.log(`Format A:    ${s.formatA}`);
console.log(`Format B:    ${s.formatB}`);
console.log(`Duplikate:   ${s.duplicates}`);
console.log(`Unsicher:    ${s.uncertain}`);
console.log(`Fragen:      ${result.questions.length}`);
console.log('Themen:');
for (const [topic, n] of Object.entries(s.perTopic).sort(
  (a, b) => b[1] - a[1],
)) {
  console.log(`  ${topic.padEnd(12)} ${n}`);
}
if (result.warnings.length) {
  console.error(`\n${result.warnings.length} Hinweise:`);
  for (const w of result.warnings) console.error(`  - ${w}`);
}
console.log(`\nGeschrieben: ${outQuestions}\n             ${outCheatsheet}`);
