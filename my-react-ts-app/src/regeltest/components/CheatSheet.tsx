interface Props {
  text: string;
  onBack: () => void;
}

export default function CheatSheet({ text, onBack }: Props) {
  const blocks = text.split(/\n(?=## )/);
  return (
    <main className="screen cheatsheet">
      <header className="card-head">
        <button type="button" className="link" onClick={onBack}>
          ← Zurück
        </button>
        <h1>Spickzettel</h1>
        <span />
      </header>
      {blocks.map((block, i) => {
        const [first, ...rest] = block.split('\n');
        const isHeading = first.startsWith('## ');
        return (
          <section key={i} className="panel">
            {isHeading && <h2>{first.slice(3)}</h2>}
            <pre>{(isHeading ? rest : [first, ...rest]).join('\n').trim()}</pre>
          </section>
        );
      })}
    </main>
  );
}
