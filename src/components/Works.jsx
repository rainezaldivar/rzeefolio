import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../data/portfolioData";

export default function Works() {
  return (
    <section id="works" className="chapter-section works-section">
      <div className="max-w-6xl mx-auto">
        <div className="chapter-heading">
          <span className="chapter-index">02 / DEVELOPMENT</span>
          <p className="eyebrow">Built with care</p>
          <h2 className="heading-title">My projects</h2>
          <p className="muted mt-4 max-w-xl">Websites I built or helped bring to life, from coursework to a growing collector storefront.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-story" key={project.id}>
              <div className="project-story-media">
                {project.image && <img src={project.image} alt={`${project.title} website screenshot`} loading="lazy" />}
              </div>
              <div className="project-story-copy">
                <span className="project-number">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                <h3>{project.title}</h3>
                <p className="project-story-role">{project.role}{project.status === "in-progress" ? " · In development" : ""}</p>
                <p className="project-story-description">{project.description}</p>
                <div className="project-story-tech" aria-label="Technologies used">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                {project.liveUrl && <a className="project-story-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit project <FiArrowUpRight size={17} /></a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
