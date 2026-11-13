import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import defaultCursor from "../assets/cursor-previews/cursor-default.png";
import hoverCursor from "../assets/cursor-previews/cursor-hover.png";

const interactiveSelector = 'a, button, [role="button"], input:not([type="hidden"]), select, summary, label[for], [data-cursor-hover]';

function placeCursor(cursor, x, y, dialog, offset) {
  if (!cursor) return false;
  if (dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom) return false;
  }
  cursor.style.transform = `translate3d(${x + offset.x}px, ${y + offset.y}px, 0) translate(-50%, -50%)`;
  return true;
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const lastPosition = useRef({ x: -100, y: -100 });
  const cursorOffset = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [portalTarget, setPortalTarget] = useState(null);
  const activeDialogRef = useRef(null);

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

    // Keep the illustrated cursor in the modal's top layer so it remains visible
    // at viewport pointer coordinates over popup controls.
    const syncDialog = () => {
      const dialog = document.querySelector("dialog[open]");
      activeDialogRef.current = dialog;
      setPortalTarget(dialog ?? document.body);
    };
    syncDialog();
    const observer = new MutationObserver(syncDialog);
    observer.observe(document.body, { attributes: true, attributeFilter: ["open"], subtree: true });
    return () => observer.disconnect();
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled || !portalTarget) return;
    const calibrate = () => {
      const { x, y } = lastPosition.current;
      cursorOffset.current = { x: 0, y: 0 };
      const inBounds = x >= 0 && placeCursor(cursorRef.current, x, y, activeDialogRef.current, cursorOffset.current);
      if (inBounds) {
        const bounds = cursorRef.current.getBoundingClientRect();
        cursorOffset.current = {
          x: x - (bounds.left + bounds.width / 2),
          y: y - (bounds.top + bounds.height / 2),
        };
        placeCursor(cursorRef.current, x, y, activeDialogRef.current, cursorOffset.current);
      }
      return inBounds;
    };
    const inBounds = calibrate();
    const frame = requestAnimationFrame(() => setVisible(inBounds));
    const onResize = () => setVisible(calibrate());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled, portalTarget]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    const move = (event) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      lastPosition.current = { x: event.clientX, y: event.clientY };
      const inBounds = placeCursor(cursorRef.current, event.clientX, event.clientY, activeDialogRef.current, cursorOffset.current);
      setHovered(Boolean(event.target instanceof Element && event.target.closest(interactiveSelector)));
      setVisible(inBounds);
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

  if (!enabled) return null;

  return createPortal(
    <div ref={cursorRef} className={`custom-cursor ${visible ? "is-visible" : ""} ${hovered ? "is-hovered" : ""}`} aria-hidden="true">
      <img src={hovered ? hoverCursor : defaultCursor} alt="" draggable="false" />
    </div>,
    portalTarget ?? document.body,
  );
}
