#!/usr/bin/env node

/**
 * Environment Security Checker
 * 
 * This script checks for common environment variable security issues
 * and ensures that sensitive files are properly protected.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvironmentSecurity() {
  log('\n🔒 Environment Security Check', 'bold');
  log('================================', 'blue');

  let hasIssues = false;

  // Check 1: Verify .gitignore includes environment files
  log('\n1. Checking .gitignore configuration...', 'blue');
  
  try {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    const requiredPatterns = [
      '.env',
      '.env.local',
      '.env.development',
      '.env.production',
      '.env.*.local'
    ];

    const missingPatterns = requiredPatterns.filter(pattern => 
      !gitignore.includes(pattern)
    );

    if (missingPatterns.length === 0) {
      log('✅ .gitignore properly configured', 'green');
    } else {
      log('❌ Missing patterns in .gitignore:', 'red');
      missingPatterns.forEach(pattern => {
        log(`   - ${pattern}`, 'red');
      });
      hasIssues = true;
    }
  } catch (error) {
    log('❌ Could not read .gitignore file', 'red');
    hasIssues = true;
  }

  // Check 2: Look for environment files in repository
  log('\n2. Checking for environment files in repository...', 'blue');
  
  const envFiles = [
    '.env',
    '.env.local',
    '.env.development',
    '.env.production',
    '.env.staging',
    '.env.test'
  ];

  const foundEnvFiles = envFiles.filter(file => {
    try {
      fs.accessSync(file);
      return true;
    } catch {
      return false;
    }
  });

  if (foundEnvFiles.length === 0) {
    log('✅ No environment files found in repository', 'green');
  } else {
    log('⚠️  Environment files found:', 'yellow');
    foundEnvFiles.forEach(file => {
      log(`   - ${file}`, 'yellow');
    });
    log('   Make sure these are in .gitignore!', 'yellow');
  }

  // Check 3: Check for hardcoded secrets in source code
  log('\n3. Checking for potential hardcoded secrets...', 'blue');
  
  const suspiciousPatterns = [
    /AIzaSy[A-Za-z0-9_-]{35}/g,  // Google API keys
    /sk-[A-Za-z0-9]{48}/g,       // OpenAI API keys
    /eyJ[A-Za-z0-9_-]{100,}/g,   // JWT tokens
    /[A-Za-z0-9]{32,}/g          // Generic long strings
  ];

  const sourceFiles = [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.js',
    'src/**/*.jsx'
  ];

  // This is a simplified check - in a real implementation,
  // you'd want to use a proper file globbing library
  log('   (Skipping source code scan - use tools like git-secrets)', 'yellow');

  // Check 4: Verify environment template exists
  log('\n4. Checking for environment template...', 'blue');
  
  const templateFiles = ['env.template', '.env.example'];
  const templateExists = templateFiles.some(file => {
    try {
      fs.accessSync(file);
      return true;
    } catch {
      return false;
    }
  });

  if (templateExists) {
    log('✅ Environment template found', 'green');
  } else {
    log('❌ No environment template found', 'red');
    log('   Create env.template or .env.example for team members', 'red');
    hasIssues = true;
  }

  // Check 5: Check package.json for security scripts
  log('\n5. Checking package.json for security scripts...', 'blue');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const scripts = packageJson.scripts || {};
    
    const securityScripts = [
      'security-check',
      'audit',
      'lint:security'
    ];

    const hasSecurityScripts = securityScripts.some(script => 
      scripts[script]
    );

    if (hasSecurityScripts) {
      log('✅ Security scripts found in package.json', 'green');
    } else {
      log('⚠️  Consider adding security scripts to package.json', 'yellow');
    }
  } catch (error) {
    log('❌ Could not read package.json', 'red');
    hasIssues = true;
  }

  // Summary
  log('\n📊 Security Check Summary', 'bold');
  log('========================', 'blue');
  
  if (hasIssues) {
    log('❌ Security issues found! Please address them before deployment.', 'red');
    log('\n🔧 Recommended actions:', 'yellow');
    log('1. Update .gitignore to include all environment file patterns', 'yellow');
    log('2. Create environment template file', 'yellow');
    log('3. Set up proper environment variable management', 'yellow');
    log('4. Use tools like git-secrets for ongoing monitoring', 'yellow');
  } else {
    log('✅ Environment security looks good!', 'green');
  }

  log('\n📚 Additional Resources:', 'blue');
  log('- Environment Security Guide: docs/environment-security.md', 'blue');
  log('- Security Documentation: docs/security.md', 'blue');
  log('- Security Checklist: docs/security-checklist.md', 'blue');

  return !hasIssues;
}

// Run the security check
checkEnvironmentSecurity();

export { checkEnvironmentSecurity };
