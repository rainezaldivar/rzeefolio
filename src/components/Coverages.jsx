import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiInfo, FiZoomIn } from "react-icons/fi";
import { eventCoverages } from "../data/portfolioData";
import cameraMascot from "../assets/coverage-camera.png";
import artwakeningDay2 from "../assets/artwakening-day-2.jpg";
import artwakeningDay1 from "../assets/artwakening-day-1.jpg";
import expochureDay2 from "../assets/expochure-day-2.jpg";
import expochureDay1 from "../assets/expochure-day-1.jpg";
import SakuraLogo from "./SakuraLogo";

const previewImages = import.meta.glob("../assets/coverage-previews/{innov,feutech,kuhaku}-*.jpg", {
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
})).filter((photo) => photo.id !== "innovator-3");

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

// Keep the familiar featured frame first, then browse every source in one sequence.
const photoSequence = Array.from({ length: Math.max(innovatorPhotos.length, kuhakuPhotos.length) }, (_, index) => [
  innovatorPhotos[index],
  kuhakuPhotos[index],
]).flat().filter((photo) => photo?.image);
const featuredPhoto = photoSequence.find((photo) => photo.id === "kuhaku-21");
// IDs recorded from the displayed sequence before removal: 05, 06, 08, 21, 27, 32, 34,
// plus the two final photos still labeled Photograph 37 and Photograph 38.
const removedPhotoIds = new Set([
  "kuhaku-7",
  "innovator-4",
  "innovator-5",
  "innovator-12",
  "innovator-15",
  "innovator-18",
  "innovator-20",
]);
const newEventPhotos = [
  {
    id: "artwakening-day-2",
    label: "ARTwakening Festival — Day 2",
    image: artwakeningDay2,
    fullImage: artwakeningDay2,
    urls: [
      "https://www.facebook.com/share/p/1Pre3qikeH/",
      "https://www.facebook.com/share/p/1K8dTTq7HZ/",
    ],
  },
  {
    id: "artwakening-day-1",
    label: "ARTwakening Festival — Day 1",
    image: artwakeningDay1,
    fullImage: artwakeningDay1,
    url: "https://www.facebook.com/share/p/1HnGYdFQ1Z/",
  },
  {
    id: "expochure-day-2",
    label: "ExPOCHure — Day 2",
    image: expochureDay2,
    fullImage: expochureDay2,
    url: "https://www.facebook.com/share/p/194wdCxaF1/",
  },
  {
    id: "expochure-day-1",
    label: "ExPOCHure — Day 1",
    image: expochureDay1,
    fullImage: expochureDay1,
    url: "https://www.facebook.com/share/p/1DqFuBhR8j/",
  },
];
const allPhotos = [featuredPhoto, ...photoSequence.filter((photo) => photo.id !== "kuhaku-21")]
  .filter((photo) => photo && !removedPhotoIds.has(photo.id))
  .concat(newEventPhotos);

function publicationUrlFor(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function publicationUrlsFor(photo) {
  const links = photo.urls ?? (photo.url ? [photo.url] : []);
  return [...new Set(links.map(publicationUrlFor).filter(Boolean))];
}

export default function Coverages() {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const cameraPhoto = allPhotos[cameraIndex];
  const publicationUrls = publicationUrlsFor(cameraPhoto);
  const publicationUrl = publicationUrls[0] ?? null;
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
          <p>Photography is another way I document stories, capturing people, events, and moments through photojournalism.</p>
          <p>Browse my collection using the camera controls. Select a photograph to view its original publication, when available.</p>
        </header>

        <div className="photography-camera-feature reveal">
          <div className="coverage-camera-scene">
            <div className="coverage-camera" role="region" tabIndex={0} onKeyDown={handleCameraKeyDown} aria-label="Photography camera viewer. Use the controls or left and right arrow keys to browse photographs.">
              <span className="coverage-camera-shutter" aria-hidden="true"><span /></span>
              <div className="coverage-camera-screen-bezel">
                <div className={`coverage-camera-screen${zoomed ? " is-zoomed" : ""}`}>
                  {publicationUrl ? (
                    <a className="coverage-camera-photo-link" href={publicationUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open original publication for ${cameraPhoto.label} (opens in a new tab)`}>{lcdContent}</a>
                  ) : (
                    <div className="coverage-camera-photo-static">{lcdContent}</div>
                  )}
                  <div className={`photography-camera-screen-label${showInfo ? " is-expanded" : ""}`}>
                    <strong>{cameraPhoto.label}</strong>
                    <div id="camera-photo-information" className="photography-camera-screen-description" role="region" aria-label="Photograph description" aria-hidden={!showInfo}>
                      <p>{cameraPhoto.description || "No description available for this photograph."}</p>
                      {showInfo && publicationUrls.length > 1 && (
                        <nav className="photography-camera-publication-links" aria-label={`Publications for ${cameraPhoto.label}`}>
                          {publicationUrls.map((url, index) => (
                            <a key={url} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open publication ${index + 1} for ${cameraPhoto.label} (opens in a new tab)`}>
                              Publication {index + 1}
                            </a>
                          ))}
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="coverage-camera-controls">
                <div className="coverage-camera-brand"><SakuraLogo /></div>
                <div className="coverage-camera-wheel" role="group" aria-label="Camera photo controls">
                  <button type="button" onClick={() => moveCamera(-1)} className="coverage-camera-button" aria-label="Previous photograph"><FiChevronLeft size={20} aria-hidden="true" /></button>
                  <button type="button" onClick={() => { if (publicationUrl) window.open(publicationUrl, "_blank", "noopener,noreferrer"); }} disabled={!publicationUrl} className="coverage-camera-wheel-center" aria-label={publicationUrl ? `Open original publication for ${cameraPhoto.label} (opens in a new tab)` : `No original publication available for ${cameraPhoto.label}`} title={publicationUrl ? "Open original publication" : "No original publication available"}><span>OK</span></button>
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
