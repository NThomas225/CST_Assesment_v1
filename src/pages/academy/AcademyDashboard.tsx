import { MODULES, moduleLessonCount } from '../../data/course';
import { useProgress } from '../../hooks/useProgress';
import { Arrow, CheckIcon, LockIcon, PillButton, ProgressBar, SectionHead, TechLabel } from '../../components/academy/bits';

export default function Course() {
  const { unlocked, completed, moduleProgress } = useProgress();
  const totalLessons = moduleLessonCount();
  const pct = Math.round((completed.length / totalLessons) * 100);

  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-[1272px] px-4 md:px-6">
        <TechLabel>Course Dashboard</TechLabel>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display font-semibold uppercase leading-[0.95] text-[clamp(2.4rem,5vw,4rem)]">
            My <span className="text-[hsl(var(--ember))]">Course</span>
          </h1>
          <div className="min-w-[240px]">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.55)] mb-2">
              <span>{completed.length} / {totalLessons} lessons</span>
              <span className="text-[hsl(var(--ember))]">{pct}%</span>
            </div>
            <ProgressBar pct={pct} />
          </div>
        </div>
        {!unlocked && (
          <p className="mt-4 text-sm text-[hsl(var(--bone)/0.6)] max-w-2xl">
            Module 01 is open to everyone. Modules 02–05 unlock with full enrolment — your progress
            is saved on this device as you go.
          </p>
        )}
        {pct === 100 && (
          <div className="mt-8 card-surface border-[hsl(var(--ember)/0.5)] p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-xl uppercase font-medium">Course complete — outstanding work.</p>
              <p className="text-sm text-[hsl(var(--bone)/0.6)] mt-1">Ready for the formal skills assessment?</p>
            </div>
            <PillButton label="Get Certified" href="#/" />
          </div>
        )}

        <div className="mt-14">
          <SectionHead num="01" label="Modules" />
          <div className="mt-8 grid gap-4">
            {MODULES.map((m) => {
              const locked = !m.free && !unlocked;
              const prog = moduleProgress(m.id, m.lessons.map((l) => l.id));
              return (
                <a
                  key={m.id}
                  href={`#/academy/module/${m.id}`}
                  className="group card-surface p-6 md:p-7 grid md:grid-cols-12 gap-6 items-center hover:border-[hsl(var(--ember)/0.5)] transition-colors"
                >
                  <div className="md:col-span-1">
                    <span className="font-display text-4xl font-semibold text-[hsl(var(--bone)/0.25)] group-hover:text-[hsl(var(--ember))] transition-colors">
                      {m.index}
                    </span>
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="font-display text-xl md:text-2xl font-medium uppercase group-hover:text-[hsl(var(--ember))] transition-colors">
                      {m.title}
                    </h2>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-[hsl(var(--bone)/0.5)]">{m.strap}</p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex justify-between font-mono text-[11px] text-[hsl(var(--bone)/0.55)] mb-2">
                      <span>{prog.done}/{prog.total} lessons</span>
                      <span>{prog.pct}%</span>
                    </div>
                    <ProgressBar pct={prog.pct} />
                  </div>
                  <div className="md:col-span-2 flex md:justify-end">
                    {locked ? (
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] border border-[hsl(var(--bone)/0.2)] rounded-full px-4 py-2 text-[hsl(var(--bone)/0.6)]">
                        <LockIcon className="w-3.5 h-3.5" /> Enrolled
                      </span>
                    ) : prog.pct === 100 ? (
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] bg-emerald-400/15 border border-emerald-400/40 rounded-full px-4 py-2 text-emerald-300">
                        <CheckIcon className="w-3.5 h-3.5" /> Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[hsl(var(--ember))]">
                        {prog.done > 0 ? 'Continue' : m.free ? 'Start free' : 'Start'} <Arrow />
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
