// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Defect: Delete button does not appear after clicking Add Element

browser_install()
browser_navigate("https://the-internet.herokuapp.com/add_remove_elements/")

console.log("Step 1: Navigate to Add/Remove Elements page")
try {
  browser_wait_for("text=Add Element")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("Step 2: Click Add Element button")
try {
  browser_click("text=Add Element")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("Step 3: Verify Delete button appears")
try {
  browser_wait_for("text=Delete")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

browser_close()
console.log("Execution complete")
