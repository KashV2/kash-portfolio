import { useState } from "react";
import type { Role } from "../../data/portfolio";
import { asset } from "../../lib/motion";

/**
 * Organization logo next to a role.
 * - tile: logos with a light background sit on a white badge.
 * - otherwise: transparent wordmarks (e.g. RESEC) sit directly on the dark page.
 * Falls back to a monogram if the image can't load.
 */
export default function OrgLogo({ role, size = "md" }: { role: Role; size?: "md" | "lg" }) {
  const [failed, setFailed] = useState(false);
  const logo = role.logo;
  if (!logo) return null;
  const h = size === "lg" ? "h-12" : "h-11";
  const src = /^https?:/.test(logo.src) ? logo.src : asset(logo.src);

  if (failed)
    return (
      <span aria-hidden="true" className={`grid ${h} aspect-square place-items-center border border-line-bright font-display text-sm font-bold text-ink`}>
        {role.org.replace(/^The Data Mine · /, "").slice(0, 2).toUpperCase()}
      </span>
    );

  return (
    <span className={`cut-sm inline-flex ${h} shrink-0 items-center ${logo.tile ? "bg-white px-3 py-1.5" : ""}`}>
      <img
        src={src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-auto object-contain ${logo.tile ? "max-w-[8.5rem]" : "max-w-[11rem]"}`}
      />
    </span>
  );
}
