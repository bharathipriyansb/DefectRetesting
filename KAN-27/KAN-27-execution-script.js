// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Reproduction: Add/Remove Elements - Delete button should appear after click

async function executeTest() {
  console.log("=== KAN-27 Test Execution ===\n");

  // Step 1: Navigate to page
  console.log("Step 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/");
  try {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    console.log("✓ PASS - Page loaded successfully\n");
  } catch (e) {
    console.log("✗ FAIL - Navigation failed:", e.message, "\n");
    return;
  }

  // Step 2: Click Add Element button
  console.log("Step 2: Click 'Add Element' button");
  try {
    await page.getByRole('button', { name: 'Add Element' }).click();
    console.log("✓ PASS - Add Element button clicked\n");
  } catch (e) {
    console.log("✗ FAIL - Click failed:", e.message, "\n");
    return;
  }

  // Step 3: Verify Delete button appears
  console.log("Step 3: Verify 'Delete' button appears on page");
  try {
    await page.getByText("Delete").first().waitFor({ state: 'visible', timeout: 5000 });
    console.log("✓ PASS - Delete button found and visible\n");
  } catch (e) {
    console.log("✗ FAIL - Delete button not found:", e.message, "\n");
    return;
  }

  console.log("=== Test Execution Complete ===");
  console.log("Result: ALL STEPS PASSED - Defect NOT reproducible");
}

// Execute the test
executeTest();
