/**
 * KAN-27 Test Execution Script
 * 
 * Automated test for Add/Remove Elements feature
 * Reproduction: Navigate → Click Add Element → Verify Delete button appears
 * 
 * Run with: playwright run KAN-27-execution-script.js
 */

// Browser configuration and execution
(async () => {
  const { chromium } = require('playwright');
  
  console.log('🚀 Starting KAN-27 Test Execution');
  console.log('================================\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // STEP 1: Navigate to page
    console.log('Step 1: Navigate to Add/Remove Elements Page');
    const start1 = Date.now();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const time1 = Date.now() - start1;
    console.log(`✓ PASS (${time1}ms)\n`);
    
    // STEP 2: Click "Add Element" button
    console.log('Step 2: Click "Add Element" Button');
    const start2 = Date.now();
    await page.click('button:has-text("Add Element")');
    const time2 = Date.now() - start2;
    console.log(`✓ PASS (${time2}ms)\n`);
    
    // STEP 3: Verify Delete button appeared
    console.log('Step 3: Verify "Delete" Button Appeared');
    const start3 = Date.now();
    await page.waitForSelector('button:has-text("Delete")');
    const time3 = Date.now() - start3;
    console.log(`✓ PASS (${time3}ms)\n`);
    
    // Get final page state
    const pageState = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      buttonCount: document.querySelectorAll('button').length,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent)
    }));
    
    console.log('📊 Final Page State:');
    console.log(`   URL: ${pageState.url}`);
    console.log(`   Title: ${pageState.title}`);
    console.log(`   Button Count: ${pageState.buttonCount}`);
    console.log(`   Buttons: ${pageState.buttons.join(', ')}\n`);
    
    const totalTime = time1 + time2 + time3;
    console.log('================================');
    console.log('✅ TEST PASSED');
    console.log(`Total Steps: 3 | Passed: 3 | Failed: 0 | Time: ${totalTime}ms`);
    console.log('================================');
    
  } catch (error) {
    console.error('❌ TEST FAILED');
    console.error(`Error: ${error.message}\n`);
  } finally {
    await browser.close();
  }
})(); - FULL EXECUTION SCRIPT
 * Test: Add/Remove Elements - Add Element Button Creates Delete Button
 * 
 * Run this script independently to re-execute the complete test scenario
 * 
 * Expected Flow:
 * 1. Navigate to the Add/Remove Elements page
 * 2. Click the "Add Element" button
 * 3. Verify that a "Delete" button appears
 */

console.log("=== KAN-27 Test Execution Started ===\n");

// Step 1: Navigate to page
console.log("Step 1: Navigate to Add/Remove Elements Page");
console.log("URL: https://the-internet.herokuapp.com/add_remove_elements/");
try {
  browser_navigate("https://the-internet.herokuapp.com/add_remove_elements/");
  console.log("✓ PASS - Page loaded successfully\n");
} catch (e) {
  console.log("✗ FAIL - Navigation error:", e.message);
  process.exit(1);
}

// Step 2: Click Add Element button
console.log("Step 2: Click 'Add Element' Button");
console.log("Target: Button with text 'Add Element'");
try {
  browser_click("button:has-text('Add Element')");
  console.log("✓ PASS - Button clicked successfully\n");
} catch (e) {
  console.log("✗ FAIL - Click error:", e.message);
}

// Step 3: Verify Delete button appeared
console.log("Step 3: Verify 'Delete' Button Appeared");
console.log("Expected: Delete button visible on page");
try {
  browser_wait_for({text: "Delete"});
  console.log("✓ PASS - Delete button confirmed visible\n");
} catch (e) {
  console.log("✗ FAIL - Verification error:", e.message);
}

// Close browser
browser_close();
console.log("=== KAN-27 Test Execution Complete ===");
