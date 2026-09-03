
import 'leaflet/dist/leaflet.css';
import imageUrls from './imageUrls';

const projects = [
  {
    id: 1,
    title: 'Fencing',
    image: imageUrls.fencing,
    imageAlt: 'Completed agricultural field fencing',
    location: 'Erode',
    category: 'fencing',
    description: 'High-quality farm fencing for security and livestock management.'
  },
  {
    id: 2,
    title: 'Mango AMC',
    image: imageUrls.mango,
    imageAlt: 'Mango orchard maintenance work',
    location: 'Salem',
    category: 'maintenance',
    description: 'Annual Maintenance Contract for Mango orchards.'
  },
  {
    id: 3,
    title: 'Water Tank Construction',
    image: imageUrls.waterTank,
    imageAlt: 'Farm water tank construction',
    location: 'Coimbatore',
    category: 'construction',
    description: 'Custom-built water tanks for farm irrigation.'
  },
  {
    id: 4,
    title: 'Drip Irrigation',
    image: imageUrls.irrigation,
    imageAlt: 'Drip irrigation system installed on a farm',
    location: 'Madurai',
    category: 'irrigation',
    description: 'Efficient drip irrigation systems for water conservation.'
  },
  {
    id: 5,
    title: 'Coconut Plantation',
    image: imageUrls.coconut,
    imageAlt: 'New coconut plantation',
    location: 'Tirupur',
    category: 'plantation',
    description: 'Coconut plantation setup and management.'
  },
  {
    id: 6,
    title: 'Farm Shed Construction',
    image: imageUrls.farmShed,
    imageAlt: 'Completed farm shed construction',
    location: 'Pollachi',
    category: 'construction',
    description: 'Durable sheds for farm equipment and storage.'
  },
  {
    id: 7,
    title: 'Farm Workers',
    image: imageUrls.farmWorkers,
    imageAlt: 'Agricultural workers in a field',
    location: 'Tamil Nadu',
    category: 'field-work',
    description: 'Skilled farm workers for all agricultural needs.'
  },
  {
    id: 8,
    title: 'Farmhouse',
    image: imageUrls.farmhouse,
    imageAlt: 'Farmhouse construction project',
    location: 'Tamil Nadu',
    category: 'construction',
    description: 'Farmhouse construction and renovation.'
  },
  {
    id: 9,
    title: 'Swimming Pool',
    image: imageUrls.pool,
    imageAlt: 'Farm property swimming pool',
    location: 'Tamil Nadu',
    category: 'construction',
    description: 'Swimming pool construction for farms and resorts.'
  },
  {
    id: 10,
    title: 'Water Tank',
    image: imageUrls.waterTank,
    imageAlt: 'Agricultural water storage tank',
    location: 'Tamil Nadu',
    category: 'water-management',
    description: 'Water tank installation and maintenance.'
  },
  {
    id: 11,
    title: 'Polyhouse',
    image: imageUrls.polyhouse,
    imageAlt: 'Protected cultivation polyhouse',
    location: 'Tamil Nadu',
    category: 'protected-cultivation',
    description: 'Polyhouse setup for protected cultivation.'
  },
  {
    id: 12,
    title: 'Goat Shed',
    image: imageUrls.livestock,
    imageAlt: 'Livestock shed for goats',
    location: 'Tamil Nadu',
    category: 'livestock',
    description: 'Goat shed construction for livestock.'
  }
];

export default projects;