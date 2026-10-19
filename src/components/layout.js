/**
 * Shared layout components: header, footer, display menu, and theme toggle.
 */

const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

/* The mark is the four bin shapes in a 2 by 2 grid, each in its bin colour. */
const logoMark = '<svg class="logo-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" aria-hidden="true" focusable="false">' +
  '<path class="mark-wet" d="M7 2C7 2 2.5 7.5 2.5 10.2a4.5 4.5 0 009 0C11.5 7.5 7 2 7 2z"/>' +
  '<rect class="mark-dry" x="16.5" y="2.5" width="9" height="9" rx="1.6"/>' +
  '<polygon class="mark-sanitary" points="7,16.5 11.8,25.5 2.2,25.5"/>' +
  '<polygon class="mark-special" points="21,16 25.8,20.8 21,25.6 16.2,20.8"/>' +
  '</svg>';

const displayStorageKey = 'tossup-display';
const colourVisionModes = ['off', 'protanopia', 'deuteranopia', 'tritanopia'];

function getDisplaySettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(displayStorageKey) || '{}');
    return stored && typeof stored === 'object' ? stored : {};
  } catch {
    return {};
  }
}

function saveDisplaySettings(settings) {
  try {
    localStorage.setItem(displayStorageKey, JSON.stringify(settings));
  } catch {
    // Display preferences are optional.
  }
}

function applyDisplaySettings(settings) {
  const root = document.documentElement;
  const textSize = ['default', 'large', 'larger'].includes(settings.textSize) ? settings.textSize : 'default';
  root.dataset.textSize = textSize;
  root.toggleAttribute('data-high-contrast', settings.highContrast === true);
  root.toggleAttribute('data-reduce-motion', settings.reduceMotion === true);
  if (colourVisionModes.includes(settings.colourVision) && settings.colourVision !== 'off') {
    root.dataset.colourVision = settings.colourVision;
  } else {
    delete root.dataset.colourVision;
  }
}

/**
 * SVG filters used only by the colour vision preview. The matrices simulate
 * protanopia, deuteranopia and tritanopia (Machado, Oliveira and Fernandes, 2009).
 */
function ensureColourVisionFilters() {
  if (document.getElementById('colour-vision-filters')) return;
  const holder = document.createElement('div');
  holder.id = 'colour-vision-filters';
  holder.setAttribute('aria-hidden', 'true');
  holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  holder.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" focusable="false">
      <filter id="cv-protanopia" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0"/></filter>
      <filter id="cv-deuteranopia" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0"/></filter>
      <filter id="cv-tritanopia" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0"/></filter>
    </svg>`;
  document.body.appendChild(holder);
}

/**
 * Initialise the theme from localStorage or system preference.
 */
export function initTheme() {
  let saved = '';
  try {
    saved = localStorage.getItem('tossup-theme');
  } catch {
    // Use the system preference when storage is unavailable.
  }
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  applyDisplaySettings(getDisplaySettings());
  ensureColourVisionFilters();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('tossup-theme', next);
  } catch {
    // Theme preference is optional.
  }
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = isDark ? sunIcon : moonIcon;
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function renderThemeButton() {
  return `<button type="button" id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">${moonIcon}</button>`;
}

/**
 * The menu holds the page links (on phones) and the display settings.
 * Pass withLinks: false where the page already shows its own navigation.
 */
export function renderMenu({ withLinks = true } = {}) {
  return `
    <div class="menu-wrap">
      <button type="button" id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="menu-panel">
        ${withLinks ? '<span class="menu-label-compact">Menu</span><span class="menu-label-wide">Display</span>' : '<span>Display</span>'}
      </button>
      <div id="menu-panel" class="menu-panel" hidden>
        ${withLinks ? `
          <nav class="menu-links" aria-label="Pages">
            <a href="/pile">Sort a pile</a>
            <a href="/bins">The four bins</a>
            <a href="/design">Design decisions</a>
            <a href="/about">About</a>
          </nav>` : ''}
        <div class="menu-settings">
          <p class="menu-heading">Display</p>
          <fieldset>
            <legend>Text size</legend>
            <label><input type="radio" name="text-size" value="default"> Default</label>
            <label><input type="radio" name="text-size" value="large"> Large</label>
            <label><input type="radio" name="text-size" value="larger"> Larger</label>
          </fieldset>
          <label class="display-checkbox"><input type="checkbox" id="high-contrast"> High contrast</label>
          <label class="display-checkbox"><input type="checkbox" id="reduce-motion"> Reduce motion</label>
          <fieldset>
            <legend>Colour vision preview</legend>
            <label><input type="radio" name="colour-vision" value="off"> Off</label>
            <label><input type="radio" name="colour-vision" value="protanopia"> Protanopia</label>
            <label><input type="radio" name="colour-vision" value="deuteranopia"> Deuteranopia</label>
            <label><input type="radio" name="colour-vision" value="tritanopia"> Tritanopia</label>
            <p class="menu-note">A preview aid only. Every bin also has its own shape and label.</p>
          </fieldset>
        </div>
      </div>
    </div>
  `;
}

export function renderDisplayMenu() {
  return renderMenu({ withLinks: false });
}

/**
 * Render the site header.
 */
export function renderHeader() {
  return `
    <div class="bin-stripe" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
    <header class="site-header" aria-label="Site header">
      <div class="container header-inner">
        <a href="/" class="site-logo" aria-label="Tossup, go to home page">${logoMark}<span class="logo-text">Tossup</span></a>
        <div class="header-actions">
          <nav class="header-nav" aria-label="Primary navigation">
            <a href="/pile" class="header-link">Sort a pile</a>
            <a href="/bins" class="header-link">Bins</a>
            <a href="/about" class="header-link">About</a>
          </nav>
          ${renderMenu({ withLinks: true })}
          ${renderThemeButton()}
        </div>
      </div>
    </header>
  `;
}

/**
 * Render the site footer.
 */
export function renderFooter({ includeThemeToggle = false } = {}) {
  return `
    <footer class="site-footer" aria-label="Site footer">
      <div class="bin-stripe" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="container">
        <div class="footer-content">
          <nav aria-label="Footer links">
            <ul class="footer-links">
              <li><a href="/pile">Sort a pile</a></li>
              <li><a href="/bins">The four bins</a></li>
              <li><a href="/design">Design decisions</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/privacy">Privacy policy</a></li>
              <li><a href="/terms">Terms and conditions</a></li>
            </ul>
          </nav>
          <p class="footer-note">Rules vary by city. Always follow your local waste guidelines.</p>
          ${includeThemeToggle ? renderThemeButton() : ''}
        </div>
      </div>
    </footer>
  `;
}

let outsideClickBound = false;

function closeMenu({ returnFocus = false } = {}) {
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('menu-panel');
  if (!toggle || !panel || panel.hidden) return;
  toggle.setAttribute('aria-expanded', 'false');
  panel.hidden = true;
  if (returnFocus) toggle.focus();
}

/**
 * Attach event listeners for the theme toggle and the display menu.
 * Call this after rendering a header or an answer screen.
 */
export function attachHeaderEvents() {
  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
    updateThemeButton();
  }

  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('menu-panel');
  if (!toggle || !panel) return;

  const settings = getDisplaySettings();
  applyDisplaySettings(settings);
  const sizeInput = panel.querySelector(`input[name="text-size"][value="${settings.textSize || 'default'}"]`);
  if (sizeInput) sizeInput.checked = true;
  const visionValue = colourVisionModes.includes(settings.colourVision) ? settings.colourVision : 'off';
  const visionInput = panel.querySelector(`input[name="colour-vision"][value="${visionValue}"]`);
  if (visionInput) visionInput.checked = true;
  const highContrast = panel.querySelector('#high-contrast');
  const reduceMotion = panel.querySelector('#reduce-motion');
  if (highContrast) highContrast.checked = settings.highContrast === true;
  if (reduceMotion) reduceMotion.checked = settings.reduceMotion === true;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
    if (!open) panel.querySelector('a, input')?.focus();
  });

  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu({ returnFocus: true });
  });

  panel.querySelectorAll('input[name="text-size"]').forEach((input) => {
    input.addEventListener('change', () => {
      const next = { ...getDisplaySettings(), textSize: input.value };
      applyDisplaySettings(next);
      saveDisplaySettings(next);
    });
  });

  panel.querySelectorAll('input[name="colour-vision"]').forEach((input) => {
    input.addEventListener('change', () => {
      const next = { ...getDisplaySettings(), colourVision: input.value };
      applyDisplaySettings(next);
      saveDisplaySettings(next);
    });
  });

  [highContrast, reduceMotion].forEach((input) => {
    input?.addEventListener('change', () => {
      const next = { ...getDisplaySettings(), highContrast: highContrast.checked, reduceMotion: reduceMotion.checked };
      applyDisplaySettings(next);
      saveDisplaySettings(next);
    });
  });

  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));

  if (!outsideClickBound) {
    outsideClickBound = true;
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.menu-wrap')) closeMenu();
    });
  }
}
