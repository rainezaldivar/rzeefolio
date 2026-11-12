import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kuhaku from "./components/Kuhaku";
import About from "./components/About";
import Works from "./components/Works";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import SakuraPetals from "./components/SakuraPetals";
import SakuraLogo from "./components/SakuraLogo";

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
  const [introPhase, setIntroPhase] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    let firstFrame;
    let secondFrame;
    let fallback;

    // Wait for a painted page and its interface fonts, but never trap visitors
    // if a font request stalls or the tab cannot paint yet.
    const painted = new Promise((resolve) => {
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(resolve);
      });
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const timeout = new Promise((resolve) => {
      fallback = window.setTimeout(resolve, 3000);
    });

    Promise.race([Promise.all([painted, fontsReady]), timeout])
      .catch(() => {})
      .then(() => {
        if (cancelled) return;
        window.clearTimeout(fallback);
        setIntroPhase(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "done" : "leaving");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (introPhase !== "leaving") return;
    const timeout = window.setTimeout(() => setIntroPhase("done"), 350);
    return () => window.clearTimeout(timeout);
  }, [introPhase]);

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

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {introPhase !== "done" && (
        <div
          className={`intro-loader${introPhase === "leaving" ? " is-leaving" : ""}`}
          role="status"
          aria-label="Opening Raine Zaldivar's portfolio"
          aria-hidden={introPhase === "leaving"}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "opacity") {
              setIntroPhase("done");
            }
          }}
        >
          <div className="intro-loader-content" aria-hidden="true">
            <SakuraLogo />
            <p className="intro-loader-name">Raine Zaldivar</p>
            <span className="intro-loader-label">Portfolio</span>
            <span className="intro-loader-rule" />
          </div>
        </div>
      )}
      <div className="site-shell" inert={introPhase === "loading"} aria-busy={introPhase === "loading"}>
        <CelestialCycle />
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
      </div>
      {introPhase === "done" && <CustomCursor />}
    </>
  );
}
