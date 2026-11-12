import { useId, useState } from "react";
import type { Project } from "../../data/portfolio";
import Gallery from "./Gallery";
import { useOverlay } from "./Overlay";

/**
 * The original documents (deck pages, posters) shown first, as supplied.
 * Several documents get tabs; each document is a paged viewer with a full-screen option.
 */
export default function DocViewer({ project, accent = "acid" }: { project: Project; accent?: "acid" | "cyan" }) {
  const docs = project.documents ?? [];
  const [tab, setTab] = useState(0);
  const { openGallery } = useOverlay();
  const id = useId();
  if (!docs.length) return null;
  const doc = docs[tab];
  const first = doc.pages[0];
  const portrait = first.h > first.w;

  return (
    <div>
      {docs.length > 1 && (
        <div role="tablist" aria-label={`${project.title} documents`} className="mb-3 flex flex-wrap gap-2">
          {docs.map((d, k) => (
            <button
              key={d.title}
              role="tab"
              id={`${id}-tab-${k}`}
              aria-selected={k === tab}
              aria-controls={`${id}-panel`}
              onClick={() => setTab(k)}
              className={`border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors ${
                k === tab ? "border-acid bg-acid text-void" : "border-line-bright text-mute hover:border-ink hover:text-ink"
              }`}
            >
              {d.title} <span className="opacity-70">· {d.pages.length}p</span>
            </button>
          ))}
        </div>
      )}
      <div role={docs.length > 1 ? "tabpanel" : undefined} id={`${id}-panel`} aria-labelledby={docs.length > 1 ? `${id}-tab-${tab}` : undefined}>
        <Gallery
          key={doc.title}
          images={doc.pages}
          title={`${project.title} — ${doc.title}`}
          prefix="PG"
          accent={accent}
          aspect={portrait ? "4 / 5" : `${first.w} / ${first.h}`}
          onExpand={(i, el) => openGallery(doc.pages, i, `${project.title} — ${doc.title}`, el)}
        />
      </div>
    </div>
  );
}
