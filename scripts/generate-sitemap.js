const fs = require('fs');
const path = require('path');

// Function to generate sitemap.xml
function generateSitemap() {
  console.log('Generating sitemap.xml...');
  
  // Load model data
  const modelData = JSON.parse(fs.readFileSync('./src/data/models.json', 'utf8'));
  
  // Website base URL
  const baseUrl = 'https://example.com'; // Replace with your actual domain
  
  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
  
  // Add model pages
  modelData.forEach(model => {
    if (!model.id) return;
    
    sitemap += `  <url>
    <loc>${baseUrl}/model/${model.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });
  
  // Close XML
  sitemap += `</urlset>`;
  
  // Create the public directory if it doesn't exist
  const publicDir = path.resolve('./public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemap file
  fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemap);
  
  console.log('sitemap.xml generated successfully!');
}

// Run the function
generateSitemap(); 