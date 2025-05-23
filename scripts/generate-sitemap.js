import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate sitemap.xml
function generateSitemap() {
  console.log('Generating sitemap.xml...');
  
  // Load model data
  const modelData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/models.json'), 'utf8'));
  
  // Website base URL - replace with actual domain before deployment
  const baseUrl = 'https://holisticai.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/red-teaming</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/test-your-llm</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  
  // Add model pages
  modelData.forEach(model => {
    if (!model.id) return;
    
    sitemap += `  <url>
    <loc>${baseUrl}/model/${model.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });
  
  // Close XML
  sitemap += `</urlset>`;
  
  // Create the public directory if it doesn't exist
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemap file
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemap);
  
  console.log('sitemap.xml generated successfully!');
  
  // Also generate robots.txt
  generateRobotsTxt(publicDir, baseUrl);
}

// Function to generate robots.txt
function generateRobotsTxt(publicDir, baseUrl) {
  console.log('Generating robots.txt...');
  
  const robotsTxt = `# robots.txt for ${baseUrl}
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`;
  
  fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt);
  console.log('robots.txt generated successfully!');
}

// Run the function
generateSitemap(); 