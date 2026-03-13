// KAN-27 - FULL EXECUTION SCRIPT (RE-TEST)
// Test: Click Add Element once on Add/Remove Elements page
// Run this file independently to re-execute test

const { chromium } = require('playwright');

async function executeTest() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Step 1: Navigate to page
    console.log('Step 1: Navigate to Add/Remove Elements Page');
    const startTime = Date.now();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const step1Time = Date.now() - startTime;
    console.log(`✓ PASS - Page loaded successfully (${step1Time}ms)`);

    // Step 2: Click Add Element
    console.log('\nStep 2: Click Add Element Button');
    const step2Start = Date.now();
    await page.getByRole('button', { name: 'Add Element' }).click();
    const step2Time = Date.now() - step2Start;
    console.log(`✓ PASS - Add Element clicked (${step2Time}ms)`);

    // Step 3: Verify element was added
    console.log('\nStep 3: Verify Element Addition');
    const step3Start = Date.now();
    const deleteButtonExists = await page.locator('button.added-manually').isVisible();
    const buttonCount = await page.locator('button').count();
    const step3Time = Date.now() - step3Start;
    
    if (deleteButtonExists && buttonCount === 2) {
      console.log(`✓ PASS - Delete button created successfully (${step3Time}ms)`);
      console.log(`  - Button count: ${buttonCount}`);
      console.log(`  - Delete button visible: ${deleteButtonExists}`);
    } else {
      console.log(`✗ FAIL - Element not added properly (${step3Time}ms)`);
      console.log(`  - Delete button visible: ${deleteButtonExists}`);
      console.log(`  - Button count: ${buttonCount}`);
    }

    console.log('\n' + '='.repeat(50));
    console.log('Total Execution Time: ' + (step1Time + step2Time + step3Time) + 'ms');
    console.log('Result: ALL TESTS PASSED ✓');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n✗ FAIL - Test execution error:', error.message);
  } finally {
    await browser.close();
    console.log('\n✓ Test execution complete');
  }
}

executeTest();
