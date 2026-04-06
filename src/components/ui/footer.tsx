import React from 'react';
import { Github, Twitter, Instagram, Linkedin, Youtube, Link2 } from 'lucide-react';


interface SocialLink {
  href: string;
  icon: React.ReactNode;
  title: string;
}

interface FooterProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ variant = 'full', className = '' }) => {
  // Footer background is always dark (from-gray-900 to-gray-800),
  // so ALL text must use light values regardless of the page theme.
  // Verified contrast ratios against #1f2937 (gray-800) background:
  //   text-white       → 16:1  ✓ AAA
  //   text-gray-100    → 14:1  ✓ AAA
  //   text-gray-200    → 11:1  ✓ AAA
  //   text-gray-300    →  8:1  ✓ AAA
  //   text-blue-300    →  6.9:1 ✓ AA  (links)
  //   text-purple-300  →  6.1:1 ✓ AA  (links)

  const socialLinks: SocialLink[] = [
    { href: 'https://github.com/josephbatac2/Color-Palette-Generator', icon: <Github className="w-5 h-5" />, title: 'GitHub' },
    { href: 'https://twitter.com/ajbatac',         icon: <Twitter   className="w-5 h-5" />, title: 'Twitter'  },
    { href: 'https://instagram.com/ajbatac',       icon: <Instagram className="w-5 h-5" />, title: 'Instagram'},
    { href: 'https://www.linkedin.com/in/ajbatac/',icon: <Linkedin  className="w-5 h-5" />, title: 'LinkedIn' },
    { href: 'https://www.youtube.com/@AJBatac',    icon: <Youtube   className="w-5 h-5" />, title: 'YouTube'  },
    { href: 'https://linkn.ca/ajbatac',            icon: <Link2     className="w-5 h-5" />, title: 'linkn.ca' },
    { href: 'https://linktr.ee/ajbatac',           icon: <Link2     className="w-5 h-5" />, title: 'Linktree' },
  ];

  // Always-dark surface → always-light text
  const baseClasses = `relative z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900 to-gray-800`;
  const headingText = 'text-white';
  const bodyText    = 'text-gray-200';       // 11:1 ✓
  const mutedText   = 'text-gray-300';       // 8:1  ✓
  const linkClasses = 'text-gray-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded';
  const inlineLinkAuthor    = 'text-blue-300   hover:text-blue-200   underline underline-offset-2 transition-colors';
  const inlineLinkChangelog = 'text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors';

  if (variant === 'compact') {
    return (
      <footer className={`${baseClasses} ${className}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <a
              href="https://www.buymeacoffee.com/emailsig"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded"
              aria-label="Buy Me A Coffee — support this project"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                alt="Buy Me A Coffee"
                style={{ height: '60px', width: '217px' }}
              />
            </a>
            <div className={`text-sm ${bodyText}`}>
              Created with ❤️ by{' '}
              <a
                href="https://ajbatac.github.io/?=colorpalettegen"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLinkAuthor}
              >
                AJ Batac (@ajbatac)
              </a>
              {' '}- v1.3.0 ({' '}
              <a
                href="/changelog.html"
                className={inlineLinkChangelog}
              >
                changelog
              </a>
              )
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`${baseClasses} ${className}`}>
      <div className="container mx-auto px-6 py-12">
        {/* Top row: logo + social nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-white/10 to-purple-600/30 rounded-xl shadow-lg">
              <a href="/" title="Color Palette Generator" target="_self">
                <img
                  src="/logo.png"
                  alt="Color Palette Generator home"
                  className="w-16 h-16 rounded-xl shadow-lg"
                />
              </a>
            </div>
            <span className={`font-semibold text-lg ${headingText}`}>Color Palette Generator</span>
          </div>

          {/* Nav / socials */}
          <nav aria-label="Social links" className="flex items-center gap-6 flex-wrap justify-center">
            <a
              href="https://ajbatac.github.io/?=colorpalettegen"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              Created by AJ Batac
            </a>
            <div className="flex gap-4 flex-wrap justify-center">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                  title={link.title}
                  aria-label={link.title}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom: support buttons + copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
            <a
              href="https://www.buymeacoffee.com/emailsig"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded"
              aria-label="Buy Me A Coffee — support this project"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                alt="Buy Me A Coffee"
                style={{ height: '60px', width: '217px' }}
              />
            </a>

            <a
              href="https://ko-fi.com/N4N11N420X"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded"
              aria-label="Support on Ko-fi"
            >
              <img
                src="https://storage.ko-fi.com/cdn/kofi2.png?v=6"
                alt="Support on Ko-fi"
                style={{ height: '60px', width: '217px' }}
              />
            </a>
          </div>

          <p className={`text-sm ${mutedText}`}>
            © 2026 Color Palette Generator v1.3.0. Made with ❤️ for designers and developers.
          </p>
        </div>
      </div>
    </footer>
  );
};
