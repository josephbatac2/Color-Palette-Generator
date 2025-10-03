import React from 'react';
import { ColorHarmony } from '../../types/color';
import { Button } from './button';
import { Card } from './card';
import { Palette } from 'lucide-react';

interface HarmonySelectorProps {
  selectedHarmony: ColorHarmony | null;
  onHarmonySelect: (harmony: ColorHarmony) => void;
}

const harmonies: { value: ColorHarmony; label: string; description: string; icon: string }[] = [
  {
    value: 'monochromatic',
    label: 'Monochromatic',
    description: 'Different shades of the same color',
    icon: '●',
  },
  {
    value: 'analogous',
    label: 'Analogous',
    description: 'Colors next to each other on the color wheel',
    icon: '●●●',
  },
  {
    value: 'complementary',
    label: 'Complementary',
    description: 'Colors opposite each other on the color wheel',
    icon: '●○',
  },
  {
    value: 'triadic',
    label: 'Triadic',
    description: 'Three colors evenly spaced on the color wheel',
    icon: '△',
  },
  {
    value: 'tetradic',
    label: 'Tetradic',
    description: 'Four colors forming a rectangle on the color wheel',
    icon: '◇',
  },
  {
    value: 'split-complementary',
    label: 'Split Complementary',
    description: 'Base color plus two colors adjacent to its complement',
    icon: '●○○',
  },
];

export const HarmonySelector: React.FC<HarmonySelectorProps> = ({
  selectedHarmony,
  onHarmonySelect,
}) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Color Harmony</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {harmonies.map((harmony) => (
          <Button
            key={harmony.value}
            variant={selectedHarmony === harmony.value ? 'default' : 'outline'}
            className={`h-auto p-4 text-left flex items-start gap-3 transition-all ${
              selectedHarmony === harmony.value 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg' 
                : 'hover:bg-gray-50 hover:border-gray-300'
            }`}
            onClick={() => onHarmonySelect(harmony.value)}
          >
            <div className="text-lg mt-0.5 opacity-70">{harmony.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-sm">{harmony.label}</div>
              <div className={`text-xs mt-1 ${
                selectedHarmony === harmony.value ? 'text-white/80' : 'text-gray-500'
              }`}>
                {harmony.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};