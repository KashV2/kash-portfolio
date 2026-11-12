import { useEffect, useRef } from "react";

/**
 * Animated city background (canvas, no dependencies):
 * distant skyline with sparse lit windows, a perspective grid floor that
 * slowly moves toward the viewer, diagonal rain, an occasional light sweep,
 * and rare signal interference. Fixed behind content, never receives clicks.
 * - Pauses when the tab is hidden.
 * - Fewer particles + lower resolution on small screens.
 * - Draws one still frame when the user prefers reduced motion.
 */
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0,
      H = 0,
      dpr = 1,
      small = false;
    let raf = 0,
      last = 0,
      t = 0;
    let skyline: HTMLCanvasElement | null = null;
    type Drop = { x: number; y: number; l: number; v: number; a: number };
    let drops: Drop[] = [];
    let glitchUntil = 0,
      nextGlitch = 6000;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function buildSkyline() {
      const c = document.createElement("canvas");
      c.width = W * dpr;
      c.height = H * dpr;
      const g = c.getContext("2d")!;
      g.scale(dpr, dpr);
      const horizon = H * 0.62;
      // two layers: far (lighter) and near (darker, taller)
      const layers = [
        { base: horizon, maxH: H * 0.26, color: "#141418", win: 0.04, minW: 18, maxW: 46 },
        { base: horizon + 2, maxH: H * 0.4, color: "#0d0d10", win: 0.06, minW: 26, maxW: 70 },
      ];
      for (const L of layers) {
        let x = -20;
        while (x < W + 20) {
          const bw = rand(L.minW, L.maxW);
          const bh = rand(L.maxH * 0.25, L.maxH) * (0.6 + 0.4 * Math.abs(Math.sin(x * 0.004)));
          g.fillStyle = L.color;
          g.fillRect(x, L.base - bh, bw, bh);
          // occasional antenna
          if (Math.random() < 0.15) g.fillRect(x + bw / 2, L.base - bh - rand(8, 30), 1.5, 30);
          // lit windows
          for (let wy = L.base - bh + 6; wy < L.base - 4; wy += 7) {
            for (let wx = x + 4; wx < x + bw - 4; wx += 6) {
              if (Math.random() < L.win) {
                const r = Math.random();
                g.fillStyle = r < 0.55 ? "rgba(243,230,0,.55)" : r < 0.9 ? "rgba(24,228,255,.5)" : "rgba(255,59,78,.6)";
                g.fillRect(wx, wy, 2, 2.5);
              }
            }
          }
          x += bw + rand(0, 6);
        }
      }
      skyline = c;
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      small = W < 768;
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = small ? 45 : 130;
      drops = Array.from({ length: n }, () => ({
        x: rand(0, W),
        y: rand(0, H),
        l: rand(8, 22),
        v: rand(380, 720),
        a: rand(0.08, 0.28),
      }));
      buildSkyline();
    }

    function frame(dt: number) {
      t += dt;
      const horizon = H * 0.62;
      // base
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#0b0b0e");
      bg.addColorStop(0.55, "#121216");
      bg.addColorStop(0.62, "#17161a");
      bg.addColorStop(1, "#08080a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // horizon haze (thin band, not a blob)
      const haze = ctx.createLinearGradient(0, horizon - 120, 0, horizon + 30);
      haze.addColorStop(0, "rgba(243,230,0,0)");
      haze.addColorStop(0.85, "rgba(243,230,0,0.06)");
      haze.addColorStop(1, "rgba(255,59,78,0.05)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, horizon - 120, W, 150);

      // light sweep — slow searchlight from the city
      if (!small) {
        const ang = Math.sin(t * 0.00012) * 0.5 - Math.PI / 2;
        const ox = W * 0.72;
        ctx.save();
        ctx.translate(ox, horizon - H * 0.2);
        ctx.rotate(ang + Math.PI / 2);
        const beam = ctx.createLinearGradient(0, 0, 0, -H);
        beam.addColorStop(0, "rgba(24,228,255,0.07)");
        beam.addColorStop(1, "rgba(24,228,255,0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(-3, 0);
        ctx.lineTo(-H * 0.12, -H);
        ctx.lineTo(H * 0.12, -H);
        ctx.lineTo(3, 0);
        ctx.fill();
        ctx.restore();
      }

      // skyline
      if (skyline) ctx.drawImage(skyline, 0, 0, W, H);

      // perspective grid floor
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizon, W, H - horizon);
      ctx.clip();
      const vx = W * 0.5;
      ctx.lineWidth = 1;
      // verticals
      const span = W * 2.4;
      const cols = small ? 14 : 26;
      for (let i = 0; i <= cols; i++) {
        const bx = vx - span / 2 + (span * i) / cols;
        const a = 0.05 + 0.06 * (1 - Math.abs(i / cols - 0.5) * 2);
        ctx.strokeStyle = `rgba(24,228,255,${a})`;
        ctx.beginPath();
        ctx.moveTo(vx, horizon);
        ctx.lineTo(bx, H);
        ctx.stroke();
      }
      // horizontals moving toward viewer
      const rows = 14;
      const phase = ((t * 0.00008) % 1 + 1) % 1;
      for (let i = 0; i < rows; i++) {
        const z = (i + phase) / rows; // 0 far → 1 near
        const y = horizon + (H - horizon) * z * z;
        ctx.strokeStyle = `rgba(243,230,0,${0.02 + 0.1 * z * z})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      // floor fade
      const ff = ctx.createLinearGradient(0, horizon, 0, H);
      ff.addColorStop(0, "rgba(9,9,11,0.0)");
      ff.addColorStop(1, "rgba(9,9,11,0.55)");
      ctx.fillStyle = ff;
      ctx.fillRect(0, horizon, W, H - horizon);
      ctx.restore();

      // rain
      ctx.lineWidth = 1;
      for (const d of drops) {
        d.y += (d.v * dt) / 1000;
        d.x -= (d.v * 0.18 * dt) / 1000;
        if (d.y > H) {
          d.y = -d.l;
          d.x = rand(0, W + 100);
        }
        ctx.strokeStyle = `rgba(200,240,255,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.l * 0.18, d.y - d.l);
        ctx.stroke();
      }

      // rare signal interference: a thin displaced band
      if (!small) {
        nextGlitch -= dt;
        if (nextGlitch <= 0) {
          glitchUntil = t + 140;
          nextGlitch = rand(7000, 13000);
        }
        if (t < glitchUntil) {
          const gy = rand(0, H - 12);
          const gh = rand(3, 10);
          ctx.drawImage(canvas, 0, gy * dpr, W * dpr, gh * dpr, rand(-14, 14), gy, W, gh);
          ctx.fillStyle = "rgba(255,59,78,0.06)";
          ctx.fillRect(0, gy, W, gh);
        }
      }
    }

    function loop(now: number) {
      const dt = last ? Math.min(now - last, 64) : 16;
      if (now - last >= 1000 / 30 || !last) {
        frame(dt);
        last = now;
      }
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (reduce) {
        frame(16);
        return;
      }
      cancelAnimationFrame(raf);
      last = 0;
      raf = requestAnimationFrame(loop);
    }

    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        if (reduce) frame(16);
      }, 150);
    };

    resize();
    start();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />
      <div aria-hidden="true" className="scanlines pointer-events-none fixed inset-0 -z-10 opacity-60" />
    </>
  );
}
