import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import rainePhoto from "../assets/raine.jpg";

const ACCENT = "#e1704a";
const ACCENT_HOVER = "#c55c38";

export default function Hero() {
  const { isDark } = useTheme();

  const text = isDark ? "text-[#f2efeb]" : "text-[#27272b]";
  const muted = isDark ? "text-[#f2efeb]/55" : "text-[#27272b]/55";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
        {/* Text side */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 max-w-2xl flex-1"
        >
          {/* Name */}
          <motion.h1
            variants={item}
            className={`text-5xl md:text-7xl font-bold leading-tight ${text}`}
          >
            Raine
            <br />
            Zaldivar
          </motion.h1>

          <motion.p variants={item} className={`text-base ${muted} max-w-sm leading-relaxed`}>
            IT Student · UI/UX Designer · Frontend Developer · QA Tester
          </motion.p>
        </motion.div>

        {/* Photo side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0 0 0 1px ${ACCENT}30, 0 20px 60px ${ACCENT}20`,
            }}
          >
            <img
              src={rainePhoto}
              alt="Raine Zaldivar"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}10 0%, transparent 60%)`,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className={`text-xs ${muted} tracking-widest uppercase`}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiArrowDown size={16} className={muted} />
        </motion.div>
      </motion.div>
    </section>
  );
}
