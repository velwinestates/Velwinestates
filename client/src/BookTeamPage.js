import React, { useRef, useState } from 'react';
import { apiUrl } from './api';
import { sanitizePhone, isValidPhone } from './utils/validation';

const initialForm = {
  name: '',
  email: '',
  contact: '',
  serviceType: '',
  address: '',
  farmSize: '',
  preferredDate: '',
  crop: '',
  preferredContact: 'Phone call',
  preferredContactTime: '',
  notes: '',
  landImage: null
};

export default function BookTeamPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, success: false, message: '' });
  const formRef = useRef(null);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setSubmitted(false);
    if (name === 'landImage' && files?.[0]) {
      if (!files[0].type.startsWith('image/')) {
        setNotification({ show: true, success: false, message: 'Please choose an image file.' });
        setTimeout(() => setNotification({ show: false, success: false, message: '' }), 5000);
        e.target.value = '';
        return;
      }
      if (files[0].size > 10 * 1024 * 1024) {
        setNotification({ show: true, success: false, message: 'Farm photo must be 10 MB or smaller.' });
        setTimeout(() => setNotification({ show: false, success: false, message: '' }), 5000);
        e.target.value = '';
        return;
      }
    }
    const v = files ? files[0] : (name === 'contact' ? sanitizePhone(value) : value);
    setForm(f => ({
      ...f,
      [name]: v
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidPhone(form.contact)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    const extra = {
      'Service Type': form.serviceType,
      'Farm Location': form.address,
      'Address': form.address,
      'Farm Size': form.farmSize || 'Not specified',
      'Preferred Visit Date': form.preferredDate || 'Flexible',
      'Crop Planted': form.crop || 'Not specified',
      'Preferred Contact Method': form.preferredContact,
      'Preferred Contact Time': form.preferredContactTime || 'Any time',
      'Additional Details': form.notes || 'Not specified'
    };
    const payload = new FormData();
    payload.append('formType', 'Book My Team');
    payload.append('name', form.name);
    payload.append('email', form.email);
    payload.append('phone', form.contact);
    payload.append('message', `Service: ${form.serviceType}\nFarm location: ${form.address}\n${form.notes}`);
    payload.append('extra', JSON.stringify(extra));
    if (form.landImage) payload.append('landImage', form.landImage);

    try {
      const response = await fetch(apiUrl('/api/send-email'), {
        method: 'POST',
        body: payload
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(result.error || 'Unable to submit booking request.');
        error.storedLocally = result.storedLocally === true;
        throw error;
      }

      formRef.current?.reset();
      setForm(initialForm);
      setSubmitted(true);
      setNotification({
        show: true,
        success: true,
        message: `Thank you ${form.name}! Your team booking request has been submitted successfully. Our team will contact you soon!`
      });
      setTimeout(() => setNotification({ show: false, success: false, message: '' }), 5000);
    } catch (error) {
      console.error('Error submitting team booking form:', error);
      setNotification({
        show: true,
        success: false,
        message: error.storedLocally
          ? 'Your request was received, but a backup service is temporarily unavailable. Our team will follow up.'
          : error.message || 'Failed to submit booking request. Please try again.'
      });
      setTimeout(() => setNotification({ show: false, success: false, message: '' }), 6000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="book-team-page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="book-team-panel" style={{
        background: 'rgba(255,255,255,0.95)',
        padding: '2rem 2.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: 420,
      }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Book Our Team</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="book-team-form">
          <div className="book-team-field">
            <label htmlFor="team-name">Name</label>
            <input id="team-name" name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-email">Email</label>
            <input id="team-email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required={form.preferredContact === 'Email'} />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-contact">Contact Number</label>
            <input id="team-contact" name="contact" value={form.contact} onChange={handleChange} required type="tel" inputMode="numeric" pattern="^[0-9]{10}$" maxLength="10" title="Enter a valid 10-digit phone number" autoComplete="tel" />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-service">Service Required</label>
            <select id="team-service" name="serviceType" value={form.serviceType} onChange={handleChange} required>
              <option value="">Choose a service</option>
              <option value="Farm maintenance / AMC">Farm maintenance / AMC</option>
              <option value="New farm project">New farm project</option>
              <option value="Construction">Construction</option>
              <option value="Irrigation or fencing">Irrigation or fencing</option>
              <option value="Plantation">Plantation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="book-team-field">
            <label htmlFor="team-address">Farm Address or Village</label>
            <textarea id="team-address" name="address" value={form.address} onChange={handleChange} required autoComplete="street-address" />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-size">Farm Size (acres, optional)</label>
            <input id="team-size" name="farmSize" type="number" min="0.1" step="0.1" value={form.farmSize} onChange={handleChange} />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-date">Preferred Visit Date (optional)</label>
            <input id="team-date" name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-contact-method">Preferred Contact Method</label>
            <select id="team-contact-method" name="preferredContact" value={form.preferredContact} onChange={handleChange}>
              <option value="Phone call">Phone call</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div className="book-team-field">
            <label htmlFor="team-contact-time">Best Time to Contact (optional)</label>
            <select id="team-contact-time" name="preferredContactTime" value={form.preferredContactTime} onChange={handleChange}>
              <option value="">Any time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div className="book-team-field">
            <label htmlFor="team-crop">Crop Planted (optional)</label>
            <input id="team-crop" name="crop" value={form.crop} onChange={handleChange} />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-notes">Additional Requirements (optional)</label>
            <textarea id="team-notes" name="notes" value={form.notes} onChange={handleChange} maxLength="1000" />
          </div>
          <div className="book-team-field">
            <label htmlFor="team-image">Farm Photo (optional, max 10 MB)</label>
            <input id="team-image" type="file" name="landImage" accept="image/*" onChange={handleChange} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
          </button>
        </form>
        {submitted && <div role="status" style={{ color: 'var(--primary-color)', marginTop: 20, textAlign: 'center', fontWeight: 'bold' }}>Thank you! We received your details.</div>}
      </div>
      
      {/* Toast Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          minWidth: '320px',
          maxWidth: '400px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `3px solid ${notification.success ? '#4CAF50' : '#f44336'}`,
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          animation: 'toastSlideIn 0.5s ease-out'
        }}>
          {/* Colored header bar */}
          <div style={{
            background: notification.success 
              ? 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)'
              : 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
            padding: '1em 1.5em',
            display: 'flex',
            alignItems: 'center',
            gap: '1em'
          }}>
            <div style={{
              fontSize: '2em',
              animation: 'scaleIn 0.5s ease-out'
            }}>
              {notification.success ? '✓' : '✕'}
            </div>
            <div>
              <h4 style={{ margin: 0, color: 'white', fontSize: '1.1em', fontWeight: 600 }}>
                {notification.success ? 'Success!' : 'Error'}
              </h4>
            </div>
          </div>

          {/* Message content */}
          <div style={{
            padding: '1.5em',
            color: '#333',
            fontSize: '0.95em',
            lineHeight: '1.6'
          }}>
            {notification.message}
          </div>

          {/* Progress bar */}
          {notification.success && (
            <div style={{
              height: '4px',
              background: '#e0e0e0',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: '#4CAF50',
                animation: 'progressBar 3s linear'
              }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
