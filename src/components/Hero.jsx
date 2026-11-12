import { useEffect, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);

  useEffect(() => {
    const updateScrollPrompt = () => setHasStartedScrolling(window.scrollY > 48);
    updateScrollPrompt();
    window.addEventListener("scroll", updateScrollPrompt, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollPrompt);
  }, []);

  return (
    <section id="home" className="hero-full" aria-labelledby="home-heading">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="home-heading" className="hero-name">Raine <span>Zaldivar</span></h1>
          <p className="hero-role">Frontend Developer / Quality Assurance</p>
        </div>
      </div>
      <a className={`hero-scroll${hasStartedScrolling ? " is-scrolling" : ""}`} href="#about">
        <span>{hasStartedScrolling ? "Continue to About me" : "Scroll to explore"}</span>
        <FiArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
