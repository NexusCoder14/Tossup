/**
 * Terms and conditions page.
 * Written specifically for what Tossup actually does.
 * Marked for legal review before launch.
 */

import { SUGGEST_EMAIL } from '../config.js';
import { docLayout } from '../components/docLayout.js';

export function renderTerms() {
  document.title = 'Terms and conditions | Tossup';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Terms and conditions for using Tossup, a waste sorting reference tool.');
  }

  return `
    <main id="main-content" class="page-content" aria-label="Terms and conditions">
      ${docLayout('terms', `
        <h1>Terms and conditions</h1>

        <div class="legal-notice">
          <strong>This document needs legal review before launch.</strong> It has been written to accurately describe Tossup's current functionality and limitations, but it has not been reviewed by a qualified legal professional. Have it reviewed and adapted to comply with applicable laws before making the site publicly available.
        </div>

        <p>Last updated: October 2026</p>

        <h2>What Tossup provides</h2>
        <p>Tossup is a free, static reference tool that suggests which waste bin a household item might belong in. It is not a government service. It is not affiliated with any municipality, waste management company, or regulatory body.</p>

        <h2>Accuracy of information</h2>
        <p>The waste sorting information on Tossup is based on common waste segregation practices in India. It is provided as general guidance only. Waste rules vary significantly between cities, states, and countries.</p>
        <ul>
          <li>We make reasonable efforts to keep the information accurate, but we do not guarantee it is correct for your location.</li>
          <li>Always follow the specific waste sorting instructions issued by your local municipal corporation or waste management authority.</li>
          <li>If you find incorrect information, please let us know by emailing <a href="mailto:${SUGGEST_EMAIL}">${SUGGEST_EMAIL}</a>.</li>
        </ul>

        <h2>No liability</h2>
        <p>Tossup is provided "as is" without warranty of any kind. To the fullest extent permitted by law:</p>
        <ul>
          <li>We are not liable for any fines, penalties, contamination, or other consequences that arise from following the information on this site.</li>
          <li>We are not responsible for any damage resulting from the use or inability to use the site.</li>
        </ul>

        <h2>Your use of the site</h2>
        <p>By using Tossup, you agree to:</p>
        <ul>
          <li>Use the information as a general reference, not as authoritative waste disposal instructions.</li>
          <li>Verify the information against your local waste rules before acting on it.</li>
          <li>Not misrepresent Tossup as an official government tool or service.</li>
        </ul>

        <h2>Intellectual property</h2>
        <p>The design, code, and content of Tossup are original work. You may not copy, redistribute, or create derivative works from the site's design or code without permission, except as permitted by applicable open-source licences if the code is released under one.</p>

        <h2>Item suggestions</h2>
        <p>If you suggest an item by email, you grant us permission to add it to the site's database. We may edit the wording for clarity and consistency. We will not publish your email address or personal details.</p>

        <h2>Links to other sites</h2>
        <p>Tossup may link to external websites (for example, Google's privacy policy). We are not responsible for the content or practices of those sites.</p>

        <h2>Changes to these terms</h2>
        <p>We may update these terms if the site's functionality changes. The "Last updated" date at the top will reflect the most recent revision. Continued use of the site after changes means you accept the updated terms.</p>

        <h2>Contact</h2>
        <p>For questions about these terms, email <a href="mailto:${SUGGEST_EMAIL}">${SUGGEST_EMAIL}</a>.</p>
      `)}
    </main>
  `;
}
