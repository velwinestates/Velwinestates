import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const mediaSlots = [
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
      const result = await response.json();
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
        <p>Upload replacement images for the Construction and Our Services pages.</p>
        {status && <p role="status">{status}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {mediaSlots.map(item => {
            const key = `${item.page}.${item.slot}`;
            return (
              <article key={key} style={{ border: '1px solid #ddd', borderRadius: 8, padding: '1rem' }}>
                <h3>{item.label}</h3>
                {media[key] && <img src={media[key]} alt={item.label} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', marginBottom: '0.75rem' }} />}
                <input type="file" accept="image/*" onChange={event => handleUpload(event, item)} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
