import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import { useActiveSection } from "../lib/motion";

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
const IDS = NAV.map((n) => n.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(IDS);
  const listRef = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // sliding active-section indicator
  useLayoutEffect(() => {
    const measure = () => {
      const a = listRef.current?.querySelector<HTMLElement>(`a[data-id="${active}"]`);
      setBar(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-void/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="cut-sm grid h-8 w-9 place-items-center bg-acid font-display text-sm font-bold text-void transition-transform group-hover:-translate-y-0.5">
            KV
          </span>
          <span className="hidden font-display text-lg font-semibold uppercase tracking-wide sm:inline">{profile.name}</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center md:flex">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                data-id={n.id}
                aria-current={active === n.id ? "true" : undefined}
                className={`block px-3.5 py-2 font-mono text-[0.78rem] uppercase tracking-[0.16em] transition-colors ${
                  active === n.id ? "text-acid" : "text-mute hover:text-ink"
                }`}
              >
                <span className="text-dim">0{i + 1}</span> {n.label}
              </a>
            </li>
          ))}
          <span
            aria-hidden="true"
            className="absolute -bottom-[13px] h-[3px] bg-acid transition-[transform,width,opacity] duration-300 ease-out"
            style={{ width: bar?.w ?? 0, transform: `translateX(${bar?.x ?? 0}px)`, opacity: bar ? 1 : 0 }}
          />
        </ul>

        <button
          type="button"
          className="border border-line-bright px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === n.id ? "true" : undefined}
                className={`flex items-baseline gap-4 border-b border-line py-4 font-display text-2xl font-semibold uppercase ${
                  active === n.id ? "text-acid" : "text-ink"
                }`}
              >
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
