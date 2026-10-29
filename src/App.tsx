import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { useHashRoute, type Route } from './hooks/useHashRoute';

import TunnelBackground from './sections/TunnelBackground';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Modules from './sections/Modules';
import Competencies from './sections/Competencies';
import AssessmentDemo from './sections/AssessmentDemo';
import Testimonials from './sections/Testimonials';
import AcademyTeaser from './sections/AcademyTeaser';
import Pricing from './sections/Pricing';
import Footer from './sections/Footer';

import AcademyNav from './components/academy/AcademyNav';
import AcademyHome from './pages/academy/AcademyHome';
import AcademyDashboard from './pages/academy/AcademyDashboard';
import AcademyModule from './pages/academy/AcademyModule';
import AcademyLesson from './pages/academy/AcademyLesson';

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Animation frame loop for Lenis
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Refresh ScrollTrigger after everything loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Three.js Tunnel Background - fixed behind everything */}
      <TunnelBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <AcademyTeaser />
        <HowItWorks />
        <Modules />
        <Competencies />
        <AssessmentDemo />
        <Testimonials />
        <Pricing />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

function AcademyPage({ route }: { route: Route }) {
  switch (route.name) {
    case 'academy-course':
      return <AcademyDashboard />;
    case 'academy-module':
      return <AcademyModule moduleId={route.moduleId} />;
    case 'academy-lesson':
      return <AcademyLesson moduleId={route.moduleId} lessonId={route.lessonId} />;
    default:
      return <AcademyHome />;
  }
}

export default function App() {
  const route = useHashRoute();

  // Scroll to top on every route change
  const routeKey =
    route.name === 'academy-module'
      ? `m:${route.moduleId}`
      : route.name === 'academy-lesson'
        ? `l:${route.moduleId}/${route.lessonId}`
        : route.name;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routeKey]);

  if (route.name === 'home') {
    return (
      <>
        <Landing />
        <SpeedInsights />
      </>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[hsl(var(--navy-deep))] text-[hsl(var(--bone))]">
      <AcademyNav routeName={route.name} />
      <AcademyPage route={route} />
      <Footer />
      <SpeedInsights />
    </div>
  );
}
