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
  { name: "All Palettes", count: 5646 },
  { name: "Blues & Teals", count: 214 },
  { name: "Greens & Nature", count: 231 },
  { name: "Reds & Pinks", count: 230 },
  { name: "Purples & Violets", count: 229 },
  { name: "Oranges & Yellows", count: 262 },
  { name: "Neutrals & Grays", count: 228 },
  { name: "Vibrant & Neon", count: 229 },
  { name: "Pastels & Soft", count: 290 },
  { name: "Complementary", count: 249 },
  { name: "Holiday & Seasonal", count: 239 },
  { name: "Blacks & Whites", count: 239 },
  { name: "Warm & Cool", count: 231 },
  { name: "Teal & Orange", count: 220 },
  { name: "Triadic", count: 210 },
  { name: "Analogous", count: 240 },
  { name: "Split-Complementary", count: 210 },
  { name: "Tetradic", count: 210 },
  { name: "Square", count: 210 },
  { name: "Valentines & Love", count: 200 },
  { name: "Mother's Day", count: 200 },
  { name: "Father's Day", count: 231 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 196 },
  { name: "Summer Vibes", count: 228 },
  { name: "Spring Clean", count: 200 },
  { name: "Techno & Synth", count: 220 }
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
