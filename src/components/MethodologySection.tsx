
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const methodologyData = [
  {
    id: "bench",
    title: "Benchmarking Framework",
    description: "Our evaluation framework assesses language models across a diverse set of tasks designed to measure various aspects of model capabilities, from reasoning and knowledge retrieval to creative writing and instruction following."
  },
  {
    id: "score",
    title: "Scoring System",
    description: "We employ a multidimensional scoring system that examines both quantitative metrics and qualitative assessments to provide a comprehensive view of model performance."
  },
  {
    id: "fair",
    title: "Fairness & Bias Evaluation",
    description: "Models are assessed for bias across gender, race, religion, and other dimensions, with specific tests designed to detect and quantify various forms of unfairness or stereotyping."
  },
  {
    id: "human",
    title: "Human Evaluation Process",
    description: "Human evaluators rate model outputs using standardized rubrics, with multiple evaluators assessing each output to ensure reliability and consistency in subjective judgments."
  }
];

const MethodologySection = () => {
  const [activeTab, setActiveTab] = useState(methodologyData[0].id);
  
  return (
    <section id="methodology" className="py-24 px-6 md:px-12 lg:px-24 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Evaluation Methodology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A rigorous approach to assessing language model capabilities, focused on fairness, reproducibility, and comprehensive coverage.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="glass-panel rounded-xl p-4 md:sticky md:top-24">
              <nav className="space-y-1">
                {methodologyData.map((item) => (
                  <button
                    key={item.id}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 text-sm",
                      activeTab === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-secondary text-muted-foreground"
                    )}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="glass-panel rounded-xl p-8">
              {methodologyData.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "transition-opacity duration-500",
                    activeTab === item.id ? "block opacity-100" : "hidden opacity-0"
                  )}
                >
                  <h3 className="text-2xl font-display font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  
                  {item.id === "bench" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                      {["Reasoning", "Knowledge", "Coding", "Math", "Writing", "Instruction"].map((category) => (
                        <div key={category} className="bg-background rounded-lg p-4 text-center">
                          <span className="text-sm font-medium">{category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {item.id === "score" && (
                    <div className="space-y-4 mt-8">
                      {[
                        { name: "Correctness", score: 85 },
                        { name: "Coherence", score: 92 },
                        { name: "Reasoning", score: 78 },
                        { name: "Groundedness", score: 88 }
                      ].map((metric) => (
                        <div key={metric.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{metric.name}</span>
                            <span className="font-medium">{metric.score}%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${metric.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {item.id === "fair" && (
                    <div className="mt-8 bg-secondary/50 rounded-lg p-6">
                      <h4 className="font-medium mb-3">Key Metrics for Fairness Evaluation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Demographic Parity across different groups</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Stereotyping assessment in generated content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Representation balance in diverse scenarios</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Equal performance across different demographic groups</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {item.id === "human" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-secondary/50 rounded-lg p-5">
                        <h4 className="font-medium mb-2">Evaluator Training</h4>
                        <p className="text-sm text-muted-foreground">
                          Evaluators undergo comprehensive training with calibration exercises to ensure consistent judgments across all assessments.
                        </p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-5">
                        <h4 className="font-medium mb-2">Annotation Protocol</h4>
                        <p className="text-sm text-muted-foreground">
                          Standardized annotation guidelines establish clear criteria for assessing model outputs across different dimensions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
