import { useMemo } from "react";
import { heroSignal } from "../data/portfolio";

const W = 420;
const H = 300;
const PAD = { l: 18, r: 18, t: 28, b: 34 };

const gauss = (x: number, m: number, s: number) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));

/**
 * Holographic plot of the Dirichlet-GMM mixture for one real detected ski event
 * (data in portfolio.ts → heroSignal). Used as the hologram until a character asset is supplied.
 */
export default function SignalScope({ className = "" }: { className?: string }) {
  const { mix, comps, ticks, peaks } = useMemo(() => {
    const c = heroSignal.components;
    const t0 = Math.min(...c.map((k) => k.mean - 3 * k.std));
    const t1 = Math.max(...c.map((k) => k.mean + 3 * k.std));
    const N = 260;
    const xs = Array.from({ length: N }, (_, i) => t0 + ((t1 - t0) * i) / (N - 1));
    const ys = xs.map((x) => c.reduce((a, k) => a + k.weight * gauss(x, k.mean, k.std), 0));
    const yMax = Math.max(...ys) * 1.1;
    const sx = (x: number) => PAD.l + ((x - t0) / (t1 - t0)) * (W - PAD.l - PAD.r);
    const sy = (y: number) => H - PAD.b - (y / yMax) * (H - PAD.t - PAD.b);
    const toPath = (v: number[]) => v.map((y, i) => `${i ? "L" : "M"}${sx(xs[i]).toFixed(1)},${sy(y).toFixed(1)}`).join("");
    const ticks: { x: number; label: string }[] = [];
    for (let v = Math.ceil(t0 / 40) * 40; v <= t1; v += 40) ticks.push({ x: sx(v), label: `${v}s` });
    return {
      mix: toPath(ys),
      comps: c.map((k) => toPath(xs.map((x) => k.weight * gauss(x, k.mean, k.std)))),
      ticks,
      peaks: c.map((k, i) => ({ x: sx(k.mean), y: sy(ys[xs.findIndex((x) => x >= k.mean)] ?? 0), i })),
    };
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-labelledby="scope-t scope-d">
      <title id="scope-t">Mixture density of one detected ski vibration event</title>
      <desc id="scope-d">
        Eight Gaussian sub-events found by my Dirichlet Process mixture model in a real Shredshox ski run; sharp peaks near
        164, 211 and 252 seconds.
      </desc>
      <defs>
        <linearGradient id="hfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#18e4ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#18e4ff" stopOpacity="0" />
        </linearGradient>
        <filter id="hglow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text x={PAD.l} y={16} className="fill-cyan font-mono" fontSize="10" letterSpacing="2">
        RUN 2024-12-06 · AsX · EVENT 02
      </text>
      <text x={W - PAD.r} y={16} textAnchor="end" className="fill-acid font-mono" fontSize="10" letterSpacing="2">
        GRADE {heroSignal.grade}
      </text>
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="#18e4ff" strokeOpacity=".35" />
      {ticks.map((t) => (
        <text key={t.label} x={t.x} y={H - 14} textAnchor="middle" className="fill-cyan font-mono" fillOpacity=".6" fontSize="9">
          {t.label}
        </text>
      ))}
      {comps.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#18e4ff" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 3" />
      ))}
      <path d={`${mix}L${W - PAD.r},${H - PAD.b}L${PAD.l},${H - PAD.b}Z`} fill="url(#hfill)" />
      <path d={mix} pathLength={1} fill="none" stroke="#8ff3ff" strokeWidth="2" filter="url(#hglow)" className="trace-draw" />
      {peaks.map((p) => (
        <circle key={p.i} cx={p.x} cy={p.y} r="2.4" fill="#f3e600" />
      ))}
    </svg>
  );
}
