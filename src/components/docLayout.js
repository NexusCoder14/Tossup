/**
 * Side column for text-heavy pages (About, Privacy, Terms).
 * Fills the right-hand side on wide screens with something useful:
 * an on-page contents list and a small illustrated card.
 * On narrow screens the column drops below the text.
 */

import { bins, items } from '../data/items.js';
import { getIllustration, getBinShape } from '../icons/illustrations.js';

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

const samples = [
  { slug: 'banana-peel', bin: 'wet' },
  { slug: 'glass-jar', bin: 'dry' },
  { slug: 'used-tissue', bin: 'sanitary' },
  { slug: 'battery', bin: 'special' },
];

/** Four item "stickers", each leaning at its own angle and filed under its bin. */
function stickerBoard() {
  return `
    <div class="sticker-board" aria-hidden="true">
      ${samples.map(({ slug, bin }, index) => {
        const item = items.find((entry) => entry.slug === slug);
        if (!item) return '';
        const binInfo = bins[bin];
        return `
          <div class="sticker-card" data-bin="${bin}" style="--i: ${index}">
            <span class="sticker-art">${getIllustration(slug)}</span>
            <span class="sticker-name">${escapeHtml(item.name)}</span>
            <span class="sticker-bin">${getBinShape(binInfo.shape)}${escapeHtml(binInfo.name)}</span>
          </div>`;
      }).join('')}
    </div>`;
}

const asides = {
  about: () => `
    <section class="aside-card aside-board" aria-labelledby="aside-board-title">
      <h2 id="aside-board-title" class="aside-title">One item, one bin</h2>
      ${stickerBoard()}
      <p class="aside-note">${items.length} everyday items so far, each with its own drawing.</p>
      <a class="btn btn-primary aside-cta" href="/pile">Sort a whole pile</a>
    </section>`,

  privacy: () => `
    <section class="aside-card" aria-labelledby="aside-glance-title">
      <h2 id="aside-glance-title" class="aside-title">At a glance</h2>
      <ul class="glance-list">
        <li><span class="glance-mark" data-bin="wet">${getBinShape('droplet')}</span>No account to create</li>
        <li><span class="glance-mark" data-bin="dry">${getBinShape('square')}</span>No analytics or tracking scripts</li>
        <li><span class="glance-mark" data-bin="sanitary">${getBinShape('triangle')}</span>Preferences stay in your browser</li>
        <li><span class="glance-mark" data-bin="special">${getBinShape('diamond')}</span>Emails only if you choose to send one</li>
      </ul>
    </section>`,

  terms: () => `
    <section class="aside-card aside-board" aria-labelledby="aside-rules-title">
      <h2 id="aside-rules-title" class="aside-title">Check your local rules</h2>
      ${stickerBoard()}
      <p class="aside-note">Tossup gives general guidance. Your city's rules come first.</p>
    </section>`,
};

export function docLayout(kind, articleHtml) {
  return `
    <div class="container doc-layout">
      <div class="prose doc-article">${articleHtml}</div>
      <aside class="doc-aside" aria-label="Page extras">
        ${asides[kind]()}
        <nav class="aside-card aside-toc" aria-labelledby="toc-title" hidden>
          <h2 id="toc-title" class="aside-title">On this page</h2>
          <ol class="toc-list"></ol>
        </nav>
      </aside>
    </div>`;
}

/** Builds the contents list from the page's h2 headings and marks the one being read. */
export function attachToc() {
  const nav = document.querySelector('.aside-toc');
  const list = nav?.querySelector('.toc-list');
  const headings = [...document.querySelectorAll('.doc-article h2')];
  if (!nav || !list || headings.length < 3) return;

  list.innerHTML = headings.map((heading, index) => {
    heading.id = heading.id || `section-${index + 1}`;
    heading.style.scrollMarginTop = '84px';
    return `<li><a href="#${heading.id}">${escapeHtml(heading.textContent)}</a></li>`;
  }).join('');
  nav.hidden = false;

  const links = [...list.querySelectorAll('a')];
  list.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    event.preventDefault();
    const target = document.getElementById(link.getAttribute('href').slice(1));
    const reduce = document.documentElement.hasAttribute('data-reduce-motion')
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    target?.setAttribute('tabindex', '-1');
    target?.focus({ preventScroll: true });
  });

  // Mark the last heading that has reached the top of the screen
  let queued = false;
  const update = () => {
    queued = false;
    if (!nav.isConnected) {
      window.removeEventListener('scroll', onScroll);
      return;
    }
    let current = headings[0];
    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= 120) current = heading;
    });
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  function onScroll() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}
