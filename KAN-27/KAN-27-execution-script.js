// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Defect: Click Add Element - delete button should appear but doesn't

browser_install()
browser_navigate("https://the-internet.herokuapp.com/add_remove_elements/")

console.log("Step 1: Navigate to add_remove_elements page")
try {
  browser_wait_for("text=Add Element")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("Step 2: Click on Add Element button")
try {
  browser_click("text=Add Element")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("Step 3: Verify delete button appears")
try {
  browser_wait_for("text=Delete")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

browser_close()
console.log("Execution complete")