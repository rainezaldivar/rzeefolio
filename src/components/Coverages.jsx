import { useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { eventCoverages } from "../data/portfolioData";
import socialPosts from "../data/socialPosts.json";
import cameraMascot from "../assets/coverage-camera.png";

const previewImages = import.meta.glob("../assets/coverage-previews/*.*", { eager: true, query: "?url", import: "default" });

const kuhakuPosts = eventCoverages.map((coverage) => ({
  ...coverage,
  id: `kuhaku-${coverage.id}`,
  source: "kuhaku",
  category: `Kuhaku Media · ${coverage.category}`,
  previewFile: `kuhaku-${coverage.id}.jpg`,
}));

const publicationPosts = socialPosts.filter((post) =>
  post.source !== "creative" || post.category === "ARTwakening campaign"
);

const allEvents = [...kuhakuPosts, ...publicationPosts];

export default function Coverages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = allEvents[activeIndex];
  const activeImage = previewImages[`../assets/coverage-previews/${activeEvent.previewFile}`];
  const position = String(activeIndex + 1).padStart(2, "0");
  const total = String(allEvents.length).padStart(2, "0");

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + allEvents.length) % allEvents.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  };

  return (
    <section id="coverages" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="coverage-heading mb-10">
          <div className="coverage-heading-copy">
            <p className="eyebrow mb-3">A photo diary</p>
            <h2 className="heading-title">Event coverages <span aria-hidden="true">✦</span></h2>
            <p className="muted mt-4 max-w-2xl">Browse the stories I covered through the camera. Use its buttons to move between photos, then open the original post for the full coverage.</p>
            <span className="kawaii-pill px-4 py-1.5 text-sm mt-5">{allEvents.length} coverages</span>
          </div>
          <img src={cameraMascot} alt="" aria-hidden="true" className="coverage-mascot" />
        </div>

        <div className="coverage-camera-scene">
          <div className="coverage-camera" role="region" onKeyDown={handleKeyDown} tabIndex={0} aria-label="Event coverage camera viewer. Use the camera buttons or left and right arrow keys to browse.">
            <div className="coverage-camera-screen-bezel">
              <div className="coverage-camera-screen">
                <div className="coverage-camera-photo" key={activeEvent.id}>
                  {activeImage ? (
                    <img src={activeImage} alt={`${activeEvent.title} coverage preview`} className="coverage-camera-photo-main" />
                  ) : (
                    <span className="coverage-camera-photo-fallback display-font">{activeEvent.title}</span>
                  )}
                </div>
                <div className="coverage-camera-screen-top" aria-hidden="true">
                  <span>{position} / {total}</span>
                </div>
                <div className="coverage-camera-details" aria-live="polite" aria-atomic="true">
                  <h3 className="display-font coverage-camera-title">{activeEvent.title}</h3>
                  <a href={activeEvent.url} target="_blank" rel="noopener noreferrer" className="coverage-camera-link">
                    View coverage <FiArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="coverage-camera-controls">
              <p className="coverage-camera-brand display-font">RZ<span>✿</span></p>
              <div className="coverage-camera-wheel" role="group" aria-label="Camera photo controls">
                <button type="button" onClick={() => move(-1)} className="coverage-camera-button" aria-label={`Previous coverage, ${allEvents[(activeIndex - 1 + allEvents.length) % allEvents.length].title}`}>
                  <FiChevronLeft size={26} aria-hidden="true" />
                </button>
                <span className="coverage-camera-wheel-center" aria-hidden="true" />
                <button type="button" onClick={() => move(1)} className="coverage-camera-button" aria-label={`Next coverage, ${allEvents[(activeIndex + 1) % allEvents.length].title}`}>
                  <FiChevronRight size={26} aria-hidden="true" />
                </button>
              </div>
              <span className="coverage-camera-button-caption">previous &nbsp; / &nbsp; next</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
