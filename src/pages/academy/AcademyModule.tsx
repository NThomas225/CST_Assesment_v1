import { MODULES } from '../../data/course';
import { useProgress } from '../../hooks/useProgress';
import LockScreen from '../../components/academy/LockScreen';
import { Arrow, CheckIcon, LockIcon, ProgressBar, TechLabel } from '../../components/academy/bits';

export default function ModulePage({ moduleId }: { moduleId: string }) {
  const module = MODULES.find((m) => m.id === moduleId);
  const { unlocked, isCompleted, moduleProgress } = useProgress();

  if (!module) {
    return (
      <main className="pt-40 pb-24 text-center">
        <p className="font-display text-2xl uppercase">Module not found</p>
        <a href="#/academy/course" className="mt-4 inline-block text-[hsl(var(--ember))] link-underline font-mono text-sm uppercase tracking-[0.15em]">Back to course</a>
      </main>
    );
  }

  const locked = !module.free && !unlocked;
  const prog = moduleProgress(module.id, module.lessons.map((l) => l.id));
  const totalMin = module.lessons.reduce((n, l) => n + l.minutes, 0);

  return (
    <main className="pb-24">
      {/* module hero */}
      <section className="relative min-h-[52dvh] flex items-end overflow-hidden">
        <img src={module.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep))] via-[hsl(var(--navy-deep)/0.6)] to-[hsl(var(--navy-deep)/0.25)]" />
        <div className="relative mx-auto w-full max-w-[1272px] px-4 md:px-6 pb-12 pt-44">
          <a href="#/academy/course" className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.6)] hover:text-[hsl(var(--ember))] transition-colors link-underline">
            ← Course
          </a>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <TechLabel>Module {module.index}</TechLabel>
            {module.free ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] bg-[hsl(var(--ember))] text-white px-3 py-1.5 rounded-full">Free taster</span>
            ) : locked ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] border border-[hsl(var(--bone)/0.3)] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <LockIcon className="w-3 h-3" /> Enrolled learners
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-display font-semibold uppercase leading-[0.95] text-[clamp(2.2rem,5vw,4rem)] max-w-4xl">
            {module.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[hsl(var(--bone)/0.75)] leading-relaxed">{module.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.55)]">
              {module.lessons.length} lessons · {totalMin} min total
            </span>
            <div className="flex items-center gap-3 min-w-[200px]">
              <ProgressBar pct={prog.pct} className="flex-1" />
              <span className="font-mono text-[11px] text-[hsl(var(--ember))]">{prog.pct}%</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1272px] px-4 md:px-6 mt-14">
        {/* trainer intro */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <div>
            <TechLabel>Meet your trainer</TechLabel>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold uppercase leading-tight">
              Module {module.index} introduction
            </h2>
            <p className="mt-3 text-sm text-[hsl(var(--bone)/0.6)] leading-relaxed max-w-md">
              Your instructor walks you through what this module covers and the skills you will take away.
            </p>
          </div>
          <div className="card-surface overflow-hidden">
            <video
              src={`/videos/intro-${module.index}.mp4`}
              poster={module.image}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video object-contain bg-black"
            />
          </div>
        </div>

        {locked ? (
          <LockScreen module={module} />
        ) : (
          <div className="grid gap-4">
            {module.lessons.map((lesson, i) => {
              const key = `${module.id}/${lesson.id}`;
              const done = isCompleted(key);
              return (
                <a
                  key={lesson.id}
                  href={`#/academy/module/${module.id}/lesson/${lesson.id}`}
                  className="group card-surface p-6 md:p-7 flex items-center gap-6 hover:border-[hsl(var(--ember)/0.5)] transition-colors"
                >
                  <span
                    className={`flex-none w-11 h-11 rounded-full border flex items-center justify-center font-mono text-sm transition-colors ${
                      done
                        ? 'bg-emerald-400/15 border-emerald-400/50 text-emerald-300'
                        : 'border-[hsl(var(--bone)/0.25)] text-[hsl(var(--bone)/0.6)] group-hover:border-[hsl(var(--ember))] group-hover:text-[hsl(var(--ember))]'
                    }`}
                  >
                    {done ? <CheckIcon className="w-5 h-5" /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-xl md:text-2xl font-medium uppercase group-hover:text-[hsl(var(--ember))] transition-colors">
                      {lesson.title}
                    </h2>
                    <p className="mt-1 text-sm text-[hsl(var(--bone)/0.55)] line-clamp-1">{lesson.intro}</p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1.5 flex-none">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[hsl(var(--bone)/0.5)]">
                      {lesson.minutes} min
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[hsl(var(--bone)/0.5)]">
                      {lesson.steps.length} steps · {lesson.quiz.length} quiz
                    </span>
                  </div>
                  <span className="hidden md:flex flex-none w-10 h-10 rounded-full border border-[hsl(var(--bone)/0.2)] items-center justify-center group-hover:bg-[hsl(var(--ember))] group-hover:border-[hsl(var(--ember))] transition-all">
                    <Arrow />
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {/* adjacent modules */}
        <div className="mt-16 grid sm:grid-cols-2 gap-4">
          {MODULES.filter((m) => m.id !== module.id)
            .slice(0, 2)
            .map((m) => (
              <a key={m.id} href={`#/academy/module/${m.id}`} className="group module-tile card-surface overflow-hidden">
                <div className="relative h-36">
                  <img src={m.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))] to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--ember))]">MODULE {m.index}</span>
                    <p className="font-display text-lg uppercase font-medium group-hover:text-[hsl(var(--ember))] transition-colors">{m.title}</p>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </main>
  );
}
