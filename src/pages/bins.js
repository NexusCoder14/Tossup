import { bins, items } from '../data/items.js';
import { getBinShape, getIllustration } from '../icons/illustrations.js';

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

export function renderBins() {
  document.title = 'The four bins | Tossup';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'The four bins used by Tossup: Wet, Dry, Sanitary and Special drop-off, each with its own colour, shape and label.');
  }
  return `
    <main id="main-content" class="page-content bins-page" aria-label="The four bins">
      <div class="container">
        <h1>The four bins</h1>
        <p class="page-intro">Each bin has its own colour, shape and word, so you never have to rely on colour alone.</p>
        <div class="bins-reference-grid">
          ${Object.entries(bins).map(([key, bin]) => {
            const list = items.filter((item) => item.bin === key);
            return `
              <article class="bin-reference-card" data-bin="${key}" aria-labelledby="bin-ref-${key}">
                <div class="bin-reference-heading">
                  <span class="bin-reference-shape" aria-hidden="true">${getBinShape(bin.shape)}</span>
                  <h2 id="bin-ref-${key}">${escapeHtml(bin.name)}</h2>
                </div>
                <p class="bin-reference-desc">${escapeHtml(bin.description)}</p>
                <h3>Examples</h3>
                <ul class="bin-reference-examples">
                  ${list.slice(0, 6).map((item) => `<li><a class="related-chip" href="/item/${item.slug}"><span class="related-icon">${getIllustration(item.slug)}</span>${escapeHtml(item.name)}</a></li>`).join('')}
                </ul>
              </article>`;
          }).join('')}
        </div>
      </div>
    </main>
  `;
}
