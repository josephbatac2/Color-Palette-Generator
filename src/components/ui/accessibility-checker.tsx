import React, { useMemo } from 'react';
import { Color } from '../../types/color';
import { ColorUtils } from '../../utils/colorUtils';
import { Card } from './card';
import { Badge } from './badge';
import { AlertTriangle, CheckCircle, XCircle, Shield, Info } from 'lucide-react';

interface AccessibilityCheckerProps {
  colors: Color[];
  className?: string;
}

export const AccessibilityChecker: React.FC<AccessibilityCheckerProps> = ({
  colors,
  className,
}) => {
  const contrastResults = useMemo(() => {
    const results: Array<{
      color1: Color;
      color2: Color;
      contrast: any;
      index1: number;
      index2: number;
    }> = [];

    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const contrast = ColorUtils.calculateContrastRatio(colors[i], colors[j]);
        results.push({
          color1: colors[i],
          color2: colors[j],
          contrast,
          index1: i,
          index2: j,
        });
      }
    }

    return results.sort((a, b) => b.contrast.ratio - a.contrast.ratio);
  }, [colors]);

  const getContrastIcon = (level: string) => {
    switch (level) {
      case 'AAA':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'AA':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getContrastBadgeVariant = (level: string) => {
    switch (level) {
      case 'AAA':
        return 'default';
      case 'AA':
        return 'secondary';
      case 'fail':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const stats = useMemo(() => {
    const total = contrastResults.length;
    const aaa = contrastResults.filter(r => r.contrast.level === 'AAA').length;
    const aa = contrastResults.filter(r => r.contrast.level === 'AA').length;
    const fail = contrastResults.filter(r => r.contrast.level === 'fail').length;
    
    return { total, aaa, aa, fail };
  }, [contrastResults]);

  return (
    <Card className={`p-6 bg-white/90 backdrop-blur-xl border-white/20 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">Accessibility Report</h3>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Pairs</div>
        </div>
        <div className="bg-green-50/80 backdrop-blur-sm rounded-lg p-4 text-center border border-green-100/50 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{stats.aaa}</div>
          <div className="text-sm text-green-700">AAA Level</div>
        </div>
        <div className="bg-yellow-50/80 backdrop-blur-sm rounded-lg p-4 text-center border border-yellow-100/50 shadow-sm">
          <div className="text-2xl font-bold text-yellow-600">{stats.aa}</div>
          <div className="text-sm text-yellow-700">AA Level</div>
        </div>
        <div className="bg-red-50/80 backdrop-blur-sm rounded-lg p-4 text-center border border-red-100/50 shadow-sm">
          <div className="text-2xl font-bold text-red-600">{stats.fail}</div>
          <div className="text-sm text-red-700">Failed</div>
        </div>
      </div>
      
      {/* Contrast Results */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900 mb-4">Color Pair Analysis</h4>
        {contrastResults.map((result, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-200 border border-white/20 shadow-sm">
            <div className="flex gap-2">
              <div
                className="w-8 h-8 rounded-lg border-2 border-white/50 shadow-md"
                style={{ backgroundColor: result.color1.hex }}
              />
              <div
                className="w-8 h-8 rounded-lg border-2 border-white/50 shadow-md"
                style={{ backgroundColor: result.color2.hex }}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {getContrastIcon(result.contrast.level)}
                <span className="font-medium text-gray-900">
                  Color {result.index1 + 1} × Color {result.index2 + 1}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Contrast ratio: <span className="font-mono">{result.contrast.ratio}:1</span>
              </div>
            </div>
            
            <Badge variant={getContrastBadgeVariant(result.contrast.level) as any}>
              {result.contrast.level === 'fail' ? 'FAIL' : `WCAG ${result.contrast.level}`}
            </Badge>
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 shadow-sm">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-3">WCAG Guidelines</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span><strong>AAA:</strong> 7:1 ratio (highest standard, recommended for all text)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span><strong>AA:</strong> 4.5:1 ratio (minimum for normal text, 3:1 for large text)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span><strong>FAIL:</strong> Below 4.5:1 ratio (not accessible for text)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};