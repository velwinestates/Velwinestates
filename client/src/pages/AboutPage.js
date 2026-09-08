import 'leaflet/dist/leaflet.css';
import '../App.css';
import imageUrls from '../data/imageUrls';

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Who We Are</h1>
          <div className="about-statement">
            <p>Velwin Estates is a professional farm execution partner helping landowners and growers manage operations with clarity and accountability.</p>
            <p className="highlight">We plan carefully, execute efficiently, and report transparently.</p>
            <p className="highlight">From fieldwork to farm improvement, we focus on dependable results.</p>
          </div>
        </div>
        <div className="about-hero-image">
          <img src={imageUrls.farmWorkers} alt="Farm Workers" />
        </div>
      </section>
      
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>Whether you're a 10-acre landowner or NRI, we offer peace of mind, proof of work, and professional systems.</p>
        <blockquote>Build your farm like it's a factory.</blockquote>
      </section>
      
      <section className="about-team">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={imageUrls.founder} alt="Founder" />
            <h3>Velu Samy</h3>
            <p style={{ color: '#388e3c', fontWeight: 'bold' }}>Founder</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;