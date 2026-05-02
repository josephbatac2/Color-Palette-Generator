import { Color, ColorHarmony, ContrastRatio } from '../types/color';

export class ColorUtils {
  /**
   * Convert HSL to RGB
   */
  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const hNorm = h / 360;
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1));
    const m = lNorm - c / 2;

    let r = 0, g = 0, b = 0;

    if (hNorm >= 0 && hNorm < 1/6) {
      r = c; g = x; b = 0;
    } else if (hNorm >= 1/6 && hNorm < 2/6) {
      r = x; g = c; b = 0;
    } else if (hNorm >= 2/6 && hNorm < 3/6) {
      r = 0; g = c; b = x;
    } else if (hNorm >= 3/6 && hNorm < 4/6) {
      r = 0; g = x; b = c;
    } else if (hNorm >= 4/6 && hNorm < 5/6) {
      r = x; g = 0; b = c;
    } else if (hNorm >= 5/6 && hNorm < 1) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  /**
   * Convert RGB to HSL
   */
  static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

      switch (max) {
        case r:
          h = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  /**
   * Convert RGB to HEX
   */
  static rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  /**
   * Convert HEX to RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  /**
   * Create a Color object from HSL values
   */
  static createColor(h: number, s: number, l: number): Color {
    // Ensure valid ranges
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));
    
    const rgb = this.hslToRgb(h, s, l);
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
    
    return {
      h,
      s,
      l,
      hex,
      rgb,
      hsl: { h, s, l },
    };
  }

  /**
   * Generate color harmony palettes
   */
  static generateHarmony(baseColor: Color, harmony: ColorHarmony): Color[] {
    const colors: Color[] = [baseColor];
    
    switch (harmony) {
      case 'monochromatic':
        for (let i = 1; i < 5; i++) {
          const newL = Math.max(10, Math.min(90, baseColor.l + (i * 15) - 30));
          colors.push(this.createColor(baseColor.h, baseColor.s, newL));
        }
        break;
        
      case 'analogous':
        for (let i = 1; i < 5; i++) {
          const newH = (baseColor.h + (i * 30)) % 360;
          colors.push(this.createColor(newH, baseColor.s, baseColor.l));
        }
        break;
        
      case 'complementary':
        colors.push(this.createColor((baseColor.h + 180) % 360, baseColor.s, baseColor.l));
        colors.push(this.createColor(baseColor.h, baseColor.s, Math.max(10, baseColor.l - 20)));
        colors.push(this.createColor((baseColor.h + 180) % 360, baseColor.s, Math.max(10, baseColor.l - 20)));
        break;
        
      case 'triadic':
        colors.push(this.createColor((baseColor.h + 120) % 360, baseColor.s, baseColor.l));
        colors.push(this.createColor((baseColor.h + 240) % 360, baseColor.s, baseColor.l));
        break;
        
      case 'tetradic':
        colors.push(this.createColor((baseColor.h + 90) % 360, baseColor.s, baseColor.l));
        colors.push(this.createColor((baseColor.h + 180) % 360, baseColor.s, baseColor.l));
        colors.push(this.createColor((baseColor.h + 270) % 360, baseColor.s, baseColor.l));
        break;
        
      case 'split-complementary':
        colors.push(this.createColor((baseColor.h + 150) % 360, baseColor.s, baseColor.l));
        colors.push(this.createColor((baseColor.h + 210) % 360, baseColor.s, baseColor.l));
        break;
    }
    
    return colors;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  static calculateContrastRatio(color1: Color, color2: Color): ContrastRatio {
    const getLuminance = (color: Color) => {
      const { r, g, b } = color.rgb;
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    
    let level: 'AA' | 'AAA' | 'fail';
    if (ratio >= 7) level = 'AAA';
    else if (ratio >= 4.5) level = 'AA';
    else level = 'fail';

    return { ratio: Math.round(ratio * 100) / 100, level };
  }

  /**
   * Convert RGB to CMYK
   */
  static rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
    const rN = r / 255;
    const gN = g / 255;
    const bN = b / 255;

    const k = 1 - Math.max(rN, gN, bN);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

    const c = ((1 - rN - k) / (1 - k)) * 100;
    const m = ((1 - gN - k) / (1 - k)) * 100;
    const y = ((1 - bN - k) / (1 - k)) * 100;

    return {
      c: Math.round(c),
      m: Math.round(m),
      y: Math.round(y),
      k: Math.round(k * 100),
    };
  }

  /**
   * Convert RGB to OKLCH
   */
  static rgbToOklch(r: number, g: number, b: number): { L: number; C: number; h: number } {
    // Linearize sRGB
    const linearize = (c: number) => {
      c /= 255;
      return c >= 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
    };
    const lr = linearize(r);
    const lg = linearize(g);
    const lb = linearize(b);

    // sRGB -> OKLab via linear RGB -> OKLab
    // Linear sRGB to LMS (using OKLab M1 matrix)
    const l_ = 0.4122214708 * lr + 0.5363385400 * lg + 0.0514459940 * lb;
    const m_ = 0.2119034980 * lr + 0.6806996000 * lg + 0.1073969600 * lb;
    const s_ = 0.0883024610 * lr + 0.2817188376 * lg + 0.6299787000 * lb;

    const l_c = Math.cbrt(l_);
    const m_c = Math.cbrt(m_);
    const s_c = Math.cbrt(s_);

    // OKLab
    const L = 0.2104542553 * l_c + 0.7936177850 * m_c - 0.0040720468 * s_c;
    const a = 1.9779984951 * l_c - 2.4285922050 * m_c + 0.4505937099 * s_c;
    const bOk = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.8086757660 * s_c;

    // OKLab -> OKLCH
    const C = Math.sqrt(a * a + bOk * bOk);
    let h = Math.atan2(bOk, a) * (180 / Math.PI);
    if (h < 0) h += 360;

    return {
      L: Math.round(L * 1000) / 1000,
      C: Math.round(C * 1000) / 1000,
      h: Math.round(h * 10) / 10,
    };
  }

  /**
   * Simulate color blindness
   */
  static simulateColorBlindness(color: Color, type: string): Color {
    const { r, g, b } = color.rgb;
    
    let newR, newG, newB;
    
    switch (type) {
      case 'protanopia': // Red-blind
        newR = 0.567 * r + 0.433 * g;
        newG = 0.558 * r + 0.442 * g;
        newB = 0.242 * g + 0.758 * b;
        break;
      case 'deuteranopia': // Green-blind
        newR = 0.625 * r + 0.375 * g;
        newG = 0.7 * r + 0.3 * g;
        newB = 0.3 * g + 0.7 * b;
        break;
      case 'tritanopia': // Blue-blind
        newR = 0.95 * r + 0.05 * g;
        newG = 0.433 * g + 0.567 * b;
        newB = 0.475 * g + 0.525 * b;
        break;
      case 'achromatopsia': // Complete color blindness
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        newR = newG = newB = gray;
        break;
      default:
        return color;
    }
    
    const hsl = this.rgbToHsl(Math.round(newR), Math.round(newG), Math.round(newB));
    return this.createColor(hsl.h, hsl.s, hsl.l);
  }
}