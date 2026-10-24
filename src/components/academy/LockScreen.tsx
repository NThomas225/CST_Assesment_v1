import { useState } from 'react';
import { LINKS, PRICING, STRIPE_NOTE, type Module } from '../../data/course';
import { useProgress } from '../../hooks/useProgress';
import { LockIcon, PillButton } from './bits';

/* Shown when a learner reaches a locked (paid) module without an access code */
export default function LockScreen({ module }: { module: Module }) {
  const { unlock } = useProgress();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const ok = unlock(code);
    setError(!ok);
    if (!ok) setCode('');
  };

  return (
    <div className="card-surface overflow-hidden">
      <div className="relative h-44 md:h-56">
        <img src={module.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))] to-transparent" />
        <div className="absolute bottom-5 left-6 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[hsl(var(--ember))] flex items-center justify-center text-white">
            <LockIcon className="w-5 h-5" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--ember))]">Module {module.index} · Enrolled learners</p>
            <p className="font-display text-xl uppercase font-medium">{module.title}</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-display text-2xl font-medium uppercase leading-tight">
            This module is part of the <span className="text-[hsl(var(--ember))]">full course</span>
          </h3>
          <p className="mt-3 text-sm text-[hsl(var(--bone)/0.7)] leading-relaxed">
            Module 01 is free forever. Unlock all four modules — every lesson, every quiz and your
            completion record — with a single enrolment.
          </p>
          <ul className="mt-5 space-y-2">
            {PRICING.includes.map((inc) => (
              <li key={inc} className="flex items-start gap-2.5 text-sm text-[hsl(var(--bone)/0.75)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(var(--ember))] flex-none" />
                {inc}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PillButton label={`Enrol — ${PRICING.currency}${PRICING.fullCourse}`} href={LINKS.stripeEnrol} className="btn-pill--enrol" />
            <span className="font-mono text-[11px] text-[hsl(var(--bone)/0.5)] max-w-[220px]">{PRICING.vatNote}</span>
          </div>
          <p className="mt-3 font-mono text-[11px] text-[hsl(var(--bone)/0.55)] flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[hsl(var(--ember))]" aria-hidden="true">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {STRIPE_NOTE}
          </p>
        </div>

        <div className="md:border-l md:border-[hsl(var(--bone)/0.1)] md:pl-8">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--bone)/0.6)]">Already enrolled?</h4>
          <p className="mt-2 text-sm text-[hsl(var(--bone)/0.7)]">
            Enter the access code from your enrolment confirmation to unlock the full course on this device.
          </p>
          <form onSubmit={submit} className="mt-5">
            <label htmlFor="access-code" className="sr-only">Access code</label>
            <input
              id="access-code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              placeholder="e.g. CST-XXXX-0000"
              autoComplete="off"
              className={`w-full rounded-lg bg-[hsl(var(--navy-deep))] border px-4 py-3.5 font-mono text-sm tracking-[0.15em] uppercase placeholder:text-[hsl(var(--bone)/0.3)] focus:outline-none transition-colors ${
                error ? 'border-red-400/70' : 'border-[hsl(var(--bone)/0.2)] focus:border-[hsl(var(--ember))]'
              }`}
            />
            {error && (
              <p className="mt-2 text-sm text-red-300" role="alert">
                That code isn't recognised — check your enrolment email or contact {LINKS.email}.
              </p>
            )}
            <div className="mt-4">
              <PillButton label="Unlock Course" type="submit" variant="ghost" arrow={false} />
            </div>
          </form>
          <p className="mt-6 text-xs text-[hsl(var(--bone)/0.45)] leading-relaxed">
            Prefer to learn hands-on? The same modules are taught in person on the 5-day Elite Repair Course at{' '}
            <a href={LINKS.training} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--ember))] link-underline">citysurfacetraining.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
