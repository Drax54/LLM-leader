import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const modelFile = path.resolve(__dirname, './models.json');
const csvFile = path.resolve(__dirname, '../../data/Data-models.csv');

// Read files
const models = JSON.parse(fs.readFileSync(modelFile, 'utf8'));
const csvContent = fs.readFileSync(csvFile, 'utf8');
const csvLines = csvContent.split('\n');

// Create mapping of model names to cutoff dates
const cutoffMap = {};
csvLines.slice(1).forEach(line => {
  const columns = line.split(',');
  if (columns.length > 11) {
    const modelName = columns[0].trim();
    const cutoff = columns[11].trim();
    if (modelName && modelName !== '') {
      cutoffMap[modelName] = cutoff || 'N/A';
    }
  }
});

console.log('Loaded cutoff data for', Object.keys(cutoffMap).length, 'models from CSV');

// Update models.json
let updatedCount = 0;
models.forEach(model => {
  if (model.cutoffKnowledge === '45536') {
    // Try exact match first
    if (cutoffMap[model.name]) {
      model.cutoffKnowledge = cutoffMap[model.name];
      updatedCount++;
    } else {
      // Try fuzzy matching
      const fuzzyMatch = Object.keys(cutoffMap).find(csvModelName => 
        model.name.includes(csvModelName) || 
        csvModelName.includes(model.name) || 
        model.name.toLowerCase() === csvModelName.toLowerCase()
      );
      
      if (fuzzyMatch) {
        model.cutoffKnowledge = cutoffMap[fuzzyMatch];
        updatedCount++;
        console.log(`Fuzzy matched: ${model.name} -> ${fuzzyMatch} = ${cutoffMap[fuzzyMatch]}`);
      } else {
        model.cutoffKnowledge = 'N/A';
        updatedCount++;
        console.log(`No match found for: ${model.name}, setting to N/A`);
      }
    }
  }
});

// Write updated models back to file
fs.writeFileSync(modelFile, JSON.stringify(models, null, 2));
console.log(`Updated ${updatedCount} model cutoff dates.`); 