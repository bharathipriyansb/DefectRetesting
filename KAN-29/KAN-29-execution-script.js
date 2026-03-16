// KAN-29 - FULL EXECUTION SCRIPT
// Broken Images Verification Test
// Run this file independently to re-execute test

async function runTest() {
  const browser = require('playwright').chromium;
  const instance = await browser.launch();
  const page = await instance.newPage();
  
  console.log("=== KAN-29: Broken Images Test ===\n");
  
  // Step 1: Navigate
  console.log("Step 1: Navigate to Broken Images Page");
  try {
    const startTime = Date.now();
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    const duration = Date.now() - startTime;
    console.log(`✓ PASS (${duration}ms)`);
  } catch(e) {
    console.log(`✗ FAIL: ${e.message}`);
  }
  
  // Step 2: Verify Image 1
  console.log("\nStep 2: Verify Image 1 (Fork me on GitHub)");
  try {
    const startTime = Date.now();
    const images = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return {
        index: 1,
        src: imgs[0].src,
        width: imgs[0].naturalWidth,
        height: imgs[0].naturalHeight,
        broken: imgs[0].naturalWidth === 0 || imgs[0].naturalHeight === 0
      };
    });
    const duration = Date.now() - startTime;
    if (images.broken) {
      console.log(`✗ FAIL (${duration}ms): Image broken - ${images.width}x${images.height}`);
    } else {
      console.log(`✓ PASS (${duration}ms): Image loads - ${images.width}x${images.height}px`);
    }
  } catch(e) {
    console.log(`✗ FAIL: ${e.message}`);
  }
  
  // Step 3: Verify Image 2
  console.log("\nStep 3: Verify Image 2 (asdf.jpg)");
  try {
    const startTime = Date.now();
    const images = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return {
        index: 2,
        src: imgs[1].src,
        width: imgs[1].naturalWidth,
        height: imgs[1].naturalHeight,
        broken: imgs[1].naturalWidth === 0 || imgs[1].naturalHeight === 0
      };
    });
    const duration = Date.now() - startTime;
    if (images.broken) {
      console.log(`✗ FAIL (${duration}ms): Image broken - ${images.width}x${images.height}`);
    } else {
      console.log(`✓ PASS (${duration}ms): Image loads - ${images.width}x${images.height}px`);
    }
  } catch(e) {
    console.log(`✗ FAIL: ${e.message}`);
  }
  
  // Step 4: Verify Image 3
  console.log("\nStep 4: Verify Image 3 (hjkl.jpg)");
  try {
    const startTime = Date.now();
    const images = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return {
        index: 3,
        src: imgs[2].src,
        width: imgs[2].naturalWidth,
        height: imgs[2].naturalHeight,
        broken: imgs[2].naturalWidth === 0 || imgs[2].naturalHeight === 0
      };
    });
    const duration = Date.now() - startTime;
    if (images.broken) {
      console.log(`✗ FAIL (${duration}ms): Image broken - ${images.width}x${images.height}`);
    } else {
      console.log(`✓ PASS (${duration}ms): Image loads - ${images.width}x${images.height}px`);
    }
  } catch(e) {
    console.log(`✗ FAIL: ${e.message}`);
  }
  
  await page.close();
  await instance.close();
  console.log("\n=== Test Execution Complete ===");
}

runTest().catch(console.error);
