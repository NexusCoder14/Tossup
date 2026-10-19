/**
 * Privacy policy page.
 * Written specifically for what Tossup actually does.
 * Marked for legal review before launch.
 */

import { SUGGEST_EMAIL } from '../config.js';
import { docLayout } from '../components/docLayout.js';

export function renderPrivacy() {
  document.title = 'Privacy policy | Tossup';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Privacy policy for Tossup, a static waste sorting reference tool.');
  }

  return `
    <main id="main-content" class="page-content" aria-label="Privacy policy">
      ${docLayout('privacy', `
        <h1>Privacy policy</h1>

        <div class="legal-notice">
          <strong>This document needs legal review before launch.</strong> It has been written to accurately describe Tossup's current functionality, but it has not been reviewed by a qualified legal professional. Have it reviewed and adapted to comply with applicable laws before making the site publicly available.
        </div>

        <p>Last updated: October 2026</p>

        <h2>What Tossup is</h2>
        <p>Tossup is a static website that helps people identify which waste bin a household item belongs in. It runs entirely in your web browser. There is no server-side application, no database, and no user accounts.</p>

        <h2>Data we collect</h2>
        <p>Tossup does not collect personal data. Specifically:</p>
        <ul>
          <li>We do not ask you to create an account or sign in.</li>
          <li>We do not use cookies for tracking or advertising.</li>
          <li>We do not record your searches. All search processing happens locally in your browser.</li>
          <li>We do not use analytics or tracking scripts.</li>
        </ul>

        <h2>Local storage</h2>
        <p>Tossup stores display preferences in your browser's local storage:</p>
        <ul>
          <li><strong>Colour scheme</strong> (key: <code>tossup-theme</code>): stores whether you chose light or dark mode.</li>
          <li><strong>Display settings</strong> (key: <code>tossup-display</code>): stores your text size, high contrast, reduced motion and colour vision preview choices.</li>
          <li><strong>Recently looked up</strong> (key: <code>tossup-recent-items</code>): stores the last few items you opened, so they can be shown on the home page.</li>
          <li><strong>Last pile</strong> (key: <code>tossup-pile</code>): stores the text you last typed into Sort a pile, so it is still there when you come back.</li>
        </ul>
        <p>You can clear this at any time through your browser settings.</p>

        <h2>Offline copy</h2>
        <p>So the app can open without a connection, your browser saves a copy of Tossup's own files (pages, styles, fonts and images) on your device. This copy contains nothing about you.</p>

        <h2>Email suggestions</h2>
        <p>If you use the "Suggest this item" link, it opens your own email client with a prefilled message. The email is sent through your email provider, not through Tossup. We do not capture your email address unless you choose to send the email. If you do send it, your message is subject to your email provider's privacy practices.</p>

        <h2>Hosting</h2>
        <p>The site is served by a third-party hosting provider. That provider may collect standard server logs, which typically include your IP address, browser type, and the pages you request. We do not control this logging. Check the hosting provider's own privacy policy for details.</p>

        <h2>Third-party services</h2>
        <p>Tossup loads web fonts from Google Fonts. Google may collect standard request data (such as your IP address) when the fonts are loaded. You can read <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's privacy policy</a> for details. To avoid this, self-host the fonts (instructions are provided separately for site operators).</p>

        <h2>Children</h2>
        <p>Tossup does not knowingly collect data from anyone, including children. Since we do not collect personal data, there is no age-related data concern.</p>

        <h2>Changes to this policy</h2>
        <p>If Tossup adds features that affect privacy (for example, analytics or user accounts), this policy will be updated before those features go live. The "Last updated" date at the top will reflect the most recent revision.</p>

        <h2>Contact</h2>
        <p>For privacy-related questions, email <a href="mailto:${SUGGEST_EMAIL}">${SUGGEST_EMAIL}</a>.</p>
      `)}
    </main>
  `;
}
