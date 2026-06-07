'use client';

// Aetheris HUD bracket-corner frame.
// Wraps any panel with L-shaped corner brackets (gold, faint until `active`).
// Pure decoration over the children; layout/markup of children is untouched.
// Pairs with the `.hud-frame` / `.hud-panel` utilities in globals.css.

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  active?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'button';
};

export default function HudFrame({ children, active = false, className = '', as = 'div' }: Props) {
  const Tag = as;
  return (
    <Tag
      className={`hud-frame ${active ? 'hud-frame-active' : ''} ${className}`}
    >
      {children}
      {/* second pseudo-element host for the bottom corner brackets */}
      <span aria-hidden className="hud-frame-b" />
    </Tag>
  );
}
