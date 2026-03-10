// Playwright test script for defect KAN-1
// Usage: npx playwright test KAN-1-execution-script.js

const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const defectId = 'KAN-1';
  const steps = [
    { id: 1, action: 'navigate', description: 'Navigate to https://the-internet.herokuapp.com/add_remove_elements/' , url: 'https://the-internet.herokuapp.com/add_remove_elements/'},
    { id: 2, action: 'click', description: 'Click on Add Element once', selectorText: 'Add Element' }
  ];

  const images = [];
  const consoles = [];
  const results = [];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // helper to inject html2canvas and capture base64 PNG
  async function captureBase64() {
    // Try to load html2canvas dynamically
    await page.addScriptTag({ url: 'https://html2canvas.hertzen.com/dist/html2canvas.min.js' }).catch(() => {});
    // wait until html2canvas is available
    for (let i=0;i<20;i++){
      const has = await page.evaluate(() => typeof window.html2canvas !== 'undefined');
      if (has) break;
      await page.waitForTimeout(200);
    }
    // capture using html2canvas if available, otherwise fall back to Playwright screenshot and convert to base64
    try {
      const base64 = await page.evaluate(async () => {
        const canvas = await window.html2canvas(document.body, { scale: 1, useCORS: true, allowTaint: true, backgroundColor: '#ffffff' });
        return canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
      });
      return base64;
    } catch (e) {
      // fallback
      const buffer = await page.screenshot({ fullPage: true });
      return buffer.toString('base64');
    }
  }

  // capture console messages
  page.on('console', msg => {
    consoles.push(`[${msg.type()}] ${msg.text()}`);
  });

  let overallPass = true;

  // Execute steps
  for (let i=0;i<steps.length;i++){
    const step = steps[i];
    const start = Date.now();
    let status = 'PASS';
    try {
      if (step.action === 'navigate') {
        await page.goto(step.url, { waitUntil: 'load', timeout: 30000 });
        await page.waitForTimeout(500);
      } else if (step.action === 'click') {
        // find button by text and click
        const clicked = await page.evaluate((text) => {
          const btns = Array.from(document.querySelectorAll('button'));
          const b = btns.find(x => x.textContent.trim() === text);
          if (b) { b.click(); return true; } else { return false; }
        }, step.selectorText);
        if (!clicked) {
          status = 'FAIL';
          overallPass = false;
        }
        await page.waitForTimeout(500);
      }
      const base64 = await captureBase64();
      images.push(base64);
      // For last step perform validation: check for Delete button
      if (i === steps.length-1) {
        const hasDelete = await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          return btns.some(b => b.textContent.trim() === 'Delete');
        });
        if (!hasDelete) { status = 'FAIL'; overallPass = false; }
      }
    } catch (err) {
      status = 'FAIL';
      overallPass = false;
      images.push('');
      consoles.push('[error] ' + String(err));
    }
    const duration = (Date.now() - start) + ' ms';
    results.push({ step: step.id, action: step.description, status, duration });
  }

  // Build report HTML with embedded images
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.length - passed;
  const overallStatus = overallPass ? 'PASS' : 'FAIL';

  let rows = '';
  for (let i=0;i<results.length;i++){
    const r = results[i];
    const cls = r.status === 'PASS' ? 'pass' : 'fail';
    const img = images[i] ? `data:image/png;base64,${images[i]}` : '';
    const consoleText = consoles.join('\n');
    rows += `<tr><td>${r.step}</td><td>${r.action}</td><td class=\"${cls}\">${r.status}</td><td>${r.duration}</td><td>${img ? `<img class=\"step-snapshot\" src=\"${img}\">` : 'No snapshot'}</td><td><div class=\"console\">${consoleText}</div></td></tr>`;
  }

  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Defect ${defectId} - Step-by-Step Validation</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        .summary { background: #f0f8ff; padding: 15px; border-radius: 5px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th { background: #4CAF50; color: white; padding: 12px; }
        td { padding: 10px; vertical-align: top; }
        .pass { background-color: #d4edda; }
        .fail { background-color: #f8d7da; }
        .step-snapshot { max-width: 400px; max-height: 300px; border: 1px solid #ddd; }
        .console { background: #f5f5f5; padding: 10px; font-family: monospace; white-space: pre-wrap; }
    </style>
</head>
<body>
    <h1>Defect ${defectId} Automated Validation</h1>
    
    <div class="summary">
        Total Steps: ${results.length} | Passed: ${passed} | Failed: ${failed} | Overall Status: ${overallStatus}
    </div>

    <h2>Step-by-Step Execution</h2>
    <table>
        <tr><th>Step</th><th>Action</th><th>Status</th><th>Duration</th><th>Snapshot</th><th>Console</th></tr>
        ${rows}
    </table>

    <h2>Final Validation</h2>
    ${ images[images.length-1] ? `<img class="step-snapshot" src="data:image/png;base64,${images[images.length-1]}">` : '' }
    Expected: a new button named delete appears in the page
    Actual: ${overallStatus === 'PASS' ? 'Delete button appeared' : 'Delete button NOT found'}

    <h2>Re-run Test</h2>
    <p>npx playwright test KAN-1-execution-script.js</p>
</body>
</html>`;

  // write report locally
  fs.writeFileSync(`${defectId}-report.html`, html);

  await browser.close();
  console.log('Done. Report written to', `${defectId}-report.html`);
})();
