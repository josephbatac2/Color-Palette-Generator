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
  { name: "All Palettes", count: 5146 },
  { name: "Blues & Teals", count: 194 },
  { name: "Greens & Nature", count: 211 },
  { name: "Reds & Pinks", count: 210 },
  { name: "Purples & Violets", count: 209 },
  { name: "Oranges & Yellows", count: 242 },
  { name: "Neutrals & Grays", count: 208 },
  { name: "Vibrant & Neon", count: 209 },
  { name: "Pastels & Soft", count: 270 },
  { name: "Complementary", count: 229 },
  { name: "Holiday & Seasonal", count: 219 },
  { name: "Blacks & Whites", count: 219 },
  { name: "Warm & Cool", count: 211 },
  { name: "Teal & Orange", count: 200 },
  { name: "Triadic", count: 190 },
  { name: "Analogous", count: 220 },
  { name: "Split-Complementary", count: 190 },
  { name: "Tetradic", count: 190 },
  { name: "Square", count: 190 },
  { name: "Valentines & Love", count: 180 },
  { name: "Mother's Day", count: 180 },
  { name: "Father's Day", count: 211 },
  { name: "Halloween", count: 40 },
  { name: "St. Patrick's Day", count: 176 },
  { name: "Summer Vibes", count: 208 },
  { name: "Spring Clean", count: 180 },
  { name: "Techno & Synth", count: 200 }
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
