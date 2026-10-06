import React, { useEffect, useState } from 'react';
import { apiUrl, imageUrl } from './api';
import fallbackProjects from './data/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(apiUrl('/api/projects'), { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load projects');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      } catch (error) {
        console.warn('Using local Projects fallback:', error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="projects-page">
      <section className="page-header">
        <h1>Past Projects</h1>
        <p>Explore selected farm development, irrigation, construction, and maintenance projects completed for farmers across Tamil Nadu.</p>
      </section>

      {loading && projects.length === 0 ? <p className="loading-message">Loading projects...</p> : (
        <div className="projects-grid">
          {projects.map(project => (
            <article className="gallery-project-card" key={project.id}>
              <div className="project-image">
                <img src={imageUrl(project.image)} alt={project.imageAlt || project.title} loading="lazy" decoding="async" />
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-location">{project.location}</span>
                  <span className="project-id">Project {project.id}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
