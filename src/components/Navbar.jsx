import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#works" },
  { label: "Credentials", href: "#certificates" },
  { label: "Outside", href: "#outside" },
  { label: "Contact", href: "#contact" },
];

function SakuraLogo() {
  return (
    <svg viewBox="0 0 86 54" aria-hidden="true" focusable="false">
      <g fill="#ffd6e3" stroke="#a95f80" strokeWidth="1.5">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cx="23" cy="11" rx="8" ry="12" transform={`rotate(${angle} 23 25)`} />
        ))}
        <circle cx="23" cy="25" r="5" fill="#ffe8a5" />
      </g>
      <text x="40" y="38" fill="currentColor" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="27" fontWeight="700" letterSpacing="-3">RZ</text>
    </svg>
  );
}

function ThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-switch" role="switch" aria-checked={isDark} aria-label={isDark ? "Night mode, switch to day mode" : "Day mode, switch to night mode"} onClick={toggleTheme}>
      <span className="theme-switch-thumb" aria-hidden="true">{isDark ? <FiMoon size={24} /> : <FiSun size={25} />}</span>
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const menuButton = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const marker = window.scrollY + Math.min(window.innerHeight * .45, 400);
        const current = navLinks.reduce((active, link) => {
          const section = document.querySelector(link.href);
          return section && section.getBoundingClientRect().top + window.scrollY <= marker ? link.href : active;
        }, "#home");
        setActiveHref(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1060) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`site-nav-wrap${scrolled ? " is-scrolled" : ""}`} aria-label="Main navigation">
        <div className="site-nav">
          <a href="#home" className="nav-brand" aria-label="RZ, home" onClick={() => setMenuOpen(false)}><SakuraLogo /></a>
          <div className="nav-desktop">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="nav-link" aria-current={activeHref === link.href ? "location" : undefined}>{link.label}</a>)}
            <ThemeSwitch />
          </div>
          <div className="nav-mobile-actions">
            <ThemeSwitch />
            <button ref={menuButton} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="icon-button">
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>
      <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation" hidden={!menuOpen}>
        {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="nav-link" aria-current={activeHref === link.href ? "location" : undefined}>{link.label}</a>)}
      </nav>
    </>
  );
}
