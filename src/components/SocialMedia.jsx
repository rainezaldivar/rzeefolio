import { FiArrowUpRight } from "react-icons/fi";
import artwakeningArtwork from "../assets/creative-previews/ARTWAKENING PFP.jpg";

const pages = [
  { label: "Page 01", url: "https://www.facebook.com/profile.php?id=61590020742306" },
  { label: "Page 02", url: "https://www.facebook.com/profile.php?id=61581657655084" },
  { label: "Page 03", url: "https://www.facebook.com/profile.php?id=61551578431922" },
  { label: "Kuhaku Media", url: "https://www.facebook.com/Kuhakumedia" },
];

export default function SocialMedia() {
  return (
    <section id="social-media" className="chapter-section social-media-section">
      <div className="max-w-6xl mx-auto social-media-layout">
        <div>
          <span className="chapter-index">06 / CONTENT & DESIGN</span>
          <p className="eyebrow mt-4">Social media manager</p>
          <h2 className="heading-title mt-3">Four pages, many stories.</h2>
          <p className="social-media-lead">I bring together content planning, graphics, and visual storytelling for the pages I help manage. Below are the four pages and a selection of the graphics I created.</p>
          <div className="social-pages">
            {pages.map((page, index) => (
              <a href={page.url} key={page.url} target="_blank" rel="noopener noreferrer">
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{page.label}</strong><FiArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
        <figure className="social-feature-image">
          <img src={artwakeningArtwork} alt="ARTwakening Festival profile graphic" loading="lazy" />
          <figcaption>Selected campaign artwork / ARTwakening</figcaption>
        </figure>
      </div>
    </section>
  );
}
