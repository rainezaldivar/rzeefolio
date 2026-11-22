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
          <p className="hero-role">Aspiring Frontend Developer and QA Engineer.</p>
          <p className="hero-statement">Building intuitive interfaces, testing every detail with care.</p>
          <div className="hero-actions">
            <a className="ui-button ui-button--primary" href="#works">View Projects</a>
            <a className="ui-button" href="/RaineCV.pdf" download="Raine_Zaldivar_CV.pdf">Download CV</a>
          </div>
        </div>
      </div>
      <a className={`hero-scroll${hasStartedScrolling ? " is-scrolling" : ""}`} href="#about">
        <span>{hasStartedScrolling ? "Continue to About me" : "Scroll to explore"}</span>
        <FiArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
