import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const cssPath = path.join(process.cwd(), 'src', 'style.css');
const css = fs.readFileSync(cssPath, 'utf8');
const themes = {
  light: css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? '',
  dark: css.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '',
};
const bins = ['wet', 'dry', 'sanitary', 'special'];

function token(theme, name) {
  const value = themes[theme].match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1];
  if (!value) throw new Error(`Missing token --${name} in ${theme} theme`);
  return value;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((channel) => (
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

const rows = [];
for (const [theme, backgroundToken] of [['light', 'color-bg'], ['dark', 'color-bg-raised']]) {
  const pageBackground = token(theme, backgroundToken);
  for (const bin of bins) {
    const surface = token(theme, `bin-${bin}-surface`);
    const label = token(theme, `bin-${bin}-text`);
    rows.push({
      theme,
      pair: `${bin} surface / white`,
      ratio: contrast('#FFFFFF', surface),
      threshold: 4.5,
    });
    rows.push({
      theme,
      pair: `${bin} label / page background`,
      ratio: contrast(label, pageBackground),
      threshold: 4.5,
    });
  }
  rows.push({
    theme,
    pair: 'tertiary ink / page background',
    ratio: contrast(token(theme, 'color-ink-tertiary'), token(theme, 'color-bg')),
    threshold: 4.5,
  });
}

console.table(rows.map((row) => ({
  Theme: row.theme,
  Pair: row.pair,
  Ratio: row.ratio.toFixed(2),
  Threshold: row.threshold.toFixed(1),
  Status: row.ratio >= row.threshold ? 'PASS' : 'FAIL',
})));

const failures = rows.filter((row) => row.ratio < row.threshold);
if (failures.length) {
  console.error(`Contrast check failed for ${failures.length} pair(s).`);
  process.exitCode = 1;
}
