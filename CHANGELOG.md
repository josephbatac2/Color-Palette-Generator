# Internal Changelog

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
