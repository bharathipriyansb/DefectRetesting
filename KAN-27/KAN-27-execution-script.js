/**
 * KAN-27 Test Execution Script
 * Test: Add/Remove Elements Functionality
 * 
 * Steps:
 * 1. Navigate to https://the-internet.herokuapp.com/add_remove_elements/
 * 2. Click "Add Element" button once
 * 3. Verify if delete button appears
 * 
 * Expected: Delete button should appear
 * Actual: No delete button appears (DEFECT)
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  defect_id: 'KAN-27',
  url: 'https://the-internet.herokuapp.com/add_remove_elements/',
  timeout: 10000,
  screenshot_dir: './screenshots',
};

// Test steps definition
const step_plan = [
  {
    step_num: 1,
    description: 'Navigate to Add/Remove Elements page',
    action: 'navigate',
    target: TEST_CONFIG.url,
    expected_result: 'Page loads successfully'
  },
  {
    step_num: 2,
    description: 'Click "Add Element" button',
    action: 'click',
    selector: 'button:has-text("Add Element")',
    expected_result: 'Delete button appears on the page'
  },
  {
    step_num: 3,
    description: 'Verify delete button exists',
    action: 'wait',
    selector: 'button.added-manually',
    expected_result: 'Delete button is visible and clickable'
  }
];

// Main execution function
(async () => {
  const browser = await chromium.launch();
  const context = await browser.createContext();
  const page = await context.newPage();
  
  const results = [];
  const start_time = Date.now();
  
  console.log(`\n[TEST START] KAN-27 - Add/Remove Elements Test`);
  console.log(`URL: ${TEST_CONFIG.url}\n`);
  
  try {
    // Ensure screenshot directory exists
    if (!fs.existsSync(TEST_CONFIG.screenshot_dir)) {
      fs.mkdirSync(TEST_CONFIG.screenshot_dir, { recursive: true });
    }
    
    // Step 1: Navigate to page
    console.log(`[STEP 1] ${step_plan[0].description}`);
    const step1_start = Date.now();
    try {
      await page.goto(TEST_CONFIG.url, { waitUntil: 'networkidle' });
      const screenshot1 = path.join(TEST_CONFIG.screenshot_dir, 'KAN-27-step-1.png');
      await page.screenshot({ path: screenshot1 });
      const step1_duration = Date.now() - step1_start;
      results.push({
        step: 1,
        description: step_plan[0].description,
        status: 'PASS',
        duration: step1_duration,
        screenshot: 'KAN-27-step-1.png',
        page_info: `Page title: ${await page.title()}`
      });
      console.log(`✓ PASS (${step1_duration}ms)\n`);
    } catch (error) {
      const step1_duration = Date.now() - step1_start;
      results.push({
        step: 1,
        description: step_plan[0].description,
        status: 'FAIL',
        duration: step1_duration,
        screenshot: null,
        error: error.message
      });
      console.log(`✗ FAIL: ${error.message}\n`);
      throw error;
    }
    
    // Step 2: Click "Add Element" button
    console.log(`[STEP 2] ${step_plan[1].description}`);
    const step2_start = Date.now();
    try {
      const addButton = page.locator('button:has-text("Add Element")');
      await addButton.click();
      await page.waitForTimeout(500); // Wait for DOM update
      const screenshot2 = path.join(TEST_CONFIG.screenshot_dir, 'KAN-27-step-2.png');
      await page.screenshot({ path: screenshot2 });
      const step2_duration = Date.now() - step2_start;
      results.push({
        step: 2,
        description: step_plan[1].description,
        status: 'PASS',
        duration: step2_duration,
        screenshot: 'KAN-27-step-2.png',
        page_info: 'Add Element button clicked'
      });
      console.log(`✓ PASS (${step2_duration}ms)\n`);
    } catch (error) {
      const step2_duration = Date.now() - step2_start;
      results.push({
        step: 2,
        description: step_plan[1].description,
        status: 'FAIL',
        duration: step2_duration,
        screenshot: null,
        error: error.message
      });
      console.log(`✗ FAIL: ${error.message}\n`);
      throw error;
    }
    
    // Step 3: Verify delete button exists
    console.log(`[STEP 3] ${step_plan[2].description}`);
    const step3_start = Date.now();
    try {
      // Check if delete button exists
      const deleteButton = page.locator('button.added-manually, button:has-text("Delete")').first();
      const exists = await deleteButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      const screenshot3 = path.join(TEST_CONFIG.screenshot_dir, 'KAN-27-step-3.png');
      await page.screenshot({ path: screenshot3 });
      const step3_duration = Date.now() - step3_start;
      
      if (exists) {
        results.push({
          step: 3,
          description: step_plan[2].description,
          status: 'PASS',
          duration: step3_duration,
          screenshot: 'KAN-27-step-3.png',
          page_info: 'Delete button is visible'
        });
        console.log(`✓ PASS (${step3_duration}ms) - Delete button found\n`);
      } else {
        results.push({
          step: 3,
          description: step_plan[2].description,
          status: 'FAIL',
          duration: step3_duration,
          screenshot: 'KAN-27-step-3.png',
          page_info: 'Delete button NOT found - DEFECT CONFIRMED'
        });
        console.log(`✗ FAIL (${step3_duration}ms) - Delete button NOT found - DEFECT CONFIRMED\n`);
      }
    } catch (error) {
      const step3_duration = Date.now() - step3_start;
      results.push({
        step: 3,
        description: step_plan[2].description,
        status: 'FAIL',
        duration: step3_duration,
        screenshot: null,
        error: error.message
      });
      console.log(`✗ FAIL: ${error.message}\n`);
    }
    
  } finally {
    await browser.close();
  }
  
  // Calculate summary
  const total_time = Date.now() - start_time;
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const overall_status = failed === 0 ? 'PASS' : 'FAIL';
  
  // Output summary
  console.log(`\n[TEST SUMMARY]`);
  console.log(`Total Steps: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Overall Status: ${overall_status}`);
  console.log(`Total Time: ${total_time}ms\n`);
  
  // Save results to JSON
  const results_file = path.join(TEST_CONFIG.screenshot_dir, 'KAN-27-results.json');
  fs.writeFileSync(results_file, JSON.stringify({
    defect_id: TEST_CONFIG.defect_id,
    total_steps: results.length,
    passed: passed,
    failed: failed,
    overall_status: overall_status,
    total_time: total_time,
    results: results
  }, null, 2));
  
  console.log(`Results saved to: ${results_file}`);
})();
