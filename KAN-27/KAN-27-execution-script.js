// KAN-27 - FULL EXECUTION SCRIPT
// Defect: Add Element button not creating Delete button
// Run this file independently to re-execute test
// Usage: node KAN-27-execution-script.js

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== KAN-27 TEST EXECUTION START ===\n');
  
  // Step 1: Navigate to page
  console.log('Step 1: Navigate to Add/Remove Elements Page');
  try {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const pageTitle = await page.title();
    console.log(`✓ PASS - Page loaded. Title: "${pageTitle}"\n`);
  } catch(e) {
    console.log(`✗ FAIL - Navigation failed: ${e.message}\n`);
  }
  
  // Step 2: Click Add Element button
  console.log('Step 2: Click "Add Element" Button');
  try {
    await page.getByRole('button', { name: 'Add Element' }).click();
    console.log('✓ PASS - Add Element button clicked\n');
  } catch(e) {
    console.log(`✗ FAIL - Could not click Add Element: ${e.message}\n`);
  }
  
  // Step 3: Verify Delete button appears
  console.log('Step 3: Verify "Delete" Button Appears');
  try {
    await page.getByText('Delete').first().waitFor({ state: 'visible' });
    const deleteButtonExists = await page.evaluate(() => 
      Array.from(document.querySelectorAll('button')).some(btn => btn.textContent.includes('Delete'))
    );
    
    if (deleteButtonExists) {
      console.log('✓ PASS - Delete button found and visible\n');
    } else {
      console.log('✗ FAIL - Delete button not found\n');
    }
  } catch(e) {
    console.log(`✗ FAIL - Delete button verification failed: ${e.message}\n`);
  }
  
  // Close browser
  await browser.close();
  console.log('=== KAN-27 TEST EXECUTION COMPLETE ===');
})();