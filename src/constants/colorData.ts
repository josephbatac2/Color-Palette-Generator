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
  { name: "All Palettes", count: 6396 },
  { name: "Blues & Teals", count: 244 },
  { name: "Greens & Nature", count: 261 },
  { name: "Reds & Pinks", count: 260 },
  { name: "Purples & Violets", count: 259 },
  { name: "Oranges & Yellows", count: 292 },
  { name: "Neutrals & Grays", count: 258 },
  { name: "Vibrant & Neon", count: 259 },
  { name: "Pastels & Soft", count: 320 },
  { name: "Complementary", count: 279 },
  { name: "Holiday & Seasonal", count: 269 },
  { name: "Blacks & Whites", count: 269 },
  { name: "Warm & Cool", count: 261 },
  { name: "Teal & Orange", count: 250 },
  { name: "Triadic", count: 240 },
  { name: "Analogous", count: 270 },
  { name: "Split-Complementary", count: 240 },
  { name: "Tetradic", count: 240 },
  { name: "Square", count: 240 },
  { name: "Valentines & Love", count: 230 },
  { name: "Mother's Day", count: 230 },
  { name: "Father's Day", count: 261 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 226 },
  { name: "Summer Vibes", count: 258 },
  { name: "Spring Clean", count: 230 },
  { name: "Techno & Synth", count: 250 }
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
