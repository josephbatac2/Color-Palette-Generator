import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ColorPaletteGenerator } from './components/ColorPaletteGenerator';
import { Changelog } from './pages/Changelog';
import { ColorConverter } from './pages/ColorConverter';
import { BackToTop } from './components/ui/back-to-top';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Simple routing for changelog and converter
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === '/changelog') {
    return (
      <>
        <Changelog
          onBack={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />
        <BackToTop />
      </>
    );
  }

  if (currentPath === '/converter') {
    return (
      <>
        <ColorConverter
          onBack={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />
        <BackToTop />
      </>
    );
  }

  if (!showApp) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowApp(true)} />
        <BackToTop />
      </>
    );
  }

  return (
    <>
      <ColorPaletteGenerator />
      <BackToTop />
    </>
  );
}

export default App;