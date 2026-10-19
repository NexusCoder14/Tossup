/**
 * Design decisions: the reasoning behind the main choices, with small
 * before and after sketches drawn in HTML and CSS.
 */

import { bins } from '../data/items.js';
import { getBinShape } from '../icons/illustrations.js';

const lines = (count, className = '') => Array.from({ length: count }, () => `<span class="mock-line ${className}"></span>`).join('');

const binChip = (key, { withShape = true, withLabel = true } = {}) => `
  <span class="mock-chip" data-bin="${key}">
    ${withShape ? `<span class="mock-chip-shape">${getBinShape(bins[key].shape)}</span>` : ''}
    ${withLabel ? `<span class="mock-chip-label">${bins[key].name === 'Special drop-off' ? 'Special' : bins[key].name}</span>` : ''}
  </span>`;

const mocks = {
  fill: {
    before: `<div class="mock-screen">${lines(1, 'mock-title')}<div class="mock-result-row"><span class="mock-small">Banana peel</span><span class="mock-small mock-tag">Wet</span></div>${lines(3)}</div>`,
    after: `<div class="mock-screen mock-filled" data-bin="wet"><span class="mock-big">Wet</span><span class="mock-sub">Banana peel</span><span class="mock-note"></span></div>`,
  },
  signals: {
    before: `<div class="mock-screen mock-chips">${['wet', 'dry', 'sanitary', 'special'].map((key) => binChip(key, { withShape: false, withLabel: false })).join('')}</div>`,
    after: `<div class="mock-screen mock-chips">${['wet', 'dry', 'sanitary', 'special'].map((key) => binChip(key)).join('')}</div>`,
  },
  ask: {
    before: `<div class="mock-screen"><span class="mock-small">Pizza box</span><span class="mock-vague">It depends.</span>${lines(2)}</div>`,
    after: `<div class="mock-screen"><span class="mock-question">What condition is the pizza box in?</span><span class="mock-button">Clean or lightly marked</span><span class="mock-button">Greasy or food-soiled</span></div>`,
  },
  honest: {
    before: `<div class="mock-screen"><span class="mock-small">Plastik botel</span><span class="mock-guess">Closest match: Glass bottle</span>${lines(2)}</div>`,
    after: `<div class="mock-screen"><span class="mock-question">We don't have that item yet.</span><span class="mock-link">Suggest this item</span></div>`,
  },
  pile: {
    before: `<div class="mock-screen"><span class="mock-small">Banana peel: Wet</span><span class="mock-small">Search again</span><span class="mock-small">Chip packet: Dry</span><span class="mock-small">Search again</span></div>`,
    after: `<div class="mock-screen mock-pile">${['wet', 'dry', 'sanitary', 'special'].map((key) => `<span class="mock-pile-cell" data-bin="${key}"><span class="mock-chip-shape">${getBinShape(bins[key].shape)}</span></span>`).join('')}</div>`,
  },
};

const decisions = [
  {
    key: 'fill',
    title: 'The answer fills the whole screen',
    decision: 'When you choose an item, the screen turns the colour of its bin and the bin name appears in very large type.',
    reason: 'People look things up with a bag in one hand and the bins a few steps away. A full-screen colour and one large word can be read at arm\'s length, before any of the small print.',
  },
  {
    key: 'signals',
    title: 'Every bin has a colour, a shape and a word',
    decision: 'Wet is a green droplet, Dry a blue square, Sanitary a red triangle, and Special drop-off an orange diamond.',
    reason: 'Colour alone fails people with colour vision differences, and anyone standing in front of a faded bin. Shapes and words keep the answer readable. The Display menu has a colour vision preview so you can check this yourself.',
  },
  {
    key: 'ask',
    title: 'We ask when the answer depends on condition',
    decision: 'A clean pizza box and a greasy one go in different bins, so Tossup asks one question with two large buttons before it answers.',
    reason: 'An answer such as "it depends" sends the person away with nothing. One quick question gets a definite answer and teaches the rule at the same time.',
  },
  {
    key: 'honest',
    title: 'We say when we do not know',
    decision: 'If an item is not in the list, Tossup says so plainly and offers a way to suggest it.',
    reason: 'A wrong answer contaminates a bin and costs trust. "We don\'t have that item yet" is more useful than a confident guess.',
  },
  {
    key: 'pile',
    title: 'People throw away many things at once',
    decision: 'Sort a pile files a whole list into the four bins in one go, and asks only about the items it is unsure of.',
    reason: 'Real sorting happens over a bag or a bin, not one item at a time. A single pass respects that, and the printable list can go on the kitchen wall.',
  },
];

export function renderDesign() {
  document.title = 'Design decisions | Tossup';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'The choices behind Tossup and the reasons for them: full-screen answers, shape and colour together, honest uncertainty, and sorting a whole pile.');
  }
  return `
    <main id="main-content" class="page-content design-page" aria-label="Design decisions">
      <div class="container">
        <h1>Design decisions</h1>
        <p class="page-intro">Five choices that shape Tossup, and the reason behind each. The small sketches show the idea, not the exact screens.</p>
        <div class="decision-cards">
          ${decisions.map((entry, index) => `
            <article class="decision-card" aria-labelledby="decision-${entry.key}">
              <p class="decision-number" aria-hidden="true">${index + 1}</p>
              <div class="decision-copy">
                <h2 id="decision-${entry.key}">${entry.title}</h2>
                <p><strong>What we did.</strong> ${entry.decision}</p>
                <p><strong>Why.</strong> ${entry.reason}</p>
              </div>
              <div class="mock-pair" aria-hidden="true">
                <figure class="mock-col"><div class="mock mock-before">${mocks[entry.key].before}</div><figcaption>Before</figcaption></figure>
                <figure class="mock-col"><div class="mock mock-after">${mocks[entry.key].after}</div><figcaption>After</figcaption></figure>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </main>
  `;
}
