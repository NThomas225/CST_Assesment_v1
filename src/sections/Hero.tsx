import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(
        h1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        0.5
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.8
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        1.1
      )
      .to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        1.5
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 xl:px-24"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1280px] mx-auto w-full pt-24">
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--orange)] block mb-6 opacity-0 translate-y-4"
        >
          Certified Surface Restoration Assessment
        </span>

        {/* H1 */}
        <h1
          ref={h1Ref}
          className="font-sans font-semibold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-tight text-[var(--white)] max-w-[680px] mb-6 opacity-0 translate-y-8"
          style={{ letterSpacing: '-1.5px' }}
        >
          Prove Your Skills. Build Your Future.
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-sans text-base lg:text-lg text-[var(--grey)] max-w-[520px] leading-relaxed mb-10 opacity-0 translate-y-6"
        >
          A rigorous assessment platform for aspiring surface restoration technicians. Get evaluated, certified, and connected to employment opportunities.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0 translate-y-6">
          <button
            onClick={() => scrollTo('#assessment-demo')}
            className="font-sans font-medium text-sm uppercase px-10 py-4 bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040] transition-colors duration-200 cursor-pointer"
          >
            Start Free Assessment
          </button>
          <button
            onClick={() => scrollTo('#modules')}
            className="font-sans font-medium text-sm uppercase px-10 py-4 border border-[var(--grey)] text-[var(--white)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors duration-200 cursor-pointer bg-transparent"
          >
            View Modules
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 w-full h-20 border-t border-[var(--border-subtle)] opacity-0 translate-y-6"
        style={{ background: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-around px-6">
          {[
            { value: '1,247+', label: 'Assessments Completed' },
            { value: '87%', label: 'Pass Rate' },
            { value: '5', label: 'Core Modules' },
            { value: 'Ghana', label: 'Launch Market' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-xl md:text-3xl text-[var(--orange)]">{stat.value}</div>
              <div className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-[var(--grey)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
