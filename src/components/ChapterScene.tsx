import { useMemo } from "react";
import type { Role } from "../data/portfolio";

/**
 * Themed backdrops for experience chapters. Purely decorative (aria-hidden),
 * pointer-events off, faded at the edges so text stays readable.
 * Animations pause when the chapter is off screen (data-live) and stop for reduced motion.
 */

type Theme = Role["theme"];

// deterministic pseudo-random so scenes never reshuffle between renders
function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const VB = "0 0 1200 520";

/* Shredshox — ski slope: ridgelines, contour lines, carved tracks, snowfall */
function Ski() {
  const flakes = useMemo(() => {
    const r = rng(11);
    return Array.from({ length: 46 }, () => ({ x: r() * 1200, y: r() * 520, s: 1 + r() * 2.2, d: 6 + r() * 8, o: 0.3 + r() * 0.6 }));
  }, []);
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path
          key={k}
          d={`M-20 ${150 + k * 55} C 220 ${100 + k * 50}, 420 ${210 + k * 48}, 640 ${140 + k * 52} S 1020 ${200 + k * 50}, 1240 ${120 + k * 58}`}
          fill="none"
          stroke="#18e4ff"
          strokeOpacity={0.18 - k * 0.02}
        />
      ))}
      <path d="M0 210 L140 90 L230 160 L360 40 L470 140 L560 80 L700 190 L820 60 L960 170 L1080 100 L1200 180" fill="none" stroke="#f1f0ea" strokeOpacity=".35" strokeWidth="1.5" />
      {/* carved ski tracks */}
      <path className="scene-draw" pathLength={1} d="M880 0 C 760 90, 1000 150, 860 250 S 980 400, 820 520" fill="none" stroke="#f1f0ea" strokeOpacity=".55" strokeWidth="2" />
      <path className="scene-draw" style={{ animationDelay: ".25s" }} pathLength={1} d="M905 0 C 785 92, 1025 152, 885 252 S 1005 402, 845 520" fill="none" stroke="#18e4ff" strokeOpacity=".6" strokeWidth="2" />
      {flakes.map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={f.s} fill="#fff" opacity={f.o} className="scene-snow" style={{ animationDuration: `${f.d}s`, animationDelay: `${-f.d * (i / 46)}s` }} />
      ))}
    </svg>
  );
}

/* Delta Faucet — pipes, a faucet dripping, rippling water surface */
function Water() {
  const wave = (amp: number, y: number) => {
    let d = `M0 ${y}`;
    for (let x = 0; x <= 2400; x += 100) d += ` Q ${x + 50} ${y + (x % 200 ? amp : -amp)} ${x + 100} ${y}`;
    return d + ` L2400 520 L0 520 Z`;
  };
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {/* pipes */}
      <g fill="none" stroke="#a9a9b4" strokeOpacity=".22" strokeWidth="14" strokeLinejoin="round">
        <path d="M-20 90 H 760 V 170 H 980" />
        <path d="M200 -20 V 90" />
        <path d="M520 90 V 300 H 1240" />
      </g>
      <g fill="#24242b" stroke="#a9a9b4" strokeOpacity=".5">
        {[
          [200, 90],
          [520, 90],
          [760, 90],
          [760, 170],
          [520, 300],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 13} y={y - 13} width="26" height="26" />
        ))}
      </g>
      {/* faucet spout */}
      <path d="M980 155 H 1040 Q 1070 155 1070 185 V 205" fill="none" stroke="#f1f0ea" strokeOpacity=".55" strokeWidth="16" strokeLinecap="round" />
      {[0, 1, 2].map((k) => (
        <ellipse key={k} cx="1070" cy="225" rx="5" ry="8" fill="#18e4ff" className="scene-drip" style={{ animationDelay: `${k * 0.9}s` }} />
      ))}
      {[0, 1].map((k) => (
        <ellipse key={k} cx="1070" cy="430" rx="10" ry="3" fill="none" stroke="#18e4ff" className="scene-ripple" style={{ animationDelay: `${0.75 + k * 0.9}s` }} />
      ))}
      {/* water surface */}
      <g className="scene-rise">
        <path d={wave(12, 430)} fill="#18e4ff" fillOpacity=".12" className="scene-wave" />
        <path d={wave(8, 445)} fill="#18e4ff" fillOpacity=".1" className="scene-wave scene-wave-slow" />
      </g>
    </svg>
  );
}

/* LoftxAI — apartment facades with windows switching on, blueprint lines */
function Property() {
  const wins = useMemo(() => {
    const r = rng(5);
    const out: { x: number; y: number; d: number; lit: boolean }[] = [];
    const blocks = [
      [640, 60, 220, 460],
      [880, 140, 170, 380],
      [1070, 30, 150, 490],
    ];
    for (const [bx, by, bw, bh] of blocks)
      for (let y = by + 24; y < by + bh - 20; y += 34) for (let x = bx + 18; x < bx + bw - 22; x += 30) out.push({ x, y, d: r() * 9, lit: r() < 0.45 });
    return { out, blocks };
  }, []);
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {/* blueprint floor plan */}
      <g fill="none" stroke="#18e4ff" strokeOpacity=".22" strokeDasharray="6 6">
        <rect x="60" y="80" width="420" height="300" />
        <path d="M60 220 H 260 V 380 M260 220 V 80 M330 80 V 260 H 480" />
        <path className="scene-draw" pathLength={1} d="M120 340 H 220 V 260 H 400 V 120" strokeDasharray="none" stroke="#f3e600" strokeOpacity=".5" />
      </g>
      {wins.blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#141418" stroke="#4a4a55" strokeOpacity=".6" />
      ))}
      {wins.out.map((w, i) => (
        <rect
          key={i}
          x={w.x}
          y={w.y}
          width="14"
          height="18"
          fill="#f3e600"
          className={w.lit ? "scene-window" : undefined}
          opacity={w.lit ? undefined : 0.06}
          style={w.lit ? { animationDelay: `${w.d}s` } : undefined}
        />
      ))}
    </svg>
  );
}

/* Corteva — crop rows converging in perspective, swaying sprouts */
function Crops() {
  const sprouts = useMemo(() => {
    const out: { x: number; y: number; s: number; d: number }[] = [];
    const vx = 820,
      vy = 70;
    for (let row = 0; row < 11; row++) {
      const bx = -300 + row * 190;
      for (let t = 0.2; t <= 1; t += 0.16) out.push({ x: vx + (bx - vx) * t, y: vy + (520 - vy) * t, s: 0.4 + t, d: (row * 0.37 + t * 2) % 3 });
    }
    return out;
  }, []);
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <line x1="0" y1="70" x2="1200" y2="70" stroke="#f3e600" strokeOpacity=".35" />
      {Array.from({ length: 11 }, (_, row) => (
        <line key={row} x1="820" y1="70" x2={-300 + row * 190} y2="520" stroke="#f3e600" strokeOpacity=".16" className="scene-draw" pathLength={1} style={{ animationDelay: `${row * 0.05}s` }} />
      ))}
      {sprouts.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
          <g className="scene-sway" style={{ animationDelay: `${-p.d}s` }}>
            <path d="M0 0 V -18 M0 -10 Q -10 -16 -14 -26 Q -4 -22 0 -12 M0 -14 Q 10 -20 14 -30 Q 4 -26 0 -16" fill="none" stroke="#c8e05a" strokeOpacity=".55" strokeWidth="1.6" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* Allison — street grid map, a GPS route drawing in, RDP-kept points, turning gear */
function Route() {
  const route = "M60 470 L150 430 L190 360 L300 330 L360 250 L480 230 L560 160 L700 150 L780 90 L930 80 L1010 140 L1150 120";
  const pts = route
    .slice(1)
    .split(" L")
    .map((p) => p.split(" ").map(Number));
  const teeth = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <g stroke="#a9a9b4" strokeOpacity=".14">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`v${i}`} x1={i * 90 + 20} y1="0" x2={i * 90 - 40} y2="520" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 80 + 30} x2="1200" y2={i * 80 + 10} />
        ))}
      </g>
      <path d={route} fill="none" stroke="#ff3b4e" strokeOpacity=".7" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      <path d={route} pathLength={1} fill="none" stroke="#ff3b4e" strokeWidth="2.5" className="scene-draw" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#09090b" stroke="#f3e600" strokeWidth="2" className="scene-pop" style={{ animationDelay: `${0.3 + i * 0.12}s` }} />
      ))}
      <g transform="translate(1090 400)">
        <g className="scene-spin">
          <circle r="46" fill="none" stroke="#a9a9b4" strokeOpacity=".4" strokeWidth="10" />
          {teeth.map((a) => (
            <rect key={a} x="-7" y="-62" width="14" height="16" fill="#a9a9b4" fillOpacity=".4" transform={`rotate(${a})`} />
          ))}
          <circle r="12" fill="none" stroke="#a9a9b4" strokeOpacity=".5" strokeWidth="4" />
        </g>
      </g>
    </svg>
  );
}

/* Revaya — timekeeping: clock face with sweeping hand, clock-in/out punch grid */
function Clock() {
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const punches = useMemo(() => {
    const r = rng(23);
    return Array.from({ length: 7 * 10 }, (_, i) => ({ c: i % 10, r: Math.floor(i / 10), on: r() < 0.6 }));
  }, []);
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <g transform="translate(980 250)">
        <circle r="210" fill="none" stroke="#f3e600" strokeOpacity=".22" />
        <circle r="170" fill="none" stroke="#a9a9b4" strokeOpacity=".18" strokeDasharray="2 6" />
        {ticks.map((i) => (
          <line key={i} x1="0" y1={i % 5 ? -196 : -186} x2="0" y2="-206" stroke="#f1f0ea" strokeOpacity={i % 5 ? 0.25 : 0.6} strokeWidth={i % 5 ? 1 : 2.5} transform={`rotate(${i * 6})`} />
        ))}
        <line x1="0" y1="20" x2="0" y2="-120" stroke="#f1f0ea" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" transform="rotate(-60)" />
        <g className="scene-spin-60">
          <circle r="190" fill="none" />
          <line x1="0" y1="30" x2="0" y2="-190" stroke="#f3e600" strokeOpacity=".85" strokeWidth="2" />
        </g>
        <circle r="7" fill="#f3e600" />
      </g>
      {/* punch card grid: 7 days × 10 slots */}
      <g transform="translate(70 120)">
        {punches.map((p, i) => (
          <rect
            key={i}
            x={p.c * 38}
            y={p.r * 40}
            width="28"
            height="24"
            fill={p.on ? "#f3e600" : "none"}
            fillOpacity={p.on ? 0.14 : 0}
            stroke="#a9a9b4"
            strokeOpacity=".25"
            className={p.on ? "scene-pop" : undefined}
            style={p.on ? { animationDelay: `${(i % 10) * 0.06 + Math.floor(i / 10) * 0.08}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

/* LoftxAI — query routing: requests flow into a router; most go to the database, a few to the LLM */
function Llm() {
  const toDb = "M40 260 C 220 260, 300 260, 440 260 C 560 260, 620 380, 780 390 L 900 390";
  const toLlm = "M40 260 C 220 260, 300 260, 440 260 C 560 260, 620 140, 780 130 L 900 130";
  const packets = Array.from({ length: 8 }, (_, i) => ({ llm: i % 4 === 3, d: i * 0.55 }));
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <path d={toDb} fill="none" stroke="#f3e600" strokeOpacity=".3" strokeWidth="2" />
      <path d={toLlm} fill="none" stroke="#18e4ff" strokeOpacity=".3" strokeWidth="2" strokeDasharray="4 6" />
      {/* inbox */}
      <g transform="translate(20 230)" fill="none" stroke="#a9a9b4" strokeOpacity=".5">
        <rect width="60" height="60" />
        <path d="M0 0 L30 26 L60 0" />
      </g>
      {/* router */}
      <rect x="420" y="240" width="40" height="40" transform="rotate(45 440 260)" fill="#09090b" stroke="#f1f0ea" strokeOpacity=".6" strokeWidth="2" />
      {/* database */}
      <g transform="translate(900 340)" fill="#09090b" stroke="#f3e600" strokeOpacity=".7" strokeWidth="2">
        <path d="M0 15 V 85 A 70 15 0 0 0 140 85 V 15" />
        <ellipse cx="70" cy="15" rx="70" ry="15" />
        <path d="M0 50 A 70 15 0 0 0 140 50" fill="none" />
      </g>
      {/* LLM chip */}
      <g transform="translate(910 80)" stroke="#18e4ff" strokeOpacity=".7" strokeWidth="2">
        <rect width="110" height="100" fill="#09090b" />
        <rect x="30" y="28" width="50" height="44" fill="none" />
        {[15, 40, 65, 90].map((x) => (
          <g key={x}>
            <line x1={x} y1="-12" x2={x} y2="0" />
            <line x1={x} y1="100" x2={x} y2="112" />
          </g>
        ))}
      </g>
      {packets.map((p, i) => (
        <rect
          key={i}
          x="-6"
          y="-6"
          width="12"
          height="12"
          fill={p.llm ? "#18e4ff" : "#f3e600"}
          className="scene-packet"
          style={{ offsetPath: `path("${p.llm ? toLlm : toDb}")`, animationDelay: `${-p.d}s` }}
        />
      ))}
    </svg>
  );
}

const SCENES: Record<Theme, () => JSX.Element> = { llm: Llm, ski: Ski, water: Water, property: Property, crops: Crops, route: Route, clock: Clock };

/** Entrance used for each theme's media panel (CSS in index.css). */
export const THEME_ENTRANCE: Record<Theme, "carve" | "flood" | "doors" | "blinds" | "trace" | "clock" | "stream"> = {
  llm: "stream",
  ski: "carve",
  water: "flood",
  property: "doors",
  crops: "blinds",
  route: "trace",
  clock: "clock",
};

export default function ChapterScene({ theme, active, live }: { theme: Theme; active: boolean; live: boolean }) {
  const Scene = SCENES[theme];
  return (
    <div
      aria-hidden="true"
      data-active={active ? "true" : "false"}
      data-live={live ? "true" : "false"}
      className="chapter-scene pointer-events-none absolute -top-6 bottom-6 left-[-1.25rem] right-[-1.25rem] -z-[1] sm:left-[-2rem] sm:right-[-2rem]"
    >
      <Scene />
    </div>
  );
}
