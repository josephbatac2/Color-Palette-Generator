import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Palette, Sparkles, Eye, Shield, Download, ArrowRight, Play, Zap, Heart, Github, Sun, Moon, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Footer } from './ui/footer';
import { useTheme } from '../contexts/ThemeContext';
import { HARMONY_TYPES, calculateStats } from '../constants/colorData';
import { ColorUtils } from '../utils/colorUtils';
import { ColorPalette } from '../types/color';
import { PaletteLightbox } from './ui/palette-lightbox';

interface LandingPageProps {
  onGetStarted: () => void;
}

const PALETTE_BANDS = {
  top: [
    ['#0f766e', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'],
    ['#1e3a5f', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
    ['#7c2d12', '#c2410c', '#ea580c', '#f97316', '#fb923c'],
    ['#14532d', '#15803d', '#22c55e', '#4ade80', '#86efac'],
    ['#581c87', '#7e22ce', '#a855f7', '#c084fc', '#d8b4fe'],
    ['#7f1d1d', '#b91c1c', '#ef4444', '#f87171', '#fca5a5'],
  ],
  mid: [
    ['#0c4a6e', '#0369a1', '#0ea5e9', '#38bdf8', '#7dd3fc'],
    ['#134e4a', '#0f766e', '#14b8a6', '#5eead4', '#ccfbf1'],
    ['#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa', '#c4b5fd'],
    ['#065f46', '#047857', '#10b981', '#34d399', '#6ee7b7'],
    ['#92400e', '#b45309', '#d97706', '#f59e0b', '#fbbf24'],
    ['#831843', '#be185d', '#ec4899', '#f472b6', '#fbcfe8'],
  ],
  bottom: [
    ['#1c1917', '#292524', '#44403c', '#78716c', '#a8a29e'],
    ['#0f172a', '#1e293b', '#334155', '#64748b', '#94a3b8'],
    ['#18181b', '#27272a', '#3f3f46', '#71717a', '#a1a1aa'],
    ['#171717', '#262626', '#404040', '#525252', '#737373'],
    ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560'],
    ['#0d1117', '#161b22', '#21262d', '#30363d', '#484f58'],
  ],
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxPalette, setLightboxPalette] = useState<ColorPalette | null>(null);
  const { theme, toggleTheme } = useTheme();

  const [bandIndices, setBandIndices] = useState({ top: 0, mid: 0, bottom: 0 });
  const [transitioning, setTransitioning] = useState({ top: false, mid: false, bottom: false });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setTransitioning(t => ({ ...t, top: true }));
        setTimeout(() => {
          setBandIndices(b => ({ ...b, top: (b.top + 1) % PALETTE_BANDS.top.length }));
          setTransitioning(t => ({ ...t, top: false }));
        }, 600);
      }, 4000),
      setInterval(() => {
        setTransitioning(t => ({ ...t, mid: true }));
        setTimeout(() => {
          setBandIndices(b => ({ ...b, mid: (b.mid + 1) % PALETTE_BANDS.mid.length }));
          setTransitioning(t => ({ ...t, mid: false }));
        }, 600);
      }, 5500),
      setInterval(() => {
        setTransitioning(t => ({ ...t, bottom: true }));
        setTimeout(() => {
          setBandIndices(b => ({ ...b, bottom: (b.bottom + 1) % PALETTE_BANDS.bottom.length }));
          setTransitioning(t => ({ ...t, bottom: false }));
        }, 600);
      }, 7000),
    ];
    return () => intervals.forEach(clearInterval);
  }, []);

  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: `${HARMONY_TYPES.length} Harmony Types`,
      description: "Advanced color theory algorithms for perfect palettes",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "470 Curated Palettes",
      description: "Professional color combinations across 20+ categories",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "WCAG Compliance",
      description: "Accessibility checker with contrast ratio analysis",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Color Blindness Simulator",
      description: "Test your palettes for inclusive design",
    },
  ];

  const showcasePalettes = useMemo(() => {
    const allShowcase = [
      { name: 'Ocean Breeze', colors: [ColorUtils.createColor(195, 100, 85), ColorUtils.createColor(200, 85, 70), ColorUtils.createColor(210, 70, 55), ColorUtils.createColor(220, 55, 40), ColorUtils.createColor(230, 40, 25)] },
      { name: 'Neon Jungle', colors: [ColorUtils.createColor(120, 100, 40), ColorUtils.createColor(125, 95, 45), ColorUtils.createColor(130, 90, 50), ColorUtils.createColor(135, 85, 55), ColorUtils.createColor(140, 80, 60)] },
      { name: 'Cosmic Nebula', colors: [ColorUtils.createColor(220, 95, 15), ColorUtils.createColor(240, 85, 25), ColorUtils.createColor(260, 75, 35), ColorUtils.createColor(280, 65, 45), ColorUtils.createColor(300, 55, 55)] },
      { name: 'Sunset Glow', colors: [ColorUtils.createColor(15, 90, 55), ColorUtils.createColor(25, 95, 60), ColorUtils.createColor(35, 100, 65), ColorUtils.createColor(45, 95, 70), ColorUtils.createColor(55, 85, 75)] },
      { name: 'Arctic Ice', colors: [ColorUtils.createColor(200, 30, 92), ColorUtils.createColor(205, 35, 85), ColorUtils.createColor(210, 40, 78), ColorUtils.createColor(215, 45, 71), ColorUtils.createColor(220, 50, 64)] },
      { name: 'Cherry Blossom', colors: [ColorUtils.createColor(340, 80, 88), ColorUtils.createColor(345, 70, 78), ColorUtils.createColor(350, 60, 68), ColorUtils.createColor(355, 50, 58), ColorUtils.createColor(0, 40, 48)] },
      { name: 'Digital Ocean', colors: [ColorUtils.createColor(190, 80, 25), ColorUtils.createColor(200, 85, 35), ColorUtils.createColor(210, 90, 45), ColorUtils.createColor(220, 95, 55), ColorUtils.createColor(230, 100, 65)] },
      { name: 'Jade Empire', colors: [ColorUtils.createColor(160, 70, 30), ColorUtils.createColor(155, 75, 40), ColorUtils.createColor(150, 80, 50), ColorUtils.createColor(145, 85, 60), ColorUtils.createColor(140, 90, 70)] },
      { name: 'Electric Blue', colors: [ColorUtils.createColor(210, 100, 40), ColorUtils.createColor(215, 95, 50), ColorUtils.createColor(220, 90, 60), ColorUtils.createColor(225, 85, 70), ColorUtils.createColor(230, 80, 80)] },
      { name: 'Desert Sand', colors: [ColorUtils.createColor(35, 50, 85), ColorUtils.createColor(30, 55, 70), ColorUtils.createColor(25, 60, 55), ColorUtils.createColor(20, 65, 40), ColorUtils.createColor(15, 70, 25)] },
      { name: 'Matrix Code', colors: [ColorUtils.createColor(120, 100, 25), ColorUtils.createColor(125, 90, 35), ColorUtils.createColor(130, 80, 45), ColorUtils.createColor(135, 70, 55), ColorUtils.createColor(140, 60, 65)] },
      { name: 'Toxic Waste', colors: [ColorUtils.createColor(80, 100, 45), ColorUtils.createColor(90, 95, 50), ColorUtils.createColor(100, 90, 55), ColorUtils.createColor(110, 85, 60), ColorUtils.createColor(120, 80, 65)] },
    ];
    const shuffled = [...allShowcase].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  const stats = calculateStats();

  const openLightbox = useCallback((palette: { name: string; colors: typeof showcasePalettes[0]['colors'] }) => {
    setLightboxPalette({
      id: crypto.randomUUID(),
      name: palette.name,
      colors: palette.colors,
      type: 'curated',
      createdAt: new Date(),
    });
  }, []);

  const renderPaletteBand = (band: 'top' | 'mid' | 'bottom', direction: 'left' | 'right') => {
    const colors = PALETTE_BANDS[band][bandIndices[band]];
    const isExiting = transitioning[band];

    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className={`absolute inset-0 flex transition-all duration-700 ease-in-out ${
            isExiting
              ? direction === 'left'
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
          }`}
        >
          {colors.map((color, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="main-content" className="relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className={`w-12 h-12 rounded-full shadow-lg transition-all ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-500 text-white hover:bg-gray-600'
              : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
          }`}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Hero Section with 3 palette bands */}
      <section className="relative w-full min-h-screen flex items-center justify-center">
        {/* Top palette band */}
        <div className="absolute top-0 left-0 right-0 h-[30%]">
          {renderPaletteBand('top', 'left')}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Middle palette band */}
        <div className="absolute top-[28%] left-0 right-0 h-[44%]">
          {renderPaletteBand('mid', 'right')}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Bottom palette band */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%]">
          {renderPaletteBand('bottom', 'left')}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        </div>

        {/* Full overlay for readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" aria-hidden="true" />

        {/* Content */}
        <div
          className={`relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000`}
        >
          {/* Logo + brand */}
          <a
            href="/"
            title="Color Palette Generator"
            className="inline-flex items-center gap-3 mb-8 px-5 py-3 bg-white/10 border border-white/20 rounded-2xl shadow-xl backdrop-blur-xl hover:bg-white/15 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-2xl"
          >
            <img src="/logo.png" alt="" className="w-10 h-10 rounded-lg shadow-lg" />
            <span className="text-lg font-medium text-white tracking-wide">Color Palette Generator</span>
          </a>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white mb-5 tracking-tight">
            Create{' '}
            <span className="font-bold bg-gradient-to-r from-green-300 via-lime-300 to-emerald-300 bg-clip-text text-transparent">
              stunning
            </span>{' '}
            <span className="multicolor-underline">color palettes</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200 mb-8 max-w-lg">
            Craft palettes that feel right with smart color harmonies, check contrast for every audience,
            and preview how your work looks through different eyes. Made for the people who care about color.
          </p>

          {/* Attribution + GitHub */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <p className="text-sm text-gray-300">
              An open-source contribution by{' '}
              <a
                href="https://kulay.ca/?=colourpalettes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 hover:text-green-200 underline underline-offset-2 transition-colors font-medium"
              >
                Kulay Canada
              </a>
            </p>
            <a
              href="https://github.com/josephbatac2/Color-Palette-Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="View source on GitHub"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              /Color-Palette-Generator
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button
              onClick={onGetStarted}
              size="xlg"
              className="relative px-10 py-6 text-lg font-bold bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 hover:from-green-400 hover:via-lime-400 hover:to-emerald-400 shadow-2xl shadow-green-500/50 hover:shadow-green-400/60 transform hover:scale-[1.05] transition-all duration-300 animate-pulse-glow group overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
              <Wand2 className="w-5 h-5 mr-2 relative z-10" aria-hidden="true" />
              <span className="relative z-10">Generate Your Palette</span>
              <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>

          {/* Hero Stats */}
          <div className="w-full max-w-xl grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-3 py-4 bg-white/10 border border-white/15 rounded-xl backdrop-blur-xl"
              >
                <span className="text-2xl md:text-3xl font-bold text-white">{stat.number}</span>
                <span className="text-[11px] md:text-xs text-gray-300 mt-1 leading-tight text-center">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Band rotation indicator */}
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <span>Palettes shift every few seconds</span>
            <div className="flex gap-1.5">
              {['top', 'mid', 'bottom'].map((band) => (
                <div key={band} className="flex gap-0.5">
                  {PALETTE_BANDS[band as keyof typeof PALETTE_BANDS][bandIndices[band as keyof typeof bandIndices]].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: PALETTE_BANDS[band as keyof typeof PALETTE_BANDS][bandIndices[band as keyof typeof bandIndices]][i] }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce" aria-hidden="true">
          <div className="w-px h-8 bg-white/40 rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </section>

      {/* Showcase Palettes Section */}
      <section className={`relative z-10 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'}`}>
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Explore Curated{' '}
              <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                Palettes
              </span>
            </h2>
            <p className={`text-base md:text-lg max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Hand-picked color combinations from our library of 470+ professional palettes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {showcasePalettes.map((palette, index) => (
              <div
                key={index}
                onClick={() => openLightbox(palette)}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:shadow-green-500/10'
                    : 'bg-white border border-gray-200 hover:shadow-green-500/10'
                }`}
              >
                <div className="flex h-24">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="flex-1 transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <div className={`px-4 py-3 flex items-center justify-between ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{palette.name}</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{palette.colors.length} colors</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="px-10 py-4 text-base font-semibold bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
              Browse All Palettes
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`relative z-10 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'}`}>
        <div className="container mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                Modern Design
              </span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Everything you need to create accessible, beautiful color palettes for your projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:shadow-green-500/20'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-green-500/10'
                }`}
              >
                <div className={`p-3 rounded-xl w-fit mb-4 ${theme === 'dark' ? 'bg-gradient-to-br from-green-500/20 to-lime-600/20 border border-white/10' : 'bg-gradient-to-br from-green-100 to-lime-100 border border-gray-200'}`}>
                  <div className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900 to-gray-800 border-y border-gray-700">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">How It Works</h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-200">
              Create professional color palettes in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Choose Harmony',
                description: `Select from ${HARMONY_TYPES.length} color harmony types based on color theory`,
                icon: <Palette className="w-8 h-8" />,
              },
              {
                step: '02',
                title: 'Pick Base Color',
                description: 'Use our intuitive color picker to select your starting color',
                icon: <Zap className="w-8 h-8" />,
              },
              {
                step: '03',
                title: 'Generate & Export',
                description: 'Get your palette and export in multiple formats',
                icon: <Download className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-lime-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/25">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6 py-16 md:py-32">
          <div className="text-center backdrop-blur-xl rounded-3xl p-6 md:p-16 shadow-2xl bg-gradient-to-r from-green-600/20 to-lime-600/20 border border-white/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              Ready to Create Amazing
              <br />
              <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                Color Palettes?
              </span>
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-gray-300">
              Join thousands of designers and developers who trust our color palette generator
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="w-full md:w-auto px-6 md:px-12 py-4 md:py-6 text-base md:text-xl bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              Start Creating Now
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
            </Button>
          </div>
        </div>
      </section>

      <Footer variant="full" />

      {lightboxPalette && (
        <PaletteLightbox
          palette={lightboxPalette}
          isOpen={!!lightboxPalette}
          onClose={() => setLightboxPalette(null)}
        />
      )}
    </div>
  );
};
