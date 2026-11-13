import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiInfo, FiZoomIn } from "react-icons/fi";
import { eventCoverages } from "../data/portfolioData";
import cameraMascot from "../assets/coverage-camera.png";
import SakuraLogo from "./SakuraLogo";

const previewImages = import.meta.glob("../assets/coverage-previews/{innov,feutech,kuhaku,arta}-*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const fullImages = import.meta.glob("../assets/{innov,feutech,kuhaku}-*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const imageFor = (file) => previewImages[`../assets/coverage-previews/${file}`];
const fullImageFor = (file) => fullImages[`../assets/${file}`] ?? imageFor(file);
const kuhakuFacebookUrl = "https://www.facebook.com/Kuhakumedia";

// These photographs carry The Innovator's credit in the supplied image files.
const innovatorPhotos = [
  ...Array.from({ length: 18 }, (_, index) => `innov-${index + 1}.jpg`),
  "feutech-1.jpg",
  "feutech-2.jpg",
].map((file, index) => ({
  id: `innovator-${index + 1}`,
  source: "The Innovator",
  label: `Photograph ${String(index + 1).padStart(2, "0")}`,
  image: imageFor(file),
  fullImage: fullImageFor(file),
}));

const kuhakuPhotos = eventCoverages.map((coverage) => ({
  id: `kuhaku-${coverage.id}`,
  source: "Kuhaku Media",
  sourceUrl: kuhakuFacebookUrl,
  label: coverage.title,
  description: coverage.description,
  category: coverage.category,
  url: coverage.url,
  image: imageFor(`kuhaku-${coverage.id}.jpg`),
  fullImage: fullImageFor(`kuhaku-${coverage.id}.jpg`),
}));

const additionalKuhakuPhoto = {
  id: "kuhaku-3",
  source: "Kuhaku Media",
  sourceUrl: kuhakuFacebookUrl,
  label: "Photograph 03",
  image: imageFor("kuhaku-3.jpg"),
  fullImage: fullImageFor("kuhaku-3.jpg"),
};
const orderedKuhakuPhotos = [kuhakuPhotos[0], additionalKuhakuPhoto, ...kuhakuPhotos.slice(1)];
const uncataloguedPhotos = ["arta-1.jpg", "arta-2.jpg"].map((file, index) => ({
  id: `uncatalogued-${index + 1}`,
  label: `Photograph ${37 + index}`,
  image: imageFor(file),
  fullImage: fullImageFor(file),
}));

// Keep the familiar featured frame first, then browse every source in one sequence.
const photoSequence = Array.from({ length: Math.max(innovatorPhotos.length, orderedKuhakuPhotos.length) }, (_, index) => [
  innovatorPhotos[index],
  orderedKuhakuPhotos[index],
]).flat().concat(uncataloguedPhotos).filter((photo) => photo?.image);
const featuredPhoto = photoSequence.find((photo) => photo.id === "kuhaku-21");
const allPhotos = [featuredPhoto, ...photoSequence.filter((photo) => photo.id !== "kuhaku-21")].filter(Boolean);

export default function Coverages() {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const cameraPhoto = allPhotos[cameraIndex];
  const position = String(cameraIndex + 1).padStart(2, "0");
  const total = String(allPhotos.length).padStart(2, "0");

  const moveCamera = (direction) => {
    setZoomed(false);
    setCameraIndex((current) => (current + direction + allPhotos.length) % allPhotos.length);
  };

  const handleCameraKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveCamera(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Escape" && zoomed) {
      setZoomed(false);
    }
  };

  const lcdContent = (
    <>
      <span className="coverage-camera-photo" key={cameraPhoto.id}>
        <img src={zoomed ? cameraPhoto.fullImage : cameraPhoto.image} alt="" className="coverage-camera-photo-main" />
      </span>
      <span className="coverage-camera-screen-top" aria-hidden="true">{position} / {total}</span>
    </>
  );

  return (
    <div id="coverages" className="photography-gallery">
      <div className="photography-layout">
        <header className="photography-intro reveal">
          <div className="photography-intro-heading">
            <h2 id="outside-heading" className="heading-title">Beyond IT</h2>
            <img src={cameraMascot} alt="Hachiware holding a camera" className="photography-mascot" loading="lazy" />
          </div>
          <p>Photography is one way I tell stories outside IT coursework. Use the camera controls to browse the collection. Select a photograph to open its original publication when available.</p>
        </header>

        <div className="photography-camera-feature reveal">
          <div className="coverage-camera-scene">
            <div className="coverage-camera" role="region" tabIndex={0} onKeyDown={handleCameraKeyDown} aria-label="Photography camera viewer. Use the controls or left and right arrow keys to browse photographs.">
              <button type="button" className="coverage-camera-shutter" onClick={() => moveCamera(1)} aria-label="Shutter: show next photograph" title="Show next photograph"><span aria-hidden="true" /></button>
              <div className="coverage-camera-screen-bezel">
                <div className={`coverage-camera-screen${zoomed ? " is-zoomed" : ""}`}>
                  {cameraPhoto.url ? (
                    <a className="coverage-camera-photo-link" href={cameraPhoto.url} target="_blank" rel="noopener noreferrer" aria-label={`Open original publication for ${cameraPhoto.label} (opens in a new tab)`}>{lcdContent}</a>
                  ) : (
                    <div className="coverage-camera-photo-static">{lcdContent}</div>
                  )}
                  <div className={`photography-camera-screen-label${showInfo ? " is-expanded" : ""}`}>
                    <strong>{cameraPhoto.label}</strong>
                    <div id="camera-photo-information" className="photography-camera-screen-description" role="region" aria-label="Photograph description" aria-hidden={!showInfo}>
                      <p>{cameraPhoto.description || "No description available for this photograph."}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coverage-camera-controls">
                <div className="coverage-camera-brand"><SakuraLogo /></div>
                <div className="coverage-camera-wheel" role="group" aria-label="Camera photo controls">
                  <button type="button" onClick={() => moveCamera(-1)} className="coverage-camera-button" aria-label="Previous photograph"><FiChevronLeft size={20} aria-hidden="true" /></button>
                  <button type="button" onClick={() => setZoomed((value) => !value)} className="coverage-camera-wheel-center" aria-pressed={zoomed} aria-label={zoomed ? "Return photograph to normal size" : "Zoom into photograph"}><span>OK</span></button>
                  <button type="button" onClick={() => moveCamera(1)} className="coverage-camera-button" aria-label="Next photograph"><FiChevronRight size={20} aria-hidden="true" /></button>
                </div>
                <div className="coverage-camera-bottom-controls" role="group" aria-label="Camera screen controls">
                  <button type="button" onClick={() => setShowInfo((value) => !value)} aria-expanded={showInfo} aria-controls="camera-photo-information" aria-label={showInfo ? "Hide photo information" : "Show photo information"} title={showInfo ? "Hide photo information" : "Show photo information"}><FiInfo size={17} aria-hidden="true" /></button>
                  <button type="button" onClick={() => setZoomed((value) => !value)} aria-pressed={zoomed} aria-label={zoomed ? "Zoom out of photograph" : "Zoom into photograph"} title={zoomed ? "Zoom out" : "Zoom in"}><FiZoomIn size={17} aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">Photograph {position} of {total}: {cameraPhoto.label}</span>

    </div>
  );
}
