# Kash Vallur — Portfolio

React + TypeScript + Tailwind CSS (Vite). No backend; it builds to static files you can host anywhere.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then outputs static site to dist/
npm run preview    # serve the production build locally
```

Requires Node 18+.

## Deploy

`dist/` is a plain static site, and the paths are relative, so it works at a root domain or a sub-path.

- **Netlify / Vercel / Cloudflare Pages:** set the build command to `npm run build` and the output folder to `dist`.
- **GitHub Pages:** push `dist/` to a `gh-pages` branch, or use the official Pages action.

After deploying, open `index.html` and add `<meta property="og:url" content="https://your-domain/">`. Then change `og:image` and `twitter:image` to absolute URLs (for example `https://your-domain/og-image.png`). Link previews on LinkedIn and Slack need absolute URLs.

## Editing guide

| What | Where |
|---|---|
| Name, headline, pitch, email, links, résumé file | `src/data/portfolio.ts` → `profile` |
| Hero number strip | `highlights` |
| About story and strengths | `about` |
| Projects (featured + "more work") | `featuredProjects`, `moreProjects` |
| Experience timeline | `experience` |
| Skills, education | `skills`, `education` |
| Hero waveform data | `heroSignal` (real Dirichlet-GMM output from one Shredshox run) |
| **All project/experience media** | `MEDIA` (images in `public/media`) and `VIDEOS` (YouTube IDs) |
| Which media each project shows | each project's `layout`, `cover`, `video`, `gallery` |
| Experience visuals | each role's `media`, `keyFigure`, `projectId` |
| Hero work reel | `heroReel` |
| **Vehicle / character hero art** | `heroAssets` — see below |
| Animated background | `src/components/Background.tsx` |
| Colors | `tailwind.config.ts` → `theme.extend.colors` (change a hex value and the whole site updates) |
| Fonts | `tailwind.config.ts` → `fontFamily`, plus the `@fontsource` imports at the top of `src/index.css` |
| Effects (glitch, trace draw, reduced motion) | bottom of `src/index.css` |
| Title, description, social image, favicon | `index.html`, `public/og-image.png`, `public/favicon.svg` |
| Résumé PDF | `public/Kash_Vallur_Resume.pdf` (set `profile.resumeFile` to `null` to hide the buttons) |

## Hero asset slots (vehicle + character)

The hero has two image slots, set in `heroAssets` in `src/data/portfolio.ts`:

- **vehicle**: a wide plate behind your name. Use a **2400×1030 px** (≈21:9) WebP or PNG, with the vehicle facing left and a dark or transparent background.
- **character**: a holographic panel. Use a **900×1200 px** (3:4) PNG with a transparent background, with the subject facing left. The site tints it cyan automatically.

Put the files in `public/media/`, then set `src` (for example `"media/hero-vehicle.webp"`), `alt` and `credit`. Once either slot has an image, a "not affiliated" disclaimer appears.

While `src` is `null`, the slots show original placeholders: an animated street scene, and a hologram of your real ski-signal data. Only use game art you have the rights to use.

**Adding a project:** copy an object in `featuredProjects` and change its fields. Then:

- `layout` picks the showcase style: `research` (figure viewer), `video` (demo-first) or `poster` (figure mosaic).
- `kind` controls the badge color. It can be Research, Professional, Hackathon · Team, Team Research, Mentorship, Personal, or Academic.
- `links` is optional. Use descriptive labels, such as "View the ForecastRX repository on GitHub".
- The first item in `featuredProjects` is shown as the large flagship card. Give it a `pipeline` array to draw the stage diagram.

## Accessibility and motion

- The site uses semantic sections and includes a skip link.
- Navigation works from the keyboard, the mobile menu has `aria-expanded` and closes on Escape, and focus rings are visible.
- No essential content depends on hover.
- With `prefers-reduced-motion`, the glitch effect is turned off and the waveform appears already drawn.
- Nothing autoplays, and there are no cursor effects.
