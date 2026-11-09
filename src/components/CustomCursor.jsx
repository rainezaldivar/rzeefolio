import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import defaultCursor from "../assets/cursor-previews/cursor-default.png";
import hoverCursor from "../assets/cursor-previews/cursor-hover.png";

const interactiveSelector = 'a, button, [role="button"], input:not([type="hidden"]), select, summary, label[for], [data-cursor-hover]';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const lastPosition = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let active = true;
    const update = () => {
      if (!media.matches) {
        setEnabled(false);
        setVisible(false);
        return;
      }
      Promise.all([defaultCursor, hoverCursor].map((src) => new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = src;
      }))).then(() => {
        if (active && media.matches) setEnabled(true);
      }).catch(() => { if (active) setEnabled(false); });
    };
    update();
    media.addEventListener("change", update);
    return () => {
      active = false;
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const syncTarget = () => setPortalTarget(document.querySelector("dialog[open]") ?? document.body);
    syncTarget();
    const observer = new MutationObserver(syncTarget);
    observer.observe(document.body, { attributes: true, attributeFilter: ["open"], subtree: true });
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    const move = (event) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      lastPosition.current = { x: event.clientX, y: event.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
      setHovered(Boolean(event.target instanceof Element && event.target.closest(interactiveSelector)));
      setVisible(true);
    };
    const hide = (event) => {
      if (!event.relatedTarget) setVisible(false);
    };
    const blur = () => setVisible(false);

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseout", hide);
    window.addEventListener("blur", blur);
    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      document.removeEventListener("pointermove", move);
      document.removeEventListener("mouseout", hide);
      window.removeEventListener("blur", blur);
    };
  }, [enabled]);

  useEffect(() => {
    if (cursorRef.current) {
      const { x, y } = lastPosition.current;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
  }, [portalTarget]);

  if (!enabled) return null;

  return createPortal(
    <div ref={cursorRef} className={`custom-cursor ${visible ? "is-visible" : ""} ${hovered ? "is-hovered" : ""}`} aria-hidden="true">
      <img src={hovered ? hoverCursor : defaultCursor} alt="" draggable="false" />
    </div>,
    portalTarget ?? document.body,
  );
}
