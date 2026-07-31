'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCommandPalette } from '@/components/layout/CommandPalette';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';
import { Menu, X, Command } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { toggle } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-border/50 py-3'
            : 'py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-tight gradient-text"
          >
            BK
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
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
          <div className="flex items-center gap-3">
            {/* Command palette trigger */}
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

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted hover:text-text"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-72 glass border-l border-border flex flex-col pt-24 pb-8 px-8 transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl font-semibold text-muted hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <a
              href="/Bhuvanesh_K_Resume.pdf"
              target="_blank"
              className="w-full text-center py-3 rounded-xl bg-gradient-primary text-white font-medium"
            >
              Download Resume
            </a>
            <button
              onClick={() => { setMobileOpen(false); toggle(); }}
              className="w-full text-center py-3 rounded-xl border border-border text-muted text-sm hover:border-violet/50"
            >
              ⌘K Command Palette
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
