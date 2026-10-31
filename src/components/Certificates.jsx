import { certificates } from "../data/portfolioData";

export default function Certificates() {
  return (
    <section id="certificates" className="chapter-section certificates-section">
      <div className="max-w-6xl mx-auto">
        <div className="chapter-heading">
          <span className="chapter-index">03 / CREDENTIALS</span>
          <p className="eyebrow">Milestones</p>
          <h2 className="heading-title">Certifications & badges</h2>
        </div>
        <div className="credentials-list">
          {certificates.map((cert) => (
            <article className="credential-row" key={cert.id}>
              <div className="credential-image"><img src={cert.image} alt={`${cert.title} certificate artwork`} loading="lazy" /></div>
              <div>
                <p className="note-label">{cert.issuer} / {cert.year}</p>
                <h3>{cert.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
