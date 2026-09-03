import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Copy, Check, Share2, Star, RefreshCw, Palette } from 'lucide-react';
import { ColorUtils } from '../../utils/colorUtils';
import { Color, ColorPalette } from '../../types/color';
import { PaletteLightbox } from './palette-lightbox';

interface TopPicksOfDayProps {
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

const CATEGORIES = [
  'Blues & Teals', 'Greens & Nature', 'Reds & Pinks', 'Purples & Violets',
  'Oranges & Yellows', 'Neutrals & Grays', 'Vibrant & Neon', 'Pastels & Soft',
  'Complementary', 'Holiday & Seasonal', 'Warm & Cool', 'Teal & Orange', 'Triadic',
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

  const category = CATEGORIES[Math.floor(rng() * CATEGORIES.length)];
  return { name, category, colors };
}

function generateThreePicks(baseSeed: number): PickPalette[] {
  return [
    generateDailyPalette(baseSeed),
    generateDailyPalette(baseSeed + 7777),
    generateDailyPalette(baseSeed + 15554),
  ];
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1a1a2e' : '#ffffff';
}

interface PickCardProps {
  palette: PickPalette;
  copiedIndex: number | null;
  copiedAll: boolean;
  shared: boolean;
  onCopyColor: (color: Color, index: number) => void;
  onCopyAll: () => void;
  onShare: () => void;
  onOpenLightbox: () => void;
  revealProgress: number;
}

const PickCard: React.FC<PickCardProps> = ({
  palette, copiedIndex, copiedAll, shared,
  onCopyColor, onCopyAll, onShare, onOpenLightbox, revealProgress,
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/15 backdrop-blur-2xl shadow-xl bg-white/5 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500/30 to-lime-500/30 border border-white/10 flex items-center justify-center shrink-0">
          <Palette className="w-3.5 h-3.5 text-green-300" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-white leading-tight truncate">{palette.name}</h3>
          <p className="text-[10px] text-gray-300 truncate">{palette.category}</p>
        </div>
      </div>

      {/* Color swatches */}
      <div
        className="flex h-20 sm:h-24 cursor-pointer group"
        onClick={onOpenLightbox}
        title="Click to view in lightbox"
      >
        {palette.colors.map((color, index) => {
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyColor(color, index);
                }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 transition-opacity duration-200 bg-black/15 hover:bg-black/25 focus-visible:opacity-100 focus-visible:outline-none"
                aria-label={`Copy ${color.hex}`}
              >
                {copiedIndex === index ? (
                  <Check className="w-3.5 h-3.5" style={{ color: textColor }} aria-hidden="true" />
                ) : (
                  <Copy className="w-3.5 h-3.5" style={{ color: textColor }} aria-hidden="true" />
                )}
              </button>

              <div
                className={`absolute bottom-0 left-0 right-0 px-1 py-0.5 text-center transition-opacity duration-300 ${
                  copiedIndex === index ? 'opacity-0' : 'opacity-100 group-hover/swatch:opacity-0'
                }`}
                style={{ backgroundColor: textColor === '#ffffff' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)' }}
              >
                <span className="text-[9px] font-mono font-semibold tracking-wider" style={{ color: textColor }}>
                  {color.hex.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Color details — compact */}
      <div className="grid grid-cols-5 gap-px bg-white/5">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="px-1 py-1.5 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer text-center"
            onClick={(e) => {
              e.stopPropagation();
              onCopyColor(color, index);
            }}
            title={`Click to copy ${color.hex}`}
          >
            <p className="text-[9px] font-mono text-gray-300 truncate">{color.hex.toUpperCase()}</p>
            {copiedIndex === index && (
              <p className="text-[9px] font-semibold text-green-300 flex items-center justify-center gap-0.5 mt-0.5">
                <Check className="w-2 h-2" aria-hidden="true" />
                Copied
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Action bar — compact */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-white/10">
        <button
          onClick={onCopyAll}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-xs font-medium hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          {copiedAll ? (
            <Check className="w-3 h-3 text-green-300" aria-hidden="true" />
          ) : (
            <Copy className="w-3 h-3" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{copiedAll ? 'Copied' : 'CSS'}</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-green-500/30 to-lime-500/30 border border-green-400/30 text-white text-xs font-medium hover:from-green-500/40 hover:to-lime-500/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-400"
        >
          {shared ? (
            <Check className="w-3 h-3 text-green-300" aria-hidden="true" />
          ) : (
            <Share2 className="w-3 h-3" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{shared ? 'Shared' : 'Share'}</span>
        </button>
      </div>
    </div>
  );
};

export const TopPickOfDay: React.FC<TopPicksOfDayProps> = ({ className = '' }) => {
  const [copiedStates, setCopiedStates] = useState<Record<number, number | null>>({});
  const [copiedAllStates, setCopiedAllStates] = useState<Record<number, boolean>>({});
  const [sharedStates, setSharedStates] = useState<Record<number, boolean>>({});
  const [shuffled, setShuffled] = useState(false);
  const [lightboxPalette, setLightboxPalette] = useState<ColorPalette | null>(null);
  const [picks, setPicks] = useState<PickPalette[]>([]);
  const [revealProgress, setRevealProgress] = useState(0);

  const dateSeed = useMemo(() => getDateSeed(), []);

  useEffect(() => {
    setPicks(generateThreePicks(dateSeed));
  }, [dateSeed]);

  useEffect(() => {
    if (picks.length === 0) return;
    setRevealProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i <= 5; i++) {
      timers.push(setTimeout(() => setRevealProgress(i), i * 100));
    }
    return () => timers.forEach(clearTimeout);
  }, [picks]);

  const handleCopyColor = useCallback(async (pickIdx: number, color: Color, colorIdx: number) => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopiedStates(prev => ({ ...prev, [pickIdx]: colorIdx }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [pickIdx]: null })), 1500);
    } catch {
      // clipboard not available
    }
  }, []);

  const handleCopyAll = useCallback(async (pickIdx: number) => {
    const palette = picks[pickIdx];
    if (!palette) return;
    const css = palette.colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n');
    try {
      await navigator.clipboard.writeText(css);
      setCopiedAllStates(prev => ({ ...prev, [pickIdx]: true }));
      setTimeout(() => setCopiedAllStates(prev => ({ ...prev, [pickIdx]: false })), 2000);
    } catch {
      // clipboard not available
    }
  }, [picks]);

  const handleShare = useCallback(async (pickIdx: number) => {
    const palette = picks[pickIdx];
    if (!palette) return;
    const hexes = palette.colors.map(c => c.hex).join(', ');
    const text = `Check out today's top pick: "${palette.name}" — ${hexes}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Color Palette Top Pick', text });
      } catch {
        // user cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setSharedStates(prev => ({ ...prev, [pickIdx]: true }));
        setTimeout(() => setSharedStates(prev => ({ ...prev, [pickIdx]: false })), 2000);
      } catch {
        // clipboard not available
      }
    }
  }, [picks]);

  const handleShuffle = useCallback(() => {
    setShuffled(true);
    setTimeout(() => {
      const newSeed = dateSeed + Math.floor(Math.random() * 100000);
      setPicks(generateThreePicks(newSeed));
      setShuffled(false);
    }, 400);
  }, [dateSeed]);

  const handleOpenLightbox = useCallback((pickIdx: number) => {
    const palette = picks[pickIdx];
    if (!palette) return;
    setLightboxPalette({
      id: crypto.randomUUID(),
      name: palette.name,
      colors: palette.colors,
      type: 'curated',
      createdAt: new Date(),
    });
  }, [picks]);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  if (picks.length === 0) return null;

  return (
    <>
      <div className={`relative w-full ${className}`}>
        {/* Badge */}
        <div className="flex items-center justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl">
            <Star className="w-4 h-4 text-green-300" aria-hidden="true" />
            <span className="text-sm font-medium text-white tracking-wide">Top Picks of the Day</span>
            <span className="text-xs text-gray-300 ml-1 hidden sm:inline">· {todayStr}</span>
          </div>
        </div>

        {/* Shuffle button */}
        <div className="flex items-center justify-center mb-3">
          <button
            onClick={handleShuffle}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-medium hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Shuffle for new random picks"
          >
            <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180 ${shuffled ? 'rotate-180' : ''}`} aria-hidden="true" />
            <span>Shuffle All</span>
          </button>
        </div>

        {/* 3 compact cards in a row */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 transition-all duration-500 ${
            shuffled ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {picks.map((palette, pickIdx) => (
            <PickCard
              key={pickIdx}
              palette={palette}
              copiedIndex={copiedStates[pickIdx] ?? null}
              copiedAll={copiedAllStates[pickIdx] ?? false}
              shared={sharedStates[pickIdx] ?? false}
              onCopyColor={(color, colorIdx) => handleCopyColor(pickIdx, color, colorIdx)}
              onCopyAll={() => handleCopyAll(pickIdx)}
              onShare={() => handleShare(pickIdx)}
              onOpenLightbox={() => handleOpenLightbox(pickIdx)}
              revealProgress={revealProgress}
            />
          ))}
        </div>

        {/* Hint text */}
        <p className="text-center text-xs text-gray-400 mt-3">
          Click any color to copy its HEX value · Click a palette to view it larger
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
