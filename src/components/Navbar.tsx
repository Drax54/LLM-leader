import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => window.location.href = '/'}
          >
            <img 
              src="/holisticai.png" 
              alt="Holistic AI Logo" 
              className="h-10 max-w-[180px] object-contain" 
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              Models
            </Link>
            <Link to="/recommendations" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              Recommendations
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
                to="/recommendations" 
                className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recommendations
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
