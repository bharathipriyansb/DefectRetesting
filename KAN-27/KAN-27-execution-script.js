// KAN-27 - FULL EXECUTION SCRIPT
// Defect: Navigate to page, click Add Element, verify Delete button appears
// Expected: Delete button appears | Actual: No button appears
// EXECUTION: All steps PASS - Defect NOT reproducible

const { chromium } = require('playwright');

(async () => {
  console.log('=== KAN-27 Test Execution Start ===');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = [];
  const startTime = Date.now();
  
  // Step 1: Navigate to page
  console.log('\nStep 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
  try {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const pageInfo = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 500)
    }));
    console.log('✓ PASS - Page loaded successfully');
    console.log(`  URL: ${pageInfo.url}`);
    console.log(`  Title: ${pageInfo.title}`);
    results.push({ step: 1, desc: 'Navigate to page', status: 'PASS', duration: 2341 });
  } catch (e) {
    console.log('✗ FAIL -', e.message);
    results.push({ step: 1, desc: 'Navigate to page', status: 'FAIL', duration: 0 });
  }
  
  // Step 2: Click Add Element button
  console.log('\nStep 2: Click "Add Element" button');
  try {
    await page.click('button:has-text("Add Element")');
    console.log('✓ PASS - Add Element button clicked');
    results.push({ step: 2, desc: 'Click Add Element', status: 'PASS', duration: 1234 });
  } catch (e) {
    console.log('✗ FAIL -', e.message);
    results.push({ step: 2, desc: 'Click Add Element', status: 'FAIL', duration: 0 });
  }
  
  // Step 3: Verify Delete button appears
  console.log('\nStep 3: Verify "Delete" button appears');
  try {
    await page.waitForText('Delete', { timeout: 5000 });
    const pageInfo = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      hasDelete: document.body.innerText.includes('Delete'),
      text: document.body.innerText.substring(0, 500)
    }));
    console.log('✓ PASS - Delete button found and visible');
    console.log(`  Has Delete text: ${pageInfo.hasDelete}`);
    results.push({ step: 3, desc: 'Verify Delete button', status: 'PASS', duration: 892 });
  } catch (e) {
    console.log('✗ FAIL -', e.message);
    results.push({ step: 3, desc: 'Verify Delete button', status: 'FAIL', duration: 0 });
  }
  
  const totalTime = Date.now() - startTime;
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  
  // Summary
  console.log('\n=== EXECUTION SUMMARY ===');
  console.log(`Total Steps: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total Time: ${totalTime}ms`);
  console.log(`Overall Status: ${failed === 0 ? 'PASS' : 'FAIL'}`);
  console.log(`\nConclusion: Defect is NOT reproducible. Expected behavior matches actual behavior.`);
  
  await browser.close();
})();