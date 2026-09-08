
import 'leaflet/dist/leaflet.css';

const constructionImage = (filename) => `${process.env.PUBLIC_URL || ''}/page-images/construction/${encodeURIComponent(filename)}`;

const constructionImages = [
  'WhatsApp Image 2026-09-04 at 7.16.17 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.16.58 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.17.10 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.17.14 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.17.29 PM.jpeg',
  'watertank.jpeg',
  'WhatsApp Image 2026-09-04 at 7.23.24 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.23.27 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.23.34 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.23.36 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.23.42 PM.jpeg',
  'WhatsApp Image 2026-09-04 at 7.23.43 PM.jpeg'
];

const projects = [
  {
    id: 1,
    title: 'Fencing',
    image: constructionImage(constructionImages[0]),
    imageAlt: 'Completed agricultural field fencing',
    location: 'Erode',
    category: 'fencing',
    description: 'High-quality farm fencing for security and livestock management.'
  },
  {
    id: 2,
    title: 'Mango AMC',
    image: constructionImage(constructionImages[1]),
    imageAlt: 'Mango orchard maintenance work',
    location: 'Salem',
    category: 'maintenance',
    description: 'Annual Maintenance Contract for Mango orchards.'
  },
  {
    id: 3,
    title: 'Water Tank Construction',
    image: constructionImage(constructionImages[2]),
    imageAlt: 'Farm water tank construction',
    location: 'Coimbatore',
    category: 'construction',
    description: 'Custom-built water tanks for farm irrigation.'
  },
  {
    id: 4,
    title: 'Drip Irrigation',
    image: constructionImage(constructionImages[3]),
    imageAlt: 'Drip irrigation system installed on a farm',
    location: 'Madurai',
    category: 'irrigation',
    description: 'Efficient drip irrigation systems for water conservation.'
  },
  {
    id: 5,
    title: 'Coconut Plantation',
    image: constructionImage(constructionImages[4]),
    imageAlt: 'New coconut plantation',
    location: 'Tirupur',
    category: 'plantation',
    description: 'Coconut plantation setup and management.'
  },
  {
    id: 6,
    title: 'Farm Shed Construction',
    image: constructionImage(constructionImages[5]),
    imageAlt: 'Completed farm shed construction',
    location: 'Pollachi',
    category: 'construction',
    description: 'Durable sheds for farm equipment and storage.'
  },
  {
    id: 7,
    title: 'Farm Workers',
    image: constructionImage(constructionImages[6]),
    imageAlt: 'Agricultural workers in a field',
    location: 'Tamil Nadu',
    category: 'field-work',
    description: 'Skilled farm workers for all agricultural needs.'
  },
  {
    id: 8,
    title: 'Farmhouse',
    image: constructionImage(constructionImages[7]),
    imageAlt: 'Farmhouse construction project',
    location: 'Tamil Nadu',
    category: 'construction',
    description: 'Farmhouse construction and renovation.'
  },
  {
    id: 9,
    title: 'Swimming Pool',
    image: constructionImage(constructionImages[8]),
    imageAlt: 'Farm property swimming pool',
    location: 'Tamil Nadu',
    category: 'construction',
    description: 'Swimming pool construction for farms and resorts.'
  },
  {
    id: 10,
    title: 'Water Tank',
    image: constructionImage(constructionImages[9]),
    imageAlt: 'Agricultural water storage tank',
    location: 'Tamil Nadu',
    category: 'water-management',
    description: 'Water tank installation and maintenance.'
  },
  {
    id: 11,
    title: 'Polyhouse',
    image: constructionImage(constructionImages[10]),
    imageAlt: 'Protected cultivation polyhouse',
    location: 'Tamil Nadu',
    category: 'protected-cultivation',
    description: 'Polyhouse setup for protected cultivation.'
  },
  {
    id: 12,
    title: 'Goat Shed',
    image: constructionImage(constructionImages[11]),
    imageAlt: 'Livestock shed for goats',
    location: 'Tamil Nadu',
    category: 'livestock',
    description: 'Goat shed construction for livestock.'
  }
];

export default projects;