import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { MediaImage } from "../../data/portfolio";
import { asset } from "../../lib/motion";

interface Props {
  images: MediaImage[];
  title: string; // e.g. "Ski event detection figures"
  start?: number;
  /** "stage" = inline in a showcase, "full" = inside a modal (taller). */
  size?: "stage" | "full";
  /** Optional: open this gallery full-screen. */
  onExpand?: (index: number, el: HTMLElement) => void;
  accent?: "acid" | "cyan";
  /** Stage aspect ratio for "stage" size, e.g. "4 / 5" for portrait documents. */
  aspect?: string;
  /** Caption prefix: FIG for figures, PG for document pages. */
  prefix?: string;
}

/**
 * Slide viewer for presentation figures / poster panels.
 * Keyboard: ←/→ when focused. Touch: swipe. Thumbnails are real buttons.
 */
export default function Gallery({ images, title, start = 0, size = "stage", onExpand, accent = "acid", aspect = "16 / 10", prefix = "FIG" }: Props) {
  const [i, setI] = useState(start);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const down = useRef<number | null>(null);
  const id = useId();
  const n = images.length;
  const img = images[i];

  const go = useCallback(
    (to: number, d: "next" | "prev") => {
      setDir(d);
      setI(((to % n) + n) % n);
    },
    [n],
  );
  const next = () => go(i + 1, "next");
  const prev = () => go(i - 1, "prev");

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };
  const onPointerDown = (e: PointerEvent) => (down.current = e.clientX);
  const onPointerUp = (e: PointerEvent) => {
    if (down.current == null) return;
    const dx = e.clientX - down.current;
    down.current = null;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
  };

  const accentText = accent === "acid" ? "text-acid" : "text-cyan";
  const accentBorder = accent === "acid" ? "border-acid" : "border-cyan";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      className="flex flex-col"
    >
      <div
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-describedby={`${id}-cap`}
        style={size === "full" ? undefined : { aspectRatio: aspect }}
        className={`relative overflow-hidden bg-[#0d0d10] ${size === "full" ? "h-[58vh] sm:h-[78vh]" : ""} touch-pan-y select-none`}
      >
        <img
          key={img.src}
          src={asset(img.src)}
          alt={img.alt}
          width={img.w}
          height={img.h}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-contain p-2 sm:p-4 ${dir === "next" ? "slide-next" : dir === "prev" ? "slide-prev" : ""}`}
        />
        {/* HUD counter */}
        <span className="absolute left-3 top-3 bg-void/85 px-2 py-1 font-mono text-[0.7rem] tracking-[0.18em] text-ink">
          <span className={accentText}>{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
        </span>
        {onExpand && (
          <button
            type="button"
            onClick={(e) => onExpand(i, e.currentTarget)}
            className="absolute right-3 top-3 bg-void/85 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink hover:text-acid"
          >
            Expand<span className="sr-only"> {title} to full screen</span> ⤢
          </button>
        )}
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={prefix === "PG" ? "Previous page" : "Previous figure"}
              className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center bg-void/85 font-mono text-lg text-ink hover:bg-acid hover:text-void"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={prefix === "PG" ? "Next page" : "Next figure"}
              className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center bg-void/85 font-mono text-lg text-ink hover:bg-acid hover:text-void"
            >
              →
            </button>
          </>
        )}
      </div>

      <p id={`${id}-cap`} aria-live="polite" className="mt-3 min-h-[3rem] text-[0.95rem] leading-snug text-mute">
        <span className={`mr-2 font-mono text-xs ${accentText}`}>{prefix}.{String(i + 1).padStart(2, "0")}</span>
        {img.caption}
        {img.source && <span className="ml-2 font-mono text-[0.7rem] text-dim">· {img.source}</span>}
      </p>

      {n > 1 && (
        <ul className="mt-2 flex gap-2 overflow-x-auto pb-1" aria-label={`${title} thumbnails`}>
          {images.map((m, k) => (
            <li key={m.src} className="shrink-0">
              <button
                type="button"
                onClick={() => go(k, k > i ? "next" : "prev")}
                aria-label={`Show ${prefix === "PG" ? "page" : "figure"} ${k + 1}: ${m.caption}`}
                aria-current={k === i ? "true" : undefined}
                className={`block h-14 w-20 overflow-hidden border bg-[#0d0d10] transition-[border-color,opacity] ${
                  k === i ? accentBorder : "border-line opacity-60 hover:opacity-100"
                }`}
              >
                <img src={asset(m.src)} alt="" width={m.w} height={m.h} loading="lazy" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
