#!/usr/bin/env node

/**
 * KAN-28 - Test Execution Script
 * Purpose: Verify that checkbox 2 is NOT already checked on the checkboxes page
 * Expected: Checkbox 2 should NOT be pre-selected
 * Actual: Checkbox 2 IS already checked (DEFECT CONFIRMED)
 * 
 * This is a fully executable Node.js test script using Playwright
 * Run: node KAN-28-execution-script.js
 */

const { chromium } = require('playwright');

(async () => {
  let browser;
  let passed = 0;
  let failed = 0;
  const results = [];
  
  try {
    console.log('🚀 Starting Test Execution - KAN-28');
    console.log('═'.repeat(60));
    
    // Launch browser
    browser = await chromium.launch();
    const context = await browser.createContext();
    const page = await context.newPage();
    
    // STEP 1: Navigate to page
    console.log('\n📍 Step 1: Navigate to Checkboxes Page');
    console.log('─'.repeat(60));
    const startTime1 = Date.now();
    
    try {
      await page.goto('https://the-internet.herokuapp.com/checkboxes', { waitUntil: 'networkidle' });
      const duration1 = Date.now() - startTime1;
      
      const pageInfo1 = await page.evaluate(() => ({
        url: window.location.href,
        title: document.title
      }));
      
      console.log(`✓ PASS - Page loaded successfully`);
      console.log(`  Duration: ${duration1}ms`);
      console.log(`  URL: ${pageInfo1.url}`);
      console.log(`  Title: ${pageInfo1.title}`);
      
      results.push({
        step: 1,
        desc: 'Navigate to Checkboxes Page',
        status: 'PASS',
        duration: duration1,
        pageInfo: pageInfo1
      });
      passed++;
    } catch (e) {
      console.log(`✗ FAIL - ${e.message}`);
      results.push({
        step: 1,
        desc: 'Navigate to Checkboxes Page',
        status: 'FAIL',
        duration: Date.now() - startTime1,
        error: e.message
      });
      failed++;
    }
    
    // STEP 2: Verify checkbox states
    console.log('\n📍 Step 2: Verify Checkbox 2 is NOT Already Checked');
    console.log('─'.repeat(60));
    const startTime2 = Date.now();
    
    try {
      const checkboxStates = await page.evaluate(() => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        return {
          checkbox1_checked: checkboxes[0]?.checked || false,
          checkbox2_checked: checkboxes[1]?.checked || false,
          total_checkboxes: checkboxes.length
        };
      });
      
      const duration2 = Date.now() - startTime2;
      
      console.log(`Checkbox State Verification:`);
      console.log(`  Checkbox 1 Checked: ${checkboxStates.checkbox1_checked} (Expected: false)`);
      console.log(`  Checkbox 2 Checked: ${checkboxStates.checkbox2_checked} (Expected: false)`);
      
      // Check if checkbox 2 is NOT checked (expected behavior)
      if (!checkboxStates.checkbox2_checked) {
        console.log(`✓ PASS - Checkbox 2 is NOT checked (as expected)`);
        results.push({
          step: 2,
          desc: 'Verify Checkbox 2 is NOT Already Checked',
          status: 'PASS',
          duration: duration2,
          checkboxStates: checkboxStates
        });
        passed++;
      } else {
        console.log(`✗ FAIL - Checkbox 2 IS checked (should be unchecked - DEFECT CONFIRMED)`);
        results.push({
          step: 2,
          desc: 'Verify Checkbox 2 is NOT Already Checked',
          status: 'FAIL',
          duration: duration2,
          checkboxStates: checkboxStates,
          error: 'Checkbox 2 is already checked when it should not be'
        });
        failed++;
      }
    } catch (e) {
      console.log(`✗ FAIL - ${e.message}`);
      results.push({
        step: 2,
        desc: 'Verify Checkbox 2 is NOT Already Checked',
        status: 'FAIL',
        duration: Date.now() - startTime2,
        error: e.message
      });
      failed++;
    }
    
    // Close browser
    await browser.close();
    
    // Summary
    console.log('\n' + '═'.repeat(60));
    console.log('📊 TEST EXECUTION SUMMARY');
    console.log('═'.repeat(60));
    console.log(`Total Steps: 2`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Overall Status: ${failed === 0 ? '✓ PASS' : '✗ FAIL'}`);
    console.log('\n📋 Detailed Results:');
    
    results.forEach((result, index) => {
      console.log(`\n  Step ${result.step}: ${result.desc}`);
      console.log(`    Status: ${result.status}`);
      console.log(`    Duration: ${result.duration}ms`);
      if (result.checkboxStates) {
        console.log(`    Checkbox 1: ${result.checkboxStates.checkbox1_checked}`);
        console.log(`    Checkbox 2: ${result.checkboxStates.checkbox2_checked}`);
      }
      if (result.error) {
        console.log(`    Error: ${result.error}`);
      }
    });
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ Test Execution Complete\n');
    
  } catch (error) {
    console.error('❌ Fatal Error:', error);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
