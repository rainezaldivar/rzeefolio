import { FiArrowDown, FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";

const profileLinks = [
  { label: "Instagram", username: "@rzeeecola", href: "https://www.instagram.com/rzeeecola", icon: SiInstagram },
  { label: "Facebook", username: "RaineeZzz", href: "https://www.facebook.com/RaineeZzz", icon: SiFacebook },
  { label: "GitHub", username: "rainezaldivar", href: "https://github.com/rainezaldivar", icon: SiGithub },
  { label: "LinkedIn", username: "rainezaldivar", href: "https://www.linkedin.com/in/rainezaldivar", icon: FaLinkedin },
];

export default function Contact() {
  return (
    <footer id="contact" className="contact-section contact-editorial" aria-labelledby="contact-heading">
      <div className="projects-container mx-auto contact-content">
        <div className="footer-main">
          <div className="footer-intro reveal">
            <h2 id="contact-heading" className="footer-heading">Have a story or a project in mind?</h2>
            <p className="footer-summary">I'm open to collaborations and conversations about development, photography, and creative work.</p>
          </div>
          <div className="footer-contact-column reveal">
            <nav id="socials" className="footer-social-list" aria-label="Social and professional profiles">
              {profileLinks.map(({ label, username, href, icon }) => {
                const Icon = icon;
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} ${username} (opens in a new tab)`}>
                    <Icon className="footer-social-icon" aria-hidden="true" />
                    <span className="footer-social-divider" aria-hidden="true">-</span>
                    <span className="footer-social-name">{username}</span>
                  </a>
                );
              })}
            </nav>
            <a className="footer-contact-link" href="mailto:zaldivarraine17@gmail.com">
              <FiMail className="footer-social-icon" aria-hidden="true" />
              <span className="footer-social-divider" aria-hidden="true">-</span>
              <span className="footer-social-name">zaldivarraine17@gmail.com</span>
            </a>
            <a className="footer-contact-link" href="/RaineCV.pdf" download="Raine_Zaldivar_CV.pdf">
              <FiArrowDown className="footer-social-icon" aria-hidden="true" />
              <span className="footer-social-divider" aria-hidden="true">-</span>
              <span className="footer-social-name">Download CV</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom reveal">
          <small>&copy; 2026 Raine Zaldivar</small>
          <a className="footer-back" href="#home">Back to top <FiArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
