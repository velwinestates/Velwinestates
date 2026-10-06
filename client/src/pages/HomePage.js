import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaLeaf } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';
import '../App.css';
import imageUrls from '../data/imageUrls';
import { GiFarmTractor } from 'react-icons/gi';
import services from '../data/services';
import trustFactors from '../data/trustFactors';
import howItWorks from '../data/howItWorks';

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <img className="home-hero-image" src="/assert/WhatsApp Image 2026-09-04 at 7.23.36 PM.jpeg" alt="Natural farm landscape" />
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <p className="home-hero-eyebrow">FARM DEVELOPMENT · MANAGEMENT · SUPPORT</p>
          <h1>Grow your farm.<br /><span>Grow your future.</span></h1>
          <p className="home-hero-copy">Practical farm development and management, from the first site visit to the work completed in your fields.</p>
          <div className="home-hero-actions">
            <Link to="/book-team" className="home-action-primary">Book a Service <FaArrowRight aria-hidden="true" /></Link>
            <Link to="/our-services" className="home-action-secondary">Explore Services</Link>
          </div>
          <div className="home-hero-promises" aria-label="Our commitments">
            <div><FaLeaf aria-hidden="true" /><span>Healthy land<br /><strong>Better yields</strong></span></div>
            <div><FaCheck aria-hidden="true" /><span>Clear plans<br /><strong>Visible progress</strong></span></div>
            <div><GiFarmTractor aria-hidden="true" /><span>Local teams<br /><strong>Field-ready support</strong></span></div>
          </div>
        </div>
      </section>

      <section className="what-we-do-section home-section">
        <div className="section-heading">
            <div className="section-heading-container">
                <span className="section-kicker">OUR SERVICES</span>
                <h2><FaLeaf /> Everything your farm needs.</h2>
                <p className="tagline">We are a field-ready execution partner for farmers who need clarity, accountability, and professional farm support.</p>
            </div>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <Link
              className="service-card"
              key={service.path + service.title}
              to={service.path}
              aria-label={`${service.title}: ${service.description}`}
            >
              <div className="service-card-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-card-arrow" aria-hidden="true"><FaArrowRight /></span>
            </Link>
          ))}
        </div>
        <Link to="/our-services" className="home-text-link">View all services <FaArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="home-showcase" aria-label="Farm work and services">
        <div className="home-showcase-heading">
          <span className="section-kicker">FIELD WORK, DONE WITH CARE</span>
          <h2>Our work in the field.</h2>
        </div>
        <div className="home-showcase-grid">
          <Link to="/construction" className="home-showcase-card">
            <img src={imageUrls.agriculture} alt="Rows of crops growing on a farm" loading="lazy" />
            <span>Farm Development <FaArrowRight aria-hidden="true" /></span>
          </Link>
          <Link to="/manage-farm" className="home-showcase-card">
            <img src={imageUrls.irrigation} alt="Drip irrigation installation for crops" loading="lazy" />
            <span>Irrigation & Maintenance <FaArrowRight aria-hidden="true" /></span>
          </Link>
          <Link to="/projects" className="home-showcase-card">
            <img src={imageUrls.coconut} alt="Young coconut palm planted on a farm" loading="lazy" />
            <span>Plantation Projects <FaArrowRight aria-hidden="true" /></span>
          </Link>
        </div>
      </section>

      <section className="trust-section home-section">
        <div className="section-heading">
          <span className="section-kicker">WHY VELWIN ESTATES</span>
          <h2><BsStars /> Built for farmers. Driven by impact.</h2>
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

      <section className="how-it-works-section home-section">
        <div className="section-heading">
            <div className="section-heading-container">
              <span className="section-kicker">HOW IT WORKS</span>
              <h2><MdSettings /> A clear process, from visit to completion.</h2>
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
      </section>

      <section className="home-visit-band">
        <div>
          <span className="section-kicker">SITE VISIT & FARM CONSULTATION</span>
          <h2>Start with a clear view of your land.</h2>
          <p>Our team visits your site, understands your requirements, and discusses practical next steps. Advance booking is required.</p>
        </div>
        <div className="home-visit-prices">
          <span>Up to 50 km <strong>₹4,999</strong></span>
          <span>50–100 km <strong>₹9,999</strong></span>
          <Link to="/book-team" className="home-action-primary">Book a site visit <FaArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-final-cta">
        <span className="section-kicker">LET’S GROW TOGETHER</span>
        <h2>Make your land more productive.</h2>
        <p>Tell us what you want to achieve. We’ll help you plan the next step.</p>
        <div className="home-hero-actions">
          <Link to="/book-team" className="home-action-primary">Talk to our team <FaArrowRight aria-hidden="true" /></Link>
          <Link to="/projects" className="home-action-secondary">See our past work</Link>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
