import { useRef, useState } from "react";
import { FiArrowUpRight, FiImage, FiX } from "react-icons/fi";
import { projects } from "../data/portfolioData";

function ProjectTechnologies({ tech, className = "" }) {
  return (
    <span className={`project-tech-list ${className}`} role="list" aria-label="Technologies used">
      {(tech.length ? tech : ["To be added"]).map((item) => <span role="listitem" key={item}>{item}</span>)}
    </span>
  );
}

function ProjectCardContent({ project, onInfo }) {
  return (
    <>
      <button type="button" className="project-card-image" onClick={() => onInfo(project)} aria-label={`View information about ${project.title}`}>
        {project.image ? (
          <img src={project.image} alt={`${project.title} website preview`} loading="lazy" />
        ) : (
          <div className="project-placeholder"><FiImage size={30} aria-hidden="true" /><span>Screenshots coming soon</span></div>
        )}
      </button>
      <div className="project-card-body">
        <h3><button type="button" className="project-card-title" onClick={() => onInfo(project)}>{project.title}</button></h3>
        <p className="project-card-meta">{project.kind} <span aria-hidden="true">·</span> {project.platform}</p>
        <ProjectTechnologies tech={project.tech} className="project-card-technologies" />
        <div className="project-card-actions">
          <button type="button" onClick={() => onInfo(project)}>View details</button>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (opens in a new tab)`}>Visit site <FiArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </div>
    </>
  );
}

function ProjectDetails({ project }) {
  if (!project.private) {
    return (
      <div className="project-detail-body">
        {project.image && <div className="project-detail-image-frame"><img className="project-detail-image" src={project.image} alt={`${project.title} website preview`} /></div>}
        <div className="project-detail-layout">
          <div className="project-detail-story">
            <h3>About the project</h3>
            <p className="project-detail-description">{project.description}</p>
          </div>
          <div className="project-detail-sidebar">
            <dl className="project-detail-facts">
              <div><dt>System type</dt><dd>{project.kind}</dd></div>
              <div><dt>Platform</dt><dd>{project.platform}</dd></div>
              <div><dt>My role</dt><dd>{project.role}</dd></div>
            </dl>
            <h3>Tech Stacks</h3>
            <ProjectTechnologies tech={project.tech} className="project-detail-technologies" />
            <a className="project-detail-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live <FiArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-body thesis-project-details">
      <p className="project-detail-intro">This thesis project is not publicly accessible. Add the project information and screenshots here when they are ready.</p>
      <h3>Screenshots</h3>
      <div className="thesis-screenshots" aria-label="Screenshot placeholders">
        <div><FiImage size={30} /><span>Screenshot 1</span></div>
        <div><FiImage size={30} /><span>Screenshot 2</span></div>
        <div><FiImage size={30} /><span>Screenshot 3</span></div>
      </div>
      <h3>Project details</h3>
      <dl className="thesis-details">
        <div><dt>System name</dt><dd>To be added</dd></div>
        <div><dt>System type</dt><dd>To be added</dd></div>
        <div><dt>Platform</dt><dd>To be added</dd></div>
        <div><dt>What it does</dt><dd>To be added</dd></div>
        <div><dt>My contribution</dt><dd>To be added</dd></div>
      </dl>
      <h3>Tech Stacks</h3>
      <ProjectTechnologies tech={project.tech} className="project-detail-technologies" />
    </div>
  );
}

export default function Works() {
  const dialogRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const openProject = (project) => {
    setSelectedProject(project);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };

  return (
    <section id="works" className="chapter-section works-section" aria-labelledby="works-heading">
      <div className="projects-container mx-auto">
        <div className="chapter-heading reveal"><h2 id="works-heading" className="heading-title">My Projects</h2></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.id}>
              <ProjectCardContent project={project} onInfo={openProject} />
            </article>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={() => { if (!dialogRef.current?.open) setSelectedProject(null); }}
        onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}
      >
        {selectedProject && (
          <div className="project-dialog-inner">
            <header className="project-dialog-header">
              <button type="button" className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close project details"><FiX size={22} /></button>
              <p className="project-dialog-eyebrow"><span aria-hidden="true">✿</span> Project details</p>
              <h2 id="project-dialog-title" className="project-detail-title">{selectedProject.title}</h2>
              <p className="project-dialog-subtitle">{selectedProject.private ? "Private thesis project" : <>{selectedProject.kind} <span aria-hidden="true">·</span> {selectedProject.platform}</>}</p>
            </header>
            <ProjectDetails project={selectedProject} />
          </div>
        )}
      </dialog>
    </section>
  );
}
