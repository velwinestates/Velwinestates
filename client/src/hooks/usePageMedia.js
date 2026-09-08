import { useMemo } from 'react';

const pageSlots = {
  home: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7', 'slide8', 'slide9'],
  construction: ['hero', 'farmhouse', 'pool', 'waterTank', 'fencing', 'polyhouse', 'livestock', 'farmShed', 'irrigation'],
  services: ['farmWorkers', 'drone', 'fertilizer', 'irrigation', 'waterTank']
};

export default function usePageMedia(page) {
  return useMemo(() => Object.fromEntries(
    (pageSlots[page] || []).map(slot => [
      slot,
      `${process.env.PUBLIC_URL || ''}/page-images/${page}/${slot}.jpg`
    ])
  ), [page]);
}
