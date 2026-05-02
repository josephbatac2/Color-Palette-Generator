import React, { useEffect, useState } from 'react';
import { ColorPalette } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { X, Copy, Check } from 'lucide-react';

interface PaletteLightboxProps {
  palette: ColorPalette;
  isOpen: boolean;
  onClose: () => void;
}

interface CopyState {
  colorIndex: number;
  format: string;
}

const FORMAT_LABELS: Record<string, string> = {
  hex: 'HEX',
  rgb: 'RGB',
  cmyk: 'CMYK',
  oklch: 'OKLCH',
};

function getColorFormats(color: { hex: string; rgb: { r: number; g: number; b: number } }) {
  const cmyk = ColorUtils.rgbToCmyk(color.rgb.r, color.rgb.g, color.rgb.b);
  const oklch = ColorUtils.rgbToOklch(color.rgb.r, color.rgb.g, color.rgb.b);

  return {
    hex: color.hex.toUpperCase(),
    rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    oklch: `oklch(${oklch.L} ${oklch.C} ${oklch.h})`,
  };
}

export const PaletteLightbox: React.FC<PaletteLightboxProps> = ({ palette, isOpen, onClose }) => {
  const [copied, setCopied] = useState<CopyState | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, colorIndex: number, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ colorIndex, format });
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 bg-black/90 backdrop-blur-sm animate-in fade-in-0 duration-300"
      onClick={onClose}
      style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', position: 'fixed', margin: 0, padding: 0 }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors shadow-2xl backdrop-blur-md"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div
        className="w-full h-full overflow-y-auto p-8 animate-in zoom-in-95 duration-300"
        onClick={onClose}
      >
        <div className="max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="text-center mb-10 pt-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {palette.name}
            </h2>
            <p className="text-white/70 text-lg">
              {palette.colors.length} colors — click any value to copy
            </p>
          </div>

          {/* Color Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {palette.colors.map((color, index) => {
              const formats = getColorFormats(color);
              const contrastWithWhite = ColorUtils.calculateContrastRatio(color, ColorUtils.createColor(0, 0, 100));
              const textColor = contrastWithWhite.ratio > 4.5 ? 'white' : 'black';

              return (
                <div key={index} className="flex flex-col gap-3">
                  {/* Color Swatch */}
                  <div
                    className="w-full h-28 rounded-xl shadow-xl border-2 border-white/15 flex items-end justify-center pb-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="font-mono text-sm font-bold px-3 py-1 rounded-md backdrop-blur-sm"
                      style={{ color: textColor, backgroundColor: textColor === 'white' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)' }}
                    >
                      {color.hex.toUpperCase()}
                    </span>
                  </div>

                  {/* Format Cards */}
                  <div className="flex flex-col gap-1.5">
                    {(['hex', 'rgb', 'cmyk', 'oklch'] as const).map((format) => {
                      const isCopied = copied?.colorIndex === index && copied?.format === format;
                      return (
                        <button
                          key={format}
                          onClick={() => copyToClipboard(formats[format], index, format)}
                          className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-all duration-200
                            ${isCopied
                              ? 'bg-green-500/30 border border-green-400/50'
                              : 'bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/20'
                            }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-white/40 text-[10px] font-semibold uppercase tracking-wider w-10 flex-shrink-0">
                              {FORMAT_LABELS[format]}
                            </span>
                            <span className="text-white/90 font-mono text-xs truncate">
                              {formats[format]}
                            </span>
                          </div>
                          <span className="flex-shrink-0">
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Palette Strip */}
          <div className="flex rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 h-32 mb-10">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 cursor-pointer hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: color.hex }}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(color.hex, index, 'hex');
                }}
              />
            ))}
          </div>

          <div className="text-center pb-8">
            <p className="text-white/50 text-base">
              Click anywhere outside to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
