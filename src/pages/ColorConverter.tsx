import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRightLeft, Copy, Check, Palette } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Footer } from '../components/ui/footer';
import { ColorUtils } from '../utils/colorUtils';

interface ColorConverterProps {
  onBack: () => void;
}

interface RGBValues {
  r: number;
  g: number;
  b: number;
}

export const ColorConverter: React.FC<ColorConverterProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'rgb-to-hex' | 'hex-to-rgb'>('hex-to-rgb');
  const [hexValue, setHexValue] = useState('#3b82f6');
  const [rgbValues, setRgbValues] = useState<RGBValues>({ r: 59, g: 130, b: 246 });
  const [oklchValue, setOklchValue] = useState({ L: 0, C: 0, h: 0 });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateOklch = useCallback((r: number, g: number, b: number) => {
    const oklch = ColorUtils.rgbToOklch(r, g, b);
    setOklchValue(oklch);
  }, []);

  const hexToRgb = useCallback((hex: string) => {
    const rgb = ColorUtils.hexToRgb(hex);
    if (rgb) {
      setRgbValues(rgb);
      updateOklch(rgb.r, rgb.g, rgb.b);
      setError(null);
    } else {
      setError('Invalid HEX format. Use #RRGGBB or RRGGBB');
    }
  }, [updateOklch]);

  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    const clampedR = Math.max(0, Math.min(255, r));
    const clampedG = Math.max(0, Math.min(255, g));
    const clampedB = Math.max(0, Math.min(255, b));
    const hex = ColorUtils.rgbToHex(clampedR, clampedG, clampedB);
    setHexValue(hex);
    updateOklch(clampedR, clampedG, clampedB);
    setError(null);
  }, [updateOklch]);

  useEffect(() => {
    hexToRgb(hexValue);
  }, []);

  const handleHexChange = (value: string) => {
    let formatted = value.startsWith('#') ? value : `#${value}`;
    setHexValue(formatted);
    if (/^#[0-9A-Fa-f]{6}$/.test(formatted)) {
      hexToRgb(formatted);
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(255, numValue));
    const newRgb = { ...rgbValues, [channel]: clampedValue };
    setRgbValues(newRgb);
    rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'rgb-to-hex' ? 'hex-to-rgb' : 'rgb-to-hex');
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatOklch = () => {
    return `oklch(${oklchValue.L.toFixed(3)} ${oklchValue.C.toFixed(3)} ${oklchValue.h.toFixed(1)})`;
  };

  const formatRgb = () => {
    return `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`;
  };

  const colorPreview = hexValue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Converter
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <Card className="p-2 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium px-3 ${mode === 'hex-to-rgb' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                HEX to RGB
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMode}
                className="flex items-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Switch
              </Button>
              <span className={`text-sm font-medium px-3 ${mode === 'rgb-to-hex' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                RGB to HEX
              </span>
            </div>
          </Card>
        </div>

        {/* Converter Panel */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {mode === 'hex-to-rgb' ? 'HEX Input' : 'RGB Input'}
            </h2>

            {mode === 'hex-to-rgb' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hexadecimal Color
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={hexValue}
                      onChange={(e) => handleHexChange(e.target.value)}
                      placeholder="#3b82f6"
                      className="font-mono text-lg"
                      maxLength={7}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(hexValue, 'hex')}
                    >
                      {copiedField === 'hex' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div
                  className="h-24 rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-colors"
                  style={{ backgroundColor: colorPreview }}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {(['r', 'g', 'b'] as const).map((channel) => (
                    <div key={channel}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase">
                        {channel}
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbValues[channel]}
                        onChange={(e) => handleRgbChange(channel, e.target.value)}
                        className="font-mono text-center"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 justify-between items-center">
                  <div
                    className="flex-1 h-24 rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-colors"
                    style={{ backgroundColor: colorPreview }}
                  />
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Range</div>
                    <div className="text-xs text-gray-400">0 - 255</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Converted Values
            </h2>

            <Tabs defaultValue="rgb" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="rgb" className="flex-1">RGB</TabsTrigger>
                <TabsTrigger value="hex" className="flex-1">HEX</TabsTrigger>
                <TabsTrigger value="oklch" className="flex-1">OKLCH</TabsTrigger>
              </TabsList>

              <TabsContent value="rgb" className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex justify-between items-center">
                    <code className="text-lg font-mono text-gray-900 dark:text-white">
                      {formatRgb()}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(formatRgb(), 'rgb-output')}
                    >
                      {copiedField === 'rgb-output' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{rgbValues.r}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Red</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{rgbValues.g}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Green</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{rgbValues.b}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Blue</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hex" className="mt-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex justify-between items-center">
                    <code className="text-2xl font-mono text-gray-900 dark:text-white">
                      {hexValue.toUpperCase()}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(hexValue, 'hex-output')}
                    >
                      {copiedField === 'hex-output' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-6 gap-1">
                  {hexValue.slice(1).split('').map((char, i) => (
                    <div key={i} className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                      <span className="font-mono text-lg font-bold text-gray-700 dark:text-gray-300">
                        {char.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="oklch" className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex justify-between items-center">
                    <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                      {formatOklch()}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(formatOklch(), 'oklch')}
                    >
                      {copiedField === 'oklch' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {oklchValue.L.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Lightness (L)</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {oklchValue.C.toFixed(3)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Chroma (C)</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {oklchValue.h.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Hue (h)</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            About OKLCH Color Space
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            OKLCH is a modern color space designed to be perceptually uniform. Unlike RGB or HSL,
            the Lightness (L), Chroma (C), and Hue (h) values in OKLCH correspond more accurately
            to how humans perceive color. This makes it ideal for design systems where you want
            colors to have consistent perceived lightness across different hues.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div>
              <span className="font-semibold">L (Lightness):</span> 0-1, perceived lightness
            </div>
            <div>
              <span className="font-semibold">C (Chroma):</span> 0+, color saturation
            </div>
            <div>
              <span className="font-semibold">h (Hue):</span> 0-360, color angle
            </div>
          </div>
        </Card>
      </main>

      <Footer variant="compact" className="mt-12" />
    </div>
  );
};
