import { ColorPalette, Color } from '../types/color';
import { ColorUtils } from './colorUtils';

type CuratedPalette = Omit<ColorPalette, 'id' | 'createdAt'> & { category: string };

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

interface CategoryRecipe {
  categoryId: string;
  baseSeed: number;
  namePrefixes: string[];
  hueRange: [number, number];
  hueSpan: number;
  satRange: [number, number];
  lightRange: [number, number];
  mono: boolean;
}

const recipes: CategoryRecipe[] = [
  { categoryId: 'blues', baseSeed: 1000, namePrefixes: ['Azure', 'Cobalt', 'Cerulean', 'Indigo', 'Periwinkle', 'Cyan'], hueRange: [180, 240], hueSpan: 20, satRange: [50, 95], lightRange: [25, 85], mono: false },
  { categoryId: 'greens', baseSeed: 2000, namePrefixes: ['Verdant', 'Olive', 'Chartreuse', 'Jade', 'Fern', 'Clover'], hueRange: [80, 160], hueSpan: 20, satRange: [40, 85], lightRange: [25, 80], mono: false },
  { categoryId: 'reds', baseSeed: 3000, namePrefixes: ['Crimson', 'Scarlet', 'Carmine', 'Rose', 'Coral', 'Garnet'], hueRange: [340, 20], hueSpan: 15, satRange: [60, 100], lightRange: [30, 80], mono: false },
  { categoryId: 'purples', baseSeed: 4000, namePrefixes: ['Amethyst', 'Mauve', 'Orchid', 'Plum', 'Lilac', 'Magenta'], hueRange: [260, 320], hueSpan: 20, satRange: [40, 90], lightRange: [25, 80], mono: false },
  { categoryId: 'oranges', baseSeed: 5000, namePrefixes: ['Amber', 'Tangerine', 'Apricot', 'Marigold', 'Pumpkin', 'Saffron'], hueRange: [15, 55], hueSpan: 15, satRange: [60, 100], lightRange: [35, 85], mono: false },
  { categoryId: 'neutrals', baseSeed: 6000, namePrefixes: ['Stone', 'Pebble', 'Ash', 'Clay', 'Slate', 'Fossil'], hueRange: [0, 360], hueSpan: 10, satRange: [0, 15], lightRange: [15, 90], mono: true },
  { categoryId: 'vibrant', baseSeed: 7000, namePrefixes: ['Electric', 'Neon', 'Hyper', 'Cosmic', 'Prism', 'Vivid'], hueRange: [0, 360], hueSpan: 60, satRange: [85, 100], lightRange: [40, 70], mono: false },
  { categoryId: 'pastels', baseSeed: 8000, namePrefixes: ['Powder', 'Blush', 'Petal', 'Cloud', 'Frost', 'Breeze'], hueRange: [0, 360], hueSpan: 30, satRange: [20, 45], lightRange: [75, 92], mono: false },
  { categoryId: 'complementary', baseSeed: 9000, namePrefixes: ['Contrast', 'Balance', 'Polar', 'Flip', 'Mirror', 'Counter'], hueRange: [0, 360], hueSpan: 0, satRange: [50, 90], lightRange: [35, 75], mono: false },
  { categoryId: 'holidays', baseSeed: 10000, namePrefixes: ['Festive', 'Seasonal', 'Celebration', 'Jubilee', 'Ornament', 'Tidings'], hueRange: [0, 360], hueSpan: 40, satRange: [50, 95], lightRange: [30, 75], mono: false },
  { categoryId: 'blackswhites', baseSeed: 11000, namePrefixes: ['Mono', 'Eclipse', 'Ivory', 'Onyx', 'Pearl', 'Obsidian'], hueRange: [0, 360], hueSpan: 0, satRange: [0, 5], lightRange: [5, 95], mono: true },
  { categoryId: 'analogous', baseSeed: 12000, namePrefixes: ['Warm', 'Cool', 'Gradient', 'Flow', 'Spectrum', 'Drift'], hueRange: [0, 360], hueSpan: 30, satRange: [50, 85], lightRange: [35, 75], mono: false },
  { categoryId: 'tealorange', baseSeed: 13000, namePrefixes: ['Cinema', 'Sunset', 'Duet', 'Contrast', 'Copper', 'Teal'], hueRange: [180, 200], hueSpan: 0, satRange: [60, 95], lightRange: [35, 70], mono: false },
  { categoryId: 'triadic', baseSeed: 14000, namePrefixes: ['Triangle', 'Triple', 'Prism', 'Spectrum', 'Equilateral', 'Harmony'], hueRange: [0, 360], hueSpan: 0, satRange: [55, 90], lightRange: [40, 70], mono: false },
  { categoryId: 'analogous-scheme', baseSeed: 15000, namePrefixes: ['Adjacent', 'Neighbor', 'Harmony', 'Blend', 'Transition', 'Adjacent'], hueRange: [0, 360], hueSpan: 25, satRange: [45, 80], lightRange: [35, 75], mono: false },
  { categoryId: 'split-complementary', baseSeed: 16000, namePrefixes: ['Split', 'Wedge', 'Fork', 'Diverge', 'Branch', 'Y-Split'], hueRange: [0, 360], hueSpan: 0, satRange: [50, 85], lightRange: [35, 70], mono: false },
  { categoryId: 'tetradic', baseSeed: 17000, namePrefixes: ['Tetrad', 'Quad', 'Rectangle', 'Four-Way', 'Cross', 'Compass'], hueRange: [0, 360], hueSpan: 0, satRange: [50, 85], lightRange: [35, 70], mono: false },
  { categoryId: 'square', baseSeed: 18000, namePrefixes: ['Square', 'Diamond', 'Right-Angle', 'Cardinal', 'Four-Point', 'Quadra'], hueRange: [0, 360], hueSpan: 0, satRange: [50, 85], lightRange: [35, 70], mono: false },
  { categoryId: 'valentines', baseSeed: 19000, namePrefixes: ['Cupid', 'Heart', 'Romance', 'Adore', 'Devotion', 'Sweetheart'], hueRange: [330, 360], hueSpan: 10, satRange: [50, 95], lightRange: [40, 80], mono: false },
  { categoryId: 'mothersday', baseSeed: 20000, namePrefixes: ['Bloom', 'Nurture', 'Gentle', 'Blossom', 'Tender', 'Petal'], hueRange: [300, 360], hueSpan: 20, satRange: [40, 80], lightRange: [50, 85], mono: false },
  { categoryId: 'stpatricks', baseSeed: 21000, namePrefixes: ['Clover', 'Emerald', 'Lucky', 'Leprechaun', 'Shamrock', 'Gold'], hueRange: [100, 160], hueSpan: 10, satRange: [50, 95], lightRange: [30, 75], mono: false },
  { categoryId: 'fathersday', baseSeed: 22000, namePrefixes: ['Heritage', 'Stoic', 'Craftsman', 'Vintage', 'Classic', 'Legacy'], hueRange: [200, 240], hueSpan: 10, satRange: [20, 50], lightRange: [20, 60], mono: false },
  { categoryId: 'summervibes', baseSeed: 23000, namePrefixes: ['Beach', 'Tropical', 'Sunshine', 'Getaway', 'Paradise', 'Vacation'], hueRange: [15, 200], hueSpan: 40, satRange: [60, 100], lightRange: [45, 80], mono: false },
  { categoryId: 'springclean', baseSeed: 24000, namePrefixes: ['Fresh', 'Renew', 'Cleanse', 'Revive', 'Blossom', 'Awaken'], hueRange: [60, 180], hueSpan: 30, satRange: [30, 65], lightRange: [55, 85], mono: false },
  { categoryId: 'technosynth', baseSeed: 25000, namePrefixes: ['Synth', 'Digital', 'Cyber', 'Pulse', 'Wavelength', 'Frequency'], hueRange: [180, 320], hueSpan: 40, satRange: [80, 100], lightRange: [35, 65], mono: false },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function generatePalette(recipe: CategoryRecipe, index: number): CuratedPalette {
  const rng = mulberry32(recipe.baseSeed + index * 7919);
  const prefix = recipe.namePrefixes[index % recipe.namePrefixes.length];
  const suffix = index < recipe.namePrefixes.length ? '' : ` ${Math.floor(index / recipe.namePrefixes.length) + 1}`;
  const name = `${prefix}${suffix}`;

  const colors: Color[] = [];
  const baseHue = wrapHue(recipe.hueRange[0] + rng() * (recipe.hueRange[1] - recipe.hueRange[0] + 360) % 360);

  if (recipe.categoryId === 'complementary') {
    const h1 = baseHue;
    const h2 = wrapHue(baseHue + 180);
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const h = i < 3 ? h1 : h2;
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], t);
      colors.push(ColorUtils.createColor(wrapHue(h + (rng() - 0.5) * recipe.hueSpan), s, l));
    }
  } else if (recipe.categoryId === 'triadic') {
    const hues = [baseHue, wrapHue(baseHue + 120), wrapHue(baseHue + 240), baseHue, wrapHue(baseHue + 120)];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.categoryId === 'split-complementary') {
    const hues = [baseHue, wrapHue(baseHue + 150), wrapHue(baseHue + 210), wrapHue(baseHue + 150), baseHue];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.categoryId === 'tetradic') {
    const hues = [baseHue, wrapHue(baseHue + 90), wrapHue(baseHue + 180), wrapHue(baseHue + 270), baseHue];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.categoryId === 'square') {
    const hues = [baseHue, wrapHue(baseHue + 90), wrapHue(baseHue + 180), wrapHue(baseHue + 270), baseHue];
    for (let i = 0; i < 5; i++) {
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(hues[i], s, l));
    }
  } else if (recipe.categoryId === 'tealorange') {
    const tealHue = 180 + rng() * 20;
    const orangeHue = 20 + rng() * 20;
    for (let i = 0; i < 5; i++) {
      const h = i < 3 ? tealHue : orangeHue;
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      colors.push(ColorUtils.createColor(h, s, l));
    }
  } else if (recipe.mono) {
    for (let i = 0; i < 5; i++) {
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], i / 4);
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const h = recipe.satRange[0] === 0 ? 0 : baseHue;
      colors.push(ColorUtils.createColor(h, s, l));
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const hOffset = (rng() - 0.5) * recipe.hueSpan;
      const h = wrapHue(baseHue + i * (recipe.hueSpan / 4) + hOffset);
      const s = lerp(recipe.satRange[0], recipe.satRange[1], rng());
      const l = lerp(recipe.lightRange[1], recipe.lightRange[0], t);
      colors.push(ColorUtils.createColor(h, s, l));
    }
  }

  return {
    name,
    type: 'curated',
    category: recipe.categoryId,
    colors,
  };
}

export function generateAllPalettes(countPerCategory = 30): CuratedPalette[] {
  const all: CuratedPalette[] = [];
  for (const recipe of recipes) {
    for (let i = 0; i < countPerCategory; i++) {
      all.push(generatePalette(recipe, i));
    }
  }
  return all;
}

export function getGeneratedCategoryCounts(countPerCategory = 30): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const recipe of recipes) {
    counts[recipe.categoryId] = countPerCategory;
  }
  return counts;
}
