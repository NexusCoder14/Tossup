/**
 * About page.
 */

import { bins } from '../data/items.js';
import { docLayout } from '../components/docLayout.js';
import { getBinShape } from '../icons/illustrations.js';
import { SUGGEST_EMAIL } from '../config.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function renderAbout() {
  document.title = 'About | Tossup';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'How Tossup works: a quick reference for which bin your household waste goes in.');
  }

  const binLegend = Object.entries(bins).map(([key, bin]) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bgColor = isDark ? bin.surfaceDark : bin.surface;
    return `
      <div class="bin-legend-item" role="listitem" style="--legend-surface: ${bgColor}">
        <span class="bin-legend-shape">${getBinShape(bin.shape)}</span>
        <div>
          <div class="bin-legend-name">${escapeHtml(bin.name)}</div>
          <div class="bin-legend-desc">${escapeHtml(bin.description)}</div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <main id="main-content" class="page-content" aria-label="About Tossup">
      ${docLayout('about', `
        <h1>About Tossup</h1>

        <p>Tossup is a quick reference tool. You type in what you are about to throw away, and it tells you which bin it goes in. That is all it does.</p>

        <h2>How it works</h2>
        <p>Search for an item or tap one from the grid. Tossup shows you the correct bin, explains why, and gives a short preparation tip. If the answer depends on the item's condition, it asks you one question first. To sort a whole bag at once, use <a href="/pile">Sort a pile</a>.</p>

        <h2>The four bins</h2>
        <p>Tossup uses a four-bin system based on India-style waste segregation. Each bin has a distinct colour and a distinct shape, so colour is never the only signal.</p>

        <div class="bin-legend" role="list" aria-label="Bin categories">
          ${binLegend}
        </div>

        <h2>Rules vary by city</h2>
        <div class="legal-notice">
          <strong>Your city's rules may differ.</strong> Waste segregation categories, accepted items, and collection methods vary between municipalities. Tossup provides general guidance based on common Indian waste segregation practice. Always follow the specific instructions from your local municipal corporation or waste management authority.
        </div>

        <h2>About the data</h2>
        <p>Our item list is hand-maintained. Every entry has been written with care, but none has been formally verified against a specific city's regulations, so treat the answers as general guidance. If you spot an error or want to suggest an item, send us an email at <a href="mailto:${SUGGEST_EMAIL}">${SUGGEST_EMAIL}</a>.</p>

        <h2>No accounts, no tracking</h2>
        <p>Tossup does not require you to create an account. It does not use cookies for tracking. It stores display preferences in your browser's local storage. Read our <a href="/privacy">privacy policy</a> for the full details.</p>

        <h2>Designed for everyone</h2>
        <p>Read the reasoning behind the main choices on the <a href="/design">design decisions</a> page.</p>
        <ul>
          <li>Every page has a skip link, one clear heading, labelled landmarks, and polite announcements.</li>
          <li>Keyboard users can move through search results and browse tabs with arrow keys.</li>
          <li>Interactive controls have large touch targets and visible focus rings.</li>
          <li>Bin choices use colour, shape, and text together.</li>
          <li>Display settings let you choose a larger text size, stronger contrast, reduced motion, or a colour vision preview.</li>
          <li>Dark mode, reduced-motion support, and layouts from 320px upward are included.</li>
        </ul>
      `)}
    </main>
  `;
}
