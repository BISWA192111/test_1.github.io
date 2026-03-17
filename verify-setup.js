#!/usr/bin/env node

/**
 * BARS-AI Setup Verification Script
 * Verifies that all necessary files and dependencies are in place
 */

const fs = require('fs');
const path = require('path');

const checkmarks = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
};

const requiredFiles = {
  Backend: [
    'backend/package.json',
    'backend/src/server.js',
    'backend/src/services/openRouterService.js',
    'backend/src/services/chatService.js',
    'backend/src/controllers/chatController.js',
    'backend/src/routes/chatRoutes.js',
    'backend/.env.example',
  ],
  Frontend: [
    'frontend/package.json',
    'frontend/src/App.jsx',
    'frontend/src/pages/Dashboard.jsx',
    'frontend/src/pages/Chat.jsx',
    'frontend/src/pages/Analytics.jsx',
    'frontend/src/components/Navbar.jsx',
    'frontend/src/utils/api.js',
    'frontend/src/store/chatStore.js',
    'frontend/public/index.html',
    'frontend/.env.example',
    'frontend/tailwind.config.js',
  ],
  Root: [
    'docker-compose.yml',
    'README.md',
    'DEPLOYMENT.md',
    'QUICKSTART.md',
    'ARCHITECTURE.md',
    '.gitignore',
  ]
};

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║          BARS-AI Setup Verification                       ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

let totalFiles = 0;
let foundFiles = 0;

Object.entries(requiredFiles).forEach(([category, files]) => {
  console.log(`\n${category}:`);
  console.log('─'.repeat(50));

  files.forEach(file => {
    totalFiles++;
    const filePath = path.join(process.cwd(), file);
    const exists = fs.existsSync(filePath);
    foundFiles += exists ? 1 : 0;

    const symbol = exists ? checkmarks.success : checkmarks.error;
    const status = exists ? 'Found' : 'Missing';
    console.log(`${symbol} ${file} (${status})`);
  });
});

console.log('\n' + '═'.repeat(50));
console.log(`\nSummary: ${foundFiles}/${totalFiles} files found`);

if (foundFiles === totalFiles) {
  console.log(`\n${checkmarks.success} All files in place!`);
  console.log(`\n${checkmarks.info} Next steps:`);
  console.log('  1. Run: bash setup.sh (or setup.bat on Windows)');
  console.log('  2. Add OpenRouter API key to backend/.env');
  console.log('  3. Start development servers');
  console.log('  4. Open http://localhost:3000\n');
} else {
  console.log(`\n${checkmarks.error} Some files are missing!`);
  console.log(`${checkmarks.warning} Please ensure you have the complete project structure.\n`);
  process.exit(1);
}
