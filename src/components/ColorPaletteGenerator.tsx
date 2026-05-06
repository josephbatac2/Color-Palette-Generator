import React, { useState } from 'react';
import { ColorHarmony } from '../types/color';
import { ColorUtils } from '../utils/colorUtils';
import { useColorPalette } from '../hooks/useColorPalette';
import { useTheme } from '../contexts/ThemeContext';
import { StableColorPicker } from './ui/stable-color-picker';
import { HarmonySelector } from './ui/harmony-selector';
import { PaletteDisplay } from './ui/palette-display';
import { AccessibilityChecker } from './ui/accessibility-checker';
import { ColorBlindnessSimulator } from './ui/color-blindness-simulator';
import { CuratedPalettes } from './ui/curated-palettes';
import { Footer } from './ui/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ColorValuesCard } from './ui/color-values-card';
import { Palette, Wand2, Save, Eye, Shield, Sparkles, Sun, Moon } from 'lucide-react';

export const ColorPaletteGenerator: React.FC = () => {
  const {
    currentPalette,
    savedPalettes,
    baseColor,
    generatePalette,
    savePalette,
    deletePalette,
    updateBaseColor,
    loadPalette,
    isSaving,
    isCurrentPaletteSaved,
  } = useColorPalette();

  const { theme, toggleTheme } = useTheme();
  const [selectedHarmony, setSelectedHarmony] = useState<ColorHarmony>('analogous');
  const [activeTab, setActiveTab] = useState<string>('curated');

  const handleGeneratePalette = () => {
    const palette = generatePalette(selectedHarmony);
    return palette;
  };

  const handleSavePalette = async () => {
    if (currentPalette) {
      await savePalette(currentPalette);
    }
  };

  const handlePaletteSelect = (palette: ColorPalette) => {
    loadPalette(palette);
    setActiveTab('generator');
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900' : 'bg-gradient-to-br from-teal-50 via-sky-50 to-amber-50'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-400/25 to-emerald-400/25' : 'bg-gradient-to-br from-teal-200/50 to-emerald-200/50'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-rose-400/20 to-amber-400/20' : 'bg-gradient-to-br from-rose-200/50 to-amber-200/50'}`}></div>
        <div className={`absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-sky-400/15 to-cyan-400/15' : 'bg-gradient-to-br from-sky-200/40 to-cyan-200/40'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse ${theme === 'dark' ? 'bg-gradient-to-br from-amber-400/10 to-orange-400/10' : 'bg-gradient-to-br from-amber-200/35 to-orange-200/35'}`}></div>
      </div>

      {/* Header */}
      <header className={`backdrop-blur-xl sticky top-0 z-20 shadow-lg ${theme === 'dark' ? 'border-b border-white/10 bg-slate-950/80 shadow-black/30' : 'border-b border-gray-200 bg-white/70 shadow-gray-200/50'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <a href="/" title="Color Palette Generator" className="flex items-center gap-3 flex-shrink-0 group">
              <div className={`p-1.5 rounded-xl shadow-lg transition-transform group-hover:scale-105 ${theme === 'dark' ? 'bg-white/10' : 'bg-white border border-gray-200'}`}>
                <img src="/logo.png" alt="Color Palette Generator" className="w-12 h-12 rounded-lg" />
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl font-bold leading-tight block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color Palette</span>
                <span className={`text-xs font-medium leading-tight block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Generator</span>
              </div>
            </a>

            {/* Navigation - Right */}
            <nav className="flex items-center gap-1">
              <TabsList className={`h-11 gap-0.5 rounded-xl px-1 ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'}`}>
                <TabsTrigger value="curated" className={`flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium ${theme === 'dark' ? 'text-gray-300 data-[state=active]:text-white hover:text-gray-100' : 'text-gray-600 data-[state=active]:text-white hover:text-gray-800'}`}>
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden md:inline">Curated</span>
                </TabsTrigger>
                <TabsTrigger value="generator" className={`flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium ${theme === 'dark' ? 'text-gray-300 data-[state=active]:text-white hover:text-gray-100' : 'text-gray-600 data-[state=active]:text-white hover:text-gray-800'}`}>
                  <Palette className="w-4 h-4" />
                  <span className="hidden md:inline">Generator</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className={`flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium ${theme === 'dark' ? 'text-gray-300 data-[state=active]:text-white hover:text-gray-100' : 'text-gray-600 data-[state=active]:text-white hover:text-gray-800'}`}>
                  <Save className="w-4 h-4" />
                  <span className="hidden md:inline">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="accessibility" className={`flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium ${theme === 'dark' ? 'text-gray-300 data-[state=active]:text-white hover:text-gray-100' : 'text-gray-600 data-[state=active]:text-white hover:text-gray-800'}`}>
                  <Shield className="w-4 h-4" />
                  <span className="hidden md:inline">A11y</span>
                </TabsTrigger>
                <TabsTrigger value="simulator" className={`flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium ${theme === 'dark' ? 'text-gray-300 data-[state=active]:text-white hover:text-gray-100' : 'text-gray-600 data-[state=active]:text-white hover:text-gray-800'}`}>
                  <Eye className="w-4 h-4" />
                  <span className="hidden md:inline">Vision</span>
                </TabsTrigger>
              </TabsList>

              {/* Theme Toggle in Header */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className={`w-11 h-11 rounded-xl transition-all flex-shrink-0 ${theme === 'dark' ? 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:text-white' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-6 py-8 relative z-10">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">

          <TabsContent value="curated" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Curated Palettes</h2>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Professionally designed color combinations ready to use</p>
            </div>
            <CuratedPalettes
              onPaletteSelect={handlePaletteSelect}
              className="mx-auto max-w-6xl"
            />
          </TabsContent>

          <TabsContent value="generator" className="space-y-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Input Controls */}
              <div className="space-y-6">
                {/* Step 1: Choose Harmony */}
                <div className={`p-6 rounded-xl backdrop-blur-xl border ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>1</span>
                    <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Choose Color Harmony</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'monochromatic', label: 'Monochromatic' },
                      { value: 'analogous', label: 'Analogous' },
                      { value: 'complementary', label: 'Complementary' },
                      { value: 'triadic', label: 'Triadic' },
                      { value: 'tetradic', label: 'Tetradic' },
                      { value: 'split-complementary', label: 'Split Comp.' },
                    ].map((harmony) => (
                      <Button
                        key={harmony.value}
                        variant={selectedHarmony === harmony.value ? 'default' : 'outline'}
                        onClick={() => setSelectedHarmony(harmony.value as ColorHarmony)}
                        className={`h-12 text-sm font-medium ${
                          selectedHarmony === harmony.value
                            ? ''
                            : theme === 'dark'
                              ? 'border-gray-600 bg-gray-800/60 text-gray-200 hover:bg-gray-700/80 hover:border-gray-500 hover:text-white'
                              : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {harmony.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Pick Base Color */}
                <div className={`rounded-xl backdrop-blur-xl border ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-2 px-6 pt-6">
                    <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>2</span>
                    <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Pick Base Color</h3>
                  </div>
                  <StableColorPicker
                    color={baseColor}
                    onChange={updateBaseColor}
                  />
                </div>

                {/* Step 3: Generate Button */}
                <Button
                  onClick={handleGeneratePalette}
                  size="lg"
                  className={`w-full py-6 text-lg font-semibold ${
                    !selectedHarmony
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={!selectedHarmony}
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  {selectedHarmony ? 'Generate Palette' : 'Select Harmony First'}
                </Button>
              </div>

              {/* Right Column: Generated Palette */}
              <div className="space-y-4 flex flex-col">
                {currentPalette ? (
                  <>
                    <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Your Generated Palette</h3>
                    <PaletteDisplay
                      palette={currentPalette}
                      onSave={savePalette}
                      isSaving={isSaving}
                      isAlreadySaved={isCurrentPaletteSaved}
                      showActions={true}
                    />
                    <ColorValuesCard colors={currentPalette.colors} />
                  </>
                ) : (
                  <div className={`p-12 text-center rounded-xl backdrop-blur-xl flex-1 flex flex-col items-center justify-center border ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-gray-100'}`}>
                      <Palette className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} aria-hidden="true" />
                    </div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Ready to Generate</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Select a harmony and color to create your palette
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Saved Palettes</h2>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Your personal collection of color palettes</p>
            </div>
            
            {savedPalettes.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedPalettes.map((palette) => (
                  <PaletteDisplay
                    key={palette.id}
                    palette={palette}
                    onDelete={deletePalette}
                    showActions={true}
                  />
                ))}
              </div>
            ) : (
              <Card className={`p-16 text-center backdrop-blur-xl shadow-xl ${theme === 'dark' ? 'bg-white/10 border-white/20 shadow-black/20' : 'bg-white border-gray-200 shadow-gray-200'}`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-white/10 to-white/20' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                  <Save className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Saved Palettes</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Generate and save palettes to build your personal collection
                </p>
                <Button
                  onClick={() => setActiveTab('generator')}
                  variant="outline"
                  className={`shadow-lg ${theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white shadow-black/20' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-900 shadow-gray-200'}`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Create Palette
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Accessibility Report</h2>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Check WCAG compliance and contrast ratios</p>
            </div>
            
            {currentPalette ? (
              <AccessibilityChecker
                colors={currentPalette.colors}
                className="mx-auto max-w-4xl"
              />
            ) : (
              <Card className={`p-16 text-center backdrop-blur-xl shadow-xl ${theme === 'dark' ? 'bg-white/10 border-white/20 shadow-black/20' : 'bg-white border-gray-200 shadow-gray-200'}`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-white/10 to-white/20' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                  <Shield className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Palette Selected</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Generate or select a palette to check its accessibility compliance
                </p>
                <Button
                  onClick={() => setActiveTab('generator')}
                  variant="outline"
                  className={`shadow-lg ${theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white shadow-black/20' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-900 shadow-gray-200'}`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Generate Palette
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color Vision Simulator</h2>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>See how your palette appears to people with different types of color vision</p>
            </div>
            
            {currentPalette ? (
              <ColorBlindnessSimulator
                colors={currentPalette.colors}
                className="mx-auto max-w-4xl"
              />
            ) : (
              <Card className={`p-16 text-center backdrop-blur-xl shadow-xl ${theme === 'dark' ? 'bg-white/10 border-white/20 shadow-black/20' : 'bg-white border-gray-200 shadow-gray-200'}`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-white/10 to-white/20' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                  <Eye className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Palette Selected</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Generate or select a palette to simulate different types of color vision
                </p>
                <Button
                  onClick={() => setActiveTab('generator')}
                  variant="outline"
                  className={`shadow-lg ${theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white shadow-black/20' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-900 shadow-gray-200'}`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Generate Palette
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer variant="full" className="mt-16" />
    </div>
  );
};