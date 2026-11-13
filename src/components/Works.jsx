import { useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiImage } from "react-icons/fi";
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
      <div className="project-card-image">
        <button type="button" className="project-image-trigger" onClick={() => onInfo(project)} aria-label={`View information about ${project.title}`}>
          {project.image ? (
            <img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" />
          ) : (
            <span className="project-placeholder"><FiImage size={30} aria-hidden="true" /><span>Screenshots coming soon</span></span>
          )}
        </button>
        <div className="project-image-overlay">
          <div className="project-overlay-actions">
            <button type="button" className="project-overlay-action" onClick={() => onInfo(project)} aria-label={`View details about ${project.title}`}>View details</button>
            {project.liveUrl && <a className="project-overlay-action" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (opens in a new tab)`}>Visit website <FiArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
        </div>
      </div>
      <div className="project-card-body">
        <h3><button type="button" className="project-card-title" onClick={() => onInfo(project)}>{project.title}</button></h3>
        <p className="project-card-summary">{project.summary}</p>
        <ProjectTechnologies tech={project.cardTech ?? project.tech} className="project-card-technologies" />
      </div>
    </>
  );
}

function ProjectDetails({ project }) {
  const leadScreenshot = project.private ? project.screenshots?.[0] : null;

  if (!project.private) {
    return (
      <div className="project-detail-body">
        {project.image && <div className="project-detail-image-frame"><img className="project-detail-image" src={project.image} alt={project.imageAlt} /></div>}
        <div className="project-detail-scroll" role="region" aria-label={`${project.title} information`} tabIndex={0}>
          <div className="project-detail-layout">
            <div className="project-detail-story">
              <h3>About the project</h3>
              <p className="project-detail-description">{project.description}</p>
            </div>
            <div className="project-detail-sidebar">
              <dl className="project-detail-facts">
                <div><dt>System type</dt><dd>{project.kind}</dd></div>
                <div><dt>Platform</dt><dd>{project.platform}</dd></div>
              </dl>
              <h3>Tech Stacks</h3>
              <ProjectTechnologies tech={project.tech} className="project-detail-technologies" />
              {project.liveUrl && <a className="project-detail-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live <FiArrowUpRight size={18} aria-hidden="true" /></a>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-body thesis-project-details">
      {leadScreenshot && <figure className="project-detail-lead">
        <a className="project-detail-image-frame" href={leadScreenshot.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${leadScreenshot.caption}`}>
          <img className="project-detail-image" src={leadScreenshot.image} alt={leadScreenshot.alt} />
        </a>
        <figcaption>{leadScreenshot.caption}</figcaption>
      </figure>}
      <div className="project-detail-scroll" role="region" aria-label={`${project.title} information`} tabIndex={0}>
        <p className="project-detail-intro">{project.description}</p>
        <dl className="thesis-details">
          <div><dt>Official project title</dt><dd>{project.systemName}</dd></div>
          <div><dt>System type</dt><dd>{project.kind}</dd></div>
          <div><dt>Platform</dt><dd>{project.platform}</dd></div>
          <div><dt>Availability</dt><dd>Private academic project</dd></div>
        </dl>
        <h3>Technologies</h3>
        <ProjectTechnologies tech={project.tech} className="project-detail-technologies" />
        {project.screenshots.length > 1 && <>
          <h3>Screenshots</h3>
          <div className="thesis-screenshots" aria-label="Additional thesis project screenshots">
            {project.screenshots.slice(1).map((screenshot) => (
              <figure key={screenshot.caption}>
                <a href={screenshot.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${screenshot.caption}`}>
                  <img src={screenshot.image} alt={screenshot.alt} width="1920" height="1080" loading="lazy" />
                </a>
                <figcaption>{screenshot.caption} <span>↗</span></figcaption>
              </figure>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}

export default function Works() {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useLayoutEffect(() => {
    if (!selectedProject || !dialogRef.current) return undefined;

    const dialog = dialogRef.current;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.focus({ preventScroll: true });

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [selectedProject]);

  const openProject = (project) => {
    openerRef.current = document.activeElement;
    setSelectedProject(project);
  };
  const closeProject = () => dialogRef.current?.close();
  const handleDialogClose = () => {
    setSelectedProject(null);
    openerRef.current?.focus?.({ preventScroll: true });
    openerRef.current = null;
  };
  const handleBackdropClick = (event) => {
    const dialog = dialogRef.current;
    if (event.target !== dialog) return;
    const { left, right, top, bottom } = dialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) closeProject();
  };

  return (
    <section id="works" className="chapter-section works-section" aria-labelledby="works-heading">
      <div className="projects-container mx-auto">
        <div className="projects-heading-row">
          <div className="chapter-heading reveal"><h2 id="works-heading" className="heading-title">My Projects</h2></div>
          <p className="projects-intro reveal">A selection of web projects, from a foundation website to fan-made storefronts.</p>
        </div>
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
        tabIndex={-1}
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-subtitle project-dialog-hint"
        onClose={handleDialogClose}
        onClick={handleBackdropClick}
      >
        {selectedProject && (
          <div className="project-dialog-inner">
            <header className="project-dialog-header">
              <p className="project-dialog-eyebrow">Project details</p>
              <h2 id="project-dialog-title" className="project-detail-title">{selectedProject.title}</h2>
              <p id="project-dialog-subtitle" className="project-dialog-subtitle">{selectedProject.private ? "Private thesis project" : <>{selectedProject.kind} <span aria-hidden="true">·</span> {selectedProject.platform}</>}</p>
              <p id="project-dialog-hint" className="sr-only">Press Escape or click outside this window to close.</p>
            </header>
            <ProjectDetails project={selectedProject} />
          </div>
        )}
      </dialog>
    </section>
  );
}
