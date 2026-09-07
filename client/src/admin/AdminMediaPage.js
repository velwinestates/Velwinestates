import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const mediaSlots = [
  { page: 'home', slot: 'slide1', label: 'Home slide 1' },
  { page: 'home', slot: 'slide2', label: 'Home slide 2' },
  { page: 'home', slot: 'slide3', label: 'Home slide 3' },
  { page: 'home', slot: 'slide4', label: 'Home slide 4' },
  { page: 'home', slot: 'slide5', label: 'Home slide 5' },
  { page: 'home', slot: 'slide6', label: 'Home slide 6' },
  { page: 'home', slot: 'slide7', label: 'Home slide 7' },
  { page: 'home', slot: 'slide8', label: 'Home slide 8' },
  { page: 'home', slot: 'slide9', label: 'Home slide 9' },
  { page: 'construction', slot: 'hero', label: 'Construction hero' },
  { page: 'construction', slot: 'farmhouse', label: 'Farmhouse' },
  { page: 'construction', slot: 'pool', label: 'Swimming pool' },
  { page: 'construction', slot: 'waterTank', label: 'Water tank' },
  { page: 'construction', slot: 'fencing', label: 'Fencing' },
  { page: 'construction', slot: 'polyhouse', label: 'Polyhouse' },
  { page: 'construction', slot: 'livestock', label: 'Livestock shed' },
  { page: 'construction', slot: 'farmShed', label: 'Farm shed' },
  { page: 'construction', slot: 'irrigation', label: 'Drip irrigation' },
  { page: 'services', slot: 'farmWorkers', label: 'Farm management thumbnail' },
  { page: 'services', slot: 'drone', label: 'Drone services image' },
  { page: 'services', slot: 'fertilizer', label: 'Consultation thumbnail' },
  { page: 'services', slot: 'irrigation', label: 'Irrigation image' },
  { page: 'services', slot: 'waterTank', label: 'Water management image' }
];

const mediaSections = [
  {
    page: 'home',
    title: 'Home Page Slides',
    description: 'These images appear in the moving slider at the top of the website.'
  },
  {
    page: 'construction',
    title: 'Construction Page Images',
    description: 'Update the hero and project images used on the Construction page.'
  },
  {
    page: 'services',
    title: 'Our Services Page Images',
    description: 'Update thumbnails and images used throughout the Our Services page.'
  }
];

export default function AdminMediaPage() {
  const [media, setMedia] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(apiUrl('/api/site-media'))
      .then(response => response.ok ? response.json() : {})
      .then(data => setMedia(data || {}))
      .catch(() => setStatus('Unable to load saved images.'));
  }, []);

  async function handleUpload(event, item) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setStatus(`Uploading ${item.label}...`);

    try {
      const response = await fetch(apiUrl(`/api/site-media/${item.page}/${item.slot}`), {
        method: 'PUT',
        body: formData
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Upload failed');
      setMedia(previous => ({ ...previous, [`${item.page}.${item.slot}`]: result.url }));
      setStatus(`${item.label} updated successfully.`);
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section style={{ padding: '2rem 1rem', fontFamily: 'var(--font-family)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2>Page Images</h2>
        <p>Upload images for the Home page moving slides, Construction page, and Our Services page.</p>
        {status && <p role="status">{status}</p>}
        {mediaSections.map(section => (
          <section key={section.page} style={{
            marginTop: '2rem',
            padding: '1.25rem',
            background: '#f7f8f2',
            border: '1px solid #d6d2c7',
            borderRadius: 8
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#285943' }}>{section.title}</h3>
              <p style={{ margin: '0.4rem 0 0', color: '#5d6b63' }}>{section.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {mediaSlots.filter(item => item.page === section.page).map(item => {
                const key = `${item.page}.${item.slot}`;
                return (
                  <article key={key} style={{ border: '1px solid #ddd', borderRadius: 8, padding: '1rem', background: '#fff' }}>
                    <h4 style={{ marginTop: 0 }}>{item.label}</h4>
                    {media[key] && <img src={media[key]} alt={item.label} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', marginBottom: '0.75rem' }} />}
                    <input type="file" accept="image/*" onChange={event => handleUpload(event, item)} />
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
