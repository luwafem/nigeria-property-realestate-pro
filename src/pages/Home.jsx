// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../services/firebase';
import { 
  FaSearch, FaHome, FaShieldAlt, FaHandshake, 
  FaChartLine, FaCity, FaLandmark ,FaBuilding
} from 'react-icons/fa';
import { websiteConfig } from '../config/website';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        // Get featured properties
        const featured = data.filter(prop => prop.featured).slice(0, 6);
        setFeaturedProperties(featured);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = activeTab === 'all' 
    ? featuredProperties 
    : featuredProperties.filter(prop => prop.type === activeTab);

  return (
    <div className="min-h-screen">
      <SEO 
        title={websiteConfig.seo.defaultTitle}
        description={websiteConfig.seo.defaultDescription}
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your <span className="text-accent-400">Perfect Property</span> in Nigeria
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premier real estate developers offering premium lands, houses, and estate developments across Nigeria
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 max-w-4xl mx-auto border border-white/20">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="flex items-center p-4">
                  <FaSearch className="text-white/70 mr-3" />
                  <input
                    type="text"
                    placeholder="Search by location, city, or property type..."
                    className="w-full bg-transparent text-white placeholder-white/70 outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center p-4">
                  <select className="w-full bg-transparent text-white outline-none">
                    <option className="text-gray-800" value="">Property Type</option>
                    {websiteConfig.propertyTypes.map(type => (
                      <option key={type.value} className="text-gray-800" value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-xl transition-colors whitespace-nowrap">
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of lands, houses, and developing estates
          </p>
        </div>

        {/* Property Type Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Properties
          </button>
          {websiteConfig.propertyTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setActiveTab(type.value)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                activeTab === type.value 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏡</div>
            <p className="text-gray-600 text-xl">No properties found in this category</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors"
          >
            View All Properties
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate solutions for investors and homeowners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteConfig.services.map((service, index) => {
              const icons = [FaLandmark, FaHome, FaCity, FaBuilding, FaChartLine, FaHandshake];
              const Icon = icons[index] || FaHome;
              
              return (
                <div key={service} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-6">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service}</h3>
                  <p className="text-gray-600">
                    Professional {service.toLowerCase()} services with expert guidance and support.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Nexus Realty?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-primary-600 text-xl" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Properties</h3>
                  <p className="text-gray-600">
                    Every property undergoes thorough legal verification and due diligence.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FaHandshake className="text-primary-600 text-xl" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Consultation</h3>
                  <p className="text-gray-600">
                    Professional guidance on property investment and development.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FaChartLine className="text-primary-600 text-xl" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Investment Growth</h3>
                  <p className="text-gray-600">
                    Strategic locations with proven track record of appreciation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Invest?</h3>
              <p className="text-lg mb-6">
                Start your property investment journey with our expert team. We guide you through every step.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Premium Locations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Legal Documentation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Flexible Payment Plans</span>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-block mt-8 bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Properties Across Nigeria</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {websiteConfig.cities.slice(0, 10).map(city => (
              <Link
                key={city}
                to={`/properties?city=${city.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl mb-2">📍</div>
                  <h3 className="font-bold text-lg">{city}</h3>
                  <p className="text-white/70 text-sm mt-1">View Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;