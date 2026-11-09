import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kuhaku from "./components/Kuhaku";
import About from "./components/About";
import Works from "./components/Works";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import SakuraPetals from "./components/SakuraPetals";

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="site-shell">
        <SakuraPetals />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Works />
          <Certificates />
          <Kuhaku />
        </main>
        <Contact />
      </div>
      <CustomCursor />
    </>
  );
}
