import { FiArrowDown, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import rainePhoto from "../assets/raine-portrait.png";

export default function Hero() {
  return (
    <section id="home" className="hero-full">
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-lanterns" aria-hidden="true" />
      <div className="hero-garden" aria-hidden="true" />
      <div className="hero-shoji" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Hello, I'm</p>
          <h1 className="hero-name">Raine <span>Zaldivar</span></h1>
          <p className="hero-role">Frontend Developer <span aria-hidden="true">/</span> Creative Storyteller</p>
          <p className="hero-summary">
            I'm an IT student building thoughtful web experiences and telling stories from pop culture communities through Kuhaku Media. Here is the work, the people, and the ideas behind both.
          </p>
          <div className="hero-actions">
            <a href="#about" className="kawaii-button">Get to know me <FiArrowDown size={17} /></a>
            <a href="#works" className="kawaii-button secondary">View projects <FiArrowUpRight size={17} /></a>
            <a href="/RaineCV.pdf" download="Raine_Zaldivar_CV.pdf" className="hero-text-link">Download CV <FiDownload size={16} /></a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a href="https://github.com/rainezaldivar" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub size={19} /></a>
            <a href="https://www.linkedin.com/in/rainezaldivar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin size={19} /></a>
            <a href="mailto:zaldivarraine17@gmail.com" aria-label="Email"><FiMail size={19} /></a>
          </div>
        </div>
        <figure className="hero-portrait">
          <img src={rainePhoto} alt="Portrait of Raine Zaldivar" width="1024" height="1536" fetchPriority="high" />
          <figcaption>Nice to meet you <span aria-hidden="true">✿</span></figcaption>
        </figure>
      </div>
      <a className="hero-scroll" href="#about">Scroll to explore <FiArrowDown size={16} /></a>
    </section>
  );
}
