import React from 'react';
import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ColorPaletteGenerator } from './components/ColorPaletteGenerator';

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return <ColorPaletteGenerator />;
}

export default App;