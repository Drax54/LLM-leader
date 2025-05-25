import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import modelData from '@/data/models.json';
import { ArrowRight, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

interface ModelData {
  id: string;
  name: string;
  developer: string;
  developerLogo: string;
  safetyRank: number | null;
  safeResponses: number | null;
  unsafeResponses: number | null;
  jailbreakingResistance: number | null;
}

const RedTeaming = () => {
  const [filteredModels, setFilteredModels] = useState<ModelData[]>([]);

  useEffect(() => {
    // Filter models that have safety metrics
    const modelsWithSafetyData = modelData.filter(
      (model) => model.safeResponses !== null || model.unsafeResponses !== null || model.jailbreakingResistance !== null
    );
    
    // Sort models by safety rank (if available)
    const sortedModels = modelsWithSafetyData.sort((a, b) => {
      if (a.safetyRank === null && b.safetyRank === null) return 0;
      if (a.safetyRank === null) return 1;
      if (b.safetyRank === null) return -1;
      return a.safetyRank - b.safetyRank;
    });
    
    setFilteredModels(sortedModels);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO 
        title="Red Teaming Results - AI Model Safety Analysis"
        description="Comprehensive analysis of AI language models' safety features, resistance to jailbreaking attempts, and response quality to adversarial prompts."
        schemaType="WebPage"
        path="/red-teaming"
      />
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-6 pt-24 pb-16">
        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 tracking-tight">Red Teaming Results</h1>
          <p className="text-gray-600 mb-8">Comprehensive analysis of AI models' responses to adversarial prompts, measuring safety guardrails and defense mechanisms.</p>
        </div>

        {/* About Red Teaming Section */}
        <div className="bg-white rounded-lg p-6 mb-10 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">About Red Teaming</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Red teaming is a systematic process of testing AI models with adversarial prompts designed to bypass safety guardrails. Our evaluation uses three key metrics:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-green-600 w-5 h-5" />
                <h3 className="font-medium text-gray-800">Safe Responses</h3>
              </div>
              <p className="text-sm text-gray-600">Percentage of responses that are safe and appropriate, avoiding harmful content.</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-5 border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="text-red-600 w-5 h-5" />
                <h3 className="font-medium text-gray-800">Unsafe Responses</h3>
              </div>
              <p className="text-sm text-gray-600">Percentage of responses containing harmful, unethical, or inappropriate content.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <ShieldX className="text-blue-600 w-5 h-5" />
                <h3 className="font-medium text-gray-800">Jailbreaking Resistance</h3>
              </div>
              <p className="text-sm text-gray-600">Model's ability to resist attempts to bypass safety mechanisms and guardrails.</p>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <SafetyCard key={model.id} model={model} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const SafetyCard = ({ model }: { model: ModelData }) => {
  const navigate = useNavigate();
  
  const getProgressBarClasses = (value: number | null, type: 'safe' | 'unsafe' | 'resistance') => {
    if (value === null) return '';
    
    // Different color schemes based on metric type
    if (type === 'safe') {
      return value >= 90 ? 'bg-emerald-500' : 
             value >= 75 ? 'bg-green-500' : 
             value >= 50 ? 'bg-yellow-500' : 
             'bg-red-500';
    } else if (type === 'unsafe') {
      return value <= 5 ? 'bg-emerald-500' : 
             value <= 15 ? 'bg-green-500' : 
             value <= 30 ? 'bg-yellow-500' : 
             'bg-red-500';
    } else { // resistance
      return value >= 90 ? 'bg-emerald-500' : 
             value >= 60 ? 'bg-green-500' : 
             value >= 30 ? 'bg-yellow-500' : 
             'bg-red-500';
    }
  };

  // Fixed total counts for all tests
  const SAFE_UNSAFE_TOTAL = 237;
  const JAILBREAK_TOTAL = 37;

  const calculateTestCounts = (percentage: number | null, totalTests: number) => {
    if (percentage === null) return null;
    const safe = Math.round((percentage / 100) * totalTests);
    return { safe, total: totalTests };
  };

  const safeTestCount = model.safeResponses !== null ? calculateTestCounts(model.safeResponses, SAFE_UNSAFE_TOTAL) : null;
  const unsafeTestCount = model.unsafeResponses !== null ? calculateTestCounts(model.unsafeResponses, SAFE_UNSAFE_TOTAL) : null;
  const jailbreakTestCount = model.jailbreakingResistance !== null ? calculateTestCounts(model.jailbreakingResistance, JAILBREAK_TOTAL) : null;

  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 
      hover:shadow-xl hover:-translate-y-1 hover:border-blue-100
      transform transition-all duration-300 ease-out cursor-pointer"
      onClick={() => navigate(`/model/${model.id}`)}
    >
      <div className="flex items-center gap-2 mb-4">
        {model.developerLogo && (
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center 
          group-hover:scale-105 transition-transform duration-300">
            <img 
              src={model.developerLogo} 
              alt={`${model.developer} logo`} 
              className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/32x32/gray/white?text=' + model.developer.charAt(0).toUpperCase();
              }}
            />
          </div>
        )}
        <span className="text-sm font-medium text-gray-600">{model.developer}</span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-700">{model.name}</h3>
      
      {model.safetyRank && (
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium
          transform transition-all duration-300 hover:bg-blue-200 hover:scale-105">
            Safety Rank #{model.safetyRank}
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {model.safeResponses !== null && safeTestCount && (
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Safe Responses</span>
              <span className="font-medium text-green-700">{model.safeResponses}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressBarClasses(model.safeResponses, 'safe')} transition-all duration-500 ease-out`} 
                style={{ width: `${model.safeResponses}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {safeTestCount.safe} out of {SAFE_UNSAFE_TOTAL} tests
            </div>
          </div>
        )}
        
        {model.unsafeResponses !== null && unsafeTestCount && (
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Unsafe Responses</span>
              <span className="font-medium text-red-700">{model.unsafeResponses}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressBarClasses(model.unsafeResponses, 'unsafe')} transition-all duration-500 ease-out`} 
                style={{ width: `${model.unsafeResponses}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {unsafeTestCount.safe} out of {SAFE_UNSAFE_TOTAL} tests
            </div>
          </div>
        )}
        
        {model.jailbreakingResistance !== null && jailbreakTestCount && (
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Jailbreaking Resistance</span>
              <span className="font-medium text-blue-700">{model.jailbreakingResistance}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressBarClasses(model.jailbreakingResistance, 'resistance')} transition-all duration-500 ease-out`} 
                style={{ width: `${model.jailbreakingResistance}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {jailbreakTestCount.safe} out of {JAILBREAK_TOTAL} tests
            </div>
          </div>
        )}
      </div>
      
      <button
        className="w-full mt-6 pt-4 border-t border-gray-100 group"
      >
        <div className="flex items-center justify-center text-blue-600 font-medium 
        hover:text-blue-800 transition-all duration-300 group-hover:translate-x-1">
          <span>See Detailed Report</span>
          <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </button>
    </div>
  );
};

export default RedTeaming; 