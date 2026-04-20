import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { modules } from '../data/assessment';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AssessmentDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const [currentModule] = useState(modules[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = currentModule.questions[currentQuestionIndex];

  useEffect(() => {
    if (!widgetRef.current) return;

    const tween = gsap.fromTo(
      widgetRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: widgetRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, []);

  const handleSelect = (label: string) => {
    if (submitted) return;
    setSelectedAnswer(label);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentModule.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  const getOptionStyle = (label: string) => {
    if (!submitted) {
      return selectedAnswer === label
        ? { borderColor: 'var(--orange)', background: 'rgba(212, 148, 58, 0.1)' }
        : { borderColor: 'var(--border-subtle)', background: 'transparent' };
    }

    if (label === currentQuestion.correctAnswer) {
      return { borderColor: 'var(--success)', background: 'rgba(76, 175, 80, 0.1)' };
    }

    if (label === selectedAnswer && label !== currentQuestion.correctAnswer) {
      return { borderColor: 'var(--error)', background: 'rgba(239, 83, 80, 0.1)' };
    }

    return { borderColor: 'var(--border-subtle)', background: 'transparent' };
  };

  return (
    <section
      id="assessment-demo"
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-16"
      style={{ backgroundColor: 'var(--bg-secondary)', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="font-sans font-semibold text-[32px] md:text-[48px] text-[var(--white)] mb-4 tracking-tight"
            style={{ letterSpacing: '-1px' }}
          >
            Try a Sample Question
          </h2>
          <p className="font-sans text-base text-[var(--grey)]">
            Experience the assessment format firsthand
          </p>
        </div>

        {/* Quiz Widget */}
        <div
          ref={widgetRef}
          className="max-w-[720px] mx-auto p-8 lg:p-12"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
          {!finished ? (
            <>
              {/* Question counter */}
              <div className="font-mono text-xs text-[var(--orange)] tracking-wider mb-6">
                Question {currentQuestionIndex + 1} of {currentModule.questions.length}
              </div>

              {/* Question text */}
              <p className="font-sans text-lg text-[var(--white)] mb-8 leading-relaxed">
                {currentQuestion.question}
              </p>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option.label)}
                    className="w-full text-left p-4 lg:px-6 transition-all duration-200 cursor-pointer flex items-start gap-4"
                    style={{
                      border: `1px solid ${getOptionStyle(option.label).borderColor}`,
                      background: getOptionStyle(option.label).background,
                    }}
                  >
                    <span
                      className="font-sans font-medium text-sm flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5"
                      style={{
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--white)',
                      }}
                    >
                      {option.label}
                    </span>
                    <span className="font-sans text-[15px] text-[var(--white)] leading-relaxed">
                      {option.text}
                    </span>
                    {submitted && option.label === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5 ml-auto" />
                    )}
                    {submitted && option.label === selectedAnswer && option.label !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 text-[var(--error)] flex-shrink-0 mt-0.5 ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              {/* Submit / Next */}
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="w-full font-sans font-medium text-sm uppercase py-4 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: selectedAnswer ? 'var(--orange)' : 'var(--border-subtle)',
                    color: 'var(--black)',
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <div>
                  {/* Explanation */}
                  <div
                    className="p-4 mb-6"
                    style={{
                      borderLeft: '3px solid var(--success)',
                      background: 'rgba(76, 175, 80, 0.05)',
                    }}
                  >
                    <p className="font-sans text-sm text-[var(--grey)] leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full font-sans font-medium text-sm uppercase py-4 bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Results screen */
            <div className="text-center py-8">
              <div className="font-mono text-5xl text-[var(--orange)] mb-4">
                {Math.round((score / currentModule.questions.length) * 100)}%
              </div>
              <h3 className="font-sans font-semibold text-2xl text-[var(--white)] mb-2">
                Assessment Complete
              </h3>
              <p className="font-sans text-sm text-[var(--grey)] mb-8">
                You scored {score} out of {currentModule.questions.length} questions correctly
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="font-sans font-medium text-sm uppercase px-8 py-4 bg-[var(--orange)] text-[var(--black)] hover:bg-[#E0A040] transition-colors duration-200 cursor-pointer"
                >
                  Try Again
                </button>
                <button
                  onClick={() => {
                    const el = document.querySelector('#pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-sans font-medium text-sm uppercase px-8 py-4 border border-[var(--grey)] text-[var(--white)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors duration-200 cursor-pointer bg-transparent"
                >
                  Full Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
