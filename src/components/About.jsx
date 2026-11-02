import rainePhoto from "../assets/raine-original-photo.png";
import antigravityLogo from "../assets/antigravity-icon.svg";
import {
  SiBootstrap, SiCanva, SiCodeigniter, SiCplusplus, SiCss, SiFigma,
  SiGit, SiGithub, SiHtml5, SiJavascript, SiLaravel, SiMysql,
  SiNextdotjs, SiPython, SiReact, SiSupabase, SiTailwindcss, SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbBrandAdobePhotoshop, TbBrandAzure } from "react-icons/tb";
import { techGroups } from "../data/portfolioData";

function AntigravityIcon({ size = 20 }) {
  return (
    <img
      className="tech-brand-image"
      src={antigravityLogo}
      width={size}
      height={size}
      alt=""
      loading="lazy"
    />
  );
}

const techVisuals = {
  HTML: [SiHtml5, "#e56a4b"],
  CSS: [SiCss, "#2983bb"],
  JavaScript: [SiJavascript, "#d2a800"],
  Bootstrap: [SiBootstrap, "#8055b3"],
  "Tailwind CSS": [SiTailwindcss, "#16a8c2"],
  React: [SiReact, "#1a9fc8"],
  "Next.js": [SiNextdotjs, "#4c6174"],
  Laravel: [SiLaravel, "#e95b50"],
  CodeIgniter: [SiCodeigniter, "#d96a41"],
  MySQL: [SiMysql, "#4b81a0"],
  Supabase: [SiSupabase, "#39a979"],
  Python: [SiPython, "#4c7fa5"],
  "C++": [SiCplusplus, "#5480ba"],
  Vite: [SiVite, "#7f69c9"],
  Git: [SiGit, "#e46c4f"],
  GitHub: [SiGithub, "#5a647c"],
  "VS Code": [VscVscode, "#2787bc"],
  Antigravity: [AntigravityIcon, "#9a70bd"],
  "Microsoft Azure": [TbBrandAzure, "#3287be"],
  Figma: [SiFigma, "#c5748e"],
  Photoshop: [TbBrandAdobePhotoshop, "#328fbe"],
  Canva: [SiCanva, "#20a6af"],
};

const techGroupLabels = {
  Frontend: "Frontend development",
  Backend: "Backend development",
  "Development & Collaboration": "Development & collaboration",
  Design: "Design & prototyping",
};

function SakuraSprig() {
  const blossoms = [
    { x: 57, y: 91, scale: 0.55 },
    { x: 105, y: 52, scale: 0.8 },
    { x: 153, y: 23, scale: 0.65 },
  ];

  return (
    <svg className="notes-sprig" viewBox="0 0 180 120" aria-hidden="true" focusable="false">
      <path className="notes-branch" d="M4 114 C48 105 70 82 99 57 S147 28 176 8" />
      <path className="notes-leaf" d="M43 99 C31 95 26 86 26 77 C38 79 46 87 43 99ZM83 72 C78 62 80 54 88 47 C94 58 92 66 83 72Z" />
      {blossoms.map(({ x, y, scale }) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${scale})`}>
          {[0, 72, 144, 216, 288].map((angle) => <ellipse className="notes-petal" key={angle} cx="0" cy="-14" rx="6" ry="10" transform={`rotate(${angle})`} />)}
          <circle className="notes-flower-center" r="4" />
        </g>
      ))}
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="chapter-section about-section">
      <div className="max-w-6xl mx-auto about-content">
        <div className="chapter-heading reveal">
          <h2 className="heading-title">About me</h2>
        </div>
        <div className="about-intro-grid">
          <div className="about-story reveal">
            <p>A fourth-year IT student at FEU Institute of Technology specializing in <strong>web and mobile application development</strong>, with a focus on <strong>frontend development, UI/UX design, and quality assurance</strong>. I’m also exploring <strong>full stack development</strong> to understand how products come together from end to end.</p>
            <p>Through academic projects, client work, and student leadership, I’ve gained hands-on experience in <strong>system design, software testing, and project coordination</strong>. I enjoy collaborating with teammates and turning small details into better experiences. Outside of tech, I co-founded <a href="https://www.facebook.com/Kuhakumedia" target="_blank" rel="noopener noreferrer"><strong>Kuhaku Media</strong></a>, where we cover pop culture events, which has sharpened my eye for visual detail.</p>
          </div>
          <figure className="about-portrait reveal">
            <img src={rainePhoto} alt="Portrait of Raine Zaldivar" loading="lazy" />
          </figure>
        </div>
        <div className="about-field-notes reveal">
          <SakuraSprig />
          <div id="education" className="about-block education-block">
            <h3>Education</h3>
            <div className="education-list">
              <article className="education-entry">
                <span className="education-period">2023 - Present</span>
                <h4>FEU Institute of Technology</h4>
                <p>Information Technology - Web and Mobile Applications</p>
              </article>
              <article className="education-entry">
                <span className="education-period">2021-2023</span>
                <h4>ACLC College of Meycauayan</h4>
                <p>ICT - Programming</p>
                <p className="education-distinction">Class Valedictorian</p>
              </article>
            </div>
          </div>
        </div>
        <div id="skills" className="about-block skills-block reveal">
          <div className="chapter-heading"><h3 className="heading-title">Tech Stacks</h3></div>
          <div className="tech-groups">
            {techGroups.map((group) => (
              <div className="tech-group reveal" key={group.name}>
                <h4>{techGroupLabels[group.name]}</h4>
                <ul className="tech-list">
                  {group.tools.map((tool, index) => {
                    const [Icon, color] = techVisuals[tool];
                    return <li key={tool} style={{ "--pill-index": index }}><span className="tech-pill" style={{ "--tech-brand": color }}><span>{tool}</span><Icon size={20} aria-hidden="true" /></span></li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
