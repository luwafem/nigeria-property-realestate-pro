// src/pages/admin/CMS.jsx - UPDATED FOR REAL ESTATE
import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import SEO from '../../components/SEO';
import ProtectedRoute from '../../components/ProtectedRoute';
import { websiteConfig } from '../../config/website';

const CMS = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'land',
    city: 'Lagos',
    area: '',
    bedrooms: '0',
    bathrooms: '0',
    squareFeet: '',
    size: '', // For land
    plots: '', // For land/estate
    titleStatus: 'C of O', // For land
    yearBuilt: new Date().getFullYear(),
    status: 'available',
    featured: false,
    paymentPlan: 'Outright Purchase',
    paymentTerms: '',
    images: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: [],
    estateFeatures: []
  });
  const [formError, setFormError] = useState('');

  const amenitiesList = [
    '24/7 Security', 'Swimming Pool', 'Gym', 'Children Playground',
    'Parking Space', 'Power Supply', 'Water Supply', 'Internet'
  ];

  const estateFeaturesList = [
    'Gated Community', 'Security House', 'Internal Roads', 'Street Lights',
    'Drainage System', 'Green Areas', 'Shopping Mall', 'School',
    'Hospital', 'Recreation Center', 'Water Treatment Plant'
  ];

  const titleStatusOptions = [
    'C of O', 'Governor\'s Consent', 'Excision', 'Gazette',
    'Global Acquisition', 'Freehold', 'Leasehold'
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const propertiesList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        propertiesList.push({ 
          id: doc.id, 
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date()
        });
      });
      setProperties(propertiesList.sort((a, b) => 
        b.createdAt - a.createdAt
      ));
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert('Error loading properties. Please check Firebase connection.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setFormError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required');
      return false;
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      setFormError('Please enter a valid price');
      return false;
    }
    if (!formData.area.trim()) {
      setFormError('Area/Location is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      // Process images string to array
      const imagesArray = formData.images
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      // Ensure at least one image
      if (imagesArray.length === 0) {
        imagesArray.push('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
      }

      // Calculate price per plot if applicable
      const pricePerPlot = formData.plots && formData.plots > 0 
        ? Math.round(Number(formData.price) / Number(formData.plots))
        : null;

      const propertyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        pricePerPlot: pricePerPlot,
        type: formData.type,
        city: formData.city,
        area: formData.area.trim(),
        location: formData.area.trim(), // For backward compatibility
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        squareFeet: Number(formData.squareFeet) || 0,
        size: formData.size,
        plots: Number(formData.plots) || 0,
        titleStatus: formData.titleStatus,
        yearBuilt: Number(formData.yearBuilt) || new Date().getFullYear(),
        status: formData.status,
        featured: Boolean(formData.featured),
        paymentPlan: formData.paymentPlan,
        paymentTerms: formData.paymentTerms,
        images: imagesArray,
        amenities: Array.isArray(formData.amenities) ? formData.amenities : [],
        estateFeatures: Array.isArray(formData.estateFeatures) ? formData.estateFeatures : [],
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
      };

      console.log('Adding property:', propertyData);
      
      const docRef = await addDoc(collection(db, "properties"), propertyData);
      
      alert(`✅ Property added successfully! ID: ${docRef.id}`);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        type: 'land',
        city: 'Lagos',
        area: '',
        bedrooms: '0',
        bathrooms: '0',
        squareFeet: '',
        size: '',
        plots: '',
        titleStatus: 'C of O',
        yearBuilt: new Date().getFullYear(),
        status: 'available',
        featured: false,
        paymentPlan: 'Outright Purchase',
        paymentTerms: '',
        images: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        amenities: [],
        estateFeatures: []
      });
      
      // Refresh properties list
      await fetchProperties();
      
    } catch (error) {
      console.error("Error adding property:", error);
      setFormError(`Failed to add property: ${error.message}`);
      alert(`Error adding property: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, "properties", id));
      alert('✅ Property deleted successfully!');
      await fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      alert(`Error deleting property: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_auth');
    localStorage.removeItem('cms_user');
    window.location.href = '/admin/login';
  };

  const getPropertyTypeLabel = (type) => {
    const typeObj = websiteConfig.propertyTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <SEO title="Real Estate CMS" />
        
        {/* Admin Header */}
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nexus Realty CMS</h1>
                <p className="text-gray-600">Manage property listings</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, <strong>{localStorage.getItem('cms_user') || 'Admin'}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Property Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Property</h2>
                
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {formError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Prime Land in Lekki Phase 1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the property..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₦) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="e.g., 50000000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type *
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        {websiteConfig.propertyTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      >
                        {websiteConfig.cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area/Location *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        placeholder="e.g., Victoria Island, Lekki Phase 1"
                      />
                    </div>
                  </div>
                  
                  {/* Property Specific Fields */}
                  {formData.type === 'land' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Land Size
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            value={formData.size}
                            onChange={(e) => setFormData({...formData, size: e.target.value})}
                            placeholder="e.g., 500 sqm, 1 acre"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Plots
                          </label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            value={formData.plots}
                            onChange={(e) => setFormData({...formData, plots: e.target.value})}
                            placeholder="e.g., 5"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title Status
                        </label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.titleStatus}
                          onChange={(e) => setFormData({...formData, titleStatus: e.target.value})}
                        >
                          {titleStatusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  
                  {['residential', 'commercial', 'villa', 'duplex'].includes(formData.type) && (
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Square Feet
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.squareFeet}
                          onChange={(e) => setFormData({...formData, squareFeet: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                  
                  {formData.type === 'estate' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Plots/Units
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.plots}
                          onChange={(e) => setFormData({...formData, plots: e.target.value})}
                          placeholder="Total number of plots or units"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estate Features
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {estateFeaturesList.map(feature => (
                            <label key={feature} className="flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                checked={formData.estateFeatures.includes(feature)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      estateFeatures: [...formData.estateFeatures, feature]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      estateFeatures: formData.estateFeatures.filter(f => f !== feature)
                                    });
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Payment Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Plan
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.paymentPlan}
                        onChange={(e) => setFormData({...formData, paymentPlan: e.target.value})}
                      >
                        {websiteConfig.paymentPlans.map(plan => (
                          <option key={plan} value={plan}>{plan}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="reserved">Reserved</option>
                        <option value="developing">Under Development</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Year Built */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built/Development
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                    />
                  </div>
                  
                  {/* Payment Terms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Terms (Optional)
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                      placeholder="e.g., 30% downpayment, balance in 12 months"
                    />
                  </div>
                  
                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URLs (comma separated)
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.images}
                      onChange={(e) => setFormData({...formData, images: e.target.value})}
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {amenitiesList.map(amenity => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={formData.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  amenities: [...formData.amenities, amenity]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  amenities: formData.amenities.filter(a => a !== amenity)
                                });
                              }
                            }}
                          />
                          <span className="ml-2 text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Featured Property */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Featured Property</span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Add Property
                  </button>
                </form>
              </div>
            </div>
            
            {/* Property List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Properties ({properties.length})
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={fetchProperties}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      Refresh
                    </button>
                    <a
                      href="/properties"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Website
                    </a>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {properties.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                            No properties found. Add your first property!
                          </td>
                        </tr>
                      ) : (
                        properties.map((property) => (
                          <tr key={property.id}>
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12">
                                  <img
                                    className="h-12 w-12 rounded-lg object-cover"
                                    src={property.images?.[0] || '/placeholder-property.jpg'}
                                    alt={property.title}
                                    onError={(e) => {
                                      e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                    }}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                    {property.title}
                                  </div>
                                  <div className="text-sm text-gray-500 capitalize">
                                    {getPropertyTypeLabel(property.type)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm text-gray-900">{property.area || property.location}</div>
                              <div className="text-sm text-gray-500">{property.city}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">
                                ₦{property.price?.toLocaleString()}
                              </div>
                              {property.type === 'land' && property.pricePerPlot && (
                                <div className="text-xs text-gray-500">
                                  ₦{property.pricePerPlot?.toLocaleString()}/plot
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                property.status === 'available' 
                                  ? 'bg-green-100 text-green-800' 
                                  : property.status === 'sold'
                                  ? 'bg-red-100 text-red-800'
                                  : property.status === 'reserved'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {property.status}
                              </span>
                              {property.featured && (
                                <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                  Featured
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDelete(property.id)}
                                className="text-red-600 hover:text-red-900 mr-4"
                              >
                                Delete
                              </button>
                              <a
                                href={`/properties/${property.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-900"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CMS;