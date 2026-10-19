/**
 * Sort a pile: type a whole list of items and get them filed into the four bins.
 * Items that depend on their condition, or that we are not sure we matched,
 * are put to the person as a question instead of being guessed.
 */

import { bins, items, findBestMatch } from '../data/items.js';
import { getIllustration, getBinShape } from '../icons/illustrations.js';
import { escapeHtml } from './home.js';
import { SUGGEST_EMAIL } from '../config.js';

const storageKey = 'tossup-pile';
const exampleText = 'banana peel, chip packet, battery, used tissue, plastic bottle, pizza box, old phone, tea bag, glass jar';
const maxEntries = 60;
const binOrder = ['wet', 'dry', 'sanitary', 'special'];

let choices = {};
let currentEntries = [];

function optionKey(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function parsePile(text) {
  const seen = new Set();
  return text
    .split(/[\n;,]+|\s+and\s+|\s*&\s*|•/i)
    .map((part) => part.replace(/^\s*(?:[-*]|\d+[.)])\s*/, '').trim())
    .filter((part) => part.length > 0)
    .filter((part) => {
      const key = part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, maxEntries);
}

function resolveEntry(raw) {
  const key = raw.toLowerCase();
  const choice = choices[key] || {};
  if (choice.skip) return { raw, status: 'missing', skipped: true };

  let item = null;
  let candidates = [];
  if (choice.slug) {
    item = items.find((entry) => entry.slug === choice.slug) || null;
  } else {
    const match = findBestMatch(raw);
    candidates = match.candidates;
    if (match.confidence === 'none') return { raw, status: 'missing' };
    if (match.confidence !== 'exact') return { raw, status: 'maybe', candidates };
    item = match.item;
  }
  if (!item) return { raw, status: 'missing' };

  if (item.ask) {
    const option = item.ask.options.find((entry) => optionKey(entry.label) === choice.state);
    if (!option) return { raw, status: 'ask', item };
    return { raw, status: 'matched', item, binKey: option.bin, tip: option.tip, label: option.label };
  }
  return { raw, status: 'matched', item, binKey: item.bin, tip: item.tip, label: '' };
}

function buildSummary(entries) {
  const sorted = entries.filter((entry) => entry.status === 'matched').length;
  const pending = entries.filter((entry) => entry.status === 'ask' || entry.status === 'maybe').length;
  const missing = entries.filter((entry) => entry.status === 'missing').length;
  const parts = [`${sorted} of ${entries.length} ${entries.length === 1 ? 'item' : 'items'} sorted`];
  if (pending) parts.push(`${pending} ${pending === 1 ? 'needs' : 'need'} your answer`);
  if (missing) parts.push(`${missing} not found`);
  return parts.join('. ') + '.';
}

function renderPending(entries) {
  const pending = entries
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.status === 'ask' || entry.status === 'maybe');
  if (!pending.length) return '';
  return `
    <section class="pile-pending" aria-labelledby="pile-pending-heading">
      <h2 id="pile-pending-heading">Needs your answer</h2>
      <ul class="pile-pending-list">
        ${pending.map(({ entry, index }) => {
          if (entry.status === 'ask') {
            return `
              <li class="pile-question">
                <p class="pile-question-text"><span class="pile-question-icon" aria-hidden="true">${getIllustration(entry.item.slug)}</span><span><strong>${escapeHtml(entry.item.name)}.</strong> ${escapeHtml(entry.item.ask.question)}</span></p>
                <div class="pile-choice-row" role="group" aria-label="${escapeHtml(entry.item.ask.question)}">
                  ${entry.item.ask.options.map((option) => `<button type="button" class="btn btn-outline pile-choice" data-entry="${index}" data-state="${optionKey(option.label)}">${escapeHtml(option.label)}</button>`).join('')}
                </div>
              </li>`;
          }
          return `
            <li class="pile-question">
              <p class="pile-question-text"><span><strong>"${escapeHtml(entry.raw)}"</strong> Did you mean one of these?</span></p>
              <div class="pile-choice-row" role="group" aria-label="Did you mean for ${escapeHtml(entry.raw)}">
                ${entry.candidates.map((candidate) => `<button type="button" class="btn btn-outline pile-choice" data-entry="${index}" data-slug="${candidate.slug}">${escapeHtml(candidate.name)}</button>`).join('')}
                <button type="button" class="text-button pile-choice" data-entry="${index}" data-skip="true">None of these</button>
              </div>
            </li>`;
        }).join('')}
      </ul>
    </section>
  `;
}

function renderBins(entries) {
  return `
    <div class="pile-bins">
      ${binOrder.map((key) => {
        const bin = bins[key];
        const rows = entries.filter((entry) => entry.status === 'matched' && entry.binKey === key);
        return `
          <section class="pile-bin" data-bin="${key}" aria-labelledby="pile-bin-${key}">
            <header class="pile-bin-head">
              <span class="pile-bin-shape" aria-hidden="true">${getBinShape(bin.shape)}</span>
              <h2 id="pile-bin-${key}">${escapeHtml(bin.name)}</h2>
              <span class="pile-bin-count">${rows.length}</span>
            </header>
            ${rows.length ? `
              <ul class="pile-bin-list">
                ${rows.map((entry) => `
                  <li class="pile-row">
                    <span class="pile-row-icon" aria-hidden="true">${getIllustration(entry.item.slug)}</span>
                    <span class="pile-row-text">
                      <a class="pile-row-name" href="/item/${entry.item.slug}${entry.label ? `?state=${optionKey(entry.label)}` : ''}">${escapeHtml(entry.item.name)}</a>
                      ${entry.label ? `<span class="pile-row-condition">${escapeHtml(entry.label)}</span>` : ''}
                      <span class="pile-row-tip">${escapeHtml(entry.tip)}</span>
                    </span>
                  </li>`).join('')}
              </ul>` : '<p class="pile-empty">Nothing from your pile goes here.</p>'}
          </section>`;
      }).join('')}
    </div>
  `;
}

function renderMissing(entries) {
  const missing = entries.filter((entry) => entry.status === 'missing');
  if (!missing.length) return '';
  const subject = encodeURIComponent('Tossup item suggestions');
  const body = encodeURIComponent('Hi, these items were not listed on Tossup:\n\n' + missing.map((entry) => '- ' + entry.raw).join('\n'));
  return `
    <section class="pile-missing" aria-labelledby="pile-missing-heading">
      <h2 id="pile-missing-heading">We don't have these yet</h2>
      <ul class="pile-missing-list">${missing.map((entry) => `<li>${escapeHtml(entry.raw)}</li>`).join('')}</ul>
      <p><a href="mailto:${SUGGEST_EMAIL}?subject=${subject}&body=${body}">Suggest ${missing.length === 1 ? 'this item' : 'these items'}</a></p>
    </section>
  `;
}

function buildPlainText(entries) {
  const lines = ['Tossup: my pile'];
  binOrder.forEach((key) => {
    const rows = entries.filter((entry) => entry.status === 'matched' && entry.binKey === key);
    if (!rows.length) return;
    lines.push('', bins[key].name.toUpperCase());
    rows.forEach((entry) => lines.push(`- ${entry.item.name}${entry.label ? ` (${entry.label.toLowerCase()})` : ''}: ${entry.tip}`));
  });
  const unsorted = entries.filter((entry) => entry.status !== 'matched');
  if (unsorted.length) {
    lines.push('', 'NOT SORTED');
    unsorted.forEach((entry) => lines.push(`- ${entry.raw}`));
  }
  return lines.join('\n');
}

function renderResults(entries) {
  const target = document.getElementById('pile-results');
  if (!target) return;
  if (!entries.length) {
    target.innerHTML = '';
    return;
  }
  target.innerHTML = `
    <p class="pile-summary" role="status">${escapeHtml(buildSummary(entries))}</p>
    ${renderPending(entries)}
    ${renderBins(entries)}
    ${renderMissing(entries)}
    <div class="pile-tools">
      <button type="button" class="btn btn-outline" id="pile-copy">Copy as a list</button>
      <button type="button" class="btn btn-outline" id="pile-print">Print</button>
      <span class="pile-copy-status" id="pile-copy-status" role="status"></span>
    </div>
  `;
  attachResultEvents();
}

function attachResultEvents() {
  document.querySelectorAll('.pile-choice').forEach((button) => {
    button.addEventListener('click', () => {
      const entry = currentEntries[Number(button.dataset.entry)];
      if (!entry) return;
      const key = entry.raw.toLowerCase();
      const next = { ...(choices[key] || {}) };
      if (button.dataset.skip) next.skip = true;
      if (button.dataset.slug) next.slug = button.dataset.slug;
      if (button.dataset.state) next.state = button.dataset.state;
      choices[key] = next;
      runSort({ keepFocusOn: null });
    });
  });
  document.getElementById('pile-copy')?.addEventListener('click', async () => {
    const status = document.getElementById('pile-copy-status');
    try {
      await navigator.clipboard.writeText(buildPlainText(currentEntries));
      if (status) status.textContent = 'Copied.';
    } catch {
      if (status) status.textContent = 'Copying is not available in this browser.';
    }
  });
  document.getElementById('pile-print')?.addEventListener('click', () => window.print());
}

function readStored() {
  try {
    return localStorage.getItem(storageKey) || '';
  } catch {
    return '';
  }
}

function writeStored(value) {
  try {
    if (value) localStorage.setItem(storageKey, value);
    else localStorage.removeItem(storageKey);
  } catch {
    // Saving the last pile is optional.
  }
}

function runSort() {
  const input = document.getElementById('pile-input');
  if (!input) return;
  const text = input.value;
  writeStored(text);
  currentEntries = parsePile(text).map(resolveEntry);
  renderResults(currentEntries);
}

export function renderPile() {
  document.title = 'Sort a pile | Tossup';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Type everything you are throwing away and Tossup files each item in the right bin.');
  }
  return `
    <main id="main-content" class="page-content pile-page" aria-label="Sort a pile">
      <div class="container pile-container">
        <h1>Sort a pile</h1>
        <p class="page-intro">Clearing a whole bag? Type or paste everything you are throwing away. Separate items with commas or new lines, and Tossup files each one in a bin.</p>
        <form id="pile-form" class="pile-form" novalidate>
          <label for="pile-input" class="pile-label">Your items</label>
          <textarea id="pile-input" class="pile-input" rows="4" spellcheck="false" placeholder="banana peel, chip packet, battery, used tissue"></textarea>
          <div class="pile-actions">
            <button type="submit" class="btn btn-primary">Sort my pile</button>
            <button type="button" class="btn btn-outline" id="pile-example">Try an example</button>
            <button type="button" class="text-button" id="pile-clear">Clear</button>
          </div>
        </form>
        <div id="pile-results" class="pile-results"></div>
      </div>
    </main>
  `;
}

export function attachPileEvents() {
  const input = document.getElementById('pile-input');
  const form = document.getElementById('pile-form');
  if (!input || !form) return;
  choices = {};
  const stored = readStored();
  if (stored) {
    input.value = stored;
    runSort();
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runSort();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      runSort();
    }
  });
  document.getElementById('pile-example')?.addEventListener('click', () => {
    input.value = exampleText;
    choices = {};
    runSort();
    input.focus();
  });
  document.getElementById('pile-clear')?.addEventListener('click', () => {
    input.value = '';
    choices = {};
    currentEntries = [];
    writeStored('');
    renderResults([]);
    input.focus();
  });
}
