import React from 'react';
import { ColorPalette, Color } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Card } from './card';
import { Button } from './button';
import { Lightbox } from './lightbox';
import { Copy, Download, Heart, Trash2, Check, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface PaletteDisplayProps {
  palette: ColorPalette;
  onSave?: (palette: ColorPalette) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  isSaving?: boolean;
  isAlreadySaved?: boolean;
}

export const PaletteDisplay: React.FC<PaletteDisplayProps> = ({
  palette,
  onSave,
  onDelete,
  showActions = true,
  isSaving = false,
  isAlreadySaved = false,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [lightboxColor, setLightboxColor] = React.useState<Color | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportPalette = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsExporting(true);
    
    const cssVars = palette.colors.map((color, index) => 
      `  --color-${index + 1}: ${color.hex};`
    ).join('\n');
    
    const css = `:root {\n${cssVars}\n}`;
    
    // Copy CSS to clipboard
    navigator.clipboard.writeText(css).then(() => {
      // Show success feedback
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = css;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onSave) {
      onSave(palette);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onDelete && confirm('Are you sure you want to delete this palette?')) {
      onDelete(palette.id);
    }
  };

  const openLightbox = (color: Color) => {
    setLightboxColor(color);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxColor(null);
  };

  const ColorSwatch: React.FC<{ color: Color; index: number }> = ({ color, index }) => {
    const contrastWithWhite = ColorUtils.calculateContrastRatio(color, ColorUtils.createColor(0, 0, 100));
    const textColor = contrastWithWhite.ratio > 4.5 ? 'white' : 'black';

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex-1 h-full relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:z-10 first:rounded-l-xl last:rounded-r-xl overflow-hidden hover:shadow-2xl"
              style={{ backgroundColor: color.hex }}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(color);
              }}
            >
              <div
                className="absolute inset-0 flex flex-col justify-between p-2 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20"
                style={{ color: textColor }}
              >
                <div className="text-xs md:text-sm font-medium bg-black/30 rounded-full px-2 py-1 md:px-3 md:py-2 self-start backdrop-blur-sm">
                  #{index + 1}
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs md:text-lg font-bold mb-1 md:mb-2 drop-shadow-sm">{color.hex}</div>
                  <div className="text-xs md:text-sm opacity-90 bg-black/20 rounded-lg px-2 py-0.5 md:px-3 md:py-1 backdrop-blur-sm">
                    HSL({color.h}, {color.s}%, {color.l}%)
                  </div>
                </div>
                <div className="self-center">
                  <div className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-white/90" />
                  </div>
                </div>
              </div>
              
              {/* Copy button - separate click handler */}
              <button
                className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-3 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 backdrop-blur-sm shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(color.hex, index);
                }}
              >
                {copiedIndex === index ? (
                  <Check className="w-3 h-3 md:w-5 md:h-5" />
                ) : (
                  <Copy className="w-3 h-3 md:w-5 md:h-5" />
                )}
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to view in lightbox</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      <Card className="overflow-hidden bg-white/90 backdrop-blur-xl border-white/20 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 hover:scale-[1.01] min-h-[400px] md:min-h-[600px]">
      <div className="flex h-[250px] md:h-[500px]">
        {palette.colors.map((color, index) => (
          <ColorSwatch key={index} color={color} index={index} />
        ))}
      </div>
      
      <div className="p-4 md:p-8 bg-white/50 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-[150px] md:min-h-[200px]">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <h3 className="font-semibold text-base md:text-xl text-gray-900 mb-1 md:mb-2">{palette.name}</h3>
            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500">
              <span>{palette.colors.length} colors</span>
              {palette.harmony && (
                <>
                  <span>•</span>
                  <span className="capitalize">{palette.harmony.replace('-', ' ')}</span>
                </>
              )}
              <span>•</span>
              <span>{palette.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
          
          {palette.type && (
            <div className="bg-white/60 backdrop-blur-sm text-gray-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium capitalize border border-white/30 shadow-sm">
              {palette.type}
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-8">
            <Button
              disabled={isExporting}
              variant="outline"
              size="sm"
              onClick={exportPalette}
              className="flex items-center gap-1 md:gap-2 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 px-3 py-2 md:px-8 md:py-4 text-xs md:text-base"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3 h-3 md:w-5 md:h-5 animate-spin" />
                  {isExporting ? 'Copied!' : 'Copying...'}
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 md:w-5 md:h-5" />
                  Export CSS
                </>
              )}
            </Button>
            
            {onSave && !isAlreadySaved && (
              <Button
                disabled={isSaving || isAlreadySaved}
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="flex items-center gap-1 md:gap-2 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 px-3 py-2 md:px-8 md:py-4 text-xs md:text-base"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3 h-3 md:w-5 md:h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Heart className="w-3 h-3 md:w-5 md:h-5" />
                    Save Palette
                  </>
                )}
              </Button>
            )}
            
            {isAlreadySaved && (
              <Button
                disabled
                variant="outline"
                size="sm"
                className="flex items-center gap-1 md:gap-2 bg-green-50/80 backdrop-blur-sm border-green-200/50 text-green-700 px-3 py-2 md:px-8 md:py-4 text-xs md:text-base cursor-not-allowed"
              >
                <Check className="w-3 h-3 md:w-5 md:h-5" />
                Already Saved
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="flex items-center gap-1 md:gap-2 text-red-600 hover:text-red-700 hover:border-red-300 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-red-50/80 px-3 py-2 md:px-8 md:py-4 text-xs md:text-base"
              >
                <Trash2 className="w-3 h-3 md:w-5 md:h-5" />
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
      
      {lightboxColor && (
        <Lightbox
          color={lightboxColor}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </>
  );
};