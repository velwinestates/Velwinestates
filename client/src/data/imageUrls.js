import agricultureImage from '../assert/agriculture.jpg';
import coconutImage from '../assert/Coconut Plantation.jpg';
import fencingImage from '../assert/fencing.jpg';
import farmWorkersImage from '../assert/farm workers.jpg';
import founderImage from '../assert/founder.jpg';
import farmShedImage from '../assert/Farm Shed Construction.jpg';
import farmFencingImage from '../assert/farm-fencing.jpeg';
import farmhouseImage from '../assert/FArmhouse.jpeg';
import irrigationImage from '../assert/Drip Irrigation.webp';
import mangoImage from '../assert/Mango AMC.jpg';
import goatImage from '../assert/goat.jpg';
import poolImage from '../assert/Swimmingpool.jpeg';
import polyhouseImage from '../assert/polly.jpeg';
import submersiblePumpImage from '../assert/submersible-pump.jpeg';
import farmTankImage from '../assert/tank.jpeg';

const imageUrls = {
  farmWorkers: farmWorkersImage,
  founder: founderImage,
  farmerMobile: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=85',
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
  fencing: fencingImage,
  farmFencing: farmFencingImage,
  mango: mangoImage,
  waterTank: `${process.env.PUBLIC_URL}/page-images/construction/watertank.jpeg`,
  irrigation: irrigationImage,
  coconut: coconutImage,
  farmShed: farmShedImage,
  farmhouse: farmhouseImage,
  pool: poolImage,
  polyhouse: polyhouseImage,
  submersiblePump: submersiblePumpImage,
  farmTank: farmTankImage,
  livestock: goatImage,
  agriculture: agricultureImage,
  fertilizer: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1200&q=85',
  pruning: farmWorkersImage,
  produce: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
  drone: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=85',
  reports: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85'
};

export default imageUrls;
