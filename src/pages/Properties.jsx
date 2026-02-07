// src/pages/Properties.jsx
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../services/firebase';
import { FaFilter, FaSort } from 'react-icons/fa';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    city: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(prop => prop.type === filters.type);
    }

    if (filters.city !== 'all') {
      filtered = filtered.filter(prop => prop.city === filters.city);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(prop => prop.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(prop => prop.price <= parseInt(filters.maxPrice));
    }

    if (filters.bedrooms !== 'all') {
      filtered = filtered.filter(prop => prop.bedrooms >= parseInt(filters.bedrooms));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt?.toDate?.() || 0) - new Date(a.createdAt?.toDate?.() || 0)
        );
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  }, [filters, sortBy, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      city: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'all'
    });
    setSortBy('newest');
  };

  const getUniqueValues = (key) => {
    const values = properties.map(prop => prop[key]).filter(Boolean);
    return [...new Set(values)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Browse Properties"
        description="Browse our extensive collection of properties for rent across Nigeria. Filter by location, type, price, and more."
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Properties</h1>
          <p className="text-gray-600">
            Find your perfect home from our collection of {properties.length} properties
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaFilter className="mr-2" />
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-6">
                {/* Property Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="duplex">Duplex</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Cities</option>
                    {getUniqueValues('city').map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₦)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Any</option>
                    <option value="1">1+ Bedrooms</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            {/* Sort Bar */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-gray-700">
                    Showing <span className="font-bold">{filteredProperties.length}</span> properties
                  </p>
                </div>
                <div className="flex items-center">
                  <FaSort className="mr-2 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* Pagination (if needed) */}
            {filteredProperties.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-l-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 border-t border-b border-gray-300 bg-primary-600 text-white">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-r-lg hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;