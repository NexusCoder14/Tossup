import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:5173';
const routes = ['/', '/item/banana-peel', '/item/pizza-box', '/item/pizza-box?state=greasy-or-food-soiled', '/bins', '/pile', '/design', '/about', '/privacy', '/terms', '/a11y-not-found'];
const themes = ['light', 'dark'];
const browser = await chromium.launch();
const failures = [];

for (const theme of themes) {
  const context = await browser.newContext();
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem('tossup-theme', selectedTheme);
  }, theme);
  const page = await context.newPage();

  for (const path of routes) {
    const url = `${baseUrl}${path}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).analyze();
    console.log(`${theme} ${path}: ${results.violations.length} violation(s)`);
    for (const violation of results.violations) {
      failures.push({ theme, path, violation });
      console.log(`  ${violation.id}: ${violation.help}`);
      for (const node of violation.nodes) {
        console.log(`    ${node.target.join(', ')}`);
      }
    }
  }
  await context.close();
}

await browser.close();

if (failures.length) {
  console.error(`Accessibility audit failed with ${failures.length} violation(s).`);
  process.exitCode = 1;
} else {
  console.log(`Accessibility audit passed: ${routes.length * themes.length} pages checked.`);
}
