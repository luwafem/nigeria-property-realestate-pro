// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "NaijaRentals - Premium Nigerian Property Rentals",
  description = "Find your dream home in Nigeria. Browse thousands of properties for rent across Lagos, Abuja, Port Harcourt and more.",
  keywords = "Nigeria properties, house rent, apartment rent, Lagos properties, Abuja real estate",
  image = "/og-image.jpg",
  url = window.location.href,
  type = "website"
}) => {
  const siteName = "NaijaRentals";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;