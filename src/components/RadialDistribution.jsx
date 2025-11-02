import React, { useMemo } from 'react';

// Very simplified hydrogenic radial distribution approximation to visualize trends
// Not physically exact for multi-electron atoms, but conveys shell radii growth with n and l
function radialProfile(n, l, points = 120) {
  const arr = [];
  const a0 = 1; // scaled Bohr radius (arbitrary units)
  const scale = n * (1 + l * 0.2);
  for (let i = 0; i < points; i++) {
    const r = (i / (points - 1)) * 6 * scale;
    // crude shape: r^{2l} * exp(-2r/(na0)) with normalization-like factor
    const val = Math.pow(r, 2 * l + 1) * Math.exp((-2 * r) / (n * a0));
    arr.push({ r, val });
  }
  // normalize
  const max = Math.max(...arr.map((p) => p.val)) || 1;
  return arr.map((p) => ({ r: p.r, val: p.val / max }));
}

export default function RadialDistribution({ Z }) {
  // Estimate outermost occupied subshell (n,l) from aufbau filling
  const shells = buildShells(Z);
  const last = shells[shells.length - 1];
  const profiles = [last, ...shells.slice(-3)].filter(Boolean);

  const datasets = useMemo(() => profiles.map((s, idx) => ({
    n: s.n,
    l: s.l,
    color: `hsla(${200 + idx * 40},80%,60%,0.9)`,
    data: radialProfile(s.n, s.l),
  })), [Z]);

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">Radial distribution (scaled)</div>
        <div className="text-xs text-slate-400">Outer shells</div>
      </div>
      <div className="w-full h-40">
        <svg viewBox="0 0 400 120" className="w-full h-full">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* axes */}
          <line x1="10" y1="110" x2="390" y2="110" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
          <line x1="10" y1="10" x2="10" y2="110" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
          {datasets.map((d, idx) => (
            <path key={idx} d={toPath(d.data)} fill="none" stroke={d.color} strokeWidth="2" filter="url(#glow)" />
          ))}
        </svg>
      </div>
      <div className="mt-2 flex gap-3 text-xs text-slate-400 flex-wrap">
        {datasets.map((d, idx) => (
          <span key={idx} className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: d.color }} />
            n={d.n}, l={d.l}
          </span>
        ))}
      </div>
    </div>
  );
}

function toPath(data) {
  const xs = (i) => 10 + (i / (data.length - 1)) * 380;
  const ys = (v) => 110 - v * 95;
  return data
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(i).toFixed(2)} ${ys(p.val).toFixed(2)}`)
    .join(' ');
}

// Minimal aufbau to get last subshell for visualization context
function buildShells(Z) {
  const order = [
    [1, 0, 2],
    [2, 0, 2],
    [2, 1, 6],
    [3, 0, 2],
    [3, 1, 6],
    [4, 0, 2],
    [3, 2, 10],
    [4, 1, 6],
    [5, 0, 2],
    [4, 2, 10],
    [5, 1, 6],
    [6, 0, 2],
    [4, 3, 14],
    [5, 2, 10],
    [6, 1, 6],
    [7, 0, 2],
    [5, 3, 14],
    [6, 2, 10],
    [7, 1, 6],
  ];
  const shells = [];
  let left = Z;
  for (const [n, l, cap] of order) {
    if (left <= 0) break;
    const e = Math.min(cap, left);
    shells.push({ n, l, e });
    left -= e;
  }
  return shells;
}
