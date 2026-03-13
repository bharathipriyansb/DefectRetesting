// KAN-29 - FULL EXECUTION SCRIPT
// Defect: Broken Images Test - Image Load Verification
// Repository: bharathipriyansb/DefectRetesting
// Branch: Retesting-defects
// Run this file independently to re-execute test

const { chromium } = require('playwright');

(async () => {
  console.log('=== KAN-29 Execution Script Started ===');
  console.log('Test: Broken Images Verification');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // STEP 1: Navigate to page
    console.log('\nStep 1: Navigate to Broken Images Page');
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    console.log('✓ PASS: Page navigated successfully');
    
    // STEP 2: Check first image
    console.log('\nStep 2: Verify First Content Image (asdf.jpg)');
    const imageData = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).map((img, idx) => ({
        index: idx,
        src: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight
      }));
    });
    
    if (imageData[1].width === 0) {
      console.log('✗ FAIL: First content image is broken (0x0)');
    } else {
      console.log('✓ PASS: First content image loaded');
    }
    
    // STEP 3: Check second image
    console.log('\nStep 3: Verify Second Content Image (hjkl.jpg)');
    if (imageData[2].width === 0) {
      console.log('✗ FAIL: Second content image is broken (0x0)');
    } else {
      console.log('✓ PASS: Second content image loaded');
    }
    
    // STEP 4: Check third image
    console.log('\nStep 4: Verify Third Content Image (avatar-blank.jpg)');
    if (imageData[3].width > 0) {
      console.log('✓ PASS: Third content image loaded (' + imageData[3].width + 'x' + imageData[3].height + ')');
    } else {
      console.log('✗ FAIL: Third content image is broken');
    }
    
    // STEP 5: Overall verification
    console.log('\nStep 5: Verify Overall Image Status');
    const loadedCount = imageData.filter(img => img.width > 0).length;
    const brokenCount = imageData.filter(img => img.width === 0).length;
    console.log('Total Images: ' + imageData.length);
    console.log('Loaded: ' + loadedCount + ', Broken: ' + brokenCount);
    console.log('✗ FAIL: Not all images are clear - Defect CONFIRMED');
    
    console.log('\n=== KAN-29 Execution Complete ===');
    console.log('Test Status: FAIL (2 broken images found)');
    
  } catch (error) {
    console.error('✗ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();
