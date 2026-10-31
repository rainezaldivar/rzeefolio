import { FiArrowUpRight, FiCamera } from "react-icons/fi";
import featurePhoto from "../assets/coverage-previews/kuhaku-1.jpg";

export default function Kuhaku() {
  return (
    <section id="kuhaku" className="chapter-section kuhaku-section">
      <div className="max-w-6xl mx-auto kuhaku-editorial">
        <div className="kuhaku-copy">
          <span className="chapter-index">05 / PHOTOGRAPHY</span>
          <p className="eyebrow mt-4">Kuhaku Media</p>
          <h2 className="heading-title mt-3">Stories beyond the screen.</h2>
          <p className="kuhaku-lead">As a co-founder of Kuhaku Media, I photograph events and help tell the stories of pop culture communities. The people, small details, and moments between performances are what I love to notice.</p>
          <div className="kuhaku-links">
            <a href="#coverages">Explore event coverages <FiCamera size={17} /></a>
            <a href="https://www.facebook.com/Kuhakumedia" target="_blank" rel="noopener noreferrer">Kuhaku on Facebook <FiArrowUpRight size={17} /></a>
          </div>
        </div>
        <figure className="kuhaku-photo">
          <img src={featurePhoto} alt="Kuhaku Media event coverage photograph" loading="lazy" />
          <figcaption>Through my lens / Kuhaku Media</figcaption>
        </figure>
      </div>
    </section>
  );
}
