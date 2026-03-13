/**
 * KAN-27 - FULL EXECUTION SCRIPT
 * Run this file independently to re-execute test
 * 
 * Reproduction Steps:
 * 1. Navigate to https://the-internet.herokuapp.com/add_remove_elements/
 * 2. Click on "Add Element" button once
 * 3. Verify that "Delete" button appears
 * 
 * Expected: Delete button appears
 * Actual: Tested - Delete button DOES appear (issue resolved)
 */

async function executeKAN27Test() {
  const browserAutomation = require('./playwright');
  
  console.log('=== KAN-27 Test Execution ===\n');
  
  const results = [];
  let passed = 0;
  let failed = 0;
  
  try {
    // Step 1: Install and Navigate
    console.log('Step 1: Navigate to Add/Remove Elements page');
    console.log('URL: https://the-internet.herokuapp.com/add_remove_elements/');
    
    const startTime1 = Date.now();
    await browserAutomation.navigate('https://the-internet.herokuapp.com/add_remove_elements/');
    const duration1 = Date.now() - startTime1;
    
    console.log('✓ PASS - Navigation successful (' + duration1 + 'ms)\n');
    passed++;
    
    results.push({
      step: 1,
      desc: 'Navigate to Add/Remove Elements page',
      status: 'PASS',
      duration: duration1
    });
    
  } catch (e) {
    console.log('✗ FAIL - Navigation failed:', e.message);
    failed++;
    results.push({
      step: 1,
      desc: 'Navigate to Add/Remove Elements page',
      status: 'FAIL',
      duration: 0,
      error: e.message
    });
  }
  
  try {
    // Step 2: Click Add Element
    console.log('Step 2: Click on "Add Element" button');
    
    const startTime2 = Date.now();
    await browserAutomation.click('text=Add Element');
    const duration2 = Date.now() - startTime2;
    
    console.log('✓ PASS - Button clicked successfully (' + duration2 + 'ms)\n');
    passed++;
    
    results.push({
      step: 2,
      desc: 'Click on Add Element button',
      status: 'PASS',
      duration: duration2
    });
    
  } catch (e) {
    console.log('✗ FAIL - Click failed:', e.message);
    failed++;
    results.push({
      step: 2,
      desc: 'Click on Add Element button',
      status: 'FAIL',
      duration: 0,
      error: e.message
    });
  }
  
  try {
    // Step 3: Verify Delete Button
    console.log('Step 3: Verify that "Delete" button appears');
    
    const startTime3 = Date.now();
    await browserAutomation.waitFor('text=Delete');
    const duration3 = Date.now() - startTime3;
    
    console.log('✓ PASS - Delete button found and visible (' + duration3 + 'ms)\n');
    passed++;
    
    results.push({
      step: 3,
      desc: 'Verify Delete button appears',
      status: 'PASS',
      duration: duration3
    });
    
  } catch (e) {
    console.log('✗ FAIL - Delete button not found:', e.message);
    failed++;
    results.push({
      step: 3,
      desc: 'Verify Delete button appears',
      status: 'FAIL',
      duration: 0,
      error: e.message
    });
  }
  
  // Cleanup
  try {
    await browserAutomation.close();
  } catch (e) {
    console.log('Note: Browser close threw error (may be normal):', e.message);
  }
  
  // Print Summary
  console.log('=== EXECUTION SUMMARY ===');
  console.log('Total Steps: 3');
  console.log('Passed: ' + passed);
  console.log('Failed: ' + failed);
  console.log('Overall Status: ' + (failed === 0 ? 'PASS ✓' : 'FAIL ✗'));
  console.log('========================\n');
  
  return {
    defect_id: 'KAN-27',
    total_steps: 3,
    passed: passed,
    failed: failed,
    overall_status: failed === 0 ? 'PASS' : 'FAIL',
    results: results
  };
}

// Execute if run directly
if (require.main === module) {
  executeKAN27Test().then(result => {
    console.log('Test execution complete');
    process.exit(result.failed === 0 ? 0 : 1);
  }).catch(err => {
    console.error('Fatal error during execution:', err);
    process.exit(1);
  });
}

module.exports = executeKAN27Test;
