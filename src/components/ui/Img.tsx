import type { MediaImage } from "../../data/portfolio";
import { asset } from "../../lib/motion";

interface Props {
  image: MediaImage;
  className?: string;
  fit?: "cover" | "contain";
  eager?: boolean;
  /** Fix the frame's aspect ratio; defaults to the image's own. */
  ratio?: string;
}

/** Image with reserved space (no layout shift) and lazy loading. */
export default function Img({ image, className = "", fit = "cover", eager, ratio }: Props) {
  return (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={image.w}
      height={image.h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ aspectRatio: ratio ?? `${image.w} / ${image.h}` }}
      className={`block h-auto w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
    />
  );
}
