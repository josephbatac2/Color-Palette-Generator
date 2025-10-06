import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Eye, Shield, Download, ArrowRight, Play, Star, Users, Zap, Heart, Github, Twitter, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useTheme } from '../contexts/ThemeContext';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const demoColors = [
    ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'],
    ['#43e97b', '#38f9d7', '#667eea', '#764ba2', '#f093fb'],
    ['#fa709a', '#fee140', '#667eea', '#764ba2', '#f093fb'],
    ['#a8edea', '#fed6e3', '#667eea', '#764ba2', '#f093fb'],
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % demoColors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "6 Harmony Types",
      description: "Advanced color theory algorithms for perfect palettes"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "160+ Curated Palettes",
      description: "Professional color combinations across 8 categories"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "WCAG Compliance",
      description: "Accessibility checker with contrast ratio analysis"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Color Blindness Simulator",
      description: "Test your palettes for inclusive design"
    }
  ];

  const stats = [
    { number: "160+", label: "Curated Palettes" },
    { number: "6", label: "Harmony Types" },
    { number: "4", label: "Vision Types" },
    { number: "100%", label: "Free to Use" }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'}`}>
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className={`w-12 h-12 rounded-full shadow-lg transition-all ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${theme === 'dark' ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20' : 'bg-gradient-to-br from-blue-200/40 to-purple-200/40'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${theme === 'dark' ? 'bg-gradient-to-br from-pink-400/20 to-orange-400/20' : 'bg-gradient-to-br from-pink-200/40 to-orange-200/40'}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-400/10 to-blue-400/10' : 'bg-gradient-to-br from-cyan-200/30 to-blue-200/30'}`}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo */}
          <div className={`inline-flex items-center gap-3 mb-8 p-4 backdrop-blur-xl rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-white border border-gray-200'}`}>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color Palette Generator</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Create
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              {' '}Beautiful{' '}
            </span>
            <br />
            Color Palettes
          </h1>

          <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Professional-grade color palette generator with advanced harmony algorithms, 
            accessibility checking, and color blindness simulation. Perfect for designers and developers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`px-8 py-4 text-lg backdrop-blur-xl shadow-2xl transform hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}
              onClick={() => window.open('https://github.com/ajbatac/color-palette-generator', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>

          {/* Demo Palette Animation */}
          <div className="max-w-2xl mx-auto">
            <div className={`backdrop-blur-xl rounded-2xl p-8 shadow-2xl ${theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-white border border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Live Preview</h3>
              <div className="flex rounded-xl overflow-hidden shadow-2xl h-20 transition-all duration-1000">
                {demoColors[currentColorIndex].map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 transition-all duration-1000 hover:scale-110 hover:z-10 relative"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className={`text-sm mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Colors change automatically every 3 seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`relative z-10 backdrop-blur-xl ${theme === 'dark' ? 'bg-white/5 border-y border-white/10' : 'bg-white/50 border-y border-gray-200'}`}>
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.number}</div>
                <div className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Modern Design
            </span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Everything you need to create accessible, beautiful color palettes for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:shadow-purple-500/20' : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-purple-500/10'}`}>
              <div className={`p-3 rounded-xl w-fit mb-4 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10' : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-gray-200'}`}>
                <div className="text-blue-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`relative z-10 backdrop-blur-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'}`}>
        <div className="container mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Create professional color palettes in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose Harmony",
                description: "Select from 6 color harmony types based on color theory",
                icon: <Palette className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Pick Base Color",
                description: "Use our intuitive color picker to select your starting color",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Generate & Export",
                description: "Get your palette and export in multiple formats",
                icon: <Download className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className={`text-center backdrop-blur-xl rounded-3xl p-16 shadow-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/20' : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-200'}`}>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready to Create Amazing
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Color Palettes?
            </span>
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Join thousands of designers and developers who trust our color palette generator
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="px-12 py-6 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
          >
            <Heart className="w-6 h-6 mr-3" />
            Start Creating Now
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className={`relative z-10 backdrop-blur-xl ${theme === 'dark' ? 'border-t border-white/10 bg-black/20' : 'border-t border-gray-200 bg-white/50'}`}>
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color Palette Generator</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://ajbatac.github.io/?=colorpalettegen"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Created by AJ Batac
              </a>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ajbatac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/ajbatac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-8 text-center ${theme === 'dark' ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
            <a href="https://www.buymeacoffee.com/emailsig" target="_blank" rel="noopener noreferrer" className="inline-block mb-6">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" style={{ height: '60px', width: '217px' }} />
            </a>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>© 2025 Color Palette Generator. Made with ❤️ for designers and developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};