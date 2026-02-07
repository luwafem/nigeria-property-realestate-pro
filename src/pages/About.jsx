// src/pages/About.jsx
import SEO from '../components/SEO';
import { FaUsers, FaHome, FaHandshake, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="About Us"
        description="Learn about NaijaRentals - Nigeria's premier property rental platform connecting landlords with tenants across major cities."
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About NaijaRentals</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Nigeria's premier platform connecting landlords with tenants through trust, transparency, and technology.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-6">
              To simplify property rentals in Nigeria by providing a transparent, efficient, and trustworthy platform that connects property owners with potential tenants.
            </p>
            <p className="text-gray-700 mb-6">
              We believe everyone deserves to find a place they can call home, and every property owner deserves a reliable, hassle-free rental experience.
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent-500 to-orange-400 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              To become Nigeria's most trusted and comprehensive property rental platform, transforming how people find and rent properties across Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FaHandshake className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in building relationships based on honesty and clear communication.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. Your satisfaction is our priority.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FaHome className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every property listed undergoes thorough verification to ensure quality standards.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Leadership</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-primary-700 mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900">Chinedu Okoro</h3>
            <p className="text-primary-600 mb-2">CEO & Founder</p>
            <p className="text-gray-600">
              Former real estate developer with 15+ years experience in Nigerian property market.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-orange-400 mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900">Amina Bello</h3>
            <p className="text-primary-600 mb-2">Chief Operations Officer</p>
            <p className="text-gray-600">
              Operations expert specializing in property management and customer experience.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-green-500 to-teal-400 mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900">David Nwankwo</h3>
            <p className="text-primary-600 mb-2">Technology Director</p>
            <p className="text-gray-600">
              Tech innovator with a passion for creating seamless digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-lg">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg">Nigerian Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10000+</div>
              <div className="text-lg">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who have found their perfect home through NaijaRentals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Properties
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;