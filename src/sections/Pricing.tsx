import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'STARTER',
    price: 'GH\u20B5 1500',
    period: '',
    subtitle: 'Aptitude screening + 1 module attempt',
    features: [
      'Basic damage identification test',
      '30-minute theory assessment',
      'Instant pass/fail result',
      'Email summary',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'PROFESSIONAL',
    price: 'GH\u20B5 5000',
    period: '/assessment',
    subtitle: 'Full certification + employer network access',
    features: [
      'All 5 module assessments',
      'Detailed competency report',
      'Practical scenario tests',
      'Priority employer matching',
      'Digital certificate',
      '12-month skill profile',
    ],
    cta: 'Enroll Now',
    featured: true,
  },
  {
    name: 'ENTERPRISE',
    price: 'Please enquire for pricing',
    period: '',
    subtitle: 'For training organizations & contractors',
    features: [
      'Bulk candidate assessments',
      'Custom module creation',
      'White-label platform',
      'API access',
      'Dedicated account manager',
      'Analytics dashboard',
    ],
    cta: 'Contact Us',
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.pricing-card');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
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
      id="pricing"
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-16"
      style={{ backgroundColor: 'var(--bg-secondary)', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="font-sans font-semibold text-[32px] md:text-[48px] text-[var(--white)] mb-4 tracking-tight"
            style={{ letterSpacing: '-1px' }}
          >
            Assessment Pricing
          </h2>
          <p className="font-sans text-base text-[var(--grey)]">
            Invest in your skills, verified by industry professionals
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card p-10 lg:p-12"
              style={{
                backgroundColor: plan.featured ? 'var(--bg-card)' : 'transparent',
                border: '1px solid var(--border-subtle)',
                borderTop: plan.featured ? '3px solid var(--orange)' : '1px solid var(--border-subtle)',
                transform: plan.featured ? 'translateY(-8px)' : 'none',
              }}
            >
              {/* Plan name */}
              <div className="font-mono text-xs text-[var(--orange)] tracking-wider mb-4">
                {plan.name}
              </div>

              {/* Price */}
              <div className="font-sans font-semibold text-[40px] lg:text-[48px] text-[var(--white)] mb-2">
                {plan.price}
                {plan.period && (
                  <span className="font-sans font-normal text-base text-[var(--grey)]">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <p className="font-sans text-sm text-[var(--grey)] mb-8">{plan.subtitle}</p>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-[var(--white)]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full font-sans font-medium text-sm uppercase py-4 transition-colors duration-200 cursor-pointer ${
                  plan.featured
                    ? 'bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040]'
                    : 'border border-[var(--grey)] text-[var(--white)] hover:border-[var(--orange)] hover:text-[var(--orange)] bg-transparent'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
