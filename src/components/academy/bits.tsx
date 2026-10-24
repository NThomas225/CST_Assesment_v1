import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

/* IntersectionObserver reveal wrapper — adds .revealed once in view */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'figure' | 'li' | 'h2' | 'h3';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as 'div';
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={`${className} ${seen ? 'revealed' : ''}`}>
      {children}
    </Comp>
  );
}

/* Split a heading into masked lines for the roll-up reveal */
export function SplitLines({ lines, className = '' }: { lines: string[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <span style={{ '--d': `${i * 0.09}s` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <span className={`arrow-slide ${className}`} aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export function PillButton({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
  arrow = true,
  type,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
  arrow?: boolean;
  type?: 'button' | 'submit';
}) {
  const inner = (
    <>
      <span className="roll">
        <span>
          {label}
          <br />
          {label}
        </span>
      </span>
      {arrow && <Arrow />}
    </>
  );
  const cls = `btn-pill btn-pill--${variant} ${className}`;
  if (href) {
    const external = href.startsWith('http');
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? 'button'} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function TechLabel({ children, dim = false }: { children: ReactNode; dim?: boolean }) {
  return <span className={`tech-label ${dim ? 'tech-label--dim' : ''}`}>{children}</span>;
}

/* Section heading with number, e.g. ( 02 ) MODULES */
export function SectionHead({ num, label, className = '' }: { num: string; label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-xs tracking-[0.2em] text-[hsl(var(--ember))]">( {num} )</span>
      <span className="font-mono text-xs tracking-[0.25em] uppercase text-[hsl(var(--bone)/0.6)]">{label}</span>
      <span className="razor flex-1" />
    </div>
  );
}

export function ProgressBar({ pct, className = '' }: { pct: number; className?: string }) {
  return (
    <div className={`h-[3px] w-full rounded-full bg-[hsl(var(--bone)/0.12)] ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full bg-[hsl(var(--ember))] transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function LockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
