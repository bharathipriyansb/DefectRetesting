/**
 * KAN-27 - FULL EXECUTION SCRIPT
 * Test: Add/Remove Elements - Delete Button Creation
 * 
 * Run this file independently to re-execute the test:
 * node KAN-27-execution-script.js
 */

const { chromium } = require('playwright');

(async () => {
  console.log('=== KAN-27 Test Execution Started ===');
  console.log('Test: Add Element should create a Delete button\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = [];
  
  try {
    // Step 1: Navigate to page
    console.log('Step 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
    const t1 = Date.now();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const d1 = Date.now() - t1;
    console.log(`✓ PASS (${d1}ms)\n`);
    results.push({ step: 1, status: 'PASS', duration: d1 });
    
    // Step 2: Click Add Element button
    console.log('Step 2: Click "Add Element" button');
    const t2 = Date.now();
    await page.click('button:has-text("Add Element")');
    const d2 = Date.now() - t2;
    console.log(`✓ PASS (${d2}ms)\n`);
    results.push({ step: 2, status: 'PASS', duration: d2 });
    
    // Step 3: Verify Delete button appears
    console.log('Step 3: Verify "Delete" button appears');
    const t3 = Date.now();
    await page.getByText("Delete").first().waitFor({ state: 'visible' });
    const d3 = Date.now() - t3;
    console.log(`✓ PASS (${d3}ms)\n`);
    results.push({ step: 3, status: 'PASS', duration: d3 });
    
    const totalTime = results.reduce((sum, r) => sum + r.duration, 0);
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    
    console.log('=== TEST SUMMARY ===');
    console.log(`Total Steps: 3 | Passed: ${passed} | Failed: ${failed} | Total Time: ${totalTime}ms`);
    console.log('Overall Status: PASS');
    
  } catch (error) {
    console.error('\n✗ FAIL - Error during test execution:');
    console.error(error.message);
    console.log('\n=== TEST RESULT: FAIL ===');
  } finally {
    await browser.close();
  }
})();
