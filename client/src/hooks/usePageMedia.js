import { useMemo } from 'react';

const pageMedia = {
  home: {
    slide1: 'WhatsApp Image 2026-09-04 at 7.23.24 PM.jpeg',
    slide2: 'WhatsApp Image 2026-09-04 at 7.23.34 PM.jpeg',
    slide3: 'WhatsApp Image 2026-09-04 at 7.23.39 PM.jpeg',
    slide4: 'WhatsApp Image 2026-09-04 at 8.19.19 PM.jpeg',
    slide5: 'WhatsApp Image 2026-09-04 at 8.24.16 PM.jpeg'
  },
  construction: {
    hero: 'WhatsApp Image 2026-09-04 at 7.16.17 PM.jpeg',
    farmhouse: 'WhatsApp Image 2026-09-04 at 7.16.58 PM.jpeg',
    pool: 'WhatsApp Image 2026-09-04 at 7.17.10 PM.jpeg',
    waterTank: 'watertank.jpeg',
    fencing: 'WhatsApp Image 2026-09-04 at 7.17.14 PM.jpeg',
    polyhouse: 'WhatsApp Image 2026-09-04 at 7.17.29 PM.jpeg',
    livestock: 'WhatsApp Image 2026-09-04 at 7.23.24 PM.jpeg',
    farmShed: 'WhatsApp Image 2026-09-04 at 7.23.27 PM.jpeg',
    irrigation: 'WhatsApp Image 2026-09-04 at 7.23.34 PM.jpeg'
  },
  services: {}
};

export default function usePageMedia(page) {
  return useMemo(() => Object.fromEntries(
    Object.entries(pageMedia[page] || {}).map(([slot, filename]) => [
      slot,
      `${process.env.PUBLIC_URL || ''}/page-images/${page}/${encodeURIComponent(filename)}`
    ])
  ), [page]);
}
