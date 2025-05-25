import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Calculator, 
  Brain, 
  Stethoscope, 
  Search, 
  GraduationCap, 
  PenTool, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Shield,
  Zap,
  Award,
  ExternalLink
} from 'lucide-react';
import modelData from '@/data/models.json';

interface ModelRecommendation {
  id: string;
  name: string;
  developer: string;
  score: number;
  reason: string;
  rank: number;
}

interface UseCase {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  recommendations: ModelRecommendation[];
  criteria: string;
}

const Recommendations: React.FC = () => {
  // Helper function to get top models for coding
  const getCodingModels = (): ModelRecommendation[] => {
    const codingModels = modelData
      .filter(model => model.codeLiveBench && model.codeLiveBench !== '-')
      .map(model => ({
        id: model.id,
        name: model.name,
        developer: model.developer,
        score: parseFloat(String(model.codeLiveBench)) * 100,
        reason: `${(parseFloat(String(model.codeLiveBench)) * 100).toFixed(1)}% on CodeLiveBench`,
        rank: 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((model, index) => ({ ...model, rank: index + 1 }));
    
    return codingModels;
  };

  // Helper function to get top models for mathematics
  const getMathModels = (): ModelRecommendation[] => {
    const mathModels = modelData
      .filter(model => model.mathLiveBench && model.mathLiveBench !== '-')
      .map(model => ({
        id: model.id,
        name: model.name,
        developer: model.developer,
        score: parseFloat(String(model.mathLiveBench)),
        reason: `${parseFloat(String(model.mathLiveBench)).toFixed(1)}% on MathLiveBench`,
        rank: 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((model, index) => ({ ...model, rank: index + 1 }));
    
    return mathModels;
  };

  // Helper function to get top models for reasoning
  const getReasoningModels = (): ModelRecommendation[] => {
    const reasoningModels = modelData
      .filter(model => model.codeLMArena && model.codeLMArena !== '-')
      .map(model => ({
        id: model.id,
        name: model.name,
        developer: model.developer,
        score: Number(model.codeLMArena),
        reason: `${Number(model.codeLMArena)} CodeLMArena score`,
        rank: 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((model, index) => ({ ...model, rank: index + 1 }));
    
    return reasoningModels;
  };

  // Helper function to get top models for customer support (based on safety + context length)
  const getCustomerSupportModels = (): ModelRecommendation[] => {
    const supportModels = modelData
      .filter(model => model.safeResponses !== null && model.contextLength)
      .map(model => {
        const safetyScore = model.safeResponses || 0;
        const contextBonus = model.contextLength.includes('200,000') || model.contextLength.includes('1M') ? 10 : 0;
        const totalScore = safetyScore + contextBonus;
        
        return {
          id: model.id,
          name: model.name,
          developer: model.developer,
          score: totalScore,
          reason: `${model.safeResponses}% safety + ${model.contextLength} context`,
          rank: 0
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((model, index) => ({ ...model, rank: index + 1 }));
    
    return supportModels;
  };

  // Helper function to get top models for content writing (based on safety + performance)
  const getContentWritingModels = (): ModelRecommendation[] => {
    const writingModels = modelData
      .filter(model => model.operationalRank !== null && model.operationalRank <= 30)
      .map(model => {
        const rankScore = 31 - (model.operationalRank || 31); // Higher score for better rank
        const safetyBonus = model.safeResponses && model.safeResponses > 90 ? 10 : 0;
        const totalScore = rankScore + safetyBonus;
        
        return {
          id: model.id,
          name: model.name,
          developer: model.developer,
          score: totalScore,
          reason: `Rank #${model.operationalRank} + ${model.safeResponses || 0}% safety`,
          rank: 0
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((model, index) => ({ ...model, rank: index + 1 }));
    
    return writingModels;
  };

  // Helper function to get top models for research (based on reasoning + math)
  const getResearchModels = (): ModelRecommendation[] => {
    const researchModels = modelData
      .filter(model => 
        (model.codeLMArena && model.codeLMArena !== '-') || 
        (model.mathLiveBench && model.mathLiveBench !== '-')
      )
      .map(model => {
        const reasoningScore = model.codeLMArena && model.codeLMArena !== '-' ? Number(model.codeLMArena) / 10 : 0;
        const mathScore = model.mathLiveBench && model.mathLiveBench !== '-' ? parseFloat(String(model.mathLiveBench)) : 0;
        const totalScore = reasoningScore + mathScore;
        
        return {
          id: model.id,
          name: model.name,
          developer: model.developer,
          score: totalScore,
          reason: `Strong reasoning (${model.codeLMArena || 'N/A'}) + math (${model.mathLiveBench || 'N/A'})`,
          rank: 0
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((model, index) => ({ ...model, rank: index + 1 }));
    
    return researchModels;
  };

  const useCases: UseCase[] = [
    {
      title: "Coding & Development",
      description: "Best models for code generation, debugging, and software development tasks",
      icon: <Code className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      recommendations: getCodingModels(),
      criteria: "Based on CodeLiveBench performance"
    },
    {
      title: "Mathematics & Calculations",
      description: "Top performers for mathematical reasoning and complex calculations",
      icon: <Calculator className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      recommendations: getMathModels(),
      criteria: "Based on MathLiveBench scores"
    },
    {
      title: "Reasoning & Analysis",
      description: "Models excelling at logical reasoning and analytical tasks",
      icon: <Brain className="h-6 w-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      recommendations: getReasoningModels(),
      criteria: "Based on CodeLMArena reasoning scores"
    },
    {
      title: "Customer Support",
      description: "Safe and reliable models for customer-facing applications",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      recommendations: getCustomerSupportModels(),
      criteria: "Based on safety scores and context handling"
    },
    {
      title: "Content Writing",
      description: "High-performing models for creative and professional writing",
      icon: <PenTool className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      recommendations: getContentWritingModels(),
      criteria: "Based on operational ranking and safety"
    },
    {
      title: "Research & Analysis",
      description: "Models combining strong reasoning with mathematical capabilities",
      icon: <Search className="h-6 w-6" />,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      recommendations: getResearchModels(),
      criteria: "Based on combined reasoning and math performance"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Award className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200";
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <SEO 
        title="LLM Model Recommendations - Find the Best AI Model for Your Use Case"
        description="Discover the top-performing AI models for coding, mathematics, reasoning, customer support, content writing, and research. Data-driven recommendations based on comprehensive benchmarks."
        ogType="website"
        path="/recommendations"
      />
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Model Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect AI model for your specific use case. Our recommendations are based on comprehensive benchmark data and real-world performance metrics.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardHeader className={`${useCase.bgColor} pb-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-white ${useCase.color}`}>
                    {useCase.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{useCase.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-700 text-base">
                  {useCase.description}
                </CardDescription>
                <p className="text-sm text-gray-600 italic mt-2">
                  {useCase.criteria}
                </p>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {useCase.recommendations.length > 0 ? (
                    useCase.recommendations.map((model, modelIndex) => (
                      <div key={modelIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getRankIcon(model.rank)}
                            <Badge variant="outline" className={`${getRankBadgeColor(model.rank)} font-semibold`}>
                              #{model.rank}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{model.name}</h4>
                            <p className="text-sm text-gray-600">{model.developer}</p>
                            <p className="text-xs text-gray-500 mt-1">{model.reason}</p>
                          </div>
                        </div>
                        <Link to={`/model/${model.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            View Details
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No sufficient benchmark data available for this category yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">How We Rank Models</h3>
              </div>
              <p className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
                Our recommendations are based on objective benchmark data including CodeLiveBench for coding tasks, 
                MathLiveBench for mathematical reasoning, CodeLMArena for general reasoning capabilities, and safety 
                metrics for customer-facing applications. We continuously update these rankings as new benchmark 
                data becomes available.
              </p>
              <div className="mt-6">
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    View Full Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recommendations; 