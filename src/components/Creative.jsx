import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";
import profileArtwork from "../assets/creative/ARTWAKENING PFP.png";
import dayOneWinners from "../assets/creative/DAY 1 WINNERS FRONT LAYOUT.png";
import dayTwoWinners from "../assets/creative/DAY 2 WINNERS FRONT LAYOUT.png";
import anilag from "../assets/creative/TRIVIAS/ANILAG.png";
import ibonEbun from "../assets/creative/TRIVIAS/IBON-EBUN.png";
import masskara from "../assets/creative/TRIVIAS/MASSKARA.png";
import panagbenga from "../assets/creative/TRIVIAS/PANAGBENGA.png";
import pistayDayat from "../assets/creative/TRIVIAS/PISTA_Y DAYAT.png";
import sinulog from "../assets/creative/TRIVIAS/SINULOG.png";
import profilePreview from "../assets/creative-previews/ARTWAKENING PFP.jpg";
import dayOnePreview from "../assets/creative-previews/DAY 1 WINNERS FRONT LAYOUT.jpg";
import dayTwoPreview from "../assets/creative-previews/DAY 2 WINNERS FRONT LAYOUT.jpg";
import anilagPreview from "../assets/creative-previews/ANILAG.jpg";
import ibonEbunPreview from "../assets/creative-previews/IBON-EBUN.jpg";
import masskaraPreview from "../assets/creative-previews/MASSKARA.jpg";
import panagbengaPreview from "../assets/creative-previews/PANAGBENGA.jpg";
import pistayDayatPreview from "../assets/creative-previews/PISTA_Y DAYAT.jpg";
import sinulogPreview from "../assets/creative-previews/SINULOG.jpg";

const works = [
  { title: "ARTwakening profile artwork", image: profileArtwork, preview: profilePreview, type: "Festival identity" },
  { title: "Day 1 winners layout", image: dayOneWinners, preview: dayOnePreview, type: "Event graphics" },
  { title: "Day 2 winners layout", image: dayTwoWinners, preview: dayTwoPreview, type: "Event graphics" },
  { title: "Anilag Festival", image: anilag, preview: anilagPreview, type: "Festival trivia" },
  { title: "Ibon-Ebun Festival", image: ibonEbun, preview: ibonEbunPreview, type: "Festival trivia" },
  { title: "Masskara Festival", image: masskara, preview: masskaraPreview, type: "Festival trivia" },
  { title: "Panagbenga Festival", image: panagbenga, preview: panagbengaPreview, type: "Festival trivia" },
  { title: "Pista'y Dayat Festival", image: pistayDayat, preview: pistayDayatPreview, type: "Festival trivia" },
  { title: "Sinulog Festival", image: sinulog, preview: sinulogPreview, type: "Festival trivia" },
];

export default function Creative() {
  const track = useRef(null);
  const lightbox = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel, setCarousel] = useState({ start: 1, end: 1, canPrev: false, canNext: true });

  const updateCarousel = useCallback(() => {
    const slider = track.current;
    const card = slider?.querySelector(".creative-piece");
    if (!slider || !card) return;
    const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const start = Math.min(works.length, Math.round(slider.scrollLeft / step) + 1);
    const visible = Math.max(1, Math.floor((slider.clientWidth + gap) / step));
    const next = {
      start,
      end: Math.min(works.length, start + visible - 1),
      canPrev: start > 1,
      canNext: slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 2,
    };
    setCarousel((current) => Object.keys(next).every((key) => current[key] === next[key]) ? current : next);
  }, []);

  useEffect(() => {
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
    return () => window.removeEventListener("resize", updateCarousel);
  }, [updateCarousel]);

  const scrollCards = (direction) => {
    const card = track.current?.querySelector(".creative-piece");
    track.current?.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 300) + 20), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const openArtwork = (index) => {
    setActiveIndex(index);
    lightbox.current?.showModal();
  };

  return (
    <section id="creative" className="chapter-section creative-section">
      <div className="max-w-6xl mx-auto">
        <div className="creative-heading reveal">
          <div>
            <h2 className="heading-title">Graphics & campaigns</h2>
            <p className="muted mt-4 max-w-2xl">Browse my event graphics and festival trivia. Select a piece to see it in full.</p>
          </div>
          <div className="creative-controls" role="group" aria-label="Artwork carousel controls">
            <span className="carousel-status" aria-live="polite">Showing {carousel.start}{carousel.end > carousel.start ? `–${carousel.end}` : ""} of {works.length}</span>
            <button type="button" onClick={() => scrollCards(-1)} disabled={!carousel.canPrev} aria-label="Previous artwork"><FiChevronLeft size={22} /></button>
            <button type="button" onClick={() => scrollCards(1)} disabled={!carousel.canNext} aria-label="Next artwork"><FiChevronRight size={22} /></button>
          </div>
        </div>
        <div className="creative-track" ref={track} onScroll={updateCarousel} aria-label="Graphics and campaigns carousel">
          {works.map((work, index) => (
            <button className="creative-piece reveal" type="button" key={work.title} onClick={() => openArtwork(index)} aria-label={`View ${work.title} full size`}>
              <span className="creative-piece-image"><img src={work.preview} alt="" loading="lazy" /></span>
              <span className="creative-piece-caption"><span>{work.type}</span><strong>{work.title}</strong><FiMaximize2 size={17} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
      <dialog ref={lightbox} className="artwork-dialog" aria-labelledby="artwork-dialog-title" onClick={(event) => { if (event.target === lightbox.current) lightbox.current.close(); }}>
        <div className="artwork-dialog-inner">
          <button type="button" className="dialog-close" onClick={() => lightbox.current?.close()} aria-label="Close artwork"><FiX size={22} /></button>
          <img src={works[activeIndex].image} alt={works[activeIndex].title} />
          <div className="artwork-dialog-footer">
            <div><span>{works[activeIndex].type}</span><h3 id="artwork-dialog-title">{works[activeIndex].title}</h3></div>
            <div className="creative-controls" role="group" aria-label="View another artwork">
              <button type="button" onClick={() => setActiveIndex((current) => (current - 1 + works.length) % works.length)} aria-label="Previous artwork"><FiChevronLeft size={22} /></button>
              <button type="button" onClick={() => setActiveIndex((current) => (current + 1) % works.length)} aria-label="Next artwork"><FiChevronRight size={22} /></button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
