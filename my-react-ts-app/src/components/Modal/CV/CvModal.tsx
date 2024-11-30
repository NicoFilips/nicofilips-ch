import React from 'react';

const CvModal: React.FC = () => {
  return (
    <div>
      <h2>Curriculum Vitae</h2>

      {/* Professional Experience */}
      <section>
        <h3>Professional Experience</h3>
        <ul>
          <li>
            <strong>Fullstack Developer</strong> - SII Germany, Full-time (June
            2023–Present)
            <ul>
              <li>Working for a renowned sports car brand in Germany.</li>
              <li>
                DevOps responsibilities, including setting up and optimizing
                GitLab Pipelines.
              </li>
              <li>Developing with .Net 6 / C#10 ASP.Net Core.</li>
              <li>
                Ensuring code quality by implementing integration and unit
                tests.
              </li>
              <li>Handling smaller tasks with Razor Pages in a Blazor App.</li>
            </ul>
          </li>

          <li>
            <strong>.NET Core Developer</strong> - Full-time (Sept 2016–June
            2023)
            <ul>
              <li>
                Developed and implemented Web API microservices and client
                applications using .NET 6.
              </li>
              <li>
                Managed project development and migrations to Microsoft Azure.
              </li>
              <li>
                Designed and maintained Single Page Applications (SPAs) using
                Node.js and TypeScript.
              </li>
              <li>
                Maintained and optimized legacy .NET Framework applications.
              </li>
              <li>
                Handled DevOps tasks, including setting up and optimizing GitLab
                Pipelines, monitoring Kubernetes infrastructure, and working
                with Docker.
              </li>
              <li>
                Ensured code quality and functionality through unit testing with
                xUnit.
              </li>
            </ul>
          </li>
          {/* Additional positions */}
        </ul>
      </section>

      {/* Education */}
      <section>
        <h3>Education</h3>
        <ul>
          <li>
            <strong>IT Specialist Apprenticeship</strong> - Focus: Application
            Development (Sept 2016–June 2019)
            <ul>
              <li>
                Completed a 2 years and 10 months apprenticeship program in
                application development.
              </li>
            </ul>
          </li>
          <li>
            <strong>Secondary School Diploma</strong> - Realschule Königsbrunn
            (2015)
            <ul>
              <li>Graduated with an overall grade of 1.9.</li>
            </ul>
          </li>
          {/* Additional education entries */}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h3>Skills</h3>
        <ul>
          <li>Programming Languages: e.g., JavaScript, TypeScript</li>
          <li>Frameworks and Tools: e.g., React, Node.js</li>
          {/* Additional skills */}
        </ul>
      </section>

      {/* Languages */}
      <section>
        <h3>Languages</h3>
        <ul>
          <li>German - Native</li>
          <li>English - Fluent</li>
          <li>Russian - Beginner</li>
        </ul>
      </section>
    </div>
  );
};

export default CvModal;
