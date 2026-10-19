/**
 * Minimal client-side router using the History API.
 * Supports parameterised routes such as /item/:slug.
 */

const routes = [];
let notFoundHandler = null;

/**
 * Register a route.
 * @param {string} pattern  Path pattern, e.g. '/item/:slug'
 * @param {Function} handler  Called with (params) when the route matches
 */
export function route(pattern, handler) {
  const paramNames = [];
  const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });
  const regex = new RegExp(`^${regexStr}$`);
  routes.push({ regex, paramNames, handler });
}

/**
 * Register the 404 handler.
 */
export function notFound(handler) {
  notFoundHandler = handler;
}

/**
 * Resolve the current path and call the matching handler.
 */
export function resolve() {
  const path = window.location.pathname || '/';
  for (const r of routes) {
    const match = path.match(r.regex);
    if (match) {
      const params = {};
      r.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      r.handler(params);
      return;
    }
  }
  if (notFoundHandler) notFoundHandler();
}

/**
 * Navigate to a new path using pushState.
 * @param {string} path  The path to navigate to
 */
export function navigate(path, sourceElement = null) {
  const reduceMotion = document.documentElement.hasAttribute('data-reduce-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transition = typeof document.startViewTransition === 'function' && !reduceMotion;
  if (sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    document.documentElement.style.setProperty('--transition-origin-x', `${rect.left + rect.width / 2}px`);
    document.documentElement.style.setProperty('--transition-origin-y', `${rect.top + rect.height / 2}px`);
    sourceElement.querySelector('.item-tile-icon, .search-result-icon, .decision-option')?.classList.add('view-transition-source');
  }
  const update = () => {
    window.history.pushState(null, '', path);
    resolve();
  };
  if (transition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

/**
 * Initialise the router. Call this once on page load.
 */
export function startRouter() {
  // Handle popstate (back/forward buttons)
  window.addEventListener('popstate', resolve);

  // Intercept all internal link clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;

    // Skip external links and mailto links
    if (href.startsWith('http') || href.startsWith('mailto:')) return;

    // Let the browser open links in a new tab or window as usual
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || anchor.target === '_blank') return;

    // In-page links (the skip link, contents lists) move focus instead of changing route
    if (href.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.scrollIntoView({ block: 'start' });
      }
      return;
    }

    e.preventDefault();
    navigate(href, anchor);
  });

  // Initial resolve
  resolve();
}
