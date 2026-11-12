import { certificates } from "../data/portfolioData";

import { FiArrowUpRight } from "react-icons/fi";

export default function Certificates() {
  return (
    <section id="certificates" className="chapter-section certificates-section" aria-labelledby="certificates-heading">
      <div className="max-w-6xl mx-auto certifications-content">
        <div className="chapter-heading certifications-heading reveal">
          <h2 id="certificates-heading" className="heading-title">Certifications</h2>
        </div>
        <div className="certifications-list">
          {certificates.map((cert) => (
            <article className="certification-entry reveal" key={cert.id}>
              <div className={`certification-image${cert.imagePadding ? " certification-image--inset" : ""}`}>
                <img src={cert.image} alt="" loading="lazy" width="680" height="680" />
              </div>
              <div className="certification-copy">
                <p className="certification-area">{cert.area}</p>
                <h3>{cert.title}</h3>
                <dl className="certification-facts">
                  <div><dt>Issuer</dt><dd>{cert.issuer}</dd></div>
                  <div><dt>Issued</dt><dd><time dateTime={cert.dateTime}>{cert.year}</time></dd></div>
                </dl>
                {cert.verificationUrl && <a className="credential-verify" href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">Verify credential <FiArrowUpRight size={16} aria-hidden="true" /></a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
