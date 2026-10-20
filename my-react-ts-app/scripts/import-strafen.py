#!/usr/bin/env python3
"""Importiert die Strafen-Situationen (Bildfragen) aus der Obsidian-Note.

Jedes Bild ist ein Moodle-Screenshot: oben die Situationstabelle mit Frage und
Antwortoptionen (hellblauer Kasten), unten der beige Balken
"Die richtige Antwort ist: ...". Das Script schneidet jedes Bild an diesem
Balken in einen Frage- und einen Antwort-Teil und schreibt

  public/regeltest/strafen/<stamp>-q.png   Frage-Teil
  public/regeltest/strafen/<stamp>-a.png   Antwort-Teil
  src/regeltest/data/strafen.json          Metadaten für die App

Frage- und Antworttexte kommen aus scripts/strafen-texte.json (manuell
abgeschrieben); dort markierte Duplikate werden übersprungen. Die
Zahlenzeilen in der Note (z.B. "10 7 5") sind nur die beteiligten
Spielernummern und werden ignoriert.

Aufruf: pnpm strafen  [-- /pfad/zur/_Regeltest-strafen.md]
Benötigt: python3 mit Pillow
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image

DEFAULT_NOTE = Path(
    '/home/nico/Documents/Obsidian/MyVault/Regeltest/_Regeltest-strafen.md'
)
ROOT = Path(__file__).resolve().parent.parent
TEXTS = Path(__file__).resolve().parent / 'strafen-texte.json'
OUT_IMG = ROOT / 'public' / 'regeltest' / 'strafen'
OUT_JSON = ROOT / 'src' / 'regeltest' / 'data' / 'strafen.json'
URL_BASE = '/regeltest/strafen'

ANSWER_BG = (252, 239, 220)  # beiger Antwortbalken
TOLERANCE = 12
MIN_ROW_SHARE = 0.5  # Anteil beiger Pixel, ab dem eine Zeile zum Balken zählt

IMAGE_RE = re.compile(r'Pasted image (\d{14})\.png')


def close(a: tuple[int, int, int], b: tuple[int, int, int]) -> bool:
    return all(abs(x - y) <= TOLERANCE for x, y in zip(a, b))


def find_answer_rows(im: Image.Image) -> tuple[int, int] | None:
    """Erste und letzte Zeile des beigen Antwortbalkens, oder None."""
    w, h = im.size
    px = im.load()
    xs = range(0, w, max(1, w // 200))
    beige_rows = [
        y
        for y in range(h)
        if sum(1 for x in xs if close(px[x, y], ANSWER_BG)) / len(xs) >= MIN_ROW_SHARE
    ]
    if not beige_rows:
        return None
    return beige_rows[0], beige_rows[-1]


def trim_blank(im: Image.Image, blank=(255, 255, 255)) -> Image.Image:
    """Schneidet rein weisse Ränder oben und unten weg."""
    w, h = im.size
    px = im.load()

    def row_blank(y: int) -> bool:
        return all(close(px[x, y], blank) for x in range(0, w, 4))

    top, bottom = 0, h - 1
    while top < bottom and row_blank(top):
        top += 1
    while bottom > top and row_blank(bottom):
        bottom -= 1
    return im.crop((0, top, w, bottom + 1))


def resolve_image(stamp: str, note: Path) -> Path | None:
    name = f'Pasted image {stamp}.png'
    for folder in (note.parent, note.parent.parent):
        if (folder / name).exists():
            return folder / name
    hits = list(note.parent.parent.rglob(name))
    return hits[0] if hits else None


def main() -> int:
    note = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_NOTE
    text = note.read_text(encoding='utf-8')
    stamps = list(dict.fromkeys(IMAGE_RE.findall(text)))  # Reihenfolge, dedupliziert
    texts = {k: v for k, v in json.loads(TEXTS.read_text(encoding='utf-8')).items() if not k.startswith('_')}

    OUT_IMG.mkdir(parents=True, exist_ok=True)
    for old in OUT_IMG.glob('*.png'):
        old.unlink()

    entries = []
    warnings = []
    duplicates = 0
    for stamp in stamps:
        meta = texts.get(stamp)
        if meta is None:
            warnings.append(f'{stamp}: kein Eintrag in {TEXTS.name}, Text fehlt')
            meta = {}
        if meta.get('duplicateOf'):
            duplicates += 1
            continue
        src = resolve_image(stamp, note)
        if not src:
            warnings.append(f'{stamp}: Bild nicht gefunden, übersprungen')
            continue
        im = Image.open(src).convert('RGB')
        rows = find_answer_rows(im)
        if not rows:
            warnings.append(f'{stamp}: kein Antwortbalken erkannt, übersprungen')
            continue
        first, last = rows
        w, h = im.size
        q_img = trim_blank(im.crop((0, 0, w, first)))
        a_img = im.crop((0, first, w, min(h, last + 1)))

        q_path = OUT_IMG / f'{stamp}-q.png'
        a_path = OUT_IMG / f'{stamp}-a.png'
        q_img.save(q_path, optimize=True)
        a_img.save(a_path, optimize=True)

        entries.append(
            {
                'id': f's{stamp}',
                'question': meta.get('question') or 'Strafensituation: Frage im Bild beantworten',
                'answer': meta.get('answer') or '',
                'topic': 'Situationen',
                'uncertain': False,
                'image': {
                    'question': f'{URL_BASE}/{q_path.name}',
                    'answer': f'{URL_BASE}/{a_path.name}',
                    'width': q_img.width,
                    'height': q_img.height,
                    'answerWidth': a_img.width,
                    'answerHeight': a_img.height,
                },
            }
        )

    for stamp in texts:
        if stamp not in stamps:
            warnings.append(f'{stamp}: steht in {TEXTS.name}, aber nicht in der Note')

    OUT_JSON.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    total_kb = sum(p.stat().st_size for p in OUT_IMG.glob('*.png')) // 1024
    print(f'Quelle:        {note}')
    print(f'Referenziert:  {len(stamps)}')
    print(f'Duplikate:     {duplicates}')
    print(f'Importiert:    {len(entries)}')
    print(f'Bilder:        {OUT_IMG} ({total_kb} KB)')
    print(f'Geschrieben:   {OUT_JSON}')
    if warnings:
        print(f'\n{len(warnings)} Hinweise:', file=sys.stderr)
        for w_ in warnings:
            print(f'  - {w_}', file=sys.stderr)
    return 0


if __name__ == '__main__':
    sys.exit(main())
