import { useCallback, useSyncExternalStore } from 'react';
import { ACCESS_CODES } from '../data/course';

export interface QuizRecord {
  score: number;
  total: number;
}

interface ProgressState {
  completed: string[]; // "moduleId/lessonId"
  quiz: Record<string, QuizRecord>; // "moduleId/lessonId" -> best score
  unlocked: boolean;
}

const KEY = 'sra-progress-v1';

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return { completed: p.completed ?? [], quiz: p.quiz ?? {}, unlocked: !!p.unlocked };
    }
  } catch {
    /* ignore */
  }
  return { completed: [], quiz: {}, unlocked: false };
}

/* ── tiny shared store so every component sees the same progress ── */
let state: ProgressState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function setState(updater: (s: ProgressState) => ProgressState) {
  const next = updater(state);
  if (next === state) return;
  state = next;
  persist();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useProgress() {
  const s = useSyncExternalStore(subscribe, () => state);

  const completeLesson = useCallback((key: string) => {
    setState((prev) => (prev.completed.includes(key) ? prev : { ...prev, completed: [...prev.completed, key] }));
  }, []);

  const recordQuiz = useCallback((key: string, score: number, total: number) => {
    setState((prev) => {
      const existing = prev.quiz[key];
      if (existing && existing.score >= score) return prev;
      return { ...prev, quiz: { ...prev.quiz, [key]: { score, total } } };
    });
  }, []);

  const unlock = useCallback((code: string): boolean => {
    const ok = ACCESS_CODES.includes(code.trim().toUpperCase());
    if (ok) setState((prev) => ({ ...prev, unlocked: true }));
    return ok;
  }, []);

  const isCompleted = useCallback((key: string) => state.completed.includes(key), []);

  const moduleProgress = useCallback((moduleId: string, lessonIds: string[]) => {
    const done = lessonIds.filter((id) => state.completed.includes(`${moduleId}/${id}`)).length;
    return { done, total: lessonIds.length, pct: lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0 };
  }, []);

  return { ...s, completeLesson, recordQuiz, unlock, isCompleted, moduleProgress };
}

export type Progress = ReturnType<typeof useProgress>;
