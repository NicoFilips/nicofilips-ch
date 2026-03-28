import './CvModal.css';

const CvModal: React.FC = () => {
  return (
    <div className="cv-card">
      <h2>Curriculum Vitae</h2>

      <h3>Experience</h3>

      <div className="cv-timeline">
        <div className="cv-entry">
          <div className="cv-date">Feb 2025 &mdash; Present</div>
          <div className="cv-details">
            <strong>Software Developer</strong>
            <span className="cv-company">CMI, Schwerzenbach</span>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-date">Jun 2023 &mdash; Jan 2025</div>
          <div className="cv-details">
            <strong>Senior Fullstack Developer</strong>
            <span className="cv-company">SII Technologies GmbH, Augsburg</span>
            <ul>
              <li>ASP.Net Blazor Photino client application with SignalR backend</li>
              <li>CI/CD/CT pipeline setup and code quality assurance</li>
              <li>Unit, integration and smoke testing of modular backend components</li>
            </ul>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-date">Jun 2019 &mdash; May 2022</div>
          <div className="cv-details">
            <strong>.NET 6 / C# Software Developer</strong>
            <span className="cv-company">Bmk Group GmbH & Co. KG, Augsburg</span>
            <ul>
              <li>ASP.Net microservices for Track & Traceability</li>
              <li>Azure migration and new cloud-native developments</li>
              <li>Docker containerization and Kubernetes orchestration</li>
              <li>React.js frontend development</li>
            </ul>
          </div>
        </div>

        <div className="cv-entry">
          <div className="cv-date">Sep 2016 &mdash; Jun 2019</div>
          <div className="cv-details">
            <strong>Application Developer Apprenticeship</strong>
            <span className="cv-company">Bmk Group GmbH & Co. KG, Augsburg</span>
            <p className="cv-note">Graduated with 85/100 &mdash; .NET, SQL, IT Infrastructure</p>
          </div>
        </div>
      </div>

      <h3>Other Activities</h3>

      <div className="cv-timeline">
        <div className="cv-entry">
          <div className="cv-date">Jun 2025 &mdash; Present</div>
          <div className="cv-details">
            <strong>SIHF Linesperson</strong>
            <span className="cv-company">Swiss Ice Hockey Federation</span>
          </div>
        </div>
      </div>

      <h3>Education</h3>

      <div className="cv-timeline">
        <div className="cv-entry">
          <div className="cv-date">2008 &mdash; 2015</div>
          <div className="cv-details">
            <strong>Secondary School Diploma</strong>
            <span className="cv-company">Via-Claudia-Realschule, Königsbrunn</span>
            <p className="cv-note">Grade: 2.0 (Good)</p>
          </div>
        </div>
      </div>

      <h3>Tech Stack</h3>

      <div className="cv-skills-grid">
        <div className="cv-skill-group">
          <span className="cv-skill-label">Languages</span>
          <span>C# 12, TypeScript, JavaScript, Python, VB.Net</span>
        </div>
        <div className="cv-skill-group">
          <span className="cv-skill-label">Frameworks</span>
          <span>ASP.Net Core, Blazor, React, Node.js, WPF, Electron</span>
        </div>
        <div className="cv-skill-group">
          <span className="cv-skill-label">Cloud & DevOps</span>
          <span>Azure, Docker, Kubernetes, CI/CD Pipelines</span>
        </div>
        <div className="cv-skill-group">
          <span className="cv-skill-label">Testing</span>
          <span>xUnit, NUnit, Moq, FluentAssertions, Selenium</span>
        </div>
        <div className="cv-skill-group">
          <span className="cv-skill-label">Tools</span>
          <span>JetBrains Rider, VS Code, Git, Jira, Confluence</span>
        </div>
      </div>

      <h3>Notable Projects</h3>

      <div className="cv-projects">
        <div className="cv-project">
          <strong>REST API Platform</strong>
          <p>
            .NET Web API with React frontend, JWT auth, middleware with DI, deployed on Kubernetes
            via build pipelines.
          </p>
        </div>
        <div className="cv-project">
          <strong>Reusable NuGet Library</strong>
          <p>
            Generic business logic package with abstract data models, fully unit-tested with xUnit.
          </p>
        </div>
        <div className="cv-project">
          <strong>WPF Desktop Client</strong>
          <p>
            MVVM desktop app for machine communication via COM interfaces with ERP data exchange.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CvModal;
