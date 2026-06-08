# Internal Changelog

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
