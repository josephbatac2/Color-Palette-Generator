import React, { useEffect } from 'react';
import { Color } from '../../types/color';
import { X } from 'lucide-react';

interface LightboxProps {
  color: Color;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ color, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-300"
      onClick={onClose}
      style={{ 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        margin: 0,
        padding: 0
      }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors shadow-2xl backdrop-blur-md"
        >
          <X className="w-8 h-8" />
        </button>
      </div>
      
      <div 
        className="w-full h-full flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300"
        onClick={onClose}
        style={{ backgroundColor: color.hex }}
      >
        <div className="text-center space-y-8 max-w-6xl mx-auto">
          <div 
            className="w-48 h-48 rounded-3xl shadow-2xl border-4 border-white/30 mx-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: color.hex }}
          />
          
          <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-6xl font-bold text-white drop-shadow-lg">
              {color.hex}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl">
                <div className="text-lg font-medium opacity-80 mb-3">HEX</div>
                <div className="text-3xl font-mono font-bold">{color.hex}</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl">
                <div className="text-lg font-medium opacity-80 mb-3">RGB</div>
                <div className="text-3xl font-mono font-bold">
                  {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl">
                <div className="text-lg font-medium opacity-80 mb-3">HSL</div>
                <div className="text-3xl font-mono font-bold">
                  {color.h}°, {color.s}%, {color.l}%
                </div>
              </div>
            </div>
            
            <div className="text-white/80 text-xl">
              Click anywhere to close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};