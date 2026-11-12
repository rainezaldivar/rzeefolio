import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import SakuraLogo from "./SakuraLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#works" },
  { label: "Certifications", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

// The photography section remains on the page but has no navigation item.
const sectionHrefs = ["#home", "#about", "#works", "#certificates", "#outside", "#contact"];

function ThemeButton() {
  const { isDark, toggleTheme } = useTheme();
  const actionLabel = isDark ? "Switch to day mode" : "Switch to night mode";

  return (
    <button type="button" className={`theme-button${isDark ? " is-night" : ""}`} aria-label={actionLabel} title={actionLabel} onClick={toggleTheme}>
      <span className="theme-button-icon" aria-hidden="true">
        <FiSun className="theme-button-sun" />
        <FiMoon className="theme-button-moon" />
      </span>
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
        const current = sectionHrefs.reduce((active, href) => {
          const section = document.querySelector(href);
          return section && section.getBoundingClientRect().top + window.scrollY <= marker ? href : active;
        }, "#home");
        setActiveHref(current === "#outside" ? null : current);
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
          <a href="#home" className="nav-brand" aria-label="Raine Zaldivar, home" onClick={() => setMenuOpen(false)}><SakuraLogo /></a>
          <div className="nav-desktop">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="nav-link" aria-current={activeHref === link.href ? "location" : undefined}>{link.label}</a>)}
            <ThemeButton />
          </div>
          <div className="nav-mobile-actions">
            <ThemeButton />
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
