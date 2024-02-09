import { useState } from 'react'
import linkedinLogo from './assets/Icons/LinkedIn.png'
import GithubLogo from './assets/Icons/GithubInverted.png'
import './App.css'
import CircleImage from './components/me/CircleImage'
import TheParticles from './components/Background/TheParticles'
import Modal from './components/Modal/Modal'
import CvModal from './components/Modal/CV/CvModal'
import AboutmeModal from './components/Modal/AbouteMe/AboutMeModal'

function App() {
  const [showCvModal, setshowCvModal] = useState(false);
  const [showAboutMeModal, setShowAboutMeModal] = useState(false);
  const [showTechStackModal, setShowTechStackModal] = useState(false);

  return (
    <>
    <div>
      <CircleImage />
    </div>
      <div>
        <a href="https://GitHub.com/NicoFilips" target="_blank">
          <img src={GithubLogo} className="logo" alt="GitHub logo" style={{ userSelect: 'none' }} />
        </a>
        <a href="https://www.linkedin.com/in/nicofilips/" target="_blank">
          <img src={linkedinLogo} className="logo" alt="LinkedIn logo" style={{ userSelect: 'none' }} />
        </a>
      </div>
      <h1 className="whiteh1">Hey!</h1>
      <h1 className="whiteh1">💫 I'm Nico Filips, a backend developer from Augsburg, Germany.</h1>
      <div className="card">
        <div className="cv-modal">
        <button  className="button-hover-effect" onClick={() => setshowCvModal(true)}>💼</button>
        <Modal show={showCvModal} onClose={() => setshowCvModal(false)}>
        <CvModal/>
      </Modal>
      <button className="button-hover-effect" onClick={() => setShowAboutMeModal(true)}>🙋‍♂️</button>
        <Modal show={showAboutMeModal} onClose={() => setShowAboutMeModal(false)}>
        <AboutmeModal/>
      </Modal>
      <button className="button-hover-effect" onClick={() => setShowTechStackModal(true)}>👨‍💻</button>
        <Modal show={showTechStackModal} onClose={() => setShowTechStackModal(false)}>
        <CvModal/>
      </Modal>
        </div>
      </div>
      <TheParticles />
      <p className="read-the-docs" style={{ userSelect: 'none' }} >
        This Site is hosted as an App Service on Azure.
      </p>
    </>
  )
}
export default App