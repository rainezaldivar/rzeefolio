import { FiArrowDown, FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";
import { motion as Motion, useReducedMotion } from "framer-motion";

const profileLinks = [
  { label: "Facebook", username: "RaineeZzz", href: "https://www.facebook.com/RaineeZzz", icon: SiFacebook },
  { label: "Instagram", username: "@rzeeecola", href: "https://www.instagram.com/rzeeecola", icon: SiInstagram },
  { label: "GitHub", username: "rainezaldivar", href: "https://github.com/rainezaldivar", icon: SiGithub },
  { label: "LinkedIn", username: "rainezaldivar", href: "https://www.linkedin.com/in/rainezaldivar", icon: FaLinkedin },
];

const focusRing = "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--footer-focus)]";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer
      id="contact"
      className="contact-section contact-footer relative flex min-h-svh flex-col px-gutter pb-6 pt-[clamp(8rem,16vh,11rem)] text-[var(--footer-ink)] sm:pb-10 lg:pt-[clamp(10rem,20vh,13rem)]"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-section)] flex-1 flex-col">
        <div className="grid flex-1 grid-cols-1 items-center gap-12 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] lg:gap-[clamp(3rem,8vw,8rem)] lg:py-14">
          <Motion.div {...reveal} className="min-w-0 max-w-[42rem]">
            <span className="mb-8 block h-0.5 w-14 bg-[var(--footer-accent)]" aria-hidden="true" />
            <h2
              id="contact-heading"
              className="m-0 font-display text-[clamp(4rem,8vw,8rem)] font-semibold leading-[.88] tracking-[-.045em] text-balance max-sm:text-[clamp(3.5rem,17vw,5.5rem)]"
            >
              Let&apos;s Connect.
            </h2>
            <p className="mt-8 max-w-[45ch] font-sans text-[clamp(.96rem,1.1vw,1.05rem)] leading-[1.7] font-medium text-[var(--footer-muted)] sm:mt-10">
              Have an opportunity, an idea, or simply want to connect? I&apos;d love to hear from you.
            </p>
          </Motion.div>

          <Motion.div {...reveal} className="min-w-0 w-full max-w-[30rem] lg:justify-self-end">
            <p className="mb-3 text-[.72rem] font-bold tracking-[.14em] text-[var(--footer-muted)] uppercase">
              For opportunities &amp; inquiries
            </p>
            <Motion.a
              href="mailto:zaldivarraine17@gmail.com"
              className={`group flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-small)] border border-[var(--footer-button-line)] bg-[var(--footer-button)] px-5 py-4 font-sans text-base font-bold text-[var(--footer-button-ink)] no-underline ${focusRing}`}
              whileHover={reduceMotion ? undefined : { y: -2, backgroundColor: "#f5c9d6" }}
              whileTap={reduceMotion ? undefined : { y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMail className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Email Me</span>
              <FiArrowUpRight className="ml-auto h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
            </Motion.a>

            <p className="mb-3 mt-10 text-[.72rem] font-bold tracking-[.14em] text-[var(--footer-muted)] uppercase sm:mt-12">
              Find me on
            </p>
            <nav id="socials" className="border-t border-[var(--footer-line)]" aria-label="Social and professional profiles">
              {profileLinks.map(({ label, username, href, icon }) => {
                const Icon = icon;
                return (
                  <Motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} ${username} (opens in a new tab)`}
                    className={`group grid min-h-14 grid-cols-[1.25rem_minmax(0,1fr)_1rem] items-center gap-3 border-b border-[var(--footer-line)] py-3 text-base text-[var(--footer-ink)] no-underline transition-colors duration-200 hover:text-[var(--footer-accent)] focus-visible:text-[var(--footer-accent)] ${focusRing}`}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem] text-[var(--footer-accent)]" aria-hidden="true" />
                    <span className="min-w-0">{label}</span>
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                  </Motion.a>
                );
              })}
            </nav>
            <a
              className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--footer-muted)] underline underline-offset-4 transition-colors duration-200 hover:text-[var(--footer-accent)] ${focusRing}`}
              href="/RaineCV.pdf"
              download="Raine_Zaldivar_CV.pdf"
            >
              <FiArrowDown className="h-4 w-4 text-[var(--footer-accent)]" aria-hidden="true" />
              Download my CV
            </a>
          </Motion.div>
        </div>

        <Motion.div {...reveal} className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[var(--footer-line)] pt-5 text-[var(--footer-muted)]">
          <small className="text-xs sm:text-[.8rem]">&copy; 2026 Raine Zaldivar</small>
          <a
            href="#home"
            onClick={scrollToTop}
            className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--footer-ink)] transition-colors duration-200 hover:text-[var(--footer-accent)] ${focusRing}`}
          >
            Back to top <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Motion.div>
      </div>
    </footer>
  );
}
