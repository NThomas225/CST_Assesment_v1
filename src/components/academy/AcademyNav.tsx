import { useEffect, useState } from 'react';
import type { Route } from '../../hooks/useHashRoute';
import { LINKS } from '../../data/course';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  match?: (name: Route['name']) => boolean;
}

const navLinks: NavLink[] = [
  { label: 'Assessment', href: '#/', match: (n) => n === 'home' },
  {
    label: 'Academy',
    href: '#/academy',
    match: (n) => n === 'academy' || n === 'academy-course' || n === 'academy-module' || n === 'academy-lesson',
  },
  { label: 'Training', href: LINKS.training, external: true },
];

export default function AcademyNav({ routeName }: { routeName: Route['name'] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [routeName]);

  const linkClass = (active: boolean) =>
    `font-sans text-sm tracking-wide uppercase transition-colors duration-200 cursor-pointer ${
      active ? 'text-[var(--orange)]' : 'text-[var(--grey)] hover:text-[var(--orange)]'
    }`;

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.4)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <a href="#/" className="flex items-center gap-3">
        <img src="/images/logo-mark.png" alt="City Surface Training logo" className="h-9 w-auto" />
        <span className="font-sans font-medium text-sm tracking-wider uppercase text-[var(--white)]">
          Surface Repair <span className="text-[var(--orange)]">Academy</span>
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={linkClass(!!link.match?.(routeName))}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#/academy/course"
        className="hidden md:block font-sans font-medium text-xs uppercase px-7 py-3 bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040] transition-colors duration-200 cursor-pointer"
      >
        My Course
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="w-6 h-0.5 bg-[var(--white)] transition-transform"
          style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}
        />
        <span className="w-6 h-0.5 bg-[var(--white)] transition-opacity" style={{ opacity: mobileOpen ? 0 : 1 }} />
        <span
          className="w-6 h-0.5 bg-[var(--white)] transition-transform"
          style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-6 px-6 md:hidden flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`${linkClass(!!link.match?.(routeName))} py-2`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#/academy/course"
            className="font-sans font-medium text-xs uppercase px-7 py-3 bg-[var(--orange)] text-[var(--black)] mt-2 text-center cursor-pointer"
          >
            My Course
          </a>
        </div>
      )}
    </nav>
  );
}
