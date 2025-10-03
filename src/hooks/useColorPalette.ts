import { useState, useCallback } from 'react';
import { Color, ColorPalette, ColorHarmony } from '../types/color';
import { ColorUtils } from '../utils/colorUtils';

export const useColorPalette = () => {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [baseColor, setBaseColor] = useState<Color>(ColorUtils.createColor(220, 70, 50));
  const [isSaving, setIsSaving] = useState(false);

  const generatePalette = useCallback((harmony: ColorHarmony, name?: string) => {
    const colors = ColorUtils.generateHarmony(baseColor, harmony);
    const palette: ColorPalette = {
      id: crypto.randomUUID(),
      name: name || `${harmony} palette`,
      colors,
      type: 'generated',
      harmony,
      createdAt: new Date(),
    };
    
    setCurrentPalette(palette);
    return palette;
  }, [baseColor]);

  const savePalette = useCallback(async (palette: ColorPalette) => {
    setIsSaving(true);
    
    // Check if palette is already saved
    const isAlreadySaved = savedPalettes.some(p => p.id === palette.id);
    if (isAlreadySaved) {
      setIsSaving(false);
      return;
    }
    
    // Simulate async save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavedPalettes(prev => [...prev, palette]);
    setIsSaving(false);
  }, []);

  const deletePalette = useCallback((id: string) => {
    setSavedPalettes(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateBaseColor = useCallback((color: Color) => {
    console.log('Updating base color:', color); // Debug log
    setBaseColor(color);
    
    // If there's a current palette, regenerate it with the new base color
    if (currentPalette && currentPalette.harmony) {
      const colors = ColorUtils.generateHarmony(color, currentPalette.harmony);
      const updatedPalette: ColorPalette = {
        ...currentPalette,
        colors,
        createdAt: new Date(),
      };
      setCurrentPalette(updatedPalette);
    }
  }, [currentPalette]);

  const loadPalette = useCallback((palette: ColorPalette) => {
    setCurrentPalette(palette);
    if (palette.colors.length > 0) {
      setBaseColor(palette.colors[0]);
    }
  }, []);

  const isPaletteSaved = useCallback((paletteId: string) => {
    return savedPalettes.some(p => p.id === paletteId);
  }, [savedPalettes]);

  const isCurrentPaletteSaved = currentPalette ? isPaletteSaved(currentPalette.id) : false;

  return {
    currentPalette,
    savedPalettes,
    baseColor,
    generatePalette,
    savePalette,
    deletePalette,
    updateBaseColor,
    loadPalette,
    isSaving,
    isPaletteSaved,
    isCurrentPaletteSaved,
  };
};