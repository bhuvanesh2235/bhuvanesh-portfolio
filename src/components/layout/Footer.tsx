import Link from 'next/link';
import { GitFork, ExternalLink, Mail, Heart } from 'lucide-react';

const SOCIALS = [
  { icon: GitFork,      href: process.env.NEXT_PUBLIC_GITHUB_URL   ?? 'https://github.com/bhuvanesh2235',   label: 'GitHub'   },
  { icon: ExternalLink, href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/bhuvanesh-k-bbb505245/', label: 'LinkedIn' },
  { icon: Mail,         href: 'mailto:bhuvaneshkalidasan2@gmail.com',                                        label: 'Email'    },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div>
          <Link href="/" className="font-display font-bold text-xl gradient-text">
            BK
          </Link>
          <p className="text-xs text-muted mt-1">
            Bhuvanesh K · AI/ML Engineer & Full-Stack Developer
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted hover:text-text hover:border-violet/40 transition-colors"
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>

        {/* Right */}
        <p className="text-xs text-muted flex items-center gap-1.5">
          Built with <Heart size={11} className="text-rose-400" /> using Next.js & Neon
        </p>
      </div>
    </footer>
  );
}
