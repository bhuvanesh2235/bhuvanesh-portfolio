// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { KBarProvider } from '@/components/layout/CommandPalette';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bhuvanesh.dev'
  ),
  title: {
    default: 'Bhuvanesh K — AI/ML Engineer & Full-Stack Developer',
    template: '%s — Bhuvanesh K',
  },
  description:
    'Portfolio of Bhuvanesh K — an AI/ML engineer and full-stack developer specializing in deep learning, computer vision, and LLMs. LeetCode top 9.53% worldwide.',
  keywords: [
    'Bhuvanesh K',
    'AI Engineer',
    'ML Engineer',
    'Full-Stack Developer',
    'Deep Learning',
    'Computer Vision',
    'LLM',
    'LangChain',
    'TensorFlow',
    'Portfolio',
    'Sri Eshwar College',
  ],
  authors: [{ name: 'Bhuvanesh K', url: 'https://github.com/bhuvanesh2235' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Bhuvanesh K — AI/ML Engineer & Full-Stack Developer',
    description:
      'Portfolio of Bhuvanesh K — AI/ML engineer, computer vision specialist, and competitive programmer. Top 9.53% on LeetCode.',
    siteName: 'Bhuvanesh K Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bhuvanesh K Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhuvanesh K — AI/ML Engineer',
    description: 'Portfolio of Bhuvanesh K — AI/ML engineer and full-stack developer.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <KBarProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'hsl(220 14% 7%)',
                  border: '1px solid hsl(220 15% 16%)',
                  color: 'hsl(210 20% 95%)',
                },
              }}
            />
          </KBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
