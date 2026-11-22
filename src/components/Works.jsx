import { useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { projects } from "../data/portfolioData";

function ProjectTechnologies({ tech, className = "" }) {
  return (
    <span className={`project-tech-list ${className}`} role="list" aria-label="Technologies used">
      {tech.map((item) => <span role="listitem" key={item}>{item}</span>)}
    </span>
  );
}

function ProjectCardContent({ project, onInfo }) {
  return (
    <>
      <div className="project-card-image">
        <button type="button" className="project-image-trigger" onClick={() => onInfo(project)} aria-label={`View information about ${project.title}`}>
          <img src={project.cardImage ?? project.image} alt={project.imageAlt} width={project.cardImageWidth ?? project.imageWidth} height={project.cardImageHeight ?? project.imageHeight} loading="lazy" decoding="async" />
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

function ProjectDetailHeader({ project, onClose }) {
  return (
    <header className="project-dialog-header">
      <div>
        <p className="project-dialog-eyebrow">Project details</p>
        <h2 id="project-dialog-title" className="project-detail-title">{project.title}</h2>
        <p id="project-dialog-subtitle" className="project-dialog-subtitle">{project.kind}</p>
      </div>
      <button type="button" className="project-dialog-close" onClick={onClose} aria-label="Close project details"><FiX size={20} aria-hidden="true" /></button>
    </header>
  );
}

function ProjectGallery({ project, images, imageIndex, onImageChange }) {
  const image = images[imageIndex];
  const hasMultipleImages = images.length > 1;
  const label = image.caption ?? project.title;

  return (
    <div className="project-detail-media">
      <figure className="project-detail-lead">
        <div className="project-detail-image-display">
          <img key={image.image} className="project-detail-image" src={image.image} alt={image.alt} />
        </div>
        <figcaption className="project-gallery-toolbar">
          <span className="project-gallery-caption">{label}</span>
          {hasMultipleImages && (
            <>
              <span className="project-carousel-count" aria-live="polite">{imageIndex + 1} / {images.length}</span>
              <span className="project-gallery-controls">
                <button type="button" className="project-carousel-arrow" onClick={() => onImageChange(-1)} aria-label={`Previous ${project.title} screenshot`}><FiChevronLeft size={20} aria-hidden="true" /></button>
                <button type="button" className="project-carousel-arrow" onClick={() => onImageChange(1)} aria-label={`Next ${project.title} screenshot`}><FiChevronRight size={20} aria-hidden="true" /></button>
              </span>
            </>
          )}
        </figcaption>
      </figure>
    </div>
  );
}

function ProjectResults({ project }) {
  if (!project.metrics?.length && !project.result) return null;

  return (
    <section className="project-detail-section project-results">
      <h3>Results</h3>
      {project.result && <p>{project.result}</p>}
      {project.metrics?.length > 0 && (
        <div className="project-metrics" aria-label="Project testing metrics">
          <dl>
            {project.metrics.map(({ value, label }) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

function ProjectDetails({ project, images, imageIndex, onImageChange, onClose }) {
  return (
    <div className="project-detail-body">
      <ProjectGallery project={project} images={images} imageIndex={imageIndex} onImageChange={onImageChange} />
      <div className="project-detail-content">
        <ProjectDetailHeader project={project} onClose={onClose} />
        <div key={project.id} className="project-detail-scroll" role="region" aria-label={`${project.title} information`} tabIndex={0}>
          {project.systemName && (
            <section className="project-detail-section project-thesis-title">
              <p className="project-thesis-label">Thesis title</p>
              <h3>{project.systemName}</h3>
            </section>
          )}
          {project.problem ? (
            <section className="project-detail-section">
              <h3>Problem</h3>
              <p>{project.problem}</p>
            </section>
          ) : project.description && (
            <section className="project-detail-section">
              <h3>Overview</h3>
              <p>{project.description}</p>
            </section>
          )}
          {project.solution && (
            <section className="project-detail-section">
              <h3>Solution</h3>
              <p>{project.solution}</p>
            </section>
          )}
          <ProjectResults project={project} />
          <section className="project-detail-section">
            <h3>Technologies used</h3>
            <ProjectTechnologies tech={project.tech} className="project-detail-technologies" />
          </section>
          {project.liveUrl && (
            <div className="project-detail-footer">
              <a className="project-detail-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View live project <FiArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const images = selectedProject?.screenshots?.length
    ? selectedProject.screenshots
    : selectedProject?.image ? [{ image: selectedProject.image, alt: selectedProject.imageAlt }] : [];

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
    setImageIndex(0);
    setSelectedProject(project);
  };
  const changeImage = (direction) => {
    if (images.length < 2) return;
    setImageIndex((current) => (current + direction + images.length) % images.length);
  };
  const closeProject = () => dialogRef.current?.close();
  const handleGalleryKeys = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || images.length < 2) return;
    if (event.currentTarget === dialogRef.current && event.target !== dialogRef.current && !event.target.closest(".project-detail-media")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changeImage(event.key === "ArrowLeft" ? -1 : 1);
    }
  };
  const handleDialogClose = () => {
    setSelectedProject(null);
    openerRef.current?.focus?.({ preventScroll: true });
    openerRef.current = null;
  };
  const handleBackdropClick = (event, dialog) => {
    if (event.target !== dialog) return;
    const { left, right, top, bottom } = dialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.close();
  };

  return (
    <section id="works" className="chapter-section works-section" aria-labelledby="works-heading">
      <div className="projects-container mx-auto">
        <div className="projects-heading-row">
          <div className="chapter-heading"><h2 id="works-heading" className="heading-title">My Projects</h2></div>
          <p className="projects-intro">Web and mobile projects, from a student services platform to storefronts.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <ProjectCardContent project={project} onInfo={openProject} />
            </article>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className={`project-dialog${selectedProject?.private ? " project-dialog--thesis" : ""}`}
        tabIndex={-1}
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-subtitle"
        onClose={handleDialogClose}
        onClick={(event) => handleBackdropClick(event, dialogRef.current)}
        onKeyDown={handleGalleryKeys}
      >
        {selectedProject && (
          <div className="project-dialog-inner">
            <ProjectDetails project={selectedProject} images={images} imageIndex={imageIndex} onImageChange={changeImage} onClose={closeProject} />
          </div>
        )}
      </dialog>
    </section>
  );
}
