import { useEffect } from "react";
import { animate, inView } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1];

export default function useScrollReveals() {
  useEffect(() => {
    const elements = [...document.querySelectorAll(".reveal")]
      .filter((element) => !element.classList.contains("is-visible"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !window.IntersectionObserver) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const active = new Map();
    const restore = (element) => {
      const entry = active.get(element);
      if (!entry) return;
      element.style.opacity = entry.opacity;
      element.style.transform = entry.transform;
      element.style.transition = entry.transition;
      active.delete(element);
    };

    const stops = elements.map((element) => inView(element, () => {
      if (element.classList.contains("is-visible")) return;

      const previous = {
        opacity: element.style.opacity,
        transform: element.style.transform,
        transition: element.style.transition,
      };
      element.style.transition = "none";
      element.classList.add("is-visible");

      const playback = animate(element, {
        opacity: [0, 1],
        transform: ["translateY(16px)", "translateY(0px)"],
      }, { duration: 0.7, ease: revealEase });
      active.set(element, { ...previous, playback });
      Promise.resolve(playback).then(() => restore(element), () => restore(element));
    }, { amount: 0.08 }));

    const finishImmediately = () => {
      if (!reducedMotion.matches) return;
      stops.forEach((stop) => stop());
      active.forEach(({ playback }, element) => {
        playback.stop();
        restore(element);
      });
      elements.forEach((element) => element.classList.add("is-visible"));
    };
    reducedMotion.addEventListener("change", finishImmediately);

    return () => {
      reducedMotion.removeEventListener("change", finishImmediately);
      stops.forEach((stop) => stop());
      active.forEach(({ playback }, element) => {
        playback.stop();
        restore(element);
      });
    };
  }, []);
}
