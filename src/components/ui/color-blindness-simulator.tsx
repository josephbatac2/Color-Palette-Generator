import React, { useState, useMemo } from 'react';
import { Color, ColorBlindnessType } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Card } from './card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Eye, Info } from 'lucide-react';

interface ColorBlindnessSimulatorProps {
  colors: Color[];
  className?: string;
}

const colorBlindnessTypes: ColorBlindnessType[] = [
  { type: 'protanopia', name: 'Protanopia (Red-blind)' },
  { type: 'deuteranopia', name: 'Deuteranopia (Green-blind)' },
  { type: 'tritanopia', name: 'Tritanopia (Blue-blind)' },
  { type: 'achromatopsia', name: 'Achromatopsia (Complete color blindness)' },
];

const typeDescriptions = {
  protanopia: 'Affects ~1% of men. Difficulty distinguishing red from green, with red appearing darker.',
  deuteranopia: 'Affects ~1% of men. Most common form, difficulty with red-green distinction.',
  tritanopia: 'Rare condition affecting ~0.01% of people. Difficulty with blue-yellow distinction.',
  achromatopsia: 'Very rare condition where only brightness is perceived, no color distinction.',
};

export const ColorBlindnessSimulator: React.FC<ColorBlindnessSimulatorProps> = ({
  colors,
  className,
}) => {
  const [selectedType, setSelectedType] = useState<string>('protanopia');

  const simulatedColors = useMemo(() => {
    return colors.map(color => ColorUtils.simulateColorBlindness(color, selectedType));
  }, [colors, selectedType]);

  const selectedTypeInfo = colorBlindnessTypes.find(t => t.type === selectedType);

  return (
    <div className={`space-y-8 ${className}`}>
      <Card className="p-6 bg-white/90 backdrop-blur-xl border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="w-6 h-6 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">Color Vision Simulator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Vision Type
          </label>
          <div className="relative z-10">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full h-12 bg-white/80 backdrop-blur-sm border-white/30">
              <SelectValue />
              </SelectTrigger>
              <SelectContent>
              {colorBlindnessTypes.map((type) => (
                <SelectItem key={type.type} value={type.type}>
                  {type.name}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {selectedTypeInfo && (
            <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 h-full flex items-center shadow-sm">
            <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">{selectedTypeInfo.name}</h4>
                  <p className="text-sm text-blue-800">
                {typeDescriptions[selectedType as keyof typeof typeDescriptions]}
                  </p>
                </div>
            </div>
            </div>
          )}
        </div>
      </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Original Colors */}
        <Card className="p-6 bg-white/90 backdrop-blur-xl border-white/20">
          <h4 className="font-medium text-gray-900 mb-4">Original Colors</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="w-full h-24 rounded-xl border-2 border-white/50 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-center">
                  <div className="text-sm font-mono font-semibold text-gray-900">{color.hex}</div>
                  <div className="text-xs text-gray-500">Color {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Simulated Colors */}
        <Card className="p-6 bg-white/90 backdrop-blur-xl border-white/20">
          <h4 className="font-medium text-gray-900 mb-4">
            Simulated View ({selectedTypeInfo?.name})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {simulatedColors.map((color, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="w-full h-24 rounded-xl border-2 border-white/50 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-center">
                  <div className="text-sm font-mono font-semibold text-gray-900">{color.hex}</div>
                  <div className="text-xs text-gray-500">Color {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Comparison View */}
      <Card className="p-6 bg-white/60 backdrop-blur-xl border-white/20">
        <h4 className="font-medium text-gray-900 mb-4">Side-by-Side Comparison</h4>
        <div className="space-y-3">
          {colors.map((originalColor, index) => (
            <div key={index} className="flex items-center gap-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-white/20">
              <div className="text-sm font-semibold text-gray-700 w-20">
                Color {index + 1}
              </div>
              <div className="flex gap-4 flex-1">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-500 mb-2">Original</div>
                  <div
                    className="h-16 rounded-lg border border-white/50 shadow-lg shadow-black/5"
                    style={{ backgroundColor: originalColor.hex }}
                  />
                  <div className="text-xs font-mono text-gray-600 mt-1 text-center">
                    {originalColor.hex}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-500 mb-2">Simulated</div>
                  <div
                    className="h-16 rounded-lg border border-white/50 shadow-lg shadow-black/5"
                    style={{ backgroundColor: simulatedColors[index].hex }}
                  />
                  <div className="text-xs font-mono text-gray-600 mt-1 text-center">
                    {simulatedColors[index].hex}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};