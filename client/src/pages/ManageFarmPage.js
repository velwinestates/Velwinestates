import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import {  FaSeedling, FaClipboardList } from 'react-icons/fa';
import {  BsCalendarCheck } from 'react-icons/bs';
import '../App.css';
import {
  GiFarmTractor,
  GiPlantRoots,
} from 'react-icons/gi';
import { GiWoodenFence } from 'react-icons/gi';
import { apiUrl } from '../api';
import imageUrls from '../data/imageUrls';

function ManageFarmPage(props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monthly');
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  // All modal state and handlers come from props
  const {
    showProjectForm,
    setShowProjectForm,
    projectForm,
    handleProjectInput,
    handleProjectSubmit,
    projectSubmitted,
    onOpenSoilTestModal,
    isSubmitting
  } = props;

  // Load plans from backend
  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setLoadingPlans(true);
    try {
      const res = await fetch(apiUrl('/api/plans'));
      if (!res.ok) throw new Error(`Failed to load plans (${res.status})`);
      const data = await res.json();
      const normalizedPlans = Array.isArray(data) ? data.map(plan => {
        let features = plan.features;
        if (typeof features === 'string') {
          try {
            features = JSON.parse(features);
          } catch {
            features = features.split(',').map(feature => feature.trim()).filter(Boolean);
          }
        }
        return {
          ...plan,
          features: Array.isArray(features) ? features : [],
          duration: plan.duration || 'Monthly',
          description: plan.description || ''
        };
      }) : [];
      setPlans(normalizedPlans);
    } catch (error) {
      console.error('Error loading plans:', error);
      setPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  };
  
  return (
    <div className="manage-farm-page">
      <section className="page-header manage-farm-header">
        <p className="page-kicker">Farm care, planned around your needs</p>
        <h1><GiFarmTractor /> Manage My Farm</h1>
      </section>
      
      <div className="farm-tabs">
        <nav className="tab-headers" aria-label="Farm management services">
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            <BsCalendarCheck /> Monthly AMC
          </button>
          <button 
            className={`tab-btn ${activeTab === 'fertilizer' ? 'active' : ''}`}
            onClick={() => setActiveTab('fertilizer')}
          >
            <GiPlantRoots /> Fertilizer Plan
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pruning' ? 'active' : ''}`}
            onClick={() => setActiveTab('pruning')}
          >
            <FaSeedling /> Pruning & Pest Control
          </button>
          {/* Project Work tab fully removed as requested */}
          <button 
            className={`tab-btn ${activeTab === 'construction' ? 'active' : ''}`}
            onClick={() => setActiveTab('construction')}
          >
            <GiWoodenFence /> Construction
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaClipboardList /> Reports & Approval
          </button>
        </nav>
        
          {activeTab === 'monthly' && (
            <div className="tab-pane">
              <h2>Monthly AMC (Annual Maintenance Contract)</h2>
              <p>Our structured monthly maintenance plans keep your farm in optimal condition year-round.</p>
              {loadingPlans ? (
                <div style={{ textAlign: 'center', padding: '3em', color: '#666' }}>
                  Loading plans...
                </div>
              ) : plans.length === 0 ? (
                <div className="plan-cards">
                  <div className="plan-card">
                    <h3>Basic Plan</h3>
                    <ul>
                      <li>Monthly farm visit</li>
                      <li>Basic irrigation check</li>
                      <li>Pest monitoring</li>
                      <li>Monthly report</li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => navigate('/confirm-plan?type=basic')}>Select Plan</button>
                  </div>
                  <div className="plan-card featured">
                    <div className="featured-badge">Popular</div>
                    <h3>Standard Plan</h3>
                    <ul>
                      <li>Bi-weekly farm visit</li>
                      <li>Full irrigation maintenance</li>
                      <li>Pest control application</li>
                      <li>Fertilizer application</li>
                      <li>Detailed bi-weekly reports</li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => navigate('/confirm-plan?type=standard')}>Select Plan</button>
                  </div>
                  <div className="plan-card">
                    <h3>Premium Plan</h3>
                    <ul>
                      <li>Weekly farm visit</li>
                      <li>Complete farm management</li>
                      <li>Advanced pest management</li>
                      <li>Customized fertilizer program</li>
                      <li>Weekly detailed reports</li>
                      <li>Priority support</li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => navigate('/confirm-plan?type=premium')}>Select Plan</button>
                  </div>
                </div>
              ) : (
                <div className="plan-cards">
                  {plans.map((plan) => (
                    <div key={plan.id} className={`plan-card ${plan.popular ? 'featured' : ''}`}>
                      {plan.popular && <div className="featured-badge">Popular</div>}
                      <h3>{plan.name}</h3>
                      <p className="plan-duration">{plan.duration}</p>
                      {plan.description && <p className="plan-description">{plan.description}</p>}
                      <ul>
                        {plan.features.length > 0 ? plan.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        )) : <li>Farm maintenance tailored to your needs</li>}
                      </ul>
                      <button className="btn btn-primary" onClick={() => navigate(`/confirm-plan?type=${plan.id}`)}>Select Plan</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'fertilizer' && (
            <div className="tab-pane">
              <h2>Fertilizer Plan</h2>
              <p>Custom fertilizer scheduling based on crop needs and seasonal conditions.</p>
              <div className="fertilizer-content">
                <div className="fertilizer-image">
                  <img src={imageUrls.fertilizer} alt="Fertilizer Application" />
                </div>
                <div className="fertilizer-info">
                  <h3>Weather-Synced Fertilizer Application</h3>
                  <p>Our system automatically adjusts your fertilizer schedule based on weather forecasts and soil conditions.</p>
                  <ul>
                    <li>Soil testing and analysis</li>
                    <li>Custom nutrient programs</li>
                    <li>Seasonal adjustments</li>
                    <li>Organic and conventional options</li>
                  </ul>
                  <button className="btn btn-primary" onClick={onOpenSoilTestModal}>Schedule Soil Test</button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'pruning' && (
            <div className="tab-pane">
              <h2>Pruning & Pest Control</h2>
              <p>Keep crops productive with timely pruning and crop-appropriate pest management.</p>
              <div className="service-details">
                <div className="service-image">
                  <img src={imageUrls.pruning} alt="Expert Pruning Services" />
                </div>
                <div className="service-text">
                  <h3>Expert Pruning Services</h3>
                  <p>We plan pruning around crop type and season to manage canopy growth, remove damaged branches, and support healthy flowering and harvest access.</p>
                  <ul>
                    <li>Seasonal and post-harvest pruning</li>
                    <li>Structural shaping for young trees</li>
                    <li>Rejuvenation of mature plants</li>
                    <li>Removal of damaged or unproductive growth</li>
                  </ul>
                </div>
              </div>
              <div className="service-details reversed">
                <div className="service-image">
                  <img src={imageUrls.farmWorkers} alt="Farm workers inspecting crop health" />
                </div>
                <div className="service-text">
                  <h3>Integrated Pest Management</h3>
                  <p>Our team monitors crop conditions, identifies pest risks, and recommends targeted controls suited to the crop and its growth stage.</p>
                  <ul>
                    <li>Field scouting and pest identification</li>
                    <li>Preventive and crop-appropriate control measures</li>
                    <li>Targeted treatment when required</li>
                    <li>Follow-up checks to review crop health</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'construction' && (
            <div className="tab-pane">
              <h2>Construction Services</h2>
              <p>Build essential farm infrastructure with our experienced construction teams.</p>
              <div className="construction-items">
                <div className="construction-item">
                  <img src={imageUrls.waterTank} alt="Water Tank" />
                  <h3>Water Tanks</h3>
                  <p>Storage solutions for irrigation needs.</p>
                </div>
                <div className="construction-item">
                  <img src={imageUrls.farmShed} alt="Farm shed for equipment and harvest storage" />
                  <h3>Farm Shed Construction</h3>
                  <p>Site-planned covered storage for farm equipment, tools, and harvested produce, designed around your day-to-day farm workflow.</p>
                </div>
                <div className="construction-item">
                  <img src={imageUrls.farmhouse} alt="Farmhouse" />
                  <h3>Farmhouses</h3>
                  <p>Comfortable on-farm living spaces.</p>
                </div>
              </div>
              <Link to="/construction" className="btn btn-primary center-btn">View All Construction Services</Link>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="tab-pane">
              <h2>Reports & Approval Logs</h2>
              <p>Track all farm activities with detailed documentation.</p>
              <div className="reports-demo">
                <div className="reports-image">
                  <img src={imageUrls.reports} alt="Reports Dashboard" />
                </div>
                <div className="reports-features">
                  <h3>Our Reporting System Includes:</h3>
                  <ul>
                    <li>Photo documentation of all work</li>
                    <li>Task completion timestamps</li>
                    <li>Worker performance metrics</li>
                    <li>Material usage tracking</li>
                    <li>Weather condition logs</li>
                    <li>Digital approval systems</li>
                    <li>Monthly summary reports</li>
                  </ul>
                  {/* View Sample Report button removed as requested */}
                </div>
              </div>
              <div className="approval-system">
                <h3>Easy Approval System</h3>
                <p>Review and approve work through our app or WhatsApp messages.</p>
                <div className="approval-demo">
                  <div className="approval-step">
                    <div className="step-number">1</div>
                    <p>Receive notification of completed work</p>
                  </div>
                  <div className="approval-step">
                    <div className="step-number">2</div>
                    <p>View photos and details</p>
                  </div>
                  <div className="approval-step">
                    <div className="step-number">3</div>
                    <p>Approve or request changes</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      
      <div className="farm-cta">
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => setActiveTab('monthly')}>Start AMC</button>
          <button className="btn btn-primary" onClick={() => setShowProjectForm(true)}>Book Project</button>
          <Link to="/farm-details" className="btn btn-primary" style={{marginLeft:'1em',background:'var(--primary-color)',color:'#fff'}}>Upload My Farm Details</Link>
        </div>
        {showProjectForm && (
          <div className="modal-overlay" onClick={() => setShowProjectForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-card">
                <h2>Book a Project</h2>
                <form onSubmit={handleProjectSubmit} className="project-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={projectForm.name} 
                    onChange={handleProjectInput} 
                    placeholder="Enter your full name"
                    required 
                    pattern="^[A-Za-z ]+$" 
                    title="Name should contain only letters and spaces" 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={projectForm.phone} 
                    onChange={handleProjectInput} 
                    placeholder="10-digit mobile number"
                    required 
                    pattern="^[0-9]{10}$" 
                    maxLength="10" 
                    title="Enter a valid 10-digit phone number" 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={projectForm.email} 
                    onChange={handleProjectInput} 
                    placeholder="your.email@example.com"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Project Type *</label>
                  <select name="projectType" value={projectForm.projectType} onChange={handleProjectInput} required>
                    <option value="">-- Choose Project Type --</option>
                    <option value="Fencing">Fencing</option>
                    <option value="Drip Irrigation">Drip Irrigation</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Land Preparation">Land Preparation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project Description *</label>
                  <textarea 
                    name="description" 
                    value={projectForm.description} 
                    onChange={handleProjectInput} 
                    rows="4" 
                    placeholder="Tell us about your project requirements, timeline, and any specific details..."
                    required 
                    maxLength="500" 
                    title="Describe your project (max 500 characters)" 
                  />
                </div>
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting}
                    style={{ 
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? '⏳ Submitting...' : 'Submit Request'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowProjectForm(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        )}
        {projectSubmitted && (
          <div className="project-success">
            <p>Thank you! Your project request has been submitted.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageFarmPage;