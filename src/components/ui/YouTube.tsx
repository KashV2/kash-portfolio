import { useState } from "react";
import type { Video } from "../../data/portfolio";

const thumbUrl = (v: Video) => v.thumb ?? (v.provider === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : null);

/** Video thumbnail (YouTube or Vimeo) with a graceful fallback if it can't load. */
export function VideoThumb({ video, className = "" }: { video: Video; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = thumbUrl(video);
  if (failed || !src)
    return (
      <div
        className={`aspect-video w-full bg-char-2 ${className}`}
        style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(243,230,0,.06) 0 2px, transparent 2px 14px)" }}
        aria-hidden="true"
      />
    );
  return (
    <img
      src={src}
      alt=""
      width={640}
      height={360}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`block aspect-video w-full object-cover ${className}`}
    />
  );
}

/** The actual player — only mounted when the viewer asks to watch (nothing autoplays on page load). */
export function VideoPlayer({ video }: { video: Video }) {
  const src =
    video.provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${video.id}?autoplay=1&dnt=1&title=0&byline=0`;
  return (
    <div className="relative aspect-video w-full bg-black">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={`${video.title} (${video.provider === "youtube" ? "YouTube" : "Vimeo"} video player)`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export const videoUrl = (v: Video) => (v.provider === "youtube" ? `https://www.youtube.com/watch?v=${v.id}` : `https://vimeo.com/${v.id}`);
export const providerName = (v: Video) => (v.provider === "youtube" ? "YouTube" : "Vimeo");

// older names, kept so existing imports keep working
export const YouTubeThumb = VideoThumb;
export const YouTubePlayer = VideoPlayer;
export const youtubeUrl = videoUrl;

/** Big play glyph used on video tiles. */
export function PlayMark({ size = "lg" }: { size?: "lg" | "sm" }) {
  const s = size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-11 w-11";
  return (
    <span
      aria-hidden="true"
      className={`cut-sm grid ${s} place-items-center bg-acid text-void transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110`}
    >
      <svg viewBox="0 0 24 24" className={size === "lg" ? "ml-1 h-9 w-9" : "ml-0.5 h-5 w-5"} fill="currentColor">
        <path d="M7 4.5v15l13-7.5z" />
      </svg>
    </span>
  );
}
