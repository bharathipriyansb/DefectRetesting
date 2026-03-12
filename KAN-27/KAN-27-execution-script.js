// KAN-27 - FULL EXECUTION SCRIPT
// Defect: Add Element button not creating Delete button
// Run this file independently to re-execute test
// Branch: Retesting-defects
// Created: 2024

// Step 1: Navigate to page
console.log("Step 1: Navigate to Add/Remove Elements Page")
try {
  browser_install()
  browser_navigate("https://the-internet.herokuapp.com/add_remove_elements/")
  console.log("✓ PASS - Page loaded successfully")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

// Step 2: Click Add Element button
console.log("\nStep 2: Click on Add Element Button")
try {
  browser_click("text=Add Element")
  console.log("✓ PASS - Add Element button clicked")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

// Step 3: Wait for Delete button to appear
console.log("\nStep 3: Verify Delete Button Appears")
try {
  browser_wait_for("text=Delete")
  console.log("✓ PASS - Delete button appeared")
} catch(e) {
  console.log("✗ FAIL:", e.message)
  console.log("   Expected: Delete button should appear after clicking Add Element")
  console.log("   Actual: Delete button not found in DOM")
}

// Get page info
console.log("\nPage State:")
const page_info = browser_evaluate(`
{
  url: window.location.href,
  title: document.title,
  add_element_exists: !!document.querySelector('button[onclick*="add"]'),
  delete_buttons_count: document.querySelectorAll('button:contains("Delete")').length,
  all_buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent)
}
`)
console.log(JSON.stringify(page_info, null, 2))

browser_close()
console.log("\nExecution complete - Defect KAN-27 validated")
