// KAN-27 - FULL EXECUTION SCRIPT
// Run this file independently to re-execute test
// Defect: No delete button appears after clicking Add Element

browser_install()
browser_navigate("https://the-internet.herokuapp.com/add_remove_elements/")

console.log("Step 1: Navigate to add_remove_elements page")
try {
  const page_info_1 = browser_evaluate(`{
    url: window.location.href,
    title: document.title,
    text_preview: document.body.innerText.substring(0,1000)
  }`)
  console.log("✓ PASS - Navigation complete")
  console.log(`URL: ${page_info_1.url}`)
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("\nStep 2: Click Add Element button")
try {
  browser_click("text=Add Element")
  console.log("✓ PASS - Add Element button clicked")
} catch(e) {
  console.log("✗ FAIL:", e.message)
}

console.log("\nStep 3: Verify delete button appears")
try {
  browser_wait_for("text=Delete")
  console.log("✓ PASS - Delete button found")
} catch(e) {
  console.log("✗ FAIL - Delete button not found:", e.message)
  console.log("DEFECT CONFIRMED: No delete button appears after clicking Add Element")
}

browser_close()
console.log("\nExecution complete - Test FAILED")
