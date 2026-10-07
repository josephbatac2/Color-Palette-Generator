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
  { name: "All Palettes", count: 7146 },
  { name: "Blues & Teals", count: 274 },
  { name: "Greens & Nature", count: 291 },
  { name: "Reds & Pinks", count: 290 },
  { name: "Purples & Violets", count: 289 },
  { name: "Oranges & Yellows", count: 322 },
  { name: "Neutrals & Grays", count: 288 },
  { name: "Vibrant & Neon", count: 289 },
  { name: "Pastels & Soft", count: 350 },
  { name: "Complementary", count: 309 },
  { name: "Holiday & Seasonal", count: 299 },
  { name: "Blacks & Whites", count: 299 },
  { name: "Warm & Cool", count: 291 },
  { name: "Teal & Orange", count: 280 },
  { name: "Triadic", count: 270 },
  { name: "Analogous", count: 300 },
  { name: "Split-Complementary", count: 270 },
  { name: "Tetradic", count: 270 },
  { name: "Square", count: 270 },
  { name: "Valentines & Love", count: 260 },
  { name: "Mother's Day", count: 260 },
  { name: "Father's Day", count: 291 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 256 },
  { name: "Summer Vibes", count: 288 },
  { name: "Spring Clean", count: 260 },
  { name: "Techno & Synth", count: 280 }
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
