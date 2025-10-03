export interface Color {
  h: number;
  s: number;
  l: number;
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: Color[];
  type: 'generated' | 'curated' | 'custom';
  harmony?: ColorHarmony;
  createdAt: Date;
}

export type ColorHarmony = 
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'tetradic'
  | 'split-complementary';

export interface ContrastRatio {
  ratio: number;
  level: 'AA' | 'AAA' | 'fail';
}

export interface ColorBlindnessType {
  type: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
  name: string;
}

export interface ExportFormat {
  format: 'css' | 'scss' | 'json' | 'png' | 'svg';
  options?: Record<string, any>;
}