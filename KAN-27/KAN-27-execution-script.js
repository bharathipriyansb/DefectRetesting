// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Test: Add/Remove Elements - Verify Delete button appears after clicking Add Element

(async () => {
  const { chromium } = require('playwright');
  
  console.log('='.repeat(60));
  console.log('KAN-27 Test Execution Script');
  console.log('='.repeat(60));
  
  let browser, page;
  const results = [];
  let passed = 0, failed = 0;
  
  try {
    // Launch browser
    browser = await chromium.launch();
    page = await browser.newPage();
    
    // Step 1: Navigate to Page
    console.log('\n[Step 1] Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
    const start1 = Date.now();
    try {
      await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
      const pageInfo1 = await page.evaluate(() => ({
        url: window.location.href,
        title: document.title
      }));
      results.push({
        step: 1,
        desc: 'Navigate to page',
        status: 'PASS',
        duration: Date.now() - start1,
        pageInfo: pageInfo1
      });
      passed++;
      console.log('✓ PASS - Page loaded successfully');
    } catch (e) {
      results.push({
        step: 1,
        desc: 'Navigate to page',
        status: 'FAIL',
        duration: Date.now() - start1,
        error: e.message
      });
      failed++;
      console.log('✗ FAIL:', e.message);
    }
    
    // Step 2: Click Add Element Button
    console.log('\n[Step 2] Click on "Add Element" button');
    const start2 = Date.now();
    try {
      await page.click('button:has-text("Add Element")');
      const pageInfo2 = await page.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim())
      }));
      results.push({
        step: 2,
        desc: 'Click Add Element button',
        status: 'PASS',
        duration: Date.now() - start2,
        pageInfo: pageInfo2
      });
      passed++;
      console.log('✓ PASS - Add Element button clicked');
    } catch (e) {
      results.push({
        step: 2,
        desc: 'Click Add Element button',
        status: 'FAIL',
        duration: Date.now() - start2,
        error: e.message
      });
      failed++;
      console.log('✗ FAIL:', e.message);
    }
    
    // Step 3: Verify Delete Button Appears
    console.log('\n[Step 3] Verify Delete button appears');
    const start3 = Date.now();
    try {
      const deleteButtonFound = await page.locator('button:has-text("Delete")').isVisible();
      if (!deleteButtonFound) {
        throw new Error('Delete button not found');
      }
      const pageInfo3 = await page.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim())
      }));
      results.push({
        step: 3,
        desc: 'Verify Delete button appears',
        status: 'PASS',
        duration: Date.now() - start3,
        pageInfo: pageInfo3
      });
      passed++;
      console.log('✓ PASS - Delete button is visible');
    } catch (e) {
      results.push({
        step: 3,
        desc: 'Verify Delete button appears',
        status: 'FAIL',
        duration: Date.now() - start3,
        error: e.message
      });
      failed++;
      console.log('✗ FAIL:', e.message);
    }
    
  } catch (e) {
    console.error('Critical error:', e.message);
  } finally {
    if (browser) await browser.close();
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Steps: 3`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Overall Status: ${failed === 0 ? 'PASS ✓' : 'FAIL ✗'}`);
  console.log('='.repeat(60));
  
  process.exit(failed === 0 ? 0 : 1);
})();
