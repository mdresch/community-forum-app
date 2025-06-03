// Compile only the models directory to JavaScript for backend use
// This script will be run as part of backend setup
const { execSync } = require('child_process');
const path = require('path');

const modelsDir = path.resolve(__dirname, '../models');
const outDir = path.resolve(__dirname, './dist-models');

try {
  execSync(`npx tsc --outDir ${outDir} --module commonjs --target ES6 --esModuleInterop --allowJs false --declaration false --skipLibCheck true --strict false --noEmit false --rootDir ${modelsDir} ${modelsDir}/*.ts`, { stdio: 'inherit' });
  console.log('Models compiled to JavaScript in dist-models/');
} catch (err) {
  console.error('Failed to compile models:', err);
  process.exit(1);
}
