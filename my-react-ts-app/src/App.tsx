import { useState } from 'react';
import linkedinLogo from './assets/Icons/LinkedIn.png';
import GithubLogo from './assets/Icons/GithubInverted.png';
import XingLogo from './assets/Icons/xing2.png';
import './App.css';
import CircleImage from './components/me/CircleImage';
import TheParticles from './components/Background/TheParticles';
import SourceCode from './components/Github/SourceCode';
import Mailto from './components/MailTo/mailto';
import AzureInfo from './components/Azure/AzureInfo';
import MouseFollower from './components/mouse-follower/mouseFollower';
import Modal from './components/Modal/Modal';
import AboutMeModal from './components/Modal/AbouteMe/AboutMeModal';
import CvModal from './components/Modal/CV/CvModal';
import TypingEffect from './components/TypingEffect/TypingEffect';
import SpaceObjects from './components/SpaceObjects/SpaceObjects';
import SwissEasterEgg from './components/SwissEasterEgg/SwissEasterEgg';

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showCv, setShowCv] = useState(false);
  const [swissBurst, setSwissBurst] = useState(0);

  return (
    <>
      <div className="fade-in" style={{ animationDelay: '0.2s' }}>
        <CircleImage />
      </div>

      <h1 className="whiteh1 fade-in" style={{ animationDelay: '0.4s' }}>
        Grüezi!{' '}
        <svg
          className="swiss-flag"
          viewBox="0 0 32 32"
          role="button"
          tabIndex={0}
          aria-label="Swiss flag — click for a surprise"
          onClick={() => setSwissBurst((n) => n + 1)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setSwissBurst((n) => n + 1);
          }}
        >
          <rect width="32" height="32" rx="5" fill="#DA291C" />
          <rect x="13" y="6" width="6" height="20" fill="#fff" />
          <rect x="6" y="13" width="20" height="6" fill="#fff" />
        </svg>
      </h1>
      <h1 className="whiteh1 fade-in" style={{ animationDelay: '0.6s' }}>
        <TypingEffect
          text="I'm Nico Filips, a backend developer from Zurich, Switzerland."
          speed={35}
          delay={800}
        />
      </h1>

      <div className="fade-in social-links" style={{ animationDelay: '0.8s' }}>
        <a
          href="https://GitHub.com/NicoFilips"
          target="_blank"
          rel="noopener noreferrer"
          className="tooltip-link"
          data-tooltip="GitHub"
        >
          <img
            src={GithubLogo}
            className="logo"
            alt="GitHub logo"
            style={{ userSelect: 'none' }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/nicofilips/"
          target="_blank"
          rel="noopener noreferrer"
          className="tooltip-link"
          data-tooltip="LinkedIn"
        >
          <img
            src={linkedinLogo}
            className="logo"
            alt="LinkedIn logo"
            style={{ userSelect: 'none' }}
          />
        </a>
        <a
          href="https://www.xing.com/profile/Nico_Filips/"
          target="_blank"
          rel="noopener noreferrer"
          className="tooltip-link"
          data-tooltip="Xing"
        >
          <img src={XingLogo} className="logo" alt="Xing logo" style={{ userSelect: 'none' }} />
        </a>
        <Mailto email="inquiries@nicofilips.de"></Mailto>
      </div>

      <div className="action-buttons fade-in" style={{ animationDelay: '1.2s' }}>
        <button className="glow-btn" onClick={() => setShowAbout(true)}>
          About Me
        </button>
        <button className="glow-btn" onClick={() => setShowCv(true)}>
          Curriculum Vitae
        </button>
      </div>

      <div className="fade-in" style={{ animationDelay: '1.4s' }}>
        <AzureInfo />
        <SourceCode />
      </div>

      <Modal show={showAbout} onClose={() => setShowAbout(false)}>
        <AboutMeModal />
      </Modal>
      <Modal show={showCv} onClose={() => setShowCv(false)}>
        <CvModal />
      </Modal>

      <SwissEasterEgg trigger={swissBurst} />
      <SpaceObjects />
      <TheParticles />
      <MouseFollower />
    </>
  );
}
export default App;
