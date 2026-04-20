import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import TunnelBackground from './sections/TunnelBackground';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Modules from './sections/Modules';
import Competencies from './sections/Competencies';
import AssessmentDemo from './sections/AssessmentDemo';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger after everything loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      lenis.destroy();
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
