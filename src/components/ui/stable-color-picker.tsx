import React, { useState, useEffect } from 'react';
import { Color } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Input } from './input';
import { Slider } from './slider';
import { Card } from './card';
import { Copy, Palette } from 'lucide-react';

interface StableColorPickerProps {
  color: Color;
  onChange: (color: Color) => void;
  className?: string;
}

export const StableColorPicker: React.FC<StableColorPickerProps> = ({ 
  color, 
  onChange, 
  className 
}) => {
  const [hexValue, setHexValue] = useState(color.hex);
  const [hslValues, setHslValues] = useState({
    h: color.h,
    s: color.s,
    l: color.l
  });

  // Sync with external color changes
  useEffect(() => {
    setHexValue(color.hex);
    setHslValues({
      h: color.h,
      s: color.s,
      l: color.l
    });
  }, [color]);

  const handleHexChange = (hex: string) => {
    setHexValue(hex);
    
    // Validate and convert hex to color
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const rgb = ColorUtils.hexToRgb(hex);
      if (rgb) {
        const hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newColor = ColorUtils.createColor(hsl.h, hsl.s, hsl.l);
        setHslValues({ h: hsl.h, s: hsl.s, l: hsl.l });
        onChange(newColor);
      }
    }
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hslValues, [component]: value };
    setHslValues(newHsl);
    
    const newColor = ColorUtils.createColor(newHsl.h, newHsl.s, newHsl.l);
    setHexValue(newColor.hex);
    onChange(newColor);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
  };

  return (
    <Card className={`p-6 space-y-6 bg-white/10 backdrop-blur-xl border-white/20 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-white/80" />
        <h3 className="text-lg font-semibold text-white">Base Color</h3>
      </div>

      {/* Compact Color Preview */}
      <div className="relative">
        <div 
          className="w-full h-12 rounded-lg shadow-lg shadow-black/5 border border-white/30 cursor-pointer group transition-all hover:shadow-xl hover:shadow-black/10 hover:scale-[1.01]"
          style={{ backgroundColor: color.hex }}
          onClick={copyToClipboard}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors flex items-center justify-center">
            <Copy className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>
        
        <div className="mt-2 text-center">
          <div className="text-sm font-mono font-semibold text-white">{color.hex}</div>
          <div className="text-xs text-gray-300">Click to copy</div>
        </div>
      </div>

      {/* Main Color Picker - BIG and PROMINENT */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-white text-center">🎨 Color Picker</label>
        
        {/* Glowing Background Container */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-2 border-blue-200/50 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
          {/* Animated Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl animate-pulse"></div>
          
          {/* Color Picker Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-800 mb-2">👆 Click the circle below to pick any color</div>
            </div>
            
            {/* Giant Color Picker */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 blur-lg opacity-50 animate-pulse"></div>
              <div className="relative z-10 w-40 h-40 rounded-full border-4 border-white shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 overflow-hidden">
                {/* Perfect Circle Background */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                {/* Hidden Color Input */}
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ 
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-blue-900 mb-1">Primary Color Selector</div>
              <div className="text-sm text-blue-700">This opens your system's color picker</div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual HEX Input - Small fallback */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-300">Manual HEX Input</label>
        <Input
          type="text"
          value={hexValue}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-32 px-3 py-2 text-center font-mono text-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/10 backdrop-blur-sm text-white"
          placeholder="#000000"
        />
      </div>

      {/* HSL Sliders */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white">HSL Sliders</label>
        
        {/* Hue Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Hue</span>
            <span className="font-mono text-white">{hslValues.h}°</span>
          </div>
          <Slider
            value={[hslValues.h]}
            onValueChange={(values) => handleHslChange('h', values[0])}
            max={360}
            step={1}
            className="w-full"
          />
        </div>

        {/* Saturation Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Saturation</span>
            <span className="font-mono text-white">{hslValues.s}%</span>
          </div>
          <Slider
            value={[hslValues.s]}
            onValueChange={(values) => handleHslChange('s', values[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Lightness Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Lightness</span>
            <span className="font-mono text-white">{hslValues.l}%</span>
          </div>
          <Slider
            value={[hslValues.l]}
            onValueChange={(values) => handleHslChange('l', values[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Color Values Display */}
      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/20">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm">
          <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">RGB</div>
          <div className="text-sm font-mono text-white">
            {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm">
          <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">HSL</div>
          <div className="text-sm font-mono text-white">
            {color.h}°, {color.s}%, {color.l}%
          </div>
        </div>
      </div>
    </Card>
  );
};