import linkedinLogo from './assets/Icons/LinkedIn.png';
import GithubLogo from './assets/Icons/GithubInverted.png';
import XingLogo from './assets/Icons/xing2.png';
import './App.css';
import CircleImage from './components/me/CircleImage';
import TheParticles from './components/Background/TheParticles';
import SourceCode from './components/Github/SourceCode';
import Mailto from './components/MailTo/mailto';
import AzureInfo from './components/Azure/AzureInfo';

function App() {
  return (
    <>
      <div>
        <CircleImage />
      </div>
      <div>
        <a href="https://GitHub.com/NicoFilips" target="_blank" rel="noopener noreferrer">
          <img
            src={GithubLogo}
            className="logo"
            alt="GitHub logo"
            style={{ userSelect: 'none' }}
          />
        </a>
        <a href="https://www.linkedin.com/in/nicofilips/" target="_blank" rel="noopener noreferrer">
          <img
            src={linkedinLogo}
            className="logo"
            alt="LinkedIn logo"
            style={{ userSelect: 'none' }}
          />
        </a>
        <a href="https://www.xing.com/profile/Nico_Filips/" target="_blank" rel="noopener noreferrer">
          <img
            src={XingLogo}
            className="logo"
            alt="Xing logo"
            style={{ userSelect: 'none' }}
          />
        </a>
        <Mailto email="inquiries@nicofilips.de"></Mailto>
      </div>
      <h1 className="whiteh1">Hey!</h1>
      <h1 className="whiteh1">
        💫 I'm Nico Filips, a backend developer from Zurich, Switzerland.
      </h1>
      <AzureInfo />
      <SourceCode />
      <TheParticles />
    </>
  );
}
export default App;
