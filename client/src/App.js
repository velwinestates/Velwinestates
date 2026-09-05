import React, { lazy, Suspense, useState, useEffect } from 'react';
import ProtectedRoute from './admin/ProtectedRoute';
import { AdminAuthProvider } from './admin/AdminAuthProvider';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import projects from './data/projects';
import ScrollToTop from './ScrollToTop';
import NavbarMenuDemo from './components/NavbarMenuDemo';
import { apiUrl } from './api';

const ConfirmPlan = lazy(() => import('./ConfirmPlan'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const CompaniesPage = lazy(() => import('./CompaniesPage'));
const RequestQuotePage = lazy(() => import('./RequestQuotePage'));
const ProjectsPage = lazy(() => import('./ProjectsPage'));
const FarmDetailsPage = lazy(() => import('./FarmDetailsPage'));
const BookTeamPage = lazy(() => import('./BookTeamPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ManageFarmPage = lazy(() => import('./pages/ManageFarmPage'));
const BuyInputsPage = lazy(() => import('./pages/BuyInputsPage'));
const SellProducePage = lazy(() => import('./pages/SellProducePage'));
const JoinUsPage = lazy(() => import('./pages/JoinUsPage'));
const LandPage = lazy(() => import('./pages/LandPage'));
const ConstructionPage = lazy(() => import('./pages/ConstructionPage'));
const OurServicesPage = lazy(() => import('./pages/OurServicesPage'));
const DeveloperInfoPage = lazy(() => import('./pages/DeveloperInfoPage'));

const seoPages = {
  '/': {
    title: 'Velwin Estates | Farm Management Services in Tamil Nadu',
    description: 'Velwin Estates helps farmers with farm management, AMC, drip irrigation, fencing, planting, harvesting, inputs supply, soil testing, and buyer connect in Tamil Nadu.',
    keywords: 'farm management, agricultural services, Tamil Nadu farming, AMC for farms, farm inputs, irrigation, fencing, crop sales'
  },
  '/about': {
    title: 'About Velwin Estates | Trusted Farm Execution Partner',
    description: 'Learn about Velwin Estates and how our farm execution team manages work from planning to execution with photo proof and transparent reporting.',
    keywords: 'about Velwin Estates, farm execution, agricultural services, trusted farm partner'
  },
  '/manage-farm': {
    title: 'Manage My Farm | AMC, Irrigation, Planting & Maintenance',
    description: 'Manage your farm with Velwin Estates through scheduled AMC, crop care, irrigation, fencing, and on-field execution support.',
    keywords: 'manage farm, farm AMC, irrigation services, farm maintenance, planting service'
  },
  '/buy-inputs': {
    title: 'Buy Agri Inputs | Seeds, Fertilizers & Farm Supplies',
    description: 'Buy agri inputs including fertilizers, tools, motors, and crop-support supplies for your farm with trusted delivery and support.',
    keywords: 'buy agri inputs, farm inputs, fertilizers, seeds, irrigation items'
  },
  '/sell-produce': {
    title: 'Sell My Produce | Buyer Connect & Market Support',
    description: 'Sell your produce through Velwin Estates with buyer connection, market guidance, and support for better farm income.',
    keywords: 'sell produce, farmer buyer connect, agri market, crop sales'
  },
  '/projects': {
    title: 'Our Farm Projects | Recent Work & Past Projects',
    description: 'Explore Velwin Estates recent projects including fencing, irrigation, tank work, polyhouse installations, and farm construction.',
    keywords: 'farm projects, agri project work, fencing, irrigation projects, tank construction'
  },
  '/book-team': {
    title: 'Book Our Team | Farm Service & Site Visit',
    description: 'Book a professional farm team for site visits, execution planning, agriculture services, and customized project support.',
    keywords: 'book farm team, site visit, agriculture team booking, farm service team'
  },
  '/farm-details': {
    title: 'Upload My Farm Details | Request Farm Assessment',
    description: 'Share your farm details with Velwin Estates to get a site assessment, project planning, and a customized execution proposal.',
    keywords: 'farm details upload, farm assessment, agricultural consulting, site inspection'
  },
  '/land': {
    title: 'Land Services | Buy, Sell & Verify Farm Land',
    description: 'Explore land buying and selling assistance with verified farm land opportunities, soil insights, and trusted farmland guidance.',
    keywords: 'farm land, buy land, sell land, farmland verification, agriculture land'
  },
  '/construction': {
    title: 'Farm Construction Services | Tanks, Sheds & Irrigation Works',
    description: 'Build concrete farm infrastructure such as water tanks, sheds, and irrigation-related construction works with Velwin Estates.',
    keywords: 'farm construction, tank construction, shed building, irrigation construction'
  },
  '/our-services': {
    title: 'Our Services | Farm AMC, Inputs, Sales & Execution',
    description: 'Explore Velwin Estates services for annual maintenance, input supply, crop sales assistance, and execution support for farms.',
    keywords: 'farm services, AMC services, agri inputs, production support, crop sales'
  }
};

function App() {
  // Notification state for farm submission redirect
  const [notification, setNotification] = useState({ show: false, success: false, message: '' });
  
  // Language state for Google Translate
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Check for notification from farm details submission
  useEffect(() => {
    // Safe sessionStorage access for SSR/build compatibility
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedNotification = sessionStorage.getItem('farmSubmitNotification');
      if (storedNotification) {
        const notif = JSON.parse(storedNotification);
        setNotification(notif);
        sessionStorage.removeItem('farmSubmitNotification');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
          setNotification({ show: false, success: false, message: '' });
        }, 3000);
      }
    }
    
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    setCurrentLanguage(savedLang);
  }, []);
  
  // Language change function
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  };

  const changeLanguage = (lang) => {
    const googleTransCookie = '/en/' + lang;
    setCookie('googtrans', googleTransCookie, 1);
    localStorage.setItem('selectedLang', lang);
    setCurrentLanguage(lang);
    window.location.reload();
  };

  // Modal state for Book a Project (legacy, not used)
  // const [showProjectModal, setShowProjectModal] = useState(false);

  // State for Book Project modal (used in main JSX)
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    description: ''
  });
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProjectInput = (e) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // send to backend
      await postToApi({
        formType: 'Project Request',
        name: projectForm.name,
        email: projectForm.email,
        phone: projectForm.phone,
        message: projectForm.description,
        extra: { projectType: projectForm.projectType }
      });
      
      setProjectSubmitted(true);
      setShowProjectForm(false);
      setProjectForm({ name: '', phone: '', email: '', projectType: '', description: '' });
      
      // Show success message for 3 seconds
      setTimeout(() => setProjectSubmitted(false), 3000);
      
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Soil Test Modal State for Fertilizer Plan
  const [showSoilTestModal, setShowSoilTestModal] = useState(false);
  const [soilTestForm, setSoilTestForm] = useState({
    name: '',
    phone: '',
    email: '',
    farmLocation: '',
    farmSize: ''
  });

  const handleSoilTestChange = (e) => {
    const { name, value } = e.target;
    setSoilTestForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSoilTestSubmit = (e) => {
    e.preventDefault();
    postToApi({
      formType: 'Soil Test',
      name: soilTestForm.name,
      email: soilTestForm.email,
      phone: soilTestForm.phone,
      extra: { farmLocation: soilTestForm.farmLocation, farmSize: soilTestForm.farmSize }
    }).then(() => {
      alert('Soil Test Scheduled! We will contact you soon.');
      setShowSoilTestModal(false);
      setSoilTestForm({ name: '', phone: '', email: '', farmLocation: '', farmSize: '' });
    }).catch(err => {
      console.error(err);
      alert('Failed to schedule soil test. Please try again later.');
    });
  };

  // helper to POST to backend
  const postToApi = async (payload) => {
    try {
      const res = await fetch(apiUrl('/api/send-email'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }
      return res.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Remove legacy handleBookProject and setShowProjectModal
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <AppContent 
        notification={notification}
        currentLanguage={currentLanguage}
        changeLanguage={changeLanguage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentSlide={currentSlide}
        showSoilTestModal={showSoilTestModal}
        setShowSoilTestModal={setShowSoilTestModal}
        soilTestForm={soilTestForm}
        handleSoilTestChange={handleSoilTestChange}
        handleSoilTestSubmit={handleSoilTestSubmit}
        showProjectForm={showProjectForm}
        setShowProjectForm={setShowProjectForm}
        projectForm={projectForm}
        handleProjectInput={handleProjectInput}
        handleProjectSubmit={handleProjectSubmit}
        projectSubmitted={projectSubmitted}
        isSubmitting={isSubmitting}
      />
    </Router>
  );
}

function AppContent({ 
  notification, currentLanguage, changeLanguage, isMenuOpen, setIsMenuOpen, currentSlide, 
  showSoilTestModal, setShowSoilTestModal, soilTestForm, 
  handleSoilTestChange, handleSoilTestSubmit, showProjectForm, 
  setShowProjectForm, projectForm, handleProjectInput, 
  handleProjectSubmit, projectSubmitted, isSubmitting 
}) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const seoData = seoPages[location.pathname] || seoPages['/'];

  useEffect(() => {
    document.title = seoData.title;

    const updateMeta = (selector, attribute, value, isProperty = false) => {
      const meta = document.querySelector(selector) || document.createElement('meta');
      meta.setAttribute(isProperty ? 'property' : 'name', attribute);
      meta.setAttribute('content', value);
      if (!document.querySelector(selector)) {
        document.head.appendChild(meta);
      }
    };

    updateMeta('meta[name="description"]', 'description', seoData.description);
    updateMeta('meta[name="keywords"]', 'keywords', seoData.keywords);
    updateMeta('meta[property="og:title"]', 'og:title', seoData.title, true);
    updateMeta('meta[property="og:description"]', 'og:description', seoData.description, true);
    updateMeta('meta[property="og:type"]', 'og:type', 'website', true);
    updateMeta('meta[property="og:url"]', 'og:url', `${window.location.origin}${location.pathname}`, true);
    updateMeta('meta[name="twitter:title"]', 'twitter:title', seoData.title);
    updateMeta('meta[name="twitter:description"]', 'twitter:description', seoData.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${location.pathname}`);
  }, [location.pathname, seoData]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  return (
      <div key={currentLanguage} className="app" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Toast Notification for Farm Submission */}
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
                  background: notification.success ? '#4CAF50' : '#f44336',
                  animation: 'progressBar 3s linear'
                }} />
              </div>
            )}
          </div>
        )}

        {!isAdminPage && (
        <>
        <nav className="navbar" style={{ minHeight: '70px', padding: '0 1.5em', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div className="navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
            {/* Left side - Logo */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5em', fontSize: '1.1em', textDecoration: 'none' }}>
              <img src={process.env.PUBLIC_URL + '/logo.jpeg'} alt="Velwin Estates Logo" className="logo-icon" style={{ height: '64px', width: '64px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }} />
              <span className="logo-text" style={{ fontWeight: 700, color: '#388e3c' }}>Velwin Estates</span>
            </Link>
            
            {/* Right side - Menu Only */}
            <NavbarMenuDemo 
              currentLanguage={currentLanguage}
              changeLanguage={changeLanguage}
            />
          </div>
        </nav>
        </>
        )}

        <ScrollToTop />
        
        <main>
          <Suspense fallback={<div className="page-loading" role="status">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage currentSlide={currentSlide} />} />
            <Route path="/farm-details" element={<FarmDetailsPage />} />
            <Route path="/book-team" element={<BookTeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/manage-farm" element={
              <ManageFarmPage
                onOpenSoilTestModal={() => setShowSoilTestModal(true)}
                showProjectForm={showProjectForm}
                setShowProjectForm={setShowProjectForm}
                projectForm={projectForm}
                handleProjectInput={handleProjectInput}
                handleProjectSubmit={handleProjectSubmit}
                projectSubmitted={projectSubmitted}
                isSubmitting={isSubmitting}
              />
            } />
            <Route path="/buy-inputs" element={<BuyInputsPage />} />
            <Route path="/sell-produce" element={<SellProducePage />} />
            <Route path="/land" element={<LandPage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/our-services" element={<OurServicesPage />} />
            <Route path="/request-quote" element={<RequestQuotePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/join" element={<JoinUsPage />} />
            <Route path="/developer-info" element={<DeveloperInfoPage />} />
            <Route path="/confirm-plan" element={<ConfirmPlan />} />
            
            {/* Admin Routes - Wrapped with Auth Provider */}
            <Route path="/admin/login" element={
              <AdminAuthProvider>
                <AdminLogin />
              </AdminAuthProvider>
            } />
            
            {/* Protected Admin Dashboard with all admin pages */}
            <Route path="/admin/*" element={
              <AdminAuthProvider>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </AdminAuthProvider>
            } />
          </Routes>
          </Suspense>
          {/* Soil Test Modal for Fertilizer Plan - only rendered in App */}
          {showSoilTestModal && (
            <div className="modal-overlay">
              <div className="modal soil-test-modal">
                <button className="modal-close" onClick={() => setShowSoilTestModal(false)} title="Close">&times;</button>
                <h2>
                  <span role="img" aria-label="soil">🧪</span> Schedule Soil Test
                </h2>
                <form onSubmit={handleSoilTestSubmit} className="soil-test-form">
                  <label>
                    Name
                    <input type="text" name="name" value={soilTestForm.name} onChange={handleSoilTestChange} required placeholder="Enter your name" />
                  </label>
                  <label>
                    Phone
                    <input type="tel" name="phone" value={soilTestForm.phone} onChange={handleSoilTestChange} required placeholder="10-digit mobile number" maxLength="10" />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" value={soilTestForm.email} onChange={handleSoilTestChange} required placeholder="Enter your email" />
                  </label>
                  <label>
                    Farm Location
                    <input type="text" name="farmLocation" value={soilTestForm.farmLocation} onChange={handleSoilTestChange} required placeholder="e.g., Coimbatore" />
                  </label>
                  <label>
                    Farm Size (in acres)
                    <input type="text" name="farmSize" value={soilTestForm.farmSize} onChange={handleSoilTestChange} required placeholder="e.g., 5" />
                  </label>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowSoilTestModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
  <footer className="footer">
          {/* Row 1 - Velwin Estates */}
          <div className="footer-header">
            <h2>Velwin Estates</h2>
            <p>Professional farm management from planning to harvest.</p>
          </div>

          {/* Row 2 - Three Columns */}
          <div className="footer-content">
            {/* Column 1 - Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/join">Careers</Link></li>
              </ul>
            </div>

            {/* Column 2 - Address */}
            <div className="footer-section">
              <h3>Address</h3>
              <p>
                7/3, Duraiswamy Nagar<br />
                Coimbatore, Tamil Nadu - 641014<br />
                India
              </p>
            </div>

            {/* Column 3 - Contact Us */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: velwinestates@gmail.com</p>
              <p>Phone: +91 81100 13838 </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="footer-cta">
            <h2>Start with a One-Time Project or Choose a Monthly Plan</h2>
            <div className="cta-buttons">
              <Link to="/book-team">
                <button className="btn btn-primary">Book Now</button>
              </Link>
              <Link to="/join">
                <button className="btn btn-primary">Join US</button>
              </Link>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Velwin Estates. All rights reserved.</p>
            <p>Powered by Netcraft Studio</p>
          </div>
        </footer>
      </div>
  );
}

export default App;
