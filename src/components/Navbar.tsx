import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <svg width="45" height="45" viewBox="0 0 45 45" className="text-blue-600">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <g transform="translate(2, 2)">
                <path fill="url(#logo-gradient)" d="M18,0 L32,8 L32,24 L18,32 L4,24 L4,8 L18,0 Z M18,4 L28,10 L28,22 L18,28 L8,22 L8,10 L18,4 Z" />
                <path fill="#6366f1" opacity="0.7" d="M18,4 L28,10 L28,22 L18,28 L8,22 L8,10 L18,4 Z M18,8 L24,12 L24,20 L18,24 L12,20 L12,12 L18,8 Z" />
                <path fill="#818cf8" opacity="0.5" d="M18,8 L24,12 L24,20 L18,24 L12,20 L12,12 L18,8 Z M18,12 L20,13 L20,19 L18,20 L16,19 L16,13 L18,12 Z" />
              </g>
            </svg>
            <span className="font-bold text-xl text-gray-800">Holistic AI Audits</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              Models
            </Link>
            <Link to="/red-teaming" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              Red Teaming
            </Link>
            <Link 
              to="/test-your-llm" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded transition-colors shadow-sm flex items-center"
            >
              <span>Test Your LLM</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-down">
            <div className="flex flex-col space-y-4 mt-2 border-t border-gray-200 pt-4">
              <Link 
                to="/" 
                className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Models
              </Link>
              <Link 
                to="/red-teaming" 
                className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Red Teaming
              </Link>
              <Link 
                to="/test-your-llm" 
                className="text-white text-base font-medium bg-indigo-600 hover:bg-indigo-700 transition-all px-4 py-2 rounded inline-block w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Test Your LLM
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
