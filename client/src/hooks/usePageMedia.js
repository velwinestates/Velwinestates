import { useMemo } from 'react';

const pageMedia = {
  home: {
    slide1: 'Velwin Logo.jpeg',
    slide2: 'WhatsApp Image 2026-09-04 at 8.19.19 PM.jpeg',
    slide3: 'WhatsApp Image 2026-09-04 at 8.24.16 PM.jpeg'
  },
  construction: {
    hero: 'WhatsApp Image 2026-09-04 at 7.16.17 PM.jpeg',
    farmhouse: 'WhatsApp Image 2026-09-04 at 7.16.38 PM.jpeg',
    pool: 'WhatsApp Image 2026-09-04 at 7.16.39 PM.jpeg',
    waterTank: 'WhatsApp Image 2026-09-04 at 7.16.56 PM.jpeg',
    fencing: 'WhatsApp Image 2026-09-04 at 7.16.58 PM.jpeg',
    polyhouse: 'WhatsApp Image 2026-09-04 at 7.16.59 PM.jpeg',
    livestock: 'WhatsApp Image 2026-09-04 at 7.17.00 PM.jpeg',
    farmShed: 'WhatsApp Image 2026-09-04 at 7.17.10 PM.jpeg',
    irrigation: 'WhatsApp Image 2026-09-04 at 7.17.11 PM.jpeg'
  },
  services: {}
};

export default function usePageMedia(page) {
  return useMemo(() => Object.fromEntries(
    Object.entries(pageMedia[page] || {}).map(([slot, filename]) => [
      slot,
      `${process.env.PUBLIC_URL || ''}/assert/${encodeURIComponent(filename)}`
    ])
  ), [page]);
}
