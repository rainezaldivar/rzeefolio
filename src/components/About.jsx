import { techStack, designTools } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="chapter-section about-section">
      <div className="max-w-6xl mx-auto">
        <div className="chapter-heading">
          <span className="chapter-index">01 / ABOUT</span>
          <p className="eyebrow">A little about me</p>
          <h2 className="heading-title">More than one way to make something.</h2>
        </div>
        <div className="about-editorial">
          <div className="about-story">
            <p className="about-lead">I study Information Technology at <strong>FEU Institute of Technology</strong>, specializing in Web and Mobile Applications.</p>
            <p>My work sits between frontend development, interface design, and quality assurance. I care about how a product looks, how it feels to use, and whether it works for the people it serves.</p>
            <p>Outside coursework, I co-founded <a href="#kuhaku">Kuhaku Media</a>, where I photograph and cover events in pop culture communities. I also make graphics and manage social content. Those experiences shape how I tell stories on screen.</p>
          </div>
          <aside className="about-notes" aria-label="Education and skills">
            <div className="about-note" id="education">
              <span className="note-label">Education</span>
              <strong>FEU Institute of Technology</strong>
              <span>Information Technology · Web and Mobile Applications</span>
            </div>
            <div className="about-note" id="skills">
              <span className="note-label">Tools I use</span>
              <div className="about-tags">{techStack.map((tech) => <span key={tech.name}>{tech.name}</span>)}</div>
            </div>
            <div className="about-note">
              <span className="note-label">Design tools</span>
              <div className="about-tags">{designTools.map((tool) => <span key={tool.name}>{tool.name}</span>)}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
