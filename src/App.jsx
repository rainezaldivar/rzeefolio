import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kuhaku from "./components/Kuhaku";
import About from "./components/About";
import Works from "./components/Works";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import SakuraPetals from "./components/SakuraPetals";
import BreezeBackdrop from "./components/BreezeBackdrop";
import IntroPreloader from "./components/IntroPreloader";
import useScrollReveals from "./hooks/useScrollReveals";

// The sun and moon share one CSS orbit behind the portfolio content.
function CelestialCycle() {
  return (
    <div className="celestial-sky" aria-hidden="true">
      <div className="celestial-stars">
        {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
      </div>
      <div className="celestial-orbit">
        <span className="celestial-sun" />
        <svg className="celestial-moon" viewBox="0 0 64 64" focusable="false">
          <path d="M50 53C34 51 24 39 24 23c0-6 1-11 4-16C14 9 4 20 4 34c0 16 13 29 29 29 7 0 13-3 17-10Z" />
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const reduceMotion = useReducedMotion();
  useScrollReveals();

  useEffect(() => {
    // The sections mount after the browser's initial fragment lookup.
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previousBehavior;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {!introDone && <IntroPreloader onComplete={setIntroDone} />}
      <Motion.div
        className="site-shell"
        inert={!introDone}
        aria-busy={!introDone}
        initial={false}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: introDone && !reduceMotion ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <CelestialCycle />
        <BreezeBackdrop />
        <SakuraPetals />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Works />
          <Certificates />
          <Kuhaku />
        </main>
        <Contact />
      </Motion.div>
      {introDone && <CustomCursor />}
    </>
  );
}
