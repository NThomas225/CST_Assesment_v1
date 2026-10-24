import { useState } from 'react';
import type { QuizQuestion } from '../../data/course';
import { PillButton } from './bits';

export default function Quiz({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      onComplete(score, questions.length);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const retake = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card-surface p-8 text-center">
        <div className="font-display text-6xl font-semibold text-[hsl(var(--ember))]">{pct}%</div>
        <p className="mt-2 text-[hsl(var(--bone)/0.75)]">
          {score} of {questions.length} correct
        </p>
        <p className="mt-4 text-sm text-[hsl(var(--bone)/0.6)] max-w-md mx-auto">
          {pct === 100
            ? 'Flawless. You\'ve mastered this lesson — move on to the next.'
            : pct >= 75
            ? 'Strong result. Review the explanations above if anything surprised you.'
            : 'Worth another pass — re-read the lesson steps and retake the quiz.'}
        </p>
        <div className="mt-6 flex justify-center">
          <PillButton label="Retake Quiz" variant="ghost" onClick={retake} arrow={false} />
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--ember))]">
          Question {idx + 1} / {questions.length}
        </span>
        <div className="flex gap-1.5" aria-hidden="true">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`w-6 h-[3px] rounded-full ${i < idx ? 'bg-[hsl(var(--ember))]' : i === idx ? 'bg-[hsl(var(--bone)/0.6)]' : 'bg-[hsl(var(--bone)/0.15)]'}`}
            />
          ))}
        </div>
      </div>

      <h3 className="font-display text-xl md:text-2xl font-medium leading-snug mb-6">{q.q}</h3>

      <div className="space-y-3" role="group" aria-label="Answer options">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.answer;
          const revealed = picked !== null;
          let cls = 'border-[hsl(var(--bone)/0.15)] hover:border-[hsl(var(--ember)/0.7)] hover:bg-[hsl(var(--navy-soft))]';
          if (revealed && isCorrect) cls = 'border-emerald-400/70 bg-emerald-400/10';
          else if (revealed && isPicked && !isCorrect) cls = 'border-red-400/70 bg-red-400/10';
          else if (revealed) cls = 'border-[hsl(var(--bone)/0.1)] opacity-55';
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`w-full text-left flex items-start gap-4 rounded-lg border px-5 py-4 transition-all duration-200 ${cls}`}
            >
              <span
                className={`flex-none mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] ${
                  revealed && isCorrect
                    ? 'border-emerald-400 text-emerald-300'
                    : revealed && isPicked && !isCorrect
                    ? 'border-red-400 text-red-300'
                    : 'border-[hsl(var(--bone)/0.3)] text-[hsl(var(--bone)/0.6)]'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[0.95rem] leading-relaxed">{opt}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-6 rounded-lg bg-[hsl(var(--navy-deep))] border border-[hsl(var(--bone)/0.1)] p-5">
          <p className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-2 ${picked === q.answer ? 'text-emerald-300' : 'text-red-300'}`}>
            {picked === q.answer ? 'Correct' : 'Not quite'}
          </p>
          <p className="text-sm text-[hsl(var(--bone)/0.75)] leading-relaxed">{q.why}</p>
          <div className="mt-5 flex justify-end">
            <PillButton label={idx + 1 >= questions.length ? 'See Result' : 'Next Question'} onClick={next} />
          </div>
        </div>
      )}
    </div>
  );
}
