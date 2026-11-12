import { useEffect, useRef } from "react";
import { featuredProjects, heroAssets, heroReel, highlights, profile } from "../data/portfolio";
import { prefersReducedMotion } from "../lib/motion";
import { CharacterSlot, VehicleSlot } from "./HeroScene";
import Img from "./ui/Img";
import { useOverlay } from "./ui/Overlay";
import { PlayMark, YouTubeThumb } from "./ui/YouTube";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openCase, openVideo } = useOverlay();
  const byId = (id: string) => featuredProjects.find((p) => p.id === id)!;
  const boiler = byId("boiler-buddy");

  // subtle depth: layers shift a few px with the pointer (desktop, motion allowed)
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        el.style.setProperty("--py", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const depth = (n: number) => ({
    transform: `translate3d(calc(var(--px, 0) * ${n}px), calc(var(--py, 0) * ${n * 0.6}px), 0)`,
    transition: "transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1)",
  });

  const [first, last] = profile.name.toUpperCase().split(" ");
  const credits = [heroAssets.vehicle, heroAssets.character].filter((a) => a.src && a.credit).map((a) => a.credit);

  return (
    <section id="top" ref={ref} aria-labelledby="hero-name" className="relative overflow-hidden pt-16">
      {/* ── Stage ── */}
      <div className="relative mx-auto max-w-page px-5 sm:px-8">
        <div className="relative lg:min-h-[min(46rem,calc(100svh-10rem))]">
          {/* vehicle plate */}
          <div
            className="relative -mx-5 mt-4 aspect-[16/9] sm:-mx-8 lg:absolute lg:-right-8 lg:left-auto lg:top-6 lg:mx-0 lg:mt-0 lg:aspect-[21/9] lg:w-[78%]"
            style={depth(-6)}
          >
            <VehicleSlot />
            <span className="absolute bottom-3 right-4 hidden font-mono text-[0.65rem] uppercase tracking-[0.22em] text-dim sm:block">
              bay 01 // night run
            </span>
          </div>

          {/* character hologram */}
          <div
            className="absolute right-2 top-[5%] z-[5] aspect-[3/4] w-[38%] sm:w-[30%] lg:right-[3%] lg:top-[16%] lg:w-[22%]"
            style={depth(-14)}
          >
            <CharacterSlot />
          </div>

          {/* type */}
          <div className="relative z-10 pt-8 lg:max-w-[46rem] lg:pt-28" style={depth(4)}>
            <p className="hero-fade label text-acid" style={{ animationDelay: "0.05s" }}>
              <span className="mr-2 inline-block bg-acid px-1.5 text-void">{profile.status.split(" ")[0]}</span>
              {profile.status.split(" ").slice(1).join(" ")}
            </p>
            <h1
              id="hero-name"
              aria-label={profile.name}
              className="mt-5 font-display font-bold uppercase leading-[0.84] tracking-[-0.02em]"
            >
              <span className="hero-line text-[clamp(4.2rem,15vw,11rem)] text-ink" aria-hidden="true">
                <span style={{ animationDelay: "0.1s" }}>{first}</span>
              </span>
              <span className="hero-line text-[clamp(4.2rem,15vw,11rem)] text-acid" aria-hidden="true">
                <span style={{ animationDelay: "0.22s" }}>{last}</span>
              </span>
            </h1>
            <p className="hero-fade mt-6 font-mono text-[0.8rem] uppercase tracking-[0.2em] text-cyan" style={{ animationDelay: "0.45s" }}>
              {profile.headline}
            </p>
            <p className="hero-fade mt-4 max-w-xl bg-void/60 text-lg leading-relaxed text-ink sm:text-xl" style={{ animationDelay: "0.55s" }}>
              {profile.pitch}
            </p>
            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.65s" }}>
              {boiler.video && (
                <button type="button" className="btn-acid" onClick={(e) => openVideo(boiler.video!, e.currentTarget)}>
                  <span aria-hidden="true">▶</span> Watch Boiler Buddy demo
                </button>
              )}
              <a href="#experience" className="btn-line">
                See my work
              </a>
              {profile.resumeFile && (
                <a href={`./${profile.resumeFile}`} download className="btn-text">
                  Résumé (PDF) ↓
                </a>
              )}
              <a href="#contact" className="btn-text">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* ── Work reel: real media, one click from the opening screen ── */}
        <div className="relative z-10 mt-14 lg:mt-12">
          <p className="label mb-3 flex items-center gap-3 text-dim">
            <span className="h-px w-8 bg-acid" aria-hidden="true" /> Work reel — real builds &amp; research
          </p>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {heroReel.map((r, k) => {
              const p = byId(r.projectId);
              const isVideo = r.kind === "video" && p.video;
              return (
                <li key={r.projectId} className="hero-fade" style={{ animationDelay: `${0.8 + k * 0.08}s` }}>
                  <button
                    type="button"
                    onClick={(e) => (isVideo ? openVideo(p.video!, e.currentTarget) : openCase(p.id, e.currentTarget))}
                    className="hud group block w-full text-left [--hud:theme(colors.cyan.DEFAULT)]"
                  >
                    <span className="relative block overflow-hidden border border-line bg-char">
                      {isVideo ? (
                        <YouTubeThumb video={p.video!} className="transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        r.kind === "image" && (
                          <Img image={r.image} ratio="16 / 9" eager className="bg-white transition-transform duration-500 group-hover:scale-105" />
                        )
                      )}
                      <span className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" aria-hidden="true" />
                      {isVideo && (
                        <span className="absolute right-2 top-2">
                          <PlayMark size="sm" />
                        </span>
                      )}
                      <span className="absolute bottom-2 left-3 right-3">
                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-acid">
                          {isVideo ? "▶ play demo" : "open case study"}
                        </span>
                        <span className="block font-display text-[0.95rem] font-semibold leading-tight text-ink sm:text-base">{r.label}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Documented numbers ── */}
      <div className="relative mt-14 border-y border-line bg-void/80 backdrop-blur-sm">
        <ul className="mx-auto grid max-w-page grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <li key={h.label} className={`py-6 pr-4 ${i % 2 ? "border-l border-line pl-4 sm:pl-6" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}>
              <p className="font-display text-3xl font-bold text-ink sm:text-4xl">{h.value}</p>
              <p className="mt-1 text-sm leading-snug text-mute">{h.label}</p>
              <p className="label mt-2 text-acid/90">{h.source}</p>
            </li>
          ))}
        </ul>
      </div>

      {credits.length > 0 && (
        <p className="mx-auto max-w-page px-5 py-2 font-mono text-[0.65rem] text-dim sm:px-8">
          {credits.join(" · ")} · {heroAssets.disclaimer}
        </p>
      )}
    </section>
  );
}
