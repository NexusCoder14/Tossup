import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage();

for (const [filename, size] of [
  ['favicon-16.png', 16],
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0;width:${size}px;height:${size}px;background:transparent}</style>${svg}`);
  await page.screenshot({ path: fileURLToPath(new URL(`../public/${filename}`, import.meta.url)), omitBackground: true });
}

await browser.close();
console.log('Generated public/favicon-16.png, public/favicon-32.png, and public/apple-touch-icon.png');
