import React, { useEffect, useState } from 'react';
import { apiUrl, imageUrl } from './api';

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetch(apiUrl('/api/companies'))
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load company information.');
        return response.json();
      })
      .then((data) => {
        if (active) setCompanies(Array.isArray(data) ? data : []);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="companies-page">
      <section className="page-header">
        <h1>Our Companies</h1>
        <p>Our associated businesses and agricultural service divisions.</p>
      </section>

      <section className="companies-directory container" aria-live="polite">
        {loading && <p>Loading company information...</p>}
        {!loading && error && <p role="alert">{error}</p>}
        {!loading && !error && companies.length === 0 && <p>No company information is currently available.</p>}
        {!loading && !error && companies.map((company) => (
          <article className="company-card" key={company.id || company.name}>
            {company.logo && (
              <img src={imageUrl(company.logo)} alt={`${company.name} logo`} loading="lazy" />
            )}
            <div>
              <h2>{company.name}</h2>
              <p>{company.description || 'Agricultural services and business operations.'}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CompaniesPage;
