import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

const contactLinks = [
  { label: "Email", detail: "zaldivarraine17@gmail.com", href: "mailto:zaldivarraine17@gmail.com" },
  { label: "Instagram", detail: "@rzeeecola", href: "https://www.instagram.com/rzeeecola", external: true },
  { label: "Facebook", detail: "Raine Zaldivar", href: "https://www.facebook.com/RaineeZzz", external: true },
  { label: "GitHub", detail: "rainezaldivar", href: "https://github.com/rainezaldivar", external: true },
  { label: "LinkedIn", detail: "Raine Zaldivar", href: "https://www.linkedin.com/in/rainezaldivar", external: true },
];

export default function Contact() {
  return (
    <footer id="contact" className="contact-section contact-editorial">
      <div className="projects-container mx-auto contact-content">
        <div className="chapter-heading reveal"><h2 className="heading-title">Let's talk</h2></div>
        <div className="contact-layout reveal">
          <div className="contact-message">
            <h3 className="contact-question">Have a story or a project in mind?</h3>
            <p className="muted mt-5 max-w-xl text-lg leading-relaxed">I'm open to collaborations and conversations about development, photography, and creative work.</p>
          </div>
          <div id="socials" className="contact-actions" aria-label="Contact links">
            {contactLinks.map(({ label, detail, href, external }) => (
              <a key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span><strong>{label}</strong><small>{detail}</small></span>
                <FiArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
            <a href="/RaineCV.pdf" download="Raine_Zaldivar_CV.pdf">
              <span><strong>Download CV</strong></span><FiArrowDown size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="contact-bottom reveal">
          <span>Raine Zaldivar <span aria-hidden="true">&#10047;</span></span>
          <a className="contact-back" href="#home">Back to top <FiArrowUpRight size={17} aria-hidden="true" /></a>
          <small>&copy; {new Date().getFullYear()} Raine Zaldivar</small>
        </div>
      </div>
    </footer>
  );
}
