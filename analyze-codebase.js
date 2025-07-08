#!/usr/bin/env node

/**
 * Quick Cerebras Studio Analyzer (ES Module)
 * Simplified version for immediate insights
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

class QuickAnalyzer {
  constructor() {
    this.results = [];
  }

  async analyze() {
    console.log('🔍 Quick Cerebras Studio Analysis...\n');
    
    try {
      await this.checkBasics();
      await this.checkDependencies();
      await this.checkTypeScript();
      await this.checkBuild();
      this.generateReport();
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
    }
  }

  async checkBasics() {
    console.log('📁 Checking project structure...');
    
    const criticalFiles = [
      'package.json',
      'client/src/App.tsx',
      'client/src/main.tsx',
      'tsconfig.json'
    ];

    criticalFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        this.results.push({
          type: 'ERROR',
          message: `Missing critical file: ${file}`,
          priority: 'HIGH'
        });
      } else {
        console.log(`  ✅ Found ${file}`);
      }
    });
  }

  async checkDependencies() {
    console.log('\n📦 Checking dependencies...');
    
    try {
      console.log('  🔍 Running security audit...');
      const auditOutput = execSync('npm audit --audit-level=moderate', { 
        encoding: 'utf8',
        timeout: 30000 
      });
      console.log('  ✅ No critical vulnerabilities found');
    } catch (error) {
      if (error.stdout && error.stdout.includes('vulnerabilities')) {
        this.results.push({
          type: 'SECURITY',
          message: 'Security vulnerabilities found in dependencies',
          priority: 'HIGH',
          details: 'Run: npm audit for details'
        });
      }
    }

    try {
      console.log('  🔍 Checking for outdated packages...');
      const outdatedOutput = execSync('npm outdated', { 
        encoding: 'utf8',
        timeout: 30000 
      });
      if (outdatedOutput.trim()) {
        this.results.push({
          type: 'WARNING',
          message: 'Outdated dependencies found',
          priority: 'MEDIUM',
          details: 'Run: npm outdated for details'
        });
      }
    } catch (error) {
      // npm outdated exits with code 1 when outdated packages are found
      if (error.stdout && error.stdout.trim()) {
        this.results.push({
          type: 'WARNING',
          message: 'Outdated dependencies found',
          priority: 'MEDIUM',
          details: 'Run: npm outdated for details'
        });
      }
    }
  }

  async checkTypeScript() {
    console.log('\n📝 Checking TypeScript...');
    
    try {
      console.log('  🔍 Running TypeScript compiler check...');
      execSync('npx tsc --noEmit', { 
        encoding: 'utf8',
        timeout: 60000 
      });
      console.log('  ✅ No TypeScript errors found');
    } catch (error) {
      this.results.push({
        type: 'ERROR',
        message: 'TypeScript compilation errors found',
        priority: 'HIGH',
        details: 'Run: npx tsc --noEmit for details'
      });
    }
  }

  async checkBuild() {
    console.log('\n⚙️ Checking build process...');
    
    try {
      console.log('  🔍 Testing build process...');
      execSync('npm run build', { 
        encoding: 'utf8',
        timeout: 120000,
        stdio: 'pipe'
      });
      console.log('  ✅ Build completed successfully');
    } catch (error) {
      this.results.push({
        type: 'ERROR',
        message: 'Build process failed',
        priority: 'CRITICAL',
        details: 'Run: npm run build for details'
      });
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 QUICK ANALYSIS REPORT');
    console.log('='.repeat(60));

    const errors = this.results.filter(r => r.type === 'ERROR');
    const warnings = this.results.filter(r => r.type === 'WARNING');
    const security = this.results.filter(r => r.type === 'SECURITY');

    console.log(`\n📊 SUMMARY:`);
    console.log(`   ❌ Errors: ${errors.length}`);
    console.log(`   ⚠️  Warnings: ${warnings.length}`);
    console.log(`   🔒 Security Issues: ${security.length}`);

    if (this.results.length === 0) {
      console.log('\n🎉 EXCELLENT! No major issues found!');
      console.log('   Your Cerebras Studio codebase looks healthy.');
    } else {
      console.log('\n🔧 ISSUES FOUND:');
      this.results.forEach((result, index) => {
        const icon = result.type === 'ERROR' ? '❌' : 
                    result.type === 'SECURITY' ? '🔒' : '⚠️';
        console.log(`   ${index + 1}. ${icon} [${result.priority}] ${result.message}`);
        if (result.details) {
          console.log(`      💡 ${result.details}`);
        }
      });
    }

    console.log('\n📝 NEXT STEPS:');
    if (errors.length > 0) {
      console.log('   1. Fix critical errors first (❌)');
    }
    if (security.length > 0) {
      console.log('   2. Address security issues (🔒)');
    }
    if (warnings.length > 0) {
      console.log('   3. Review warnings and optimizations (⚠️)');
    }
    console.log('   4. Run detailed analysis for more insights');
    
    console.log('\n🚀 Ready for next phase of optimization!');
    console.log('='.repeat(60));
  }
}

// Run the analyzer
const analyzer = new QuickAnalyzer();
analyzer.analyze().catch(console.error);