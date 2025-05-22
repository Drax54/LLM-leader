
import React from 'react';
import { cn } from "@/lib/utils";

interface NavbarMobileProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  handleNavigation: (sectionId: string) => void;
  navigateToModel: (modelPath: string) => void;
}

const NavbarMobile = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  handleNavigation,
  navigateToModel
}: NavbarMobileProps) => {
  return (
    <>
      <button 
        className="block md:hidden"
        aria-label="Menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={cn(
            "w-full h-0.5 bg-foreground rounded-full transition-transform duration-300",
            mobileMenuOpen && "translate-y-2 rotate-45"
          )} />
          <span className={cn(
            "w-full h-0.5 bg-foreground rounded-full transition-opacity duration-300",
            mobileMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "w-full h-0.5 bg-foreground rounded-full transition-transform duration-300", 
            mobileMenuOpen && "-translate-y-2 -rotate-45"
          )} />
        </div>
      </button>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="block md:hidden mt-4 pb-2 glass-panel rounded-xl">
          <nav>
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <button
                  onClick={() => handleNavigation('home')}
                  className={cn(
                    "text-base font-medium transition-colors duration-300 w-full text-left py-2",
                    activeSection === 'home' 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('models')}
                  className={cn(
                    "text-base font-medium transition-colors duration-300 w-full text-left py-2",
                    activeSection === 'models' 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Models
                </button>
              </li>
              <li className="pl-4">
                <button
                  onClick={() => navigateToModel('/model/gpt-45')}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 w-full text-left py-2"
                >
                  GPT-4.5
                </button>
              </li>
              <li className="pl-4">
                <button
                  onClick={() => navigateToModel('/model/claude-37')}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 w-full text-left py-2"
                >
                  Claude 3.7 Sonnet
                </button>
              </li>
              <li className="pl-4">
                <button
                  onClick={() => navigateToModel('/model/deepseek-r1')}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 w-full text-left py-2"
                >
                  DeepSeek R1
                </button>
              </li>
              <li className="pl-4">
                <button
                  onClick={() => navigateToModel('/model/grok-3')}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 w-full text-left py-2"
                >
                  Grok 3 (Think)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('methodology')}
                  className={cn(
                    "text-base font-medium transition-colors duration-300 w-full text-left py-2",
                    activeSection === 'methodology' 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('about')}
                  className={cn(
                    "text-base font-medium transition-colors duration-300 w-full text-left py-2",
                    activeSection === 'about' 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  About
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
