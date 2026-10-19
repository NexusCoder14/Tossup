import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const baseUrl = 'http://127.0.0.1:5173';
const screenshotDir = join(process.cwd(), 'screenshots');
const viewports = [
  ['320', { width: 320, height: 800 }],
  ['390', { width: 390, height: 844 }],
  ['1280', { width: 1280, height: 900 }],
];
const pages = [
  ['home', '/'],
  ['search-result', '/'],
  ['answer', '/item/banana-peel'],
  ['ambiguous', '/item/pizza-box'],
  ['bins', '/bins'],
  ['about', '/about'],
  ['404', '/not-a-real-page'],
];

await mkdir(screenshotDir, { recursive: true });
const browser = await chromium.launch();
const report = { screenshots: 0, failures: [], consoleErrors: [] };

async function assertPage(page, label) {
  const result = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const hiddenSkipLink = element.classList.contains('skip-link') && rect.bottom <= 0;
      return !hiddenSkipLink && style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
    };
    const interactive = [...document.querySelectorAll('a, button, textarea, select, input:not([type="radio"]):not([type="checkbox"]), [role="tab"]')]
      .filter(visible)
      .map((element) => ({ tag: element.tagName, text: element.textContent.trim(), width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }));
    const focus = document.activeElement;
    const focusStyle = focus ? getComputedStyle(focus) : null;
    return {
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth || document.body.scrollWidth > document.body.clientWidth,
      smallTargets: interactive.filter((item) => item.width < 44 || item.height < 44),
      focusVisible: Boolean(focusStyle && (focusStyle.outlineStyle !== 'none' && parseFloat(focusStyle.outlineWidth) >= 2 || focusStyle.boxShadow !== 'none')),
    };
  });
  if (result.overflow) report.failures.push(`${label}: horizontal scroll`);
  if (result.smallTargets.length) report.failures.push(`${label}: small targets ${JSON.stringify(result.smallTargets)}`);
  return result;
}

async function capture(theme, viewportName, viewport, pageName, path, setup) {
  const context = await browser.newContext({ viewport, colorScheme: theme });
  await context.addInitScript((selectedTheme) => {
    localStorage.clear();
    localStorage.setItem('tossup-theme', selectedTheme);
  }, theme);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
  if (setup) await setup(page);
  await page.waitForTimeout(300);
  const label = `${theme}/${viewportName}/${pageName}`;
  const state = await assertPage(page, label);
  const programmaticHeading = await page.evaluate(() => {
    const focus = document.activeElement;
    return focus?.matches('h1[tabindex="-1"]') === true;
  });
  if (!state.focusVisible && !programmaticHeading) report.failures.push(`${label}: focused element has no visible focus ring`);
  if (errors.length) {
    report.consoleErrors.push({ label, errors });
    report.failures.push(`${label}: console errors`);
  }
  await page.screenshot({ path: join(screenshotDir, `${theme}-${viewportName}-${pageName}.png`), fullPage: true });
  report.screenshots += 1;
  await context.close();
}

for (const theme of ['light', 'dark']) {
  for (const [viewportName, viewport] of viewports) {
    for (const [pageName, path] of pages) {
      const setup = pageName === 'search-result'
        ? async (page) => {
          await page.locator('#search-input').fill('banana');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Escape');
        }
        : undefined;
      await capture(theme, viewportName, viewport, pageName, path, setup);
    }
  }
}

const keyboardContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
await keyboardContext.addInitScript(() => localStorage.clear());
const keyboardPage = await keyboardContext.newPage();
const keyboardErrors = [];
keyboardPage.on('pageerror', (error) => keyboardErrors.push(error.message));
keyboardPage.on('console', (message) => {
  if (message.type() === 'error') keyboardErrors.push(message.text());
});
await keyboardPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await keyboardPage.locator('.skip-link').focus();
if (!await keyboardPage.locator('.skip-link').evaluate((element) => document.activeElement === element)) report.failures.push('keyboard: skip link cannot receive focus');
await keyboardPage.keyboard.press('Enter');
await keyboardPage.keyboard.press('Tab');
await keyboardPage.locator('#search-input').fill('banana');
await keyboardPage.keyboard.press('ArrowDown');
await keyboardPage.keyboard.press('Enter');
await keyboardPage.waitForURL('**/item/banana-peel');
if (!await keyboardPage.locator('.answer-bin-name').evaluate((element) => document.activeElement === element)) report.failures.push('keyboard: answer heading did not receive focus');
await keyboardPage.locator('#display-toggle').focus();
await keyboardPage.keyboard.press('Enter');
await keyboardPage.keyboard.press('Tab');
await keyboardPage.keyboard.press('Escape');
if (await keyboardPage.locator('#display-toggle').getAttribute('aria-expanded') !== 'false') report.failures.push('keyboard: Escape did not close Display');
await keyboardPage.goto(`${baseUrl}/`);
await keyboardPage.locator('#tab-common').focus();
await keyboardPage.keyboard.press('ArrowRight');
await keyboardPage.keyboard.press('ArrowRight');
if (await keyboardPage.locator('#tab-bin').getAttribute('aria-selected') !== 'true') report.failures.push('keyboard: tab arrows did not reach By bin');
await keyboardPage.goto(`${baseUrl}/item/pizza-box`);
if (!await keyboardPage.locator('.decision-question').evaluate((element) => document.activeElement === element)) report.failures.push('keyboard: ambiguous item did not focus question');
await keyboardPage.locator('.decision-option').first().focus();
await keyboardPage.keyboard.press('Enter');
await keyboardPage.waitForURL('**/item/pizza-box?state=*');
if (!await keyboardPage.locator('.answer-bin-name').evaluate((element) => document.activeElement === element)) report.failures.push('keyboard: decision Enter did not reach answer focus');
if (keyboardErrors.length) report.consoleErrors.push({ label: 'keyboard-flow', errors: keyboardErrors });
await keyboardContext.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
if (report.failures.length) process.exitCode = 1;
