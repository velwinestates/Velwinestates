import { useState } from 'react';
import imageUrls from '../data/imageUrls';
import usePageMedia from '../hooks/usePageMedia';

function ConstructionPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const media = usePageMedia('construction');
  const image = (slot, fallback) => media[slot] || fallback;
  const images = [
    { id: 1, src: image('hero', imageUrls.construction), title: 'Construction Project 1' },
    { id: 2, src: image('farmhouse', imageUrls.farmhouse), title: 'Construction Project 2' },
    { id: 3, src: image('pool', imageUrls.pool), title: 'Construction Project 3' },
    { id: 4, src: image('waterTank', imageUrls.waterTank), title: 'Construction Project 4' },
    { id: 5, src: image('fencing', imageUrls.fencing), title: 'Construction Project 5' },
    { id: 6, src: image('polyhouse', imageUrls.polyhouse), title: 'Construction Project 6' },
    { id: 7, src: image('livestock', imageUrls.livestock), title: 'Construction Project 7' },
    { id: 8, src: image('farmShed', imageUrls.farmShed), title: 'Construction Project 8' },
    { id: 9, src: image('irrigation', imageUrls.irrigation), title: 'Construction Project 9' }
  ];

  return (
    <div className="construction-page" style={{ padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {images.map(constructionImage => (
          <button
            type="button"
            key={constructionImage.id}
            onClick={() => setSelectedImage(constructionImage)}
            style={{ padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}
          >
            <img
              src={constructionImage.src}
              alt=""
              style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 8 }}
            />
          </button>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2em',
            cursor: 'pointer'
          }}
        >
          <div style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#333',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '1.5em',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              ×
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConstructionPage;