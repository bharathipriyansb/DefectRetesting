/**
 * KAN-27 - Full Execution Script
 * Test: Add/Remove Elements Functionality
 * 
 * Steps:
 * 1. Navigate to https://the-internet.herokuapp.com/add_remove_elements/
 * 2. Click on "Add Element" button
 * 3. Verify "Delete" button appears
 * 
 * Run this script independently to re-execute the test
 */

const runTest = async () => {
  console.log('='.repeat(60));
  console.log('KAN-27 - Add/Remove Elements Test');
  console.log('='.repeat(60));
  
  let passCount = 0;
  let failCount = 0;
  
  try {
    // Step 1: Navigate to page
    console.log('\n[STEP 1] Navigating to https://the-internet.herokuapp.com/add_remove_elements/');
    const startTime1 = Date.now();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/', { waitUntil: 'networkidle' });
    const duration1 = Date.now() - startTime1;
    
    const initialState = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent)
    }));
    
    console.log(`✓ PASS (${duration1}ms)`);
    console.log(`  URL: ${initialState.url}`);
    console.log(`  Title: ${initialState.title}`);
    console.log(`  Initial Buttons: ${initialState.buttons.join(', ')}`);
    passCount++;
    
  } catch (error) {
    console.log(`✗ FAIL - ${error.message}`);
    failCount++;
  }
  
  try {
    // Step 2: Click Add Element button
    console.log('\n[STEP 2] Clicking "Add Element" button');
    const startTime2 = Date.now();
    await page.click('button:has-text("Add Element")');
    const duration2 = Date.now() - startTime2;
    
    // Wait for Delete button to appear
    await page.waitForSelector('button:has-text("Delete")', { timeout: 2000 });
    
    console.log(`✓ PASS (${duration2}ms)`);
    console.log(`  Add Element button clicked successfully`);
    passCount++;
    
  } catch (error) {
    console.log(`✗ FAIL - ${error.message}`);
    failCount++;
  }
  
  try {
    // Step 3: Verify Delete button appears
    console.log('\n[STEP 3] Verifying "Delete" button appears');
    const startTime3 = Date.now();
    
    const finalState = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent),
      deleteButtonExists: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Delete'))
    }));
    
    const duration3 = Date.now() - startTime3;
    
    if (finalState.deleteButtonExists) {
      console.log(`✓ PASS (${duration3}ms)`);
      console.log(`  Delete button is present on page`);
      console.log(`  Final Buttons: ${finalState.buttons.join(', ')}`);
      passCount++;
    } else {
      console.log(`✗ FAIL (${duration3}ms)`);
      console.log(`  Delete button NOT found on page`);
      console.log(`  Final Buttons: ${finalState.buttons.join(', ')}`);
      failCount++;
    }
    
  } catch (error) {
    console.log(`✗ FAIL - ${error.message}`);
    failCount++;
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Steps: 3`);
  console.log(`✓ Passed: ${passCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`Status: ${failCount === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  console.log('='.repeat(60));
  
};

// Uncomment to run:
// runTest().catch(console.error);
