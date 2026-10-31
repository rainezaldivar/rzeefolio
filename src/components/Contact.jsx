import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiMail } from "react-icons/fi";

const socials = [
  { href: "https://github.com/rainezaldivar", label: "GitHub", icon: <FiGithub size={19} /> },
  { href: "https://www.linkedin.com/in/rainezaldivar", label: "LinkedIn", icon: <FiLinkedin size={19} /> },
  { href: "https://www.facebook.com/RaineeZzz", label: "Facebook", icon: <FiFacebook size={19} /> },
  { href: "https://www.instagram.com/rzeeecola", label: "Instagram", icon: <FiInstagram size={19} /> },
];

export default function Contact() {
  return (
    <footer id="contact" className="contact-section contact-editorial">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow">Let's talk</p>
        <div className="contact-layout">
          <div>
            <h2 className="heading-title mt-3">Have a story or a project in mind?</h2>
            <p className="muted mt-5 max-w-xl text-lg leading-relaxed">I'm open to collaborations and conversations about development, photography, and creative work.</p>
          </div>
          <div className="contact-actions">
            <a href="mailto:zaldivarraine17@gmail.com">Send an email <FiArrowUpRight size={20} /></a>
            <a href="/RaineCV.pdf" download="Raine_Zaldivar_CV.pdf">Download CV <FiArrowDown size={20} /></a>
          </div>
        </div>
        <div className="contact-bottom">
          <span>Raine Zaldivar <span aria-hidden="true">✿</span></span>
          <div className="contact-socials">{socials.map(({ href, label, icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>)}</div>
          <small>© {new Date().getFullYear()} Raine Zaldivar</small>
        </div>
      </div>
    </footer>
  );
}
