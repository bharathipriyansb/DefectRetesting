// KAN-1 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Test: Add/Remove Elements - Click Add Element button and verify Delete button appears

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log("Step 1: Navigate to the Add/Remove Elements page");
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    console.log("✓ PASS - Page loaded successfully");
    console.log(`  URL: ${page.url()}`);
    console.log(`  Title: ${await page.title()}`);

    console.log("\nStep 2: Click on 'Add Element' button");
    await page.click('button:has-text("Add Element")');
    console.log("✓ PASS - Add Element button clicked");

    console.log("\nStep 3: Verify 'Delete' button appears");
    const deleteButton = await page.$('button:has-text("Delete")');
    if (deleteButton) {
      console.log("✓ PASS - Delete button found in the page");
      const buttons = await page.$$eval('button', btns => btns.map(b => b.textContent.trim()));
      console.log(`  Buttons on page: ${JSON.stringify(buttons)}`);
    } else {
      console.log("✗ FAIL - Delete button not found");
      throw new Error("Delete button did not appear after clicking Add Element");
    }

    console.log("\n✓ Test Execution Complete - ALL STEPS PASSED");

  } catch (error) {
    console.log(`\n✗ Test Failed with error: ${error.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();