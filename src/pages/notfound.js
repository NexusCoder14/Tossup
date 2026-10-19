/**
 * 404 page.
 */

export function renderNotFound() {
  document.title = 'Page not found | Tossup';
  const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement('meta'));
  robots.name = 'robots';
  robots.content = 'noindex, nofollow';

  return `
    <main id="main-content" class="page-content" aria-label="Page not found">
      <div class="container">
        <div class="not-found">
          <div class="not-found-code" aria-hidden="true">404</div>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
          <a href="/">Go to search</a>
        </div>
      </div>
    </main>
  `;
}
