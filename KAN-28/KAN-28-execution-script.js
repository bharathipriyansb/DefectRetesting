#!/usr/bin/env node
/**
 * KAN-28 - FULL EXECUTION SCRIPT
 * Defect: Checkbox 2 should not be pre-checked
 * Run this file independently to re-execute test
 */

// Step 1: Navigate to checkboxes page
console.log("Step 1: Navigate to https://the-internet.herokuapp.com/checkboxes");
try {
  browser_install();
  browser_navigate("https://the-internet.herokuapp.com/checkboxes");
  console.log("✓ PASS - Navigation successful");
} catch(e) {
  console.log("✗ FAIL - Navigation failed:", e.message);
  process.exit(1);
}

// Step 2: Verify checkbox 2 is not already checked
console.log("\nStep 2: Verify checkbox 2 is NOT already checked");
try {
  // Wait for checkbox elements to load
  browser_wait_for('input[type="checkbox"]');
  
  // Evaluate checkbox states
  const checkboxStates = browser_evaluate(`
    {
      checkboxes: Array.from(document.querySelectorAll('input[type="checkbox"]')).map((cb, idx) => ({
        index: idx + 1,
        checked: cb.checked
      }))
    }
  `);
  
  console.log("Checkbox states:", JSON.stringify(checkboxStates, null, 2));
  
  const checkbox2 = checkboxStates.checkboxes[1];
  if (checkbox2.checked === false) {
    console.log("✓ PASS - Checkbox 2 is NOT checked");
  } else {
    console.log("✗ FAIL - Checkbox 2 IS checked (DEFECT CONFIRMED)");
  }
} catch(e) {
  console.log("✗ FAIL - Verification error:", e.message);
}

// Cleanup
browser_close();
console.log("\n=== Execution Complete ===");
