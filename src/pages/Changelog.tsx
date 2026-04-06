import React from 'react';
import { ArrowLeft, Rss } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Changelog: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white font-sans py-12 px-6">
      <div className="max-w-3xl mx-auto backdrop-blur-xl bg-black/40 rounded-3xl border border-white/20 p-8 shadow-2xl">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Changelog</h1>
            <p className="text-gray-300">Discover all the recent updates and improvements.</p>
          </div>
          
          <a
            href="/changelog/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Subscribe to this feed"
          >
            <Rss className="w-4 h-4" />
            <span className="text-sm font-medium">Subscribe to this feed</span>
          </a>
        </header>

        <main className="space-y-12">
          {/* v1.3.1 - April 5, 2026 */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-white">v1.3.1</h2>
              <time className="text-sm text-green-300 font-medium">April 5, 2026</time>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Accessibility & Hero Polish:</strong> Thorough contrast improvements across stats, headers, footer navigation, and more. Colors perfectly match WCAG AA/AAA guidelines to support low-vision users.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Hero Revamp:</strong> Sleeker glassmorphic hero style, enhanced alignment, optimized fonts, and Open Source contributions highlighted.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">SEO & Publishing Infrastructure:</strong> sitemap.xml, robots.txt, and active RSS feeds configured. Added a dedicated Changelog history page.
                </span>
              </li>
            </ul>
          </section>

          {/* v1.2.0 - October 2025 */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-white">v1.2.0</h2>
              <time className="text-sm text-green-300 font-medium">October 2025</time>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Dark/Light Mode Toggle:</strong> Full theme support with smooth transitions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Enhanced Landing Page:</strong> Beautiful gradient backgrounds with animated elements.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Responsive Design Improvements:</strong> Fixed button overflow issues on mobile devices.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Social Media Integration:</strong> Added comprehensive social links in footer.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  <strong className="text-white font-semibold">Improved Button Visibility:</strong> Fixed contrast issues in light mode for better accessibility.
                </span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};
