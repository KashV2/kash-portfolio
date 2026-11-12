import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "../../lib/motion";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Element the dialog grows out of (card → expanded view). */
  origin?: HTMLElement | null;
  label: string;
  width?: string;
  children: ReactNode;
}

/**
 * Accessible modal on the native <dialog>: focus is trapped and Esc closes.
 * Grows from its origin element and shrinks back on close.
 * Background scroll is locked and the reader's place is kept; focus returns to the trigger.
 */
export default function Modal({ open, onClose, origin, label, width = "72rem", children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const returnTo = useRef<HTMLElement | null>(null);

  const delta = useCallback(() => {
    const d = ref.current;
    if (!d || !origin || !origin.isConnected) return null;
    const r = d.getBoundingClientRect();
    const o = origin.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return `translate(${o.left - r.left}px, ${o.top - r.top}px) scale(${Math.max(o.width / r.width, 0.05)}, ${Math.max(o.height / r.height, 0.05)})`;
  }, [origin]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      returnTo.current = (document.activeElement as HTMLElement) ?? null;
      document.documentElement.style.overflow = "hidden";
      d.showModal();
      d.scrollTop = 0;
      const from = delta();
      if (from && !prefersReducedMotion()) {
        d.animate(
          [
            { transform: from, opacity: 0.35, transformOrigin: "top left" },
            { transform: "none", opacity: 1, transformOrigin: "top left" },
          ],
          { duration: 420, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        );
      }
    }
  }, [open, delta]);

  const requestClose = useCallback(() => {
    const d = ref.current;
    if (!d || closing.current) return;
    closing.current = true;
    const finish = () => {
      d.close();
      document.documentElement.style.overflow = "";
      closing.current = false;
      onClose();
      returnTo.current?.focus?.({ preventScroll: true });
    };
    const to = delta();
    if (to && !prefersReducedMotion()) {
      const a = d.animate(
        [
          { transform: "none", opacity: 1, transformOrigin: "top left" },
          { transform: to, opacity: 0, transformOrigin: "top left" },
        ],
        { duration: 300, easing: "cubic-bezier(0.6, 0, 0.8, 0.2)" },
      );
      a.onfinish = finish;
    } else finish();
  }, [delta, onClose]);

  // ensure scroll is unlocked if unmounted while open
  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      style={{ maxWidth: `min(${width}, 100vw)` }}
      className="m-auto h-[100dvh] max-h-[100dvh] w-full overflow-y-auto border-0 bg-char p-0 text-ink sm:h-auto sm:max-h-[92vh] sm:w-[calc(100vw-2rem)] sm:border sm:border-line"
    >
      {open && (
        <div className="relative">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-char/95 px-5 py-3 backdrop-blur sm:px-8">
            <p className="label truncate text-dim">
              <span className="text-acid">▍</span> {label}
            </p>
            <button
              type="button"
              onClick={requestClose}
              className="shrink-0 border border-line-bright px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-ink hover:border-acid hover:text-acid"
            >
              Close <span aria-hidden="true">✕</span>
              <span className="sr-only"> {label}</span>
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
