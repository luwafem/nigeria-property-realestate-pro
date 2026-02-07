// src/pages/PropertyDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import SEO from '../components/SEO';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import { 
  FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, 
  FaPhone, FaWhatsapp, FaTree, FaBuilding, 
  FaShield, FaCar, FaSwimmingPool, FaWifi 
} from 'react-icons/fa';
import { websiteConfig } from '../config/website';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const propertyData = { id: docSnap.id, ...docSnap.data() };
        setProperty(propertyData);
        
        // Increment view count
        await updateDoc(docRef, {
          views: (propertyData.views || 0) + 1
        });
      }
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeIcon = (type) => {
    const typeObj = websiteConfig.propertyTypes.find(t => t.value === type);
    return typeObj ? typeObj.icon : '🏠';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'developing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'available': return 'Available for Purchase';
      case 'sold': return 'Sold Out';
      case 'reserved': return 'Reserved';
      case 'developing': return 'Under Development';
      default: return status;
    }
  };

  const whatsappMessage = `Hello Nexus Realty! I'm interested in the property: ${property?.title} at ${formatPrice(property?.price)}. Can you provide more details about availability and payment plans?`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏚️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <a href="/properties" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg">
            Browse Properties
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={property.title}
        description={property.description}
        image={property.images?.[0]}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <a href="/" className="text-gray-700 hover:text-primary-600">Home</a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
              <a href="/properties" className="text-gray-700 hover:text-primary-600">Properties</a>
            </li>
            <li aria-current="page">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500 line-clamp-1">{property.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Main Image */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={property.images?.[activeImage] || '/placeholder-property.jpg'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 ${getStatusColor(property.status)} px-4 py-2 rounded-full font-bold`}>
                  {getStatusText(property.status)}
                </div>
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-full font-bold">
                    🔥 Featured Property
                  </div>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {property.images && property.images.length > 1 && (
                <div className="p-4 bg-gray-100">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          activeImage === index ? 'border-primary-600' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Property view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{getPropertyTypeIcon(property.type)}</span>
                      <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaMapMarkerAlt className="mr-2 text-primary-500" />
                      <span className="text-lg">{property.area || property.location}, {property.city}</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary-700">
                    {formatPrice(property.price)}
                    {property.type === 'land' && property.pricePerPlot && (
                      <div className="text-lg font-normal text-gray-600">
                        ₦{Number(property.pricePerPlot).toLocaleString()} per plot
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Property Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
                  {property.type === 'land' ? (
                    <>
                      {property.size && (
                        <div className="text-center">
                          <FaTree className="mx-auto text-2xl text-primary-500 mb-2" />
                          <div className="text-sm text-gray-500">Land Size</div>
                          <div className="text-lg font-semibold">{property.size}</div>
                        </div>
                      )}
                      {property.plots && (
                        <div className="text-center">
                          <FaBuilding className="mx-auto text-2xl text-primary-500 mb-2" />
                          <div className="text-sm text-gray-500">Plots</div>
                          <div className="text-lg font-semibold">{property.plots}</div>
                        </div>
                      )}
                      {property.titleStatus && (
                        <div className="text-center">
                          <FaBuilding className="mx-auto text-2xl text-primary-500 mb-2" />
                          <div className="text-sm text-gray-500">Title Status</div>
                          <div className="text-lg font-semibold">{property.titleStatus}</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {property.bedrooms > 0 && (
                        <div className="text-center">
                          <FaBed className="mx-auto text-2xl text-primary-500 mb-2" />
                          <div className="text-sm text-gray-500">Bedrooms</div>
                          <div className="text-lg font-semibold">{property.bedrooms}</div>
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="text-center">
                          <FaBath className="mx-auto text-2xl text-primary-500 mb-2" />
                          <div className="text-sm text-gray-500">Bathrooms</div>
                          <div className="text-lg font-semibold">{property.bathrooms}</div>
                        </div>
                      )}
                      {property.squareFeet && (
                        <div className="text-center">
                          <FaRulerCombined className="mx-auto text-2xl text-primary-500 mb-2" />
                          <div className="text-sm text-gray-500">Square Feet</div>
                          <div className="text-lg font-semibold">{property.squareFeet}</div>
                        </div>
                      )}
                    </>
                  )}
                  {property.yearBuilt && (
                    <div className="text-center">
                      <div className="text-2xl mb-2">📅</div>
                      <div className="text-sm text-gray-500">Year Built</div>
                      <div className="text-lg font-semibold">{property.yearBuilt}</div>
                    </div>
                  )}
                </div>
                
                {/* Payment Plan */}
                {property.paymentPlan && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Plan</h2>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-2xl">💰</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{property.paymentPlan}</h3>
                          <p className="text-gray-600">Flexible payment options available</p>
                        </div>
                      </div>
                      {property.paymentTerms && (
                        <div className="text-gray-700">
                          {property.paymentTerms}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                </div>
                
                {/* Estate Development Features */}
                {property.type === 'estate' && property.estateFeatures && property.estateFeatures.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Estate Features & Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.estateFeatures.map((feature, index) => {
                        const getIcon = (feature) => {
                          if (feature.includes('Pool')) return <FaSwimmingPool className="text-primary-500" />;
                          if (feature.includes('Security')) return <FaBuilding className="text-primary-500" />;
                          if (feature.includes('Park')) return <FaCar className="text-primary-500" />;
                          if (feature.includes('Wi-Fi')) return <FaWifi className="text-primary-500" />;
                          return <span className="text-primary-500">✓</span>;
                        };
                        
                        return (
                          <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                            {getIcon(feature)}
                            <span className="ml-3">{feature}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Share Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Share this Property</h3>
                  <div className="flex space-x-4">
                    <FacebookShareButton url={window.location.href} quote={property.title}>
                      <FacebookIcon size={48} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href} title={property.title}>
                      <TwitterIcon size={48} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href} title={property.title}>
                      <WhatsappIcon size={48} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Interested in this Property?</h3>
              
              <div className="space-y-4">
                <a
                  href={`tel:${websiteConfig.company.phone}`}
                  className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  <FaPhone className="mr-3" />
                  Call Now: {websiteConfig.company.phone}
                </a>
                
                <a
                  href={`https://wa.me/${websiteConfig.company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  <FaWhatsapp className="mr-3 text-xl" />
                  WhatsApp Inquiry
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Property Details</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium capitalize">{property.type}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Property ID:</span>
                    <span className="font-medium text-primary-600">{property.id.substring(0, 8)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Added:</span>
                    <span className="font-medium">
                      {property.createdAt?.toDate?.().toLocaleDateString() || 'Recently'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-medium">{property.views || 0}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Schedule Viewing Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Request More Information</h3>
              <form className="space-y-4" action={`https://formspree.io/f/${process.env.REACT_APP_FORMSPREE_FORM_ID}`} method="POST">
                <input type="hidden" name="property_id" value={property.id} />
                <input type="hidden" name="property_title" value={property.title} />
                
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    name="interest"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">I'm interested in...</option>
                    <option value="site_visit">Site Visit / Viewing</option>
                    <option value="price_negotiation">Price & Payment Plan</option>
                    <option value="documentation">Documentation Process</option>
                    <option value="investment_advice">Investment Advice</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your message or specific questions..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
            
            {/* Similar Properties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Similar Properties</h3>
              <div className="space-y-4">
                {/* This would typically come from API */}
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Similar property" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Lekki Phase 1 Land</h4>
                    <p className="text-sm text-gray-600">500 sqm • ₦25,000,000</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img 
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Similar property" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Maitama Duplex</h4>
                    <p className="text-sm text-gray-600">4 Bed • ₦85,000,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;