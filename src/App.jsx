import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kuhaku from "./components/Kuhaku";
import Coverages from "./components/Coverages";
import Creative from "./components/Creative";
import About from "./components/About";
import Works from "./components/Works";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import SectionDivider from "./components/SectionDivider";
import CustomCursor from "./components/CustomCursor";
import SchoolInvolvement from "./components/SchoolInvolvement";
import SocialMedia from "./components/SocialMedia";
import SakuraIntro from "./components/SakuraIntro";

export default function App() {
  return (
    <>
      <div className="site-shell">
        <a className="skip-link" href="#home">Skip to content</a>
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Works />
          <SectionDivider />
          <Certificates />
          <SectionDivider />
          <SchoolInvolvement />
          <SectionDivider />
          <div id="outside" className="outside-chapter">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
              <p className="eyebrow">Beyond the course</p>
              <h2 className="heading-title mt-3">Outside the scope of my course</h2>
              <p className="muted mt-4 max-w-2xl">Photography, campus stories, design, and the communities I help bring together online.</p>
            </div>
            <Kuhaku />
            <Coverages />
            <SectionDivider />
            <SocialMedia />
            <Creative />
          </div>
        </main>
        <Contact />
      </div>
      <SakuraIntro />
      <CustomCursor />
    </>
  );
}
