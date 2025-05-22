
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink 
} from "@/components/ui/navigation-menu";

interface NavbarDesktopProps {
  activeSection: string;
  handleNavigation: (sectionId: string) => void;
  navigateToModel: (modelPath: string) => void;
}

const NavbarDesktop = ({ 
  activeSection,
  handleNavigation,
  navigateToModel
}: NavbarDesktopProps) => {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <li>
          <button
            onClick={() => handleNavigation('home')}
            className={cn(
              "relative text-sm font-medium transition-colors duration-300 py-2",
              activeSection === 'home' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Home
            {activeSection === 'home' && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>
        </li>
        <li className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300 bg-transparent p-0 h-auto",
                    activeSection === 'models' 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => handleNavigation('models')}
                >
                  Models
                  {activeSection === 'models' && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full" />
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] p-2">
                    <NavigationMenuLink 
                      className="block w-full p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => navigateToModel('/models')}
                    >
                      All Models
                    </NavigationMenuLink>
                    <NavigationMenuLink 
                      className="block w-full p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => navigateToModel('/model/gpt-45')}
                    >
                      GPT-4.5
                    </NavigationMenuLink>
                    <NavigationMenuLink 
                      className="block w-full p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => navigateToModel('/model/claude-37')}
                    >
                      Claude 3.7 Sonnet
                    </NavigationMenuLink>
                    <NavigationMenuLink 
                      className="block w-full p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => navigateToModel('/model/deepseek-r1')}
                    >
                      DeepSeek R1
                    </NavigationMenuLink>
                    <NavigationMenuLink 
                      className="block w-full p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => navigateToModel('/model/grok-3')}
                    >
                      Grok 3 (Think)
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('methodology')}
            className={cn(
              "relative text-sm font-medium transition-colors duration-300 py-2",
              activeSection === 'methodology' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Methodology
            {activeSection === 'methodology' && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('about')}
            className={cn(
              "relative text-sm font-medium transition-colors duration-300 py-2",
              activeSection === 'about' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            About
            {activeSection === 'about' && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
