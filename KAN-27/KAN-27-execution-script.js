// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Defect: Add Element button does not create Delete button

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('KAN-27 - Test Execution Started');
  console.log('==============================\n');

  // Step 1: Navigate to page
  console.log('Step 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
  try {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    console.log('✓ PASS - Page loaded successfully\n');
  } catch(e) {
    console.log('✗ FAIL - Navigation error:', e.message, '\n');
  }

  // Step 2: Click Add Element button
  console.log('Step 2: Click "Add Element" button');
  try {
    await page.click('button:has-text("Add Element")');
    console.log('✓ PASS - Button clicked successfully\n');
  } catch(e) {
    console.log('✗ FAIL - Click error:', e.message, '\n');
  }

  // Step 3: Verify Delete button appears
  console.log('Step 3: Verify "Delete" button appears');
  try {
    await page.waitForSelector('text=Delete', { timeout: 5000 });
    const deleteButtonExists = !!await page.$('button:has-text("Delete")');
    if (deleteButtonExists) {
      console.log('✓ PASS - Delete button found on page\n');
    } else {
      console.log('✗ FAIL - Delete button not found\n');
    }
  } catch(e) {
    console.log('✗ FAIL - Verification error:', e.message, '\n');
  }

  console.log('==============================');
  console.log('Test Execution Complete');
  
  await browser.close();
})();
