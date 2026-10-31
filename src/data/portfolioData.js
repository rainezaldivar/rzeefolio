import albanImg from "../assets/project-previews/alban.jpg";
import pokemonImg from "../assets/project-previews/pokemon.jpg";
import smiskisiteImg from "../assets/smiskisite.png";
import ciscoImg from "../assets/cisco.png";
import pmiImg from "../assets/PMI.png";

export const projects = [
  {
    id: 1,
    title: "Alban Memorial Foundation",
    description:
      "A charity website for the Alban Memorial Foundation that empowers disadvantaged Filipino families through wellness and livelihood programs. Focused on total human development, it provides educational support and financial aid to help marginalized sectors achieve self-sufficiency.",
    role: "Front-End Development",
    tech: ["PHP", "Tailwind CSS", "HTML", "JavaScript"],
    status: "completed",
    liveUrl: "https://albanmemorial.onrender.com/",
    image: albanImg,
  },
  {
    id: 2,
    title: "Pokémon GO Web Store",
    description:
      "A Pokémon GO inspired web store built as a final project. This reimagines the official storefront with a cleaner, more modern UI. Focusing on making the user experience smoother for browsing in-game items, collections, and special events.",
    role: "Front-End Developer",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "completed",
    liveUrl: "https://4eyesfeutech.github.io/FINAL-PROJECT-FOR-IT0063/",
    image: pokemonImg,
  },
  {
    id: 4,
    title: "Smiskisite",
    description:
      "Originally built as a third-year CodeIgniter class final project, Smiskisite is a fan-made storefront for Smiski collectors. Refurbished with Next.js, it lets visitors browse collections and search and filter products.",
    role: "Full-Stack Development",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    status: "in-progress",
    liveUrl: "https://smiskisite.vercel.app/",
    image: smiskisiteImg,
  },
];

export const eventCoverages = [
  { id: 1, title: "FEU's First Sarah Joaquin Day", category: "Campus event", description: "FEU students came to class in cosplay for a one-day dress-up celebration.", url: "https://www.facebook.com/share/p/1HacqzWjG1/" },
  { id: 7, title: "Chiikawa Movie Fan Screening", category: "Fan screening", description: "Chiikawa fans exchanged merch and cosplayed at a fan screening in SM Megamall.", url: "https://www.facebook.com/share/p/19bExyNN8W/" },
  { id: 11, title: "Eternal Tea time CSE", category: "Fan gathering", description: "Korean webnovel fans gathered for a character birthday celebration.", url: "https://www.facebook.com/share/p/19QCDn8RQi/" },
  { id: 13, title: "Kaiju No. 8 Exhibit", category: "Exhibit", description: "Fans explored the first official Kaiju No. 8 exhibit at SM North EDSA.", url: "https://www.facebook.com/share/p/1CSRJXGJFn/" },
  { id: 15, title: "Hoyofest 2026", category: "HoYoFest", description: "Scenes from the final day of HoYoFest at One Ayala, Makati.", url: "https://www.facebook.com/share/p/1EuwtyJdrr/" },
  { id: 16, title: "Hoyofest Genshin Impact 7.2 Watch party", category: "Video coverage", description: "Genshin Impact fans watched a Special Program livestream together at HoYoFest.", url: "https://www.facebook.com/share/v/1CHxsGYtXv/" },
  { id: 20, title: "Green Yuri CSE", category: "Fan gathering", description: "Fans of the sapphic manga gathered at a Manila café.", url: "https://www.facebook.com/share/p/1RNQjCQpB7/" },
  { id: 21, title: "Philippine GameDex Expo 2026", category: "Game expo", description: "Developers and enthusiasts explored local indie games on the expo's opening day.", url: "https://www.facebook.com/share/p/1DW4U4mb6g/" },
  { id: 23, title: "BANDAI NAMCO: Bonus Level Philippines", category: "Game expo", description: "A look at Bandai Namco's Bonus Level Philippines event in Makati.", url: "https://www.facebook.com/share/p/1EoxHf3xxg/" },
  { id: 24, title: "Alien Stage Pop-Up Store", category: "Alien Stage pop-up", description: "Alien Stage fans visited a pop-up at SM North EDSA.", url: "https://www.facebook.com/share/p/1CmgZgUjSb/" },
  { id: 27, title: "Queerlayaan 3", category: "StickerCon Queerlayaan", description: "Art and community at StickerCon Queerlayaan's third year in Pasig.", url: "https://www.facebook.com/share/p/1FCpNBfHRt/" },
  { id: 28, title: "Geek+Pop Resbak x PICCS", category: "Collectibles show", description: "Retro gaming fans and collectors met at Geek+Pop's card and collectibles show.", url: "https://www.facebook.com/share/p/19u17XvD8m/" },
  { id: 29, title: "Honkai: Star Rail Run to Elation", category: "Fan event", description: "Honkai: Star Rail fans celebrated the game's third anniversary at SM North EDSA.", url: "https://www.facebook.com/share/p/1CYouTSJK1/" },
  { id: 30, title: "MATSURI in Manila", category: "Otacute Matsuri", description: "Otacute's Matsuri in Manila celebrated Filipino and Japanese culture.", url: "https://www.facebook.com/share/p/1FKgtK9Niy/" },
  { id: 31, title: "Love and Pride Take Center Stage at PoTA", category: "Art market", description: "LGBTQIA+ community members and allies gathered at PoTA's art market.", url: "https://www.facebook.com/share/p/1KLoq5C9sB/" },
];

export const certificates = [
  {
    id: 1,
    title: "Cisco Certified Support Technician (CCST) – Networking",
    issuer: "Cisco",
    year: "February 2025",
    image: ciscoImg,
  },
  {
    id: 2,
    title: "PMI Project Management Ready™",
    issuer: "PMI",
    year: "March 2026",
    image: pmiImg,
    imagePadding: "p-4",
  },
];

export const techStack = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "PHP" },
  { name: "Laravel" },
  { name: "Tailwind CSS" },
  { name: "MySQL" },
  { name: "React" },
  { name: "Microsoft Azure" },
];

export const designTools = [
  { name: "Figma" },
  { name: "Photoshop" },
  { name: "Canva" },
];
