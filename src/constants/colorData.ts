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
  { name: "All Palettes", count: 4646 },
  { name: "Blues & Teals", count: 174 },
  { name: "Greens & Nature", count: 191 },
  { name: "Reds & Pinks", count: 190 },
  { name: "Purples & Violets", count: 189 },
  { name: "Oranges & Yellows", count: 222 },
  { name: "Neutrals & Grays", count: 188 },
  { name: "Vibrant & Neon", count: 189 },
  { name: "Pastels & Soft", count: 250 },
  { name: "Complementary", count: 209 },
  { name: "Holiday & Seasonal", count: 199 },
  { name: "Blacks & Whites", count: 199 },
  { name: "Warm & Cool", count: 191 },
  { name: "Teal & Orange", count: 180 },
  { name: "Triadic", count: 170 },
  { name: "Analogous", count: 200 },
  { name: "Split-Complementary", count: 170 },
  { name: "Tetradic", count: 170 },
  { name: "Square", count: 170 },
  { name: "Valentines & Love", count: 160 },
  { name: "Mother's Day", count: 160 },
  { name: "Father's Day", count: 191 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 156 },
  { name: "Summer Vibes", count: 188 },
  { name: "Spring Clean", count: 160 },
  { name: "Techno & Synth", count: 180 }
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
