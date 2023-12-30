import React from 'react';

const CvModal: React.FC = () => {
  return (
    <div>
      <h2>Mein Lebenslauf</h2>
      {/* Persönliche Daten */}
      <section>
        <h3>Persönliche Daten</h3>
        <p>Name: Nico Filips</p>
        <p>Geburtsdatum: TT.MM.JJJJ</p>
        <p>Adresse: Straße, PLZ Stadt, Land</p>
        <p>Email: deine-email@example.com</p>
      </section>
      
      {/* Berufserfahrung */}
      <section>
        <h3>Berufserfahrung</h3>
        <ul>
          <li>
            <strong>Position/Jobtitel</strong> - Unternehmen (Startdatum – Enddatum)
            <ul>
              <li>Kurze Beschreibung der Tätigkeit und erzielte Erfolge</li>
              {/* Weitere Punkte */}
            </ul>
          </li>
          {/* Weitere Positionen */}
        </ul>
      </section>
      
      {/* Ausbildung */}
      <section>
        <h3>Ausbildung</h3>
        <ul>
          <li>
            <strong>Studiengang / Ausbildung</strong> - Institution (Startdatum – Enddatum)
            <ul>
              <li>Wichtige Details oder Schwerpunkte</li>
            </ul>
          </li>
          {/* Weitere Ausbildungen */}
        </ul>
      </section>

      {/* Fähigkeiten */}
      <section>
        <h3>Fähigkeiten</h3>
        <ul>
          <li>Programmiersprachen: z.B. JavaScript, TypeScript</li>
          <li>Frameworks und Tools: z.B. React, Node.js</li>
          {/* Weitere Fähigkeiten */}
        </ul>
      </section>

      {/* Sprachen */}
      <section>
        <h3>Sprachen</h3>
        <ul>
          <li>Deutsch - Muttersprache</li>
          <li>Englisch - Fließend</li>
          <li>Russisch - Anfaenger</li>
        </ul>
      </section>
    </div>
  );
};

export default CvModal;