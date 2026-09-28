import { useEffect, useState } from 'react';
import {
  buildAutoexec,
  CROSSHAIR_SHARE_CODE,
  LAUNCH_OPTIONS,
  SECTIONS,
} from './csgoConfig';
import './Csgo.css';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      window.prompt('Zum Kopieren markieren:', text);
    }
  };

  return (
    <button
      type="button"
      className={`glow-btn csgo-copy${copied ? ' is-copied' : ''}`}
      onClick={copy}
    >
      {copied ? 'Kopiert ✓' : 'Kopieren'}
    </button>
  );
}

function CsgoPage() {
  useEffect(() => {
    document.title = 'CS2 Settings – Nico Filips';
    return () => {
      document.title = 'Nico Filips';
    };
  }, []);

  const autoexec = buildAutoexec();

  return (
    <main className="csgo-page">
      <header className="csgo-header">
        <h1>CS2 Settings</h1>
        <p>Settings zum Kopieren in die Konsole.</p>
      </header>

      {CROSSHAIR_SHARE_CODE && (
        <section className="csgo-card">
          <div className="csgo-card-head">
            <h2>Crosshair Share-Code</h2>
            <CopyButton text={CROSSHAIR_SHARE_CODE} />
          </div>
          <pre className="csgo-code is-inline">{CROSSHAIR_SHARE_CODE}</pre>
        </section>
      )}

      {SECTIONS.map((section) => (
        <section className="csgo-card" key={section.id} id={section.id}>
          <div className="csgo-card-head">
            <h2>{section.title}</h2>
            <CopyButton text={section.commands.join('; ')} />
          </div>
          {section.description && (
            <p className="csgo-card-desc">{section.description}</p>
          )}
          <pre className="csgo-code">{section.commands.join('\n')}</pre>
        </section>
      ))}

      {LAUNCH_OPTIONS && (
        <section className="csgo-card">
          <div className="csgo-card-head">
            <h2>Launch Options</h2>
            <CopyButton text={LAUNCH_OPTIONS} />
          </div>
          <pre className="csgo-code is-inline">{LAUNCH_OPTIONS}</pre>
        </section>
      )}

      <section className="csgo-card">
        <div className="csgo-card-head">
          <h2>Alles als autoexec.cfg</h2>
          <CopyButton text={autoexec} />
        </div>
        <p className="csgo-card-desc">
          Speichern unter{' '}
          <code>
            Counter-Strike Global Offensive/game/csgo/cfg/autoexec.cfg
          </code>{' '}
          und im Spiel <code>exec autoexec</code> ausführen.
        </p>
        <pre className="csgo-code">{autoexec}</pre>
      </section>

      <p className="csgo-footer">
        Einzelne Blöcke werden mit <code>;</code> getrennt kopiert und lassen
        sich direkt in die Konsole einfügen.
      </p>
    </main>
  );
}

export default CsgoPage;
