// KAN-27 - FULL EXECUTION SCRIPT
// Executes: Navigate → Click "Add Element" → Verify "Delete" appears

(async () => {
  const { chromium } = require('playwright');
  
  console.log('Step 1: Navigate to Page');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    console.log('✓ PASS - Navigated to URL');
  } catch(e) {
    console.log('✗ FAIL:', e.message);
  }
  
  console.log('\nStep 2: Click "Add Element" Button');
  try {
    await page.click('button:has-text("Add Element")');
    console.log('✓ PASS - Button clicked');
  } catch(e) {
    console.log('✗ FAIL:', e.message);
  }
  
  console.log('\nStep 3: Verify "Delete" Button Appears');
  try {
    await page.getByText("Delete").first().waitFor({ state: 'visible', timeout: 5000 });
    console.log('✓ PASS - Delete button appeared');
  } catch(e) {
    console.log('✗ FAIL:', e.message);
  }
  
  await browser.close();
  console.log('\n--- Execution Complete ---');
})();
