import { useState } from 'react'
import linkedinLogo from './assets/Icons/LinkedIn.png'
import GithubLogo from './assets/Icons/GithubInverted.png'
import './App.css'
import Particles from 'react-tsparticles'
import TheParticles from './components/Background/TheParticles'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://GitHub.com/NicoFilips" target="_blank">
          <img src={GithubLogo} className="logo" alt="GitHub logo" />
        </a>
        <a href="https://www.linkedin.com/in/nicofilips/" target="_blank">
          <img src={linkedinLogo} className="logo" alt="LinkedIn logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
