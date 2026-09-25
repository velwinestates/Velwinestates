import React, { useEffect, useState } from 'react';
import { apiUrl, imageUrl } from '../api';

const pageGroups = [
  {
    id: 'home',
    label: 'Home page carousel',
    slots: [
      ['slide1', 'Construction Project'],
      ['slide2', 'Farmhouse Construction'],
      ['slide3', 'Swimming Pool Construction'],
      ['slide4', 'Water Tank Construction'],
      ['slide5', 'Farm Fencing'],
      ['slide6', 'Polyhouse Construction'],
      ['slide7', 'Livestock Shed Construction'],
      ['slide8', 'Farm Shed Construction'],
      ['slide9', 'Drip Irrigation Installation']
    ]
  },
  {
    id: 'construction',
    label: 'Construction page gallery',
    slots: [
      ['hero', 'Construction Project'],
      ['farmhouse', 'Farmhouse Construction'],
      ['pool', 'Swimming Pool Construction'],
      ['waterTank', 'Water Tank Construction'],
      ['fencing', 'Farm Fencing'],
      ['polyhouse', 'Polyhouse Construction'],
      ['livestock', 'Livestock Shed Construction'],
      ['farmShed', 'Farm Shed Construction'],
      ['irrigation', 'Drip Irrigation Installation']
    ]
  }
];

export default function AdminPageImagesPage() {
  const [media, setMedia] = useState({});
  const [status, setStatus] = useState('Loading page images...');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    fetch(apiUrl('/api/site-media'), { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Unable to load page images.')))
      .then(data => { setMedia(data || {}); setStatus(''); })
      .catch(error => setStatus(error.message));
  }, []);

  async function uploadImage(page, slot, file) {
    if (!file) return;
    const key = `${page}.${slot}`;
    setBusy(key);
    setStatus('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(apiUrl(`/api/site-media/${page}/${slot}`), { method: 'PUT', body: formData });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to upload image.');
      setMedia(previous => ({ ...previous, [key]: data.url }));
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy('');
    }
  }

  async function deleteImage(page, slot) {
    const key = `${page}.${slot}`;
    if (!media[key] || !window.confirm('Delete this page image and restore the default image?')) return;
    setBusy(key);
    setStatus('');
    try {
      const response = await fetch(apiUrl(`/api/site-media/${page}/${slot}`), { method: 'DELETE' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to delete image.');
      setMedia(previous => {
        const next = { ...previous };
        delete next[key];
        return next;
      });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy('');
    }
  }

  return (
    <section style={{ fontFamily: 'var(--font-family)' }}>
      <h2 style={{ marginBottom: '0.35rem' }}>Page Images</h2>
      <p style={{ marginTop: 0, color: '#5d6b63' }}>Add, edit, or delete images used across the home and construction pages.</p>
      {status && <p role="status">{status}</p>}
      {pageGroups.map(group => (
        <section key={group.id} style={{ marginTop: '1.5rem' }}>
          <h3>{group.label}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {group.slots.map(([slot, label]) => {
              const key = `${group.id}.${slot}`;
              const isBusy = busy === key;
              return (
                <article key={key} style={{ border: '1px solid #d6d2c7', borderRadius: 8, padding: '0.8rem', background: '#fff' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.6rem' }}>{label}</div>
                  <div style={{ aspectRatio: '16 / 9', background: '#f1f3ed', marginBottom: '0.7rem', overflow: 'hidden' }}>
                    {media[key] ? <img src={imageUrl(media[key])} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ padding: '1rem', color: '#68736c' }}>Using default image</div>}
                  </div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#285943', cursor: isBusy ? 'wait' : 'pointer' }}>
                    {isBusy ? 'Saving...' : 'Choose image'}
                    <input type="file" accept="image/*" disabled={isBusy} onChange={event => uploadImage(group.id, slot, event.target.files[0])} style={{ display: 'block', marginTop: '0.35rem', width: '100%' }} />
                  </label>
                  {media[key] && <button type="button" disabled={isBusy} onClick={() => deleteImage(group.id, slot)} style={{ marginTop: '0.65rem', border: 0, background: 'transparent', color: '#a33b32', cursor: isBusy ? 'wait' : 'pointer', padding: 0 }}>Delete image</button>}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
