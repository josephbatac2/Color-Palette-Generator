import React, { useState, useEffect } from 'react';
import { HslaColorPicker } from 'react-colorful';
import { Color } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Input } from './input';
import { Card } from './card';
import { Copy, Palette } from 'lucide-react';

interface ColorPickerProps {
  color: Color;
  onChange: (color: Color) => void;
  compact?: boolean;
  className?: string;
}

interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onChange, 
  compact = false, 
  className 
}) => {
  const [localHex, setLocalHex] = useState(color.hex);

  // Convert our Color type (s,l: 0-100) to react-colorful's HslaColor type (s,l: 0-1)
  const colorToHsla = (color: Color): HslaColor => ({
    h: color.h,
    s: color.s / 100,
    l: color.l / 100,
    a: 1
  });

  // Convert react-colorful's HslaColor type (s,l: 0-1) to our Color type (s,l: 0-100)
  const hslaToColor = (hsla: HslaColor): Color => {
    return ColorUtils.createColor(
      Math.round(hsla.h),
      Math.round(hsla.s * 100),
      Math.round(hsla.l * 100)
    );
  };

  const [hslaColor, setHslaColor] = useState<HslaColor>(colorToHsla(color));

  // Sync with external color changes
  useEffect(() => {
    setLocalHex(color.hex);
    setHslaColor(colorToHsla(color));
  }, [color]);

  const handleColorChange = (newHsla: HslaColor) => {
    setHslaColor(newHsla);
    const newColor = hslaToColor(newHsla);
    setLocalHex(newColor.hex);
    onChange(newColor);
  };

  const handleHexChange = (hex: string) => {
    setLocalHex(hex);
    
    // Validate hex format
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const rgb = ColorUtils.hexToRgb(hex);
      if (rgb) {
        const hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newColor = ColorUtils.createColor(hsl.h, hsl.s, hsl.l);
        const newHsla = colorToHsla(newColor);
        setHslaColor(newHsla);
        onChange(newColor);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
  };

  if (compact) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* HEX Input */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">HEX Color</label>
          <Input
            value={localHex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="font-mono text-center text-sm h-10"
            placeholder="#000000"
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-gray-700">Color Picker</label>
          <div className="w-full">
            <HslaColorPicker
              color={hslaColor}
              onChange={handleColorChange}
              style={{ width: '100%', height: '200px' }}
            />
          </div>
        </div>

        {/* Color Values */}
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-sm">
            <div className="text-gray-500 uppercase tracking-wide mb-1">HSL</div>
            <div className="font-mono text-gray-900">
              {color.h}°, {color.s}%, {color.l}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`p-6 space-y-6 bg-white/90 backdrop-blur-xl border-white/20 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Base Color</h3>
      </div>

      {/* Color Preview */}
      <div className="relative">
        <div 
          className="w-full h-32 rounded-xl shadow-xl shadow-black/10 border-2 border-white/50 ring-1 ring-white/20 cursor-pointer group transition-all hover:shadow-2xl hover:shadow-black/15 hover:scale-[1.02]"
          style={{ backgroundColor: color.hex }}
          onClick={copyToClipboard}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors flex items-center justify-center">
            <Copy className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>
        
        {/* HEX Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">HEX Color</label>
          <Input
            value={localHex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="font-mono text-center text-lg bg-white/80 backdrop-blur-sm border-white/30"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Color Picker */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Color Picker</label>
        <div className="w-full">
          <HslaColorPicker
            color={hslaColor}
            onChange={handleColorChange}
            style={{ width: '100%', height: '250px' }}
          />
        </div>
      </div>

      {/* Color Values */}
      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-gray-100">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">RGB</div>
          <div className="text-sm font-mono text-gray-900">
            {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">HSL</div>
          <div className="text-sm font-mono text-gray-900">
            {color.h}°, {color.s}%, {color.l}%
          </div>
        </div>
      </div>
    </Card>
  );
};