# Tossup

Tossup is a small, accessible reference tool that helps people decide which household waste bin an item belongs in.

## The problem

Waste-sorting rules can be difficult to remember, especially when an item depends on its condition. Tossup gives a quick answer, a short reason, and a preparation tip while making the four bin categories distinguishable by colour, shape, and text.

## Design principles

- Use plain, specific language.
- Keep colour from being the only signal.
- Make the common path quick without hiding useful context.
- Support keyboard, touch, dark mode, larger text, high contrast, and reduced motion.
- Give conditional items a clear decision step before the final answer.
- Avoid accounts, tracking, fake metrics, and unnecessary dependencies.

## What it does

- Look up one item and get a full-screen, colour-and-shape coded answer with a reason and a tip.
- Ask one question when the answer depends on condition (for example a greasy pizza box).
- Sort a pile: paste a whole list and get it filed into the four bins, with questions only where needed. Copy or print the result.
- Design decisions page explaining the main choices.
- Display menu: text size, high contrast, reduced motion, and a colour vision preview (protanopia, deuteranopia, tritanopia).
- Hand-drawn illustration for every one of the 109 items.
- Works offline after the first visit (service worker in `public/sw.js`, production builds only).
- Press / anywhere to jump to search.
- About, Privacy and Terms have a side column with a contents list and illustrated cards.

## Before launch

- Replace `SUGGEST_EMAIL` and `SITE_URL` in `src/config.js` and the URLs in `index.html`. They are placeholders.
- Connect a custom domain and make sure no hosting platform badge is shown.
- Have the Privacy and Terms pages reviewed legally.
- Item rules are general guidance and are not verified against any city's regulations.
- Not yet tested on a real phone or with a screen reader.

## Run it

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Checks

```bash
npm run build
npm run check:contrast
npm run a11y
```

The accessibility audit checks the home page, item answers, the pizza box question, bins, Sort a pile, Design decisions, About, Privacy, Terms, and a 404 route in light and dark themes.

The generated asset commands are:

```bash
npm run generate:favicons
npm run generate:og-image
```

They use Playwright to render the existing SVG assets as PNG files without adding an image-processing dependency.

## Accessibility notes

- Every page has a skip link, a labelled header, primary navigation, main landmark, and footer.
- Route changes move focus to the page heading.
- Search results and browse tabs support keyboard interaction.
- Interactive controls have 44px or larger touch targets and visible focus rings.
- Display settings provide larger text, high contrast, and reduced motion overrides.
- Announcements use polite live regions.
- The automated axe audit must pass in both themes.

## Known limits

The item rules are general guidance and are not verified for any city. Waste rules vary by municipality, so always follow local instructions.
