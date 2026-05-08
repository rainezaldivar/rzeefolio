import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiArrowDown } from "react-icons/hi2";
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ACCENT = "#e1704a";
const ACCENT_HOVER = "#c55c38";
const EMAIL = "zaldivarraine17@gmail.com";
const GITHUB_URL = "https://github.com/rainezaldivar";
const LINKEDIN_URL = "https://www.linkedin.com/in/rainezaldivar";
const FACEBOOK_URL = "https://www.facebook.com/RaineeZzz";
const INSTAGRAM_URL = "https://www.instagram.com/rzeeecola";

export default function Footer() {
  const { isDark } = useTheme();

  const text = isDark ? "text-[#f2efeb]" : "text-[#27272b]";
  const muted = isDark ? "text-[#f2efeb]/50" : "text-[#27272b]/50";
  const btnBase = isDark
    ? "border-[#f2efeb]/20 text-[#f2efeb]"
    : "border-[#27272b]/20 text-[#27272b]";

  // Footer background: darker/lighter variant of the palette
  const footerBg = isDark ? "bg-[#1e1e21]" : "bg-[#ebe7e1]";
  const dividerColor = isDark ? "border-[#f2efeb]/10" : "border-[#27272b]/10";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const socials = [
    { href: GITHUB_URL, label: "GitHub", icon: <FiGithub size={20} /> },
    { href: LINKEDIN_URL, label: "LinkedIn", icon: <FiLinkedin size={20} /> },
    { href: FACEBOOK_URL, label: "Facebook", icon: <FiFacebook size={20} /> },
    { href: INSTAGRAM_URL, label: "Instagram", icon: <FiInstagram size={20} /> },
  ];

  return (
    <footer
      id="contact"
      className={`${footerBg} px-6 relative flex flex-col`}
      style={{ minHeight: "75vh" }}
    >
      {/* Main content — vertically centered in the 75vh space */}
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center flex-1 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {/* 2-column layout: left = heading/description, right = CTA + socials */}
          <motion.div
            variants={fadeUp}
            className="grid md:grid-cols-2 gap-16 items-center mb-20"
          >
            {/* Left: heading + description */}
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: ACCENT }}
              >
                Contact
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${text}`}>
                Get in touch.
              </h2>
              <p className={`text-base ${muted} leading-relaxed text-justify max-w-sm`}>
                Open for collaborations or just a conversation. Reach out anytime.
              </p>
            </div>

            {/* Right: Send Email + Download CV + socials */}
            <div className="flex flex-col gap-8">
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg active:scale-95 transition-all duration-200 text-sm text-[#f2efeb]"
                  style={{ backgroundColor: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
                >
                  <HiOutlineEnvelope size={17} />
                  Send an Email
                </a>
                <a
                  href="/RaineCV.pdf"
                  download="Raine_Zaldivar_CV.pdf"
                  className={`inline-flex items-center gap-2 px-6 py-3 border rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 ${btnBase}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.color = ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.color = "";
                  }}
                >
                  <HiArrowDown size={16} />
                  Download CV
                </a>
              </div>

              {/* Social icons */}
              <div className="flex gap-3">
                {socials.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`p-3 rounded-full border transition-all duration-200 ${btnBase}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            variants={fadeUp}
            className={`border-t ${dividerColor} pt-8 flex flex-col sm:flex-row items-center justify-between gap-4`}
          >
            <p className={`text-xl font-bold tracking-tight ${text}`}>
              Raine <span style={{ color: ACCENT }}>Zaldivar</span>
            </p>
            <p className={`text-xs ${muted}`}>
              © {new Date().getFullYear()} Raine Zaldivar. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
