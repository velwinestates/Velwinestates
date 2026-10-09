import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLeaf, FaArrowRight } from 'react-icons/fa';

function NotFoundPage() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-background" aria-hidden="true">
        <span className="float-orb orb-one" />
        <span className="float-orb orb-two" />
        <span className="float-orb orb-three" />
      </div>

      <div className="not-found-card">
        <div className="not-found-badge-wrap">
          <div className="not-found-badge">404</div>
        </div>

        <h1 id="not-found-title">Page not found</h1>
        <p>
          The page you were looking for may have moved, been removed, or never existed.
          Let’s get you back to growing a healthier farm journey.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary not-found-btn">
            <FaHome /> Back to home
          </Link>
          <Link to="/our-services" className="btn btn-secondary not-found-btn secondary">
            <FaLeaf /> Explore services
            <FaArrowRight className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
