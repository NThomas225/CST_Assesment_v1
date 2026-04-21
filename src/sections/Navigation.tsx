import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Modules', href: '#modules' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Employers', href: '#competencies' },
  { label: 'Results', href: '#testimonials' },
  { label: 'Register', href: '#pricing' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.4)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        zIndex: 100,
      }}
    >
      {/* Logo 
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L28 28H4L16 2Z" fill="#D4943A" />
          <path d="M16 8L24 26H8L16 8Z" fill="#1A3A5C" />
          */}
        </svg>
        <span className="font-sans font-medium text-sm tracking-wider uppercase text-[var(--white)]">
          Surface Repair Courses
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            className="font-sans text-sm tracking-wide uppercase text-[var(--grey)] hover:text-[var(--orange)] transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => scrollTo('#assessment-demo')}
        className="hidden md:block font-sans font-medium text-xs uppercase px-7 py-3 bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040] transition-colors duration-200 cursor-pointer"
      >
        Start Assessment
      </button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="w-6 h-0.5 bg-[var(--white)] transition-transform" style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
        <span className="w-6 h-0.5 bg-[var(--white)] transition-opacity" style={{ opacity: mobileOpen ? 0 : 1 }} />
        <span className="w-6 h-0.5 bg-[var(--white)] transition-transform" style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-6 px-6 md:hidden flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-sans text-sm tracking-wide uppercase text-[var(--grey)] hover:text-[var(--orange)] transition-colors text-left bg-transparent border-none cursor-pointer py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#assessment-demo')}
            className="font-sans font-medium text-xs uppercase px-7 py-3 bg-[var(--orange)] text-[var(--black)] mt-2 cursor-pointer"
          >
            Start Assessment
          </button>
        </div>
      )}
    </nav>
  );
}
