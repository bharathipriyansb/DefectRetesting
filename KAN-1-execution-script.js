/**
 * KAN-1 Defect Reproduction Test Script
 * URL: https://the-internet.herokuapp.com/add_remove_elements/
 * 
 * Scenario: Click "Add Element" button and verify "Delete" button appears
 * Expected: Delete button should dynamically appear
 * Result: ✅ PASS - Delete button successfully appeared
 */

const { chromium } = require('playwright');

async function testKAN1() {
  console.log('🧪 Starting KAN-1 Test Execution...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  const testResults = {
    defectId: 'KAN-1',
    steps: [],
    totalSteps: 2,
    passedSteps: 0,
    failedSteps: 0,
    verdict: 'NOT_REPRODUCED'
  };
  
  try {
    // Step 1: Navigate to the page
    console.log('Step 1: Navigate to add_remove_elements page');
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/', {
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(1000);
    
    testResults.steps.push({
      step: 1,
      description: 'Navigate to https://the-internet.herokuapp.com/add_remove_elements/',
      expected: 'Page loads with Add Element button visible',
      status: 'PASS',
      timestamp: new Date().toISOString()
    });
    testResults.passedSteps++;
    console.log('✅ Step 1 PASSED\n');
    
    // Verify Add Element button exists
    const addElementBtn = await page.locator('button:has-text("Add Element")');
    if (await addElementBtn.count() === 0) {
      throw new Error('Add Element button not found');
    }
    
    // Step 2: Click on "Add Element" button
    console.log('Step 2: Click on "Add Element" button and verify "Delete" button appears');
    await addElementBtn.click();
    await page.waitForTimeout(1000);
    
    // Verify Delete button appeared
    const deleteBtn = await page.locator('button:has-text("Delete")');
    const deleteButtonCount = await deleteBtn.count();
    
    if (deleteButtonCount > 0) {
      testResults.steps.push({
        step: 2,
        description: 'Click Add Element button and verify Delete button appears',
        expected: 'Delete button should appear in the page',
        actual: `✅ Delete button successfully appeared (${deleteButtonCount} button(s) found)`,
        status: 'PASS',
        timestamp: new Date().toISOString()
      });
      testResults.passedSteps++;
      testResults.verdict = 'NOT_REPRODUCED';
      console.log('✅ Step 2 PASSED - Delete button appeared\n');
    } else {
      throw new Error('Delete button did not appear after clicking Add Element');
    }
    
  } catch (error) {
    testResults.steps.push({
      step: testResults.steps.length + 1,
      description: 'Test execution',
      error: error.message,
      status: 'FAIL',
      timestamp: new Date().toISOString()
    });
    testResults.failedSteps++;
    testResults.verdict = 'BUG_REPRODUCED';
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
  
  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY - KAN-1');
  console.log('='.repeat(60));
  console.log(`Total Steps: ${testResults.totalSteps}`);
  console.log(`Passed: ${testResults.passedSteps}`);
  console.log(`Failed: ${testResults.failedSteps}`);
  console.log(`Verdict: ${testResults.verdict}`);
  
  if (testResults.verdict === 'NOT_REPRODUCED') {
    console.log('\n✅ BUG NOT REPRODUCED');
    console.log('The "Delete" button successfully appears after clicking "Add Element".');
    console.log('The application is functioning as expected.');
    console.log('Recommendation: CLOSE as "Not Reproducible"');
  } else {
    console.log('\n❌ BUG REPRODUCED');
    console.log('Failed to see the "Delete" button after clicking "Add Element".');
    console.log('The defect is confirmed.');
  }
  console.log('='.repeat(60) + '\n');
  
  return testResults;
}

// Execute the test
testKAN1().catch(console.error);