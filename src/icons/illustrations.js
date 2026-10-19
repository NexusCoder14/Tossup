/**
 * Hand-drawn item illustrations.
 * Every drawing uses the same 48px viewBox, a 2px rounded line, and at most
 * one soft fill so the set reads as one family at 56px and at 240px.
 */

const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
const svgClose = '</svg>';
const WASH = ' fill="currentColor" fill-opacity=".14"';

function wrap(inner) {
  return `${svgOpen}${inner}${svgClose}`;
}

const p = (d, wash = false) => `<path d="${d}"${wash ? WASH : ''}/>`;
const c = (cx, cy, r, wash = false) => `<circle cx="${cx}" cy="${cy}" r="${r}"${wash ? WASH : ''}/>`;
const r = (x, y, w, h, rx = 0, wash = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"${wash ? WASH : ''}/>`;
const e = (cx, cy, rx, ry, wash = false) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${wash ? WASH : ''}/>`;
const dot = (x, y, radius = 1.4) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="currentColor" stroke="none"/>`;
const g = (transform, inner) => `<g transform="${transform}">${inner}</g>`;

const capTicks = Array.from({ length: 16 }, (_, index) => {
  const angle = (index * Math.PI) / 8;
  const x1 = 24 + Math.cos(angle) * 12.5;
  const y1 = 24 + Math.sin(angle) * 12.5;
  const x2 = 24 + Math.cos(angle) * 16;
  const y2 = 24 + Math.sin(angle) * 16;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}).join('');

const steam = p('M18 14c-2-2 2-4 0-7M24 14c-2-2 2-4 0-7M30 14c-2-2 2-4 0-7');
const bowlBody = p('M7 24h34c0 9-7 16-17 16S7 33 7 24z', true) + p('M5 24h38');

const pizzaBox =
  p('M9 17h30v22H9z', true) +
  p('M9 17L13 8h25l-4 9z', true) +
  p('M15 23h17l-8.5 11z');

const illustrations = {
  /* ---------- Wet: kitchen and garden ---------- */
  'banana-peel': wrap(
    p('M8 27c4 10 20 14 30-4 3-5 4-10 3-16l-6 1c0 5-1 9-4 13-5 8-14 8-23 6z', true) +
    p('M35 8l-1-4h7l1 4') +
    p('M13 33c4 3 10 3 14 1') +
    p('M10 38c-2 3-1 5 2 5 4 0 7-3 7-5') +
    p('M19 40c2 2 5 2 7 0')
  ),
  'tea-bag': wrap(
    p('M10 27h28') + p('M13 27c1 7 6 11 11 11s10-4 11-11') +
    p('M15 27c1-3 4-5 9-5s8 2 9 5') +
    p('M24 22V9') + r(18, 9, 12, 11, 1, true) + p('M24 20v4') + p('M21 24h6l-3 4z', true)
  ),
  'egg-shells': wrap(
    p('M16 19c2-5 5-8 8-8s6 3 8 8c2 5 2 12-1 16-2 3-5 4-7 4s-5-1-7-4c-3-4-3-11-1-16z') +
    p('M16 21c3-2 5 2 8 0s5-2 8 0')
  ),
  'apple-core': wrap(
    p('M15 9c4 3 14 3 18 0 2 4-2 8-4 10v10c2 2 6 6 4 10-4-3-14-3-18 0-2-4 2-8 4-10V19c-2-2-6-6-4-10z', true) +
    e(22, 24, 1.2, 1.2, true) + e(26, 25, 1.2, 1.2, true) + p('M24 9V4')
  ),
  'vegetable-peels': wrap(
    p('M7 14c6-5 11 3 17-1s11 2 17-1v6c-6 3-11-3-17 1s-11-4-17 1z', true) +
    p('M7 30c6-5 11 3 17-1s11 2 17-1v6c-6 3-11-3-17 1s-11-4-17 1z', true)
  ),
  'cucumber-peel': wrap(
    p('M9 12c5-4 9 2 14 0s10-3 14 1c3 3 1 7-3 7-5 0-8 3-13 3s-9 3-12 5c-3 1-5-3-3-7 1-3 0-6 3-9z', true) +
    dot(18, 14) + dot(28, 15) + dot(24, 22) + dot(15, 28)
  ),
  'orange-peel': wrap(
    p('M24 10c8 0 14 6 14 14 0 7-5 13-13 13-6 0-11-4-11-10 0-5 4-9 9-9 4 0 7 3 7 6 0 3-2 5-5 5', true) +
    p('M24 10l4-4')
  ),
  'watermelon-rind': wrap(
    p('M6 18h36a18 18 0 0 1-36 0z', true) + p('M11 18a13 13 0 0 0 26 0') +
    e(18, 24, 1.2, 1.2, true) + e(24, 27, 1.2, 1.2, true) + e(30, 24, 1.2, 1.2, true)
  ),
  'mango-seed': wrap(
    g('rotate(28 24 24)', e(24, 24, 9, 16, true) + p('M20 12l-1 24M24 9v30M28 12l1 24'))
  ),
  'corn-cob': wrap(
    r(17, 5, 14, 34, 7, true) + p('M17 14h14M17 20h14M17 26h14M17 32h14M24 6v32') +
    p('M17 36c-6 1-9-5-8-12 5 2 8 6 8 12zM31 36c6 1 9-5 8-12-5 2-8 6-8 12z', true)
  ),
  'coconut-shell': wrap(
    p('M7 22h34c0 11-7 18-17 18S7 33 7 22z', true) + e(24, 22, 17, 4) +
    p('M13 30l1 3M20 34l0 3M28 34l0 3M35 30l-1 3')
  ),
  rice: wrap(
    bowlBody + p('M12 24c1-8 6-12 12-12s11 4 12 12', true) +
    dot(18, 20) + dot(24, 16) + dot(30, 20) + dot(21, 22) + dot(27, 22)
  ),
  'dal-leftovers': wrap(
    bowlBody + steam + p('M11 24c4-3 6 2 9-1s5 2 9-1 6 2 8 0')
  ),
  'curry-leftovers': wrap(
    bowlBody + steam + c(17, 29, 2) + c(25, 31, 2) + c(31, 28, 2)
  ),
  'leftover-food': wrap(
    e(24, 32, 18, 6, true) + e(24, 32, 11, 3.5) +
    p('M16 30c2-7 6-9 10-7s5 4 6 7', true) + p('M5 12v9M8 12v9M11 12v9M5 21q3 3 6 0M8 24v14')
  ),
  bread: wrap(
    p('M10 20c-3-3-2-9 3-10 4-3 18-3 22 0 5 1 6 7 3 10v17a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z', true) +
    p('M17 26c4 2 10 2 14 0')
  ),
  'coffee-grounds': wrap(
    p('M6 38c2-10 9-18 18-18s16 8 18 18z', true) +
    dot(17, 33) + dot(24, 27) + dot(31, 33) + dot(21, 35) + dot(28, 36) + dot(24, 32, 1) +
    p('M18 14c-2-2 2-4 0-7M24 14c-2-2 2-4 0-7M30 14c-2-2 2-4 0-7')
  ),
  'tea-leaves': wrap(
    p('M10 30C10 16 20 8 34 8c0 14-8 24-24 22z', true) + p('M10 30L28 14') +
    p('M24 42c0-8 5-12 14-12 0 8-5 12-14 12z', true) + p('M24 42l10-8')
  ),
  'fish-bones': wrap(
    c(11, 24, 4, true) + p('M15 24h22M20 24l-3-7M20 24l-3 7M25 24l-3-8M25 24l-3 8M30 24l-3-7M30 24l-3 7') +
    p('M37 24l6-6v12z', true) + dot(10, 23, 1)
  ),
  'chicken-bones': wrap(
    g('rotate(-45 24 24)', r(12, 21, 24, 6, 3, true) + c(11, 20, 3.6, true) + c(11, 28, 3.6, true) + c(37, 20, 3.6, true) + c(37, 28, 3.6, true))
  ),
  'spoiled-fruit': wrap(
    p('M24 15c-4-3-13-2-13 7 0 10 6 18 13 18s13-8 13-18c0-9-9-10-13-7z', true) +
    p('M24 15c0-4 1-7 5-9') + p('M27 8c3-3 6-2 7-1-1 3-4 4-7 1z', true) +
    c(18, 25, 2) + c(29, 29, 2.4) + c(22, 34, 1.6)
  ),
  'flower-waste': wrap(
    c(24, 17, 3.5, true) + c(24, 8.5, 4.5) + c(32, 14, 4.5) + c(29.5, 23, 4.5) + c(18.5, 23, 4.5) + c(16, 14, 4.5) +
    p('M24 28v15') + p('M24 38c5-1 8-4 8-8-5 0-8 3-8 8z', true)
  ),
  'garden-leaves': wrap(
    p('M9 37C9 19 21 8 38 8c0 17-9 29-29 29z', true) + p('M9 37L31 15M20 28l-1-8M26 22l-1-8M18 31l-7-1')
  ),
  'grass-clippings': wrap(
    p('M8 40c2-9 3-16 2-26M15 40c0-9 2-15 8-20M23 40c-1-10-1-20 2-30M31 40c0-9 3-16 10-21M38 40c0-5 1-9 3-12') + p('M5 40h38')
  ),
  'wooden-ice-cream-stick': wrap(
    r(19, 5, 10, 38, 5, true) + p('M23 14v6M26 24v10')
  ),

  /* ---------- Dry: paper, plastic, metal, glass ---------- */
  newspaper: wrap(
    r(8, 9, 32, 30, 2) + p('M12 14h20M12 19h20M12 24h10M12 29h8') + r(27, 24, 9, 10, 1, true) + p('M34 9v4h6')
  ),
  'milk-carton': wrap(
    r(14, 18, 20, 24, 1, true) + p('M14 18l5-10h10l5 10z', true) + p('M19 8l-2 10M29 8l2 10') +
    p('M24 25c-3 4-3 6 0 7 3-1 3-3 0-7z')
  ),
  'cardboard-box': wrap(
    p('M7 15l17-8 17 8v19l-17 9-17-9z', true) + p('M7 15l17 8 17-8M24 23v20') + p('M15 11l17 8v6')
  ),
  'paper-bag': wrap(
    p('M11 14h26l2 28H9z', true) + p('M11 14l4-6h18l4 6') + p('M11 21h26') + p('M20 27h8')
  ),
  'wrapping-paper': wrap(
    p('M12 14h26a4 10 0 0 1 0 20H12a4 10 0 0 1 0-20z', true) + p('M12 14a4 10 0 0 0 0 20') +
    p('M20 14v20M29 14v20') + p('M6 38c4 2 8 0 12 2')
  ),
  'paper-receipt': wrap(
    p('M13 5h22v38l-3.7-2.5L27.6 43 24 40.5 20.4 43l-3.7-2.5L13 43z', true) + p('M18 13h12M18 19h12M18 25h8M18 31h6')
  ),
  notebook: wrap(
    r(13, 6, 24, 36, 2, true) + p('M9 12h7M9 18h7M9 24h7M9 30h7M9 36h7') + p('M21 14h12M21 20h12M21 26h8')
  ),
  'cardboard-tube': wrap(
    p('M11 14v21a13 5 0 0 0 26 0V14', true) + e(24, 14, 13, 5) + e(24, 14, 8.5, 2.8)
  ),
  magazine: wrap(
    r(11, 5, 26, 38, 2) + p('M15 11h18') + r(15, 16, 18, 13, 1, true) + p('M15 34h18M15 38h10')
  ),
  envelope: wrap(r(6, 12, 36, 24, 2, true) + p('M6 14l18 13 18-13')),
  textbook: wrap(
    p('M11 7h24a3 3 0 0 1 3 3v29a3 3 0 0 1-3 3H11z', true) + p('M11 7v35M15 42v-3M38 39H15') + p('M19 14h13M19 19h9')
  ),
  'paper-cup': wrap(
    p('M12 15h24l-3 27H15z', true) + r(10, 10, 28, 5, 1) + p('M13.5 24h21M14.5 32h19')
  ),
  'paper-plate': wrap(
    c(24, 24, 17, true) + c(24, 24, 11) + c(24, 24, 5.5)
  ),
  'glass-jar': wrap(
    r(16, 7, 16, 6, 1) + p('M17 13v3M31 13v3') +
    p('M14 16h20a2 2 0 0 1 2 2v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V18a2 2 0 0 1 2-2z', true) + p('M17 22v12')
  ),
  'steel-can': wrap(
    p('M13 14v22a11 4 0 0 0 22 0V14', true) + e(24, 14, 11, 4) + p('M13 22a11 4 0 0 0 22 0M13 29a11 4 0 0 0 22 0')
  ),
  'aluminium-can': wrap(
    p('M15 11h18l2 4v22l-2 4H15l-2-4V15z', true) + e(24, 11, 9, 2.4) + p('M22 10h4') + p('M13 19h22M13 31h22')
  ),
  'plastic-container': wrap(
    p('M9 19h30l-3 19a3 3 0 0 1-3 2H15a3 3 0 0 1-3-2z', true) + r(7, 14, 34, 5, 1) + p('M20 14v-2h8v2')
  ),
  'plastic-bag': wrap(
    p('M10 19h28l-2 23H12z', true) + p('M17 19c-1-8 0-12 3-12M31 19c1-8 0-12-3-12') + p('M17 27l2 9M30 27l-2 9')
  ),
  'cling-film': wrap(
    p('M8 12h30a3 7 0 0 1 0 14H8a3 7 0 0 1 0-14z', true) + p('M8 12a3 7 0 0 0 0 14') +
    p('M10 26c4 4 8 0 12 4s8 0 12 4 6 4 8 6') + p('M14 12v14M32 12v14')
  ),
  'yogurt-cup': wrap(
    p('M13 15h22l-3 26H16z', true) + r(11, 10, 26, 5, 1, true) + p('M37 12h4') + p('M18 26h12')
  ),
  'shampoo-bottle': wrap(
    p('M15 21h18a3 3 0 0 1 3 3v14a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V24a3 3 0 0 1 3-3z', true) +
    p('M21 21v-5h6v5') + p('M24 16V9h8v3') + p('M16 29h16M16 34h10')
  ),
  'detergent-bottle': wrap(
    p('M10 19l6-6h14l4 6v21a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z', true) + p('M18 13V8h8v5') +
    p('M34 20h5v11h-5') + p('M14 29h16M14 35h12')
  ),
  'toothpaste-tube': wrap(
    p('M13 7h22l-3 25H16z', true) + p('M13 7h22v4H13z') + p('M18 32h12l1 6a2 2 0 0 1-2 3H19a2 2 0 0 1-2-3z', true) + p('M20 16h8M21 22h6')
  ),
  'aluminium-food-tray': wrap(
    p('M5 21h38l-4 17H9z', true) + p('M3 21h42') + p('M16 21v17M24 21v17M32 21v17')
  ),
  'metal-lid': wrap(
    p('M7 31c0-11 8-17 17-17s17 6 17 17z', true) + p('M5 31h38') + p('M20 14v-4h8v4') + c(24, 25, 1.2, true)
  ),
  'glass-tumbler': wrap(
    p('M11 9h26l-3 31H14z', true) + p('M12 21h24') + p('M17 14l1 20')
  ),
  'bubble-wrap': wrap(
    r(5, 6, 38, 36, 3) + c(14, 15, 4, true) + c(24, 15, 4, true) + c(34, 15, 4, true) +
    c(14, 25, 4, true) + c(24, 25, 4, true) + c(34, 25, 4, true) +
    c(14, 35, 4, true) + c(24, 35, 4, true) + c(34, 35, 4, true)
  ),
  'wooden-cutlery': wrap(
    p('M17 6v10c0 4 3 6 7 6s7-2 7-6V6M24 6v16', false) + p('M24 22v20')
  ),
  'plastic-straw': wrap(
    p('M16 43V16l8-9h9v5h-6l-5 6v25z', true) + p('M16 24h5M16 32h5')
  ),
  toothbrush: wrap(
    g('rotate(-32 24 24)', p('M5 24c0-2 1-3 3-3h22v6H8c-2 0-3-1-3-3z', true) + r(30, 21, 12, 6, 1, true) + p('M32 21v-6M35 21v-6M38 21v-6M41 21v-6'))
  ),
  'soap-wrapper': wrap(
    r(11, 15, 26, 18, 3, true) + p('M11 20l-6-3v14l6-3M37 20l6-3v14l-6-3') + p('M19 15v18M29 15v18')
  ),
  'cotton-clothes': wrap(
    p('M17 8L6 14l4 9 5-3v21h18V20l5 3 4-9-11-6c0 4-4 6-7 6s-7-2-7-6z', true)
  ),
  shoes: wrap(
    p('M5 36v-11l9-3 5 6h12c6 0 11 3 11 8z', true) + p('M5 36h38v4H5z') + p('M15 22l4-4M19 27l4-4')
  ),
  'pizza-box': wrap(pizzaBox + p('M24 28v0')),
  'pizza-box-greasy': wrap(pizzaBox + c(15, 34, 2, true) + c(32, 30, 1.6, true) + c(27, 36, 1.6, true)),
  'glass-bottle': wrap(
    p('M20 7h8v5c0 2 4 4 4 9v14a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3V21c0-5 4-7 4-9z') + p('M20 12h8M16 28c4-2 8 2 16 0') + p('M21 7V5h6v2')
  ),
  'plastic-bottle': wrap(
    p('M20 7h8v5l3 4v22a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3V16l3-4z') + p('M20 12h8M17 25h14') + p('M21 7V5h6v2')
  ),
  'bottle-cap': wrap(c(24, 24, 11, true) + c(24, 24, 6.5) + p(capTicks)),
  'aluminium-foil': wrap(
    p('M9 26l4-11 9-5 11 3 6 9-2 12-9 7-11-1z', true) + p('M13 15l9 8 11-10M22 23l-2 15M22 23l12 7M9 26l13-3')
  ),
  'chip-packet': wrap(
    p('M13 8h22l-2 6 2 6-2 6 2 6-2 8H13l2-8-2-6 2-6z', true) + p('M15 15h18M15 33h18') + p('M21 23c2-2 4-2 6 0s4 2 6 0')
  ),

  /* ---------- Sanitary ---------- */
  'used-tissue': wrap(
    p('M11 16l9-4 8 5 9-1-3 8 3 8-10 4-8-4-8 1 2-9z', true) + p('M20 12l-1 9 6 3-6 7M28 17l-3 7 2 7')
  ),
  'used-diaper': wrap(
    p('M13 14h22v7c0 10-4 17-11 20-7-3-11-10-11-20z', true) + p('M13 14l-5 4 5 6M35 14l5 4-5 6') + p('M17 14v5M31 14v5') + p('M17 22c2 2 4 3 7 3s5-1 7-3')
  ),
  'cotton-swab': wrap(
    g('rotate(-45 24 24)', p('M10 24h28') + e(9, 24, 5, 4, true) + e(39, 24, 5, 4, true))
  ),
  'sanitary-pad': wrap(
    r(15, 5, 18, 38, 8, true) + p('M15 18H9l-3 4 3 4h6M33 18h6l3 4-3 4h-6') + p('M24 11v26')
  ),
  tampon: wrap(
    r(19, 6, 10, 24, 3, true) + r(22, 30, 4, 10, 1) + p('M24 40c0 3-2 5-5 6')
  ),
  bandage: wrap(
    g('rotate(-35 24 24)', r(5, 16, 38, 16, 8, true) + r(17, 16, 14, 16, 1) + dot(10, 21, 1) + dot(10, 27, 1) + dot(38, 21, 1) + dot(38, 27, 1))
  ),
  'face-mask': wrap(
    p('M8 16c0-2 2-4 4-4h24c2 0 4 2 4 4v10c0 6-6 10-16 10S8 32 8 26z', true) + p('M12 19h24M12 24h24M12 29h24') +
    p('M8 17c-5 0-5 9 0 9M40 17c5 0 5 9 0 9')
  ),
  razor: wrap(
    r(9, 7, 28, 9, 2, true) + p('M14 12h18') + p('M21 16l-3 26h7l3-26z', true)
  ),
  'broken-ceramic-cup': wrap(
    p('M9 13h25v15c0 6-5 10-12 10S9 34 9 28z', true) + p('M34 17h3a4 4 0 0 1 0 9h-3') + p('M19 13l3 6-4 5 3 7') +
    p('M37 38l5 2-3 5z', true)
  ),
  'dental-floss': wrap(
    r(9, 15, 30, 22, 5, true) + p('M9 24h30') + p('M24 15v-5c0-3 5-3 5 0') + p('M39 31c4 0 6 3 4 7')
  ),
  hair: wrap(
    p('M13 7c8 6-8 10 0 17s-8 10 0 17') + p('M24 6c8 6-8 10 0 17s-8 10 0 17') + p('M35 7c8 6-8 10 0 17s-8 10 0 17')
  ),
  'makeup-wipe': wrap(
    r(9, 9, 30, 30, 4, true) + p('M30 9v6a3 3 0 0 0 3 3h6') + p('M16 27c3 5 13 5 16 0')
  ),
  'toilet-paper': wrap(
    p('M11 14v22a13 5 0 0 0 26 0V14', true) + e(24, 14, 13, 5) + e(24, 14, 5, 2) + p('M37 31c5 2 5 8 0 10')
  ),
  'wet-wipe': wrap(
    r(8, 14, 32, 25, 3, true) + p('M14 14V9h20v5') + p('M24 23c-3 4-3 6 0 7 3-1 3-3 0-7z') + p('M20 9c0-3 8-3 8 0')
  ),
  'contact-lens': wrap(
    r(9, 12, 12, 6, 1) + r(27, 12, 12, 6, 1) + p('M9 18h12v16a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z', true) +
    p('M27 18h12v16a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z', true) + p('M12 28c2 2 6 2 6 0M30 28c2 2 6 2 6 0')
  ),
  'makeup-sponge': wrap(
    p('M24 7c9 0 15 8 15 17s-6 17-15 17S9 33 9 24 15 7 24 7z', true) + dot(19, 19) + dot(28, 17) + dot(24, 26) + dot(17, 29) + dot(31, 30)
  ),
  'used-condom': wrap(
    r(9, 9, 30, 30, 3, true) + c(24, 24, 7) + p('M9 14h-2M9 20h-2M9 26h-2M9 32h-2M39 14h2M39 20h2M39 26h2M39 32h2')
  ),

  /* ---------- Special drop-off ---------- */
  battery: wrap(
    r(9, 15, 27, 20, 3, true) + p('M36 22h3v6h-3') + p('M16 25h7M19.5 21.5v7M27 25h5')
  ),
  'light-bulb': wrap(
    p('M17 19a7 7 0 1 1 14 0c0 4-3 5-4 9h-6c-1-4-4-5-4-9z', true) + p('M21 28h6M21 32h6M22 36h4') + p('M24 5v3M11 10l2 2M37 10l-2 2')
  ),
  'expired-medicine': wrap(
    r(14, 9, 20, 30, 3, true) + p('M14 17h20M20 9V7h8v2') + p('M20 26h8M24 22v8')
  ),
  'phone-charger': wrap(
    r(12, 14, 16, 20, 2, true) + p('M17 14V8M23 14V8') + p('M20 34v4c0 4 3 5 7 5h8c4 0 6-2 6-6')
  ),
  'old-mobile-phone': wrap(
    r(14, 5, 20, 38, 4) + r(17, 10, 14, 23, 1, true) + c(24, 38, 1.6) + p('M20 7h8')
  ),
  laptop: wrap(
    r(10, 9, 28, 21, 2) + r(13, 12, 22, 15, 1, true) + p('M4 35h40l-3 4H7z', true)
  ),
  keyboard: wrap(
    r(4, 13, 40, 22, 3, true) + p('M9 19h3M15 19h3M21 19h3M27 19h3M33 19h3M9 25h3M15 25h3M21 25h3M27 25h3M33 25h3M38 25h2') + p('M14 31h20')
  ),
  'computer-mouse': wrap(
    p('M14 20c0-8 4-13 10-13s10 5 10 13v9c0 8-4 13-10 13s-10-5-10-13z', true) + p('M14 20h20M24 7v13') + p('M24 12v4')
  ),
  'usb-cable': wrap(
    r(16, 5, 16, 15, 2, true) + r(19, 9, 4, 4, 0.5) + r(25, 9, 4, 4, 0.5) + p('M24 20v8c0 5-8 5-8 10v6')
  ),
  'remote-control': wrap(
    r(16, 4, 16, 40, 5, true) + c(24, 11, 2.4) + c(20, 20, 1.8) + c(28, 20, 1.8) + c(20, 27, 1.8) + c(28, 27, 1.8) + c(20, 34, 1.8) + c(28, 34, 1.8)
  ),
  headphones: wrap(
    p('M9 28v-4a15 15 0 0 1 30 0v4') + r(6, 27, 9, 15, 3, true) + r(33, 27, 9, 15, 3, true)
  ),
  'power-bank': wrap(
    r(12, 5, 24, 38, 4, true) + dot(18, 11) + dot(24, 11) + dot(30, 11) + p('M25 20l-4 7h6l-4 8') + p('M20 40h8')
  ),
  'printer-cartridge': wrap(
    r(12, 9, 24, 29, 3, true) + p('M17 9V5h14v4') + p('M17 38v5h14v-5') + p('M24 19c-3 4-3 6 0 7 3-1 3-3 0-7z')
  ),
  'fluorescent-tube': wrap(
    g('rotate(-35 24 24)', r(2, 19, 44, 10, 5, true) + p('M8 19v10M40 19v10') + p('M16 24h2M23 24h2M30 24h2'))
  ),
  thermometer: wrap(
    p('M20 28V10a4 4 0 0 1 8 0v18a8 8 0 1 1-8 0z', true) + p('M24 16v17') + c(24, 35, 3, true) + p('M31 12h4M31 18h4M31 24h4')
  ),
  'paint-tin': wrap(
    p('M9 17v21a15 5 0 0 0 30 0V17', true) + e(24, 17, 15, 5) + p('M9 17c0-11 30-11 30 0') + p('M9 29a15 5 0 0 0 30 0')
  ),
  television: wrap(
    r(5, 9, 38, 26, 3) + r(9, 13, 30, 18, 1, true) + p('M17 39h14M24 35v4') + p('M18 5l6 4 6-4')
  ),
  'computer-monitor': wrap(
    r(5, 7, 38, 27, 2) + r(9, 11, 30, 19, 1, true) + p('M24 34v6M15 41h18')
  ),
  printer: wrap(
    r(7, 18, 34, 17, 3, true) + p('M14 18V7h20v11') + r(14, 29, 20, 12, 1) + dot(35, 24, 1.3)
  ),
  'wifi-router': wrap(
    r(6, 28, 36, 12, 3, true) + p('M12 28V13M36 28V13') + p('M18 21c4-4 8-4 12 0M21 17c2-2 4-2 6 0') + dot(14, 34) + dot(20, 34) + dot(26, 34)
  ),
  webcam: wrap(
    c(24, 18, 12, true) + c(24, 18, 5) + p('M24 30v8M16 40h16')
  ),
  'bluetooth-speaker': wrap(
    r(9, 8, 30, 33, 9, true) + c(24, 29, 7) + c(24, 29, 2) + c(24, 16, 2.6)
  ),
  smartwatch: wrap(
    p('M18 4h12v8H18zM18 36h12v8H18z', true) + r(13, 12, 22, 24, 7, true) + p('M24 18v6l4 3')
  ),
  calculator: wrap(
    r(11, 4, 26, 40, 3) + r(15, 9, 18, 8, 1, true) + c(18, 24, 1.8) + c(24, 24, 1.8) + c(30, 24, 1.8) +
    c(18, 30, 1.8) + c(24, 30, 1.8) + c(30, 30, 1.8) + c(18, 36, 1.8) + c(24, 36, 1.8) + c(30, 36, 1.8)
  ),
  'electric-iron': wrap(
    p('M5 36h38c0-11-6-19-16-19H18c-6 0-10 6-13 19z', true) + p('M5 36v4h38v-4') + p('M17 17c0-6 3-8 7-8h5c4 0 6 2 6 8') + c(14, 30, 2)
  ),
  'electric-kettle': wrap(
    p('M10 40l3-20c0-5 4-9 11-9s11 4 11 9l3 20z', true) + p('M21 8h6') + p('M35 19l8-5') + p('M13 17c-6 0-8 7-7 15h6')
  ),
  'extension-cord': wrap(
    r(8, 13, 32, 15, 3, true) + c(16, 20.5, 2.4) + c(24, 20.5, 2.4) + c(32, 20.5, 2.4) +
    p('M14 28v5c0 5-8 3-8 8') + r(3, 41, 6, 4, 1)
  ),
  'pesticide-bottle': wrap(
    p('M17 20l2-3h10l2 3v19a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3z', true) + r(19, 6, 10, 11, 1) + p('M24 24l6 10H18z') + p('M24 28v3') + dot(24, 33, 0.9)
  ),
};

export function getIllustration(slug, variant = '') {
  if (slug === 'pizza-box' && variant === 'greasy') {
    return illustrations['pizza-box-greasy'];
  }
  return illustrations[slug] || wrap(
    r(10, 13, 28, 25, 3, true) + p('M10 20l14 7 14-7M24 27v11')
  );
}

export function hasIllustration(slug) {
  return Boolean(illustrations[slug]);
}

export function getBinShape(shape) {
  const s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" class="bin-shape">';
  switch (shape) {
    case 'droplet':
      return `${s}<path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z"/></svg>`;
    case 'square':
      return `${s}<rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
    case 'triangle':
      return `${s}<polygon points="12,2 22,22 2,22"/></svg>`;
    case 'diamond':
      return `${s}<polygon points="12,2 22,12 12,22 2,12"/></svg>`;
    default:
      return `${s}<circle cx="12" cy="12" r="10"/></svg>`;
  }
}
