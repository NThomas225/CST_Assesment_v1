import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/assessment';

gsap.registerPlugin(ScrollTrigger);

export default function Competencies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Row entrance animations
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const tween = gsap.fromTo(
        row,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.12,
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    // Progress bar animations
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const target = skills[i].percentage;
      const tween = gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${target}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="competencies"
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-16"
      style={{ backgroundColor: 'var(--bg-primary)', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <h2
          className="font-sans font-semibold text-[32px] md:text-[48px] text-[var(--white)] mb-16 tracking-tight"
          style={{ letterSpacing: '-1px' }}
        >
          Core Competencies Assessed
        </h2>

        {/* Skill rows */}
        <div className="space-y-12">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              ref={(el) => { rowsRef.current[i] = el; }}
              className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12"
            >
              {/* Left: Name + description */}
              <div className="lg:w-[420px] flex-shrink-0">
                <h3 className="font-sans font-semibold text-xl lg:text-[28px] text-[var(--white)] mb-2">
                  {skill.name}
                </h3>
                <p className="font-sans text-[15px] text-[var(--grey)] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Right: Progress bar */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[var(--grey)] uppercase tracking-wider">
                    Proficiency
                  </span>
                  <span className="font-mono text-sm text-[var(--orange)]">
                    {skill.percentage}%
                  </span>
                </div>
                <div
                  className="h-px w-full relative"
                  style={{ backgroundColor: 'var(--border-subtle)' }}
                >
                  <div
                    ref={(el) => { barsRef.current[i] = el; }}
                    className="absolute top-0 left-0 h-full"
                    style={{ backgroundColor: 'var(--orange)', width: '0%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
