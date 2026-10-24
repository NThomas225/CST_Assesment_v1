import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lock, Play } from 'lucide-react';
import { MODULES, PRICING } from '../data/course';

gsap.registerPlugin(ScrollTrigger);

export default function AcademyTeaser() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.academy-card');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.12,
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
      id="academy"
      className="py-24 lg:py-32 px-6 lg:px-16"
      style={{ backgroundColor: 'var(--bg-primary)', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--orange)]">
              New · Interactive Course
            </span>
            <h2
              className="font-sans font-semibold text-[32px] md:text-[48px] text-[var(--white)] mt-4 mb-4 tracking-tight"
              style={{ letterSpacing: '-1px' }}
            >
              Surface Repair Academy
            </h2>
            <p className="font-sans text-base text-[var(--grey)] max-w-[560px]">
              Five hands-on modules, twenty lessons, eighty quiz checkpoints — built from real workshop
              footage. Module 01 is free. Enrol once and keep your completion record.
            </p>
          </div>
          <a
            href="#/academy"
            className="inline-flex items-center gap-3 font-sans font-medium text-xs uppercase px-7 py-4 bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040] transition-colors duration-200 flex-none"
          >
            Enter the Academy <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Module strip */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MODULES.map((mod) => (
            <a
              key={mod.id}
              href={`#/academy/module/${mod.id}`}
              className="academy-card group relative overflow-hidden block"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={mod.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, var(--bg-card) 5%, transparent 70%)' }}
                />
                <span
                  className="absolute top-3 left-3 font-sans text-[10px] uppercase tracking-[0.2em] px-2.5 py-1"
                  style={
                    mod.free
                      ? { backgroundColor: 'var(--orange)', color: 'var(--black)' }
                      : { backgroundColor: 'rgba(10,10,10,0.75)', color: 'var(--grey)', border: '1px solid var(--border-subtle)' }
                  }
                >
                  {mod.free ? (
                    'Free taster'
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Enrolled
                    </span>
                  )}
                </span>
              </div>
              <div className="p-5">
                <span className="font-sans text-[10px] tracking-[0.25em] text-[var(--orange)]">
                  MODULE {mod.index}
                </span>
                <h3 className="font-sans font-semibold text-base text-[var(--white)] mt-2 leading-snug group-hover:text-[var(--orange)] transition-colors duration-200">
                  {mod.title}
                </h3>
                <span className="font-sans text-xs text-[var(--grey)] mt-2 inline-flex items-center gap-1.5">
                  <Play className="w-3 h-3" /> {mod.lessons.length} lessons
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Pricing line */}
        <p className="font-sans text-sm text-[var(--grey)] mt-10">
          Full course enrolment{' '}
          <span className="text-[var(--white)] font-medium">
            {PRICING.currency}
            {PRICING.fullCourse}
          </span>{' '}
          — or start with Module 01, free forever.{' '}
          <a href="#/academy/course" className="text-[var(--orange)] hover:underline">
            Browse the course dashboard
          </a>
        </p>
      </div>
    </section>
  );
}
