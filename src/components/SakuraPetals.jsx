import { useEffect, useRef } from "react";

// Fixed values keep the motion varied without timers, randomness, or rerenders.
const petals = [
  { x: "6%", size: 13, opacity: .52, fall: 14.7, delay: -8.4, drift: "5vw", sway: "-2.5vw", swayTime: 3.8, turnTime: 5.2, turn: "165deg" },
  { x: "24%", size: 10, opacity: .38, fall: 19.9, delay: -13.2, drift: "-4vw", sway: "2vw", swayTime: 5.1, turnTime: 6.4, turn: "-205deg" },
  { x: "49%", size: 11, opacity: .27, fall: 17.3, delay: -6.5, drift: "3vw", sway: "-1.5vw", swayTime: 4.3, turnTime: 7.1, turn: "145deg" },
  { x: "71%", size: 15, opacity: .49, fall: 12.8, delay: -10.8, drift: "-5vw", sway: "2.8vw", swayTime: 3.5, turnTime: 4.9, turn: "-180deg" },
  { x: "91%", size: 12, opacity: .56, fall: 16.4, delay: -3.8, drift: "-6vw", sway: "-2vw", swayTime: 4.7, turnTime: 5.8, turn: "195deg" },
  { x: "97%", size: 9, opacity: .32, fall: 21.2, delay: -15.3, drift: "-8vw", sway: "1.8vw", swayTime: 5.5, turnTime: 7.6, turn: "-140deg" },
  { x: "14%", size: 16, opacity: .43, fall: 18.7, delay: -9.1, drift: "6vw", sway: "-3vw", swayTime: 4.1, turnTime: 6.7, turn: "220deg" },
  { x: "62%", size: 11, opacity: .35, fall: 15.6, delay: -5.2, drift: "-3vw", sway: "2.2vw", swayTime: 3.9, turnTime: 5.5, turn: "-170deg" },
  { x: "34%", size: 14, opacity: .46, fall: 20.3, delay: -18.3, drift: "5vw", sway: "-2.7vw", swayTime: 5.2, turnTime: 6.1, turn: "155deg" },
  { x: "82%", size: 10, opacity: .39, fall: 13.1, delay: -11.4, drift: "-4vw", sway: "2.4vw", swayTime: 3.6, turnTime: 5.9, turn: "-225deg" },
  { x: "54%", size: 12, opacity: .3, fall: 17.9, delay: -7.7, drift: "4vw", sway: "-1.7vw", swayTime: 4.9, turnTime: 7.3, turn: "185deg" },
  { x: "4%", size: 11, opacity: .42, fall: 11.8, delay: -1.6, drift: "7vw", sway: "2.1vw", swayTime: 3.3, turnTime: 4.6, turn: "-160deg" },
  { x: "42%", size: 15, opacity: .51, fall: 17.1, delay: -14.6, drift: "-3vw", sway: "2.6vw", swayTime: 4.6, turnTime: 6.8, turn: "210deg" },
  { x: "76%", size: 17, opacity: .48, fall: 24.1, delay: -20.2, drift: "5vw", sway: "-2.1vw", swayTime: 5.7, turnTime: 7.4, turn: "-190deg" },
  { x: "29%", size: 12, opacity: .44, fall: 14.2, delay: -4.3, drift: "-6vw", sway: "1.6vw", swayTime: 3.7, turnTime: 5.4, turn: "175deg" },
  { x: "87%", size: 16, opacity: .55, fall: 19.2, delay: -16.8, drift: "-4vw", sway: "2.3vw", swayTime: 4.8, turnTime: 6.2, turn: "-215deg" },
  { x: "58%", size: 13, opacity: .46, fall: 22.8, delay: -2.7, drift: "6vw", sway: "-1.9vw", swayTime: 5.3, turnTime: 7.8, turn: "150deg" },
  { x: "10%", size: 15, opacity: .5, fall: 18.9, delay: -12.5, drift: "-3vw", sway: "2.7vw", swayTime: 4.2, turnTime: 5.7, turn: "-185deg" },
];

const interactiveContent = 'a, button, input, textarea, select, summary, label, dialog, img, h1, h2, h3, h4, p, [role="button"], [role="link"], [role="switch"], [contenteditable="true"]';
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function SakuraPetals() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const shapes = [...layer.querySelectorAll(".sakura-petal-shape")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = null;
    let hovered = null;
    let frame = 0;
    let latestPointer = null;

    const reset = (petal) => {
      if (!petal) return;
      petal.classList.remove("is-hovered", "is-held");
      petal.style.setProperty("--petal-interact-x", "0px");
      petal.style.setProperty("--petal-interact-y", "0px");
      petal.style.setProperty("--petal-interact-turn", "0deg");
    };

    const findPetal = (x, y) => {
      for (const shape of shapes) {
        const rect = shape.getBoundingClientRect();
        if (!rect.width) continue;
        const pad = 5;
        if (x >= rect.left - pad && x <= rect.right + pad && y >= rect.top - pad && y <= rect.bottom + pad) {
          return { petal: shape.closest(".sakura-petal"), rect };
        }
      }
      return null;
    };

    const move = () => {
      frame = 0;
      if (!latestPointer || reducedMotion.matches) return;
      const { clientX: x, clientY: y, pointerId, pointerType, target } = latestPointer;

      if (active) {
        if (pointerId !== active.pointerId) return;
        const dx = x - active.x;
        const dy = y - active.y;
        active.petal.style.setProperty("--petal-interact-x", `${dx}px`);
        active.petal.style.setProperty("--petal-interact-y", `${dy}px`);
        active.petal.style.setProperty("--petal-interact-turn", `${clamp(dx * .35, -32, 32)}deg`);
        return;
      }

      if (pointerType !== "mouse" && pointerType !== "pen") return;
      const overControl = target instanceof Element && target.closest(interactiveContent);
      const hit = overControl ? null : findPetal(x, y);
      if (hovered !== hit?.petal) {
        reset(hovered);
        hovered = hit?.petal ?? null;
      }
      if (!hit) return;
      const dx = x - (hit.rect.left + hit.rect.width / 2);
      const dy = y - (hit.rect.top + hit.rect.height / 2);
      hit.petal.classList.add("is-hovered");
      hit.petal.style.setProperty("--petal-interact-x", `${clamp(dx * .22, -5, 5)}px`);
      hit.petal.style.setProperty("--petal-interact-y", `${clamp(dy * .18, -4, 4)}px`);
      hit.petal.style.setProperty("--petal-interact-turn", `${clamp(dx * .6, -12, 12)}deg`);
    };

    const onPointerMove = (event) => {
      latestPointer = event;
      if (!frame) frame = requestAnimationFrame(move);
    };
    const onPointerOut = (event) => {
      if (event.relatedTarget) return;
      reset(hovered);
      hovered = null;
      if (active && event.pointerType !== "touch" && event.pointerId === active.pointerId) {
        reset(active.petal);
        active = null;
        latestPointer = null;
      }
    };
    const onPointerDown = (event) => {
      if (reducedMotion.matches || active || !event.isPrimary || event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest(interactiveContent)) return;
      const hit = findPetal(event.clientX, event.clientY);
      if (!hit) return;
      reset(hovered);
      hovered = null;
      active = { petal: hit.petal, pointerId: event.pointerId, pointerType: event.pointerType, x: event.clientX, y: event.clientY };
      hit.petal.classList.add("is-held");
      if (event.pointerType === "touch") document.addEventListener("touchstart", onTouchStart, { passive: false });
    };
    // A touch that starts on a petal opts out of scrolling; the layer itself
    // remains pointer-transparent, so controls and navigation are never covered.
    const onTouchStart = (event) => {
      if (active?.pointerType === "touch" && event.touches.length === 1 && event.cancelable) event.preventDefault();
    };
    const onPointerEnd = (event) => {
      if (!active || event.pointerId !== active.pointerId) return;
      reset(active.petal);
      active = null;
      latestPointer = null;
      document.removeEventListener("touchstart", onTouchStart);
    };
    const onBlur = () => {
      reset(active?.petal);
      reset(hovered);
      active = null;
      hovered = null;
      latestPointer = null;
      document.removeEventListener("touchstart", onTouchStart);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerEnd);
    document.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("blur", onBlur);
    reducedMotion.addEventListener("change", onBlur);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("pointerup", onPointerEnd);
      document.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("blur", onBlur);
      reducedMotion.removeEventListener("change", onBlur);
    };
  }, []);

  return (
    <div ref={layerRef} className="sakura-petals" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          className="sakura-petal"
          key={index}
          style={{
            "--petal-x": petal.x,
            "--petal-size": `${petal.size}px`,
            "--petal-opacity": petal.opacity,
            "--petal-fall": `${petal.fall}s`,
            "--petal-delay": `${petal.delay}s`,
            "--petal-drift": petal.drift,
            "--petal-sway": petal.sway,
            "--petal-sway-time": `${petal.swayTime}s`,
            "--petal-turn-time": `${petal.turnTime}s`,
            "--petal-turn": petal.turn,
          }}
        >
          <span className="sakura-petal-sway">
            <span className="sakura-petal-interaction">
              <svg className="sakura-petal-shape" viewBox="0 0 24 28" focusable="false">
                <path className="sakura-petal-outline" d="M12 6C10 2 7 1 5 3 1 5 1 10 3 15c2 5 6 9 9 12 3-3 7-7 9-12 2-5 2-10-2-12-2-2-5-1-7 3Z" />
                <path className="sakura-petal-vein" d="M12 22c-.4-4-2.3-8.4-4.5-11.5" />
              </svg>
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
