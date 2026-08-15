import { chromium } from "playwright";
// Sticker: orange fox on a white-ringed dark badge, transparent page bg,
// matching the sticker-ish look StickerPeelDemo expects.
const FOX = "M16 29 L3 13 L6 3 L13 8.5 L16 10 L19 8.5 L26 3 L29 13 Z M9.5 14.5 L14 14.5 L11.75 19 Z M18 14.5 L22.5 14.5 L20.25 19 Z";
const html = `<!doctype html><body style="margin:0;background:transparent">
<div style="width:512px;height:512px;display:grid;place-items:center">
  <svg width="512" height="512" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="#17141f" stroke="#ffffff" stroke-width="4"/>
    <g transform="translate(16 15)">
      <path d="${FOX}" fill="#ff8c1a" fill-rule="evenodd"/>
    </g>
    <text x="32" y="56" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="8.5" font-weight="700" letter-spacing="1">FOXBITS</text>
  </svg>
</div></body>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 512, height: 512 } });
await p.setContent(html);
await p.locator("div").screenshot({ path: "vendor/reactbits/assets/logos/foxbits-sticker.png", omitBackground: true });
await b.close();
console.log("sticker written");
