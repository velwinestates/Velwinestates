import React, { useEffect, useState } from "react";
import { API_BASE, apiUrl, imageUrl } from './api';
import imageUrls from './data/imageUrls';
import { FaArrowRight, FaSyncAlt } from 'react-icons/fa';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const loadCompanies = () => {
    setLoading(true);
    setError(null);
    // Add cache-busting parameter to ensure fresh data
    const timestamp = new Date().getTime();
    fetch(apiUrl(`/api/companies?_t=${timestamp}`), {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Accept': 'application/json'
      }
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        const contentType = r.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const missingProductionApi = process.env.NODE_ENV === 'production' && !API_BASE;
          throw new Error(missingProductionApi
            ? 'No backend API URL is configured. If this is a Render Static Site, set REACT_APP_API_URL to your Render Web Service URL in the Static Site environment, then redeploy.'
            : 'The products API returned a webpage instead of JSON. Check that /api/* requests reach the Render Web Service.');
        }
        return r.json();
      })
      .then(data => {
        console.log('Companies loaded:', data);
        // Debug: Log logo URLs and product flags
        data.forEach(company => {
          if (company.logo) {
            console.log(`Company: ${company.name}, Logo path: ${company.logo}, Full URL: ${imageUrl(company.logo)}`);
          }
          if (company.products) {
            company.products.forEach((p, idx) => {
              console.log(`  Product ${idx}: ${p.name}, showOrderButton:`, p.showOrderButton);
            });
          }
        });
        setCompanies(data);
        setLastUpdated(new Date());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading companies:', err);
        setError(err.message);
        setCompanies(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleOrderClick = (product, company) => {
    setSelectedProduct({ ...product, companyName: company.name, companyId: company.id });
    setShowOrderModal(true);
    setOrderSubmitted(false);
  };

  const handleOrderFormChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        companyId: selectedProduct.companyId,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        companyName: selectedProduct.companyName,
        toEmail: 'velwinestates@gmail.com',
        formType: 'Product Order',
        name: orderForm.name,
        phone: orderForm.phone,
        email: orderForm.email,
        message: `Order for ${selectedProduct.name} from ${selectedProduct.companyName}`,
        extra: {
          'Product Name': selectedProduct.name,
          'Company': selectedProduct.companyName,
          'Quantity': orderForm.quantity,
          'Delivery Address': orderForm.address
        }
      };

      const orderResponse = await fetch(apiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!orderResponse.ok) {
        const error = await orderResponse.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to save order');
      }

      const response = await fetch(apiUrl('/api/send-email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Failed to send order notification');
      setOrderSubmitted(true);
      setOrderForm({ name: '', phone: '', email: '', address: '', quantity: 1 });
      setTimeout(() => {
        setShowOrderModal(false);
        setOrderSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please check your connection and try again.');
    }
  };

  const renderCompanyCard = (company, fallbackImg) => {
      const productCount = company.products?.length || 0;

      return (
        <article key={company.id} className="product-brand-card">
          <div className="product-brand-image">
            <img
              src={company.logo ? imageUrl(company.logo) : (productCount && company.products[0].image ? imageUrl(company.products[0].image) : fallbackImg)}
              alt={`${company.name} brand`}
              loading="lazy"
              onError={event => { event.currentTarget.src = fallbackImg; }}
            />
            <span>VELWIN COLLECTION</span>
          </div>
          <div className="product-brand-info">
            <div className="product-brand-meta">
              <span>BRAND CATALOG</span>
              <span>{productCount} {productCount === 1 ? 'product' : 'products'}</span>
            </div>
            <h2>{company.name}</h2>
            <p>{company.description || 'Explore products from this Velwin Estates brand.'}</p>
            <button type="button" className="product-brand-action" onClick={() => setSelectedCompany(company)}>
              Browse products <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        </article>
      );
    };
  const fallbackMasala = imageUrls.produce;
  const fallbackOrganics = imageUrls.coconut;

  const renderCompanyDetail = (company) => {
    const filteredProducts = company.products?.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
      <div className="product-detail-page">
        <div className="product-detail-shell">
          {/* Header */}
          <div className="product-detail-header" style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 16,
            padding: '2em',
            marginBottom: '2em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(10px)'
          }}>
            <button 
              onClick={() => setSelectedCompany(null)}
              style={{ 
                background: 'var(--primary-color)', 
                color: 'white', 
                border: 'none', 
                padding: '0.6em 1.2em', 
                borderRadius: 8, 
                cursor: 'pointer',
                fontSize: '0.9em',
                fontWeight: '600',
                marginBottom: '1.5em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.target.style.background = 'var(--primary-color)';
                e.target.style.transform = 'translateX(-4px)';
              }}
              onMouseOut={e => {
                e.target.style.background = 'var(--primary-color)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Back to Products
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2em', flexWrap: 'wrap' }}>
              <img 
                src={company.logo ? imageUrl(company.logo) : (company.products && company.products.length > 0 && company.products[0].image ? imageUrl(company.products[0].image) : (company.name && company.name.includes('Masala') ? fallbackMasala : fallbackOrganics))} 
                alt={company.name} 
                style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '4px solid var(--primary-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
                }} 
                onError={(e) => {
                  e.target.src = company.name && company.name.includes('Masala') ? fallbackMasala : fallbackOrganics;
                }}
              />
              <div style={{ flex: 1 }}>
                <h1 style={{ 
                  color: "var(--primary-dark)", 
                  margin: 0, 
                  fontWeight: 800, 
                  fontSize: '2.5em',
                  marginBottom: '0.3em'
                }}>{company.name}</h1>
                <p style={{ color: '#666', margin: 0, fontSize: '1.1em', lineHeight: 1.5 }}>
                  {company.description}
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="product-detail-catalog" style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 16,
            padding: '2em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Search and Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2em',
              flexWrap: 'wrap',
              gap: '1em'
            }}>
              <h2 className="product-detail-title" style={{ color: 'var(--primary-dark)', margin: 0, fontSize: '1.8em', fontWeight: 700 }}>
                Products <span style={{ color: '#999', fontSize: '0.8em' }}>({filteredProducts.length})</span>
              </h2>
              
              {company.products && company.products.length > 0 && (
                <div style={{ position: 'relative', minWidth: 250 }}>
                  <input
                    type="text"
                    aria-label="Search products"
                    placeholder="🔍 Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7em 1em',
                      borderRadius: 8,
                      border: '2px solid #e0e0e0',
                      fontSize: '0.95em',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              )}
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="product-detail-grid">
                {filteredProducts.map((product, index) => (
                  <article key={index} className="product-detail-card" style={{
                    background: 'rgba(250,250,250,0.9)', 
                    borderRadius: 12, 
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                  >
                    <div className="product-detail-image" style={{
                      width: '100%', 
                      height: 200, 
                      overflow: 'hidden', 
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {product.image ? (
                        <img 
                          src={imageUrl(product.image)} 
                          alt={product.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); display: flex; align-items: center; justify-content: center; color: #999; font-size: 3em;">📦</div>';
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '3em'
                        }}>
                          📦
                        </div>
                      )}
                    </div>
                    
                    <div className="product-detail-card-info" style={{ padding: '1.2em', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ 
                        color: '#333', 
                        fontSize: '1.1em', 
                        fontWeight: 700, 
                        marginBottom: '0.5em',
                        lineHeight: 1.3
                      }}>{product.name}</h4>
                      
                      {product.description && (
                        <p style={{ 
                          color: '#777', 
                          fontSize: '0.9em', 
                          marginBottom: '1em', 
                          lineHeight: 1.5,
                          flex: 1
                        }}>{product.description}</p>
                      )}
                      
                      { (product.showOrderButton !== false) && (
                      <button
                        onClick={() => handleOrderClick(product, company)}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '0.8em',
                          borderRadius: 8,
                          fontSize: '0.95em',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5em',
                          marginTop: 'auto'
                        }}
                        onMouseEnter={e => {
                          e.target.style.transform = 'scale(1.02)';
                          e.target.style.boxShadow = '0 4px 12px rgba(21,128,61,0.25)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      > 
                        <span>🛒</span> Order Now
                      </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '4em 2em',
                color: '#999'
              }}>
                <div style={{ fontSize: '4em', marginBottom: '0.5em' }}>
                  {searchQuery ? '🔍' : '📦'}
                </div>
                <h3 style={{ color: '#666', fontSize: '1.3em', marginBottom: '0.5em', fontWeight: 600 }}>
                  {searchQuery ? 'No products found' : 'No Products Available'}
                </h3>
                <p style={{ color: '#999', fontSize: '1em' }}>
                  {searchQuery ? 'Try a different search term' : 'This company hasn\'t added any products yet'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      marginTop: '1em',
                      padding: '0.6em 1.5em',
                      background: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '0.9em',
                      fontWeight: '600'
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div translate="" className="our-products-page">
      {selectedCompany ? (
        renderCompanyDetail(selectedCompany)
      ) : (
        <div className="products-catalog-shell">
          <header className="products-hero">
            <div className="products-hero-copy">
              <p className="products-eyebrow"><span /> VELWIN ESTATES / CATALOG</p>
              <h1>Our Products</h1>
              <p className="products-hero-description">Good things for growing, chosen from the brands and makers we trust.</p>
              <div className="products-hero-meta">
                <span>{companies?.length || 0} featured brands</span>
                {lastUpdated && <span>Updated {lastUpdated.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>}
                <button type="button" className="products-refresh-button" onClick={loadCompanies} disabled={loading}>
                  <FaSyncAlt aria-hidden="true" /> {loading ? 'Refreshing' : 'Refresh catalog'}
                </button>
              </div>
            </div>
            <div className="products-hero-image">
              <img src={imageUrls.coconut} alt="A sunlit coconut plantation" />
              <span>Rooted in the region<br />Made for everyday growing</span>
            </div>
          </header>

          <div className="products-section-heading">
            <div>
              <p className="products-eyebrow">EXPLORE THE COLLECTION</p>
              <h2>Shop by brand</h2>
            </div>
            <span>{companies?.length || 0} {companies?.length === 1 ? 'brand' : 'brands'}</span>
          </div>
          
          {error && (
            <div style={{ 
              background: 'rgba(255,255,255,0.95)',
              border: '2px solid #ef5350',
              color: '#c62828', 
              padding: '1.5em', 
              borderRadius: 12, 
              marginBottom: '2em',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(239,83,80,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2em', marginBottom: '0.5em' }}>⚠️</div>
              <strong style={{ fontSize: '1.1em' }}>Connection Error</strong>
              <p style={{ margin: '0.5em 0 0 0' }}>{error}</p>
              <small style={{ opacity: 0.8 }}>Check that the Render frontend is connected to the Web Service serving the product API.</small>
            </div>
          )}
          
          {/* Companies Grid */}
          <div className="product-brand-grid">
            {loading && (!companies || companies.length === 0) ? (
              <p className="products-empty-state">Loading the product catalog…</p>
            ) : companies && companies.length > 0 ? (
              companies.map(company => renderCompanyCard(company, company.name && company.name.includes('Masala') ? fallbackMasala : fallbackOrganics))
            ) : (
              <div className="products-empty-state">
                <h3>{error ? 'Catalog unavailable' : 'No products available yet'}</h3>
                <p>{error ? 'Please try refreshing the catalog shortly.' : 'New products will appear here when they are added.'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <div 
          className="product-order-overlay"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.7)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem'
          }}
          onClick={() => !orderSubmitted && setShowOrderModal(false)}
        >
          <div 
            className="product-order-dialog"
            style={{ 
              maxWidth: 500, 
              width: '100%',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: 16,
              padding: '2rem',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowOrderModal(false)}
              aria-label="Close order form"
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                background: 'transparent',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: '#666',
                padding: 0,
                width: 35,
                height: 35,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            {orderSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Order Submitted!</h3>
                <p style={{ color: '#666' }}>We'll contact you shortly to confirm your order.</p>
              </div>
            ) : (
              <>
                <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', paddingRight: '2rem' }}>
                  Order: {selectedProduct.name}
                </h2>
                
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '1rem', 
                  borderRadius: 8, 
                  marginBottom: '1.5rem' 
                }}>
                  <p style={{ margin: '0.5rem 0', color: '#333' }}>
                    <strong>Company:</strong> {selectedProduct.companyName}
                  </p>
                </div>

                <form onSubmit={handleOrderSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={orderForm.name}
                      onChange={handleOrderFormChange}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '0.7rem', 
                        borderRadius: 8, 
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleOrderFormChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      style={{ 
                        width: '100%', 
                        padding: '0.7rem', 
                        borderRadius: 8, 
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleOrderFormChange}
                      style={{ 
                        width: '100%', 
                        padding: '0.7rem', 
                        borderRadius: 8, 
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={orderForm.quantity}
                      onChange={handleOrderFormChange}
                      required
                      min="1"
                      style={{ 
                        width: '100%', 
                        padding: '0.7rem', 
                        borderRadius: 8, 
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={orderForm.address}
                      onChange={handleOrderFormChange}
                      required
                      rows="3"
                      style={{ 
                        width: '100%', 
                        padding: '0.7rem', 
                        borderRadius: 8, 
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: 8,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={e => e.target.style.background = 'var(--primary-dark)'}
                    onMouseLeave={e => e.target.style.background = 'var(--primary-color)'}
                  >
                    Place Order
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
