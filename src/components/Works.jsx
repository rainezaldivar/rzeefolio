import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../data/portfolioData";

const ACCENT = "#e1704a";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function ProjectCard({ project }) {
  const { isDark } = useTheme();

  const card = isDark
    ? "bg-[#f2efeb]/5 border-[#f2efeb]/10"
    : "bg-[#27272b]/[0.03] border-[#27272b]/10";
  const text = isDark ? "text-[#f2efeb]" : "text-[#27272b]";
  const muted = isDark ? "text-[#f2efeb]/50" : "text-[#27272b]/50";
  const chip = isDark ? "bg-[#f2efeb]/8 text-[#f2efeb]/70" : "bg-[#27272b]/8 text-[#27272b]/60";

  const isInProgress = project.status === "in-progress";

  const thumbnailContent = project.image ? (
    /* Real screenshot thumbnail */
    <div className="w-full h-full relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top"
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        style={{ backgroundColor: project.color + "33" }}
      >
        <HiArrowTopRightOnSquare size={28} style={{ color: "#ffffff" }} />
      </div>
    </div>
  ) : (
    /* Placeholder pattern for projects without screenshots */
    <div
      className="w-full h-full flex items-center justify-center relative"
      style={{ backgroundColor: project.color + "18" }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            ${project.color},
            ${project.color} 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: project.color + "28",
            border: `2px solid ${project.color}45`,
          }}
        >
          <span className="text-lg" style={{ color: project.color }}>⚙</span>
        </div>
        <span className="text-xs font-medium opacity-60" style={{ color: project.color }}>
          Coming Soon
        </span>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={fadeUp}
      className={`group relative flex flex-col border rounded-xl overflow-hidden transition-all duration-300 ${card}`}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = project.color + "55")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
    >
      {/* Status badge */}
      {isInProgress && (
        <div
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
          style={{ backgroundColor: project.color + "18", borderColor: project.color + "40" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: project.color }}
          />
          <span className="text-xs font-medium" style={{ color: project.color }}>
            In Development
          </span>
        </div>
      )}

      {/* Thumbnail — clickable if liveUrl exists */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden aspect-video"
          aria-label={`Visit ${project.title}`}
        >
          {thumbnailContent}
        </a>
      ) : (
        <div className="block relative overflow-hidden aspect-video">
          {thumbnailContent}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className={`text-lg font-bold ${text}`}>{project.title}</h3>
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: project.color }}>
          {project.role}
        </p>
        <p className={`text-sm leading-relaxed text-justify ${muted} flex-1`}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className={`text-xs px-2 py-0.5 rounded-md font-medium ${chip}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Works() {
  const { isDark } = useTheme();
  const text = isDark ? "text-[#f2efeb]" : "text-[#27272b]";
  const muted = isDark ? "text-[#f2efeb]/50" : "text-[#27272b]/50";
  const divider = isDark ? "border-[#f2efeb]/10" : "border-[#27272b]/10";

  const completed = projects.filter((p) => p.status === "completed");
  const inProgress = projects.filter((p) => p.status === "in-progress");

  return (
    <section id="works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-4 uppercase"
            style={{ color: "#e1704a" }}
          >
            Projects
          </motion.h2>
          <motion.p variants={fadeUp} className={`text-base mb-12 ${muted}`}>
            A collection of projects I've built or collaborated on.
          </motion.p>

          {/* Completed */}
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {completed.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className={`border-t ${divider} mb-10`} />

          {/* In Development */}
          <motion.p
            variants={fadeUp}
            className={`text-xs uppercase tracking-widest font-semibold mb-6 ${muted}`}
          >
            Currently in development
          </motion.p>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgress.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
