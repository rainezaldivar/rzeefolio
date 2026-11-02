import { certificates } from "../data/portfolioData";

export default function Certificates() {
  return (
    <section id="certificates" className="chapter-section certificates-section">
      <div className="max-w-6xl mx-auto">
        <div className="chapter-heading reveal"><h2 className="heading-title">Certifications & Badges</h2></div>
        <div className="credentials-columns">
          <div className="credentials-column reveal">
            <h3>Certifications</h3>
            <div className="credentials-list">
              {certificates.map((cert) => (
                <article className="credential-row reveal" key={cert.id}>
                  <div className="credential-thumb"><img src={cert.image} alt="" loading="lazy" /></div>
                  <div className="credential-copy">
                    <h4>{cert.title}</h4>
                    <p className="credential-issuer">{cert.issuer}</p>
                    <span className="credential-date">{cert.year}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="credentials-column reveal">
            <h3>Badges</h3>
            <div className="badge-grid">
              {certificates.map((cert) => (
                <figure className="badge-card reveal" key={cert.id}>
                  <div className="credential-thumb"><img src={cert.image} alt="" loading="lazy" /></div>
                  <figcaption className="credential-copy">
                    <strong className="badge-title">{cert.title}</strong>
                    <span className="credential-issuer">{cert.issuer}</span>
                    <span className="credential-date">{cert.year}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
