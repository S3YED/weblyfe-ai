#!/usr/bin/env node
const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshot(url, outputPath) {
  console.log(`📸 Capturing ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--disable-web-security'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });
    
    // Wait a bit for animations/lazy loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({ 
      path: outputPath, 
      fullPage: true 
    });
    
    console.log(`✅ Saved to ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

const sites = [
  { url: 'https://booking.booth.me', name: 'booth-me.png' },
  { url: 'https://book.titantransfers.be', name: 'titan-transfers.png' },
  { url: 'https://www.lpspilates.nl', name: 'lps-pilates.png' }
];

(async () => {
  for (const site of sites) {
    const outputPath = path.join(__dirname, 'screenshots', site.name);
    await captureScreenshot(site.url, outputPath);
  }
  console.log('\n🎉 All screenshots captured!');
})();
