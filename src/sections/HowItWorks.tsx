import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Brain, Award, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Register',
    description: 'Create your profile and select your target discipline',
  },
  {
    icon: Brain,
    title: 'Assess',
    description: 'Complete theory and practical scenario tests',
  },
  {
    icon: Award,
    title: 'Certify',
    description: 'Receive detailed feedback and competency score',
  },
  {
    icon: Briefcase,
    title: 'Deploy',
    description: 'Get matched with employers seeking verified technicians',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepsRef.current) return;

    const items = stepsRef.current.querySelectorAll('.step-item');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      const tween = gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
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
      id="how-it-works"
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center py-24 lg:py-32"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/workshop.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10, 10, 10, 0.75)', zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative max-w-[900px] mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <h2
          className="font-sans font-semibold text-[32px] md:text-[48px] text-[var(--white)] mb-16 tracking-tight"
          style={{ letterSpacing: '-1px' }}
        >
          From Assessment to Employment
        </h2>

        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="step-item flex flex-col items-center text-center relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-px border-t border-dashed"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  />
                )}

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ border: '1px solid var(--orange)' }}
                >
                  <Icon className="w-5 h-5 text-[var(--orange)]" />
                </div>

                <h3 className="font-sans font-semibold text-base text-[var(--white)] mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[var(--grey)] leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
