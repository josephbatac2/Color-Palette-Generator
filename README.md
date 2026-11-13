<div align="center">
  <a href="https://colourpalettes.techhive.net">
    <img src="https://colourpalettes.techhive.net/logo.png" alt="Color Palette Generator" width="120" />
  </a>

  <h1>Color Palette Generator</h1>

  <p><strong>A professional color palette tool for creating beautiful, practical, and accessible color systems.</strong></p>

  <p>
    <a href="https://colourpalettes.techhive.net/"><strong>Live App</strong></a>
    &nbsp;&middot;&nbsp;
    <a href="https://colourpalettes.techhive.net/changelog"><strong>Changelog</strong></a>
    &nbsp;&middot;&nbsp;
    <a href="https://github.com/josephbatac2/Color-Palette-Generator/issues"><strong>Report Bug</strong></a>
  </p>

  <p>
    <a href="https://colourpalettes.techhive.net/changelog">
      <img src="https://img.shields.io/badge/Version-1.6.0-blueviolet?style=for-the-badge&logo=appveyor" alt="Version 1.6.0" />
    </a>
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Supabase-2.x-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/License-ISC-success?style=for-the-badge" alt="License" />
  </p>
</div>

---

## Overview

Color Palette Generator is a full-featured, browser-based tool that helps designers, developers, and brand builders create usable color palettes backed by color theory. It combines deterministic harmony generation, real-time accessibility checks, color blindness simulation, and a curated library of over **8,400 palettes** across **28 categories**.

Whether you need a quick triadic scheme for a landing page or want to browse hundreds of curated seasonal palettes for inspiration, the tool provides both generative and exploratory workflows.

---

## Features

### Harmony-Based Generation
Generate palettes using seven established color harmony patterns:

| Harmony | Description |
|---|---|
| **Monochromatic** | Variations of a single hue across lightness and saturation |
| **Analogous** | Neighboring hues on the color wheel for smooth transitions |
| **Complementary** | Two opposing hues for high contrast |
| **Split-Complementary** | A base hue plus the two adjacent to its complement |
| **Triadic** | Three evenly spaced hues for vibrant balance |
| **Tetradic** | Four hues forming a rectangle on the color wheel |
| **Square** | Four hues at 90-degree intervals for rich, balanced schemes |

### Accessibility-First Design
- **Contrast checking** with WCAG-aware pass/fail indicators for text readability
- **Color blindness simulation** across three vision types: Deuteranopia, Protanopia, and Tritanopia
- Real-time visual feedback so you can adjust palettes before shipping

### Curated Palette Library
- **8,425+ hand-crafted and algorithmically generated palettes** across 28 categories
- Categories include seasonal (Halloween, St. Patrick's Day, Summer Vibes), tonal (Blues & Teals, Greens & Nature, Purples & Violets), stylistic (Vibrant & Neon, Pastels & Soft, Techno & Synth), and structural (Complementary, Triadic, Square, Tetradic)
- **Top Picks of the Day** surfaced on the landing page
- Palette view tracking powered by Supabase to highlight popular picks

### Export & Workflow
- Copy individual color values in HEX, RGB, HSL, and other formats
- Export full palettes for use in design tools and codebases
- Save and revisit palettes with persistent storage

### Color Converter
A dedicated conversion tool for translating between HEX, RGB, HSL, and more — useful when working with colors from external sources.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18.3 with TypeScript 5.5 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 3.4 with shadcn/ui components |
| **Icons** | Lucide React |
| **Backend** | Supabase (PostgreSQL, view tracking, persistence) |
| **Routing** | Lightweight client-side routing (Landing, Generator, Converter, Changelog) |
| **Animation** | CSS transitions and micro-interactions |

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/josephbatac2/Color-Palette-Generator.git
cd Color-Palette-Generator
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
  components/
    ColorPaletteGenerator.tsx   # Main palette generation interface
    LandingPage.tsx             # Marketing/landing page with stats
    ui/                         # Reusable shadcn/ui components
      curated-palettes.tsx      # Curated palette browser
      palette-lightbox.tsx      # Full-screen palette viewer
      color-picker.tsx          # Color selection controls
      harmony-selector.tsx      # Harmony type switcher
      accessibility-checker.tsx # WCAG contrast checking
      color-blindness-simulator.tsx
      ...
  constants/
    colorData.ts                # Category counts, harmony types, vision types
  utils/
    colorUtils.ts               # Color conversion and creation utilities
    harmonyPalettes.ts          # Deterministic harmony palette generator
    paletteGenerator.ts         # Core palette generation logic
  hooks/
    useColorPalette.ts          # Palette state management
    usePaletteViews.ts          # Supabase-backed view tracking
  contexts/
    ThemeContext.tsx            # Dark/light theme provider
  pages/
    Changelog.tsx               # Public changelog page
    ColorConverter.tsx          # Standalone color converter
```

---

## Palette Categories

The curated library spans 28 categories with counts maintained in `src/constants/colorData.ts`:

| Category | Count |
|---|---|
| All Palettes | 8,425 |
| Blues & Teals | 283 |
| Greens & Nature | 300 |
| Reds & Pinks | 299 |
| Purples & Violets | 298 |
| Oranges & Yellows | 331 |
| Neutrals & Grays | 297 |
| Vibrant & Neon | 298 |
| Pastels & Soft | 359 |
| Complementary | 468 |
| Holiday & Seasonal | 308 |
| Blacks & Whites | 308 |
| Warm & Cool | 300 |
| Teal & Orange | 289 |
| Triadic | 429 |
| Analogous | 459 |
| Split-Complementary | 429 |
| Tetradic | 429 |
| Square | 429 |
| Valentines & Love | 269 |
| Mother's Day | 269 |
| Father's Day | 300 |
| Halloween | 40 |
| St. Patrick's Day | 265 |
| Summer Vibes | 297 |
| Spring Clean | 269 |
| Techno & Synth | 289 |
| Monochromatic | 150 |

---

## Latest Update

**v1.6.0** — Expanded the curated palette library to over 8,400 palettes across 28 categories. Each of the 7 harmony types now generates 150 unique palettes (up from 50), adding 700 new harmony-based palettes. Also includes a palette view counter that tracks popularity and surfaces trending palettes.

See the full [public changelog](https://colourpalettes.techhive.net/changelog) for the complete update history.

---

## Author & Credits

Created by **AJ Batac / @ajbatac**. Open-source contribution supported by [Kulay Canada](https://kulay.ca).

[Portfolio](https://ajbatac.github.io/?=colorpalettegen) &middot; [GitHub](https://github.com/josephbatac2/Color-Palette-Generator) &middot; [LinkedIn](https://www.linkedin.com/in/ajbatac/)

---

## License

ISC License. See the repository for full details.
