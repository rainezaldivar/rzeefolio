# Rzeefolio

Raine Zaldivar's portfolio for frontend development, UI/UX, and quality assurance. It brings together selected projects, certifications, photography, and ways to connect.

## Explore the portfolio

- **Projects:** FEU-COMPASS, Smiskisite, Alban Memorial Foundation, and Pokémon GO Web Store. Each project has a details popup that shows only the information available for it.
- **Beyond IT:** A camera-style photography viewer with photo navigation, captions, and original publication links where available.
- **Day and night modes:** Day mode is the default; a visitor's theme choice is saved locally.
- **Motion and accessibility:** The opening animation and section transitions respect reduced-motion preferences. The site supports keyboard navigation and responsive layouts.

## Built with

React 19, Vite 8, Tailwind CSS 4, Motion for React (`framer-motion`), and React Icons. Project and photography images are stored locally in the repository.

## Run locally

Install Node.js and npm, then run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To check or preview a production build:

```bash
npm run lint
npm run build
npm run preview
```

## Where to update content

- `src/data/portfolioData.js` — projects and certifications.
- `src/components/Coverages.jsx` — photography entries and their publication links.
- `src/components/Contact.jsx` — email and social links.
- `public/RaineCV.pdf` — downloadable CV.
- `src/design-system.css` — current design tokens and component styles. Styles also load from `index.css`, `redesign.css`, and `storybook.css`, in that order.

The portfolio is a single-page React and Vite site. Section links use page anchors; the intro plays on initial entry rather than between sections.
