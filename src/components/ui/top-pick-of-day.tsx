import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Copy, Check, Share2, Sparkles, RefreshCw, Palette } from 'lucide-react';
import { ColorUtils } from '../../utils/colorUtils';
import { Color, ColorPalette } from '../../types/color';
import { PaletteLightbox } from './palette-lightbox';

interface TopPickOfDayProps {
  className?: string;
}

interface PickPalette {
  name: string;
  category: string;
  colors: Color[];
}

const FEATURED_PALETTE_NAMES = [
  'Ocean Breeze', 'Neon Jungle', 'Cosmic Nebula', 'Sunset Glow', 'Arctic Ice',
  'Cherry Blossom', 'Digital Ocean', 'Jade Empire', 'Electric Blue', 'Desert Sand',
  'Matrix Code', 'Toxic Waste', 'Lavender Fields', 'Coral Reef', 'Forest Harmony',
  'Midnight Sky', 'Golden Hour', 'Rose Gold', 'Mint Fresh', 'Wine Cellar',
  'Steel Blue', 'Pumpkin Spice', 'Berry Smoothie', 'Sage Garden', 'Plum Orchard',
  'Nordic Minimalism', 'Tangerine Dream', 'Glacier Bay', 'Burgundy Velvet',
  'Tropical Paradise', 'Sapphire Elegance', 'Mediterranean Sun', 'Winter Frost',
  'Deep Ocean', 'Corporate Blue', 'Blue Depths',
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function getDateSeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function generateDailyPalette(seed: number): PickPalette {
  const rng = seededRandom(seed);
  const nameIdx = Math.floor(rng() * FEATURED_PALETTE_NAMES.length);
  const name = FEATURED_PALETTE_NAMES[nameIdx];

  const baseHue = Math.floor(rng() * 360);
  const baseSat = 55 + Math.floor(rng() * 40);
  const baseLight = 45 + Math.floor(rng() * 15);

  const harmonyType = Math.floor(rng() * 4);
  let colors: Color[] = [];

  if (harmonyType === 0) {
    for (let i = 0; i < 5; i++) {
      const l = Math.max(12, Math.min(90, baseLight + (i * 12) - 24));
      colors.push(ColorUtils.createColor(baseHue, baseSat, l));
    }
  } else if (harmonyType === 1) {
    for (let i = 0; i < 5; i++) {
      const h = ((baseHue + (i - 2) * 18 + 360) % 360);
      const l = Math.max(20, Math.min(85, baseLight + (i - 2) * 8));
      colors.push(ColorUtils.createColor(h, baseSat, l));
    }
  } else if (harmonyType === 2) {
    const compHue = (baseHue + 180) % 360;
    for (let i = 0; i < 5; i++) {
      const h = i < 3 ? baseHue : compHue;
      const l = Math.max(18, Math.min(88, baseLight + (i * 10) - 20));
      const s = baseSat + (i % 2 === 0 ? 5 : -5);
      colors.push(ColorUtils.createColor(h, Math.max(30, Math.min(100, s)), l));
    }
  } else {
    const h1 = (baseHue + 120) % 360;
    const h2 = (baseHue + 240) % 360;
    const hues = [baseHue, h1, h2, baseHue, h1];
    for (let i = 0; i < 5; i++) {
      const l = Math.max(22, Math.min(82, baseLight + (i * 8) - 16));
      colors.push(ColorUtils.createColor(hues[i], baseSat, l));
    }
  }

  const categories = ['Blues & Teals', 'Greens & Nature', 'Reds & Pinks', 'Purples & Violets',
    'Oranges & Yellows', 'Neutrals & Grays', 'Vibrant & Neon', 'Pastels & Soft',
    'Complementary', 'Holiday & Seasonal', 'Warm & Cool', 'Teal & Orange', 'Triadic'];
  const category = categories[Math.floor(rng() * categories.length)];

  return { name, category, colors };
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1a1a2e' : '#ffffff';
}

export const TopPickOfDay: React.FC<TopPickOfDayProps> = ({ className = '' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [shared, setShared] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [lightboxPalette, setLightboxPalette] = useState<ColorPalette | null>(null);
  const [currentPalette, setCurrentPalette] = useState<PickPalette | null>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  const dateSeed = useMemo(() => getDateSeed(), []);

  useEffect(() => {
    setCurrentPalette(generateDailyPalette(dateSeed));
  }, [dateSeed]);

  useEffect(() => {
    if (!currentPalette) return;
    setRevealProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i <= 5; i++) {
      timers.push(setTimeout(() => setRevealProgress(i), i * 120));
    }
    return () => timers.forEach(clearTimeout);
  }, [currentPalette]);

  const handleCopyColor = useCallback(async (color: Color, index: number) => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // clipboard not available
    }
  }, []);

  const handleCopyAll = useCallback(async () => {
    if (!currentPalette) return;
    const css = currentPalette.colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n');
    try {
      await navigator.clipboard.writeText(css);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [currentPalette]);

  const handleShare = useCallback(async () => {
    if (!currentPalette) return;
    const hexes = currentPalette.colors.map(c => c.hex).join(', ');
    const text = `Check out today's top pick: "${currentPalette.name}" — ${hexes}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Color Palette Top Pick', text });
      } catch {
        // user cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // clipboard not available
      }
    }
  }, [currentPalette]);

  const handleShuffle = useCallback(() => {
    setShuffled(true);
    setTimeout(() => {
      const newSeed = dateSeed + Math.floor(Math.random() * 100000);
      setCurrentPalette(generateDailyPalette(newSeed));
      setShuffled(false);
    }, 400);
  }, [dateSeed]);

  const handleOpenLightbox = useCallback(() => {
    if (!currentPalette) return;
    setLightboxPalette({
      id: crypto.randomUUID(),
      name: currentPalette.name,
      colors: currentPalette.colors,
      type: 'curated',
      createdAt: new Date(),
    });
  }, [currentPalette]);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  if (!currentPalette) return null;

  return (
    <>
      <div className={`relative w-full ${className}`}>
        {/* Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-green-300" aria-hidden="true" />
            <span className="text-sm font-medium text-white tracking-wide">Top Pick of the Day</span>
            <span className="text-xs text-gray-300 ml-1 hidden sm:inline">· {todayStr}</span>
          </div>
        </div>

        {/* Main Card */}
        <div
          className={`relative rounded-3xl overflow-hidden border border-white/15 backdrop-blur-2xl shadow-2xl bg-white/5 transition-all duration-500 ${
            shuffled ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/30 to-lime-500/30 border border-white/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-green-300" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{currentPalette.name}</h3>
                <p className="text-xs text-gray-300 mt-0.5">{currentPalette.category}</p>
              </div>
            </div>

            <button
              onClick={handleShuffle}
              className="group flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-medium hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Shuffle for a new random pick"
            >
              <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180 ${shuffled ? 'rotate-180' : ''}`} aria-hidden="true" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          </div>

          {/* Color swatches — big, interactive */}
          <div
            className="flex h-32 sm:h-40 md:h-48 cursor-pointer group"
            onClick={handleOpenLightbox}
            title="Click to view in lightbox"
          >
            {currentPalette.colors.map((color, index) => {
              const isRevealed = index < revealProgress;
              const textColor = getContrastColor(color.hex);
              return (
                <div
                  key={index}
                  className={`relative flex-1 overflow-hidden transition-all duration-700 ${
                    isRevealed ? 'opacity-100' : 'opacity-0 translate-y-4'
                  } group/swatch`}
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Copy button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyColor(color, index);
                    }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 transition-opacity duration-200 bg-black/15 hover:bg-black/25 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label={`Copy ${color.hex}`}
                  >
                    <div
                      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg backdrop-blur-sm"
                      style={{ backgroundColor: textColor === '#ffffff' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.8)' }}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4" style={{ color: textColor }} aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4" style={{ color: textColor }} aria-hidden="true" />
                      )}
                      <span
                        className="text-xs font-mono font-semibold tracking-wide"
                        style={{ color: textColor }}
                      >
                        {copiedIndex === index ? 'Copied!' : color.hex.toUpperCase()}
                      </span>
                    </div>
                  </button>

                  {/* Bottom label always visible */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 px-2 py-1.5 text-center transition-opacity duration-300 ${
                      copiedIndex === index ? 'opacity-0' : 'opacity-100 group-hover/swatch:opacity-0'
                    }`}
                    style={{ backgroundColor: textColor === '#ffffff' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)' }}
                  >
                    <span
                      className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider"
                      style={{ color: textColor }}
                    >
                      {color.hex.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color details grid */}
          <div className="grid grid-cols-5 gap-px bg-white/5">
            {currentPalette.colors.map((color, index) => {
              const oklch = ColorUtils.rgbToOklch(color.rgb.r, color.rgb.g, color.rgb.b);
              return (
                <div
                  key={index}
                  className="px-2 py-3 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyColor(color, index);
                  }}
                  title={`Click to copy ${color.hex}`}
                >
                  <div className="space-y-1 text-center">
                    <p className="text-[10px] font-mono text-gray-300 truncate">{color.hex.toUpperCase()}</p>
                    <p className="text-[10px] font-mono text-gray-400 hidden sm:block">
                      rgb({color.rgb.r},{color.rgb.g},{color.rgb.b})
                    </p>
                    <p className="text-[10px] font-mono text-gray-400 hidden md:block">
                      hsl({color.hsl.h},{color.hsl.s}%,{color.hsl.l}%)
                    </p>
                    <p className="text-[10px] font-mono text-gray-500 hidden md:block truncate">
                      oklch({oklch.L},{oklch.C},{oklch.h})
                    </p>
                    {copiedIndex === index && (
                      <p className="text-[10px] font-semibold text-green-300 flex items-center justify-center gap-0.5">
                        <Check className="w-2.5 h-2.5" aria-hidden="true" />
                        Copied
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 gap-3">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-medium hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-green-300" aria-hidden="true" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copy as CSS</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500/30 to-lime-500/30 border border-green-400/30 text-white text-sm font-medium hover:from-green-500/40 hover:to-lime-500/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              {shared ? (
                <>
                  <Check className="w-4 h-4 text-green-300" aria-hidden="true" />
                  <span>Shared!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-center text-xs text-gray-400 mt-3">
          Click any color to copy its HEX value · Click the palette to view it larger
        </p>
      </div>

      {lightboxPalette && (
        <PaletteLightbox
          palette={lightboxPalette}
          isOpen={!!lightboxPalette}
          onClose={() => setLightboxPalette(null)}
        />
      )}
    </>
  );
};
