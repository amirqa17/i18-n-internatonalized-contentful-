import { useState, useEffect } from 'react';
import { FaLocationArrow, FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import i18n from '../../app/i18n';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      setSelectedLanguage(browserLanguage);
      localStorage.setItem('selectedLanguage', browserLanguage);
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  // Define your navigation links
  const navLinks = [
    { href: '/', label: 'Home' },

  ];

  // Define your language options
  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Russian' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-8x1 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-24 w-24" src="/assets/3d3.png" alt="Logo" />
            </div>
          </div>

          {/* Responsive menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="block text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div className={`hidden sm:flex space-x-6`}>
            {/* Use the navLinks array to render the navigation links */}
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-md font-medium text-gray-900 hover:text-gray-700">
                {link.label}
              </a>
            ))}
          </div>

          {/* Language and contact button */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language buttons */}
            {languageOptions.map((option) => (
              <button
                key={option.code}
                className={`px-2 py-1 text-sm font-medium rounded-md focus:outline-none ${
                  selectedLanguage === option.code ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => handleLanguageChange(option.code)}
              >
                {option.label}
              </button>
            ))}

            {/* Contact button */}
           
          </div>
        </div>
      </div>

      {/* Responsive menu */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col items-center">
          {/* Use the navLinks array to render the responsive menu links */}
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block text-gray-900 hover:text-gray-700 my-2">
              {link.label}
            </a>
          ))}

          {/* Language switcher for mobile */}
          <div className="mt-4">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                  selectedLanguage === option.code ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => handleLanguageChange(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
