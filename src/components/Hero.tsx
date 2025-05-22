
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const glare = containerRef.current.querySelector('.glare') as HTMLElement;
      if (glare) {
        glare.style.opacity = '0.15';
        glare.style.transform = `translate(${x * 100}%, ${y * 100}%) translate(-50%, -50%)`;
      }
    };
    
    const handleMouseLeave = () => {
      const glare = containerRef.current?.querySelector('.glare') as HTMLElement;
      if (glare) {
        glare.style.opacity = '0';
      }
    };
    
    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 lg:px-24 pt-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-slow-spin" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-slow-spin animation-delay-2000" />
      </div>
      
      <div className="container mx-auto max-w-6xl z-10">
        <div 
          ref={containerRef}
          className="relative glass-panel rounded-2xl p-8 md:p-12 overflow-hidden"
        >
          {/* Glare effect */}
          <div className="glare absolute w-96 h-96 rounded-full bg-white opacity-0 pointer-events-none transition-opacity duration-300" />
          
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block mb-3">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary stagger-item animate-fade-in stagger-1">
                Language Model Evaluation Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight text-balance stagger-item animate-fade-in stagger-2">
              <span className="text-primary">Holistic</span> AI Model Evaluations
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance stagger-item animate-fade-in stagger-3">
              Rigorous, comprehensive assessments of AI language models across diverse tasks, capabilities, and ethical considerations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 stagger-item animate-fade-in stagger-4">
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
                Explore Evaluations
              </button>
              <button className="px-6 py-3 rounded-lg border border-input bg-background hover:bg-secondary transition-colors duration-300 font-medium">
                Learn Methodology
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Models Evaluated", value: "24+" },
              { label: "Tasks Covered", value: "15+" },
              { label: "Evaluation Metrics", value: "45+" },
              { label: "Research Papers", value: "12+" }
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 stagger-item animate-fade-up",
                  `stagger-${index + 1}`
                )}
              >
                <span className="text-3xl font-display font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse-slow w-full text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
