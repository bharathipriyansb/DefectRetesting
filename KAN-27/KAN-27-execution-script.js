/**
 * KAN-27 - FULL EXECUTION SCRIPT
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
