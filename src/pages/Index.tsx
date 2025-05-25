import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  ArrowUp,
  ArrowUpDown,
  Search,
  XCircle,
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import modelData from '@/data/models.json';

type SortField = 'name' | 'developer' | 'inputCost' | 'outputCost' | 'cutoffKnowledge' | 'contextLength' | 'license' | 'safeResponses' | 'unsafeResponses' | 'jailbreakingResistance' | 'operationalRank' | 'safetyRank' | 'size' | 'released' | 'codeLMArena' | 'mmlu' | 'mathLiveBench' | 'codeLiveBench' | 'outputSpeed' | 'latency';

interface ModelData {
  id: string;
  name: string;
  operationalRank: number | null;
  safetyRank: number | null;
  developer: string;
  developerLogo: string;
  size: string;
  released: string;
  codeLMArena: number | string;
  mmlu: string;
  mathLiveBench: string;
  codeLiveBench: string;
  inputCost: number | null;
  outputCost: number | null;
  cutoffKnowledge: string;
  contextLength: string;
  license: string;
  safeResponses: number | null;
  unsafeResponses: number | null;
  jailbreakingResistance: number | null;
  outputSpeed: number | null;
  latency: number | null;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('operationalRank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredModels, setFilteredModels] = useState<ModelData[]>(modelData);
  
  const navigate = useNavigate();

  const filterModels = useCallback((term: string) => {
    // Apply search term filter
    const termLower = term.toLowerCase();
    console.log('Searching for:', termLower);
    
    const filtered = modelData.filter(model => {
      const nameMatch = model.name.toLowerCase().includes(termLower);
      const developerMatch = model.developer.toLowerCase().includes(termLower);
      const licenseMatch = model.license && model.license.toLowerCase().includes(termLower);
      const knowledgeMatch = model.cutoffKnowledge && model.cutoffKnowledge.toLowerCase().includes(termLower);
      
      const isMatch = nameMatch || developerMatch || licenseMatch || knowledgeMatch;
      if (isMatch && termLower.length > 0) {
        console.log('Match found:', model.name, model.developer);
      }
      return isMatch;
    });
    
    console.log(`Found ${filtered.length} matches out of ${modelData.length} models`);
    setFilteredModels(filtered);
  }, []);

  // Update when searchTerm changes
  useEffect(() => {
    filterModels(searchTerm);
  }, [searchTerm, filterModels]);

  // Add this helper function before the sortModels function
  const convertSizeToNumber = (size: string): number => {
    // Handle empty or invalid values
    if (!size || size === '-') return -1;
    
    // Extract number and unit (B or T) from the size string
    const match = size.match(/(\d+(?:\.\d+)?)\s*([BT])/i);
    if (!match) return -1;
    
    const [, num, unit] = match;
    const value = parseFloat(num);
    
    // Convert to billions (B)
    return unit.toUpperCase() === 'T' ? value * 1000 : value;
  };

  const sortModels = useCallback((field: SortField, order: 'asc' | 'desc') => {
    const sortedModels = [...filteredModels].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      // Special handling for size field
      if (field === 'size') {
        const aSize = convertSizeToNumber(String(aValue));
        const bSize = convertSizeToNumber(String(bValue));
        return order === 'asc' ? bSize - aSize : aSize - bSize; // Reversed for size to show larger first
      }

      // Convert string percentages to numbers
      if (typeof aValue === 'string' && aValue.endsWith('%')) {
        aValue = parseFloat(aValue);
      }
      if (typeof bValue === 'string' && bValue.endsWith('%')) {
        bValue = parseFloat(bValue);
      }

      // Handle null, undefined, and '-' values (should appear last)
      if (aValue === null || aValue === undefined || aValue === '-') return 1;
      if (bValue === null || bValue === undefined || bValue === '-') return -1;
      if (aValue === null && bValue === null) return 0;
      
      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        // For safety-related fields, higher numbers are better
        if (field === 'safeResponses' || field === 'jailbreakingResistance') {
          return order === 'asc' ? bValue - aValue : aValue - bValue;
        }
        // For unsafe responses, lower numbers are better
        if (field === 'unsafeResponses') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle string values
      const aString = String(aValue || '');
      const bString = String(bValue || '');
      
      return order === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
    });
    
    setFilteredModels(sortedModels);
  }, [filteredModels]);

  useEffect(() => {
    sortModels(sortField, sortOrder);
  }, [sortField, sortOrder, sortModels]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Modified to update searchTerm state properly
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const getScoreClassName = (score: number | null | string, metric: string = 'safety') => {
    if (score === null || score === '-') return "bg-gray-100 text-gray-500";
    
    const numericScore = typeof score === 'string' ? parseFloat(score) : score;
    
    if (metric === 'benchmark') {
      if (numericScore >= 80) return "bg-emerald-100 text-emerald-800 font-medium";
      if (numericScore >= 60) return "bg-green-100 text-green-800 font-medium";
      if (numericScore >= 40) return "bg-yellow-100 text-yellow-800 font-medium";
      if (numericScore >= 20) return "bg-orange-100 text-orange-800 font-medium";
      return "bg-red-100 text-red-800 font-medium";
    }
    
    if (metric === 'unsafe') {
      if (100 - numericScore >= 90) return "bg-emerald-100 text-emerald-800 font-medium";
      if (100 - numericScore >= 70) return "bg-green-100 text-green-800 font-medium";
      if (100 - numericScore >= 50) return "bg-yellow-100 text-yellow-800 font-medium";
      if (100 - numericScore >= 30) return "bg-orange-100 text-orange-800 font-medium";
      return "bg-red-100 text-red-800 font-medium";
    }
    
    if (numericScore >= 90) return "bg-emerald-100 text-emerald-800 font-medium";
    if (numericScore >= 70) return "bg-green-100 text-green-800 font-medium";
    if (numericScore >= 50) return "bg-yellow-100 text-yellow-800 font-medium";
    if (numericScore >= 30) return "bg-orange-100 text-orange-800 font-medium";
    return "bg-red-100 text-red-800 font-medium";
  };

  const formatValue = (value: number | null | string, unit: string = "") => {
    if (value === null || value === "-") return "—";
    return `${value}${unit}`;
  };

  const getDeveloperInitial = (developer: string) => {
    return developer.charAt(0).toUpperCase();
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField === field) {
      return <ArrowUp className={`h-3 w-3 ml-1 text-blue-600 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />;
    }
    return <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <SEO 
        title="LLM Leaderboard - AI Model Benchmarks, Rankings & Performance Analysis"
        description="Compare top AI models with comprehensive performance metrics, safety ratings, and business use cases. Find the best LLM for your specific needs with real-world benchmarks."
        path="/"
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 tracking-tight">LLM Leaderboard</h1>
          <p className="text-gray-600 text-sm">Compare model performance across benchmarks and safety evaluations</p>
        </div>

        {/* Search and Model Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300 w-full text-base"
              style={{ fontFeatureSettings: '"calt" 1' }} 
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Total Model Count */}
          <div className="bg-blue-50 px-4 py-2 rounded-md border border-blue-100">
            <span className="text-sm text-gray-700">
              Showing <span className="font-semibold text-blue-700">{filteredModels.length}</span> of <span className="font-semibold text-blue-700">{modelData.length}</span> total models
            </span>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-md">
          <ScrollArea className="w-full h-full" type="scroll" scrollHideDelay={0}>
            <div className="min-w-[1200px]">
              <Table className="w-full">
                <TableHeader className="bg-gray-50 sticky top-0 z-10">
                  <TableRow className="border-b-2 border-gray-200">
                    <TableHead 
                      className="w-[220px] px-4 py-3.5 text-left font-medium sticky left-0 z-30 bg-gray-50 shadow-[1px_0_0_0_#e5e7eb] transition-colors duration-150"
                      onClick={() => handleSort('name')}
                    >
                      <div className="absolute inset-0 bg-gray-50"></div>
                      <div className="relative z-10">
                        <div className="flex items-center">
                          <span className="text-base font-semibold text-gray-700">Model</span>
                          {renderSortIcon('name')}
                        </div>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('operationalRank')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Operational</span>
                        <span className="text-xs text-gray-500">Rank</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[100px] border-l border-gray-100"
                      onClick={() => handleSort('safetyRank')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Safety</span>
                        <span className="text-xs text-gray-500">Rank</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[90px] border-l border-gray-100"
                      onClick={() => handleSort('developer')}
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-base font-semibold text-gray-700">Org.</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[130px] border-l border-gray-100"
                      onClick={() => handleSort('size')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Size</span>
                        <span className="text-xs text-gray-500">Parameters</span>
                      </div>
                    </TableHead>

                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('contextLength')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Context</span>
                        <span className="text-xs text-gray-500">Length</span>
                      </div>
                    </TableHead>

                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('released')}
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-base font-semibold text-gray-700">Released</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('codeLMArena')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Code</span>
                        <span className="text-xs text-gray-500">LMArena</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('mmlu')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">MMLU</span>
                        <span className="text-xs text-gray-500">Score</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('mathLiveBench')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Math</span>
                        <span className="text-xs text-gray-500">LiveBench</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('codeLiveBench')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Code</span>
                        <span className="text-xs text-gray-500">LiveBench</span>
                      </div>
                    </TableHead>

                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('outputSpeed')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Output Speed</span>
                        <span className="text-xs text-gray-500">tokens/s</span>
                      </div>
                    </TableHead>

                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('latency')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Latency</span>
                        <span className="text-xs text-gray-500">TTFT (s)</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('inputCost')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Input</span>
                        <span className="text-xs text-gray-500">Cost $/M</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('outputCost')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Output</span>
                        <span className="text-xs text-gray-500">Cost $/M</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('cutoffKnowledge')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Cutoff</span>
                        <span className="text-xs text-gray-500">Knowledge</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('safeResponses')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Safe</span>
                        <span className="text-xs text-gray-500">Responses</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('unsafeResponses')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Unsafe</span>
                        <span className="text-xs text-gray-500">Responses</span>
                      </div>
                    </TableHead>
                    
                    <TableHead 
                      className="px-3 py-3.5 text-center font-medium text-gray-700 whitespace-nowrap cursor-pointer w-[120px] border-l border-gray-100"
                      onClick={() => handleSort('jailbreakingResistance')}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-gray-700">Jailbreaking</span>
                        <span className="text-xs text-gray-500">Resistance</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow 
                      key={model.id} 
                      className="group relative hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                      onClick={() => navigate(`/model/${model.id}`)}
                    >
                      <TableCell className="w-[220px] py-4 px-4 border-b border-gray-200 sticky left-0 z-10 bg-white shadow-[1px_0_0_0_#e5e7eb] transition-colors duration-150">
                        <div className="absolute inset-0 bg-white group-hover:bg-blue-50/50 transition-colors duration-150"></div>
                        <div className="relative z-10">
                          <div className="flex items-center space-x-3">
                            {model.developerLogo ? (
                              <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0 bg-transparent flex items-center justify-center border border-gray-100 shadow-sm">
                                <img 
                                  src={model.developerLogo} 
                                  alt={`${model.developer} logo`} 
                                  className="h-full w-full object-contain"
                                  onError={(e) => {
                                    const imgElement = e.target as HTMLImageElement;
                                    imgElement.style.display = 'none';
                                    imgElement.onerror = null;
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-gray-700 font-medium border border-gray-200">
                                {model.developer ? getDeveloperInitial(model.developer) : "?"}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">{model.name}</div>
                              <div className="text-xs text-gray-500">{model.developer}</div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.operationalRank ? (
                          <span className="px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ring-1 ring-inset ring-green-200">
                            #{model.operationalRank}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.safetyRank ? (
                          <span className="px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200">
                            #{model.safetyRank}
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500 ring-1 ring-inset ring-gray-200">
                            N/A
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100 font-normal text-gray-700">{model.developer}</TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.size.includes("Parameters") ? (
                          <div className="flex flex-col items-center font-mono">
                            <span>{model.size.split(" ")[0]}</span>
                          </div>
                        ) : (
                          <span className="font-mono">{model.size}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.contextLength !== '-' ? (
                          <span className="font-mono text-gray-700">
                            {model.contextLength.includes("tokens") ? 
                              model.contextLength.includes("1M tokens") ? 
                                model.contextLength :
                                model.contextLength
                                  .replace("200,000 tokens", "200k tokens")
                                  .replace("128,000 tokens", "128k tokens")
                                  .replace(/(\d+),(\d+) tokens/g, (match, p1, p2) => {
                                    const num = parseInt(p1 + p2, 10);
                                    return `${num/1000}k tokens`;
                                  })
                              : model.contextLength
                            }
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100 font-mono font-normal text-gray-700">{model.released}</TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100 font-normal">
                        {model.codeLMArena !== '-' ? (
                          <span className="font-mono text-gray-700">
                            {model.codeLMArena}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.mmlu !== '-' ? (
                          <span className={`px-2 py-1 rounded-md text-sm font-mono ${getScoreClassName(model.mmlu, 'benchmark')}`}>
                            {model.mmlu}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.mathLiveBench !== '-' ? (
                          <span className={`px-2 py-1 rounded-md text-sm font-mono ${getScoreClassName(model.mathLiveBench, 'benchmark')}`}>
                            {model.mathLiveBench}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.codeLiveBench !== '-' ? (
                          <span className={`px-2 py-1 rounded-md text-sm font-mono ${getScoreClassName(model.codeLiveBench, 'benchmark')}`}>
                            {model.codeLiveBench}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.outputSpeed !== null ? (
                          <span className="font-mono text-gray-700">
                            {model.outputSpeed}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.latency !== null ? (
                          <span className="font-mono text-gray-700">
                            {model.latency}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.inputCost !== null ? (
                          <span className="font-mono text-gray-700">
                            {model.inputCost}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.outputCost !== null ? (
                          <span className="font-mono text-gray-700">
                            {model.outputCost}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.cutoffKnowledge !== '-' ? (
                          <span className="font-mono text-gray-700">
                            {model.cutoffKnowledge}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.safeResponses !== null ? (
                          <span className={`px-2 py-1 rounded-md text-sm font-mono ${getScoreClassName(model.safeResponses, 'safety')}`}>
                            {model.safeResponses}%
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.unsafeResponses !== null ? (
                          <span className={`px-2 py-1 rounded-md text-sm font-mono ${getScoreClassName(100 - model.unsafeResponses, 'unsafe')}`}>
                            {model.unsafeResponses}%
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-center py-4 px-3 border-b border-gray-200 whitespace-nowrap border-l border-gray-100">
                        {model.jailbreakingResistance !== null ? (
                          <span className={`px-2 py-1 rounded-md text-sm font-mono ${getScoreClassName(model.jailbreakingResistance, 'safety')}`}>
                            {model.jailbreakingResistance}%
                          </span>
                        ) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredModels.length === 0 && (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No models found</h3>
                  <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
