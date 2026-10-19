/**
 * Home page: search, recent items, and three browse views.
 */

import { items, bins, searchItems, getSearchSuggestions } from '../data/items.js';
import { getIllustration, getBinShape } from '../icons/illustrations.js';
import { navigate } from '../router.js';
import { SUGGEST_EMAIL } from '../config.js';

const searchIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
const clearIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const recentStorageKey = 'tossup-recent-items';
const rooms = ['Kitchen', 'Bathroom', 'Desk and school', 'Electronics', 'Packaging'];
const commonSlugs = ['banana-peel', 'tea-bag', 'plastic-bottle', 'pizza-box', 'chip-packet', 'used-tissue', 'battery', 'newspaper'];
let lastQuery = '';
let selectedIndex = -1;

export function setLastQuery(query) {
  lastQuery = query;
}

export function getLastQuery() {
  return lastQuery;
}

export function recordRecentItem(item) {
  try {
    const previous = JSON.parse(localStorage.getItem(recentStorageKey) || '[]');
    localStorage.setItem(recentStorageKey, JSON.stringify([item.slug, ...previous.filter((slug) => slug !== item.slug)].slice(0, 4)));
  } catch {
    // Recent history is optional.
  }
}

function getRecentItems() {
  try {
    const slugs = JSON.parse(localStorage.getItem(recentStorageKey) || '[]');
    return slugs.map((slug) => items.find((item) => item.slug === slug)).filter(Boolean);
  } catch {
    return [];
  }
}

export function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function buildResultItem(item, index = -1) {
  const bin = bins[item.bin];
  return `
    <a href="/item/${item.slug}" id="search-result-${item.slug}" class="search-result-item${index === 0 ? ' top-result' : ''}" role="option" aria-selected="${index === 0 ? 'true' : 'false'}" data-slug="${item.slug}" data-bin="${item.bin}">
      <span class="search-result-icon">${getIllustration(item.slug)}</span>
      <span class="search-result-name">${escapeHtml(item.name)}</span>
      <span class="search-result-bin">${getBinShape(bin.shape)}${escapeHtml(bin.name)}</span>
    </a>
  `;
}

export function buildItemTile(item) {
  const bin = bins[item.bin];
  return `
    <a href="/item/${item.slug}" class="item-tile" data-bin="${item.bin}" aria-label="${escapeHtml(item.name)}, goes in ${escapeHtml(bin.name)}">
      <span class="item-tile-icon">${getIllustration(item.slug)}</span>
      <span class="item-tile-name">${escapeHtml(item.name)}</span>
      <span class="item-tile-bin">${getBinShape(bin.shape)}${escapeHtml(bin.name)}</span>
    </a>
  `;
}

function buildItemGrid(list) {
  return list.map(buildItemTile).join('');
}

function buildNoResults(query) {
  const subject = encodeURIComponent('Tossup item suggestion: ' + query);
  const suggestions = getSearchSuggestions(query);
  return `<div class="search-no-results"><p class="no-results-title">We don't have that item yet.</p>${suggestions.length ? `<p class="search-suggestions-label">Did you mean</p><div class="search-suggestions">${suggestions.map(buildResultItem).join('')}</div>` : ''}<p><a href="mailto:${SUGGEST_EMAIL}?subject=${subject}">Suggest this item</a></p></div>`;
}

export function renderSearchField(label = 'What are you throwing away?', hideLabel = false) {
  return `
    <div class="search-wrapper">
      <label for="search-input" class="search-label${hideLabel ? ' sr-only' : ''}">${label}</label>
      <div class="search-input-wrapper">
        <span class="search-icon" aria-hidden="true">${searchIconSvg}</span>
        <input type="search" id="search-input" class="search-input" placeholder="Type an item name" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list" />
        <button type="button" id="search-clear" class="search-clear" aria-label="Clear search">${clearIconSvg}</button>
        <div id="search-results" class="search-results" role="listbox" aria-label="Search results"></div>
      </div>
    </div>
  `;
}

function renderRecent() {
  const recent = getRecentItems();
  if (!recent.length) return '';
  return `<section class="recent-section" aria-labelledby="recent-heading"><div class="section-heading-row"><h2 id="recent-heading">Recently looked up</h2><button type="button" class="text-button" id="clear-recent">Clear</button></div><div class="item-grid recent-grid">${buildItemGrid(recent)}</div></section>`;
}

function renderBinCards() {
  return Object.entries(bins).map(([key, bin], index) => `
    <button type="button" class="filter-card bin-filter-card" data-bin="${key}" aria-pressed="${index === 0 ? 'true' : 'false'}">
      <span class="filter-card-shape">${getBinShape(bin.shape)}</span>
      <strong>${escapeHtml(bin.name)}</strong>
      <span class="filter-card-desc">${escapeHtml(bin.description)}</span>
    </button>
  `).join('');
}

function renderBinItems(binKey) {
  const bin = bins[binKey];
  const list = items.filter((item) => item.bin === binKey);
  return `<p class="bin-selected-description">${escapeHtml(bin.name)}: ${escapeHtml(bin.description)}. ${list.length} items listed.</p><div class="item-grid">${buildItemGrid(list)}</div>`;
}

function renderRoomItems(room) {
  const list = items.filter((item) => item.room === room);
  return `<p class="bin-selected-description">${escapeHtml(room)}: ${list.length} items listed.</p><div class="item-grid">${buildItemGrid(list)}</div>`;
}

function renderHeroArt() {
  return `
    <div class="hero-art" aria-hidden="true">
      <span class="art-shape art-wet">${getBinShape('droplet')}</span>
      <span class="art-shape art-dry">${getBinShape('square')}</span>
      <span class="art-shape art-sanitary">${getBinShape('triangle')}</span>
      <span class="art-shape art-special">${getBinShape('diamond')}</span>
    </div>
  `;
}

export function renderHome() {
  const common = commonSlugs.map((slug) => items.find((item) => item.slug === slug)).filter(Boolean);
  return `
    <main id="main-content" class="page-content home" aria-label="Search and browse items">
      <section class="hero" aria-label="Search">
        ${renderHeroArt()}
        <div class="container hero-inner">
          <h1 class="home-title">What are you throwing away?</h1>
          <p class="hero-sub">Type one item to see which bin it goes in, why, and what to do first.</p>
          ${renderSearchField('Search for an item', true)}
          <div class="hero-actions">
            <a class="btn btn-primary" href="/pile">Sort a whole pile</a>
            <a class="btn btn-outline" href="/bins">See the four bins</a>
          </div>
        </div>
      </section>
      <div class="container home-container">
        ${renderRecent()}
        <section class="browse-section" aria-labelledby="browse-heading">
          <h2 id="browse-heading" class="sr-only">Browse items</h2>
          <div class="view-tabs" style="--tab-index: 0" role="tablist" aria-label="Browse items by">
            <button type="button" role="tab" aria-selected="true" aria-controls="view-common" id="tab-common" tabindex="0" data-view="common">Common</button>
            <button type="button" role="tab" aria-selected="false" aria-controls="view-room" id="tab-room" tabindex="-1" data-view="room">By room</button>
            <button type="button" role="tab" aria-selected="false" aria-controls="view-bin" id="tab-bin" tabindex="-1" data-view="bin">By bin</button>
          </div>
          <div class="tab-panel" id="view-common" role="tabpanel" aria-labelledby="tab-common"><nav class="item-grid" aria-label="Common items">${buildItemGrid(common)}</nav></div>
          <div class="tab-panel" id="view-room" role="tabpanel" aria-labelledby="tab-room" hidden>
            <div class="filter-grid room-grid" role="group" aria-label="Rooms">${rooms.map((room, index) => `<button type="button" class="filter-card room-card" data-room="${room}" aria-pressed="${index === 0 ? 'true' : 'false'}">${room}</button>`).join('')}</div>
            <div id="room-items" class="tab-items" aria-live="polite">${renderRoomItems(rooms[0])}</div>
          </div>
          <div class="tab-panel" id="view-bin" role="tabpanel" aria-labelledby="tab-bin" hidden>
            <div class="filter-grid bin-filter-grid" role="group" aria-label="Bins">${renderBinCards()}</div>
            <div id="bin-items" class="tab-items" aria-live="polite">${renderBinItems('wet')}</div>
          </div>
        </section>
      </div>
    </main>
  `;
}

export function attachHomeEvents() {
  attachSearchFieldEvents({ onSubmit: (slug, source) => navigate('/item/' + slug, source), restoreQuery: lastQuery });
  attachBrowseEvents();
  document.getElementById('clear-recent')?.addEventListener('click', () => {
    try { localStorage.removeItem(recentStorageKey); } catch { /* Optional history. */ }
    document.querySelector('.recent-section')?.remove();
  });
}

function setPressed(buttons, active) {
  buttons.forEach((button) => button.setAttribute('aria-pressed', button === active ? 'true' : 'false'));
}

function attachBrowseEvents() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];
  const showView = (view) => {
    const activeIndex = tabs.findIndex((tab) => tab.dataset.view === view);
    document.querySelector('.view-tabs')?.style.setProperty('--tab-index', String(Math.max(activeIndex, 0)));
    tabs.forEach((tab) => { const active = tab.dataset.view === view; tab.setAttribute('aria-selected', active ? 'true' : 'false'); tab.tabIndex = active ? 0 : -1; });
    panels.forEach((panel) => { panel.hidden = panel.id !== `view-${view}`; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showView(tab.dataset.view));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      showView(tabs[next].dataset.view);
    });
  });
  const roomButtons = [...document.querySelectorAll('[data-room]')];
  roomButtons.forEach((button) => button.addEventListener('click', () => {
    setPressed(roomButtons, button);
    document.getElementById('room-items').innerHTML = renderRoomItems(button.dataset.room);
  }));
  const binButtons = [...document.querySelectorAll('.bin-filter-card')];
  binButtons.forEach((button) => button.addEventListener('click', () => {
    setPressed(binButtons, button);
    document.getElementById('bin-items').innerHTML = renderBinItems(button.dataset.bin);
  }));
}

export function attachSearchFieldEvents({ onSubmit, restoreQuery = '' } = {}) {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const clearBtn = document.getElementById('search-clear');
  const hero = document.querySelector('.hero');
  const searchWrapper = input?.closest('.search-wrapper');
  if (!input || !results) return;
  let resultsOpen = results.classList.contains('open');
  const resultsObserver = new MutationObserver(() => {
    const isOpen = results.classList.contains('open');
    hero?.classList.toggle('is-searching', isOpen);
    if (!resultsOpen && isOpen && window.matchMedia('(max-width: 699px)').matches) {
      window.setTimeout(() => {
        if (!results.classList.contains('open') || !searchWrapper) return;
        if (searchWrapper.getBoundingClientRect().top <= 140) return;
        const reduceMotion = document.documentElement.hasAttribute('data-reduce-motion')
          || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        searchWrapper.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      }, 400);
    }
    resultsOpen = isOpen;
  });
  resultsObserver.observe(results, { attributes: true, attributeFilter: ['class'] });
  if (restoreQuery) {
    input.value = restoreQuery;
    clearBtn.classList.add('visible');
    showResults(restoreQuery, input, results);
  }
  input.addEventListener('input', () => {
    lastQuery = input.value;
    selectedIndex = -1;
    clearBtn.classList.toggle('visible', input.value.length > 0);
    showResults(input.value, input, results);
  });
  clearBtn.addEventListener('click', () => {
    input.value = '';
    lastQuery = '';
    selectedIndex = -1;
    clearBtn.classList.remove('visible');
    results.classList.remove('open');
    results.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    input.focus();
  });
  input.addEventListener('keydown', (event) => {
    const resultItems = results.querySelectorAll('.search-result-item');
    if (!resultItems.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, resultItems.length - 1);
      updateSelection(resultItems);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(resultItems);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = resultItems[selectedIndex >= 0 ? selectedIndex : 0];
      if (item && onSubmit) onSubmit(item.dataset.slug, item);
    } else if (event.key === 'Escape') {
      results.classList.remove('open');
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      selectedIndex = -1;
    }
  });
}

function showResults(query, input, results) {
  if (!query.trim()) {
    results.classList.remove('open');
    results.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    return;
  }
  const matches = searchItems(query);
  results.innerHTML = matches.length ? matches.map((item, index) => buildResultItem(item, index)).join('') : buildNoResults(query);
  results.classList.add('open');
  input.setAttribute('aria-expanded', 'true');
  if (matches.length) input.setAttribute('aria-activedescendant', `search-result-${matches[0].slug}`);
  else input.removeAttribute('aria-activedescendant');
}

function updateSelection(resultItems) {
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  resultItems.forEach((item, index) => item.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false'));
  const input = document.getElementById('search-input');
  input?.setAttribute('aria-activedescendant', resultItems[activeIndex].id);
  resultItems[activeIndex].scrollIntoView({ block: 'nearest' });
}
