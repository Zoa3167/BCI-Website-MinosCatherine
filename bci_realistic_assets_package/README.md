# BCI Website Realistic Asset Upgrade Package

This package is for Codex to replace the overly abstract/fake BCI visuals with realistic, source-based visual assets.

Because some remote images are hosted online under open licenses, this package includes:

1. `src/data/realisticBciAssets.js` — a ready-to-import asset manifest.
2. `public/bci-assets/sources/assets_manifest.json` — source URLs, license notes, and exact UI usage.
3. `scripts/download_assets.mjs` — downloads the selected open-source images into `public/bci-assets/sources/`.
4. `docs/CODEX_VISUAL_UPGRADE_PROMPT.md` — paste this directly into Codex.
5. `docs/IMPLEMENTATION_REQUIREMENTS.md` — page-by-page animation requirements.
6. `docs/LICENSE_AND_ATTRIBUTION.md` — attribution text to place in your website About/Credits page.

## Important

Do NOT use random commercial images from Google Images, Getty, Wired, or company marketing pages unless the license is verified. This package intentionally prefers Wikimedia Commons and Frontiers open-access figures.

## How Codex should use this package

1. Copy this folder into the website root.
2. Run:

```bash
node scripts/download_assets.mjs
```

3. Use `src/data/realisticBciAssets.js` in the React/Vite website.
4. Replace the current abstract landing-page and simulation art with these real source images plus realistic overlays.
5. Use generated/animated overlays only for arrows, highlighting, signal flow, labels, and interactive movement. Do not replace realistic source images with cartoon/abstract graphics.

