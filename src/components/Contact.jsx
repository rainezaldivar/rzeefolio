import { FiArrowDown, FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";

const profileLinks = [
  { label: "Facebook", username: "RaineeZzz", href: "https://www.facebook.com/RaineeZzz", icon: SiFacebook },
  { label: "Instagram", username: "@rzeeecola", href: "https://www.instagram.com/rzeeecola", icon: SiInstagram },
  { label: "GitHub", username: "rainezaldivar", href: "https://github.com/rainezaldivar", icon: SiGithub },
  { label: "LinkedIn", username: "rainezaldivar", href: "https://www.linkedin.com/in/rainezaldivar", icon: FaLinkedin },
];

export default function Contact() {
  return (
    <footer id="contact" className="contact-section contact-editorial" aria-labelledby="contact-heading">
      <div className="projects-container mx-auto contact-content">
        <div className="footer-main">
          <div className="footer-intro reveal">
            <h2 id="contact-heading" className="footer-heading">Let's talk about what's next.</h2>
            <p className="footer-summary">I welcome internship opportunities and collaborations in development, photography, and creative work.</p>
            <p className="footer-connect">Let's connect.</p>
          </div>
          <div className="footer-contact-column reveal">
            <nav id="socials" className="footer-social-list" aria-label="Contact and professional profiles">
              <a href="mailto:zaldivarraine17@gmail.com" aria-label="Email zaldivarraine17@gmail.com">
                <FiMail className="footer-social-icon" aria-hidden="true" />
                <span className="footer-social-divider" aria-hidden="true">-</span>
                <span className="footer-social-name">zaldivarraine17@gmail.com</span>
              </a>
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
              <a href="/RaineCV.pdf" download="Raine_Zaldivar_CV.pdf" aria-label="Download CV">
                <FiArrowDown className="footer-social-icon" aria-hidden="true" />
                <span className="footer-social-divider" aria-hidden="true">-</span>
                <span className="footer-social-name">Download CV</span>
              </a>
            </nav>
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
