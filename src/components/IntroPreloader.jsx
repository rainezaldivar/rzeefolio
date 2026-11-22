import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import RZMonogram from "./RZMonogram";

const INTRO_DURATION = 1100;
const LOAD_TIMEOUT = 1300;
const EXIT_DURATION = 450;
const introEase = [0.22, 1, 0.36, 1];

export default function IntroPreloader({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let active = true;
    let firstFrame;
    let secondFrame;
    let introTimer;
    let loadTimer;
    const previousOverflow = document.body.style.overflow;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.body.style.overflow = "hidden";

    const finishForReducedMotion = () => {
      if (motionPreference.matches) onComplete(true);
    };
    motionPreference.addEventListener("change", finishForReducedMotion);
    if (motionPreference.matches) {
      finishForReducedMotion();
      return () => {
        document.body.style.overflow = previousOverflow;
        motionPreference.removeEventListener("change", finishForReducedMotion);
      };
    }

    const painted = new Promise((resolve) => {
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(resolve);
      });
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const ready = Promise.all([painted, fontsReady]).catch(() => {});
    const timeout = new Promise((resolve) => {
      loadTimer = window.setTimeout(resolve, LOAD_TIMEOUT);
    });
    const introduction = new Promise((resolve) => {
      introTimer = window.setTimeout(resolve, INTRO_DURATION);
    });

    Promise.all([introduction, Promise.race([ready, timeout])]).then(() => {
      if (active && !motionPreference.matches) setLeaving(true);
    });

    return () => {
      active = false;
      document.body.style.overflow = previousOverflow;
      motionPreference.removeEventListener("change", finishForReducedMotion);
      window.clearTimeout(introTimer);
      window.clearTimeout(loadTimer);
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!leaving) return;
    const fallback = window.setTimeout(() => onComplete(true), EXIT_DURATION);
    return () => window.clearTimeout(fallback);
  }, [leaving, onComplete]);

  return (
    <Motion.div
      className={`intro-loader fixed inset-0 z-[2147483646] grid h-screen w-screen place-items-center overflow-hidden bg-portfolio-bg px-gutter text-portfolio-ink${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Opening Raine Zaldivar's portfolio"
      initial={false}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.42, ease: introEase }}
      onAnimationComplete={() => { if (leaving) onComplete(true); }}
    >
      <Motion.div
        className="flex w-full max-w-[22rem] flex-col items-center text-center"
        aria-hidden="true"
        initial={false}
        animate={leaving ? { opacity: 0, y: -12, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: introEase }}
      >
        <Motion.div
          className="intro-loader-mark grid place-items-center"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.56, delay: 0.08, ease: introEase }}
        >
          <RZMonogram />
        </Motion.div>
        <Motion.p
          className="mt-5 font-display text-[clamp(2rem,5vw,2.65rem)] font-semibold leading-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.46, delay: 0.39, ease: introEase }}
        >
          Raine Zaldivar
        </Motion.p>
        <Motion.span
          className="mt-2 font-sans text-[0.66rem] font-semibold leading-[1.4] tracking-[0.18em] text-portfolio-muted uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.53, ease: introEase }}
        >
          Portfolio
        </Motion.span>
        <Motion.span
          className="intro-loader-rule mt-6 block h-px w-[4.5rem] overflow-hidden bg-portfolio-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.57 }}
        />
      </Motion.div>
    </Motion.div>
  );
}
