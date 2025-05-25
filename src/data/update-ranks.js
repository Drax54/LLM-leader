import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const modelFile = path.resolve(__dirname, './models.json');

// Read models.json
const models = JSON.parse(fs.readFileSync(modelFile, 'utf8'));

console.log(`Found ${models.length} models in the database`);

// Function to parse numeric values from strings
function parseNumericValue(value) {
  if (value === null || value === undefined || value === '-' || value === '') {
    return null;
  }
  
  // Handle percentage strings
  if (typeof value === 'string' && value.includes('%')) {
    return parseFloat(value.replace('%', ''));
  }
  
  // Handle numeric values
  return parseFloat(value);
}

// Calculate operational score for each model
function calculateOperationalScore(model) {
  // Extract benchmark values
  const codeLMArena = parseNumericValue(model.codeLMArena);
  
  // Parse percentages from MathLiveBench and CodeLiveBench
  let mathLiveBench = parseNumericValue(model.mathLiveBench);
  let codeLiveBench = parseNumericValue(model.codeLiveBench);
  
  // Weighted scoring - null values don't contribute to score
  let score = 0;
  let divisor = 0;
  
  if (codeLMArena !== null) {
    score += codeLMArena * 0.4;
    divisor += 0.4;
  }
  
  if (mathLiveBench !== null) {
    score += mathLiveBench * 0.3;
    divisor += 0.3;
  }
  
  if (codeLiveBench !== null) {
    score += codeLiveBench * 0.3;
    divisor += 0.3;
  }
  
  // If no benchmark data, return null
  if (divisor === 0) {
    return null;
  }
  
  // Normalize score
  return score / divisor;
}

// Calculate safety score for each model
function calculateSafetyScore(model) {
  // Extract safety values - ensure they're treated as numbers
  const safeResponses = parseNumericValue(model.safeResponses);
  const unsafeResponses = parseNumericValue(model.unsafeResponses);
  const jailbreakingResistance = parseNumericValue(model.jailbreakingResistance);
  
  // If no safety data, return null
  if (safeResponses === null && unsafeResponses === null && jailbreakingResistance === null) {
    return null;
  }
  
  // Weighted scoring - null values don't contribute to score
  let score = 0;
  let divisor = 0;
  
  if (safeResponses !== null) {
    score += safeResponses * 0.4;
    divisor += 0.4;
  }
  
  if (unsafeResponses !== null) {
    // Lower unsafeResponses is better
    score += (100 - unsafeResponses) * 0.3;
    divisor += 0.3;
  }
  
  if (jailbreakingResistance !== null) {
    score += jailbreakingResistance * 0.3;
    divisor += 0.3;
  }
  
  // If no safety data, return null
  if (divisor === 0) {
    return null;
  }
  
  // Normalize score
  return score / divisor;
}

// Calculate scores for all models
const modelScores = [];
models.forEach(model => {
  const operationalScore = calculateOperationalScore(model);
  const safetyScore = calculateSafetyScore(model);
  
  modelScores.push({
    id: model.id,
    name: model.name,
    operationalScore,
    safetyScore
  });
});

// Log models with benchmark data
console.log('\nModels with operational benchmark data:');
modelScores.filter(m => m.operationalScore !== null).forEach(model => {
  console.log(`${model.name}: Score=${model.operationalScore.toFixed(2)}`);
});

// Log models with safety data
console.log('\nModels with safety data:');
modelScores.filter(m => m.safetyScore !== null).forEach(model => {
  console.log(`${model.name}: Score=${model.safetyScore.toFixed(2)}`);
});

// Sort models by operational score (descending) and assign ranks
const operationalModels = modelScores
  .filter(model => model.operationalScore !== null)
  .sort((a, b) => b.operationalScore - a.operationalScore);

// Sort models by safety score (descending) and assign ranks
const safetyModels = modelScores
  .filter(model => model.safetyScore !== null)
  .sort((a, b) => b.safetyScore - a.safetyScore);

// Assign ranks
let operationalRank = 1;
let safetyRank = 1;

// Apply operational ranks
operationalModels.forEach(model => {
  const modelIndex = models.findIndex(m => m.id === model.id);
  if (modelIndex >= 0) {
    models[modelIndex].operationalRank = operationalRank++;
  }
});

// Apply safety ranks
safetyModels.forEach(model => {
  const modelIndex = models.findIndex(m => m.id === model.id);
  if (modelIndex >= 0) {
    models[modelIndex].safetyRank = safetyRank++;
  }
});

// Set null for models with no scores
models.forEach(model => {
  const operationalModel = operationalModels.find(m => m.id === model.id);
  const safetyModel = safetyModels.find(m => m.id === model.id);
  
  if (!operationalModel) {
    model.operationalRank = null;
  }
  
  if (!safetyModel) {
    model.safetyRank = null;
  }
});

// Write updated models back to file
fs.writeFileSync(modelFile, JSON.stringify(models, null, 2));

// Output results
console.log(`\nUpdated operational ranks for ${operationalModels.length} models`);
console.log(`Updated safety ranks for ${safetyModels.length} models`);

console.log('\nTop 10 models by operational performance:');
operationalModels.slice(0, 10).forEach((model, index) => {
  console.log(`${index + 1}. ${model.name} (Score: ${model.operationalScore.toFixed(2)})`);
});

console.log('\nTop 10 models by safety performance:');
safetyModels.slice(0, 10).forEach((model, index) => {
  console.log(`${index + 1}. ${model.name} (Score: ${model.safetyScore.toFixed(2)})`);
}); 