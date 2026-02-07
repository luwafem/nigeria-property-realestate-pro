// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { websiteConfig } from '../config/website';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NR</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">NaijaRentals</h2>
                <p className="text-gray-400">Premium Property Rentals</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Nigeria's premier platform connecting landlords with tenants through trust, transparency, and technology.
            </p>
            <div className="flex space-x-4">
              <a
                href={websiteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href={websiteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href={websiteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href={websiteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${websiteConfig.company.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-xl font-bold mb-6">Popular Cities</h3>
            <ul className="space-y-3">
              {websiteConfig.cities.map(city => (
                <li key={city}>
                  <a
                    href={`/properties?city=${city.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Properties in {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-primary-400" />
                <div>
                  <p className="font-medium">{websiteConfig.company.phone}</p>
                  <p className="text-gray-400 text-sm">Mon-Fri, 8am-6pm</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-primary-400" />
                <div>
                  <p className="font-medium">{websiteConfig.company.email}</p>
                  <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary-400" />
                <div>
                  <p className="font-medium">{websiteConfig.company.address}</p>
                  <p className="text-gray-400 text-sm">Visit our office</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get the latest property listings, market insights, and exclusive offers delivered to your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-primary-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {currentYear} {websiteConfig.company.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                FAQ
              </Link>
              <a
                href="/admin/login"
                className="text-gray-400 hover:text-white text-sm"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;