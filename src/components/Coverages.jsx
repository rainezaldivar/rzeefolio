import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiInfo, FiZoomIn, FiZoomOut } from "react-icons/fi";
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

const featuredOrder = ["kuhaku-21", "19LrwwrkTr", "1GE9BnN6F5", "19VxMhpBGf", "1AFbP7vYEV"];
const featuredRank = new Map(featuredOrder.map((id, index) => [id, index]));
const allEvents = [...kuhakuPosts, ...publicationPosts].sort((a, b) =>
  (featuredRank.get(a.id) ?? featuredOrder.length) - (featuredRank.get(b.id) ?? featuredOrder.length)
);

export default function Coverages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);
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
    <div id="coverages" className="coverages-panel reveal">
      <div>
        <div className="coverage-heading mb-10">
          <div className="coverage-heading-copy">
            <h2 className="heading-title">Beyond IT <span className="coverage-heading-flower" aria-hidden="true">✿</span></h2>
            <p className="muted mt-4 max-w-2xl">I co-founded Kuhaku Media to photograph events and share stories from pop culture communities. Use the camera controls to browse, then select the screen for the full coverage.</p>
          </div>
          <img src={cameraMascot} alt="" aria-hidden="true" className="coverage-mascot" />
        </div>

        <div className="coverage-camera-scene">
          <div className="coverage-camera" role="region" onKeyDown={handleKeyDown} tabIndex={0} aria-label="Event coverage camera viewer. Use the camera buttons or left and right arrow keys to browse.">
            <div className="coverage-camera-screen-bezel">
              <a className={`coverage-camera-screen${zoomed ? " is-zoomed" : ""}`} href={activeEvent.url} target="_blank" rel="noopener noreferrer" aria-label={`Open full coverage for ${activeEvent.title} (opens in a new tab)`}>
                <div className="coverage-camera-photo" key={activeEvent.id}>
                  {activeImage ? (
                    <img src={activeImage} alt={`${activeEvent.title} coverage preview`} className="coverage-camera-photo-main" />
                  ) : (
                    <span className="coverage-camera-photo-fallback display-font">{activeEvent.title}</span>
                  )}
                </div>
                <div className="coverage-camera-screen-top" aria-label={`Coverage ${activeIndex + 1} of ${allEvents.length}`}>
                  <span>{position} / {total}</span>
                </div>
                <div className="coverage-camera-details" aria-live="polite" aria-atomic="true">
                  <h3 className="display-font coverage-camera-title">{activeEvent.title}</h3>
                  {showInfo && <p className="coverage-camera-description">{activeEvent.description}</p>}
                </div>
              </a>
            </div>

            <div className="coverage-camera-controls">
              <p className="coverage-camera-brand display-font">RZ<span>✿</span></p>
              <div className="coverage-camera-wheel" role="group" aria-label="Camera photo controls">
                <button type="button" onClick={() => move(-1)} className="coverage-camera-button" aria-label={`Previous coverage, ${allEvents[(activeIndex - 1 + allEvents.length) % allEvents.length].title}`}>
                  <FiChevronLeft size={20} aria-hidden="true" />
                </button>
                <span className="coverage-camera-wheel-center" aria-hidden="true" />
                <button type="button" onClick={() => move(1)} className="coverage-camera-button" aria-label={`Next coverage, ${allEvents[(activeIndex + 1) % allEvents.length].title}`}>
                  <FiChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="coverage-camera-bottom-controls" role="group" aria-label="Camera screen controls">
                <button type="button" onClick={() => setShowInfo((visible) => !visible)} aria-pressed={showInfo} aria-label="Show photo information" title="Photo information"><FiInfo size={17} aria-hidden="true" /></button>
                <button type="button" onClick={() => setZoomed((value) => !value)} aria-pressed={zoomed} aria-label={zoomed ? "Fit photo to screen" : "Zoom photo to fill screen"} title={zoomed ? "Fit photo" : "Zoom photo"}>{zoomed ? <FiZoomOut size={17} aria-hidden="true" /> : <FiZoomIn size={17} aria-hidden="true" />}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
