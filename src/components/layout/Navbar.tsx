'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCommandPalette } from '@/components/layout/CommandPalette';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';
import { Menu, X, Command, Download } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Education',      href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggle } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-border/50 py-3'
            : 'py-4 sm:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-tight gradient-text"
            onClick={() => setMobileOpen(false)}
          >
            BK
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors animated-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command palette trigger — desktop only */}
            <button
              onClick={toggle}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface text-muted text-xs hover:border-violet/50 hover:text-text transition-all"
              aria-label="Open command palette"
            >
              <Command size={12} />
              <span>⌘K</span>
            </button>

            <ThemeToggle />

            <MagneticButton
              href="/Bhuvanesh_K_Resume.pdf"
              target="_blank"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-primary text-white hover:opacity-90 transition-opacity"
            >
              Resume
            </MagneticButton>

            {/* Mobile menu toggle — 44×44 tap target */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-border text-muted hover:text-text hover:border-violet/40 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-[min(85vw,320px)] glass border-l border-border flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <span className="font-display font-bold text-lg gradient-text">BK</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted hover:text-text transition-colors"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center h-12 px-3 rounded-xl font-display text-lg font-semibold text-muted hover:text-text hover:bg-surface2 transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Drawer footer actions */}
          <div className="px-4 pb-8 pt-4 border-t border-border flex flex-col gap-3">
            <a
              href="/Bhuvanesh_K_Resume.pdf"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold text-sm"
            >
              <Download size={15} />
              Download Resume
            </a>
            <button
              onClick={() => { setMobileOpen(false); toggle(); }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border text-muted text-sm hover:border-violet/50 hover:text-text transition-colors"
            >
              <Command size={14} />
              Command Palette
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
