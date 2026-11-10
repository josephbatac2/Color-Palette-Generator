import { ColorPalette, Color } from '../types/color';
import { ColorUtils } from './colorUtils';

type HarmonyPalette = Omit<ColorPalette, 'id' | 'createdAt'> & { category: string; isNew?: boolean };

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

type HarmonyType =
  | 'monochromatic'
  | 'analogous-scheme'
  | 'complementary'
  | 'split-complementary'
  | 'triadic'
  | 'tetradic'
  | 'square';

interface HarmonyRecipe {
  type: HarmonyType;
  baseSeed: number;
  namePrefixes: string[];
  hueRange: [number, number];
  satRange: [number, number];
  lightRange: [number, number];
}

const recipes: HarmonyRecipe[] = [
  {
    type: 'monochromatic',
    baseSeed: 51000,
    namePrefixes: ['Mono', 'Shade', 'Tint', 'Tone', 'Depth', 'Halo'],
    hueRange: [0, 360],
    satRange: [35, 80],
    lightRange: [20, 90],
  },
  {
    type: 'analogous-scheme',
    baseSeed: 52000,
    namePrefixes: ['Adjacent', 'Neighbor', 'Blend', 'Flow', 'Drift', 'Gradient'],
    hueRange: [0, 360],
    satRange: [45, 85],
    lightRange: [30, 80],
  },
  {
    type: 'complementary',
    baseSeed: 53000,
    namePrefixes: ['Contrast', 'Polar', 'Flip', 'Mirror', 'Counter', 'Clash'],
    hueRange: [0, 360],
    satRange: [50, 95],
    lightRange: [30, 80],
  },
  {
    type: 'split-complementary',
    baseSeed: 54000,
    namePrefixes: ['Split', 'Wedge', 'Fork', 'Diverge', 'Branch', 'Y-Split'],
    hueRange: [0, 360],
    satRange: [50, 90],
    lightRange: [30, 75],
  },
  {
    type: 'triadic',
    baseSeed: 55000,
    namePrefixes: ['Triangle', 'Triple', 'Prism', 'Equilateral', 'Spectrum', 'Trinity'],
    hueRange: [0, 360],
    satRange: [55, 95],
    lightRange: [35, 75],
  },
  {
    type: 'tetradic',
    baseSeed: 56000,
    namePrefixes: ['Tetrad', 'Quad', 'Rectangle', 'Four-Way', 'Cross', 'Quartet'],
    hueRange: [0, 360],
    satRange: [45, 85],
    lightRange: [30, 70],
  },
  {
    type: 'square',
    baseSeed: 57000,
    namePrefixes: ['Square', 'Diamond', 'Cardinal', 'Four-Point', 'Quadra', 'Right-Angle'],
    hueRange: [0, 360],
    satRange: [50, 90],
    lightRange: [30, 70],
  },
];

function generateHarmonyPalette(recipe: HarmonyRecipe, index: number): HarmonyPalette {
  const rng = mulberry32(recipe.baseSeed + index * 7919);
  const prefix = recipe.namePrefixes[index % recipe.namePrefixes.length];
  const suffix = index < recipe.namePrefixes.length ? '' : ` ${Math.floor(index / recipe.namePrefixes.length) + 1}`;
  const name = `${prefix}${suffix}`;

  const baseHue = wrapHue(recipe.hueRange[0] + rng() * (recipe.hueRange[1] - recipe.hueRange[0]));
  const colors: Color[] = [];

  if (recipe.type === 'monochromatic') {
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng()) * (0.8 + 0.4 * rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], t);
      colors.push(ColorUtils.createColor(baseHue, Math.min(100, s), l));
    }
  } else if (recipe.type === 'analogous-scheme') {
    const span = 20 + rng() * 25;
    const direction = rng() > 0.5 ? 1 : -1;
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const h = wrapHue(baseHue + direction * (t * span));
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], t);
      colors.push(ColorUtils.createColor(h, s, l));
    }
  } else if (recipe.type === 'complementary') {
    const h1 = baseHue;
    const h2 = wrapHue(baseHue + 180);
    for (let i = 0; i < 5; i++) {
      const h = i < 3 ? h1 : h2;
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(h, s, l));
    }
  } else if (recipe.type === 'split-complementary') {
    const hues = [
      baseHue,
      wrapHue(baseHue + 150),
      wrapHue(baseHue + 210),
      wrapHue(baseHue + 150),
      baseHue,
    ];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.type === 'triadic') {
    const hues = [
      baseHue,
      wrapHue(baseHue + 120),
      wrapHue(baseHue + 240),
      baseHue,
      wrapHue(baseHue + 120),
    ];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.type === 'tetradic') {
    const offset = 30 + rng() * 60;
    const hues = [
      baseHue,
      wrapHue(baseHue + offset),
      wrapHue(baseHue + 180),
      wrapHue(baseHue + 180 + offset),
      baseHue,
    ];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.type === 'square') {
    const hues = [
      baseHue,
      wrapHue(baseHue + 90),
      wrapHue(baseHue + 180),
      wrapHue(baseHue + 270),
      baseHue,
    ];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  }

  return {
    name,
    type: 'curated',
    category: recipe.type,
    isNew: true,
    colors,
  };
}

export function generateAllHarmonyPalettes(countPerType = 50): HarmonyPalette[] {
  const all: HarmonyPalette[] = [];
  for (const recipe of recipes) {
    for (let i = 0; i < countPerType; i++) {
      all.push(generateHarmonyPalette(recipe, i));
    }
  }
  return all;
}

export function getHarmonyCategoryCounts(countPerType = 50): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const recipe of recipes) {
    counts[recipe.type] = countPerType;
  }
  return counts;
}
