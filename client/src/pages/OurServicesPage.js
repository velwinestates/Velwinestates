import React from 'react';
import imageUrls from '../data/imageUrls';
import usePageMedia from '../hooks/usePageMedia';

export default function OurServicesPage() {
  const media = usePageMedia('services');
  const image = (slot, fallback) => media[slot] || fallback;

  const services = [
    {
      title: 'Aadhivelan Drone Services',
      description: 'Advanced aerial solutions for modern farming',
      images: [
        {
          src: image('droneSpraying', 'https://images.unsplash.com/photo-1713952160156-bb59cac789a9?auto=format&fit=crop&w=1200&q=85'),
          alt: 'Agricultural drone spraying crops in rows'
        }
      ],
      features: ['Crop monitoring', 'Precision spraying', 'Land surveying', 'Thermal imaging','Manufacturing Drones']
    },
    {
      title: 'Motors & Pumps',
      description: 'We manufacture all types of motors and pumps, from basic models to high-pressure units, including open-well and submersible pumps.',
      images: [{
        src: image('motorPump', 'https://images.pexels.com/photos/28240873/pexels-photo-28240873.jpeg?auto=compress&cs=tinysrgb&w=1200'),
        alt: 'Irrigation water pump operating in a farm field'
      }],
      features: ['Basic to high-pressure pump models', 'Open-well and submersible systems', 'Motor sizing for flow and pressure needs', 'Manufacturing, supply, and installation', 'Maintenance, repair, and AMC support']
    },
    {
      title: 'Drip Irrigation',
      description: 'Plan and install drip systems to deliver water directly to crop root zones.',
      images: [{ src: image('irrigation', imageUrls.irrigation), alt: 'Drip irrigation lines delivering water across crop rows' }],
      features: ['Crop-specific system layout', 'Drip lines and filter installation', 'Water flow checks', 'System maintenance support']
    },
    {
      title: 'Water Tank Construction',
      description: 'Build farm water storage planned around your site and irrigation requirements.',
      images: [{ src: image('farmTank', imageUrls.farmTank), alt: 'Completed farm water-storage tank among coconut palms' }],
      features: ['Site and capacity planning', 'Farm water-storage construction', 'Inlet and outlet planning', 'Irrigation supply integration']
    },
    {
      title: 'Farm Fencing',
      description: 'Define and secure farm boundaries with fencing selected for your site.',
      images: [{ src: image('fencing', imageUrls.farmFencing), alt: 'Installed chain-link boundary fence beside a farm field' }],
      features: ['Boundary layout planning', 'Fencing material selection', 'Post and mesh installation', 'Gate and access planning']
    },
    {
      title: 'Land Preparation',
      description: 'Prepare farm land for planting with field clearing, soil work, and layout planning.',
      images: [{ src: image('landPreparation', 'https://images.unsplash.com/photo-1783515594515-0691dbdd629b?auto=format&fit=crop&w=1200&q=85'), alt: 'Tractor plowing and preparing farm soil' }],
      features: ['Field clearing and preparation', 'Soil cultivation', 'Field and row layout', 'Planting-area preparation']
    },
    {
      title: 'Planting Services',
      description: 'Planting support for all types of farm plants, planned for your land and crop goals.',
      images: [{ src: image('planting', imageUrls.coconut), alt: 'Young coconut palms established in a farm plantation' }],
      features: ['Fruit, timber, coconut, and crop plants', 'Site-specific spacing and layout', 'Planting team coordination', 'Initial establishment guidance']
    },
    {
      title: 'Farm Management',
      description: 'Complete farm management and AMC services',
      images: [{ src: image('agriculture', imageUrls.agriculture), alt: 'Cultivated crop rows across a managed farm' }],
      features: ['Regular maintenance', 'Soil testing', 'Crop planning', 'Expert consultation']
    },
    {
      title: 'Construction of Sheds',
      description: 'Durable farm sheds planned around your equipment, harvest, or livestock needs.',
      images: [{ src: image('farmShed', '/assert/commercial-goat-farm-shed.jpeg'), alt: 'Commercial goat farm shed with raised livestock housing' }],
      features: ['Equipment and harvest storage', 'Livestock shelters', 'Site-specific layout planning', 'Construction and finishing']
    },
    {
      title: 'Equipment & Tools',
      description: 'Modern farming equipment and machinery',
      images: [{ src: image('construction', imageUrls.construction), alt: 'Construction equipment used for farm project work' }],
      features: ['Equipment rental', 'Installation support', 'Maintenance services', 'Training programs']
    },
    {
      title: 'Consultation',
      description: 'Expert agricultural guidance and support',
      images: [{ src: image('farmWorkers', imageUrls.farmWorkers), alt: 'Farm team reviewing crop information together in the field' }],
      features: ['Crop selection', 'Pest management', 'Yield optimization', 'Market insights']
    }
  ];

  return (
    <div className="our-services-page" style={{ 
      minHeight: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Content Wrapper */}
      <div style={{ 
        position: 'relative',
        zIndex: 1,
        padding: '2rem 1rem'
      }}>
      {/* Header Section */}
      <div className="our-services-title-band" style={{ 
        maxWidth: 1200, 
        margin: '0 auto 3rem', 
        textAlign: 'center',
        padding: '2rem'
      }}>
          <h1 style={{ 
            color: 'var(--primary-color)', 
          fontSize: '3rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          Our Services
        </h1>
        <p style={{ 
          color: '#555', 
          fontSize: '1.2rem', 
          maxWidth: 700, 
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Practical agricultural services, field execution, and documented farm support.
        </p>
      </div>

      {/* Services Grid */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto 4rem',
        padding: '0 1rem'
      }}>
        <h2 style={{ 
          color: 'var(--primary-color)', 
          fontWeight: 700, 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          What We Offer
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="services-offer-card"
              style={{ 
                background: 'rgba(255, 255, 255, 0.75)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: 16, 
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,78,59,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
            >
              <div className={`services-offer-image ${service.images.length > 1 ? 'is-pair' : ''}`}>
                {service.images.map(serviceImage => (
                  <img key={serviceImage.src} src={serviceImage.src} alt={serviceImage.alt} loading="lazy" referrerPolicy="no-referrer" />
                ))}
              </div>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {service.title}
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: 1.6 }}>
                {service.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={{ 
                    color: '#444', 
                    padding: '0.5rem 0',
                    borderBottom: idx < service.features.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


      {/* Call to Action */}
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto',
        padding: '3rem 2rem',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: 16,
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1rem' }}>
          Ready to Transform Your Farm?
        </h2>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Contact us today to learn more about our services and how we can help optimize your farming operations.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.location.href = '/book-team'}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: 8,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.background = 'var(--primary-dark)'}
            onMouseLeave={e => e.target.style.background = 'var(--primary-color)'}
          >
            Book Our Team
          </button>
          <button
            onClick={() => window.location.href = '/request-quote'}
            style={{
              background: 'transparent',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              padding: '1rem 2rem',
              borderRadius: 8,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--primary-color)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--primary-color)';
            }}
          >
            Request Quote
          </button>
        </div>
      </div>
      </div> {/* End Content Wrapper */}
    </div>
  );
}
