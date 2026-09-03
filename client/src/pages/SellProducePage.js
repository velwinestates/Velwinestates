import { MdSell } from "react-icons/md";
import { FaImage,FaHandshake, FaClipboardList,FaCheckCircle,FaFileAlt } from "react-icons/fa";
import imageUrls from '../data/imageUrls';

function SellProducePage() {
  return (
    <div className="sell-produce-page">
      <section className="page-header">
        <h1><MdSell /> Sell My Produce – Uzhavar Bazaar</h1>
        <div className="phase-badge">Service information</div>
      </section>
      
      <div className="coming-soon">
        <div className="coming-soon-image">
          <img src={imageUrls.produce} alt="Farm Fresh Produce" />
        </div>
        <div className="coming-soon-content">
          <h2>Produce Marketing Support</h2>
          <p>We are developing a structured service to help farmers prepare, present, and connect their produce with suitable buyers.</p>
          <div className="features-preview">
            <div className="feature">
              <FaImage className="feature-icon" />
              <p>Upload crop photos</p>
            </div>
            <div className="feature">
              <FaHandshake className="feature-icon" />
              <p>Grading & Buyer Matching</p>
            </div>
            <div className="feature">
              <FaClipboardList className="feature-icon" />
              <p>Market Price Comparison</p>
            </div>
            <div className="feature">
              <FaCheckCircle className="feature-icon" />
              <p>Instant Payment Status</p>
            </div>
            <div className="feature">
              <FaFileAlt className="feature-icon" />
              <p>APEDA / FPC / Invoice help</p>
            </div>
          </div>
          <button className="btn btn-primary">Enquire About Produce Sales</button>
        </div>
      </div>
    </div>
  );
}

export default SellProducePage;