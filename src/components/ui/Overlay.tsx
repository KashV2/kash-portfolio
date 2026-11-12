import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { featuredProjects, type MediaImage, type Video as YouTubeVideo } from "../../data/portfolio";
import CaseStudy from "../CaseStudy";
import Gallery from "./Gallery";
import Modal from "./Modal";
import { providerName, YouTubePlayer, youtubeUrl } from "./YouTube";

type Overlay =
  | { type: "case"; projectId: string }
  | { type: "video"; video: YouTubeVideo }
  | { type: "gallery"; images: MediaImage[]; index: number; title: string };

interface Ctx {
  openCase: (projectId: string, from?: HTMLElement | null) => void;
  openVideo: (video: YouTubeVideo, from?: HTMLElement | null) => void;
  openGallery: (images: MediaImage[], index: number, title: string, from?: HTMLElement | null) => void;
}

const OverlayCtx = createContext<Ctx | null>(null);

export function useOverlay() {
  const c = useContext(OverlayCtx);
  if (!c) throw new Error("useOverlay must be used inside <OverlayProvider>");
  return c;
}

/** One shared modal for case studies, video demos and full-screen galleries. */
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ o: Overlay; from: HTMLElement | null } | null>(null);

  const openCase = useCallback((projectId: string, from?: HTMLElement | null) => setState({ o: { type: "case", projectId }, from: from ?? null }), []);
  const openVideo = useCallback((video: YouTubeVideo, from?: HTMLElement | null) => setState({ o: { type: "video", video }, from: from ?? null }), []);
  const openGallery = useCallback(
    (images: MediaImage[], index: number, title: string, from?: HTMLElement | null) =>
      setState({ o: { type: "gallery", images, index, title }, from: from ?? null }),
    [],
  );

  const o = state?.o;
  const project = o?.type === "case" ? featuredProjects.find((p) => p.id === o.projectId) : undefined;
  const label =
    o?.type === "case"
      ? `Case study — ${project?.title ?? ""}`
      : o?.type === "video"
        ? o.video.title
        : o?.type === "gallery"
          ? o.title
          : "";

  return (
    <OverlayCtx.Provider value={{ openCase, openVideo, openGallery }}>
      {children}
      <Modal
        open={!!state}
        onClose={() => setState(null)}
        origin={state?.from}
        label={label}
        width={o?.type === "case" ? "72rem" : "84rem"}
      >
        {o?.type === "case" && project && <CaseStudy project={project} />}
        {o?.type === "video" && (
          <div className="p-4 sm:p-8">
            <YouTubePlayer video={o.video} />
            <p className="mt-4 text-sm text-mute">
              Trouble playing?{" "}
              <a className="link" href={youtubeUrl(o.video)} target="_blank" rel="noreferrer">
                Open {o.video.title} on {providerName(o.video)}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        )}
        {o?.type === "gallery" && (
          <div className="p-4 sm:p-8">
            <Gallery images={o.images} start={o.index} title={o.title} size="full" />
          </div>
        )}
      </Modal>
    </OverlayCtx.Provider>
  );
}
