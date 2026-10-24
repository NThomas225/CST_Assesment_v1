import { useSyncExternalStore } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'academy' }
  | { name: 'academy-course' }
  | { name: 'academy-module'; moduleId: string }
  | { name: 'academy-lesson'; moduleId: string; lessonId: string };

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getSnapshot() {
  return window.location.hash;
}

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (parts[0] !== 'academy') return { name: 'home' };
  if (parts.length === 1) return { name: 'academy' };
  if (parts[1] === 'course') return { name: 'academy-course' };
  if (parts[1] === 'module' && parts[2]) {
    if (parts[3] === 'lesson' && parts[4]) {
      return { name: 'academy-lesson', moduleId: parts[2], lessonId: parts[4] };
    }
    return { name: 'academy-module', moduleId: parts[2] };
  }
  return { name: 'academy' };
}

export function useHashRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getSnapshot);
  return parseRoute(hash);
}
