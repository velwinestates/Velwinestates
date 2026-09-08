import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { FaLeaf,FaImage, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import {  MdSettings, MdSell } from 'react-icons/md';
import { BsArrowRightCircle, BsStars } from 'react-icons/bs';
import '../App.css';
import {
  GiFarmTractor,
} from 'react-icons/gi';
import services from '../data/services';
import trustFactors from '../data/trustFactors';
import howItWorks from '../data/howItWorks';
import projects from '../data/projects';
import usePageMedia from '../hooks/usePageMedia';

const defaultHomeMedia = [
  { slot: 'slide1', title: 'Construction Project' },
  { slot: 'slide2', title: 'Farmhouse Construction' },
  { slot: 'slide3', title: 'Swimming Pool Construction' },
  { slot: 'slide4', title: 'Water Tank Construction' },
  { slot: 'slide5', title: 'Farm Fencing' },
  { slot: 'slide6', title: 'Polyhouse Construction' },
  { slot: 'slide7', title: 'Livestock Shed Construction' },
  { slot: 'slide8', title: 'Farm Shed Construction' },
  { slot: 'slide9', title: 'Drip Irrigation Installation' }
];


function HomePage({ currentSlide, onBookProject }) {
  const [constructionSlide, setConstructionSlide] = useState(0);
  const homeMedia = usePageMedia('home');
  const constructionMedia = defaultHomeMedia
    .filter(media => homeMedia[media.slot])
    .map(media => ({ ...media, src: homeMedia[media.slot] }));

  useEffect(() => {
    if (constructionMedia.length === 0) {
      setConstructionSlide(0);
      return undefined;
    }

    const interval = setInterval(() => {
      setConstructionSlide((previousSlide) => (previousSlide + 1) % constructionMedia.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [constructionMedia.length]);

  return (
    <div className="home-page">
      <div className="construction-notice" role="status">
        <span className="construction-notice-label">Site update</span>
        <span className="construction-notice-message">
          Our website is still under construction. Thank you for your patience while we improve your experience.
        </span>
      </div>
      {constructionMedia.length > 0 && (
        <section className="construction-media-section home-media-top" aria-label="Home image slides">
          <div className="construction-media-carousel">
            <div className="construction-media-track" style={{ transform: `translateX(-${constructionSlide * 100}%)` }}>
              {constructionMedia.map(media => (
                <div className="construction-media-slide" key={media.slot}>
                  <img src={media.src} alt={media.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-dots" aria-label="Home image slides">
            {constructionMedia.map((media, index) => (
              <button
                type="button"
                key={media.slot}
                className={`dot ${constructionSlide === index ? 'active' : ''}`}
                aria-label={`Show ${media.title}`}
                aria-current={constructionSlide === index ? 'true' : undefined}
                onClick={() => setConstructionSlide(index)}
              />
            ))}
          </div>
        </section>
      )}
      <Link
        to="/construction"
        className="btn btn-primary recent-projects-link"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 2500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          whiteSpace: 'nowrap',
          fontSize: '0.9rem',
          padding: '0.8rem 1rem',
          borderRadius: '999px',
          background: '#285943',
          boxShadow: '0 3px 10px rgba(23, 60, 44, 0.18)'
        }}
      >
        <FaImage />
        <span className="recent-projects-link-text">Construction Services</span>
      </Link>
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">Velwin Estates</span>
          <h1>Smart farm management for better yields and calmer decisions.</h1>
          <p>We help farmers with land planning, annual maintenance, irrigation, fencing, inputs, crop support, and transparent execution tracking.</p>
          <div className="hero-cta">
            <Link to="/manage-farm" className="btn btn-primary"><GiFarmTractor /> Manage My Farm</Link>
            <Link to="/buy-inputs" className="btn btn-primary"><FaShoppingCart /> Buy Inputs</Link>
            <Link to="/sell-produce" className="btn btn-primary"><MdSell /> Sell Produce</Link>
            <Link to="/book-team" className="btn btn-primary">Book Our Team</Link>
            <Link to="/farm-details" className="btn btn-primary">Upload Farm Details</Link>
          </div>
          <p className="site-visit-note">
            Site verification visit is chargeable. <br />
            Up to 50 KM - ₹4,999/- <br />
            50 - 100 KM - ₹9,999/- <br />
            Includes travel, field inspection and project report.
          </p>
        </div>
      </section>

      <section className="what-we-do-section">
        <div className="section-heading">
            <div className="section-heading-container">
                <h2><FaLeaf /> Velwin Estates – What We Do</h2>
                <p className="tagline">We are a field-ready execution partner for farmers who need clarity, accountability, and professional farm support.</p>
            </div>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-card-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
  {/* Explore All Services button removed as requested */}
      </section>

      <section className="trust-section">
        <div className="section-heading">
          <h2><BsStars /> Why Farmers Choose Us</h2>
        </div>
        <div className="trust-factors">
          {trustFactors.map((factor, index) => (
            <div className="trust-card" key={index}>
              <div className="trust-icon">{factor.icon}</div>
              <h3>{factor.title}</h3>
              <p>{factor.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="section-heading">
            <div className="section-heading-container">
              <h2><MdSettings /> How It Works – SOP System</h2>
            </div>
        </div>
        <div className="steps-container">
          {howItWorks.map((step) => (
            <div className="step-card" key={step.step}>
              <div className="step-number">{step.step}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
  {/* Book Site Visit button removed as requested */}
      </section>

      <section className="recent-projects-section">
        <div className="section-heading">
            <div className="section-heading-container">
                <h2><FaImage /> Recent Projects</h2>
            </div>
        </div>
        <div className="projects-carousel">
          <div className="carousel-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {projects.map((project, index) => (
              <div className="project-card" key={project.id}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="project-location"><FaMapMarkerAlt /> {project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-dots">
          {projects.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${currentSlide === index ? 'active' : ''}`} 
            />
          ))}
        </div>
        <Link to="/construction" className="btn btn-primary center-btn">Construction Services <BsArrowRightCircle /></Link>
      </section>

    </div>
  );
}
export default HomePage;
