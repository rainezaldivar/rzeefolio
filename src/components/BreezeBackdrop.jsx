import { useEffect, useRef } from "react";

export default function BreezeBackdrop() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!layer || reducedMotion.matches) return undefined;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollY = 0;

    const paint = () => {
      frame = 0;
      layer.style.setProperty("--breeze-x", `${pointerX}px`);
      layer.style.setProperty("--breeze-y", `${pointerY + scrollY}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onPointerMove = (event) => {
      if (!finePointer.matches || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
      pointerX = (event.clientX / window.innerWidth - .5) * 16;
      pointerY = (event.clientY / window.innerHeight - .5) * 10;
      schedule();
    };
    const onScroll = () => {
      scrollY = Math.sin(window.scrollY / 700) * 8;
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={layerRef} className="breeze-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="breeze-drift">
          <path className="breeze-wash" d="M-150 575 C95 390 286 690 535 550 S915 442 1350 600 L1350 850 L-150 850Z" />
          <path className="breeze-line" d="M-150 575 C95 390 286 690 535 550 S915 442 1350 600" />
          <path className="breeze-line breeze-line-secondary" d="M-150 640 C120 470 345 745 615 615 S1010 505 1350 670" />
        </g>
      </svg>
    </div>
  );
}
