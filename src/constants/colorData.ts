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
  { name: "All Palettes", count: 2561 },
  { name: "Blues & Teals", count: 84 },
  { name: "Greens & Nature", count: 121 },
  { name: "Reds & Pinks", count: 120 },
  { name: "Purples & Violets", count: 119 },
  { name: "Oranges & Yellows", count: 152 },
  { name: "Neutrals & Grays", count: 118 },
  { name: "Vibrant & Neon", count: 119 },
  { name: "Pastels & Soft", count: 180 },
  { name: "Complementary", count: 120 },
  { name: "Holiday & Seasonal", count: 109 },
  { name: "Blacks & Whites", count: 109 },
  { name: "Warm & Cool", count: 100 },
  { name: "Teal & Orange", count: 90 },
  { name: "Triadic", count: 80 },
  { name: "Analogous", count: 110 },
  { name: "Split-Complementary", count: 80 },
  { name: "Tetradic", count: 80 },
  { name: "Square", count: 80 },
  { name: "Valentines & Love", count: 70 },
  { name: "Mother's Day", count: 70 },
  { name: "Father's Day", count: 110 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 70 },
  { name: "Summer Vibes", count: 100 },
  { name: "Spring Clean", count: 70 },
  { name: "Techno & Synth", count: 90 }
];

export const HARMONY_TYPES: HarmonyType[] = [
  { name: "Complementary", type: "complementary" },
  { name: "Triadic", type: "triadic" },
  { name: "Analogous", type: "analogous" },
  { name: "Tetradic", type: "tetradic" },
  { name: "Split-Complementary", type: "split-complementary" },
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
