import React from 'react';
import { Palette, Github, Twitter, Instagram, Linkedin, Youtube, Link2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { theme } = useTheme();

  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com/ajbatac',
      icon: <Github className="w-5 h-5" />,
      title: 'GitHub',
    },
    {
      href: 'https://twitter.com/ajbatac',
      icon: <Twitter className="w-5 h-5" />,
      title: 'Twitter',
    },
    {
      href: 'https://instagram.com/ajbatac',
      icon: <Instagram className="w-5 h-5" />,
      title: 'Instagram',
    },
    {
      href: 'https://www.linkedin.com/in/ajbatac/',
      icon: <Linkedin className="w-5 h-5" />,
      title: 'LinkedIn',
    },
    {
      href: 'https://www.youtube.com/@AJBatac',
      icon: <Youtube className="w-5 h-5" />,
      title: 'YouTube',
    },
    {
      href: 'https://linkn.ca/ajbatac',
      icon: <Link2 className="w-5 h-5" />,
      title: 'linkn.ca',
    },
    {
      href: 'https://linktr.ee/ajbatac',
      icon: <Link2 className="w-5 h-5" />,
      title: 'Linktree',
    },
  ];

  const baseClasses = `relative z-10 backdrop-blur-xl ${
    theme === 'dark'
      ? 'border-t border-white/10 bg-black/20'
      : 'border-t border-gray-200 bg-white/50'
  }`;

  const linkClasses = `transition-colors ${
    theme === 'dark'
      ? 'text-gray-300 hover:text-white'
      : 'text-gray-600 hover:text-gray-900'
  }`;

  const textClasses = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const mutedTextClasses = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const subtleTextClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderClasses = theme === 'dark' ? 'border-t border-white/10' : 'border-t border-gray-200';

  if (variant === 'compact') {
    return (
      <footer className={`${baseClasses} ${className}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <a
              href="https://www.buymeacoffee.com/emailsig"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                alt="Buy Me A Coffee"
                style={{ height: '60px', width: '217px' }}
              />
            </a>
            <div className={`text-sm ${mutedTextClasses}`}>
              Created with ❤️ by{' '}
              <a
                href="https://ajbatac.github.io/?=colorpalettegen"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium transition-colors hover:underline ${
                  theme === 'dark'
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                AJ Batac (@ajbatac)
              </a>
              {' '}- v1.3.0 ({' '}
              <a
                href="/changelog.html"
                className={`font-medium transition-colors hover:underline ${
                  theme === 'dark'
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                }`}
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
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="p-3 bg-gradient-to-br from-white-500 to-purple-600 rounded-xl shadow-lg">
              <a href="/" title="Color Palette Generator" target="_self">
              <img src="/logo.png" alt="Color Palette Generator" className="w-16 h-16 rounded-xl shadow-lg" />
              </a>
            </div>
            <span className={`font-semibold ${textClasses}`}>Color Palette Generator</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://ajbatac.github.io/?=colorpalettegen"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              Created by AJ Batac
            </a>
            <div className="flex gap-3 flex-wrap justify-center">
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
          </div>
        </div>

        <div className={`mt-8 pt-8 text-center ${borderClasses}`}>
          <a
            href="https://www.buymeacoffee.com/emailsig"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6"
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
            className="inline-block mb-6 pl-6"
          >
            <img
              src="https://storage.ko-fi.com/cdn/kofi2.png?v=6"
              alt="Buy Me A Coffee"
              style={{ height: '60px', width: '217px' }}
            />
          </a>

          
          <p className={`text-sm ${subtleTextClasses}`}>
            © 2026 Color Palette Generator v1.3.0. Made with ❤️ for designers and developers.
          </p>
        </div>
      </div>
    </footer>
  );
};
