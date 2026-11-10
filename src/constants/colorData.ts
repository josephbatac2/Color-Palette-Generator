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
  { name: "All Palettes", count: 7725 },
  { name: "Blues & Teals", count: 283 },
  { name: "Greens & Nature", count: 300 },
  { name: "Reds & Pinks", count: 299 },
  { name: "Purples & Violets", count: 298 },
  { name: "Oranges & Yellows", count: 331 },
  { name: "Neutrals & Grays", count: 297 },
  { name: "Vibrant & Neon", count: 298 },
  { name: "Pastels & Soft", count: 359 },
  { name: "Complementary", count: 368 },
  { name: "Holiday & Seasonal", count: 308 },
  { name: "Blacks & Whites", count: 308 },
  { name: "Warm & Cool", count: 300 },
  { name: "Teal & Orange", count: 289 },
  { name: "Triadic", count: 329 },
  { name: "Analogous", count: 359 },
  { name: "Split-Complementary", count: 329 },
  { name: "Tetradic", count: 329 },
  { name: "Square", count: 329 },
  { name: "Valentines & Love", count: 269 },
  { name: "Mother's Day", count: 269 },
  { name: "Father's Day", count: 300 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 265 },
  { name: "Summer Vibes", count: 297 },
  { name: "Spring Clean", count: 269 },
  { name: "Techno & Synth", count: 289 },
  { name: "Monochromatic", count: 50 }
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
