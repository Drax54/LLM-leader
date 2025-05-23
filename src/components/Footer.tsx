import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                H
              </div>
              <span className="font-medium text-base">Holistic AI Audits</span>
            </div>
            <p className="text-gray-500 text-sm">
              Comprehensive assessment and benchmarking of AI language models for safety and performance.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://holisticai.readthedocs.io/en/latest/" 
                  className="text-gray-500 text-sm hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Holistic AI Library
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.holisticai.com/terms-conditions" 
                  className="text-gray-500 text-sm hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://www.holisticai.com/privacy-policy" 
                  className="text-gray-500 text-sm hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 space-y-4">
          <p className="text-gray-600 text-sm text-center max-w-2xl mx-auto">
            <strong>IMPORTANT:</strong> All safety assessments and jailbreaking test results are copyrighted materials owned by <a href="https://www.holisticai.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Holistic AI</a>. Reproduction, distribution, or use of these data requires explicit attribution and a link to the original source. Unauthorized use is strictly prohibited.
          </p>
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Holistic AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

