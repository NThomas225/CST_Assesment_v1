import { useEffect, useState } from 'react';
import { MODULES, type Lesson } from '../../data/course';
import { useProgress } from '../../hooks/useProgress';
import LockScreen from '../../components/academy/LockScreen';
import Quiz from '../../components/academy/Quiz';
import { PillButton, Reveal, TechLabel } from '../../components/academy/bits';

export default function LessonPage({ moduleId, lessonId }: { moduleId: string; lessonId: string }) {
  const module = MODULES.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);
  const { unlocked, completeLesson, recordQuiz, quiz } = useProgress();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    setQuizDone(false);
    setLightbox(null);
  }, [moduleId, lessonId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!module || !lesson) {
    return (
      <main className="pt-40 pb-24 text-center">
        <p className="font-display text-2xl uppercase">Lesson not found</p>
        <a href="#/academy/course" className="mt-4 inline-block text-[hsl(var(--ember))] link-underline font-mono text-sm uppercase tracking-[0.15em]">Back to course</a>
      </main>
    );
  }

  if (!module.free && !unlocked) {
    return (
      <main className="pt-36 pb-24">
        <div className="mx-auto max-w-[1272px] px-4 md:px-6">
          <LockScreen module={module} />
        </div>
      </main>
    );
  }

  const key = `${module.id}/${lesson.id}`;
  const idx = module.lessons.findIndex((l) => l.id === lesson.id);
  const prev: Lesson | undefined = module.lessons[idx - 1];
  const next: Lesson | undefined = module.lessons[idx + 1];
  const best = quiz[key];

  const onQuizComplete = (score: number, total: number) => {
    recordQuiz(key, score, total);
    setQuizDone(true);
    if (score / total >= 0.75) completeLesson(key);
  };

  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-[900px] px-4 md:px-6">
        {/* breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--bone)/0.55)]" aria-label="Breadcrumb">
          <a href="#/academy/course" className="hover:text-[hsl(var(--ember))] transition-colors">Course</a>
          <span aria-hidden="true">/</span>
          <a href={`#/academy/module/${module.id}`} className="hover:text-[hsl(var(--ember))] transition-colors">{module.title}</a>
          <span aria-hidden="true">/</span>
          <span className="text-[hsl(var(--ember))]">Lesson {idx + 1}</span>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <TechLabel>Lesson {String(idx + 1).padStart(2, '0')} · {lesson.minutes} min</TechLabel>
            {best && (
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] border border-emerald-400/40 text-emerald-300 rounded-full px-3 py-1.5">
                Best quiz {best.score}/{best.total}
              </span>
            )}
          </div>
          <h1 className="mt-5 font-display font-semibold uppercase leading-[0.98] text-[clamp(1.8rem,4vw,3rem)]">
            {lesson.title}
          </h1>
          <p className="mt-5 text-lg text-[hsl(var(--bone)/0.75)] leading-relaxed">{lesson.intro}</p>
        </header>

        {lesson.tools && (
          <div className="mt-8 card-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--ember))]">Kit for this lesson</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {lesson.tools.map((t) => (
                <li key={t} className="text-[12px] font-mono border border-[hsl(var(--bone)/0.15)] rounded-full px-3 py-1.5 text-[hsl(var(--bone)/0.7)]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* steps */}
        <div className="mt-14 space-y-14">
          {lesson.steps.map((step, i) => (
            <Reveal key={i} as="section">
              <div className="fade-up">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl font-semibold text-[hsl(var(--ember))]">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-medium uppercase leading-tight">{step.title}</h2>
                </div>
                <p className="mt-4 text-[hsl(var(--bone)/0.78)] leading-relaxed">{step.body}</p>
                {step.image && (
                  <figure className="mt-6">
                    <button
                      onClick={() => setLightbox(step.image!)}
                      className="img-reveal block w-full rounded-none overflow-hidden cursor-zoom-in"
                      aria-label="Enlarge image"
                    >
                      <img src={step.image} alt={step.caption ?? step.title} className="w-full object-cover max-h-[480px]" loading="lazy" />
                    </button>
                    {step.caption && (
                      <figcaption className="mt-3 font-mono text-[11px] text-[hsl(var(--bone)/0.5)] leading-relaxed">
                        {step.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {step.video && (
                  <figure className="mt-6">
                    <video
                      src={step.video.src}
                      poster={step.video.poster}
                      controls
                      preload="metadata"
                      className="w-full rounded-none max-h-[520px] bg-black"
                    />
                    <figcaption className="mt-3 font-mono text-[11px] text-[hsl(var(--bone)/0.5)] leading-relaxed">
                      {step.video.caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {lesson.tips && (
          <div className="mt-14 card-surface border-[hsl(var(--ember)/0.35)] p-6 md:p-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--ember))]">Technician's tips</h2>
            <ul className="mt-4 space-y-3">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[hsl(var(--bone)/0.8)] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(var(--ember))] flex-none" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* quiz */}
        <section className="mt-16" aria-label="Lesson quiz">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs tracking-[0.2em] text-[hsl(var(--ember))]">( QUIZ )</span>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[hsl(var(--bone)/0.6)]">
              Score 75%+ to complete this lesson
            </span>
            <span className="razor flex-1" />
          </div>
          <Quiz questions={lesson.quiz} onComplete={onQuizComplete} />
          {quizDone && (
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.5)]">
              {quiz[key] && quiz[key].score / quiz[key].total >= 0.75
                ? 'Lesson marked complete'
                : 'Score 75% or more to mark this lesson complete'}
            </p>
          )}
        </section>

        {/* prev / next */}
        <nav className="mt-16 grid sm:grid-cols-2 gap-4" aria-label="Lesson navigation">
          {prev ? (
            <a href={`#/academy/module/${module.id}/lesson/${prev.id}`} className="card-surface p-6 group hover:border-[hsl(var(--ember)/0.5)] transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.5)]">← Previous</span>
              <p className="mt-2 font-display text-lg uppercase font-medium group-hover:text-[hsl(var(--ember))] transition-colors">{prev.title}</p>
            </a>
          ) : (
            <a href={`#/academy/module/${module.id}`} className="card-surface p-6 group hover:border-[hsl(var(--ember)/0.5)] transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.5)]">← Module</span>
              <p className="mt-2 font-display text-lg uppercase font-medium group-hover:text-[hsl(var(--ember))] transition-colors">All lessons</p>
            </a>
          )}
          {next ? (
            <a href={`#/academy/module/${module.id}/lesson/${next.id}`} className="card-surface p-6 text-right group hover:border-[hsl(var(--ember)/0.5)] transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.5)]">Next →</span>
              <p className="mt-2 font-display text-lg uppercase font-medium group-hover:text-[hsl(var(--ember))] transition-colors">{next.title}</p>
            </a>
          ) : (
            <a href={`#/academy/module/${module.id}`} className="card-surface p-6 text-right group hover:border-[hsl(var(--ember)/0.5)] transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.5)]">Finished →</span>
              <p className="mt-2 font-display text-lg uppercase font-medium group-hover:text-[hsl(var(--ember))] transition-colors">Back to module</p>
            </a>
          )}
        </nav>

        <div className="mt-10 flex justify-center">
          <PillButton label="Course Dashboard" href="#/academy/course" variant="ghost" arrow={false} />
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-[hsl(var(--navy-deep)/0.95)] backdrop-blur flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-[hsl(var(--bone)/0.3)] flex items-center justify-center hover:border-[hsl(var(--ember))] hover:text-[hsl(var(--ember))] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
