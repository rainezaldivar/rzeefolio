import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { techStack, designTools } from "../data/portfolioData";

const ACCENT = "#e1704a";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  const { isDark } = useTheme();

  const text = isDark ? "text-[#f2efeb]" : "text-[#27272b]";
  const muted = isDark ? "text-[#f2efeb]/60" : "text-[#27272b]/60";
  const card = isDark
    ? "bg-[#f2efeb]/5 border-[#f2efeb]/10"
    : "bg-[#27272b]/5 border-[#27272b]/10";

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Section Heading — centered, single h2 "About Me" */}
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold uppercase"
              style={{ color: ACCENT }}
            >
              About Me
            </motion.h2>
          </div>

          {/* Bio — centered, larger text */}
          <motion.div
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <p className={`text-lg leading-relaxed text-justify ${muted}`}>
              I am an IT student currently studying at{" "}
              <span className={`font-semibold ${text}`}>FEU Institute of Technology</span>,
              specializing in{" "}
              <span className={`font-semibold ${text}`}>Web and Mobile Applications</span>.
              I also practice as a{" "}
              <span className={`font-semibold ${text}`}>UI/UX designer</span>,{" "}
              <span className={`font-semibold ${text}`}>frontend developer</span>, and{" "}
              <span className={`font-semibold ${text}`}>QA tester</span>.
              Focusing on the user-facing aspects of digital products, from crafting modern,
              minimalist interfaces to conducting rigorous usability testing. While I am{" "}
              <span className={`font-semibold ${text}`}>actively learning backend integration</span>,
              my true forte is ensuring systems look beautiful and
              function flawlessly. Outside of coursework, I co-founded{" "}
              <span className={`font-semibold ${text}`}>Kuhaku Media</span>, a pop culture and
              journalism organization, and I collaborate on academic systems, always aiming to
              ship clean and accessible work. I am currently building my portfolio to prepare for
              a full-time role in the IT industry upon graduation.
            </p>
          </motion.div>

          {/* Tech Stack + Design Tools — centered, larger chips */}
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className={`text-sm uppercase tracking-widest font-semibold mb-5 text-center ${muted}`}>
                Tech Stack
              </p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {techStack.map((tech) => (
                  <motion.span
                    key={tech.name}
                    variants={fadeUp}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-base font-medium ${card} ${text} transition-all duration-200`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div>
              <p className={`text-sm uppercase tracking-widest font-semibold mb-5 text-center ${muted}`}>
                Design Tools
              </p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {designTools.map((tool) => (
                  <motion.span
                    key={tool.name}
                    variants={fadeUp}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-base font-medium ${card} ${text} transition-all duration-200`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {tool.name}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
