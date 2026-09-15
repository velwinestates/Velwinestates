import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const pageMedia = {
  home: {
    slide1: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878959/uzhavar/page-images/Velwin_Logo.jpg',
    slide2: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878960/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_8_19_19_PM.jpg',
    slide3: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878961/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_8_24_16_PM.jpg'
  },
  construction: {
    hero: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878900/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_17_PM.jpg',
    farmhouse: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878904/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_38_PM.jpg',
    pool: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878913/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_39_PM.jpg',
    waterTank: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878916/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_56_PM.jpg',
    fencing: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878918/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_58_PM.jpg',
    polyhouse: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878920/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_59_PM.jpg',
    livestock: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878926/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_00_PM.jpg',
    farmShed: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878929/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_10_PM.jpg',
    irrigation: 'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878931/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_11_PM.jpg'
  },
  services: {}
};

export default function usePageMedia(page) {
  const [media, setMedia] = useState(() => pageMedia[page] || {});

  useEffect(() => {
    let cancelled = false;

    setMedia(pageMedia[page] || {});
    fetch(apiUrl(`/api/site-media/${page}`), { cache: 'no-store' })
      .then(response => response.ok ? response.json() : {})
      .then(overrides => {
        if (!cancelled && overrides && typeof overrides === 'object') {
          setMedia({ ...(pageMedia[page] || {}), ...overrides });
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [page]);

  return media;
}
