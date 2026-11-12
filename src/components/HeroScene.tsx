import { useMemo } from "react";
import { heroAssets } from "../data/portfolio";
import { asset } from "../lib/motion";
import SignalScope from "./SignalScope";

/**
 * VEHICLE SLOT — wide 21:9 plate behind the hero type.
 * Shows heroAssets.vehicle when supplied; otherwise an ORIGINAL placeholder:
 * a rain-slick perspective street with moving light trails (no game assets).
 */
export function VehicleSlot() {
  const v = heroAssets.vehicle;
  return (
    <div className="hero-plate relative h-full w-full overflow-hidden">
      {v.src ? (
        <img
          src={asset(v.src)}
          alt={v.alt}
          width={v.w}
          height={v.h}
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
      ) : (
        <StreetPlaceholder />
      )}
      {/* fade into the type on the left + bottom */}
      <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-void via-void/25 to-transparent lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-void to-transparent" />
      <div aria-hidden="true" className="scanlines absolute inset-0 opacity-50" />
    </div>
  );
}

function StreetPlaceholder() {
  const W = 2100,
    H = 900,
    vx = 1380,
    hz = 470;
  const blocks = useMemo(() => {
    // deterministic pseudo-random so it never reshuffles
    let s = 7;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const out: { x: number; w: number; h: number; win: { x: number; y: number; c: string }[] }[] = [];
    let x = 520;
    while (x < W) {
      const w = 40 + r() * 110;
      const h = 90 + r() * 330 * (1 - Math.abs(x - vx) / W);
      const win: { x: number; y: number; c: string }[] = [];
      for (let wy = hz - h + 10; wy < hz - 8; wy += 14)
        for (let wx = x + 6; wx < x + w - 6; wx += 12)
          if (r() < 0.14) win.push({ x: wx, y: wy, c: r() < 0.6 ? "#f3e600" : r() < 0.85 ? "#18e4ff" : "#ff3b4e" });
      out.push({ x, w, h, win });
      x += w + r() * 10;
    }
    return out;
  }, []);

  const trails = [
    { d: `M2150,900 C1800,700 1560,560 ${vx},${hz}`, c: "#ff3b4e", w: 5, delay: "0s" },
    { d: `M2150,820 C1820,650 1600,540 ${vx},${hz}`, c: "#ff3b4e", w: 3, delay: "-1.1s" },
    { d: `M900,900 C1100,700 1260,560 ${vx},${hz}`, c: "#f3e600", w: 5, delay: "-0.6s" },
    { d: `M1080,900 C1210,720 1300,580 ${vx},${hz}`, c: "#f3e600", w: 3, delay: "-1.7s" },
    { d: `M2150,980 C1760,760 1520,600 ${vx},${hz}`, c: "#18e4ff", w: 4, delay: "-0.3s" },
    { d: `M700,960 C1000,740 1220,590 ${vx},${hz}`, c: "#f3e600", w: 6, delay: "-2.1s" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0d0d11" />
          <stop offset="0.75" stopColor="#2a2412" />
          <stop offset="1" stopColor="#3a2a12" />
        </linearGradient>
        <linearGradient id="road" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#141317" />
          <stop offset="1" stopColor="#0a0a0c" />
        </linearGradient>
        <filter id="tglow">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#sky)" />
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={hz - b.h} width={b.w} height={b.h} fill={i % 3 ? "#16161b" : "#1d1d23"} />
          {b.win.map((w, k) => (
            <rect key={k} x={w.x} y={w.y} width="4" height="5" fill={w.c} opacity=".85" />
          ))}
        </g>
      ))}
      {/* street */}
      <path d={`M300,${H} L${vx},${hz} L${W},${hz + 10} L${W},${H} Z`} fill="url(#road)" />
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={vx} y1={hz} x2={300 + (W - 300) * f + 400 * f} y2={H} stroke="#f3e600" strokeOpacity=".3" strokeWidth="3" strokeDasharray="30 40" />
      ))}
      {/* wet reflections */}
      <rect x="0" y={hz} width={W} height="3" fill="#f3e600" opacity=".55" />
      <rect x="0" y={hz + 3} width={W} height="60" fill="#f3e600" opacity=".05" />
      {trails.map((t, i) => (
        <path
          key={i}
          d={t.d}
          fill="none"
          stroke={t.c}
          strokeWidth={t.w}
          strokeLinecap="round"
          filter="url(#tglow)"
          className="trail"
          style={{ animationDelay: t.delay }}
        />
      ))}
    </svg>
  );
}

/**
 * CHARACTER SLOT — holographic panel layered over the plate.
 * Shows heroAssets.character when supplied; otherwise projects my real
 * event-detection signal as the hologram.
 */
export function CharacterSlot() {
  const c = heroAssets.character;
  return (
    <div className="holo relative h-full w-full">
      <div
        className="absolute inset-0 border border-cyan/40 bg-cyan/[0.04]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 86% 100%, 0 100%)" }}
      >
        {c.src ? (
          <img
            src={asset(c.src)}
            alt={c.alt}
            width={c.w}
            height={c.h}
            className="absolute inset-0 h-full w-full object-cover object-top opacity-90 mix-blend-screen [filter:grayscale(1)_sepia(1)_hue-rotate(140deg)_saturate(3)_brightness(1.05)]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center px-3">
            <SignalScope className="h-auto w-full" />
          </div>
        )}
        <div aria-hidden="true" className="scanlines absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-cyan/70" />
      </div>
      {/* projector base */}
      <div aria-hidden="true" className="absolute -bottom-3 left-1/2 h-px w-2/3 -translate-x-1/2 bg-cyan shadow-cyan" />
      <p className="absolute -top-6 left-0 whitespace-nowrap font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-cyan">
        {c.src ? "holo // link" : "holo // live signal"}
      </p>
    </div>
  );
}
