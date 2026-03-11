/**
 * KAN-1 Test Execution Script
 * Defect: Add/Remove Elements Feature Not Working
 * 
 * Steps:
 * 1. Navigate to https://the-internet.herokuapp.com/add_remove_elements/
 * 2. Click on "Add Element" button
 * 
 * Expected: Delete button should appear after clicking Add Element
 * Actual: Testing the feature
 */

(async () => {
  const playwright = require('playwright');
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  const results = [];
  
  try {
    // Step 1: Navigate to the page
    console.log('Step 1: Navigating to https://the-internet.herokuapp.com/add_remove_elements/');
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.waitForLoadState('load');
    
    const shot1 = await page.screenshot({ type: 'jpeg', quality: 40, fullPage: true });
    results.push({
      step: 1,
      status: 'PASS',
      description: 'Navigate to Add/Remove Elements page',
      b64: shot1.toString('base64')
    });
    console.log('✓ Step 1 Passed: Page loaded successfully');
    
    // Step 2: Click on Add Element button
    console.log('Step 2: Clicking on "Add Element" button');
    const addButton = await page.locator('button:has-text("Add Element")');
    await addButton.click();
    await page.waitForTimeout(1000);
    
    // Check if Delete button exists
    const deleteButton = await page.locator('button:has-text("Delete")').count();
    
    if (deleteButton > 0) {
      console.log('✓ Step 2 Passed: Delete button appeared after clicking Add Element');
      const shot2 = await page.screenshot({ type: 'jpeg', quality: 40, fullPage: true });
      results.push({
        step: 2,
        status: 'PASS',
        description: 'Click Add Element button - Delete button appears',
        b64: shot2.toString('base64')
      });
    } else {
      console.log('✗ Step 2 Failed: Delete button did not appear');
      const shot2 = await page.screenshot({ type: 'jpeg', quality: 40, fullPage: true });
      results.push({
        step: 2,
        status: 'FAIL',
        description: 'Click Add Element button - Delete button NOT appearing',
        b64: shot2.toString('base64')
      });
    }
    
  } catch (error) {
    console.error('Error during test execution:', error);
    const failShot = await page.screenshot({ type: 'jpeg', quality: 40, fullPage: true });
    results.push({
      step: 2,
      status: 'ERROR',
      description: 'Error during execution: ' + error.message,
      b64: failShot.toString('base64')
    });
  }
  
  await browser.close();
  return results;
})();
