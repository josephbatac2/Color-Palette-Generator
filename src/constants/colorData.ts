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
  { name: "All Palettes", count: 4896 },
  { name: "Blues & Teals", count: 184 },
  { name: "Greens & Nature", count: 201 },
  { name: "Reds & Pinks", count: 200 },
  { name: "Purples & Violets", count: 199 },
  { name: "Oranges & Yellows", count: 232 },
  { name: "Neutrals & Grays", count: 198 },
  { name: "Vibrant & Neon", count: 199 },
  { name: "Pastels & Soft", count: 260 },
  { name: "Complementary", count: 219 },
  { name: "Holiday & Seasonal", count: 209 },
  { name: "Blacks & Whites", count: 209 },
  { name: "Warm & Cool", count: 201 },
  { name: "Teal & Orange", count: 190 },
  { name: "Triadic", count: 180 },
  { name: "Analogous", count: 210 },
  { name: "Split-Complementary", count: 180 },
  { name: "Tetradic", count: 180 },
  { name: "Square", count: 180 },
  { name: "Valentines & Love", count: 170 },
  { name: "Mother's Day", count: 170 },
  { name: "Father's Day", count: 201 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 166 },
  { name: "Summer Vibes", count: 198 },
  { name: "Spring Clean", count: 170 },
  { name: "Techno & Synth", count: 190 }
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
