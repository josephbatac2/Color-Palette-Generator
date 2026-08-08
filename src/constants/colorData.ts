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
  { name: "All Palettes", count: 1811 },
  { name: "Blues & Teals", count: 54 },
  { name: "Greens & Nature", count: 91 },
  { name: "Reds & Pinks", count: 90 },
  { name: "Purples & Violets", count: 89 },
  { name: "Oranges & Yellows", count: 122 },
  { name: "Neutrals & Grays", count: 88 },
  { name: "Vibrant & Neon", count: 89 },
  { name: "Pastels & Soft", count: 150 },
  { name: "Complementary", count: 90 },
  { name: "Holiday & Seasonal", count: 79 },
  { name: "Blacks & Whites", count: 79 },
  { name: "Warm & Cool", count: 70 },
  { name: "Teal & Orange", count: 60 },
  { name: "Triadic", count: 50 },
  { name: "Analogous", count: 80 },
  { name: "Split-Complementary", count: 50 },
  { name: "Tetradic", count: 50 },
  { name: "Square", count: 50 },
  { name: "Valentines & Love", count: 40 },
  { name: "Mother's Day", count: 40 },
  { name: "Father's Day", count: 80 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 40 },
  { name: "Summer Vibes", count: 70 },
  { name: "Spring Clean", count: 40 },
  { name: "Techno & Synth", count: 60 }
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
