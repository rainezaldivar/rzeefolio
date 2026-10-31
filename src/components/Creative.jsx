import { FiArrowUpRight } from "react-icons/fi";
import profileArtwork from "../assets/creative/ARTWAKENING PFP.png";
import dayOneWinners from "../assets/creative/DAY 1 WINNERS FRONT LAYOUT.png";
import dayTwoWinners from "../assets/creative/DAY 2 WINNERS FRONT LAYOUT.png";
import anilag from "../assets/creative/TRIVIAS/ANILAG.png";
import atiAtihan from "../assets/creative/TRIVIAS/ATI-ATIHAN.png";
import ibonEbun from "../assets/creative/TRIVIAS/IBON-EBUN.png";
import kadayawan from "../assets/creative/TRIVIAS/KADAYAWAN.png";
import masskara from "../assets/creative/TRIVIAS/MASSKARA.png";
import panagbenga from "../assets/creative/TRIVIAS/PANAGBENGA.png";
import pistayDayat from "../assets/creative/TRIVIAS/PISTA_Y DAYAT.png";
import sinulog from "../assets/creative/TRIVIAS/SINULOG.png";

const previews = import.meta.glob("../assets/creative-previews/*.jpg", { eager: true, query: "?url", import: "default" });

const works = [
  { title: "ARTwakening profile artwork", image: profileArtwork, previewFile: "ARTWAKENING PFP.jpg", type: "Festival identity" },
  { title: "Day 1 winners layout", image: dayOneWinners, previewFile: "DAY 1 WINNERS FRONT LAYOUT.jpg", type: "Event graphics" },
  { title: "Day 2 winners layout", image: dayTwoWinners, previewFile: "DAY 2 WINNERS FRONT LAYOUT.jpg", type: "Event graphics" },
  { title: "Anilag Festival", image: anilag, previewFile: "ANILAG.jpg", type: "Festival trivia" },
  { title: "Ati-Atihan Festival", image: atiAtihan, previewFile: "ATI-ATIHAN.jpg", type: "Festival trivia" },
  { title: "Ibon-Ebun Festival", image: ibonEbun, previewFile: "IBON-EBUN.jpg", type: "Festival trivia" },
  { title: "Kadayawan Festival", image: kadayawan, previewFile: "KADAYAWAN.jpg", type: "Festival trivia" },
  { title: "Masskara Festival", image: masskara, previewFile: "MASSKARA.jpg", type: "Festival trivia" },
  { title: "Panagbenga Festival", image: panagbenga, previewFile: "PANAGBENGA.jpg", type: "Festival trivia" },
  { title: "Pista'y Dayat Festival", image: pistayDayat, previewFile: "PISTA_Y DAYAT.jpg", type: "Festival trivia" },
  { title: "Sinulog Festival", image: sinulog, previewFile: "SINULOG.jpg", type: "Festival trivia" },
];

export default function Creative() {
  return (
    <section id="creative" className="chapter-section creative-section">
      <div className="max-w-6xl mx-auto">
        <div className="chapter-heading">
          <p className="eyebrow">Selected artwork</p>
          <h2 className="heading-title">Graphics & campaigns</h2>
          <p className="muted mt-4 max-w-2xl">Festival identity, event graphics, and a trivia series. Each piece opens at full size.</p>
        </div>
        <div className="creative-gallery">
          {works.map((work, index) => (
            <a className="creative-piece" href={work.image} target="_blank" rel="noopener noreferrer" key={work.title} aria-label={`Open ${work.title} at full size`}>
              <div className="creative-piece-image"><img src={previews[`../assets/creative-previews/${work.previewFile}`]} alt={work.title} loading="lazy" /></div>
              <div className="creative-piece-caption"><span>{String(index + 1).padStart(2, "0")} / {work.type}</span><strong>{work.title}</strong><FiArrowUpRight size={17} aria-hidden="true" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
