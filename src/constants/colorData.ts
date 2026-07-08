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
  { name: "All Palettes", count: 731 },
  { name: "Blues & Teals", count: 24 },
  { name: "Greens & Nature", count: 21 },
  { name: "Reds & Pinks", count: 20 },
  { name: "Purples & Violets", count: 19 },
  { name: "Oranges & Yellows", count: 52 },
  { name: "Neutrals & Grays", count: 18 },
  { name: "Vibrant & Neon", count: 19 },
  { name: "Pastels & Soft", count: 30 },
  { name: "Complementary", count: 60 },
  { name: "Holiday & Seasonal", count: 49 },
  { name: "Blacks & Whites", count: 49 },
  { name: "Warm & Cool", count: 40 },
  { name: "Teal & Orange", count: 30 },
  { name: "Triadic", count: 20 },
  { name: "Analogous", count: 50 },
  { name: "Split-Complementary", count: 20 },
  { name: "Tetradic", count: 20 },
  { name: "Square", count: 20 },
  { name: "Valentines & Love", count: 10 },
  { name: "Mother's Day", count: 10 },
  { name: "Father's Day", count: 50 },
  { name: "Halloween", count: 10 },
  { name: "St. Patrick's Day", count: 10 },
  { name: "Summer Vibes", count: 40 },
  { name: "Spring Clean", count: 10 },
  { name: "Techno & Synth", count: 30 }
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
