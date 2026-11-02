import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="home" className="hero-full">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-name">Raine <span>Zaldivar</span></h1>
          <p className="hero-role">Aspiring Frontend Dev <span aria-hidden="true">/</span> QA</p>
        </div>
      </div>
      <a className="hero-scroll" href="#about">Scroll to explore <FiArrowDown size={16} /></a>
    </section>
  );
}
