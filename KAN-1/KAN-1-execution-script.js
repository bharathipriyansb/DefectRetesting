// Auto-generated execution script for KAN-1 - 3 steps
const step_plan = [
  {step:1, desc:"Navigate to add_remove_elements page", action:"goto", target:"https://the-internet.herokuapp.com/add_remove_elements/"},
  {step:2, desc:"Click Add Element button", action:"click", target:"Add Element"},
  {step:3, desc:"Verify delete button appears", action:"assert", target:"Delete"}
];

async function executeTestPlan(browser) {
  const page = await browser.newPage();
  await page.setViewportSize({width:800, height:600});
  
  const results = [];
  
  try {
    // Step 1: Navigate to page
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/', {waitUntil:'networkidle'});
    results.push({step:1, status:'PASS', desc:'Navigated to add_remove_elements page'});
    
    // Step 2: Click Add Element button
    await page.click('text=Add Element');
    await page.waitForTimeout(500);
    results.push({step:2, status:'PASS', desc:'Clicked Add Element button'});
    
    // Step 3: Verify Delete button appears
    const deleteBtn = await page.locator('text=Delete');
    if(await deleteBtn.isVisible()) {
      results.push({step:3, status:'PASS', desc:'Delete button is visible'});
    } else {
      results.push({step:3, status:'FAIL', desc:'Delete button is NOT visible'});
    }
  } catch(e) {
    results.push({step: results.length+1, status:'FAIL', desc:'Error: '+e.message});
  }
  
  await page.close();
  return results;
}

module.exports = {step_plan, executeTestPlan};