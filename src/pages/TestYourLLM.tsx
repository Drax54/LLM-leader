import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, ArrowRight, Shield, Brain, Bot, Server } from 'lucide-react';

const TestYourLLM: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    model: '',
    useCase: '',
    message: '',
    submitted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to your backend
    console.log('Form submitted:', formState);
    setFormState(prev => ({ ...prev, submitted: true }));
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        model: '',
        useCase: '',
        message: '',
        submitted: false
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Test Your Enterprise LLM with Holistic AI
                </h1>
                <p className="text-xl text-gray-600">
                  Comprehensive assessment and benchmarking of your AI language models for safety, performance, and compliance.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Test Your Enterprise LLM?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Ensure compliance with regulatory frameworks like EU AI Act, NIST AI RMF, and more</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Validate performance against industry benchmarks for reasoning, mathematics, and coding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Assess safety and ethical parameters including jailbreaking resistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Identify potential weaknesses and areas for improvement</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-900">Safety First</h4>
                  </div>
                  <p className="text-sm text-gray-700">Comprehensive safety evaluation and red teaming assessment</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-medium text-gray-900">Performance</h4>
                  </div>
                  <p className="text-sm text-gray-700">Benchmark against industry standards for reasoning and capability</p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                  <div className="flex items-center mb-2">
                    <Bot className="h-5 w-5 text-indigo-600 mr-2" />
                    <h4 className="font-medium text-gray-900">Customized Tests</h4>
                  </div>
                  <p className="text-sm text-gray-700">Tailored to your specific industry use cases and requirements</p>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <div className="flex items-center mb-2">
                    <Server className="h-5 w-5 text-amber-600 mr-2" />
                    <h4 className="font-medium text-gray-900">Enterprise Ready</h4>
                  </div>
                  <p className="text-sm text-gray-700">Focused on real-world business deployment scenarios</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div>
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-gray-900">Request an Enterprise LLM Assessment</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will contact you to discuss your LLM testing needs.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {!formState.submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleInputChange}
                            required
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleInputChange}
                            required
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Company Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john.doe@company.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model">Model to Test</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange('model', value)}
                          value={formState.model}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom/Proprietary Model</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                            <SelectItem value="gpt">GPT Models</SelectItem>
                            <SelectItem value="llama">Llama Models</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="useCase">Primary Use Case</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange('useCase', value)}
                          value={formState.useCase}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary use case" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="content">Content Creation</SelectItem>
                            <SelectItem value="customer">Customer Service</SelectItem>
                            <SelectItem value="coding">Code Generation</SelectItem>
                            <SelectItem value="research">Research Assistant</SelectItem>
                            <SelectItem value="chatbot">Chatbot</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea 
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your specific needs and requirements..."
                          rows={4}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  ) : (
                    <div className="py-10 text-center">
                      <div className="bg-green-100 text-green-800 p-6 rounded-lg mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
                        <p>Thank you for your interest. Our team will contact you shortly.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-0 text-center text-sm text-gray-500">
                  Your information is secure and will only be used to contact you about your LLM testing needs.
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestYourLLM; 