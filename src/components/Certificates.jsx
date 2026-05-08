import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { certificates } from "../data/portfolioData";

const ACCENT = "#e1704a";
const ACCENT_HOVER = "#c55c38";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Certificates() {
  const { isDark } = useTheme();

  const text = isDark ? "text-[#f2efeb]" : "text-[#27272b]";
  const muted = isDark ? "text-[#f2efeb]/50" : "text-[#27272b]/50";
  const card = isDark
    ? "bg-[#f2efeb]/5 border-[#f2efeb]/10"
    : "bg-[#27272b]/[0.03] border-[#27272b]/10";

  return (
    <section id="certificates" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-8 uppercase"
            style={{ color: ACCENT }}
          >
            Certificates
          </motion.h2>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`relative flex flex-col border rounded-xl overflow-hidden cursor-default transition-all duration-300 ${card}`}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT + "55")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                {/* Certificate image */}
                {cert.image ? (
                  <div className={`w-full aspect-[4/3] overflow-hidden flex items-center justify-center ${cert.imagePadding || ""}`} style={{ backgroundColor: ACCENT + "08" }}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  /* Fallback placeholder */
                  <div
                    className="w-full aspect-[4/3] flex items-center justify-center relative"
                    style={{ backgroundColor: ACCENT + "15" }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          135deg,
                          ${ACCENT},
                          ${ACCENT} 1px,
                          transparent 1px,
                          transparent 14px
                        )`,
                      }}
                    />
                    <div
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: ACCENT + "22",
                        border: `2px solid ${ACCENT}45`,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={ACCENT}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="p-4" style={{ borderTop: `2px solid ${ACCENT}30` }}>
                  <p className={`text-sm font-semibold leading-tight mb-1 ${text}`}>
                    {cert.title}
                  </p>
                  <p className={`text-xs ${muted}`}>
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
