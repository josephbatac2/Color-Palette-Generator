# Internal Changelog

## v1.5.1 - August 24, 2026
### Checkpoint Scope
- **Release Type**: Patch release — expanded curated palette library with 1,250 new palettes and refreshed UI icons.
- **Primary Goal**: Add 50 new palettes to each of 25 categories (1,250 total), bringing the library from ~1,811 to over 2,100 palettes. Also removed the `Sparkles` icon usage across the app and replaced it with more appropriate icons.

### Technical Updates
- **Palette Generation Script**: Created a Node.js ES module script that deterministically generates 50 palettes per category using a seeded PRNG and per-category HSL recipes.
  - Path: `scripts/generate-palettes.mjs`
  - Important code:
    ```javascript
    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
    ```
  - Each category has a config object with `baseHue`, `hueRange`, `baseSat`, `satRange`, `lightStart`, `lightStep`, and `nameWords`. Special generators exist for complementary, analogous, triadic, split-complementary, tetradic, and square harmony types.
  - Colors are emitted as `ColorUtils.createColor(h, s, l)` calls matching the existing pattern.

- **Palette Insertion Script**: Created a script that parses the generated output and inserts each block before the closing `];` of the corresponding array in the curated palettes component.
  - Path: `scripts/insert-palettes.mjs`
  - Important code:
    ```javascript
    const closeIdx = afterDecl.indexOf('\n];');
    const absoluteCloseIdx = declIdx + closeIdx + 1;
    insertions.push({ index: absoluteCloseIdx, content: block + '\n' });
    ```
  - Insertions are processed bottom-to-top to preserve line offsets.

- **Curated Palettes Expansion**: Appended 1,250 new palette objects across 18 separate arrays in the curated palettes component.
  - Path: `src/components/ui/curated-palettes.tsx`
  - Arrays modified: `curatedPalettes` (blues, greens, reds, purples, oranges, neutrals, vibrant, pastels), `complementaryPalettes`, `holidayPalettes`, `blackswhitesPalettes`, `analogousPalettes`, `tealorangePalettes`, `triadicPalettes`, `analogousSchemePalettes`, `splitComplementaryPalettes`, `tetradicPalettes`, `squarePalettes`, `valentinesPalettes`, `mothersDayPalettes`, `stpatricksPalettes`, `fathersDayPalettes`, `summerVibesPalettes`, `springCleanPalettes`, `technoSynthPalettes`
  - Category counts after expansion: blues 74, greens 91, reds 90, purples 89, oranges 122, neutrals 88, vibrant 89, pastels 150, complementary 109, holidays 99, blackswhites 99, analogous 91, tealorange 80, triadic 70, analogous-scheme 100, split-complementary 70, tetradic 70, square 70, valentines 60, mothersday 60, stpatricks 56, fathersday 91, summervibes 88, springclean 60, technosynth 80.

- **Icon Refresh**: Replaced all `Sparkles` icon imports from `lucide-react` with `Layers` and `Palette` icons across three files.
  - Paths: `src/components/ColorPaletteGenerator.tsx`, `src/components/LandingPage.tsx`, `src/components/ui/curated-palettes.tsx`
  - Important code:
    ```tsx
    // Before:
    import { Sparkles } from 'lucide-react';
    <Sparkles className="w-4 h-4" />
    // After:
    import { Layers } from 'lucide-react';
    <Layers className="w-4 h-4" />
    ```

- **Version Bump**: Updated the app version from `1.5.0` to `1.5.1`.
  - Paths: `package.json`, `README.md`, `src/components/ui/footer.tsx`, `public/robots.txt`, `public/llms.txt`.
  - Important code:
    ```json
    "version": "1.5.1"
    ```

- **Public Changelog Entry**: Added the new `v1.5.1` public changelog entry without removing prior entries. The public copy omits source paths, file names, and implementation details.
  - Path: `src/pages/Changelog.tsx`
  - Important code:
    ```tsx
    <section id="v1.5.1">
    ```

- **RSS Feed Update**: Added a `v1.5.1` item to both RSS feed files and refreshed `lastBuildDate`.
  - Paths: `public/changelog/rss.xml`, `public/changelog/rss`.

- **Sitemap and Robots Refresh**: Updated publishing metadata dates and version comments.
  - Paths: `public/sitemap.xml`, `public/robots.txt`.
  - Important code:
    ```xml
    <lastmod>2026-08-24</lastmod>
    ```

- **LLMs.txt Update**: Updated palette count and version number.
  - Path: `public/llms.txt`

### Files Modified
- `package.json`
- `README.md`
- `CHANGELOG.md`
- `src/components/ui/footer.tsx`
- `src/components/ui/curated-palettes.tsx`
- `src/components/ColorPaletteGenerator.tsx`
- `src/components/LandingPage.tsx`
- `src/pages/Changelog.tsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/changelog/rss.xml`
- `public/changelog/rss`
- `public/llms.txt`

### Build Verification
- `npm run build` passes successfully with no errors.
- 1572 modules transformed, output bundle ~811 kB (186 kB gzipped).

## v1.5.0 - August 8, 2026
### Checkpoint Scope
- **Release Type**: Minor feature release — expanded curated palette library with 750 new palettes.
- **Primary Goal**: Massively expand the palette gallery from 1,061 to 1,811 palettes by generating 30 deterministic palettes per category across 25 categories.

### Technical Updates
- **New Palette Generator Module**: Created a deterministic, seeded palette generation utility that produces category-appropriate color palettes using a seeded PRNG (mulberry32) and per-category color recipes.
  - Path: `src/utils/paletteGenerator.ts`
  - Important code:
    ```typescript
    function mulberry32(seed: number): () => number {
      let a = seed;
      return () => {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    ```
  - Each category has a dedicated recipe function that constrains hue ranges, saturation, and lightness to produce visually coherent palettes. For example, reds use hue 340-20, pastels use low saturation (20-45%) with high lightness (70-88%), and triadic uses 120-degree hue spacing.
  - Colors are created via `ColorUtils.createColor(h, s, l)` which returns a full `Color` object with `hex`, `rgb`, `hsl` fields.

- **Curated Palettes Integration**: Wired the generated palettes into the curated palettes component by merging them with the existing hand-curated palettes.
  - Path: `src/components/ui/curated-palettes.tsx`
  - Important code:
    ```typescript
    import { generateAllPalettes } from '../../utils/paletteGenerator';
    import { curatedPalettes as handCurated } from '../../constants/colorData';
    const allPalettes = [...handCurated, ...generateAllPalettes()];
    ```
  - Category button counts are computed dynamically from `allPalettes`, so they update automatically.

- **Category Counts Updated**: Updated the static palette category counts in the color data constants to reflect the new totals (used for landing page stats).
  - Path: `src/constants/colorData.ts`
  - Important code:
    ```typescript
    export const PALETTE_CATEGORIES: PaletteCategory[] = [
      { name: "All Palettes", count: 1811 },
      { name: "Blues & Teals", count: 54 },
      // ... 25 categories updated with new counts
    ];
    ```

- **Version Bump**: Updated the app version from `1.4.1` to `1.5.0`.
  - Paths: `package.json`, `package-lock.json`, `README.md`, `src/components/ui/footer.tsx`, `public/robots.txt`.
  - Important code:
    ```json
    "version": "1.5.0"
    ```

- **Public Changelog Entry**: Added the new `v1.5.0` public changelog entry without removing prior entries. The public copy omits source paths, file names, and implementation details.
  - Path: `src/pages/Changelog.tsx`
  - Important code:
    ```tsx
    <section id="v1.5.0">
    ```

- **RSS Feed Update**: Added a `v1.5.0` item to both RSS feed files and refreshed `lastBuildDate`.
  - Paths: `public/changelog/rss.xml`, `public/changelog/rss`.

- **Sitemap and Robots Refresh**: Updated publishing metadata dates and version comments.
  - Paths: `public/sitemap.xml`, `public/robots.txt`.
  - Important code:
    ```xml
    <lastmod>2026-08-08</lastmod>
    ```

- **LLMs.txt**: Created an `llms.txt` file at the project root using the canonical URL for LLM discoverability.
  - Path: `public/llms.txt`

### Files Modified
- `package.json`
- `package-lock.json`
- `README.md`
- `CHANGELOG.md`
- `src/components/ui/footer.tsx`
- `src/pages/Changelog.tsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/changelog/rss.xml`
- `public/changelog/rss`
- `public/llms.txt` (new)

### Build Verification
- `npm run build` passes successfully with no errors.
- 1571 modules transformed, output bundle ~558 kB (146 kB gzipped).

## v1.4.1 - June 8, 2026
### Checkpoint Scope
- **Release Type**: Patch checkpoint release for documentation, public update history, feed metadata, and visible versioning.
- **Primary Goal**: Keep the public-facing changelog readable for regular users while keeping technical implementation details inside this internal changelog.

### Technical Updates
- **Version Bump**: Updated the app version from `1.4.0` to `1.4.1`.
  - Paths: `package.json`, `package-lock.json`, `README.md`, `src/components/ui/footer.tsx`, `public/robots.txt`.
  - Important code:
    ```tsx
    <a href="/changelog" className={inlineLinkChangelog}>v1.4.1</a>
    ```
- **Footer Changelog Link**: Updated both compact and full footer variants so the visible version number links to `/changelog`, while preserving the existing Changelog link.
  - Path: `src/components/ui/footer.tsx`.
  - Important code:
    ```tsx
    Color Palette Generator <a href="/changelog" className="hover:text-white underline underline-offset-2 transition-colors">v1.4.1</a>
    ```
- **README Summary Refresh**: Reworked the repository README into a high-level summary only, removing implementation-heavy detail from the public project overview.
  - Path: `README.md`.
  - Important code:
    ```html
    <strong>v1.4.1 - June 8, 2026:</strong> Refreshed the public project summary,
    update history, changelog feed, publishing metadata, and footer version link
    for the latest checkpoint.
    ```
- **Public Changelog Entry**: Added the new `v1.4.1` public changelog entry without removing prior entries. The public copy intentionally omits source paths, file names, and implementation details.
  - Path: `src/pages/Changelog.tsx`.
  - Important code:
    ```tsx
    <section id="v1.4.1">
    ```
- **Feed Subscription Link**: Updated the public changelog feed badge to use `/changelog/rss` while preserving the existing subscribe badge behavior.
  - Path: `src/pages/Changelog.tsx`.
  - Important code:
    ```tsx
    href="/changelog/rss"
    ```
- **RSS Feed Validation**: Added the missing Atom namespace declaration required by the existing `atom:link`, added a `v1.4.1` item, refreshed `lastBuildDate`, and created an extensionless feed file for `/changelog/rss`.
  - Paths: `public/changelog/rss.xml`, `public/changelog/rss`.
  - Important code:
    ```xml
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    ```
- **Sitemap and Robots Refresh**: Updated publishing metadata dates and visible version comments for the checkpoint.
  - Paths: `public/sitemap.xml`, `public/robots.txt`.
  - Important code:
    ```xml
    <lastmod>2026-06-08</lastmod>
    ```

### Files Modified
- `README.md`
- `CHANGELOG.md`
- `package.json`
- `package-lock.json`
- `src/components/ui/footer.tsx`
- `src/pages/Changelog.tsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/changelog/rss.xml`
- `public/changelog/rss`

## v1.4.0 - May 9, 2026
### Technical Updates
- **UI Enhancements**: Updated product tagline, redesigned header layout, and fixed UI theme styling & contrast.
- **Component Refactoring**: Fixed Radix Tabs component structure, fixed Lightbox & Palette UI Layout, and updated `ColorPaletteGenerator.tsx`.
- **New Features**: Added Color Values card to the generator and introduced 10 new "Spring Clean" palettes.
- **Visuals & Bug Fixes**: Updated background gradients and orbs, and fixed category pill counts for new categories.

## v1.3.1 - April 5, 2026
### Technical Updates
- **WCAG Enhancements**: Integrated a major accessibility sweep. Changed footer colors and stat components (`LandingPage.tsx`) for strict WCAG AA/AAA compliance using opaque combinations like \`text-gray-200\` against \`bg-gray-900\`. Fixed issue with skip-link (\`#main-content\`) not being present on wrapper divs. Added missing semantic roles to footer.
- **Hero Redesign**: Cleaned up \`src/components/LandingPage.tsx\` hero module. Shrank fonts, centralized the text using a glassmorphic card \`backdrop-blur-md bg-black/50\`, combined the headings and added Kulay Canada Open Source attribution with link correctly positioned.
- **Color Palette Component**: Removed unused \`ColorPalette\` code block, fixed \`Github\` icon warning in the hero page.
- **Tech Stack**: Maintained Vite + React + Radix UI.
- **Paths Modified**: \`src/components/LandingPage.tsx\`, \`src/components/ui/footer.tsx\`, \`src/components/ColorPaletteGenerator.tsx\`, \`index.html\`, \`index.css\`.
- **SEO & RSS**: Added \`sitemap.xml\`, \`robots.txt\`, and \`rss.xml\` to the \`public/\` folder.
- **Routing**: Added light path-based routing in \`src/App.tsx\` to support the newly created \`src/pages/Changelog.tsx\` route.
- **Documentation**: Overhauled public \`README.md\` incorporating shields.io badges, structured Markdown tables, precise alignment strategies, and prominent open-source contribution banners.
