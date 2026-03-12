/**
 * KAN-27 - FULL EXECUTION SCRIPT
 * Defect: Click on Add Element button doesn't create delete button
 * 
 * Run this file independently to re-execute test:
 * npx playwright run KAN-27-execution-script.js
 */

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting KAN-27 Defect Reproduction Test');
  console.log('═'.repeat(60));
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // STEP 1: Navigate to the page
    console.log('\n📍 Step 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/', { waitUntil: 'networkidle' });
    console.log('✓ PASS - Page loaded successfully');
    console.log(`   URL: ${page.url()}`);
    console.log(`   Title: ${await page.title()}`);
    
    // STEP 2: Click Add Element button
    console.log('\n📍 Step 2: Click Add Element button');
    await page.click('button:has-text("Add Element")');
    console.log('✓ PASS - Add Element button clicked');
    await page.waitForTimeout(500);
    
    // STEP 3: Verify delete button appears
    console.log('\n📍 Step 3: Verify delete button appears');
    try {
      await page.waitForSelector('button:has-text("X")', { timeout: 2000 });
      console.log('✓ PASS - Delete button (X) found on page');
      const deleteButtons = await page.locator('button:has-text("X")').count();
      console.log(`   Count: ${deleteButtons} delete button(s) found`);
    } catch (e) {
      console.log('✗ FAIL - Delete button NOT found on page');
      console.log(`   Error: ${e.message}`);
      console.log('   DEFECT CONFIRMED: Delete button does not appear after clicking Add Element');
    }
    
    // Get page content for debugging
    const pageContent = await page.content();
    const elementsDiv = await page.locator('#elements').isVisible().catch(() => false);
    console.log(`\n📋 Elements container visible: ${elementsDiv}`);
    
  } catch (error) {
    console.error('\n❌ ERROR during test execution:');
    console.error(error.message);
  } finally {
    console.log('\n═'.repeat(60));
    console.log('🏁 Test Execution Complete');
    await browser.close();
  }
})();
