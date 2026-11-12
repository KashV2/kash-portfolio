import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useInView } from "../../lib/motion";

export type RevealKind = "wipe-right" | "wipe-left" | "iris" | "rise" | "tiles" | "glitch" | "carve" | "flood" | "doors" | "blinds" | "trace" | "clock" | "stream";

interface Props extends HTMLAttributes<HTMLElement> {
  kind: RevealKind;
  as?: ElementType;
  children: ReactNode;
  threshold?: number;
}

/** Wraps content in a one-shot entrance. Content is visible without JS or with reduced motion. */
export default function Reveal({ kind, as: Tag = "div", children, threshold, ...rest }: Props) {
  const [ref, inView] = useInView<HTMLElement>(threshold);
  return (
    <Tag ref={ref} data-reveal={kind} data-inview={inView ? "true" : "false"} {...rest}>
      {children}
    </Tag>
  );
}
