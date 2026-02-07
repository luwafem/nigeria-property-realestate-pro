// src/components/Header.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { websiteConfig } from '../config/website';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <a href={`tel:${websiteConfig.company.phone}`} className="flex items-center hover:text-accent-300">
                <FaPhone className="mr-2" />
                {websiteConfig.company.phone}
              </a>
              <a href={`mailto:${websiteConfig.company.email}`} className="flex items-center hover:text-accent-300">
                <FaWhatsapp className="mr-2" />
                WhatsApp: {websiteConfig.company.whatsapp}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`https://wa.me/${websiteConfig.company.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg flex items-center"
              >
                <FaWhatsapp className="mr-2" />
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NR</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NaijaRentals</h1>
              <p className="text-sm text-gray-600">Premium Property Rentals</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/properties"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Properties
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-2 font-medium ${
                    isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/properties"
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;