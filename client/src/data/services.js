
import 'leaflet/dist/leaflet.css';
import {FaCalendarAlt,FaShoppingCart } from 'react-icons/fa';
import { MdOutlineConstruction,  MdSell, MdLandscape } from 'react-icons/md';
import { GiWoodenFence } from 'react-icons/gi';

const services = [
  {
    title: "AMC (Annual Maintenance Contract)",
    path: '/manage-farm',
    icon: <FaCalendarAlt className="service-icon" />,
    description: "Scheduled maintenance for your farm with calendar-based tracking"
  },
  {
    title: "New Projects",
    path: '/our-services',
    icon: <MdOutlineConstruction className="service-icon" />,
    description: "Fencing, drip irrigation, planting and more"
  },
  {
    title: "Construction",
    path: '/construction',
    icon: <GiWoodenFence className="service-icon" />,
    description: "Tanks, pools, sheds and other farm structures"
  },
  {
    title: "Inputs Supply",
    path: '/buy-inputs',
    icon: <FaShoppingCart className="service-icon" />,
    description: "Tools, fertilizers, motors and other farm inputs"
  },
  {
    title: "Land Buy/Sell",
    path: '/land',
    icon: <MdLandscape className="service-icon" />,
    description: "Verified listings with soil/water data"
  },
  {
    title: "Crop Sales",
    path: '/sell-produce',
    icon: <MdSell className="service-icon" />,
    description: "Buyer connect and market price comparison"
  }
];

export default services;