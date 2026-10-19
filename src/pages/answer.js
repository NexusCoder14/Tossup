/**
 * Answer page: full-screen coloured view showing which bin an item goes in.
 */

import { bins, items, getItemBySlug } from '../data/items.js';
import { getIllustration, getBinShape } from '../icons/illustrations.js';
import { renderSearchField, attachSearchFieldEvents, recordRecentItem, escapeHtml } from './home.js';
import { navigate } from '../router.js';
import { renderFooter, attachHeaderEvents, renderDisplayMenu } from '../components/layout.js';
import { SUGGEST_EMAIL } from '../config.js';

const backArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
const shareIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>';
const arrowRight = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

function optionKey(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getSelectedOption(item, state) {
  if (!item.ask || !state) return null;
  return item.ask.options.find((option) => optionKey(option.label) === state) || null;
}

function relatedItems(item, binKey) {
  const sameBin = items.filter((entry) => entry.slug !== item.slug && entry.bin === binKey);
  const sameRoom = sameBin.filter((entry) => entry.room === item.room);
  const rest = sameBin.filter((entry) => entry.room !== item.room);
  return [...sameRoom, ...rest].slice(0, 5);
}

export function renderAnswer(slug, state = '') {
  const item = getItemBySlug(slug);

  if (!item) {
    return renderNotFoundItem(slug);
  }
  recordRecentItem(item);

  const selectedOption = getSelectedOption(item, state);
  if (item.ask && !selectedOption) {
    return renderDecision(item);
  }

  const answer = selectedOption || item;
  const bin = bins[answer.bin];
  const illustrationVariant = selectedOption && /greasy|food-soiled/i.test(selectedOption.label) ? 'greasy' : '';
  document.title = `${item.name} goes in ${bin.name} | Tossup`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${item.name} goes in the ${bin.name} bin. ${answer.reason}`);
  }

  const related = relatedItems(item, answer.bin);

  return `
    <div class="answer-screen" data-bin="${answer.bin}">
      <a href="#main-content" class="skip-link">Skip to content</a>
      <div class="answer-bg-shape" aria-hidden="true">${getBinShape(bin.shape)}</div>
      <header class="answer-header" aria-label="Answer controls">
        <a href="/" class="answer-back" aria-label="Back to search">
          ${backArrow}
          <span>Back</span>
        </a>
        <div class="answer-header-actions">
          ${renderDisplayMenu()}
          <button type="button" class="answer-share" id="share-btn" aria-label="Share this answer">
            ${shareIcon}
            <span>Share</span>
          </button>
        </div>
      </header>
      <main id="main-content" class="answer-main" aria-label="Answer: ${escapeHtml(item.name)} goes in the ${escapeHtml(bin.name)} bin">
        <div class="answer-sticker" aria-hidden="true">
          <div class="answer-item-illustration">${getIllustration(item.slug, illustrationVariant)}</div>
        </div>
        <div class="answer-content">
          <div class="answer-bin-heading">
            <div class="answer-bin-shape" aria-hidden="true">${getBinShape(bin.shape)}</div>
            <h1 class="answer-bin-name" tabindex="-1">${escapeHtml(bin.name)}</h1>
          </div>
          <p class="answer-item-name answer-staged answer-staged-name">${escapeHtml(item.name)}${selectedOption ? `<span class="answer-condition">${escapeHtml(selectedOption.label)}</span>` : ''}</p>
          <p class="answer-reason answer-staged answer-staged-reason">${escapeHtml(answer.reason)}</p>
          <div class="answer-tip answer-staged answer-staged-tip">
            <p class="answer-tip-label">Before you toss it</p>
            <p class="answer-tip-text">${escapeHtml(answer.tip)}</p>
          </div>
        </div>
        <div class="answer-next">
          ${renderSearchField('Sort another item')}
          <div class="answer-links">
            <a href="/pile" class="answer-all-items">Sort a whole pile</a>
            <a href="/" class="answer-all-items">Browse all items</a>
            ${item.ask ? `<a href="/item/${item.slug}" class="answer-change">Change answer</a>` : ''}
          </div>
          ${related.length ? `
            <section class="related" aria-labelledby="related-heading">
              <h2 id="related-heading" class="related-heading">Also goes in ${escapeHtml(bin.name)}</h2>
              <ul class="related-list">
                ${related.map((entry) => `<li><a class="related-chip" href="/item/${entry.slug}"><span class="related-icon">${getIllustration(entry.slug)}</span>${escapeHtml(entry.name)}</a></li>`).join('')}
              </ul>
            </section>` : ''}
        </div>
      </main>
      ${renderFooter({ includeThemeToggle: true })}
    </div>
    <div id="live-region" class="live-region" aria-live="polite" aria-atomic="true"></div>
  `;
}

function renderDecision(item) {
  document.title = `${item.name} | Tossup`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `Choose the condition of your ${item.name.toLowerCase()} to find the right bin.`);
  }

  return `
    <div class="decision-screen">
      <a href="#main-content" class="skip-link">Skip to content</a>
      <header class="answer-header decision-header" aria-label="Decision controls">
        <a href="/" class="answer-back" aria-label="Back to search">
          ${backArrow}
          <span>Back</span>
        </a>
      </header>
      <main id="main-content" class="decision-main" aria-label="Choose the condition of ${escapeHtml(item.name)}">
        <div class="decision-content">
          <div class="decision-item-illustration" aria-hidden="true">${getIllustration(item.slug)}</div>
          <p class="decision-kicker">${escapeHtml(item.name)}: one quick question</p>
          <h1 class="decision-question">${escapeHtml(item.ask.question)}</h1>
          <div class="decision-options" role="group" aria-label="${escapeHtml(item.ask.question)}">
            ${item.ask.options.map((option) => `
              <button type="button" class="decision-option" data-state="${optionKey(option.label)}">
                <span>${escapeHtml(option.label)}</span>
                ${arrowRight}
              </button>
            `).join('')}
          </div>
        </div>
      </main>
      ${renderFooter({ includeThemeToggle: true })}
    </div>
    <div id="live-region" class="live-region" aria-live="polite" aria-atomic="true"></div>
  `;
}

function renderNotFoundItem(slug) {
  const displayName = slug.replace(/-/g, ' ');
  const subject = encodeURIComponent('Tossup item suggestion: ' + displayName);
  const body = encodeURIComponent('Hi, I looked for "' + displayName + '" on Tossup but it was not listed. Could you add it?');

  document.title = 'Item not found | Tossup';
  const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement('meta'));
  robots.name = 'robots';
  robots.content = 'noindex, nofollow';

  return `
    <main id="main-content" class="page-content" aria-label="Item not found">
      <div class="container">
        <div class="not-found">
          <h1>We don't have that item yet.</h1>
          <p>We could not find "${escapeHtml(displayName)}" in our list. Our list is hand-maintained and still growing.</p>
          <p class="not-found-action">
            <a class="btn btn-primary" href="mailto:${SUGGEST_EMAIL}?subject=${subject}&body=${body}">Suggest this item</a>
          </p>
          <p><a href="/">Back to search</a></p>
        </div>
      </div>
    </main>
  `;
}

export function attachAnswerEvents() {
  const decisionScreen = document.querySelector('.decision-screen');
  if (decisionScreen) {
    attachHeaderEvents();
    const itemSlug = window.location.pathname.split('/').pop();
    const decisionHeading = decisionScreen.querySelector('.decision-question');
    if (decisionHeading) {
      decisionHeading.setAttribute('tabindex', '-1');
      decisionHeading.focus();
    }
    decisionScreen.querySelectorAll('.decision-option').forEach((button) => {
      button.addEventListener('click', () => {
        const state = button.getAttribute('data-state');
        if (!state) return;
        const item = getItemBySlug(itemSlug);
        const option = item?.ask?.options.find((entry) => optionKey(entry.label) === state);
        const reduceMotion = document.documentElement.hasAttribute('data-reduce-motion')
          || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        button.classList.add('decision-option-chosen');
        decisionScreen.classList.add('decision-transitioning');
        if (option) decisionScreen.style.setProperty('--choice-color', bins[option.bin].surface);
        const go = () => navigate(`/item/${itemSlug}?state=${encodeURIComponent(state)}`, button);
        if (reduceMotion) go();
        else window.setTimeout(go, 180);
      });
    });
    return;
  }

  attachHeaderEvents();
  attachSearchFieldEvents({ onSubmit: (slug, source) => navigate('/item/' + slug, source) });
  const heading = document.querySelector('.answer-bin-name');
  if (heading) heading.focus();

  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      const title = document.title;

      if (navigator.share) {
        try {
          await navigator.share({ title, url });
        } catch {
          // User cancelled or share failed, nothing to do
        }
      } else if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(url);
          shareBtn.querySelector('span').textContent = 'Copied';
          setTimeout(() => {
            shareBtn.querySelector('span').textContent = 'Share';
          }, 2000);
        } catch {
          // Clipboard not available, nothing to do
        }
      }
    });
  }

  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    const answerScreen = document.querySelector('.answer-screen');
    if (answerScreen) {
      const binName = answerScreen.querySelector('.answer-bin-name');
      const itemName = answerScreen.querySelector('.answer-item-name');
      if (binName && itemName) {
        liveRegion.textContent = `${itemName.firstChild.textContent} goes in the ${binName.textContent} bin.`;
      }
    }
  }
}
