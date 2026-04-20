import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/assessment';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.testimonial-card');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
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
      id="testimonials"
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
          From Assessment to Employment
        </h2>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card p-8 lg:p-10"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
            >
              {/* Quote mark */}
              <div className="font-sans text-[48px] leading-none text-[var(--orange)] mb-4">"</div>

              {/* Quote text */}
              <p className="font-sans text-base lg:text-lg text-[var(--white)] leading-relaxed mb-8">
                {t.quote}
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-sans font-semibold text-base text-[var(--white)]">
                    {t.name}
                  </div>
                  <div className="font-sans text-[13px] text-[var(--orange)]">{t.role}</div>
                </div>

                {/* Score badge */}
                <div
                  className="font-mono text-sm px-3 py-1.5"
                  style={{
                    background: 'rgba(212, 148, 58, 0.15)',
                    color: 'var(--orange)',
                  }}
                >
                  {t.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
