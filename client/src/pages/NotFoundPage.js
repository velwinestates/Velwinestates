import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight } from 'react-icons/fa';
import farmWorkersImage from '../assert/farm workers.jpg';

function NotFoundPage() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-layout">
        <div className="not-found-copy">
          <div className="not-found-kicker">
            <span aria-hidden="true" />
            Velwin field guide / 404
          </div>

          <div className="not-found-code" aria-label="Error 404">
            <span>404</span>
            <span className="not-found-code-note">OFF THE MAP</span>
          </div>

          <h1 id="not-found-title">This path didn’t <em>take root.</em></h1>
          <p>
            We couldn’t find the page you’re looking for. It may have moved on to greener fields.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="not-found-home-link">
              <FaHome aria-hidden="true" />
              Back to home
            </Link>
            <Link to="/our-services" className="not-found-services-link">
              Explore services
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="not-found-reference">
            <span>Route reference</span>
            <span>VE / 404 / NO MATCH</span>
          </div>
        </div>

        <figure className="not-found-visual">
          <img src={farmWorkersImage} alt="Farmers reviewing crops together in a field" />
          <span className="not-found-photo-index" aria-hidden="true">FIELD<br />04</span>
          <figcaption>
            <span>Back to the work that matters</span>
            <span>Velwin Estates · Tamil Nadu</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default NotFoundPage;
