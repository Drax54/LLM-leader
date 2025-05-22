import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ExternalLink, BarChart4, Shield, Cpu, Calendar, Key, Hash, Clock, CreditCard, Users, Lock, Eye, Leaf, Pencil, MessageSquare, HeadphonesIcon, LightbulbIcon, Code, Search, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import modelData from '@/data/models.json';
import JailbreakingAnalysis from '@/components/ModelDetails/JailbreakingAnalysis';

const ModelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // State for cost calculator
  const [inputTokens, setInputTokens] = useState<number>(1);
  const [outputTokens, setOutputTokens] = useState<number>(1);
  
  const model = modelData.find(m => m.id === id);
  
  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Model not found</h2>
          <p className="text-gray-600 mb-6">The model you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="default">
            Return to Leaderboard
          </Button>
        </div>
      </div>
    );
  }

  const formatValue = (value: number | string | null, unit: string = ''): string => {
    if (value === null || value === '-') return 'Not Available';
    return `${value}${unit}`;
  };

  const formatDate = (date: string): string => {
    if (date === '-') return 'Not Available';
    return date;
  };

  const getScoreClassName = (score: number | null) => {
    if (score === null) return "bg-gray-100 text-gray-500";
    if (score === 100) return "bg-green-100 text-green-800 font-medium";
    if (score === 0) return "bg-green-100 text-green-800 font-medium";
    if (score >= 90) return "bg-green-100 text-green-800 font-medium";
    if (score >= 70) return "bg-green-100 text-green-800 font-medium";
    if (score >= 50) return "bg-yellow-100 text-yellow-800 font-medium";
    if (score >= 30) return "bg-orange-100 text-orange-800 font-medium";
    return "bg-red-100 text-red-800 font-medium";
  };
  
  const getProgressWidth = (score: number | null): string => {
    if (score === null) return "0%";
    return `${score}%`;
  };

  // Mock description based on model type
  const getModelDescription = () => {
    return "A state-of-the-art language model designed for specialized tasks with strong reasoning capabilities and comprehensive safety measures.";
  };

  // Calculate estimated test counts based on percentages for visualization
  const totalTestCount = 250;
  const safeResponsesCount = model.safeResponses ? Math.round((model.safeResponses / 100) * totalTestCount) : 0;
  const unsafeResponsesCount = model.unsafeResponses ? Math.round((model.unsafeResponses / 100) * totalTestCount) : 0;
  
  const jailbreakTotalCount = 40;
  const jailbreakSafeCount = model.jailbreakingResistance ? Math.round((model.jailbreakingResistance / 100) * jailbreakTotalCount) : 0;

  // Generate radar chart data based on model benchmarks
  const radarData = [
    {
      subject: 'Reasoning',
      score: model.codeLMArena ? Math.min(100, Number(model.codeLMArena) / 10) : 0,
      fullMark: 100,
    },
    {
      subject: 'Mathematics',
      score: model.mathLiveBench ? parseFloat(String(model.mathLiveBench)) : 0,
      fullMark: 100,
    },
    {
      subject: 'Coding',
      score: model.codeLiveBench ? parseFloat(String(model.codeLiveBench)) : 0,
      fullMark: 100,
    },
    {
      subject: 'Safety',
      score: model.safeResponses || 0,
      fullMark: 100,
    },
    {
      subject: 'Resilience',
      score: model.jailbreakingResistance || 0,
      fullMark: 100,
    },
  ];

  // Calculate cost based on input and output tokens
  const calculateCost = () => {
    if (!model.inputCost || !model.outputCost) return "Not Available";
    
    const inputCost = (inputTokens * model.inputCost) / 1000000;
    const outputCost = (outputTokens * model.outputCost) / 1000000;
    const totalCost = inputCost + outputCost;
    
    return `$${totalCost.toFixed(4)}`;
  };

  // Business use cases data
  const businessUseCases = [
    {
      name: "Content Creation",
      description: "Generate articles, blogs, and marketing copy",
      icon: <Pencil className="h-5 w-5 text-blue-600" />,
      score: model.safeResponses ? (model.safeResponses > 90 ? "Excellent" : model.safeResponses > 75 ? "Good" : "Fair") : "N/A"
    },
    {
      name: "Chatbot",
      description: "Create conversational AI assistants",
      icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
      score: model.jailbreakingResistance ? (model.jailbreakingResistance > 80 ? "Excellent" : model.jailbreakingResistance > 60 ? "Good" : "Fair") : "N/A"
    },
    {
      name: "Customer Service",
      description: "Automate support and improve response times",
      icon: <HeadphonesIcon className="h-5 w-5 text-green-600" />,
      score: (model.safeResponses && model.jailbreakingResistance) ? 
        ((model.safeResponses + model.jailbreakingResistance) / 2 > 85 ? "Excellent" : 
         (model.safeResponses + model.jailbreakingResistance) / 2 > 70 ? "Good" : "Fair") : "N/A"
    },
    {
      name: "Creative Projects",
      description: "Generate ideas, stories, and creative content",
      icon: <LightbulbIcon className="h-5 w-5 text-yellow-600" />,
      score: model.codeLMArena ? (Number(model.codeLMArena) > 1200 ? "Excellent" : Number(model.codeLMArena) > 1000 ? "Good" : "Fair") : "N/A"
    },
    {
      name: "Code Generation",
      description: "Create and debug programming code",
      icon: <Code className="h-5 w-5 text-red-600" />,
      score: model.codeLiveBench ? (parseFloat(String(model.codeLiveBench)) > 70 ? "Excellent" : parseFloat(String(model.codeLiveBench)) > 60 ? "Good" : "Fair") : "N/A"
    },
    {
      name: "Research Assistant",
      description: "Analyze information and support research",
      icon: <Search className="h-5 w-5 text-indigo-600" />,
      score: model.mathLiveBench ? (parseFloat(String(model.mathLiveBench)) > 70 ? "Excellent" : parseFloat(String(model.mathLiveBench)) > 60 ? "Good" : "Fair") : "N/A"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="container mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-16">
        {/* Back to Leaderboard Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-600 hover:text-blue-600 -ml-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leaderboard
          </Button>
        </div>
        
        {/* Model Header (Like Image 3) */}
        <div className="mb-12">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-gray-100 shadow-md flex-shrink-0">
              <img 
                src={model.developerLogo} 
                alt={`${model.developer} logo`} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{model.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{model.developer}</p>
              <p className="text-gray-700 max-w-3xl">{getModelDescription()}</p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-200">
                  {model.operationalRank ? `Operational Rank #${model.operationalRank}` : "Unranked"}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm bg-green-50 text-green-700 border-green-200">
                  {model.safetyRank ? `Safety Rank #${model.safetyRank}` : "Unranked"}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm bg-purple-50 text-purple-700 border-purple-200">
                  {model.size}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm bg-gray-50 text-gray-700 border-gray-200">
                  {model.license}
                </Badge>
              </div>
            </div>
            <div className="ml-auto">
              <Button className="mt-2" variant="default">
                <span>Try Model</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-500">Released</p>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xl font-semibold text-gray-900">{formatDate(model.released)}</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-500">Context Length</p>
                  <Hash className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xl font-semibold text-gray-900">{model.contextLength}</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-500">Knowledge Cutoff</p>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xl font-semibold text-gray-900">{formatValue(model.cutoffKnowledge)}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Benchmark Performance */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">CodeLMArena</h3>
                        <p className="text-sm text-gray-500">Logical reasoning</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {model.codeLMArena ? Number(model.codeLMArena).toString() : "Not Available"}
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-1.5 mt-3">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: model.codeLMArena ? `${Math.min(100, (Number(model.codeLMArena) / 1500) * 100)}%` : '0%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {model.codeLMArena ? 
                        (Number(model.codeLMArena) > 1300 ? "Excellent reasoning capabilities" : 
                         Number(model.codeLMArena) > 1100 ? "Good reasoning capabilities" :
                         "Average reasoning capabilities") :
                        "Not yet evaluated"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Hash className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">MathLiveBench</h3>
                        <p className="text-sm text-gray-500">Mathematical ability</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {model.mathLiveBench ? model.mathLiveBench.toString() : "Not Available"}
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-1.5 mt-3">
                      <div 
                        className="bg-purple-600 h-1.5 rounded-full" 
                        style={{ width: model.mathLiveBench ? `${Math.min(100, parseFloat(String(model.mathLiveBench)))}%` : '0%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {model.mathLiveBench ? 
                        (parseFloat(String(model.mathLiveBench)) > 70 ? "Excellent mathematical capabilities" : 
                         parseFloat(String(model.mathLiveBench)) > 40 ? "Good mathematical capabilities" :
                         "Average mathematical capabilities") :
                        "Not yet evaluated"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <BrainCircuit className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">CodeLiveBench</h3>
                        <p className="text-sm text-gray-500">Coding ability</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {model.codeLiveBench ? model.codeLiveBench.toString() : "Not Available"}
                    </div>
                    <div className="w-full bg-indigo-100 rounded-full h-1.5 mt-3">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full" 
                        style={{ width: model.codeLiveBench ? `${Math.min(100, parseFloat(String(model.codeLiveBench)))}%` : '0%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {model.codeLiveBench ? 
                        (parseFloat(String(model.codeLiveBench)) > 70 ? "Excellent coding capabilities" : 
                         parseFloat(String(model.codeLiveBench)) > 40 ? "Good coding capabilities" :
                         "Average coding capabilities") :
                        "Not yet evaluated"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Pricing Information Card */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-900">Pricing Information</CardTitle>
              <CardDescription>Token costs and usage estimates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Input Cost</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {model.inputCost ? `$${model.inputCost} per million tokens` : 'Not Available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Output Cost</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {model.outputCost ? `$${model.outputCost} per million tokens` : 'Not Available'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Cost Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">1M input tokens:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {model.inputCost ? `$${model.inputCost.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">1M output tokens:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {model.outputCost ? `$${model.outputCost.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 mt-3">
                      <span className="text-sm font-medium text-gray-600">Estimated monthly cost:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {(model.inputCost && model.outputCost) ? 
                          `$${((model.inputCost * 5) + (model.outputCost * 3)).toFixed(2)}` : 
                          'Not Available'
                        }
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Based on average usage of 5M input tokens and 3M output tokens per month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Jailbreaking & Red Teaming Analysis */}
          {model.safeResponses !== null && model.jailbreakingResistance !== null ? (
            <div className="mb-8">
              <JailbreakingAnalysis 
                modelName={model.name}
                safeResponsesPercentage={model.safeResponses || 0}
                safeResponsesCount={safeResponsesCount}
                totalResponsesCount={totalTestCount}
                unsafeResponsesPercentage={model.unsafeResponses || 0}
                unsafeResponsesCount={unsafeResponsesCount}
                jailbreakingResistancePercentage={model.jailbreakingResistance || 0}
                jailbreakingResistanceSafeCount={jailbreakSafeCount}
                jailbreakingResistanceTotalCount={jailbreakTotalCount}
              />
            </div>
          ) : (
            <Card className="border-none shadow-sm mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-gray-900">Safety Metrics</CardTitle>
                <CardDescription>Safety testing data not yet available for this model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    This model has not yet undergone our comprehensive safety evaluations. 
                  </p>
                  <p className="text-gray-500 text-sm">
                    Safety metrics include safe response rates, unsafe response handling, and jailbreaking resistance tests.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Industry Comparison */}
          <Card className="border-none shadow-sm mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-900">Industry Comparison</CardTitle>
              <CardDescription>How this model compares to industry standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Performance vs. Industry Average</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Reasoning Capability</span>
                          <span className="text-sm font-medium text-gray-700">
                            {model.codeLMArena ? `${Number(model.codeLMArena) > 1200 ? "+15%" : Number(model.codeLMArena) > 1100 ? "+5%" : "-5%"}` : "N/A"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-4 w-0.5 bg-gray-300 z-10"></div>
                          </div>
                          <div 
                            className={`h-2.5 rounded-full ${model.codeLMArena && Number(model.codeLMArena) > 1200 ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ 
                              width: model.codeLMArena ? 
                                `${50 + (Number(model.codeLMArena) > 1200 ? 15 : Number(model.codeLMArena) > 1100 ? 5 : -5)}%` : 
                                '50%',
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Mathematical Ability</span>
                          <span className="text-sm font-medium text-gray-700">
                            {model.mathLiveBench ? `${parseFloat(String(model.mathLiveBench)) > 40 ? "+20%" : parseFloat(String(model.mathLiveBench)) > 30 ? "+10%" : "-10%"}` : "N/A"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-4 w-0.5 bg-gray-300 z-10"></div>
                          </div>
                          <div 
                            className={`h-2.5 rounded-full ${model.mathLiveBench && parseFloat(String(model.mathLiveBench)) > 40 ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ 
                              width: model.mathLiveBench ? 
                                `${50 + (parseFloat(String(model.mathLiveBench)) > 40 ? 20 : parseFloat(String(model.mathLiveBench)) > 30 ? 10 : -10)}%` : 
                                '50%',
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Safety Compliance</span>
                          <span className="text-sm font-medium text-gray-700">
                            {model.safeResponses ? `${model.safeResponses > 90 ? "+25%" : model.safeResponses > 80 ? "+10%" : "-5%"}` : "N/A"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-4 w-0.5 bg-gray-300 z-10"></div>
                          </div>
                          <div 
                            className={`h-2.5 rounded-full ${model.safeResponses && model.safeResponses > 90 ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ 
                              width: model.safeResponses ? 
                                `${50 + (model.safeResponses > 90 ? 25 : model.safeResponses > 80 ? 10 : -5)}%` : 
                                '50%',
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">Competitive Positioning</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Cost-Performance Ratio:</span>
                        <span className={`text-sm font-medium ${
                          model.inputCost && model.outputCost && model.codeLMArena ? 
                            (Number(model.codeLMArena) > 1200 && model.inputCost < 5 ? "text-green-700" : "text-blue-700") : 
                            "text-gray-700"
                        }`}>
                          {model.inputCost && model.outputCost && model.codeLMArena ? 
                            (Number(model.codeLMArena) > 1200 && model.inputCost < 5 ? "Excellent" : 
                             Number(model.codeLMArena) > 1000 && model.inputCost < 10 ? "Good" : "Average") : 
                            "Unknown"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Context Length vs. Price:</span>
                        <span className={`text-sm font-medium ${
                          model.contextLength && model.inputCost ? 
                            (model.contextLength.includes("1M") && model.inputCost < 5 ? "text-green-700" : "text-blue-700") : 
                            "text-gray-700"
                        }`}>
                          {model.contextLength && model.inputCost ? 
                            (model.contextLength.includes("1M") && model.inputCost < 5 ? "Top Tier" : 
                             model.contextLength.includes("128K") && model.inputCost < 10 ? "Competitive" : "Standard") : 
                            "Unknown"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Safety-Performance Balance:</span>
                        <span className={`text-sm font-medium ${
                          model.safeResponses && model.codeLMArena ? 
                            (model.safeResponses > 90 && Number(model.codeLMArena) > 1200 ? "text-green-700" : "text-blue-700") : 
                            "text-gray-700"
                        }`}>
                          {model.safeResponses && model.codeLMArena ? 
                            (model.safeResponses > 90 && Number(model.codeLMArena) > 1200 ? "Industry Leader" : 
                             model.safeResponses > 80 && Number(model.codeLMArena) > 1100 ? "Strong" : "Balanced") : 
                            "Unknown"}
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-2">
                        <p className="text-sm text-gray-600">Recommendation:</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {model.operationalRank && model.operationalRank <= 10 ? 
                            "Highly recommended for enterprise deployment across multiple use cases." : 
                           model.operationalRank && model.operationalRank <= 30 ? 
                            "Recommended for specific business functions with good performance-to-cost ratio." : 
                            "Consider for specialized applications or when budget constraints are primary."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Business Decision Guide */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-900">Business Decision Guide</CardTitle>
              <CardDescription>Key factors to consider when adopting this model for enterprise use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-50 rounded-full mr-3">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">Safety Profile</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {model.safeResponses !== null && model.jailbreakingResistance !== null ? (
                        `This model shows ${model.safeResponses > 90 ? "excellent" : model.safeResponses > 75 ? "good" : "moderate"} safety compliance (${model.safeResponses}%) with ${model.jailbreakingResistance > 80 ? "strong" : model.jailbreakingResistance > 60 ? "moderate" : "limited"} resistance to jailbreaking (${model.jailbreakingResistance}%).`
                      ) : (
                        "Safety metrics not yet available for this model."
                      )}
                    </p>
                    <div className="mt-3">
                      <Badge variant="outline" className={`${
                        model.safetyRank ? (
                          model.safetyRank <= 5 ? "bg-green-100 text-green-800" : 
                          model.safetyRank <= 15 ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        ) : "bg-gray-100 text-gray-800"
                      }`}>
                        {model.safetyRank ? `Safety Rank: #${model.safetyRank}` : "Unranked"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-purple-50 rounded-full mr-3">
                        <BrainCircuit className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">Performance Metrics</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {(model.codeLMArena || model.mathLiveBench || model.codeLiveBench) ? (
                        `Strong in ${model.codeLMArena && Number(model.codeLMArena) > 1200 ? "reasoning, " : ""}${model.mathLiveBench && parseFloat(String(model.mathLiveBench)) > 50 ? "mathematics, " : ""}${model.codeLiveBench && parseFloat(String(model.codeLiveBench)) > 50 ? "coding" : ""}. Ideal for ${model.codeLMArena && Number(model.codeLMArena) > 1200 ? "complex tasks" : "standard operations"}.`
                      ) : (
                        "Performance metrics not yet available for this model."
                      )}
                    </p>
                    <div className="mt-3">
                      <Badge variant="outline" className={`${
                        model.operationalRank ? (
                          model.operationalRank <= 5 ? "bg-green-100 text-green-800" : 
                          model.operationalRank <= 15 ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        ) : "bg-gray-100 text-gray-800"
                      }`}>
                        {model.operationalRank ? `Performance Rank: #${model.operationalRank}` : "Unranked"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-green-50 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">Cost Efficiency</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {(model.inputCost && model.outputCost) ? (
                        `${model.inputCost < 1 && model.outputCost < 3 ? "Low cost" : model.inputCost < 5 && model.outputCost < 10 ? "Moderate cost" : "Premium pricing"} with ${model.contextLength && model.contextLength.includes("1M") ? "excellent" : "standard"} context handling.`
                      ) : (
                        "Cost information not yet available for this model."
                      )}
                    </p>
                    <div className="mt-3">
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
                        {model.inputCost && model.outputCost ? `$${((model.inputCost * 5) + (model.outputCost * 3)).toFixed(2)}/mo (avg. use)` : "N/A"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* ROI Estimate */}
                <div className="mt-6 p-5 border border-gray-200 rounded-lg bg-white">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Estimated ROI Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Time Savings</p>
                      <p className="text-lg font-semibold text-blue-700">
                        {model.codeLMArena ? (Number(model.codeLMArena) > 1200 ? "25-30%" : "15-20%") : "~15%"}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Cost Reduction</p>
                      <p className="text-lg font-semibold text-green-700">
                        {(model.inputCost && model.outputCost) ? 
                          (model.inputCost < 1 && model.outputCost < 3 ? "20-25%" : "10-15%") : 
                          "~10%"}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Quality Improvement</p>
                      <p className="text-lg font-semibold text-purple-700">
                        {model.safeResponses ? (model.safeResponses > 90 ? "High" : "Medium") : "TBD"}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Overall Rating</p>
                      <p className="text-lg font-semibold text-amber-700">
                        {model.operationalRank && model.operationalRank <= 10 ? "Excellent" : 
                        model.operationalRank && model.operationalRank <= 30 ? "Very Good" : 
                        model.operationalRank && model.operationalRank <= 50 ? "Good" : "Fair"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Technical Capabilities Radar Chart */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-900">Technical Capabilities</CardTitle>
              <CardDescription>Performance evaluation across multiple dimensions</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2 h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name={model.name}
                        dataKey="score"
                        stroke="#4f46e5"
                        fill="#818cf8"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 p-4">
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Capability Breakdown</h3>
                  <div className="space-y-2">
                    {radarData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 bg-indigo-600`}></div>
                          <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                        </div>
                        <div className="text-sm font-semibold">
                          {item.score.toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Cost Calculator */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-900">Cost Calculator</CardTitle>
              <CardDescription>Estimate token usage costs for your specific needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Input Tokens</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">{inputTokens.toLocaleString()} tokens</span>
                    </div>
                    <Slider
                      defaultValue={[1]}
                      max={10000000}
                      step={10000}
                      onValueChange={(value) => setInputTokens(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">1</span>
                      <span className="text-xs text-gray-500">10M</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Output Tokens</span>
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm font-medium">{outputTokens.toLocaleString()} tokens</span>
                    </div>
                    <Slider
                      defaultValue={[1]}
                      max={10000000}
                      step={10000}
                      onValueChange={(value) => setOutputTokens(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">1</span>
                      <span className="text-xs text-gray-500">10M</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Estimated Cost</h3>
                  <p className="text-sm text-gray-600 mb-6">Based on your token selection</p>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-indigo-700 mb-3">
                      {calculateCost()}
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Input Cost:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {model.inputCost ? `$${((inputTokens * model.inputCost) / 1000000).toFixed(4)}` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Output Cost:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {model.outputCost ? `$${((outputTokens * model.outputCost) / 1000000).toFixed(4)}` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Business Use Cases */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-900">Recommended Business Use Cases</CardTitle>
              <CardDescription>Optimize your workflows with tailored AI solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {businessUseCases.map((useCase, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start mb-4">
                        <div className={`p-2.5 rounded-full mr-3 
                          ${index === 0 ? "bg-blue-100" : 
                            index === 1 ? "bg-purple-100" : 
                            index === 2 ? "bg-green-100" : 
                            index === 3 ? "bg-yellow-100" : 
                            index === 4 ? "bg-red-100" : "bg-indigo-100"}`}>
                          {useCase.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base">{useCase.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{useCase.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Suitability:</span>
                          <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                            useCase.score === "Excellent" ? "bg-green-100 text-green-800" :
                            useCase.score === "Good" ? "bg-blue-100 text-blue-800" :
                            useCase.score === "Fair" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {useCase.score}
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className={`h-2 rounded-full ${
                              useCase.score === "Excellent" ? "bg-green-500" :
                              useCase.score === "Good" ? "bg-blue-500" :
                              useCase.score === "Fair" ? "bg-yellow-500" :
                              "bg-gray-400"
                            }`} 
                            style={{ 
                              width: useCase.score === "Excellent" ? "90%" :
                                     useCase.score === "Good" ? "70%" :
                                     useCase.score === "Fair" ? "40%" : "20%" 
                            }}
                          ></div>
                        </div>
                        
                        <div className="text-sm text-gray-700 space-y-3 mt-4">
                          <div className="flex items-start">
                            <span className="font-bold text-lg mr-2">•</span>
                            <span className="text-gray-800">
                              {useCase.name === "Content Creation" ? 
                                `${model.safeResponses && model.safeResponses > 90 ? "Excellent response quality" : "Standard content generation"}` :
                               useCase.name === "Chatbot" ? 
                                `${model.jailbreakingResistance && model.jailbreakingResistance > 80 ? "High resilience against manipulation" : "Standard conversational abilities"}` :
                               useCase.name === "Customer Service" ? 
                                `${model.contextLength && model.contextLength.includes("200,000") ? "High-capacity context retention" : "Competent customer support"}` :
                               useCase.name === "Creative Projects" ? 
                                `${model.codeLMArena && Number(model.codeLMArena) > 1200 ? "Superior creative reasoning" : "Suitable for creative tasks"}` :
                               useCase.name === "Code Generation" ? 
                                `${model.codeLiveBench && parseFloat(String(model.codeLiveBench)) > 70 ? "Advanced coding capabilities" : "Functional code generation"}` :
                                `${model.mathLiveBench && parseFloat(String(model.mathLiveBench)) > 40 ? "Strong analytical capabilities" : "Basic research support"}`
                              }
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="font-bold text-lg mr-2">•</span>
                            <span className="text-gray-800">
                              {useCase.name === "Content Creation" ? 
                                "Consistent brand voice alignment" :
                               useCase.name === "Chatbot" ? 
                                "Natural conversational flow" :
                               useCase.name === "Customer Service" ? 
                                "Quick response generation" :
                               useCase.name === "Creative Projects" ? 
                                "Idea expansion and brainstorming" :
                               useCase.name === "Code Generation" ? 
                                "Adaptable to multiple languages" :
                                "Information synthesis and summary"
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-5 py-3 border-t border-gray-200 ${
                      useCase.score === "Excellent" ? "bg-green-50" :
                      useCase.score === "Good" ? "bg-blue-50" :
                      useCase.score === "Fair" ? "bg-yellow-50" :
                      "bg-gray-50"
                    }`}>
                      <p className="font-medium text-gray-800 text-sm">
                        <span className="font-semibold mr-1">Best for:</span>
                        {useCase.name === "Content Creation" ? 
                          "Marketing teams, publishers, content agencies" :
                         useCase.name === "Chatbot" ? 
                          "Customer engagement, website assistants" :
                         useCase.name === "Customer Service" ? 
                          "Support teams, customer success departments" :
                         useCase.name === "Creative Projects" ? 
                          "Design teams, storytellers, game developers" :
                         useCase.name === "Code Generation" ? 
                          "Development teams, engineering departments" :
                          "R&D departments, data analysis teams"
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelDetail; 