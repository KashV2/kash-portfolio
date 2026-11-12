import { useState } from "react";
import type { Role } from "../../data/portfolio";
import { asset } from "../../lib/motion";

/** Organization logo next to a role. Falls back to a monogram if the image can't load. */
export default function OrgLogo({ role, size = "md" }: { role: Role; size?: "md" | "lg" }) {
  const [failed, setFailed] = useState(false);
  const logo = role.logo;
  const h = size === "lg" ? "h-12" : "h-10";
  if (!logo) return null;
  const isRemote = /^https?:/.test(logo.src);
  const wide = !isRemote; // local wordmarks (e.g. RESEC) are wide; favicons are square
  if (failed)
    return (
      <span aria-hidden="true" className={`grid ${h} aspect-square place-items-center border border-line-bright font-display text-sm font-bold text-ink`}>
        {role.org.replace(/^The Data Mine · /, "").slice(0, 2).toUpperCase()}
      </span>
    );
  return (
    <span className={`inline-flex ${h} shrink-0 items-center ${wide ? "px-0" : "aspect-square justify-center border border-line bg-white p-1.5"}`}>
      <img
        src={isRemote ? logo.src : asset(logo.src)}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-auto object-contain ${wide ? "max-w-[11rem]" : ""}`}
      />
    </span>
  );
}
