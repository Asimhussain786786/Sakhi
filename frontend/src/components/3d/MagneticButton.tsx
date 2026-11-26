import { useRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.22,
  disabled,
  onMouseMove,
  onMouseLeave,
  ...rest
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    if (disabled) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.12s ease-out',
      }}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}
