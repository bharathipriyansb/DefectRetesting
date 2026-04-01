// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Defect: Expected delete button does not appear after Add Element click

browser_install()
browser_navigate("https://the-internet.herokuapp.com/add_remove_elements/")

console.log("Step 1: Navigate to Application")
try {
  browser_wait_for("text=Add/Remove Elements")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("\nStep 2: Click 'Add Element' Button")
try {
  browser_click("text=ADD ELEMENT")
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("\nStep 3: Verify 'Delete' Button Appears")
try {
  browser_wait_for("text=DELETE", { timeout: 2000 })
  console.log("✓ PASS")
} catch(e) {
  console.log("✗ FAIL:", e.message)
  console.log("Expected DELETE button not found - defect confirmed")
}

browser_close()
console.log("\nExecution complete")
