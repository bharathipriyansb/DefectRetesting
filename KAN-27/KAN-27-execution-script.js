/**
 * KAN-27 - FULL EXECUTION SCRIPT
 * Test: Add/Remove Elements - Delete Button Creation
 * 
 * Run this file independently to re-execute the test:
 * node KAN-27-execution-script.js
 */

const { chromium } = require('playwright');

(async () => {
  console.log('=== KAN-27 Test Execution Started ===\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Step 1: Navigate to page
    console.log('Step 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/', { waitUntil: 'networkidle' });
    
    let initialState = await page.evaluate(() => ({
      deleteButtonsCount: Array.from(document.querySelectorAll('button')).filter(b => b.textContent.toLowerCase().includes('delete')).length
    }));
    
    console.log(`✓ PASS - Page loaded successfully`);
    console.log(`  Initial delete buttons: ${initialState.deleteButtonsCount}\n`);
    
    // Step 2: Click Add Element button
    console.log('Step 2: Click "Add Element" button');
    await page.click('button:has-text("Add Element")');
    console.log('✓ PASS - Button clicked successfully\n');
    
    // Step 3: Verify Delete button appears
    console.log('Step 3: Verify "Delete" button appears');
    await page.waitForSelector('button:has-text("Delete")', { timeout: 5000 });
    
    let finalState = await page.evaluate(() => ({
      deleteButtonsCount: Array.from(document.querySelectorAll('button')).filter(b => b.textContent.toLowerCase().includes('delete')).length,
      pageText: document.body.innerText.substring(0, 300)
    }));
    
    if (finalState.deleteButtonsCount > 0) {
      console.log('✓ PASS - Delete button verified\n');
      console.log('=== TEST RESULT: PASS ===');
      console.log(`Final delete buttons count: ${finalState.deleteButtonsCount}`);
    } else {
      console.log('✗ FAIL - Delete button not found\n');
      console.log('=== TEST RESULT: FAIL ===');
    }
    
  } catch (error) {
    console.error('✗ FAIL - Error during test execution:');
    console.error(error.message);
    console.log('\n=== TEST RESULT: FAIL ===');
  } finally {
    await browser.close();
    console.log('\nBrowser closed - Execution complete');
  }
})();
