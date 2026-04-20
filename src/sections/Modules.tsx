import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { modules } from '../data/assessment';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Modules() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.module-card');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0% 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.2,
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const scrollToAssessment = () => {
    const el = document.querySelector('#assessment-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="modules"
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-16"
      style={{ backgroundColor: 'var(--bg-secondary)', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2
            className="font-sans font-semibold text-[32px] md:text-[48px] text-[var(--white)] mb-4 tracking-tight"
            style={{ letterSpacing: '-1px' }}
          >
            Choose Your Discipline
          </h2>
          <p className="font-sans text-base text-[var(--grey)] max-w-[520px]">
            Each module covers theory, damage identification, and repair methodology
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="module-card group cursor-pointer"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              onClick={scrollToAssessment}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={mod.image}
                  alt={mod.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Duration badge */}
                <div
                  className="absolute top-4 right-4 font-mono text-[11px] px-3 py-1"
                  style={{
                    background: 'rgba(212, 148, 58, 0.15)',
                    color: 'var(--orange)',
                  }}
                >
                  {mod.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="font-mono text-xs text-[var(--orange)] tracking-wider">
                  {mod.number}
                </span>
                <h3 className="font-sans font-semibold text-xl lg:text-2xl text-[var(--white)] mt-2 mb-3 group-hover:text-[var(--orange)] transition-colors duration-300">
                  {mod.title}
                </h3>
                <p className="font-sans text-sm text-[var(--grey)] leading-relaxed mb-5 line-clamp-2">
                  {mod.description}
                </p>
                <div className="flex items-center gap-2 text-[var(--orange)]">
                  <span className="font-sans font-medium text-xs uppercase tracking-wider">
                    Start Module
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
