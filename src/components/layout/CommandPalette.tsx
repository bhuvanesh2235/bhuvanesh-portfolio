'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  subtitle?: string;
  icon?: string;
  section?: string;
  perform: () => void;
  shortcut?: string[];
}

interface KBarContextType {
  toggle: () => void;
  open: boolean;
}

const KBarContext = createContext<KBarContextType>({ toggle: () => {}, open: false });
export const useCommandPalette = () => useContext(KBarContext);

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const NAV_SECTIONS = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'certifications', 'achievements', 'contact'];

export function KBarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    ...NAV_SECTIONS.map((s) => ({
      id: `nav-${s}`,
      label: s.charAt(0).toUpperCase() + s.slice(1),
      subtitle: `Scroll to ${s}`,
      icon: '↓',
      section: 'Navigate',
      perform: () => { setOpen(false); setTimeout(() => scrollTo(s), 150); },
    })),
    {
      id: 'github',
      label: 'GitHub',
      subtitle: 'github.com/bhuvanesh2235',
      icon: '🐙',
      section: 'Links',
      perform: () => { setOpen(false); window.open('https://github.com/bhuvanesh2235', '_blank'); },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      subtitle: 'linkedin.com/in/bhuvanesh-k',
      icon: '💼',
      section: 'Links',
      perform: () => { setOpen(false); window.open('https://www.linkedin.com/in/bhuvanesh-k-bbb505245/', '_blank'); },
    },
    {
      id: 'email',
      label: 'Send Email',
      subtitle: 'bhuvaneshkalidasan2@gmail.com',
      icon: '✉️',
      section: 'Links',
      perform: () => { setOpen(false); window.open('mailto:bhuvaneshkalidasan2@gmail.com'); },
    },
    {
      id: 'resume',
      label: 'Download Resume',
      subtitle: 'PDF',
      icon: '📄',
      section: 'Links',
      perform: () => { setOpen(false); window.open('/Bhuvanesh_K_Resume.pdf', '_blank'); },
    },
  ];

  const filtered = commands.filter((c) =>
    !query ||
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle?.toLowerCase().includes(query.toLowerCase())
  );

  // Group by section
  const sections = filtered.reduce((acc, cmd) => {
    const sec = cmd.section ?? 'Other';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggle]);

  // Focus input when opened
  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => setActiveIndex(0), [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); filtered[activeIndex]?.perform(); }
  };

  return (
    <KBarContext.Provider value={{ toggle, open }}>
      {children}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{    opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[999] w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-border bg-surface"
              style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.7)' }}
            >
              {/* Search row */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search size={16} className="text-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent py-4 text-text placeholder-muted outline-none text-sm"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-muted hover:text-text">
                    <X size={14} />
                  </button>
                )}
                <kbd className="px-2 py-0.5 text-xs rounded border border-border font-mono text-muted">esc</kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {Object.entries(sections).map(([section, cmds]) => (
                  <div key={section}>
                    <div className="px-4 py-2 text-xs uppercase tracking-widest text-muted/60 font-medium">
                      {section}
                    </div>
                    {cmds.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.perform}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            activeIndex === globalIndex
                              ? 'bg-violet/10 text-violet'
                              : 'text-text hover:bg-surface2'
                          }`}
                        >
                          <span className="text-base w-6 text-center">{cmd.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{cmd.label}</div>
                            {cmd.subtitle && (
                              <div className="text-xs text-muted">{cmd.subtitle}</div>
                            )}
                          </div>
                          {cmd.shortcut?.map((k) => (
                            <kbd key={k} className="px-2 py-0.5 text-xs rounded border border-border font-mono text-muted">
                              {k}
                            </kbd>
                          ))}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-muted text-sm">No results for &ldquo;{query}&rdquo;</div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border flex gap-4 text-xs text-muted">
                <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </KBarContext.Provider>
  );
}
