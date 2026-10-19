/**
 * Tossup: main entry point.
 * Wires up the router, renders the shell, and delegates to page modules.
 */

import './style.css';
import { route, notFound, startRouter } from './router.js';
import { initTheme, renderHeader, renderFooter, attachHeaderEvents } from './components/layout.js';
import { renderHome, attachHomeEvents } from './pages/home.js';
import { renderAnswer, attachAnswerEvents } from './pages/answer.js';
import { renderAbout } from './pages/about.js';
import { renderPrivacy } from './pages/privacy.js';
import { renderTerms } from './pages/terms.js';
import { renderNotFound } from './pages/notfound.js';
import { renderBins } from './pages/bins.js';
import { renderPile, attachPileEvents } from './pages/pile.js';
import { renderDesign } from './pages/design.js';
import { attachToc } from './components/docLayout.js';

// Initialise theme before first paint
initTheme();

const app = document.getElementById('app');

/**
 * Render a standard page (with header and footer).
 */
function renderPage(contentFn) {
  document.querySelector('meta[name="robots"]')?.remove();
  app.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to content</a>
    ${renderHeader()}
    ${typeof contentFn === 'function' ? contentFn() : contentFn}
    ${renderFooter()}
    <div id="live-region" class="live-region" aria-live="polite" aria-atomic="true"></div>
  `;
  attachHeaderEvents();
  window.scrollTo(0, 0);
  const heading = document.querySelector('#main-content h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
}

/**
 * Render the answer page (full-screen, no standard header/footer).
 */
function renderAnswerPage(slug, state) {
  document.querySelector('meta[name="robots"]')?.remove();
  const content = renderAnswer(slug, state);
  // If it is a not-found item, render with standard layout
  if (content.includes('page-content')) {
    renderPage(content);
  } else {
    app.innerHTML = content;
    window.scrollTo(0, 0);
  }
  attachAnswerEvents();
}

// Register routes
route('/', () => {
  document.title = 'Tossup: which bin does it go in?';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Type in what you are throwing away and find out which bin it belongs in. A quick reference for Indian household waste segregation.');
  }
  renderPage(renderHome);
  attachHomeEvents();
});

route('/item/:slug', ({ slug }) => {
  const state = new URLSearchParams(window.location.search).get('state') || '';
  renderAnswerPage(slug, state);
});

route('/about', () => {
  renderPage(renderAbout);
  attachToc();
});

route('/bins', () => {
  renderPage(renderBins);
});

route('/pile', () => {
  renderPage(renderPile);
  attachPileEvents();
});

route('/design', () => {
  renderPage(renderDesign);
});

route('/privacy', () => {
  renderPage(renderPrivacy);
  attachToc();
});

route('/terms', () => {
  renderPage(renderTerms);
  attachToc();
});

notFound(() => {
  renderPage(renderNotFound);
});

// Start routing
startRouter();

// Offline support: the app is static, so once visited it can open without a connection.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Offline support is optional; the app works without it.
    });
  });
}

// Press / to jump to search, unless you are already typing somewhere.
document.addEventListener('keydown', (event) => {
  if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
  const input = document.getElementById('search-input');
  if (!input) return;
  event.preventDefault();
  input.focus();
});
