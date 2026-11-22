import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiInfo, FiZoomIn } from "react-icons/fi";
import cameraMascot from "../assets/coverage-camera.png";
import expochureDay1 from "../assets/expochure-day-1.jpg";
import expochureDay2 from "../assets/expochure-day-2.jpg";
import bonusLevelPhoto from "../assets/photo-collections/bonus-level-philippines.jpg";
import geekPopPhoto from "../assets/photo-collections/geek-pop-resbak-piccs.jpg";
import gsgwPhoto from "../assets/photo-collections/gsgw.jpg";
import queerlayaanPhoto from "../assets/photo-collections/queerlayaan-3.jpg";
import commencementPhoto from "../assets/event-coverage/65th-commencement.jpg";
import advocacyWeekPhoto from "../assets/event-coverage/advocacy-week-2025.jpg";
import artwakeningPhoto from "../assets/event-coverage/artwakening-2025.jpg";
import dragARamaPhoto from "../assets/event-coverage/drag-a-rama.jpg";
import hardHattingPhoto from "../assets/event-coverage/hard-hatting-ceremony.jpg";
import innovAssemblyPhoto from "../assets/event-coverage/innov-general-assembly.jpg";
import innovMasterclassPhoto from "../assets/event-coverage/innov-masterclass.jpg";
import itamHalalanPhoto from "../assets/event-coverage/itam-halalan-2025.jpg";
import RZMonogram from "./RZMonogram";

const previewImages = import.meta.glob("../assets/coverage-previews/{innov-2,innov-16,feutech-1,kuhaku-1,kuhaku-13,kuhaku-15,kuhaku-16,kuhaku-20,kuhaku-21,kuhaku-24,kuhaku-27,kuhaku-29,kuhaku-30}.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const fullImages = import.meta.glob("../assets/{innov-2,innov-16,feutech-1,kuhaku-1,kuhaku-13,kuhaku-15,kuhaku-16,kuhaku-20,kuhaku-21,kuhaku-24,kuhaku-27,kuhaku-29,kuhaku-30}.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const cameraImages = (file) => ({
  image: previewImages[`../assets/coverage-previews/${file}`],
  fullImage: fullImages[`../assets/${file}`],
});

// The order here is the order shown by the camera. Each entry owns its image,
// title, details, and publication link in one place.
const allPhotos = [
  {
    id: "kuhaku-21",
    label: "Philippine GameDex Expo 2026",
    description: "An attendee poses beside the PASAHERO game display at the expo.",
    url: "https://www.facebook.com/share/p/1DW4U4mb6g/",
    ...cameraImages("kuhaku-21.jpg"),
  },
  {
    id: "kuhaku-1",
    label: "Sarah Joaquin Day",
    description: "Cosplayers pose together in the FEU campus courtyard.",
    url: "https://www.facebook.com/share/p/1HacqzWjG1/",
    ...cameraImages("kuhaku-1.jpg"),
  },
  {
    id: "innovator-2",
    label: "Around the table",
    description: "A group gathers around a laptop for a photograph at a campus event.",
    ...cameraImages("innov-2.jpg"),
  },
  {
    id: "kuhaku-11",
    label: "Eternal Tea Time",
    description: "Three attendees pose together at the fan gathering.",
    url: "https://www.facebook.com/share/p/19QCDn8RQi/",
    image: gsgwPhoto,
  },
  {
    id: "kuhaku-13",
    label: "Kaiju No. 8 Exhibit",
    description: "Two armored cosplayers pose beside character displays at the exhibit.",
    url: "https://www.facebook.com/share/p/1CSRJXGJFn/",
    ...cameraImages("kuhaku-13.jpg"),
  },
  {
    id: "kuhaku-15",
    label: "HoYoFest 2026",
    description: "A cosplayer poses in front of a Honkai: Star Rail display.",
    url: "https://www.facebook.com/share/p/1EuwtyJdrr/",
    ...cameraImages("kuhaku-15.jpg"),
  },
  {
    id: "kuhaku-16",
    label: "Genshin Impact watch party",
    description: "Audience members record the livestream as it plays on the main screen.",
    url: "https://www.facebook.com/share/v/1CHxsGYtXv/",
    ...cameraImages("kuhaku-16.jpg"),
  },
  {
    id: "kuhaku-20",
    label: "Green Yuri CSE",
    description: "Two attendees pose through a frame made by hands in the foreground.",
    url: "https://www.facebook.com/share/p/1RNQjCQpB7/",
    ...cameraImages("kuhaku-20.jpg"),
  },
  {
    id: "kuhaku-23",
    label: "BANDAI NAMCO: Bonus Level Philippines",
    description: "A look at Bandai Namco's Bonus Level Philippines event in Makati.",
    url: "https://www.facebook.com/share/p/1EoxHf3xxg/",
    image: bonusLevelPhoto,
  },
  {
    id: "kuhaku-24",
    label: "Alien Stage pop-up",
    description: "Three cosplayers pose together beside the pop-up's character displays.",
    url: "https://www.facebook.com/share/p/1CmgZgUjSb/",
    ...cameraImages("kuhaku-24.jpg"),
  },
  {
    id: "kuhaku-27",
    label: "Queerlayaan 3",
    description: "Two visitors stand together in front of an illustrated display.",
    url: "https://www.facebook.com/share/p/1FCpNBfHRt/",
    ...cameraImages("kuhaku-27.jpg"),
  },
  {
    id: "kuhaku-28",
    label: "Geek+Pop Resbak x PICCS",
    description: "Visitors browse trading cards at the event.",
    url: "https://www.facebook.com/share/p/19u17XvD8m/",
    image: geekPopPhoto,
  },
  {
    id: "kuhaku-29",
    label: "Run to Elation",
    description: "Two fans show their event keepsakes beside a Honkai: Star Rail display.",
    url: "https://www.facebook.com/share/p/1CYouTSJK1/",
    ...cameraImages("kuhaku-29.jpg"),
  },
  {
    id: "kuhaku-30",
    label: "MATSURI in Manila",
    description: "A guitarist performs under stage lights.",
    url: "https://www.facebook.com/share/p/1FKgtK9Niy/",
    ...cameraImages("kuhaku-30.jpg"),
  },
  {
    id: "innovator-16",
    label: "Battle of the Bands: Rock of Aces 2025",
    description: "Two guitarists face one another during a live performance.",
    url: "https://www.facebook.com/share/p/18fYrNCgQ9/",
    ...cameraImages("innov-16.jpg"),
  },
  {
    id: "innovator-19",
    label: "65th Commencement Sneak Peek",
    description: "The stage is set for FEU Institute of Technology's 65th commencement exercises.",
    url: "https://www.facebook.com/share/p/1CTLe1eRfd/",
    ...cameraImages("feutech-1.jpg"),
  },
  {
    id: "expochure-day-1",
    label: "ExPOCHure — Day 1",
    description: "Dancers in yellow and blue costumes perform together.",
    url: "https://www.facebook.com/share/p/1DqFuBhR8j/",
    image: expochureDay1,
  },
  {
    id: "expochure-day-2",
    label: "ExPOCHure — Day 2",
    description: "A performer in a bright costume emerges through a blue fabric backdrop.",
    url: "https://www.facebook.com/share/p/194wdCxaF1/",
    image: expochureDay2,
  },
  {
    id: "collection-drag-a-rama",
    label: "iTamaraws Drag-A-Rama",
    image: dragARamaPhoto,
    url: "https://www.facebook.com/share/p/1E6eQh2BAu/",
  },
  {
    id: "collection-innov-masterclass",
    label: "INNOV Masterclass: The Playbook",
    image: innovMasterclassPhoto,
    url: "https://www.facebook.com/share/p/1EveXtuib1/",
  },
  {
    id: "collection-artwakening-2025",
    label: "ARTwakening 2025",
    image: artwakeningPhoto,
    url: "https://www.facebook.com/share/p/1Dw8B2RRnR/",
  },
  {
    id: "collection-advocacy-week-2025",
    label: "Advocacy Week 2025",
    image: advocacyWeekPhoto,
    url: "https://www.facebook.com/share/p/19GtGVmZfq/",
  },
  {
    id: "collection-innov-general-assembly",
    label: "The Innovator General Assembly",
    image: innovAssemblyPhoto,
    url: "https://www.facebook.com/share/p/1EPNYVsBsW/",
  },
  {
    id: "collection-hard-hatting-ceremony",
    label: "SucCEssion: The First Hard-Hatting Ceremony",
    image: hardHattingPhoto,
    url: "https://www.facebook.com/share/p/1GxjjP2VPB/",
  },
  {
    id: "collection-65th-commencement",
    label: "FEU Tech 65th Commencement Exercise",
    image: commencementPhoto,
    url: "https://www.facebook.com/share/p/1AC5snSK75/",
  },
  {
    id: "collection-itam-halalan-2025",
    label: "iTam Halalan 2025",
    image: itamHalalanPhoto,
    url: "https://www.facebook.com/share/p/19mRsHFLSz/",
  },
  {
    id: "collection-queerlayaan",
    label: "Queerlayaan 3",
    description: "Art and community at StickerCon Queerlayaan's third year in Pasig.",
    url: "https://www.facebook.com/share/p/1FCpNBfHRt/",
    image: queerlayaanPhoto,
  },
];

function publicationUrlFor(value) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export default function Coverages() {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const reduceMotion = useReducedMotion();
  const cameraPhoto = allPhotos[cameraIndex];

  useEffect(() => {
    // Have the neighboring previews ready before the camera switches frames.
    for (const offset of [-1, 1]) {
      const photo = allPhotos[(cameraIndex + offset + allPhotos.length) % allPhotos.length];

      if (photo?.image) {
        new Image().src = photo.image;
      }
    }
  }, [cameraIndex]);

  const publicationUrl = publicationUrlFor(cameraPhoto.url);
  const position = String(cameraIndex + 1).padStart(2, "0");
  const total = String(allPhotos.length).padStart(2, "0");

  const moveCamera = (direction) => {
    setZoomed(false);
    setCameraIndex(
      (current) => (current + direction + allPhotos.length) % allPhotos.length,
    );
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
    <AnimatePresence initial={false}>
      <Motion.span
        className="coverage-camera-photo"
        key={cameraPhoto.id}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeInOut" }}
      >
        <img
          src={zoomed ? cameraPhoto.fullImage ?? cameraPhoto.image : cameraPhoto.image}
          alt=""
          className="coverage-camera-photo-main"
        />
      </Motion.span>
    </AnimatePresence>
  );

  return (
    <div id="coverages" className="photography-gallery">
      <div className="photography-layout">
        <header className="photography-intro reveal">
          <p className="photography-intro-eyebrow">A little life outside the screen</p>
          <div className="photography-intro-heading">
            <h2 id="outside-heading" className="heading-title">Beyond IT</h2>
            <img
              src={cameraMascot}
              alt="Hachiware holding a camera"
              className="photography-mascot"
              loading="lazy"
            />
          </div>
          <p>Away from my desk, I photograph campus events, creative communities, and the people who bring them to life.</p>
        </header>

        <div className="photography-camera-feature reveal">
          <div className="coverage-camera-scene">
            <div
              className="coverage-camera"
              role="region"
              tabIndex={0}
              onKeyDown={handleCameraKeyDown}
              aria-label="Photography camera viewer. Use the controls or left and right arrow keys to browse photographs."
            >
              <span className="coverage-camera-shutter" aria-hidden="true">
                <span />
              </span>
              <div className="coverage-camera-screen-bezel">
                <div className={`coverage-camera-screen${zoomed ? " is-zoomed" : ""}`}>
                  <a
                    className={publicationUrl ? "coverage-camera-photo-link" : "coverage-camera-photo-static"}
                    href={publicationUrl ?? undefined}
                    target={publicationUrl ? "_blank" : undefined}
                    rel={publicationUrl ? "noopener noreferrer" : undefined}
                    aria-label={publicationUrl ? `Open original publication for ${cameraPhoto.label} (opens in a new tab)` : undefined}
                    tabIndex={publicationUrl ? undefined : -1}
                  >
                    {lcdContent}
                  </a>
                  <span className="coverage-camera-screen-top" aria-hidden="true">
                    {position} / {total}
                  </span>
                  <div className="coverage-camera-screen-copy">
                    <span className="coverage-camera-screen-title" key={`title-${cameraPhoto.id}`}>
                      {cameraPhoto.label}
                    </span>
                    <Motion.div
                      id="camera-photo-information"
                      className="coverage-camera-screen-details"
                      role="region"
                      aria-label={`Information for ${cameraPhoto.label}`}
                      aria-hidden={!showInfo}
                      inert={!showInfo}
                      initial={false}
                      animate={{ height: showInfo ? "auto" : 0, opacity: showInfo ? 1 : 0, y: showInfo ? 0 : 8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="coverage-camera-screen-details-inner">
                        <p>{cameraPhoto.description || "No description available for this photograph."}</p>
                      </div>
                    </Motion.div>
                  </div>
                </div>
              </div>
              <div className="coverage-camera-controls">
                <div className="coverage-camera-brand">
                  <RZMonogram />
                </div>
                <div className="coverage-camera-wheel" role="group" aria-label="Camera photo controls">
                  <button
                    type="button"
                    onClick={() => moveCamera(-1)}
                    className="coverage-camera-button"
                    aria-label="Previous photograph"
                  >
                    <FiChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (publicationUrl) {
                        window.open(publicationUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                    disabled={!publicationUrl}
                    className="coverage-camera-wheel-center"
                    aria-label={
                      publicationUrl
                        ? `Open original publication for ${cameraPhoto.label} (opens in a new tab)`
                        : `No original publication available for ${cameraPhoto.label}`
                    }
                    title={publicationUrl ? "Open original publication" : "No original publication available"}
                  >
                    <span>OK</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCamera(1)}
                    className="coverage-camera-button"
                    aria-label="Next photograph"
                  >
                    <FiChevronRight size={20} aria-hidden="true" />
                  </button>
                </div>
                <div className="coverage-camera-bottom-controls" role="group" aria-label="Camera screen controls">
                  <button
                    type="button"
                    onClick={() => setShowInfo((value) => !value)}
                    aria-expanded={showInfo}
                    aria-controls="camera-photo-information"
                    aria-label={showInfo ? "Hide photo information" : "Show photo information"}
                    title={showInfo ? "Hide photo information" : "Show photo information"}
                  >
                    <FiInfo size={17} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomed((value) => !value)}
                    aria-pressed={zoomed}
                    aria-label={zoomed ? "Zoom out of photograph" : "Zoom into photograph"}
                    title={zoomed ? "Zoom out" : "Zoom in"}
                  >
                    <FiZoomIn size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="photography-camera-hint">
            Use the arrows to browse. Tap the info button for details. Select a photo to open its original post when available.
          </p>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        Photograph {position} of {total}: {cameraPhoto.label}
      </span>
    </div>
  );
}
