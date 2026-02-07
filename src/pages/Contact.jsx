// src/pages/Contact.jsx
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import SEO from '../components/SEO';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_FORM_ID || "your_form_id");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <SEO title="Contact Us" />
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-green-500 text-6xl mb-6">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for contacting NaijaRentals. Our team will get back to you within 24 hours.
            </p>
            <a
              href="/"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Contact Us"
        description="Get in touch with NaijaRentals. Our team is here to help you find your perfect home in Nigeria."
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-3xl">
            Have questions about our properties or need assistance? Our team is here to help you find your perfect home.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+234 801 234 5678</p>
                    <p className="text-gray-600">+234 802 345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@naijarentals.com</p>
                    <p className="text-gray-600">support@naijarentals.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Office Address</h3>
                    <p className="text-gray-600">
                      123 Victoria Island,<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaClock className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8am - 6pm</p>
                    <p className="text-gray-600">Saturday: 9am - 4pm</p>
                    <p className="text-gray-600">Sunday: 10am - 2pm</p>
                  </div>
                </div>
                
                {/* WhatsApp Button */}
                <div className="pt-6 border-t border-gray-200">
                  <a
                    href="https://wa.me/2348012345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    <FaWhatsapp className="mr-3 text-xl" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="property_inquiry">Property Inquiry</option>
                      <option value="booking_assistance">Booking Assistance</option>
                      <option value="property_listing">Property Listing</option>
                      <option value="general_question">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                    Subscribe to our newsletter for property updates and offers
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-900 mb-2">How do I schedule a property viewing?</h3>
                  <p className="text-gray-600">
                    You can schedule a viewing by contacting us through the form above, calling our office, or using the WhatsApp button. We'll coordinate with the property owner to arrange a convenient time.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-900 mb-2">What documents do I need to rent a property?</h3>
                  <p className="text-gray-600">
                    Typically, you'll need a valid ID (International Passport, Driver's License, or National ID), proof of income, and references from previous landlords. Specific requirements may vary by property.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-900 mb-2">How long does it take to process a rental application?</h3>
                  <p className="text-gray-600">
                    Most applications are processed within 3-5 business days, provided all required documents are submitted. We'll keep you updated throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;