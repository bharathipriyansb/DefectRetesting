/**
 * KAN-29 - FULL EXECUTION SCRIPT
 * Test: Navigate to Add/Remove Elements page and click "Add Element"
 * Run this file independently to re-execute test
 */

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== KAN-29 Execution Started ===\n');
  
  try {
    // Step 1: Navigate to page
    console.log('Step 1: Navigate to Add/Remove Elements Page');
    const startTime1 = Date.now();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const duration1 = Date.now() - startTime1;
    console.log(`✓ PASS (${duration1}ms)\n`);
    
    // Step 2: Click "Add Element" button
    console.log('Step 2: Click "Add Element" Button');
    const startTime2 = Date.now();
    await page.click('button:has-text("Add Element")');
    const duration2 = Date.now() - startTime2;
    console.log(`✓ PASS (${duration2}ms)\n`);
    
    // Verify Delete button appeared
    const deleteBtn = await page.$('text=Delete');
    if (deleteBtn) {
      console.log('✓ Delete button verified on page\n');
    } else {
      console.log('✗ Delete button NOT found\n');
    }
    
  } catch (error) {
    console.log(`✗ FAIL: ${error.message}\n`);
  } finally {
    await browser.close();
    console.log('=== KAN-29 Execution Complete ===');
  }
})();
