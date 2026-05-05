import React, { useState } from 'react';
import { Color } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { useTheme } from '../../contexts/ThemeContext';
import { Copy, Check } from 'lucide-react';

interface ColorValuesCardProps {
  colors: Color[];
  className?: string;
}

interface ValueRowProps {
  label: string;
  values: string[];
  isDark: boolean;
}

const ValueRow: React.FC<ValueRowProps> = ({ label, values, isDark }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyValue = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className={`rounded-lg p-4 border ${
      isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, i) => (
          <button
            key={i}
            onClick={() => copyValue(value, i)}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-gray-700/80 text-gray-200 hover:bg-gray-600 border border-gray-600'
                : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-sm'
            }`}
            title={`Copy ${value}`}
          >
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0 border"
              style={{
                backgroundColor: values._colors?.[i] ?? 'transparent',
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
              }}
            />
            <span>{value}</span>
            {copiedIndex === i ? (
              <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
            ) : (
              <Copy className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                isDark ? 'text-gray-500 opacity-0 group-hover:opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'
              }`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ColorValuesCard: React.FC<ColorValuesCardProps> = ({ colors, className }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const hexValues = colors.map(c => c.hex);
  const rgbValues = colors.map(c => `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`);
  const cmykValues = colors.map(c => {
    const cmyk = ColorUtils.rgbToCmyk(c.rgb.r, c.rgb.g, c.rgb.b);
    return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  });
  const oklchValues = colors.map(c => {
    const oklch = ColorUtils.rgbToOklch(c.rgb.r, c.rgb.g, c.rgb.b);
    return `oklch(${oklch.L} ${oklch.C} ${oklch.h})`;
  });

  // Attach color swatches for display
  const hexRow = Object.assign(hexValues, { _colors: colors.map(c => c.hex) });
  const rgbRow = Object.assign(rgbValues, { _colors: colors.map(c => c.hex) });
  const cmykRow = Object.assign(cmykValues, { _colors: colors.map(c => c.hex) });
  const oklchRow = Object.assign(oklchValues, { _colors: colors.map(c => c.hex) });

  return (
    <div className={`rounded-xl backdrop-blur-xl border p-5 space-y-3 ${
      isDark ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200 shadow-sm'
    } ${className}`}>
      <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        Color Values
      </h4>
      <ValueRow label="HEX" values={hexRow as unknown as string[]} isDark={isDark} />
      <ValueRow label="RGB" values={rgbRow as unknown as string[]} isDark={isDark} />
      <ValueRow label="CMYK" values={cmykRow as unknown as string[]} isDark={isDark} />
      <ValueRow label="OKLCH" values={oklchRow as unknown as string[]} isDark={isDark} />
    </div>
  );
};
