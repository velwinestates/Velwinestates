import React, { useEffect, useState } from 'react';
import { apiUrl, imageUrl } from '../api';

const pageGroups = [
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
    <section className="admin-page-images" style={{ fontFamily: 'var(--font-family)' }}>
      <h2 style={{ marginBottom: '0.35rem' }}>Page Images</h2>
      <p className="admin-page-images-description" style={{ marginTop: 0, color: '#5d6b63' }}>Manage construction gallery images.</p>
      {status && <p role="status">{status}</p>}
      {pageGroups.map(group => (
        <section className="admin-page-image-group" key={group.id}>
          <h3>{group.label}</h3>
          <div className="admin-page-image-grid">
            {group.slots.map(([slot, label]) => {
              const key = `${group.id}.${slot}`;
              const isBusy = busy === key;
              return (
                <article className="admin-page-image-card" key={key}>
                  <div className="admin-page-image-label">{label}</div>
                  <div className="admin-page-image-preview">
                    {media[key] ? <img src={imageUrl(media[key])} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ padding: '1rem', color: '#68736c' }}>Using default image</div>}
                  </div>
                  <label className="admin-page-image-upload" style={{ cursor: isBusy ? 'wait' : 'pointer' }}>
                    {isBusy ? 'Saving...' : 'Choose image'}
                    <input type="file" accept="image/*" disabled={isBusy} onChange={event => uploadImage(group.id, slot, event.target.files[0])} />
                  </label>
                  {media[key] && <button className="admin-page-image-delete" type="button" disabled={isBusy} onClick={() => deleteImage(group.id, slot)} style={{ cursor: isBusy ? 'wait' : 'pointer' }}>Delete image</button>}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
