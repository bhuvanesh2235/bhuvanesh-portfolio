'use client';

import { useRef, useState, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = ComponentProps<'a'> & {
  href: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
};

export function MagneticButton({
  href,
  className,
  children,
  strength = 0.3,
  ...props
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el  = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.15s ease' }}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </a>
  );
}
