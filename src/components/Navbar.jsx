import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#works" },
  { label: "Credentials", href: "#certificates" },
  { label: "School", href: "#school" },
  { label: "Beyond IT", href: "#outside" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = navLinks.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(`#${visible[0].target.id}`);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="site-nav-wrap" aria-label="Main navigation">
        <div className="site-nav">
          <a href="#home" className="nav-brand" onClick={() => setMenuOpen(false)}>Raine<span aria-hidden="true">✿</span></a>
          <div className="nav-desktop">
            {navLinks.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} className="nav-link">{link.label}</a>)}
          </div>
          <div className="nav-actions">
            <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to day mode" : "Switch to night mode"} className="icon-button">
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="icon-button nav-menu-toggle">
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
        {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} aria-current={active === link.href ? "location" : undefined} className="nav-link">{link.label}</a>)}
      </nav>}
    </>
  );
}
