// src/components/PropertyCard.jsx
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaTree, FaBuilding } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { websiteConfig } from '../config/website';

const PropertyCard = ({ property }) => {
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
      case 'available': return 'Available';
      case 'sold': return 'Sold';
      case 'reserved': return 'Reserved';
      case 'developing': return 'Under Development';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group">
      <Link to={`/properties/${property.id}`}>
        <div className="relative overflow-hidden h-64">
          <LazyLoadImage
            src={property.images?.[0] || '/placeholder-property.jpg'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            effect="blur"
          />
          
          {/* Property Type Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <span className="mr-2">{getPropertyTypeIcon(property.type)}</span>
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </div>
          
          {/* Status Badge */}
          <div className={`absolute top-4 right-4 ${getStatusColor(property.status)} px-3 py-1 rounded-full text-sm font-bold`}>
            {getStatusText(property.status)}
          </div>
          
          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute bottom-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              🔥 Featured
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
            {property.paymentPlan && (
              <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded">
                {property.paymentPlan}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <FaMapMarkerAlt className="mr-2 text-primary-500" />
            <span>{property.area}, {property.city}</span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
          
          {/* Property Features */}
          <div className="flex flex-wrap gap-4 mb-4">
            {property.type === 'land' ? (
              <>
                {property.size && (
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-2 text-primary-500" />
                    <span className="text-sm">{property.size}</span>
                  </div>
                )}
                {property.plots && (
                  <div className="flex items-center">
                    <FaTree className="mr-2 text-primary-500" />
                    <span className="text-sm">{property.plots} Plots</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {property.bedrooms > 0 && (
                  <div className="flex items-center">
                    <FaBed className="mr-2 text-primary-500" />
                    <span className="text-sm">{property.bedrooms} Bed</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center">
                    <FaBath className="mr-2 text-primary-500" />
                    <span className="text-sm">{property.bathrooms} Bath</span>
                  </div>
                )}
                {property.squareFeet && (
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-2 text-primary-500" />
                    <span className="text-sm">{property.squareFeet} sqft</span>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Estate Development Features */}
          {property.type === 'estate' && property.estateFeatures && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {property.estateFeatures.slice(0, 3).map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
                {property.estateFeatures.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    +{property.estateFeatures.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-primary-700">
                {formatPrice(property.price)}
                {property.type === 'land' && property.pricePerPlot && (
                  <div className="text-sm font-normal text-gray-600">
                    ₦{Number(property.pricePerPlot).toLocaleString()} per plot
                  </div>
                )}
              </div>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;