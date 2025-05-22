import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

// Define model type
interface Model {
  id: string;
  name: string;
  operationalRank?: number;
  safetyRank?: number | null;
  developer?: string;
  developerLogo?: string;
  size?: string;
  released?: string;
  [key: string]: string | number | null | undefined;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'production' && {
      name: 'generate-model-routes',
      closeBundle: async () => {
        console.log('Generating static model routes...');
        
        // Load model data
        const modelData = JSON.parse(fs.readFileSync('./src/data/models.json', 'utf8')) as Model[];
        
        // For each model, create a static HTML file
        modelData.forEach((model: Model) => {
          if (!model.id) return;
          
          // Create directory if it doesn't exist
          const modelDir = path.resolve('./dist/model');
          if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir, { recursive: true });
          }
          
          // Copy the index.html to model/[id]/index.html
          const sourcePath = path.resolve('./dist/index.html');
          const destDir = path.resolve(`./dist/model/${model.id}`);
          const destPath = path.resolve(`${destDir}/index.html`);
          
          // Create model-specific directory
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          // Copy the file
          fs.copyFileSync(sourcePath, destPath);
          
          console.log(`Generated static route for model: ${model.id}`);
        });
        
        console.log('Static model routes generation complete');
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure sourcemaps are generated
    sourcemap: mode === 'development',
    // Optimize build settings for static site generation
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            // Add other UI libraries here
          ]
        }
      }
    }
  }
}));
