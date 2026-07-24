import './AboutMeModal.css';

const AboutMeModal: React.FC = () => {
  return (
    <div className="about-me">
      <h2>About Me</h2>

      <p>
        Senior fullstack developer based in Zurich, Switzerland with nearly a decade of experience
        building robust backend systems and modern web applications. I specialize in the .NET
        ecosystem and cloud-native development on Azure.
      </p>

      <p>
        Currently working as a <strong>Software Developer</strong> at CMI in Schwerzenbach. My
        background spans microservice architecture, CI/CD pipelines, containerization with Docker,
        and orchestration with Kubernetes.
      </p>

      <h3>What I bring to the table</h3>
      <div className="about-highlights">
        <div className="highlight-item">
          <span className="highlight-icon">{'</>'}</span>
          <div>
            <strong>Backend-first mindset</strong>
            <p>C# 12, ASP.Net Core, Web APIs, microservices, and clean architecture</p>
          </div>
        </div>
        <div className="highlight-item">
          <span className="highlight-icon">{'{ }'}</span>
          <div>
            <strong>Full-stack capability</strong>
            <p>React, TypeScript, Blazor, Node.js &mdash; comfortable across the stack</p>
          </div>
        </div>
        <div className="highlight-item">
          <span className="highlight-icon">{'>>>'}</span>
          <div>
            <strong>DevOps & Cloud</strong>
            <p>Azure, Docker, Kubernetes, CI/CD pipelines, infrastructure as code</p>
          </div>
        </div>
      </div>

      <h3>Beyond the code</h3>
      <p>
        When I'm not coding, you'll find me on the ice as a linesperson for the Swiss Ice Hockey
        Federation (SIHF). I'm also passionate about home automation, smart home tech, and keeping up
        with the stock market.
      </p>

      <div className="about-languages">
        <span className="lang-tag">German (Native)</span>
        <span className="lang-tag">English (B2/C1)</span>
        <span className="lang-tag">French (A1)</span>
        <span className="lang-tag">Russian (A1)</span>
      </div>
    </div>
  );
};

export default AboutMeModal;
