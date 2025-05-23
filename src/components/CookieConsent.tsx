import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: true,
    marketing: false,
  });
  
  // Check for existing cookie preference on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    if (savedConsent) {
      setConsentStatus(savedConsent as ConsentStatus);
    }
    
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        console.error('Error parsing saved cookie preferences');
      }
    }
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    if (consentStatus !== 'pending') {
      localStorage.setItem('cookie-consent', consentStatus);
      localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    }
  }, [consentStatus, preferences]);
  
  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    setConsentStatus('accepted');
  };
  
  const handleRejectAll = () => {
    setPreferences({
      necessary: true, // Always needed
      analytics: false,
      marketing: false
    });
    setConsentStatus('rejected');
  };
  
  const handleSavePreferences = () => {
    setConsentStatus(
      preferences.analytics || preferences.marketing ? 'accepted' : 'rejected'
    );
    setShowPreferences(false);
  };
  
  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };
  
  // Don't show anything if the user has already made a choice
  if (consentStatus !== 'pending') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto max-w-7xl px-4 py-4">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:mr-8 mb-4 md:mb-0">
              <h3 className="text-base font-semibold mb-2">This website uses cookies</h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={togglePreferences}
                className="flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Preferences
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRejectAll}
              >
                Reject All
              </Button>
              <Button 
                size="sm"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <button 
              onClick={togglePreferences}
              className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close preferences"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-semibold mb-4">Cookie Preferences</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="necessary"
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="necessary" className="font-medium text-gray-700">Necessary Cookies</label>
                  <p className="text-gray-500">These cookies are required for the website to function and cannot be switched off.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="analytics"
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="analytics" className="font-medium text-gray-700">Analytics Cookies</label>
                  <p className="text-gray-500">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketing" className="font-medium text-gray-700">Marketing Cookies</label>
                  <p className="text-gray-500">These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads.</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent; 