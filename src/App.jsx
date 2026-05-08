import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDark ? "bg-[#27272b] text-[#f2efeb]" : "bg-[#f2efeb] text-[#27272b]"
      }`}
    >
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Works />
        <SectionDivider />
        <Certificates />
      </main>
      <Contact />
    </div>
  );
}
