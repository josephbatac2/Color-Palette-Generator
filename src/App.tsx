import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ColorPaletteGenerator } from './components/ColorPaletteGenerator';
import { Changelog } from './pages/Changelog';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Simple routing for changelog
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === '/changelog') {
    return (
      <Changelog 
        onBack={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }} 
      />
    );
  }

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return <ColorPaletteGenerator />;
}

export default App;