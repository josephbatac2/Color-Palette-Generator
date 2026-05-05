import React, { useState, useEffect } from 'react';
import { Color } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Input } from './input';
import { Slider } from './slider';
import { Copy, Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [hexValue, setHexValue] = useState(color.hex);
  const [hslValues, setHslValues] = useState({
    h: color.h,
    s: color.s,
    l: color.l
  });

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

  const labelClass = isDark ? 'text-gray-100' : 'text-gray-900';
  const sublabelClass = isDark ? 'text-gray-300' : 'text-gray-600';
  const valueClass = isDark ? 'text-white' : 'text-gray-900';
  const mutedClass = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`p-6 space-y-6 backdrop-blur-xl rounded-xl border ${
      isDark
        ? 'bg-white/10 border-white/20'
        : 'bg-white border-gray-200 shadow-sm'
    } ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Palette className={`w-5 h-5 ${isDark ? 'text-gray-200' : 'text-gray-700'}`} />
        <h3 className={`text-lg font-semibold ${labelClass}`}>Base Color</h3>
      </div>

      {/* Color Preview */}
      <div className="relative">
        <div
          className="w-full h-12 rounded-lg shadow-lg border cursor-pointer group transition-all hover:shadow-xl hover:scale-[1.01]"
          style={{ backgroundColor: color.hex, borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)' }}
          onClick={copyToClipboard}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors flex items-center justify-center">
            <Copy className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className={`text-sm font-mono font-semibold ${valueClass}`}>{color.hex}</div>
          <div className={`text-xs ${mutedClass}`}>Click to copy</div>
        </div>
      </div>

      {/* Color Picker Circle */}
      <div className="space-y-4">
        <label className={`block text-sm font-semibold ${labelClass}`}>Color Picker</label>
        <div className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
          isDark
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex flex-col items-center gap-4">
            <p className={`text-sm ${sublabelClass}`}>Click the circle to pick any color</p>
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-lg opacity-40 animate-pulse ${
                isDark ? 'bg-blue-400/30' : 'bg-blue-300/30'
              }`}></div>
              <div className="relative z-10 w-32 h-32 rounded-full border-4 shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.9)' }}
              >
                <div
                  className="absolute inset-0 w-full h-full rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
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
            <p className={`text-xs ${mutedClass}`}>Opens your system color picker</p>
          </div>
        </div>
      </div>

      {/* Manual HEX Input */}
      <div className="space-y-2">
        <label className={`block text-xs font-medium ${sublabelClass}`}>Manual HEX Input</label>
        <Input
          type="text"
          value={hexValue}
          onChange={(e) => handleHexChange(e.target.value)}
          className={`w-32 px-3 py-2 text-center font-mono text-sm ${
            isDark
              ? 'border-gray-600 bg-gray-800/80 text-white focus:ring-blue-500 focus:border-blue-500'
              : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="#000000"
        />
      </div>

      {/* HSL Sliders */}
      <div className="space-y-4">
        <label className={`block text-sm font-semibold ${labelClass}`}>HSL Sliders</label>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={sublabelClass}>Hue</span>
            <span className={`font-mono ${valueClass}`}>{hslValues.h}°</span>
          </div>
          <Slider
            value={[hslValues.h]}
            onValueChange={(values) => handleHslChange('h', values[0])}
            max={360}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={sublabelClass}>Saturation</span>
            <span className={`font-mono ${valueClass}`}>{hslValues.s}%</span>
          </div>
          <Slider
            value={[hslValues.s]}
            onValueChange={(values) => handleHslChange('s', values[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={sublabelClass}>Lightness</span>
            <span className={`font-mono ${valueClass}`}>{hslValues.l}%</span>
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
      <div className={`grid grid-cols-1 gap-3 pt-4 border-t ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
        <div className={`rounded-lg p-3 border ${
          isDark ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`text-xs uppercase tracking-wide mb-1 ${mutedClass}`}>RGB</div>
          <div className={`text-sm font-mono ${valueClass}`}>
            {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
          </div>
        </div>
        <div className={`rounded-lg p-3 border ${
          isDark ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`text-xs uppercase tracking-wide mb-1 ${mutedClass}`}>HSL</div>
          <div className={`text-sm font-mono ${valueClass}`}>
            {color.h}°, {color.s}%, {color.l}%
          </div>
        </div>
      </div>
    </div>
  );
};
