import { FiArrowUpRight } from "react-icons/fi";
import innovPhoto from "../assets/innov-10.jpg";
import artwakeningPhoto from "../assets/coverage-previews/arta-1.jpg";

const involvement = [
  {
    label: "Student publication",
    title: "The Innovator",
    description: "Campus stories and event coverage for FEU Tech's student community, from student gatherings to arts and advocacy events.",
    image: innovPhoto,
    imageAlt: "The Innovator campus coverage preview",
    href: "https://www.facebook.com/share/p/1CBUhKTjZa/",
  },
  {
    label: "Festival campaign",
    title: "ARTwakening",
    description: "Festival visuals and coverage that celebrate student creativity and performances at FEU Tech.",
    image: artwakeningPhoto,
    imageAlt: "ARTwakening festival performance coverage",
    href: "#creative",
  },
];

export default function SchoolInvolvement() {
  return (
    <section id="school" className="chapter-section school-section">
      <div className="max-w-6xl mx-auto">
        <div className="chapter-heading">
          <span className="chapter-index">04 / COMMUNITY</span>
          <p className="eyebrow">Beyond the classroom</p>
          <h2 className="heading-title">School involvement</h2>
          <p className="muted mt-4 max-w-2xl">The student communities and campus stories that have shaped my creative practice.</p>
        </div>
        <div className="involvement-list">
          {involvement.map((item, index) => (
            <article className="involvement-item" key={item.title}>
              <div className="involvement-marker">{String(index + 1).padStart(2, "0")}</div>
              <div className="involvement-copy">
                <p className="note-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Explore work <FiArrowUpRight size={16} /></a>
              </div>
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
