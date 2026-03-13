/**
 * KAN-27 - FULL EXECUTION SCRIPT
 * Run this file independently to re-execute test
 * 
 * Test: Navigate to add_remove_elements page, click Add Element, verify Delete button appears
 */

async function executeTest() {
  const { chromium } = require('playwright');
  
  console.log('🚀 Starting KAN-27 Test Execution');
  console.log('═'.repeat(60));
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Step 1: Navigate to the page
    console.log('\n📍 Step 1: Navigate to https://the-internet.herokuapp.com/add_remove_elements/');
    const startTime1 = Date.now();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const duration1 = Date.now() - startTime1;
    console.log(`✅ PASS - Navigation successful (${duration1}ms)`);
    console.log(`   Page Title: ${await page.title()}`);
    
    // Step 2: Click "Add Element" button
    console.log('\n🖱️  Step 2: Click "Add Element" button');
    const startTime2 = Date.now();
    await page.getByRole('button', { name: 'Add Element' }).click();
    const duration2 = Date.now() - startTime2;
    console.log(`✅ PASS - Button clicked successfully (${duration2}ms)`);
    
    // Step 3: Verify "Delete" button appears
    console.log('\n✔️  Step 3: Verify "Delete" button appears');
    const startTime3 = Date.now();
    await page.getByText('Delete').first().waitFor({ state: 'visible' });
    const duration3 = Date.now() - startTime3;
    console.log(`✅ PASS - Delete button verified (${duration3}ms)`);
    
    const finalContent = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      bodyText: document.body.innerText
    }));
    
    console.log(`\n📄 Final Page State:`);
    console.log(`   URL: ${finalContent.url}`);
    console.log(`   Title: ${finalContent.title}`);
    
    console.log('\n═'.repeat(60));
    console.log('🎉 TEST EXECUTION COMPLETE - ALL STEPS PASSED');
    console.log(`Total Duration: ${duration1 + duration2 + duration3}ms`);
    
  } catch (error) {
    console.error('\n❌ TEST FAILED');
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

executeTest();
