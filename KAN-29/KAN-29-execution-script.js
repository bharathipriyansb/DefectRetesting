/**
 * KAN-29 - FULL EXECUTION SCRIPT
 * Run this file independently to re-execute test
 * Defect: Broken Images Verification
 * Test URL: https://the-internet.herokuapp.com/broken_images
 */

const { chromium } = require('playwright');

async function executeTest() {
  console.log('Starting KAN-29 Execution...\n');
  
  // Step 1: Navigate to page
  console.log('Step 1: Navigate to broken images page');
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto('https://the-internet.herokuapp.com/broken_images', {
      waitUntil: 'networkidle'
    });
    
    console.log('✓ PASS - Navigation successful');
    console.log(`  URL: ${page.url()}`);
    console.log(`  Title: ${await page.title()}\n`);
    
    // Step 2: Verify images
    console.log('Step 2: Verify all images are clear');
    
    const images = await page.locator('img').all();
    console.log(`  Total images found: ${images.length}`);
    
    let imageStatus = [];
    let allImagesPassed = true;
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      // Check if image loaded successfully
      const naturalHeight = await page.locator(`img[src="${src}"]`).evaluate(el => el.naturalHeight);
      const naturalWidth = await page.locator(`img[src="${src}"]`).evaluate(el => el.naturalWidth);
      const isLoaded = naturalHeight > 0 && naturalWidth > 0;
      
      const status = isLoaded ? 'PROPER' : 'BROKEN';
      imageStatus.push({
        index: i + 1,
        src: src,
        alt: alt,
        status: status,
        dimensions: `${naturalWidth}x${naturalHeight}`
      });
      
      console.log(`  Image ${i + 1}: ${status}`);
      console.log(`    Source: ${src}`);
      console.log(`    Alt: ${alt}`);
      console.log(`    Dimensions: ${naturalWidth}x${naturalHeight}`);
      
      if (status === 'BROKEN') {
        allImagesPassed = false;
      }
    }
    
    if (allImagesPassed) {
      console.log('\n✓ PASS - All images are clear');
    } else {
      console.log('\n✗ FAIL - Some images are broken');
    }
    
    console.log('\n=== EXECUTION COMPLETE ===');
    console.log(`Overall Status: ${allImagesPassed ? 'PASS' : 'FAIL'}`);
    console.log(`Total Images: ${images.length}`);
    console.log(`Passed: ${imageStatus.filter(i => i.status === 'PROPER').length}`);
    console.log(`Failed: ${imageStatus.filter(i => i.status === 'BROKEN').length}`);
    
    await browser.close();
    
  } catch (error) {
    console.log('✗ FAIL - Execution error:');
    console.log(`  ${error.message}`);
    process.exit(1);
  }
}

// Run the test
executeTest().catch(console.error);
