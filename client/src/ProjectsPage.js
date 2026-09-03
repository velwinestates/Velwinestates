import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import projects from './data/projects';

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <section className="page-header">
        <h1>Past Projects</h1>
        <p>See some of our completed work for farmers</p>
      </section>
      <div className="projects-grid">
        {projects.map(project => (
          <div className="gallery-project-card" key={project.id}>
            <div className="project-image">
              <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="project-location"><FaMapMarkerAlt /> {project.location}</p>
              <div className="project-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="rating-text">5.0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
