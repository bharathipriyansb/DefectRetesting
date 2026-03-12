/**
 * KAN-29 - FULL EXECUTION SCRIPT
 * Broken Images Verification Test
 * Run this file independently to re-execute the test
 */

// Step 1: Navigate to page
console.log("Step 1: Navigate to Broken Images Page");
try {
  browser_install();
  browser_navigate("https://the-internet.herokuapp.com/broken_images");
  console.log("✓ PASS - Page loaded successfully");
} catch(e) {
  console.log("✗ FAIL - Navigation failed:", e.message);
  process.exit(1);
}

// Step 2: Verify all images are proper
console.log("\nStep 2: Verify All Images Are Proper");
try {
  const imageData = browser_evaluate("() => {
    const images = document.querySelectorAll('img');
    const imageStatus = Array.from(images).map((img, idx) => ({
      index: idx + 1,
      alt: img.alt,
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      status: img.complete && img.naturalWidth > 0 ? 'PROPER' : 'BROKEN'
    }));
    
    return {
      totalImages: imageStatus.length,
      images: imageStatus,
      properCount: imageStatus.filter(i => i.status === 'PROPER').length,
      brokenCount: imageStatus.filter(i => i.status === 'BROKEN').length
    };
  }");
  
  console.log("Total Images:", imageData.totalImages);
  console.log("Proper:", imageData.properCount);
  console.log("Broken:", imageData.brokenCount);
  
  if (imageData.brokenCount === 0) {
    console.log("✓ PASS - All images are proper");
  } else {
    console.log("✗ FAIL - " + imageData.brokenCount + " images are broken");
    console.log("Image Details:");
    imageData.images.forEach(img => {
      console.log(`  [${img.index}] ${img.alt || 'no-alt'} - ${img.status} (${img.naturalWidth}x${img.naturalHeight})`);
    });
  }
} catch(e) {
  console.log("✗ FAIL - Verification failed:", e.message);
}

browser_close();
console.log("\nExecution complete");
