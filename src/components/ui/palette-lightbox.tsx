import React, { useEffect } from 'react';
import { ColorPalette } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { X, Copy, Check } from 'lucide-react';

interface PaletteLightboxProps {
  palette: ColorPalette;
  isOpen: boolean;
  onClose: () => void;
}

export const PaletteLightbox: React.FC<PaletteLightboxProps> = ({ palette, isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-50 bg-black/90 backdrop-blur-sm animate-in fade-in-0 duration-300"
      onClick={onClose}
      style={{ 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        margin: 0,
        padding: 0
      }}
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
        className="w-full h-full flex flex-col justify-center p-8 animate-in zoom-in-95 duration-300"
        onClick={onClose}
      >
        <div className="text-center mb-12" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {palette.name}
          </h2>
          <p className="text-white/80 text-2xl">
            {palette.colors.length} colors • Click any color to copy
          </p>
        </div>
        
        {/* Large Color Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12 max-w-none mx-auto px-8" onClick={(e) => e.stopPropagation()}>
          {palette.colors.map((color, index) => {
            const contrastWithWhite = ColorUtils.calculateContrastRatio(color, ColorUtils.createColor(0, 0, 100));
            const textColor = contrastWithWhite.ratio > 4.5 ? 'white' : 'black';
            
            return (
              <div
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(color.hex, index);
                }}
              >
                <div
                  className="w-full p-20 h-56 rounded-2xl shadow-2xl border-4 border-white/20 relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  <div 
                    className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20"
                    style={{ color: textColor }}
                  >
                    
                    
                    <div className="text-center">
                      <div className="font-mono text-[16px] font-bold mb-3">{color.hex}</div>
                      <div className="text-[8px] opacity-90 bg-black/20 rounded-lg px-3 py-2 backdrop-blur-sm mb-2">
                        RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                      </div>
                      <div className="text-[8px] opacity-90 bg-black/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                        HSL({color.h}°, {color.s}%, {color.l}%)
                      </div>
                    </div>
                    
                    <div className="self-center">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        {copiedIndex === index ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Copy className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="text-white font-mono text-[10px] font-semibold">
                    {color.hex}
                  </div>
                  <div className="text-white/70 text-[11px]">
                    {copiedIndex === index ? 'Copied!' : 'Click to copy'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Palette Strip */}
        <div className="flex rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 h-40 max-w-none mx-8" onClick={(e) => e.stopPropagation()}>
          {palette.colors.map((color, index) => (
            <div
              key={index}
              className="flex-1 cursor-pointer hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: color.hex }}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(color.hex, index);
              }}
            />
          ))}
        </div>
        
        <div className="text-center mt-12" onClick={(e) => e.stopPropagation()}>
          <p className="text-white/60 text-xl">
            Click anywhere outside to close
          </p>
        </div>
      </div>
    </div>
  );
};