# Rzeefolio

Raine Zaldivar's portfolio for frontend development, UI/UX, and quality assurance work. It presents web and mobile projects, certifications, event coverage, and contact information.

## Stack

React 19, Vite 8, Tailwind CSS 4, Motion for React (the `framer-motion` package), and React Icons. The site uses local project images and CSS for its light and dark themes and responsive layouts.

## Run locally

Requires a Node.js version supported by Vite 8.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check or package the site:

```bash
npm run lint
npm run build
npm run preview
```

There is no automated test script in `package.json`.

## Project layout

- `src/components/` contains portfolio sections and project dialogs.
- `src/data/portfolioData.js` holds project, certificate, and event data.
- `src/assets/` contains images imported by components and project data.
- `public/RaineCV.pdf` is the resume downloaded from the hero and contact sections.

The stylesheets load in this order: `index.css`, `redesign.css`, `storybook.css`, then `design-system.css`. The final file contains the current component overrides, so check the cascade before changing shared styles.

## Styling and motion

Tailwind CSS 4 is already connected through the Vite plugin. Its portfolio utilities are defined with `@theme inline` in `src/index.css` and read the light and dark design tokens in `src/design-system.css`. Use those utilities for new component layout and type; keep the older CSS selectors for sections that have not been migrated yet. Remove a legacy declaration when moving the same property to a utility, since unlayered CSS overrides Tailwind's utility layer.

Motion for React uses the installed `framer-motion` package. `MotionConfig` applies the visitor's reduced-motion preference, and `src/hooks/useScrollReveals.js` animates the existing `.reveal` elements once as they enter view. The intro handles the transition into this single-page site; section links remain normal anchor navigation.

## Updating content

Replace `public/RaineCV.pdf` with the current resume while keeping the filename, or update both download links if the filename changes. Project contribution prompts in `portfolioData.js` also need Raine's confirmed tasks. FEU-COMPASS team-level testing results are labeled separately from Raine's own QA activities, which still need supporting detail. Add certificate verification URLs only when official links are available.
