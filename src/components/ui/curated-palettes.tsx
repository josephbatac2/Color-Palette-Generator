import React, { useState } from 'react';
import { ColorPalette } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Card } from './card';
import { Button } from './button';
import { PaletteLightbox } from './palette-lightbox';
import { ScrollArea } from './scroll-area';
import { Sparkles } from 'lucide-react';

interface CuratedPalettesProps {
  onPaletteSelect: (palette: ColorPalette) => void;
  className?: string;
}

// Category definitions with their representative colors
const categories = [
  { 
    id: 'all', 
    name: 'All Palettes', 
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'blues', 
    name: 'Blues & Teals', 
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'greens', 
    name: 'Greens & Nature', 
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'reds', 
    name: 'Reds & Pinks', 
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'purples', 
    name: 'Purples & Violets', 
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'oranges', 
    name: 'Oranges & Yellows', 
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'neutrals', 
    name: 'Neutrals & Grays', 
    color: 'linear-gradient(135deg, #e3e3e3 0%, #5d6874 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'vibrant', 
    name: 'Vibrant & Neon', 
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    textColor: 'text-black'
  },
  { 
    id: 'pastels', 
    name: 'Pastels & Soft', 
    color: 'linear-gradient(135deg, #ffeef8 0%, #f0e6ff 100%)',
    textColor: 'text-black'
  },
  {
    id: 'complementary',
    name: 'Complementary',
    color: 'linear-gradient(135deg, #ff6b35 0%, #4facfe 100%)',
    textColor: 'text-black'
  },
  {
    id: 'holidays',
    name: 'Holiday & Seasonal',
    color: 'linear-gradient(135deg, #c41e3a 0%, #165b33 50%, #ffd700 100%)',
    textColor: 'text-black'
  }
];

const curatedPalettes: (Omit<ColorPalette, 'id' | 'createdAt'> & { category: string })[] = [
  // Blues & Teals
  {
    name: 'Ocean Breeze',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(195, 100, 85),
      ColorUtils.createColor(200, 85, 70),
      ColorUtils.createColor(210, 70, 55),
      ColorUtils.createColor(220, 55, 40),
      ColorUtils.createColor(230, 40, 25),
    ],
  },
  {
    name: 'Tropical Paradise',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(180, 100, 70),
      ColorUtils.createColor(170, 90, 65),
      ColorUtils.createColor(160, 80, 60),
      ColorUtils.createColor(150, 70, 55),
      ColorUtils.createColor(140, 60, 50),
    ],
  },
  {
    name: 'Arctic Ice',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(200, 30, 95),
      ColorUtils.createColor(210, 40, 90),
      ColorUtils.createColor(220, 50, 85),
      ColorUtils.createColor(230, 60, 80),
      ColorUtils.createColor(240, 70, 75),
    ],
  },
  {
    name: 'Corporate Blue',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(210, 100, 20),
      ColorUtils.createColor(215, 80, 35),
      ColorUtils.createColor(220, 60, 50),
      ColorUtils.createColor(225, 40, 65),
      ColorUtils.createColor(230, 20, 80),
    ],
  },
  {
    name: 'Blue Depths',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(220, 80, 90),
      ColorUtils.createColor(220, 80, 75),
      ColorUtils.createColor(220, 80, 60),
      ColorUtils.createColor(220, 80, 45),
      ColorUtils.createColor(220, 80, 30),
    ],
  },
  {
    name: 'Sapphire Elegance',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(230, 90, 30),
      ColorUtils.createColor(225, 80, 40),
      ColorUtils.createColor(220, 70, 50),
      ColorUtils.createColor(215, 60, 60),
      ColorUtils.createColor(210, 50, 70),
    ],
  },
  {
    name: 'Mediterranean Sun',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(200, 80, 70),
      ColorUtils.createColor(45, 90, 65),
      ColorUtils.createColor(25, 85, 75),
      ColorUtils.createColor(15, 80, 80),
      ColorUtils.createColor(5, 75, 85),
    ],
  },
  {
    name: 'Nordic Minimalism',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(210, 15, 90),
      ColorUtils.createColor(200, 20, 85),
      ColorUtils.createColor(190, 25, 80),
      ColorUtils.createColor(180, 30, 75),
      ColorUtils.createColor(170, 35, 70),
    ],
  },
  {
    name: 'Winter Frost',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(200, 40, 90),
      ColorUtils.createColor(220, 30, 85),
      ColorUtils.createColor(240, 20, 80),
      ColorUtils.createColor(260, 10, 75),
      ColorUtils.createColor(280, 5, 70),
    ],
  },

  // Additional Blues & Teals
  {
    name: 'Deep Ocean',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(210, 100, 15),
      ColorUtils.createColor(215, 90, 25),
      ColorUtils.createColor(220, 80, 35),
      ColorUtils.createColor(225, 70, 45),
      ColorUtils.createColor(230, 60, 55),
    ],
  },
  {
    name: 'Glacier Bay',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(190, 60, 95),
      ColorUtils.createColor(200, 70, 90),
      ColorUtils.createColor(210, 80, 85),
      ColorUtils.createColor(220, 90, 80),
      ColorUtils.createColor(230, 100, 75),
    ],
  },
  {
    name: 'Teal Waves',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(180, 100, 80),
      ColorUtils.createColor(185, 90, 70),
      ColorUtils.createColor(190, 80, 60),
      ColorUtils.createColor(195, 70, 50),
      ColorUtils.createColor(200, 60, 40),
    ],
  },
  {
    name: 'Steel Blue',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(210, 40, 80),
      ColorUtils.createColor(215, 50, 70),
      ColorUtils.createColor(220, 60, 60),
      ColorUtils.createColor(225, 70, 50),
      ColorUtils.createColor(230, 80, 40),
    ],
  },
  {
    name: 'Midnight Sky',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(240, 100, 10),
      ColorUtils.createColor(235, 90, 20),
      ColorUtils.createColor(230, 80, 30),
      ColorUtils.createColor(225, 70, 40),
      ColorUtils.createColor(220, 60, 50),
    ],
  },

  // Greens & Nature
  {
    name: 'Forest Harmony',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(120, 40, 30),
      ColorUtils.createColor(130, 50, 40),
      ColorUtils.createColor(140, 60, 50),
      ColorUtils.createColor(150, 70, 60),
      ColorUtils.createColor(160, 80, 70),
    ],
  },
  {
    name: 'Financial Green',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(140, 40, 85),
      ColorUtils.createColor(145, 50, 75),
      ColorUtils.createColor(150, 60, 65),
      ColorUtils.createColor(155, 70, 55),
      ColorUtils.createColor(160, 80, 45),
    ],
  },
  {
    name: 'Emerald Shades',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(150, 70, 85),
      ColorUtils.createColor(150, 70, 70),
      ColorUtils.createColor(150, 70, 55),
      ColorUtils.createColor(150, 70, 40),
      ColorUtils.createColor(150, 70, 25),
    ],
  },
  {
    name: 'Emerald Luxury',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(150, 80, 25),
      ColorUtils.createColor(155, 70, 35),
      ColorUtils.createColor(160, 60, 45),
      ColorUtils.createColor(165, 50, 55),
      ColorUtils.createColor(170, 40, 65),
    ],
  },
  {
    name: 'Spring Awakening',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(100, 60, 80),
      ColorUtils.createColor(80, 70, 75),
      ColorUtils.createColor(60, 80, 70),
      ColorUtils.createColor(40, 90, 65),
      ColorUtils.createColor(20, 100, 60),
    ],
  },
  {
    name: 'Mint Fresh',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(160, 60, 85),
      ColorUtils.createColor(170, 50, 75),
      ColorUtils.createColor(180, 40, 65),
      ColorUtils.createColor(190, 30, 55),
      ColorUtils.createColor(200, 20, 45),
    ],
  },

  // Additional Greens & Nature
  {
    name: 'Jungle Canopy',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(120, 80, 20),
      ColorUtils.createColor(125, 70, 30),
      ColorUtils.createColor(130, 60, 40),
      ColorUtils.createColor(135, 50, 50),
      ColorUtils.createColor(140, 40, 60),
    ],
  },
  {
    name: 'Sage Garden',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(90, 30, 80),
      ColorUtils.createColor(100, 40, 75),
      ColorUtils.createColor(110, 50, 70),
      ColorUtils.createColor(120, 60, 65),
      ColorUtils.createColor(130, 70, 60),
    ],
  },
  {
    name: 'Pine Forest',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(140, 60, 25),
      ColorUtils.createColor(145, 70, 35),
      ColorUtils.createColor(150, 80, 45),
      ColorUtils.createColor(155, 90, 55),
      ColorUtils.createColor(160, 100, 65),
    ],
  },
  {
    name: 'Moss Stone',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(80, 40, 40),
      ColorUtils.createColor(90, 50, 50),
      ColorUtils.createColor(100, 60, 60),
      ColorUtils.createColor(110, 70, 70),
      ColorUtils.createColor(120, 80, 80),
    ],
  },
  {
    name: 'Bamboo Grove',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(70, 50, 85),
      ColorUtils.createColor(80, 60, 80),
      ColorUtils.createColor(90, 70, 75),
      ColorUtils.createColor(100, 80, 70),
      ColorUtils.createColor(110, 90, 65),
    ],
  },

  // Reds & Pinks
  {
    name: 'Sunset Glow',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(15, 100, 70),
      ColorUtils.createColor(25, 95, 65),
      ColorUtils.createColor(35, 90, 60),
      ColorUtils.createColor(45, 85, 55),
      ColorUtils.createColor(55, 80, 50),
    ],
  },
  {
    name: 'Cherry Blossom',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(340, 60, 90),
      ColorUtils.createColor(350, 70, 85),
      ColorUtils.createColor(0, 80, 80),
      ColorUtils.createColor(10, 90, 75),
      ColorUtils.createColor(20, 100, 70),
    ],
  },
  {
    name: 'Ruby Tones',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(350, 80, 85),
      ColorUtils.createColor(350, 80, 70),
      ColorUtils.createColor(350, 80, 55),
      ColorUtils.createColor(350, 80, 40),
      ColorUtils.createColor(350, 80, 25),
    ],
  },
  {
    name: 'Rose Gold',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(15, 60, 80),
      ColorUtils.createColor(20, 70, 75),
      ColorUtils.createColor(25, 80, 70),
      ColorUtils.createColor(30, 90, 65),
      ColorUtils.createColor(35, 100, 60),
    ],
  },
  {
    name: 'Berry Smoothie',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(330, 80, 70),
      ColorUtils.createColor(320, 85, 65),
      ColorUtils.createColor(310, 90, 60),
      ColorUtils.createColor(300, 95, 55),
      ColorUtils.createColor(290, 100, 50),
    ],
  },

  // Additional Reds & Pinks
  {
    name: 'Crimson Sunset',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(0, 100, 30),
      ColorUtils.createColor(5, 90, 40),
      ColorUtils.createColor(10, 80, 50),
      ColorUtils.createColor(15, 70, 60),
      ColorUtils.createColor(20, 60, 70),
    ],
  },
  {
    name: 'Coral Reef',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(10, 80, 75),
      ColorUtils.createColor(15, 85, 70),
      ColorUtils.createColor(20, 90, 65),
      ColorUtils.createColor(25, 95, 60),
      ColorUtils.createColor(30, 100, 55),
    ],
  },
  {
    name: 'Wine Cellar',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(340, 80, 25),
      ColorUtils.createColor(345, 70, 35),
      ColorUtils.createColor(350, 60, 45),
      ColorUtils.createColor(355, 50, 55),
      ColorUtils.createColor(0, 40, 65),
    ],
  },
  {
    name: 'Strawberry Fields',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(350, 90, 80),
      ColorUtils.createColor(355, 85, 75),
      ColorUtils.createColor(0, 80, 70),
      ColorUtils.createColor(5, 75, 65),
      ColorUtils.createColor(10, 70, 60),
    ],
  },
  {
    name: 'Burgundy Velvet',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(330, 100, 20),
      ColorUtils.createColor(335, 90, 30),
      ColorUtils.createColor(340, 80, 40),
      ColorUtils.createColor(345, 70, 50),
      ColorUtils.createColor(350, 60, 60),
    ],
  },

  // Purples & Violets
  {
    name: 'Lavender Fields',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(270, 50, 85),
      ColorUtils.createColor(280, 60, 80),
      ColorUtils.createColor(290, 70, 75),
      ColorUtils.createColor(300, 80, 70),
      ColorUtils.createColor(310, 90, 65),
    ],
  },
  {
    name: 'Tech Innovation',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(260, 80, 70),
      ColorUtils.createColor(270, 70, 65),
      ColorUtils.createColor(280, 60, 60),
      ColorUtils.createColor(290, 50, 55),
      ColorUtils.createColor(300, 40, 50),
    ],
  },
  {
    name: 'Purple Reign',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(280, 70, 85),
      ColorUtils.createColor(280, 70, 70),
      ColorUtils.createColor(280, 70, 55),
      ColorUtils.createColor(280, 70, 40),
      ColorUtils.createColor(280, 70, 25),
    ],
  },
  {
    name: 'Amethyst Dreams',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(280, 70, 30),
      ColorUtils.createColor(285, 60, 40),
      ColorUtils.createColor(290, 50, 50),
      ColorUtils.createColor(295, 40, 60),
      ColorUtils.createColor(300, 30, 70),
    ],
  },

  // Additional Purples & Violets
  {
    name: 'Royal Purple',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(270, 100, 25),
      ColorUtils.createColor(275, 90, 35),
      ColorUtils.createColor(280, 80, 45),
      ColorUtils.createColor(285, 70, 55),
      ColorUtils.createColor(290, 60, 65),
    ],
  },
  {
    name: 'Violet Storm',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(260, 80, 30),
      ColorUtils.createColor(270, 70, 40),
      ColorUtils.createColor(280, 60, 50),
      ColorUtils.createColor(290, 50, 60),
      ColorUtils.createColor(300, 40, 70),
    ],
  },
  {
    name: 'Plum Orchard',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(300, 60, 70),
      ColorUtils.createColor(310, 70, 65),
      ColorUtils.createColor(320, 80, 60),
      ColorUtils.createColor(330, 90, 55),
      ColorUtils.createColor(340, 100, 50),
    ],
  },
  {
    name: 'Mystic Orchid',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(290, 70, 85),
      ColorUtils.createColor(295, 80, 80),
      ColorUtils.createColor(300, 90, 75),
      ColorUtils.createColor(305, 100, 70),
      ColorUtils.createColor(310, 90, 65),
    ],
  },
  {
    name: 'Galaxy Nebula',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(250, 100, 15),
      ColorUtils.createColor(260, 90, 25),
      ColorUtils.createColor(270, 80, 35),
      ColorUtils.createColor(280, 70, 45),
      ColorUtils.createColor(290, 60, 55),
    ],
  },

  // Oranges & Yellows
  {
    name: 'Autumn Leaves',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(30, 80, 60),
      ColorUtils.createColor(20, 85, 55),
      ColorUtils.createColor(10, 90, 50),
      ColorUtils.createColor(0, 95, 45),
      ColorUtils.createColor(350, 100, 40),
    ],
  },
  {
    name: 'Desert Sand',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(40, 60, 85),
      ColorUtils.createColor(35, 70, 75),
      ColorUtils.createColor(30, 80, 65),
      ColorUtils.createColor(25, 90, 55),
      ColorUtils.createColor(20, 100, 45),
    ],
  },
  {
    name: 'Golden Hour',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(45, 90, 85),
      ColorUtils.createColor(45, 90, 70),
      ColorUtils.createColor(45, 90, 55),
      ColorUtils.createColor(45, 90, 40),
      ColorUtils.createColor(45, 90, 25),
    ],
  },
  {
    name: 'Citrus Burst',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(60, 100, 70),
      ColorUtils.createColor(50, 95, 65),
      ColorUtils.createColor(40, 90, 60),
      ColorUtils.createColor(30, 85, 55),
      ColorUtils.createColor(20, 80, 50),
    ],
  },
  {
    name: 'Summer Vibes',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(50, 100, 70),
      ColorUtils.createColor(180, 80, 60),
      ColorUtils.createColor(200, 90, 65),
      ColorUtils.createColor(320, 70, 75),
      ColorUtils.createColor(280, 60, 80),
    ],
  },
  {
    name: 'Autumn Harvest',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(30, 80, 60),
      ColorUtils.createColor(20, 85, 55),
      ColorUtils.createColor(10, 90, 50),
      ColorUtils.createColor(0, 95, 45),
      ColorUtils.createColor(350, 100, 40),
    ],
  },
  {
    name: 'Peach Sorbet',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(20, 50, 90),
      ColorUtils.createColor(25, 60, 85),
      ColorUtils.createColor(30, 70, 80),
      ColorUtils.createColor(35, 80, 75),
      ColorUtils.createColor(40, 90, 70),
    ],
  },

  // Additional Oranges & Yellows
  {
    name: 'Sunrise Glory',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(50, 100, 80),
      ColorUtils.createColor(45, 95, 75),
      ColorUtils.createColor(40, 90, 70),
      ColorUtils.createColor(35, 85, 65),
      ColorUtils.createColor(30, 80, 60),
    ],
  },
  {
    name: 'Honey Amber',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(45, 80, 70),
      ColorUtils.createColor(40, 85, 65),
      ColorUtils.createColor(35, 90, 60),
      ColorUtils.createColor(30, 95, 55),
      ColorUtils.createColor(25, 100, 50),
    ],
  },
  {
    name: 'Marigold Garden',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(50, 90, 75),
      ColorUtils.createColor(45, 85, 70),
      ColorUtils.createColor(40, 80, 65),
      ColorUtils.createColor(35, 75, 60),
      ColorUtils.createColor(30, 70, 55),
    ],
  },
  {
    name: 'Pumpkin Spice',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(25, 100, 60),
      ColorUtils.createColor(20, 95, 55),
      ColorUtils.createColor(15, 90, 50),
      ColorUtils.createColor(10, 85, 45),
      ColorUtils.createColor(5, 80, 40),
    ],
  },
  {
    name: 'Tangerine Dream',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(30, 100, 70),
      ColorUtils.createColor(25, 95, 65),
      ColorUtils.createColor(20, 90, 60),
      ColorUtils.createColor(15, 85, 55),
      ColorUtils.createColor(10, 80, 50),
    ],
  },

  // Neutrals & Grays
  {
    name: 'Executive Gray',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(220, 10, 90),
      ColorUtils.createColor(220, 15, 75),
      ColorUtils.createColor(220, 20, 60),
      ColorUtils.createColor(220, 25, 45),
      ColorUtils.createColor(220, 30, 30),
    ],
  },
  {
    name: 'Modern Minimal',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(0, 0, 95),
      ColorUtils.createColor(0, 0, 80),
      ColorUtils.createColor(0, 0, 65),
      ColorUtils.createColor(0, 0, 50),
      ColorUtils.createColor(0, 0, 35),
    ],
  },
  {
    name: 'Mountain Mist',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(210, 20, 90),
      ColorUtils.createColor(220, 30, 80),
      ColorUtils.createColor(230, 40, 70),
      ColorUtils.createColor(240, 50, 60),
      ColorUtils.createColor(250, 60, 50),
    ],
  },
  {
    name: 'Platinum Shine',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(210, 5, 85),
      ColorUtils.createColor(215, 10, 75),
      ColorUtils.createColor(220, 15, 65),
      ColorUtils.createColor(225, 20, 55),
      ColorUtils.createColor(230, 25, 45),
    ],
  },
  {
    name: 'Minimalist Canvas',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(0, 0, 95),
      ColorUtils.createColor(0, 0, 85),
      ColorUtils.createColor(0, 0, 75),
      ColorUtils.createColor(0, 0, 65),
      ColorUtils.createColor(0, 0, 55),
    ],
  },
  {
    name: 'Espresso Blend',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(30, 60, 20),
      ColorUtils.createColor(25, 70, 30),
      ColorUtils.createColor(20, 80, 40),
      ColorUtils.createColor(15, 90, 50),
      ColorUtils.createColor(10, 100, 60),
    ],
  },
  {
    name: 'Chocolate Truffle',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(30, 40, 70),
      ColorUtils.createColor(25, 50, 60),
      ColorUtils.createColor(20, 60, 50),
      ColorUtils.createColor(15, 70, 40),
      ColorUtils.createColor(10, 80, 30),
    ],
  },
  {
    name: 'Vanilla Cream',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(50, 30, 95),
      ColorUtils.createColor(45, 40, 90),
      ColorUtils.createColor(40, 50, 85),
      ColorUtils.createColor(35, 60, 80),
      ColorUtils.createColor(30, 70, 75),
    ],
  },

  // Additional Neutrals & Grays
  {
    name: 'Charcoal Depths',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(210, 20, 15),
      ColorUtils.createColor(215, 15, 25),
      ColorUtils.createColor(220, 10, 35),
      ColorUtils.createColor(225, 5, 45),
      ColorUtils.createColor(230, 0, 55),
    ],
  },
  {
    name: 'Concrete Jungle',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(200, 5, 85),
      ColorUtils.createColor(210, 10, 75),
      ColorUtils.createColor(220, 15, 65),
      ColorUtils.createColor(230, 20, 55),
      ColorUtils.createColor(240, 25, 45),
    ],
  },
  {
    name: 'Warm Stone',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(30, 20, 85),
      ColorUtils.createColor(25, 25, 75),
      ColorUtils.createColor(20, 30, 65),
      ColorUtils.createColor(15, 35, 55),
      ColorUtils.createColor(10, 40, 45),
    ],
  },
  {
    name: 'Silver Mist',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(220, 10, 90),
      ColorUtils.createColor(225, 15, 80),
      ColorUtils.createColor(230, 20, 70),
      ColorUtils.createColor(235, 25, 60),
      ColorUtils.createColor(240, 30, 50),
    ],
  },
  {
    name: 'Graphite Sketch',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(0, 0, 20),
      ColorUtils.createColor(0, 0, 35),
      ColorUtils.createColor(0, 0, 50),
      ColorUtils.createColor(0, 0, 65),
      ColorUtils.createColor(0, 0, 80),
    ],
  },

  // Vibrant & Neon
  {
    name: 'Neon Nights',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(300, 100, 50),
      ColorUtils.createColor(270, 100, 55),
      ColorUtils.createColor(240, 100, 60),
      ColorUtils.createColor(180, 100, 50),
      ColorUtils.createColor(120, 100, 45),
    ],
  },
  {
    name: 'Electric Dreams',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(320, 100, 60),
      ColorUtils.createColor(280, 100, 65),
      ColorUtils.createColor(240, 100, 70),
      ColorUtils.createColor(200, 100, 65),
      ColorUtils.createColor(160, 100, 60),
    ],
  },
  {
    name: 'Rainbow Burst',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(0, 100, 60),
      ColorUtils.createColor(60, 100, 60),
      ColorUtils.createColor(120, 100, 60),
      ColorUtils.createColor(240, 100, 60),
      ColorUtils.createColor(300, 100, 60),
    ],
  },
  {
    name: 'Cosmic Energy',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(280, 90, 40),
      ColorUtils.createColor(300, 80, 50),
      ColorUtils.createColor(320, 70, 60),
      ColorUtils.createColor(340, 60, 70),
      ColorUtils.createColor(0, 50, 80),
    ],
  },
  {
    name: 'Retro Synthwave',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(320, 100, 50),
      ColorUtils.createColor(280, 100, 60),
      ColorUtils.createColor(240, 100, 70),
      ColorUtils.createColor(200, 100, 60),
      ColorUtils.createColor(160, 100, 50),
    ],
  },
  {
    name: 'Abstract Expression',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(120, 100, 40),
      ColorUtils.createColor(240, 100, 60),
      ColorUtils.createColor(60, 80, 70),
      ColorUtils.createColor(300, 90, 45),
    ],
  },
  {
    name: 'Pop Art Explosion',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(340, 100, 60),
      ColorUtils.createColor(60, 100, 50),
      ColorUtils.createColor(200, 100, 55),
      ColorUtils.createColor(280, 100, 65),
      ColorUtils.createColor(120, 100, 45),
    ],
  },
  {
    name: 'Tokyo Neon',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(320, 100, 50),
      ColorUtils.createColor(280, 100, 55),
      ColorUtils.createColor(240, 100, 60),
      ColorUtils.createColor(200, 100, 55),
      ColorUtils.createColor(160, 100, 50),
    ],
  },
  {
    name: 'Digital Glitch',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(320, 100, 40),
      ColorUtils.createColor(180, 100, 50),
      ColorUtils.createColor(60, 100, 60),
      ColorUtils.createColor(240, 100, 45),
      ColorUtils.createColor(0, 100, 55),
    ],
  },

  // Additional Vibrant & Neon
  {
    name: 'Cyber Punk',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(300, 100, 40),
      ColorUtils.createColor(180, 100, 45),
      ColorUtils.createColor(60, 100, 50),
      ColorUtils.createColor(240, 100, 55),
      ColorUtils.createColor(0, 100, 60),
    ],
  },
  {
    name: 'Laser Light Show',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(320, 100, 55),
      ColorUtils.createColor(200, 100, 60),
      ColorUtils.createColor(80, 100, 65),
      ColorUtils.createColor(280, 100, 70),
      ColorUtils.createColor(40, 100, 75),
    ],
  },
  {
    name: 'Neon Arcade',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(330, 100, 50),
      ColorUtils.createColor(270, 100, 55),
      ColorUtils.createColor(210, 100, 60),
      ColorUtils.createColor(150, 100, 65),
      ColorUtils.createColor(90, 100, 70),
    ],
  },
  {
    name: 'Electric Pulse',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(310, 100, 45),
      ColorUtils.createColor(190, 100, 50),
      ColorUtils.createColor(70, 100, 55),
      ColorUtils.createColor(250, 100, 60),
      ColorUtils.createColor(130, 100, 65),
    ],
  },
  {
    name: 'Holographic',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(290, 100, 60),
      ColorUtils.createColor(170, 100, 65),
      ColorUtils.createColor(50, 100, 70),
      ColorUtils.createColor(230, 100, 75),
      ColorUtils.createColor(110, 100, 80),
    ],
  },

  // Pastels & Soft
  {
    name: 'Pastel Dream',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(340, 30, 85),
      ColorUtils.createColor(10, 35, 87),
      ColorUtils.createColor(60, 40, 89),
      ColorUtils.createColor(120, 25, 85),
      ColorUtils.createColor(240, 30, 87),
    ],
  },
  {
    name: 'Cotton Candy',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(320, 40, 90),
      ColorUtils.createColor(300, 35, 88),
      ColorUtils.createColor(280, 30, 86),
      ColorUtils.createColor(260, 25, 84),
      ColorUtils.createColor(240, 20, 82),
    ],
  },
  {
    name: 'Baby Powder',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(200, 20, 95),
      ColorUtils.createColor(180, 25, 93),
      ColorUtils.createColor(160, 30, 91),
      ColorUtils.createColor(140, 35, 89),
      ColorUtils.createColor(120, 40, 87),
    ],
  },
  {
    name: 'Watercolor Wash',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(200, 40, 85),
      ColorUtils.createColor(220, 35, 80),
      ColorUtils.createColor(240, 30, 75),
      ColorUtils.createColor(260, 25, 70),
      ColorUtils.createColor(280, 20, 65),
    ],
  },

  // Additional Pastels & Soft
  {
    name: 'Powder Puff',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(330, 25, 92),
      ColorUtils.createColor(300, 30, 90),
      ColorUtils.createColor(270, 35, 88),
      ColorUtils.createColor(240, 40, 86),
      ColorUtils.createColor(210, 45, 84),
    ],
  },
  {
    name: 'Soft Sunrise',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(50, 40, 90),
      ColorUtils.createColor(40, 45, 88),
      ColorUtils.createColor(30, 50, 86),
      ColorUtils.createColor(20, 55, 84),
      ColorUtils.createColor(10, 60, 82),
    ],
  },
  {
    name: 'Cloud Nine',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(220, 15, 95),
      ColorUtils.createColor(200, 20, 93),
      ColorUtils.createColor(180, 25, 91),
      ColorUtils.createColor(160, 30, 89),
      ColorUtils.createColor(140, 35, 87),
    ],
  },
  {
    name: 'Fairy Tale',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(320, 35, 88),
      ColorUtils.createColor(280, 30, 86),
      ColorUtils.createColor(240, 25, 84),
      ColorUtils.createColor(200, 20, 82),
      ColorUtils.createColor(160, 15, 80),
    ],
  },
  {
    name: 'Marshmallow',
    type: 'curated',
    category: 'pastels',
    colors: [
      ColorUtils.createColor(0, 20, 95),
      ColorUtils.createColor(30, 25, 93),
      ColorUtils.createColor(60, 30, 91),
      ColorUtils.createColor(90, 35, 89),
      ColorUtils.createColor(120, 40, 87),
    ],
  },

  // 50 NEW NOVEL PALETTES

  // Blues & Teals - 10 new
  {
    name: 'Cosmic Nebula',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(220, 95, 15),
      ColorUtils.createColor(240, 85, 25),
      ColorUtils.createColor(260, 75, 35),
      ColorUtils.createColor(280, 65, 45),
      ColorUtils.createColor(300, 55, 55),
    ],
  },
  {
    name: 'Quantum Blue',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(195, 100, 20),
      ColorUtils.createColor(205, 90, 30),
      ColorUtils.createColor(215, 80, 40),
      ColorUtils.createColor(225, 70, 50),
      ColorUtils.createColor(235, 60, 60),
    ],
  },
  {
    name: 'Digital Ocean',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(190, 80, 25),
      ColorUtils.createColor(200, 85, 35),
      ColorUtils.createColor(210, 90, 45),
      ColorUtils.createColor(220, 95, 55),
      ColorUtils.createColor(230, 100, 65),
    ],
  },
  {
    name: 'Cyber Teal',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(180, 100, 30),
      ColorUtils.createColor(185, 90, 40),
      ColorUtils.createColor(190, 80, 50),
      ColorUtils.createColor(195, 70, 60),
      ColorUtils.createColor(200, 60, 70),
    ],
  },
  {
    name: 'Electric Blue',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(210, 100, 40),
      ColorUtils.createColor(215, 95, 50),
      ColorUtils.createColor(220, 90, 60),
      ColorUtils.createColor(225, 85, 70),
      ColorUtils.createColor(230, 80, 80),
    ],
  },
  {
    name: 'Aqua Dreams',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(175, 70, 80),
      ColorUtils.createColor(180, 75, 75),
      ColorUtils.createColor(185, 80, 70),
      ColorUtils.createColor(190, 85, 65),
      ColorUtils.createColor(195, 90, 60),
    ],
  },
  {
    name: 'Prussian Depths',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(220, 100, 18),
      ColorUtils.createColor(225, 90, 28),
      ColorUtils.createColor(230, 80, 38),
      ColorUtils.createColor(235, 70, 48),
      ColorUtils.createColor(240, 60, 58),
    ],
  },
  {
    name: 'Cerulean Sky',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(200, 60, 85),
      ColorUtils.createColor(205, 65, 80),
      ColorUtils.createColor(210, 70, 75),
      ColorUtils.createColor(215, 75, 70),
      ColorUtils.createColor(220, 80, 65),
    ],
  },
  {
    name: 'Indigo Twilight',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(240, 80, 25),
      ColorUtils.createColor(235, 75, 35),
      ColorUtils.createColor(230, 70, 45),
      ColorUtils.createColor(225, 65, 55),
      ColorUtils.createColor(220, 60, 65),
    ],
  },
  {
    name: 'Turquoise Lagoon',
    type: 'curated',
    category: 'blues',
    colors: [
      ColorUtils.createColor(170, 85, 70),
      ColorUtils.createColor(175, 80, 65),
      ColorUtils.createColor(180, 75, 60),
      ColorUtils.createColor(185, 70, 55),
      ColorUtils.createColor(190, 65, 50),
    ],
  },

  // Greens & Nature - 10 new
  {
    name: 'Neon Jungle',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(120, 100, 40),
      ColorUtils.createColor(125, 95, 45),
      ColorUtils.createColor(130, 90, 50),
      ColorUtils.createColor(135, 85, 55),
      ColorUtils.createColor(140, 80, 60),
    ],
  },
  {
    name: 'Matrix Code',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(120, 100, 25),
      ColorUtils.createColor(125, 90, 35),
      ColorUtils.createColor(130, 80, 45),
      ColorUtils.createColor(135, 70, 55),
      ColorUtils.createColor(140, 60, 65),
    ],
  },
  {
    name: 'Alien Landscape',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(100, 80, 30),
      ColorUtils.createColor(110, 85, 40),
      ColorUtils.createColor(120, 90, 50),
      ColorUtils.createColor(130, 95, 60),
      ColorUtils.createColor(140, 100, 70),
    ],
  },
  {
    name: 'Jade Empire',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(160, 70, 30),
      ColorUtils.createColor(155, 75, 40),
      ColorUtils.createColor(150, 80, 50),
      ColorUtils.createColor(145, 85, 60),
      ColorUtils.createColor(140, 90, 70),
    ],
  },
  {
    name: 'Toxic Waste',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(80, 100, 45),
      ColorUtils.createColor(90, 95, 50),
      ColorUtils.createColor(100, 90, 55),
      ColorUtils.createColor(110, 85, 60),
      ColorUtils.createColor(120, 80, 65),
    ],
  },
  {
    name: 'Malachite Dreams',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(150, 90, 25),
      ColorUtils.createColor(155, 85, 35),
      ColorUtils.createColor(160, 80, 45),
      ColorUtils.createColor(165, 75, 55),
      ColorUtils.createColor(170, 70, 65),
    ],
  },
  {
    name: 'Cyber Forest',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(120, 85, 35),
      ColorUtils.createColor(130, 80, 45),
      ColorUtils.createColor(140, 75, 55),
      ColorUtils.createColor(150, 70, 65),
      ColorUtils.createColor(160, 65, 75),
    ],
  },
  {
    name: 'Radioactive Glow',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(90, 100, 50),
      ColorUtils.createColor(100, 95, 55),
      ColorUtils.createColor(110, 90, 60),
      ColorUtils.createColor(120, 85, 65),
      ColorUtils.createColor(130, 80, 70),
    ],
  },
  {
    name: 'Emerald City',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(140, 100, 20),
      ColorUtils.createColor(145, 90, 30),
      ColorUtils.createColor(150, 80, 40),
      ColorUtils.createColor(155, 70, 50),
      ColorUtils.createColor(160, 60, 60),
    ],
  },
  {
    name: 'Absinthe Night',
    type: 'curated',
    category: 'greens',
    colors: [
      ColorUtils.createColor(70, 60, 40),
      ColorUtils.createColor(80, 65, 45),
      ColorUtils.createColor(90, 70, 50),
      ColorUtils.createColor(100, 75, 55),
      ColorUtils.createColor(110, 80, 60),
    ],
  },

  // Reds & Pinks - 10 new
  {
    name: 'Neon Magenta',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(320, 100, 40),
      ColorUtils.createColor(325, 95, 45),
      ColorUtils.createColor(330, 90, 50),
      ColorUtils.createColor(335, 85, 55),
      ColorUtils.createColor(340, 80, 60),
    ],
  },
  {
    name: 'Blood Moon',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(0, 100, 20),
      ColorUtils.createColor(5, 90, 30),
      ColorUtils.createColor(10, 80, 40),
      ColorUtils.createColor(15, 70, 50),
      ColorUtils.createColor(20, 60, 60),
    ],
  },
  {
    name: 'Cyber Pink',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(330, 100, 50),
      ColorUtils.createColor(335, 90, 55),
      ColorUtils.createColor(340, 80, 60),
      ColorUtils.createColor(345, 70, 65),
      ColorUtils.createColor(350, 60, 70),
    ],
  },
  {
    name: 'Volcanic Ash',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(10, 80, 25),
      ColorUtils.createColor(15, 75, 35),
      ColorUtils.createColor(20, 70, 45),
      ColorUtils.createColor(25, 65, 55),
      ColorUtils.createColor(30, 60, 65),
    ],
  },
  {
    name: 'Hot Sauce',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(5, 100, 35),
      ColorUtils.createColor(10, 95, 40),
      ColorUtils.createColor(15, 90, 45),
      ColorUtils.createColor(20, 85, 50),
      ColorUtils.createColor(25, 80, 55),
    ],
  },
  {
    name: 'Fuchsia Fever',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(310, 100, 45),
      ColorUtils.createColor(315, 95, 50),
      ColorUtils.createColor(320, 90, 55),
      ColorUtils.createColor(325, 85, 60),
      ColorUtils.createColor(330, 80, 65),
    ],
  },
  {
    name: 'Crimson Lightning',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(350, 100, 30),
      ColorUtils.createColor(355, 90, 40),
      ColorUtils.createColor(0, 80, 50),
      ColorUtils.createColor(5, 70, 60),
      ColorUtils.createColor(10, 60, 70),
    ],
  },
  {
    name: 'Raspberry Punk',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(340, 90, 35),
      ColorUtils.createColor(345, 85, 45),
      ColorUtils.createColor(350, 80, 55),
      ColorUtils.createColor(355, 75, 65),
      ColorUtils.createColor(0, 70, 75),
    ],
  },
  {
    name: 'Scarlet Witch',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(0, 90, 25),
      ColorUtils.createColor(5, 85, 35),
      ColorUtils.createColor(10, 80, 45),
      ColorUtils.createColor(15, 75, 55),
      ColorUtils.createColor(20, 70, 65),
    ],
  },
  {
    name: 'Neon Coral',
    type: 'curated',
    category: 'reds',
    colors: [
      ColorUtils.createColor(15, 85, 65),
      ColorUtils.createColor(20, 80, 60),
      ColorUtils.createColor(25, 75, 55),
      ColorUtils.createColor(30, 70, 50),
      ColorUtils.createColor(35, 65, 45),
    ],
  },

  // Purples & Violets - 10 new
  {
    name: 'Cosmic Violet',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(270, 100, 20),
      ColorUtils.createColor(275, 90, 30),
      ColorUtils.createColor(280, 80, 40),
      ColorUtils.createColor(285, 70, 50),
      ColorUtils.createColor(290, 60, 60),
    ],
  },
  {
    name: 'Neon Purple',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(280, 100, 45),
      ColorUtils.createColor(285, 95, 50),
      ColorUtils.createColor(290, 90, 55),
      ColorUtils.createColor(295, 85, 60),
      ColorUtils.createColor(300, 80, 65),
    ],
  },
  {
    name: 'Witch Brew',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(270, 80, 25),
      ColorUtils.createColor(275, 75, 35),
      ColorUtils.createColor(280, 70, 45),
      ColorUtils.createColor(285, 65, 55),
      ColorUtils.createColor(290, 60, 65),
    ],
  },
  {
    name: 'Electric Grape',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(290, 100, 40),
      ColorUtils.createColor(295, 90, 45),
      ColorUtils.createColor(300, 80, 50),
      ColorUtils.createColor(305, 70, 55),
      ColorUtils.createColor(310, 60, 60),
    ],
  },
  {
    name: 'Ultraviolet',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(260, 100, 30),
      ColorUtils.createColor(265, 95, 35),
      ColorUtils.createColor(270, 90, 40),
      ColorUtils.createColor(275, 85, 45),
      ColorUtils.createColor(280, 80, 50),
    ],
  },
  {
    name: 'Cyber Orchid',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(300, 90, 35),
      ColorUtils.createColor(305, 85, 45),
      ColorUtils.createColor(310, 80, 55),
      ColorUtils.createColor(315, 75, 65),
      ColorUtils.createColor(320, 70, 75),
    ],
  },
  {
    name: 'Dark Magic',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(280, 90, 15),
      ColorUtils.createColor(285, 80, 25),
      ColorUtils.createColor(290, 70, 35),
      ColorUtils.createColor(295, 60, 45),
      ColorUtils.createColor(300, 50, 55),
    ],
  },
  {
    name: 'Holographic Purple',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(270, 85, 55),
      ColorUtils.createColor(280, 80, 60),
      ColorUtils.createColor(290, 75, 65),
      ColorUtils.createColor(300, 70, 70),
      ColorUtils.createColor(310, 65, 75),
    ],
  },
  {
    name: 'Phantom Violet',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(260, 70, 30),
      ColorUtils.createColor(270, 75, 40),
      ColorUtils.createColor(280, 80, 50),
      ColorUtils.createColor(290, 85, 60),
      ColorUtils.createColor(300, 90, 70),
    ],
  },
  {
    name: 'Neon Lavender',
    type: 'curated',
    category: 'purples',
    colors: [
      ColorUtils.createColor(280, 60, 70),
      ColorUtils.createColor(285, 65, 75),
      ColorUtils.createColor(290, 70, 80),
      ColorUtils.createColor(295, 75, 85),
      ColorUtils.createColor(300, 80, 90),
    ],
  },

  // Oranges & Yellows - 10 new
  {
    name: 'Neon Orange',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(20, 100, 50),
      ColorUtils.createColor(25, 95, 55),
      ColorUtils.createColor(30, 90, 60),
      ColorUtils.createColor(35, 85, 65),
      ColorUtils.createColor(40, 80, 70),
    ],
  },
  {
    name: 'Cyber Gold',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(45, 100, 40),
      ColorUtils.createColor(50, 95, 45),
      ColorUtils.createColor(55, 90, 50),
      ColorUtils.createColor(60, 85, 55),
      ColorUtils.createColor(65, 80, 60),
    ],
  },
  {
    name: 'Molten Lava',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(15, 100, 30),
      ColorUtils.createColor(20, 95, 35),
      ColorUtils.createColor(25, 90, 40),
      ColorUtils.createColor(30, 85, 45),
      ColorUtils.createColor(35, 80, 50),
    ],
  },
  {
    name: 'Electric Amber',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(40, 90, 45),
      ColorUtils.createColor(45, 85, 50),
      ColorUtils.createColor(50, 80, 55),
      ColorUtils.createColor(55, 75, 60),
      ColorUtils.createColor(60, 70, 65),
    ],
  },
  {
    name: 'Solar Flare',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(30, 100, 55),
      ColorUtils.createColor(35, 95, 60),
      ColorUtils.createColor(40, 90, 65),
      ColorUtils.createColor(45, 85, 70),
      ColorUtils.createColor(50, 80, 75),
    ],
  },
  {
    name: 'Neon Sunset',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(10, 100, 60),
      ColorUtils.createColor(20, 95, 65),
      ColorUtils.createColor(30, 90, 70),
      ColorUtils.createColor(40, 85, 75),
      ColorUtils.createColor(50, 80, 80),
    ],
  },
  {
    name: 'Radioactive Yellow',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(60, 100, 50),
      ColorUtils.createColor(55, 95, 55),
      ColorUtils.createColor(50, 90, 60),
      ColorUtils.createColor(45, 85, 65),
      ColorUtils.createColor(40, 80, 70),
    ],
  },
  {
    name: 'Copper Wire',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(25, 80, 35),
      ColorUtils.createColor(30, 75, 40),
      ColorUtils.createColor(35, 70, 45),
      ColorUtils.createColor(40, 65, 50),
      ColorUtils.createColor(45, 60, 55),
    ],
  },
  {
    name: 'Neon Citrus',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(50, 100, 65),
      ColorUtils.createColor(45, 95, 60),
      ColorUtils.createColor(40, 90, 55),
      ColorUtils.createColor(35, 85, 50),
      ColorUtils.createColor(30, 80, 45),
    ],
  },
  {
    name: 'Digital Fire',
    type: 'curated',
    category: 'oranges',
    colors: [
      ColorUtils.createColor(15, 100, 45),
      ColorUtils.createColor(25, 95, 50),
      ColorUtils.createColor(35, 90, 55),
      ColorUtils.createColor(45, 85, 60),
      ColorUtils.createColor(55, 80, 65),
    ],
  },

  // Neutrals & Grays - 5 new
  {
    name: 'Cyber Steel',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(210, 15, 20),
      ColorUtils.createColor(215, 20, 35),
      ColorUtils.createColor(220, 25, 50),
      ColorUtils.createColor(225, 30, 65),
      ColorUtils.createColor(230, 35, 80),
    ],
  },
  {
    name: 'Moonstone',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(240, 10, 85),
      ColorUtils.createColor(235, 15, 75),
      ColorUtils.createColor(230, 20, 65),
      ColorUtils.createColor(225, 25, 55),
      ColorUtils.createColor(220, 30, 45),
    ],
  },
  {
    name: 'Digital Ash',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(0, 0, 25),
      ColorUtils.createColor(0, 0, 40),
      ColorUtils.createColor(0, 0, 55),
      ColorUtils.createColor(0, 0, 70),
      ColorUtils.createColor(0, 0, 85),
    ],
  },
  {
    name: 'Titanium Gradient',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(200, 5, 30),
      ColorUtils.createColor(210, 10, 45),
      ColorUtils.createColor(220, 15, 60),
      ColorUtils.createColor(230, 20, 75),
      ColorUtils.createColor(240, 25, 90),
    ],
  },
  {
    name: 'Obsidian Mirror',
    type: 'curated',
    category: 'neutrals',
    colors: [
      ColorUtils.createColor(240, 20, 15),
      ColorUtils.createColor(235, 15, 25),
      ColorUtils.createColor(230, 10, 35),
      ColorUtils.createColor(225, 5, 45),
      ColorUtils.createColor(220, 0, 55),
    ],
  },

  // Vibrant & Neon - 5 new
  {
    name: 'Rave Lights',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(300, 100, 50),
      ColorUtils.createColor(60, 100, 50),
      ColorUtils.createColor(180, 100, 50),
      ColorUtils.createColor(240, 100, 50),
      ColorUtils.createColor(0, 100, 50),
    ],
  },
  {
    name: 'Neon Genesis',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(320, 100, 45),
      ColorUtils.createColor(280, 100, 50),
      ColorUtils.createColor(200, 100, 55),
      ColorUtils.createColor(120, 100, 60),
      ColorUtils.createColor(40, 100, 65),
    ],
  },
  {
    name: 'Laser Tag',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(330, 100, 55),
      ColorUtils.createColor(270, 100, 60),
      ColorUtils.createColor(210, 100, 65),
      ColorUtils.createColor(150, 100, 70),
      ColorUtils.createColor(90, 100, 75),
    ],
  },
  {
    name: 'Quantum Leap',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(310, 100, 40),
      ColorUtils.createColor(190, 100, 45),
      ColorUtils.createColor(70, 100, 50),
      ColorUtils.createColor(250, 100, 55),
      ColorUtils.createColor(130, 100, 60),
    ],
  },
  {
    name: 'Neon Overdrive',
    type: 'curated',
    category: 'vibrant',
    colors: [
      ColorUtils.createColor(340, 100, 50),
      ColorUtils.createColor(280, 100, 55),
      ColorUtils.createColor(220, 100, 60),
      ColorUtils.createColor(160, 100, 65),
      ColorUtils.createColor(100, 100, 70),
    ],
  },
];

// Complementary Palettes - 30 new palettes with opposite color relationships
const complementaryPalettes: (Omit<ColorPalette, 'id' | 'createdAt'> & { category: string })[] = [
  {
    name: 'Fire & Ice',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(15, 100, 60),
      ColorUtils.createColor(25, 90, 65),
      ColorUtils.createColor(35, 80, 70),
      ColorUtils.createColor(200, 100, 60),
      ColorUtils.createColor(210, 90, 65),
    ],
  },
  {
    name: 'Sunset Ocean',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(30, 100, 65),
      ColorUtils.createColor(40, 95, 70),
      ColorUtils.createColor(50, 90, 75),
      ColorUtils.createColor(210, 100, 65),
      ColorUtils.createColor(220, 95, 70),
    ],
  },
  {
    name: 'Royal Gold',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(270, 100, 30),
      ColorUtils.createColor(280, 90, 40),
      ColorUtils.createColor(290, 80, 50),
      ColorUtils.createColor(50, 100, 70),
      ColorUtils.createColor(60, 90, 80),
    ],
  },
  {
    name: 'Forest Flame',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(120, 100, 30),
      ColorUtils.createColor(130, 90, 40),
      ColorUtils.createColor(140, 80, 50),
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(10, 90, 60),
    ],
  },
  {
    name: 'Electric Lime',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(80, 100, 60),
      ColorUtils.createColor(90, 95, 65),
      ColorUtils.createColor(100, 90, 70),
      ColorUtils.createColor(280, 100, 60),
      ColorUtils.createColor(290, 95, 65),
    ],
  },
  {
    name: 'Cyber Orange',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(20, 100, 60),
      ColorUtils.createColor(30, 95, 65),
      ColorUtils.createColor(40, 90, 70),
      ColorUtils.createColor(200, 100, 60),
      ColorUtils.createColor(210, 95, 65),
    ],
  },
  {
    name: 'Midnight Sun',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(240, 100, 20),
      ColorUtils.createColor(230, 90, 30),
      ColorUtils.createColor(220, 80, 40),
      ColorUtils.createColor(50, 100, 80),
      ColorUtils.createColor(60, 90, 85),
    ],
  },
  {
    name: 'Cherry Mint',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(350, 100, 50),
      ColorUtils.createColor(0, 95, 55),
      ColorUtils.createColor(10, 90, 60),
      ColorUtils.createColor(150, 100, 50),
      ColorUtils.createColor(160, 95, 55),
    ],
  },
  {
    name: 'Cosmic Copper',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(30, 80, 50),
      ColorUtils.createColor(35, 75, 55),
      ColorUtils.createColor(40, 70, 60),
      ColorUtils.createColor(210, 80, 50),
      ColorUtils.createColor(215, 75, 55),
    ],
  },
  {
    name: 'Neon Nights',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(320, 100, 60),
      ColorUtils.createColor(330, 95, 65),
      ColorUtils.createColor(340, 90, 70),
      ColorUtils.createColor(120, 100, 60),
      ColorUtils.createColor(130, 95, 65),
    ],
  },
  {
    name: 'Autumn Sky',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(25, 90, 65),
      ColorUtils.createColor(30, 85, 70),
      ColorUtils.createColor(35, 80, 75),
      ColorUtils.createColor(205, 90, 65),
      ColorUtils.createColor(210, 85, 70),
    ],
  },
  {
    name: 'Volcanic Ocean',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(15, 100, 45),
      ColorUtils.createColor(20, 95, 50),
      ColorUtils.createColor(25, 90, 55),
      ColorUtils.createColor(195, 100, 45),
      ColorUtils.createColor(200, 95, 50),
    ],
  },
  {
    name: 'Royal Sunset',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(270, 90, 35),
      ColorUtils.createColor(275, 85, 40),
      ColorUtils.createColor(280, 80, 45),
      ColorUtils.createColor(40, 90, 70),
      ColorUtils.createColor(45, 85, 75),
    ],
  },
  {
    name: 'Emerald Rose',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(150, 80, 40),
      ColorUtils.createColor(155, 75, 45),
      ColorUtils.createColor(160, 70, 50),
      ColorUtils.createColor(330, 80, 60),
      ColorUtils.createColor(335, 75, 65),
    ],
  },
  {
    name: 'Arctic Fire',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(190, 70, 85),
      ColorUtils.createColor(200, 75, 80),
      ColorUtils.createColor(210, 80, 75),
      ColorUtils.createColor(15, 100, 55),
      ColorUtils.createColor(20, 95, 60),
    ],
  },
  {
    name: 'Digital Nature',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(120, 100, 50),
      ColorUtils.createColor(125, 95, 55),
      ColorUtils.createColor(130, 90, 60),
      ColorUtils.createColor(320, 100, 50),
      ColorUtils.createColor(325, 95, 55),
    ],
  },
  {
    name: 'Golden Storm',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(50, 100, 70),
      ColorUtils.createColor(55, 95, 75),
      ColorUtils.createColor(60, 90, 80),
      ColorUtils.createColor(230, 100, 30),
      ColorUtils.createColor(235, 95, 35),
    ],
  },
  {
    name: 'Coral Reef',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(15, 85, 70),
      ColorUtils.createColor(20, 80, 75),
      ColorUtils.createColor(25, 75, 80),
      ColorUtils.createColor(195, 85, 70),
      ColorUtils.createColor(200, 80, 75),
    ],
  },
  {
    name: 'Electric Forest',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(100, 100, 50),
      ColorUtils.createColor(110, 95, 55),
      ColorUtils.createColor(120, 90, 60),
      ColorUtils.createColor(300, 100, 50),
      ColorUtils.createColor(310, 95, 55),
    ],
  },
  {
    name: 'Sunset Storm',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(30, 95, 60),
      ColorUtils.createColor(35, 90, 65),
      ColorUtils.createColor(40, 85, 70),
      ColorUtils.createColor(230, 95, 25),
      ColorUtils.createColor(235, 90, 30),
    ],
  },
  {
    name: 'Cyber Flame',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(180, 100, 60),
      ColorUtils.createColor(185, 95, 65),
      ColorUtils.createColor(190, 90, 70),
      ColorUtils.createColor(15, 100, 60),
      ColorUtils.createColor(20, 95, 65),
    ],
  },
  {
    name: 'Mystic Gold',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(270, 80, 30),
      ColorUtils.createColor(275, 75, 35),
      ColorUtils.createColor(280, 70, 40),
      ColorUtils.createColor(50, 100, 80),
      ColorUtils.createColor(55, 95, 85),
    ],
  },
  {
    name: 'Neon Jungle',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(110, 100, 55),
      ColorUtils.createColor(115, 95, 60),
      ColorUtils.createColor(120, 90, 65),
      ColorUtils.createColor(310, 100, 55),
      ColorUtils.createColor(315, 95, 60),
    ],
  },
  {
    name: 'Copper Sky',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(25, 70, 60),
      ColorUtils.createColor(30, 75, 65),
      ColorUtils.createColor(35, 80, 70),
      ColorUtils.createColor(205, 70, 75),
      ColorUtils.createColor(210, 75, 80),
    ],
  },
  {
    name: 'Laser Lime',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(90, 100, 60),
      ColorUtils.createColor(95, 95, 65),
      ColorUtils.createColor(100, 90, 70),
      ColorUtils.createColor(290, 100, 40),
      ColorUtils.createColor(295, 95, 45),
    ],
  },
  {
    name: 'Phoenix Ice',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(10, 100, 50),
      ColorUtils.createColor(15, 95, 55),
      ColorUtils.createColor(20, 90, 60),
      ColorUtils.createColor(190, 100, 70),
      ColorUtils.createColor(195, 95, 75),
    ],
  },
  {
    name: 'Royal Amber',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(270, 90, 25),
      ColorUtils.createColor(275, 85, 30),
      ColorUtils.createColor(280, 80, 35),
      ColorUtils.createColor(45, 100, 65),
      ColorUtils.createColor(50, 95, 70),
    ],
  },
  {
    name: 'Electric Ocean',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(200, 100, 70),
      ColorUtils.createColor(205, 95, 75),
      ColorUtils.createColor(210, 90, 80),
      ColorUtils.createColor(25, 100, 65),
      ColorUtils.createColor(30, 95, 70),
    ],
  },
  {
    name: 'Toxic Bloom',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(90, 100, 55),
      ColorUtils.createColor(95, 95, 60),
      ColorUtils.createColor(100, 90, 65),
      ColorUtils.createColor(330, 100, 55),
      ColorUtils.createColor(335, 95, 60),
    ],
  },
  {
    name: 'Cosmic Fire',
    type: 'curated',
    category: 'complementary',
    colors: [
      ColorUtils.createColor(230, 100, 20),
      ColorUtils.createColor(235, 95, 25),
      ColorUtils.createColor(240, 90, 30),
      ColorUtils.createColor(15, 100, 60),
      ColorUtils.createColor(20, 95, 65),
    ],
  },
];

// Holiday & Seasonal Palettes - 50 new palettes
const holidayPalettes: (Omit<ColorPalette, 'id' | 'createdAt'> & { category: string })[] = [
  // Christmas & Winter Holidays (8 palettes)
  {
    name: 'Classic Christmas',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 35),
      ColorUtils.createColor(130, 80, 40),
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(130, 80, 55),
      ColorUtils.createColor(0, 0, 95),
    ],
  },
  {
    name: 'Festive Red & Gold',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 40),
      ColorUtils.createColor(45, 100, 50),
      ColorUtils.createColor(45, 100, 65),
      ColorUtils.createColor(0, 100, 25),
      ColorUtils.createColor(45, 100, 35),
    ],
  },
  {
    name: 'Winter Elegance',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(220, 50, 90),
      ColorUtils.createColor(220, 30, 75),
      ColorUtils.createColor(220, 10, 95),
      ColorUtils.createColor(220, 40, 65),
      ColorUtils.createColor(0, 0, 30),
    ],
  },
  {
    name: 'Cozy Cabin Vibes',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(30, 60, 45),
      ColorUtils.createColor(15, 70, 50),
      ColorUtils.createColor(40, 50, 60),
      ColorUtils.createColor(0, 80, 45),
      ColorUtils.createColor(30, 40, 35),
    ],
  },
  {
    name: 'Frosty Snowflake',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(210, 100, 90),
      ColorUtils.createColor(200, 80, 80),
      ColorUtils.createColor(240, 100, 95),
      ColorUtils.createColor(200, 100, 70),
      ColorUtils.createColor(0, 0, 100),
    ],
  },
  {
    name: 'Candy Cane Sweet',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(350, 100, 50),
      ColorUtils.createColor(0, 100, 60),
      ColorUtils.createColor(350, 100, 65),
      ColorUtils.createColor(0, 0, 95),
      ColorUtils.createColor(0, 100, 35),
    ],
  },
  {
    name: 'Elegant Noir Gold',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 0, 15),
      ColorUtils.createColor(45, 100, 50),
      ColorUtils.createColor(0, 0, 30),
      ColorUtils.createColor(45, 100, 60),
      ColorUtils.createColor(0, 0, 5),
    ],
  },
  {
    name: 'Warm Fireplace',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(10, 90, 50),
      ColorUtils.createColor(30, 80, 55),
      ColorUtils.createColor(0, 100, 45),
      ColorUtils.createColor(40, 70, 65),
      ColorUtils.createColor(15, 85, 40),
    ],
  },

  // Halloween & Fall (6 palettes)
  {
    name: 'Classic Halloween',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(30, 100, 50),
      ColorUtils.createColor(0, 100, 30),
      ColorUtils.createColor(30, 100, 35),
      ColorUtils.createColor(0, 0, 20),
      ColorUtils.createColor(280, 80, 40),
    ],
  },
  {
    name: 'Spooky Purple',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(270, 100, 45),
      ColorUtils.createColor(120, 100, 40),
      ColorUtils.createColor(280, 80, 35),
      ColorUtils.createColor(130, 90, 50),
      ColorUtils.createColor(0, 0, 15),
    ],
  },
  {
    name: 'Autumn Leaves',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(10, 90, 45),
      ColorUtils.createColor(30, 85, 50),
      ColorUtils.createColor(20, 95, 40),
      ColorUtils.createColor(0, 100, 35),
      ColorUtils.createColor(40, 75, 55),
    ],
  },
  {
    name: 'Candy Corn Dreams',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(45, 100, 60),
      ColorUtils.createColor(30, 100, 50),
      ColorUtils.createColor(0, 100, 55),
      ColorUtils.createColor(45, 100, 45),
      ColorUtils.createColor(30, 100, 35),
    ],
  },
  {
    name: 'Dark Gothic',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(280, 60, 25),
      ColorUtils.createColor(0, 100, 25),
      ColorUtils.createColor(260, 50, 30),
      ColorUtils.createColor(0, 0, 10),
      ColorUtils.createColor(320, 70, 35),
    ],
  },
  {
    name: 'Pumpkin Patch',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(25, 100, 50),
      ColorUtils.createColor(15, 90, 45),
      ColorUtils.createColor(35, 85, 55),
      ColorUtils.createColor(120, 80, 45),
      ColorUtils.createColor(10, 95, 35),
    ],
  },

  // Thanksgiving (5 palettes)
  {
    name: 'Harvest Warm',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(20, 85, 50),
      ColorUtils.createColor(30, 80, 55),
      ColorUtils.createColor(45, 90, 60),
      ColorUtils.createColor(10, 75, 45),
      ColorUtils.createColor(0, 80, 40),
    ],
  },
  {
    name: 'Cornucopia Colors',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(15, 90, 50),
      ColorUtils.createColor(120, 70, 50),
      ColorUtils.createColor(30, 85, 55),
      ColorUtils.createColor(0, 100, 45),
      ColorUtils.createColor(45, 80, 60),
    ],
  },
  {
    name: 'Rustic Brown Tones',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(30, 50, 40),
      ColorUtils.createColor(20, 60, 45),
      ColorUtils.createColor(10, 55, 50),
      ColorUtils.createColor(35, 45, 55),
      ColorUtils.createColor(25, 70, 35),
    ],
  },
  {
    name: 'Grateful Golds',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(45, 100, 55),
      ColorUtils.createColor(40, 90, 60),
      ColorUtils.createColor(50, 95, 50),
      ColorUtils.createColor(35, 80, 65),
      ColorUtils.createColor(45, 100, 40),
    ],
  },
  {
    name: 'Earth Tones Grateful',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(30, 60, 45),
      ColorUtils.createColor(20, 70, 50),
      ColorUtils.createColor(120, 50, 45),
      ColorUtils.createColor(40, 65, 55),
      ColorUtils.createColor(15, 75, 40),
    ],
  },

  // Easter & Spring (6 palettes)
  {
    name: 'Pastel Easter Eggs',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(340, 60, 85),
      ColorUtils.createColor(280, 50, 80),
      ColorUtils.createColor(200, 40, 85),
      ColorUtils.createColor(120, 45, 80),
      ColorUtils.createColor(50, 50, 85),
    ],
  },
  {
    name: 'Spring Renewal',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(120, 70, 55),
      ColorUtils.createColor(100, 75, 60),
      ColorUtils.createColor(140, 65, 50),
      ColorUtils.createColor(80, 70, 65),
      ColorUtils.createColor(160, 60, 55),
    ],
  },
  {
    name: 'Soft Pink Easter',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(350, 55, 80),
      ColorUtils.createColor(330, 50, 85),
      ColorUtils.createColor(320, 45, 80),
      ColorUtils.createColor(0, 50, 85),
      ColorUtils.createColor(10, 45, 80),
    ],
  },
  {
    name: 'Tulip Garden',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(330, 80, 65),
      ColorUtils.createColor(15, 90, 60),
      ColorUtils.createColor(280, 70, 70),
      ColorUtils.createColor(120, 75, 60),
      ColorUtils.createColor(45, 85, 65),
    ],
  },
  {
    name: 'Bunny Pastels',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(350, 40, 90),
      ColorUtils.createColor(280, 35, 88),
      ColorUtils.createColor(200, 30, 92),
      ColorUtils.createColor(120, 35, 90),
      ColorUtils.createColor(80, 40, 88),
    ],
  },
  {
    name: 'Floral Spring',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(310, 60, 70),
      ColorUtils.createColor(30, 70, 70),
      ColorUtils.createColor(120, 65, 65),
      ColorUtils.createColor(200, 55, 75),
      ColorUtils.createColor(260, 50, 75),
    ],
  },

  // Valentine's Day (5 palettes)
  {
    name: 'Romantic Reds',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 40),
      ColorUtils.createColor(330, 90, 50),
      ColorUtils.createColor(0, 100, 55),
      ColorUtils.createColor(330, 80, 60),
      ColorUtils.createColor(0, 80, 30),
    ],
  },
  {
    name: 'Rose Gold Luxury',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(330, 70, 65),
      ColorUtils.createColor(45, 80, 70),
      ColorUtils.createColor(330, 60, 75),
      ColorUtils.createColor(0, 70, 60),
      ColorUtils.createColor(45, 85, 60),
    ],
  },
  {
    name: 'Playful Hearts',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(340, 85, 60),
      ColorUtils.createColor(350, 75, 70),
      ColorUtils.createColor(330, 80, 65),
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(350, 90, 55),
    ],
  },
  {
    name: 'Romantic Pastels',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(350, 40, 88),
      ColorUtils.createColor(10, 35, 90),
      ColorUtils.createColor(330, 30, 85),
      ColorUtils.createColor(280, 35, 87),
      ColorUtils.createColor(0, 45, 89),
    ],
  },
  {
    name: 'Dark Romance',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(330, 90, 35),
      ColorUtils.createColor(0, 100, 30),
      ColorUtils.createColor(270, 70, 40),
      ColorUtils.createColor(0, 80, 25),
      ColorUtils.createColor(330, 85, 45),
    ],
  },

  // New Year & Winter (4 palettes)
  {
    name: 'Midnight Glamour',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 0, 15),
      ColorUtils.createColor(200, 100, 85),
      ColorUtils.createColor(270, 80, 70),
      ColorUtils.createColor(0, 0, 20),
      ColorUtils.createColor(200, 100, 95),
    ],
  },
  {
    name: 'Champagne Celebration',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(45, 100, 60),
      ColorUtils.createColor(40, 90, 70),
      ColorUtils.createColor(50, 95, 50),
      ColorUtils.createColor(0, 0, 95),
      ColorUtils.createColor(45, 100, 45),
    ],
  },
  {
    name: 'Sparkle & Shine',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(300, 100, 70),
      ColorUtils.createColor(200, 100, 75),
      ColorUtils.createColor(45, 100, 70),
      ColorUtils.createColor(0, 0, 100),
      ColorUtils.createColor(270, 90, 65),
    ],
  },
  {
    name: 'Countdown Colors',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(120, 100, 50),
      ColorUtils.createColor(240, 100, 55),
      ColorUtils.createColor(60, 100, 55),
      ColorUtils.createColor(300, 100, 60),
    ],
  },

  // Independence Day & Patriotic (4 palettes)
  {
    name: 'Classic Patriotic',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 35),
      ColorUtils.createColor(210, 100, 40),
      ColorUtils.createColor(0, 0, 95),
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(210, 100, 55),
    ],
  },
  {
    name: 'Modern Flag',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 40),
      ColorUtils.createColor(210, 90, 50),
      ColorUtils.createColor(0, 0, 100),
      ColorUtils.createColor(0, 100, 55),
      ColorUtils.createColor(210, 100, 60),
    ],
  },
  {
    name: 'Fireworks Sky',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 45),
      ColorUtils.createColor(280, 100, 50),
      ColorUtils.createColor(210, 100, 50),
      ColorUtils.createColor(60, 100, 55),
      ColorUtils.createColor(320, 100, 55),
    ],
  },
  {
    name: 'Liberty Torch',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 50),
      ColorUtils.createColor(40, 100, 50),
      ColorUtils.createColor(210, 100, 45),
      ColorUtils.createColor(30, 90, 55),
      ColorUtils.createColor(0, 100, 35),
    ],
  },

  // St. Patrick's Day (3 palettes)
  {
    name: 'Lucky Greens',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(140, 80, 40),
      ColorUtils.createColor(120, 70, 35),
      ColorUtils.createColor(160, 75, 50),
      ColorUtils.createColor(100, 80, 45),
      ColorUtils.createColor(140, 85, 55),
    ],
  },
  {
    name: 'Leprechaun Gold',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(140, 70, 45),
      ColorUtils.createColor(45, 100, 60),
      ColorUtils.createColor(120, 80, 50),
      ColorUtils.createColor(50, 95, 50),
      ColorUtils.createColor(130, 75, 40),
    ],
  },
  {
    name: 'Irish Charm',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(150, 60, 50),
      ColorUtils.createColor(130, 80, 45),
      ColorUtils.createColor(45, 100, 55),
      ColorUtils.createColor(140, 70, 60),
      ColorUtils.createColor(0, 0, 20),
    ],
  },

  // Summer & Beach (5 palettes)
  {
    name: 'Tropical Sunset',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(15, 95, 55),
      ColorUtils.createColor(30, 100, 50),
      ColorUtils.createColor(200, 80, 60),
      ColorUtils.createColor(250, 70, 65),
      ColorUtils.createColor(280, 60, 70),
    ],
  },
  {
    name: 'Beach Sand & Sea',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(40, 70, 70),
      ColorUtils.createColor(200, 60, 70),
      ColorUtils.createColor(180, 50, 75),
      ColorUtils.createColor(45, 65, 75),
      ColorUtils.createColor(210, 70, 60),
    ],
  },
  {
    name: 'Ice Cream Colors',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(30, 100, 70),
      ColorUtils.createColor(350, 70, 75),
      ColorUtils.createColor(220, 90, 80),
      ColorUtils.createColor(280, 70, 75),
      ColorUtils.createColor(120, 80, 75),
    ],
  },
  {
    name: 'BBQ Vibes',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(15, 90, 55),
      ColorUtils.createColor(30, 85, 50),
      ColorUtils.createColor(120, 60, 55),
      ColorUtils.createColor(0, 80, 45),
      ColorUtils.createColor(210, 70, 65),
    ],
  },
  {
    name: 'Poolside Party',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(200, 100, 70),
      ColorUtils.createColor(280, 90, 75),
      ColorUtils.createColor(50, 100, 70),
      ColorUtils.createColor(320, 100, 75),
      ColorUtils.createColor(180, 80, 65),
    ],
  },

  // General Seasonal (3 palettes)
  {
    name: 'Spring Energy',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(120, 75, 55),
      ColorUtils.createColor(80, 70, 60),
      ColorUtils.createColor(160, 65, 50),
      ColorUtils.createColor(100, 80, 65),
      ColorUtils.createColor(45, 85, 70),
    ],
  },
  {
    name: 'Summer Heat',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(0, 100, 55),
      ColorUtils.createColor(30, 100, 60),
      ColorUtils.createColor(45, 95, 55),
      ColorUtils.createColor(60, 100, 50),
      ColorUtils.createColor(15, 90, 65),
    ],
  },
  {
    name: 'Autumn Vibes',
    type: 'curated',
    category: 'holidays',
    colors: [
      ColorUtils.createColor(20, 85, 50),
      ColorUtils.createColor(30, 80, 55),
      ColorUtils.createColor(10, 90, 45),
      ColorUtils.createColor(140, 60, 50),
      ColorUtils.createColor(0, 100, 35),
    ],
  },
];

// Merge all palettes
const allPalettes = [...curatedPalettes, ...complementaryPalettes, ...holidayPalettes];

export const CuratedPalettes: React.FC<CuratedPalettesProps> = ({
  onPaletteSelect,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxPalette, setLightboxPalette] = React.useState<ColorPalette | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  
  const filteredPalettes = selectedCategory === 'all' 
    ? allPalettes 
    : allPalettes.filter(palette => {
        if (selectedCategory === 'blues') return palette.category === 'blues' || palette.category === 'teals';
        if (selectedCategory === 'greens') return palette.category === 'greens' || palette.category === 'nature';
        if (selectedCategory === 'reds') return palette.category === 'reds' || palette.category === 'pinks';
        if (selectedCategory === 'purples') return palette.category === 'purples' || palette.category === 'violets';
        if (selectedCategory === 'oranges') return palette.category === 'oranges' || palette.category === 'yellows';
        if (selectedCategory === 'neutrals') return palette.category === 'neutrals' || palette.category === 'grays';
        if (selectedCategory === 'vibrant') return palette.category === 'vibrant' || palette.category === 'neon';
        return palette.category === selectedCategory;
      });

  const handlePaletteSelect = (palette: Omit<ColorPalette, 'id' | 'createdAt'>) => {
    const fullPalette: ColorPalette = {
      ...palette,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    onPaletteSelect(fullPalette);
  };

  const openLightbox = (palette: Omit<ColorPalette, 'id' | 'createdAt'>) => {
    const fullPalette: ColorPalette = {
      ...palette,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setLightboxPalette(fullPalette);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxPalette(null);
  };

  return (
    <>
      <div className={`${className}`}>
        {/* Category Pills */}
        <div className="mb-14">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'ring-4 ring-white/50 scale-105'
                    : 'hover:ring-2 hover:ring-white/30'
                } ${category.textColor}`}
                style={{
                  background: category.color,
                  boxShadow: selectedCategory === category.id
                    ? '0 10px 25px rgba(0,0,0,0.2)'
                    : '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                {category.name}
                <span className="ml-2 opacity-75">
                  ({category.id === 'all' ? allPalettes.length : (() => {
                    const count = allPalettes.filter(palette => {
                      if (category.id === 'blues') return palette.category === 'blues' || palette.category === 'teals';
                      if (category.id === 'greens') return palette.category === 'greens' || palette.category === 'nature';
                      if (category.id === 'reds') return palette.category === 'reds' || palette.category === 'pinks';
                      if (category.id === 'purples') return palette.category === 'purples' || palette.category === 'violets';
                      if (category.id === 'oranges') return palette.category === 'oranges' || palette.category === 'yellows';
                      if (category.id === 'neutrals') return palette.category === 'neutrals' || palette.category === 'grays';
                      if (category.id === 'vibrant') return palette.category === 'vibrant' || palette.category === 'neon';
                      if (category.id === 'pastels') return palette.category === 'pastels';
                      if (category.id === 'complementary') return palette.category === 'complementary';
                      if (category.id === 'holidays') return palette.category === 'holidays';
                      return false;
                    }).length;
                    return count;
                  })()})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Palettes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPalettes.map((palette, index) => (
            <Card key={index} className="overflow-hidden bg-white/90 backdrop-blur-xl border-white/20 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 group transform hover:scale-[1.02]">
              <div 
                className="flex h-24 cursor-pointer relative overflow-hidden"
                onClick={() => openLightbox(palette)}
              >
                {palette.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="flex-1 transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-white/80" />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/50 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{palette.name}</h4>
                    <p className="text-sm text-gray-500">{palette.colors.length} colors</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span 
                      className="text-xs px-2 py-1 rounded-full text-white font-medium shadow-sm"
                      style={{ 
                        background: categories.find(c => c.id === palette.category)?.color || '#666'
                      }}
                    >
                      {categories.find(c => c.id === palette.category)?.name.split(' ')[0] || 'Curated'}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePaletteSelect(palette);
                  }}
                  className="w-full hover:bg-blue-50/80 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 bg-white/60 backdrop-blur-sm border-white/40"
                >
                  Use This Palette
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredPalettes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100/50 to-gray-200/50 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg shadow-black/5">
              <Sparkles className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Palettes Found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
      
      {lightboxPalette && (
        <PaletteLightbox
          palette={lightboxPalette}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </>
  );
};