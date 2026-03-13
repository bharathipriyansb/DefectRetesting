// KAN-28 - FULL EXECUTION SCRIPT
// Defect: Checkbox 2 is already checked when it should not be
// Run this file independently to re-execute test

async function executeTest() {
  // Step 1: Install browser and navigate
  console.log("Step 1: Navigate to Checkboxes Page");
  const startTime = Date.now();
  
  try {
    // Using Playwright approach
    const browser = require('playwright').chromium;
    const instance = await browser.launch();
    const page = await instance.newPage();
    
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    console.log("✓ Page loaded successfully");
    
    // Step 2: Verify checkbox 2 state
    console.log("Step 2: Verify Checkbox 2 State");
    const result = await page.evaluate(() => {
      const checkbox2 = document.querySelectorAll('input[type="checkbox"]')[1];
      return {
        checkbox2_checked: checkbox2.checked,
        page_url: window.location.href,
        page_title: document.title
      };
    });
    
    const duration = Date.now() - startTime;
    
    console.log(`✓ Checkbox 2 is ${result.checkbox2_checked ? 'CHECKED' : 'NOT CHECKED'}`);
    console.log(`✓ Expected: NOT checked`);
    console.log(`✓ Actual: ${result.checkbox2_checked ? 'CHECKED' : 'NOT CHECKED'}`);
    console.log(`✓ Defect Status: ${result.checkbox2_checked ? 'CONFIRMED' : 'RESOLVED'}`);
    console.log(`✓ Page URL: ${result.page_url}`);
    console.log(`✓ Page Title: ${result.page_title}`);
    console.log(`✓ Execution Time: ${duration}ms`);
    
    await instance.close();
    console.log("\n✓ Execution complete");
    
  } catch(e) {
    console.error("✗ FAIL:", e.message);
    process.exit(1);
  }
}

// Execute test if run directly
if (require.main === module) {
  executeTest().catch(console.error);
}

module.exports = executeTest;
