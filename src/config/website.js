// src/config/website.js
export const websiteConfig = {
  company: {
    name: "Nexus Realty",
    fullName: "Nexus Realty Nigeria Limited",
    tagline: "Premier Real Estate Developers & Consultants",
    phone: "+234 806 123 4567",
    whatsapp: "+2348061234567",
    email: "info@nexusrealty.com",
    address: "12A Adeola Odeku Street, Victoria Island, Lagos",
    workingHours: "Mon - Fri: 8:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM"
  },
  
  social: {
    facebook: "https://facebook.com/nexusrealtyng",
    twitter: "https://twitter.com/nexusrealtyng",
    instagram: "https://instagram.com/nexusrealtyng",
    linkedin: "https://linkedin.com/company/nexusrealty",
    youtube: "https://youtube.com/@nexusrealtyng"
  },
  
  services: [
    "Land Acquisition",
    "Residential Properties",
    "Commercial Properties",
    "Estate Development",
    "Property Management",
    "Real Estate Consultation"
  ],
  
  propertyTypes: [
    { value: "land", label: "Land", icon: "🌱" },
    { value: "residential", label: "Residential", icon: "🏠" },
    { value: "commercial", label: "Commercial", icon: "🏢" },
    { value: "estate", label: "Estate Development", icon: "🏘️" },
    { value: "villa", label: "Luxury Villa", icon: "🏡" },
    { value: "duplex", label: "Duplex", icon: "🏘️" }
  ],
  
  cities: [
    "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", 
    "Enugu", "Benin City", "Calabar", "Asaba", "Uyo"
  ],
  
  areas: [
    "Victoria Island", "Lekki", "Ikoyi", "GRA", "Maitama", 
    "Asokoro", "Garki", "Dline", "GRA Phase 1", "Rumuola"
  ],
  
  paymentPlans: [
    "Outright Purchase", "Installment Plan", "Mortgage Option", 
    "Rent-to-Own", "Flexible Payment"
  ],
  
  seo: {
    defaultTitle: "Nexus Realty | Premium Real Estate in Nigeria",
    defaultDescription: "Buy lands, houses, and invest in developing estates across Nigeria. Premier real estate developers and consultants.",
    keywords: "Nigeria real estate, land for sale, houses for sale, estate development, property investment, Lagos real estate, Abuja properties"
  }
};

export default websiteConfig;