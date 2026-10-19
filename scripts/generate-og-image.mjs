import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const svg = await readFile(new URL('../public/og-image.svg', import.meta.url), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(`<style>html,body{margin:0;width:1200px;height:630px}</style>${svg}`);
await page.screenshot({ path: fileURLToPath(new URL('../public/og-image.png', import.meta.url)) });
await browser.close();
console.log('Generated public/og-image.png at 1200x630');
