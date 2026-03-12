#!/usr/bin/env node
/**
 * KAN-27 - FULL EXECUTION SCRIPT
 * Defect: Add Element button does not create delete button
 * 
 * Run this file independently to re-execute the test:
 * node KAN-27-execution-script.js
 */

const { chromium } = require('playwright');

const TEST_URL = 'https://the-internet.herokuapp.com/add_remove_elements/';
const RESULTS = [];

async function runTest() {
  console.log('='.repeat(60));
  console.log('KAN-27 Test Execution Started');
  console.log('='.repeat(60));
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const startTime = Date.now();

  try {
    // Step 1: Navigate to page
    console.log('\n[STEP 1] Navigate to Add/Remove Elements Page');
    console.log('URL: ' + TEST_URL);
    
    const step1Start = Date.now();
    await page.goto(TEST_URL, { waitUntil: 'networkidle' });
    const step1Duration = Date.now() - step1Start;
    
    const pageInfo1 = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      textPreview: document.body.innerText.substring(0, 500)
    }));
    
    console.log('✓ PASS (Duration: ' + step1Duration + 'ms)');
    console.log('  URL: ' + pageInfo1.url);
    console.log('  Title: ' + pageInfo1.title);
    
    RESULTS.push({
      step: 1,
      desc: 'Navigate to Add/Remove Elements Page',
      status: 'PASS',
      duration: step1Duration,
      pageInfo: pageInfo1
    });

    // Step 2: Click Add Element button
    console.log('\n[STEP 2] Click on Add Element Button');
    
    const step2Start = Date.now();
    try {
      await page.click('button#add_button');
      console.log('✓ Button clicked successfully');
      
      // Wait a moment for DOM updates
      await page.waitForTimeout(500);
      
      const step2Duration = Date.now() - step2Start;
      
      const pageInfo2 = await page.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        textPreview: document.body.innerText.substring(0, 500),
        deleteButtonCount: document.querySelectorAll('button').length - 1 // Subtract "Add Element" button
      }));
      
      console.log('✓ PASS (Duration: ' + step2Duration + 'ms)');
      console.log('  Delete buttons created: ' + pageInfo2.deleteButtonCount);
      
      RESULTS.push({
        step: 2,
        desc: 'Click on Add Element Button',
        status: 'PASS',
        duration: step2Duration,
        pageInfo: pageInfo2
      });
    } catch (e) {
      console.log('✗ FAIL: ' + e.message);
      RESULTS.push({
        step: 2,
        desc: 'Click on Add Element Button',
        status: 'FAIL',
        duration: Date.now() - step2Start,
        error: e.message
      });
    }

    // Step 3: Verify delete button exists
    console.log('\n[STEP 3] Verify Delete Button Appears');
    
    const step3Start = Date.now();
    try {
      // Look for delete button
      const deleteButtonExists = await page.$('button:has-text("Delete")') !== null;
      
      if (deleteButtonExists) {
        console.log('✓ PASS - Delete button found');
        RESULTS.push({
          step: 3,
          desc: 'Verify Delete Button Appears',
          status: 'PASS',
          duration: Date.now() - step3Start
        });
      } else {
        throw new Error('Delete button not found on page');
      }
    } catch (e) {
      console.log('✗ FAIL: ' + e.message);
      RESULTS.push({
        step: 3,
        desc: 'Verify Delete Button Appears',
        status: 'FAIL',
        duration: Date.now() - step3Start,
        error: e.message
      });
    }

  } finally {
    await browser.close();
  }

  // Print summary
  const totalTime = Date.now() - startTime;
  const passed = RESULTS.filter(r => r.status === 'PASS').length;
  const failed = RESULTS.filter(r => r.status === 'FAIL').length;
  
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  console.log('Total Steps: 3');
  console.log('Passed: ' + passed);
  console.log('Failed: ' + failed);
  console.log('Total Time: ' + totalTime + 'ms');
  console.log('Status: ' + (failed === 0 ? 'PASS' : 'FAIL'));
  console.log('='.repeat(60));
  
  process.exit(failed > 0 ? 1 : 0);
}

runTest().catch(console.error);
