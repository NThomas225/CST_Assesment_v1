import { useState } from 'react';
import { LINKS, MODULES, PRICING, STRIPE_NOTE, moduleLessonCount } from '../../data/course';
import { useProgress } from '../../hooks/useProgress';
import { Arrow, CheckIcon, LockIcon, PillButton, ProgressBar, Reveal, SectionHead, SplitLines, TechLabel } from '../../components/academy/bits';

const DAMAGE_TYPES = [
  {
    key: 'chips',
    label: 'Chips & Gouges',
    surface: 'Baths, worktops, doors, brickwork',
    route: 'Structural two-part filler, profile re-building, colour match and topcoat.',
    modules: ['01', '02', '04'],
  },
  {
    key: 'scratches',
    label: 'Scratches & Scuffs',
    surface: 'Wood, laminate, UPVC, powder coat',
    route: 'Filler or hard wax, grain replication, sheen-matched sealing coats.',
    modules: ['01', '03'],
  },
  {
    key: 'burns',
    label: 'Burns & Heat Damage',
    surface: 'Worktops, baths, laminate',
    route: 'Cut back to sound material, rebuild, re-colour and refinish invisibly.',
    modules: ['01', '04'],
  },
  {
    key: 'spray',
    label: 'Full Resurfacing',
    surface: 'Baths, trays, panels, frames',
    route: 'Decontamination, keying, masking and sprayed 2K topcoat systems.',
    modules: ['02'],
  },
];

export default function Home() {
  const { unlocked, moduleProgress } = useProgress();
  const [damage, setDamage] = useState(DAMAGE_TYPES[0]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            src="/assets/video/montage.mp4"
            poster="/assets/video/montage-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep))] via-[hsl(var(--navy-deep)/0.55)] to-[hsl(var(--navy-deep)/0.35)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1272px] px-4 md:px-6 pb-16 pt-40">
          <Reveal>
            <TechLabel>City Surface Training · Online Academy</TechLabel>
          </Reveal>
          <Reveal as="h2">
            <h1 className="mt-6 font-display font-semibold uppercase leading-[0.95] text-[clamp(2.6rem,7vw,5.5rem)] tracking-tight">
              <SplitLines lines={['Repair it so well', 'it was never there.']} />
            </h1>
          </Reveal>
          <Reveal>
            <p className="fade-up mt-6 max-w-xl text-lg text-[hsl(var(--bone)/0.8)]" style={{ '--d': '0.25s' } as React.CSSProperties}>
              The interactive course in professional surface restoration — filmed in our training
              centre and taught with the exact methods our technicians use on site every day.
            </p>
          </Reveal>
          <Reveal>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ '--d': '0.4s' } as React.CSSProperties}>
              <PillButton label="Start the Free Module" href="#/academy/module/fundamentals" />
              <PillButton label={unlocked ? 'Continue My Course' : 'See Full Course'} href="#/academy/course" variant="ghost" />
            </div>
          </Reveal>

          <Reveal>
            <div className="fade-up mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-[hsl(var(--bone)/0.15)]" style={{ '--d': '0.55s' } as React.CSSProperties}>
              {[
                ['04', 'Modules'],
                [String(moduleLessonCount()), 'Lessons'],
                ['80+', 'Quiz questions'],
                ['01', 'Free taster'],
              ].map(([n, l]) => (
                <div key={l} className="pt-5 pr-6">
                  <div className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--ember))]">{n}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.55)] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COURSE INTRODUCTION ── */}
      <section className="py-20 md:py-24 bg-[hsl(var(--navy))]">
        <div className="mx-auto max-w-[1272px] px-4 md:px-6 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <div>
            <TechLabel>Meet your trainer</TechLabel>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold uppercase leading-tight">
              Your course introduction
            </h2>
            <p className="mt-4 text-sm md:text-base text-[hsl(var(--bone)/0.65)] leading-relaxed max-w-md">
              Mark introduces the course and explains the skills you will develop across all four modules.
            </p>
          </div>
          <div className="card-surface overflow-hidden">
            <video
              src="/videos/course-introduction.mp4"
              poster="/videos/course-introduction-poster.jpg"
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video object-contain bg-black"
            />
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section id="modules" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1272px] px-4 md:px-6">
          <SectionHead num="01" label="The Course" />
          <div className="mt-8 grid md:grid-cols-12 gap-8 items-end">
            <Reveal as="h2" className="md:col-span-8">
              <h2 className="font-display font-semibold uppercase leading-[0.98] text-[clamp(2rem,4vw,3.2rem)]">
                <SplitLines lines={['Four disciplines.', 'One invisible standard.']} />
              </h2>
            </Reveal>
            <Reveal className="md:col-span-4">
              <p className="fade-up text-[hsl(var(--bone)/0.65)] text-[0.95rem]">
                Every module is built from real training footage and follows the same loop:
                watch, follow the steps, prove it in the quiz.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 space-y-4">
            {MODULES.map((m, i) => {
              const locked = !m.free && !unlocked;
              const prog = moduleProgress(m.id, m.lessons.map((l) => l.id));
              return (
                <Reveal key={m.id}>
                  <a
                    href={`#/academy/module/${m.id}`}
                    className="module-tile fade-up group grid md:grid-cols-12 gap-0 card-surface !rounded-none overflow-hidden hover:border-[hsl(var(--ember)/0.5)] transition-colors"
                    style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}
                  >
                    <div className="md:col-span-4 relative h-52 md:h-auto img-reveal">
                      <img src={m.image} alt={m.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--navy)/0.4)] md:bg-gradient-to-r" />
                      {m.free && (
                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-[hsl(var(--ember))] text-white px-3 py-1.5 rounded-full">
                          Free taster
                        </span>
                      )}
                      {locked && (
                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-[hsl(var(--navy-deep)/0.85)] border border-[hsl(var(--bone)/0.25)] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <LockIcon className="w-3 h-3" /> Enrolled
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between gap-6">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="font-mono text-[11px] tracking-[0.25em] text-[hsl(var(--ember))]">MODULE {m.index}</div>
                          <h3 className="mt-2 font-display text-2xl md:text-3xl font-medium uppercase leading-tight group-hover:text-[hsl(var(--ember))] transition-colors">
                            {m.title}
                          </h3>
                          <p className="mt-3 text-sm text-[hsl(var(--bone)/0.65)] max-w-xl leading-relaxed">{m.description}</p>
                        </div>
                        <span className="hidden md:flex flex-none w-12 h-12 rounded-full border border-[hsl(var(--bone)/0.25)] items-center justify-center group-hover:bg-[hsl(var(--ember))] group-hover:border-[hsl(var(--ember))] transition-all">
                          <Arrow />
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[hsl(var(--bone)/0.5)]">
                          {m.lessons.length} lessons · {m.lessons.reduce((n, l) => n + l.minutes, 0)} min
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {m.surfaces.slice(0, 4).map((s) => (
                            <span key={s} className="text-[11px] font-mono border border-[hsl(var(--bone)/0.15)] rounded-full px-2.5 py-1 text-[hsl(var(--bone)/0.6)]">
                              {s}
                            </span>
                          ))}
                        </div>
                        {prog.done > 0 && (
                          <div className="flex items-center gap-3 min-w-[160px]">
                            <ProgressBar pct={prog.pct} className="flex-1" />
                            <span className="font-mono text-[11px] text-[hsl(var(--ember))]">{prog.pct}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DAMAGE IDENTIFIER ── */}
      <section className="py-24 md:py-32 bg-[hsl(var(--navy))]">
        <div className="mx-auto max-w-[1272px] px-4 md:px-6">
          <SectionHead num="02" label="Damage Identifier" />
          <Reveal as="h2">
            <h2 className="mt-8 font-display font-semibold uppercase leading-[0.98] text-[clamp(2rem,4vw,3.2rem)]">
              <SplitLines lines={['What are you', 'up against?']} />
            </h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 flex md:flex-col flex-wrap gap-3" role="tablist" aria-label="Damage types">
              {DAMAGE_TYPES.map((d) => (
                <button
                  key={d.key}
                  role="tab"
                  aria-selected={damage.key === d.key}
                  onClick={() => setDamage(d)}
                  className={`text-left rounded-none border px-6 py-5 transition-all duration-200 flex-1 min-w-[45%] md:min-w-0 ${
                    damage.key === d.key
                      ? 'border-[hsl(var(--ember))] bg-[hsl(var(--navy-soft))]'
                      : 'border-[hsl(var(--bone)/0.12)] hover:border-[hsl(var(--bone)/0.35)]'
                  }`}
                >
                  <div className="font-display text-lg uppercase font-medium">{d.label}</div>
                  <div className="mt-1 font-mono text-[11px] text-[hsl(var(--bone)/0.5)]">{d.surface}</div>
                </button>
              ))}
            </div>
            <div className="md:col-span-7 card-surface p-8 md:p-10 flex flex-col justify-between" role="tabpanel">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--ember))]">The repair route</span>
                <p className="mt-4 font-display text-2xl md:text-3xl font-medium leading-snug">{damage.route}</p>
                <p className="mt-5 text-sm text-[hsl(var(--bone)/0.65)]">
                  Covered in module{damage.modules.length > 1 ? 's' : ''}{' '}
                  {damage.modules.map((m, i) => (
                    <span key={m}>
                      <span className="text-[hsl(var(--ember))] font-mono">{m}</span>
                      {i < damage.modules.length - 1 ? ' · ' : ''}
                    </span>
                  ))}{' '}
                  — with step-by-step photo and video tutorials from real training sessions.
                </p>
              </div>
              <div className="mt-8">
                <PillButton label="Open the Course" href="#/academy/course" variant="ghost" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PATHWAY ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1272px] px-4 md:px-6">
          <SectionHead num="03" label="Your Pathway" />
          <Reveal as="h2">
            <h2 className="mt-8 font-display font-semibold uppercase leading-[0.98] text-[clamp(2rem,4vw,3.2rem)]">
              <SplitLines lines={['Learn online.', 'Prove it. Do it for real.']} />
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-4">
            {[
              {
                n: '01',
                t: 'Study the modules',
                d: 'Work through four disciplines with video, photography and step-by-step method — at your own pace, on any device.',
                cta: { label: 'Browse modules', href: '#/academy/course', external: false },
              },
              {
                n: '02',
                t: 'Get certified',
                d: 'Take the formal skills assessment at certify.surfacerepaircourse.uk and earn a competency score employers trust.',
                cta: { label: 'Take the assessment', href: LINKS.certify, external: false },
              },
              {
                n: '03',
                t: 'Train hands-on',
                d: 'Put it into practice on the 5-day Elite Repair Course — at our training centre or on your site, kit included.',
                cta: { label: 'citysurfacetraining.com', href: LINKS.training, external: true },
              },
            ].map((s, i) => (
              <Reveal key={s.n}>
                <div className="fade-up h-full min-w-0 card-surface p-8 flex flex-col" style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="font-mono text-[11px] tracking-[0.25em] text-[hsl(var(--ember))]">( {s.n} )</span>
                  <h3 className="mt-4 font-display text-2xl font-medium uppercase">{s.t}</h3>
                  <p className="mt-3 text-sm text-[hsl(var(--bone)/0.65)] leading-relaxed flex-1">{s.d}</p>
                  <a
                    href={s.cta.href}
                    {...(s.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--ember))] link-underline w-fit max-w-full"
                  >
                    <span className="break-all">{s.cta.label}</span> <Arrow />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 md:py-32 bg-[hsl(var(--navy))]">
        <div className="mx-auto max-w-[1272px] px-4 md:px-6">
          <SectionHead num="04" label="Enrolment" />
          <div className="mt-12 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <Reveal as="h2">
                <h2 className="font-display font-semibold uppercase leading-[0.98] text-[clamp(2rem,3.5vw,3rem)]">
                  <SplitLines lines={['One price.', 'Every module.']} />
                </h2>
              </Reveal>
              <Reveal>
                <p className="fade-up mt-6 text-[hsl(var(--bone)/0.65)] leading-relaxed">
                  Module 01 is free — start today, no card required. When you're ready, a single
                  enrolment unlocks the complete academy — pay securely online via Stripe. Prefer
                  instalments or group bookings? City Surface Training handles those directly,
                  including Klarna™ payment plans.
                </p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-7">
              <div className="fade-up card-surface p-8 md:p-10 border-[hsl(var(--ember)/0.4)]">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--ember))]">Full Academy Access</span>
                    <div className="mt-2 font-display text-6xl font-semibold">
                      {PRICING.currency}{PRICING.fullCourse}
                      <span className="text-lg text-[hsl(var(--bone)/0.5)] font-normal ml-2">ex VAT</span>
                    </div>
                  </div>
                  <PillButton label="Enrol Now" href={LINKS.stripeEnrol} className="btn-pill--enrol" />
                </div>
                <p className="mt-3 font-mono text-[11px] text-[hsl(var(--bone)/0.55)]">{STRIPE_NOTE}</p>
                <hr className="razor my-8" />
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {PRICING.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 text-sm text-[hsl(var(--bone)/0.8)]">
                      <span className="mt-0.5 text-[hsl(var(--ember))] flex-none"><CheckIcon /></span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-[11px] text-[hsl(var(--bone)/0.45)] leading-relaxed">{PRICING.vatNote}</p>
              </div>
            </Reveal>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--bone)/0.5)] mb-6">Common questions</h3>
            <div className="divide-y divide-[hsl(var(--bone)/0.1)] border-y border-[hsl(var(--bone)/0.1)]">
              {[
                {
                  q: 'Is the free module really free?',
                  a: 'Yes — Module 01 (Surface Repair Fundamentals) is complete and free: four full lessons and a quiz. No card, no expiry.',
                },
                {
                  q: 'How do I unlock the paid modules?',
                  a: 'Enrol online through our secure Stripe checkout and you\'ll receive an access code by email. Enter it once on any module page and the full course unlocks on your device.',
                },
                {
                  q: 'Does this replace the hands-on course?',
                  a: 'No — it complements it. The academy teaches method and theory; the 5-day Elite Repair Course (£2,000 at our centre, kit £950) builds the muscle memory. Academy learners get priority booking.',
                },
                {
                  q: 'Can I get certified from this course?',
                  a: 'The academy prepares you for the formal skills assessment at certify.surfacerepaircourse.uk, where your competency is independently scored and certified.',
                },
                {
                  q: 'What devices does it work on?',
                  a: 'Any modern browser — phone, tablet or desktop. Your progress is saved on the device you\'re using.',
                },
              ].map((f, i) => (
                <div key={i}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    aria-expanded={faqOpen === i}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  >
                    <span className="font-display text-lg font-medium uppercase group-hover:text-[hsl(var(--ember))] transition-colors">{f.q}</span>
                    <span
                      className={`flex-none w-8 h-8 rounded-full border border-[hsl(var(--bone)/0.25)] flex items-center justify-center transition-transform duration-300 ${
                        faqOpen === i ? 'rotate-45 border-[hsl(var(--ember))] text-[hsl(var(--ember))]' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: faqOpen === i ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-sm text-[hsl(var(--bone)/0.65)] leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
