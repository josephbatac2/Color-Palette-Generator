export interface PaletteCategory {
  name: string;
  count: number;
}

export interface HarmonyType {
  name: string;
  type: string;
}

export interface VisionType {
  name: string;
  type: string;
}

export const PALETTE_CATEGORIES: PaletteCategory[] = [
  { name: "All Palettes", count: 7271 },
  { name: "Blues & Teals", count: 279 },
  { name: "Greens & Nature", count: 296 },
  { name: "Reds & Pinks", count: 295 },
  { name: "Purples & Violets", count: 294 },
  { name: "Oranges & Yellows", count: 327 },
  { name: "Neutrals & Grays", count: 293 },
  { name: "Vibrant & Neon", count: 294 },
  { name: "Pastels & Soft", count: 355 },
  { name: "Complementary", count: 314 },
  { name: "Holiday & Seasonal", count: 304 },
  { name: "Blacks & Whites", count: 304 },
  { name: "Warm & Cool", count: 296 },
  { name: "Teal & Orange", count: 285 },
  { name: "Triadic", count: 275 },
  { name: "Analogous", count: 305 },
  { name: "Split-Complementary", count: 275 },
  { name: "Tetradic", count: 275 },
  { name: "Square", count: 275 },
  { name: "Valentines & Love", count: 265 },
  { name: "Mother's Day", count: 265 },
  { name: "Father's Day", count: 296 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 261 },
  { name: "Summer Vibes", count: 293 },
  { name: "Spring Clean", count: 265 },
  { name: "Techno & Synth", count: 285 }
];

export const HARMONY_TYPES: HarmonyType[] = [
  { name: "Monochromatic", type: "monochromatic" },
  { name: "Analogous", type: "analogous" },
  { name: "Complementary", type: "complementary" },
  { name: "Split-Complementary", type: "split-complementary" },
  { name: "Triadic", type: "triadic" },
  { name: "Tetradic", type: "tetradic" },
  { name: "Square", type: "square" }
];

export const VISION_TYPES: VisionType[] = [
  { name: "Normal Vision", type: "normal" },
  { name: "Deuteranopia", type: "deuteranopia" },
  { name: "Protanopia", type: "protanopia" },
  { name: "Tritanopia", type: "tritanopia" }
];

export const calculateStats = () => {
  const totalPalettes = PALETTE_CATEGORIES[0].count;
  const harmonyCount = HARMONY_TYPES.length;
  const visionCount = VISION_TYPES.length;

  return [
    { number: totalPalettes.toString(), label: "Curated Palettes" },
    { number: harmonyCount.toString(), label: "Harmony Types" },
    { number: visionCount.toString(), label: "Vision Types" },
    { number: "100%", label: "Free to Use" }
  ];
};
