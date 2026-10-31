import { useEffect, useState } from "react";

const INTRO_KEY = "rz-intro-seen";

function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try { return sessionStorage.getItem(INTRO_KEY) !== "1"; } catch { return true; }
}

export default function SakuraIntro() {
  const [visible, setVisible] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* Storage is optional. */ }
      setVisible(false);
    }, 3100);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="sakura-intro" aria-label="Opening portfolio">
      <div className="intro-landscape" aria-hidden="true">
        <svg className="intro-tree" viewBox="0 0 500 440" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M242 405C257 325 246 267 253 205M253 275C220 244 195 219 171 179M254 241C289 217 319 188 343 151M246 321C210 299 190 277 174 252" stroke="#8E6674" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M241 405C254 326 246 266 252 205M251 273C219 244 195 220 171 179M254 240C289 215 318 187 341 151" stroke="#AD8190" strokeWidth="8" strokeLinecap="round" />
          <path d="M54 186C47 158 65 136 87 128C86 96 111 81 138 88C154 55 192 52 213 72C239 41 279 48 293 77C324 58 358 72 364 103C395 101 417 123 412 151C441 172 432 207 405 218C407 249 376 265 353 252C335 280 301 282 280 260C252 280 219 269 209 242C173 262 145 250 135 222C101 238 69 220 54 186Z" fill="#F4C5D5" stroke="#BB849B" strokeWidth="5" strokeLinejoin="round" />
          <path d="M75 177C77 148 98 138 119 142M132 94C145 86 159 87 169 94M211 78C225 71 242 78 248 89M300 89C317 86 330 94 336 106M382 135C397 140 405 153 405 167M343 237C328 244 314 240 306 228M169 231C183 237 198 230 204 217" stroke="#D99AB1" strokeWidth="6" strokeLinecap="round" />
          <g fill="#FFF7F5"><circle cx="102" cy="178" r="9"/><circle cx="152" cy="139" r="7"/><circle cx="206" cy="107" r="8"/><circle cx="293" cy="124" r="7"/><circle cx="367" cy="165" r="9"/><circle cx="310" cy="206" r="8"/><circle cx="184" cy="197" r="8"/></g>
          <path d="M0 406C100 390 174 396 248 404C325 414 410 391 500 407V440H0V406Z" fill="#A9C7AE" />
        </svg>
        <span className="intro-falling-petal" />
      </div>
      <div className="intro-pink-wash" aria-hidden="true" />
      <p className="intro-caption">Raine's portfolio <span aria-hidden="true">✿</span></p>
      <button type="button" className="intro-skip" onClick={() => { try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* Storage is optional. */ } setVisible(false); }}>Skip intro</button>
    </div>
  );
}
