import React, { useEffect, useMemo, useState } from 'react';
import { apiUrl, imageUrl } from '../api';
import { authHelper } from './authHelper';

const emptyProject = {
  id: '',
  title: '',
  image: '',
  imageAlt: '',
  location: '',
  category: '',
  description: ''
};

const defaultImage = 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878900/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_17_PM.jpg';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState(emptyProject);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch(apiUrl('/api/projects'));
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to load projects');
      setProjects(data);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditingProject(null);
    setFormData({ ...emptyProject, image: defaultImage });
    setImageFile(null);
    setShowForm(true);
  }

  function startEdit(project) {
    setEditingProject(project);
    setFormData({
      id: project.id,
      title: project.title,
      image: project.image || '',
      imageAlt: project.imageAlt || '',
      location: project.location || '',
      category: project.category || '',
      description: project.description || ''
    });
    setImageFile(null);
    setShowForm(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.title.trim() || !formData.location.trim() || !formData.category.trim()) {
      setStatus('Title, location, and category are required.');
      return;
    }

    setSaving(true);
    setStatus('');
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'id' && value !== null && value !== undefined) {
          form.append(key, value);
        }
      });
      if (imageFile) form.append('image', imageFile);

      const endpoint = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const response = await fetch(apiUrl(endpoint), {
        method: editingProject ? 'PUT' : 'POST',
        body: form
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Failed to save project');

      setProjects(previous => {
        if (editingProject) {
          return previous.map(project => project.id === result.id ? result : project);
        }
        return [result, ...previous];
      });
      resetForm();
      setStatus(editingProject ? 'Project updated.' : 'Project added.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project) {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    setSaving(true);
    setStatus('');
    try {
      const response = await fetch(apiUrl(`/api/projects/${project.id}`), { method: 'DELETE' });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Failed to delete project');
      setProjects(previous => previous.filter(item => item.id !== project.id));
      if (editingProject && editingProject.id === project.id) resetForm();
      setStatus(result.message || 'Project deleted.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setShowForm(false);
    setEditingProject(null);
    setFormData(emptyProject);
    setImageFile(null);
  }

  const imagePreview = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return formData.image || defaultImage;
  }, [formData.image, imageFile]);

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '2em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1em', flexWrap: 'wrap', marginBottom: '2em' }}>
        <div>
          <h1 style={{ color: '#388e3c', margin: 0 }}>🖼️ Manage Projects</h1>
          <p style={{ color: '#666', margin: '0.5em 0 0', fontSize: '0.9em' }}>
            👤 Logged in as: <strong>{authHelper.getUser()?.username || 'Admin'}</strong>
          </p>
        </div>
        <button type="button" onClick={startCreate} style={{ background: '#388e3c', color: 'white', border: 0, borderRadius: 8, padding: '0.8em 1.5em', cursor: 'pointer', fontWeight: 700 }}>
          + Add Project
        </button>
      </div>

      {status && <p role="status" style={{ marginBottom: '1em', color: status.includes('Failed') || status.includes('required') || status.includes('Failed') ? '#a33b32' : '#285943' }}>{status}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #d6d2c7', borderRadius: 12, padding: '1.5em', marginBottom: '2em' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1em' }}>
            <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600 }}>Project title<input name="title" value={formData.title} onChange={handleInputChange} required style={inputStyle} /></label>
            <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600 }}>Location<input name="location" value={formData.location} onChange={handleInputChange} required style={inputStyle} /></label>
            <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600 }}>Category<input name="category" value={formData.category} onChange={handleInputChange} required style={inputStyle} /></label>
            <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600 }}>Image alt text<input name="imageAlt" value={formData.imageAlt} onChange={handleInputChange} style={inputStyle} /></label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 220px', gap: '1em', marginTop: '1em', alignItems: 'center' }}>
            <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600 }}>Project image URL<input name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." style={inputStyle} /></label>
            <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600, cursor: 'pointer' }}>Upload image<input type="file" accept="image/*" onChange={event => setImageFile(event.target.files[0])} style={{ ...inputStyle, padding: '0.7em' }} /></label>
          </div>

          <div style={{ aspectRatio: '16 / 9', maxWidth: 420, background: '#f1f3ed', borderRadius: 10, overflow: 'hidden', marginTop: '1em' }}>
            <img src={imagePreview} alt={formData.imageAlt || formData.title || 'Project preview'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={event => { event.target.src = defaultImage; }} />
          </div>

          <label style={{ display: 'grid', gap: '0.4em', fontWeight: 600, marginTop: '1em' }}>Description<textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" style={{ ...inputStyle, resize: 'vertical' }} /></label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75em', marginTop: '1.5em' }}>
            <button type="button" onClick={resetForm} disabled={saving} style={{ background: '#666', color: 'white', border: 0, borderRadius: 8, padding: '0.75em 1.25em', cursor: saving ? 'wait' : 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ background: '#388e3c', color: 'white', border: 0, borderRadius: 8, padding: '0.75em 1.25em', cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      )}

      {loading ? <p>Loading projects...</p> : projects.length === 0 ? <p>No projects found.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25em' }}>
          {projects.map(project => (
            <article key={project.id} style={{ background: '#fff', border: '1px solid #d6d2c7', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', background: '#eef2ed' }}>
                <img src={imageUrl(project.image)} alt={project.imageAlt || project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={event => { event.target.src = defaultImage; }} />
              </div>
              <div style={{ padding: '1em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5em', fontSize: '0.8em', color: '#285943', textTransform: 'capitalize' }}>
                  <span>{project.location}</span>
                  <span>{project.category}</span>
                </div>
                <h2 style={{ margin: '0.5em 0', fontSize: '1.1em' }}>{project.title}</h2>
                <p style={{ color: '#555', margin: 0, minHeight: '3.5em' }}> {project.description || 'No description provided.'}</p>
                <div style={{ display: 'flex', gap: '0.5em', marginTop: '1em' }}>
                  <button type="button" onClick={() => startEdit(project)} style={{ flex: 1, background: '#f0f0e8', color: '#26432d', border: 0, borderRadius: 8, padding: '0.65em', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                  <button type="button" onClick={() => handleDelete(project)} style={{ flex: 1, background: '#a33b32', color: 'white', border: 0, borderRadius: 8, padding: '0.65em', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.7em 0.8em',
  border: '1px solid #c8c2b4',
  borderRadius: 8,
  fontSize: '0.95em',
  boxSizing: 'border-box'
};
