import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import MouseGlow from './components/MouseGlow';
import DynamicBackground from './components/DynamicBackground';

const CustomCursor = lazy(() => import('./components/CustomCursor'));

const isMobileTouch = typeof window !== 'undefined' && window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function App() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      {!isMobileTouch && <MouseGlow />}
      {!isMobileTouch && <DynamicBackground />}
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
