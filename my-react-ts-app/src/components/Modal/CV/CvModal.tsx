import './CvModal.css';

const techStack = [
  { label: 'Languages', skills: ['C#', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { label: 'Frameworks', skills: ['ASP.Net Core', 'Blazor', 'React', 'Angular', 'Node.js', 'WPF'] },
  { label: 'Cloud & DevOps', skills: ['Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Grafana'] },
  { label: 'Testing', skills: ['xUnit', 'NUnit', 'Reqnroll (BDD)', 'Moq', 'FluentAssertions'] },
  { label: 'Tools', skills: ['JetBrains Rider', 'VS Code', 'Git', 'YouTrack', 'Confluence'] },
];

const projects = [
  {
    icon: '🚀',
    title: 'REST API Platform',
    description:
      '.NET Web API with React frontend, JWT auth, middleware with DI, deployed on Kubernetes via build pipelines.',
    tags: ['.NET', 'React', 'Kubernetes'],
  },
  {
    icon: '📦',
    title: 'Reusable NuGet Library',
    description:
      'Generic business logic package with abstract data models, fully unit-tested with xUnit.',
    tags: ['NuGet', 'xUnit'],
  },
  {
    icon: '🛰️',
    title: 'WPF Desktop Client',
    description:
      'MVVM desktop app for machine communication via COM interfaces with ERP data exchange.',
    tags: ['WPF', 'MVVM', 'COM'],
  },
];

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
            <ul>
              <li>Fullstack development of CMI Axioma, a platform for Swiss public administration</li>
              <li>.NET / C# backend services on a model-driven application platform</li>
              <li>Integration interfaces to Swiss resident registries (ContactSync)</li>
              <li>BDD and unit testing, CI/CD via GitHub Actions</li>
            </ul>
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

        <div className="cv-entry">
          <div className="cv-date">2016 &mdash; 2024</div>
          <div className="cv-details">
            <strong>Ice Hockey Referee &mdash; Competitive Sports</strong>
            <span className="cv-company">BEV / DEB (German Ice Hockey Federation)</span>
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
        {techStack.map((group) => (
          <div key={group.label} className="cv-skill-group">
            <span className="cv-skill-label">{group.label}</span>
            <div className="cv-skill-chips">
              {group.skills.map((skill) => (
                <span key={skill} className="cv-skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3>Notable Projects</h3>

      <div className="cv-projects">
        {projects.map((project) => (
          <div key={project.title} className="cv-project">
            <div className="cv-project-glow" />
            <div className="cv-project-header">
              <span className="cv-project-icon">{project.icon}</span>
              <strong>{project.title}</strong>
            </div>
            <p>{project.description}</p>
            <div className="cv-project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="cv-project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CvModal;
