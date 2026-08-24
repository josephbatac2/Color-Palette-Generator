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
  { name: "All Palettes", count: 3396 },
  { name: "Blues & Teals", count: 124 },
  { name: "Greens & Nature", count: 141 },
  { name: "Reds & Pinks", count: 140 },
  { name: "Purples & Violets", count: 139 },
  { name: "Oranges & Yellows", count: 172 },
  { name: "Neutrals & Grays", count: 138 },
  { name: "Vibrant & Neon", count: 139 },
  { name: "Pastels & Soft", count: 200 },
  { name: "Complementary", count: 159 },
  { name: "Holiday & Seasonal", count: 149 },
  { name: "Blacks & Whites", count: 149 },
  { name: "Warm & Cool", count: 141 },
  { name: "Teal & Orange", count: 130 },
  { name: "Triadic", count: 120 },
  { name: "Analogous", count: 150 },
  { name: "Split-Complementary", count: 120 },
  { name: "Tetradic", count: 120 },
  { name: "Square", count: 120 },
  { name: "Valentines & Love", count: 110 },
  { name: "Mother's Day", count: 110 },
  { name: "Father's Day", count: 141 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 106 },
  { name: "Summer Vibes", count: 138 },
  { name: "Spring Clean", count: 110 },
  { name: "Techno & Synth", count: 130 }
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
