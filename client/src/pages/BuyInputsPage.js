

import 'leaflet/dist/leaflet.css';
import {  FaTractor, FaCalendarAlt, FaCheckCircle, FaShoppingCart} from 'react-icons/fa';
import '../App.css';
import imageUrls from '../data/imageUrls';

function BuyInputsPage() {
  return (
    <div className="buy-inputs-page">
      <section className="page-header">
        <h1><FaShoppingCart /> Buy Agri Inputs – Uzhavar Mart</h1>
        <div className="phase-badge">Service information</div>
      </section>
      
      <div className="coming-soon">
        <div className="coming-soon-content">
          <h2>Agricultural Inputs</h2>
          <p>We are preparing a verified supply service for fertilizers, tools, motors, and other farm essentials.</p>
          <div className="features-preview">
            <div className="feature">
              <FaShoppingCart className="feature-icon" />
              <p>Buy fertilizers, pesticides, motors, tools</p>
            </div>
            <div className="feature">
              <FaCheckCircle className="feature-icon" />
              <p>Verified brands with farmer reviews</p>
            </div>
            <div className="feature">
              <FaTractor className="feature-icon" />
              <p>Bulk pricing + delivery</p>
            </div>
            <div className="feature">
              <FaCalendarAlt className="feature-icon" />
              <p>AMC-linked auto refill</p>
            </div>
          </div>
          <button className="btn btn-primary">Enquire About Inputs</button>
        </div>
        <div className="coming-soon-image">
          <img src={imageUrls.fertilizer} alt="Agricultural Supplies" />
        </div>
      </div>
    </div>
  );
}

export default BuyInputsPage;