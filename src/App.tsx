import { useEffect } from "react";
import About from "./components/About";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import Research from "./components/Research";
import { Education, Skills } from "./components/SkillsEducation";
import { OverlayProvider } from "./components/ui/Overlay";
import { heroAssets, profile } from "./data/portfolio";
import { prefersReducedMotion } from "./lib/motion";

export default function App() {
  // Entrance animations only arm when motion is allowed (content is visible otherwise).
  useEffect(() => {
    if (!prefersReducedMotion()) document.documentElement.classList.add("motion-ok");
  }, []);

  const usesGameAssets = !!(heroAssets.vehicle.src || heroAssets.character.src);

  return (
    <OverlayProvider>
      <Background />
      <a href="#main" className="sr-only z-[60] bg-acid px-4 py-2 font-mono text-sm text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-line bg-void/90">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-8 font-mono text-xs text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.fullName}
          </p>
          <p>
            Built with React, TypeScript &amp; Tailwind. Hero hologram = real pipeline output.
            {usesGameAssets && <> {heroAssets.disclaimer}</>}
          </p>
        </div>
      </footer>
    </OverlayProvider>
  );
}
