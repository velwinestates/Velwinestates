
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
  },
  {
    id: 13,
    title: 'Farm Land Preparation',
    image: constructionImages[0],
    imageAlt: 'Prepared agricultural land ready for cultivation',
    location: 'Namakkal',
    category: 'land-preparation',
    description: 'Complete field preparation, leveling, and soil-ready groundwork for productive cultivation.'
  },
  {
    id: 14,
    title: 'Orchard Management',
    image: constructionImages[1],
    imageAlt: 'Healthy mango orchard under professional care',
    location: 'Krishnagiri',
    category: 'maintenance',
    description: 'Ongoing orchard maintenance with crop care, pruning, and seasonal farm support.'
  },
  {
    id: 15,
    title: 'Farm Irrigation Upgrade',
    image: constructionImages[3],
    imageAlt: 'Modern drip irrigation system across a farm',
    location: 'Dharmapuri',
    category: 'irrigation',
    description: 'Water-efficient irrigation planning and installation to improve crop health and reduce wastage.'
  },
  {
    id: 16,
    title: 'Solar-Powered Water System',
    image: constructionImages[2],
    imageAlt: 'Water storage system connected to a farm irrigation setup',
    location: 'Thanjavur',
    category: 'water-management',
    description: 'Reliable water access with durable storage infrastructure designed for long-term farm use.'
  },
  {
    id: 17,
    title: 'Protected Cultivation',
    image: constructionImages[10],
    imageAlt: 'Protected polyhouse cultivation',
    location: 'Coimbatore',
    category: 'protected-cultivation',
    description: 'Polyhouse installation that supports controlled growing conditions and better crop protection.'
  },
  {
    id: 18,
    title: 'Livestock Housing',
    image: constructionImages[11],
    imageAlt: 'Well-constructed livestock shelter',
    location: 'Erode',
    category: 'livestock',
    description: 'Safe and durable livestock housing designed for animal comfort and day-to-day farm operations.'
  },
  {
    id: 19,
    title: 'Equipment Storage Shed',
    image: constructionImages[5],
    imageAlt: 'Durable farm equipment storage shed',
    location: 'Perambalur',
    category: 'construction',
    description: 'Purpose-built storage sheds for tools, machinery, and harvested produce.'
  },
  {
    id: 20,
    title: 'Farm Boundary Protection',
    image: constructionImages[0],
    imageAlt: 'Completed field boundary fencing',
    location: 'Sivagangai',
    category: 'fencing',
    description: 'Strong, practical fencing solutions for safety, livestock control, and field protection.'
  },
  {
    id: 21,
    title: 'Coconut Orchard Development',
    image: constructionImages[4],
    imageAlt: 'Developed coconut plantation',
    location: 'Tirunelveli',
    category: 'plantation',
    description: 'Plantation planning and support for healthy, productive coconut orchards.'
  },
  {
    id: 22,
    title: 'Farm Visit and Planning',
    image: constructionImages[6],
    imageAlt: 'Farm team conducting a site inspection',
    location: 'Madurai',
    category: 'planning',
    description: 'Hands-on farm visits with practical recommendations and a clear development plan.'
  },
  {
    id: 23,
    title: 'Farm Infrastructure Renewal',
    image: constructionImages[7],
    imageAlt: 'Renovated farmhouse and farm infrastructure',
    location: 'Salem',
    category: 'construction',
    description: 'Infrastructure improvements that bring comfort, utility, and long-term value to farm properties.'
  }
];

export default projects;