
import 'leaflet/dist/leaflet.css';

const constructionImages = [
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878900/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_17_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878904/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_38_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878913/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_39_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878916/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_56_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878918/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_58_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878920/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_16_59_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878926/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_00_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878929/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_10_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878931/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_11_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878934/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_14_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878936/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_17_29_PM.jpg',
  'https://res.cloudinary.com/ddenqoijd/image/upload/v1788878938/uzhavar/page-images/WhatsApp_Image_2026-09-04_at_7_22_30_PM.jpg'
];

const projects = [
  {
    id: 1,
    title: 'Fencing',
    image: constructionImages[0],
    imageAlt: 'Completed agricultural field fencing',
    location: 'Erode',
    category: 'fencing',
    description: 'High-quality farm fencing for security and livestock management.'
  },
  {
    id: 2,
    title: 'Mango AMC',
    image: constructionImages[1],
    imageAlt: 'Mango orchard maintenance work',
    location: 'Salem',
    category: 'maintenance',
    description: 'Annual Maintenance Contract for Mango orchards.'
  },
  {
    id: 3,
    title: 'Water Tank Construction',
    image: constructionImages[2],
    imageAlt: 'Farm water tank construction',
    location: 'Coimbatore',
    category: 'construction',
    description: 'Custom-built water tanks for farm irrigation.'
  },
  {
    id: 4,
    title: 'Drip Irrigation',
    image: constructionImages[3],
    imageAlt: 'Drip irrigation system installed on a farm',
    location: 'Madurai',
    category: 'irrigation',
    description: 'Efficient drip irrigation systems for water conservation.'
  },
  {
    id: 5,
    title: 'Coconut Plantation',
    image: constructionImages[4],
    imageAlt: 'New coconut plantation',
    location: 'Tirupur',
    category: 'plantation',
    description: 'Coconut plantation setup and management.'
  },
  {
    id: 6,
    title: 'Farm Shed Construction',
    image: constructionImages[5],
    imageAlt: 'Completed farm shed construction',
    location: 'Pollachi',
    category: 'construction',
    description: 'Durable sheds for farm equipment and storage.'
  },
  {
    id: 7,
    title: 'Farm Workers',
    image: constructionImages[6],
    imageAlt: 'Agricultural workers in a field',
    location: 'Tamil Nadu',
    category: 'field-work',
    description: 'Skilled farm workers for all agricultural needs.'
  },
  {
    id: 8,
    title: 'Farmhouse',
    image: constructionImages[7],
    imageAlt: 'Farmhouse construction project',
    location: 'Tamil Nadu',
    category: 'construction',
    description: 'Farmhouse construction and renovation.'
  },
  {
    id: 9,
    title: 'Swimming Pool',
    image: constructionImages[8],
    imageAlt: 'Farm property swimming pool',
    location: 'Tamil Nadu',
    category: 'construction',
    description: 'Swimming pool construction for farms and resorts.'
  },
  {
    id: 10,
    title: 'Water Tank',
    image: constructionImages[9],
    imageAlt: 'Agricultural water storage tank',
    location: 'Tamil Nadu',
    category: 'water-management',
    description: 'Water tank installation and maintenance.'
  },
  {
    id: 11,
    title: 'Polyhouse',
    image: constructionImages[10],
    imageAlt: 'Protected cultivation polyhouse',
    location: 'Tamil Nadu',
    category: 'protected-cultivation',
    description: 'Polyhouse setup for protected cultivation.'
  },
  {
    id: 12,
    title: 'Goat Shed',
    image: constructionImages[11],
    imageAlt: 'Livestock shed for goats',
    location: 'Tamil Nadu',
    category: 'livestock',
    description: 'Goat shed construction for livestock.'
  }
];

export default projects;