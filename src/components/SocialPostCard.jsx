import { FiArrowUpRight } from "react-icons/fi";

const socialImages = {
  ...import.meta.glob("../assets/innov-*.*", { eager: true, query: "?url", import: "default" }),
  ...import.meta.glob("../assets/arta-*.*", { eager: true, query: "?url", import: "default" }),
  ...import.meta.glob("../assets/feutech-*.*", { eager: true, query: "?url", import: "default" }),
  ...import.meta.glob("../assets/kuhaku-*.*", { eager: true, query: "?url", import: "default" }),
};

export default function SocialPostCard({ post, number, actionLabel = "View original post" }) {
  const image = post.previewFile ? socialImages[`../assets/${post.previewFile}`] : null;
  const isCreative = post.source === "creative";

  return (
    <article className="coverage-card social-post-card flex flex-col">
      <div className={`coverage-visual relative overflow-hidden ${isCreative ? "aspect-square" : "aspect-video"}`}>
        {image ? (
          <img src={image} alt={`${post.title} post preview`} className={`w-full h-full ${isCreative ? "object-contain" : "object-cover"}`} loading="lazy" />
        ) : (
          <span className="display-font text-4xl font-semibold p-7 block">{post.category}</span>
        )}
      </div>
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <span className="text-sm font-black accent-text">{String(number).padStart(2, "0")}</span>
        <p className="text-xs font-black uppercase tracking-widest muted mt-4">{post.category}</p>
        <h3 className="display-font text-2xl font-semibold ink leading-tight mt-3">{post.title}</h3>
        <p className="muted text-sm leading-relaxed mt-4 flex-1">{post.description}</p>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 accent-text font-extrabold text-sm mt-8 hover:underline underline-offset-4">
          {actionLabel} <FiArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
