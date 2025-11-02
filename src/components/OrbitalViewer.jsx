import React, { useEffect, useRef, useState } from 'react';

// Aufbau order of subshells (n,l) with capacity 2(2l+1)
const SUBSHELLS = [
  { n: 1, l: 0, label: '1s' },
  { n: 2, l: 0, label: '2s' },
  { n: 2, l: 1, label: '2p' },
  { n: 3, l: 0, label: '3s' },
  { n: 3, l: 1, label: '3p' },
  { n: 4, l: 0, label: '4s' },
  { n: 3, l: 2, label: '3d' },
  { n: 4, l: 1, label: '4p' },
  { n: 5, l: 0, label: '5s' },
  { n: 4, l: 2, label: '4d' },
  { n: 5, l: 1, label: '5p' },
  { n: 6, l: 0, label: '6s' },
  { n: 4, l: 3, label: '4f' },
  { n: 5, l: 2, label: '5d' },
  { n: 6, l: 1, label: '6p' },
  { n: 7, l: 0, label: '7s' },
  { n: 5, l: 3, label: '5f' },
  { n: 6, l: 2, label: '6d' },
  { n: 7, l: 1, label: '7p' },
];

const CAPACITY = (l) => 2 * (2 * l + 1);

export function buildElectronConfiguration(Z) {
  const subs = SUBSHELLS.map((s) => ({ ...s, e: 0, cap: CAPACITY(s.l) }));
  let remaining = Z;
  subs.forEach((s) => {
    if (remaining <= 0) return;
    const fill = Math.min(s.cap, remaining);
    s.e = fill;
    remaining -= fill;
  });

  // Hund's rule distribution across ml: track electrons per orbital (ml) with spins
  const orbitals = [];
  subs.forEach((s) => {
    const mCount = 2 * s.l + 1; // number of orbitals for this subshell
    const perMl = new Array(mCount).fill(0);
    // First distribute single electrons
    for (let i = 0; i < Math.min(s.e, mCount); i++) perMl[i] = 1;
    // Then pair remaining
    let left = s.e - Math.min(s.e, mCount);
    let idx = 0;
    while (left > 0) {
      perMl[idx] = Math.min(2, perMl[idx] + 1);
      idx = (idx + 1) % mCount;
      left--;
    }
    orbitals.push({ ...s, perMl });
  });

  const notation = subs
    .filter((s) => s.e > 0)
    .map((s) => `${s.label}${superscript(s.e)}`)
    .join(' ');

  return { subs, orbitals, notation };
}

function superscript(n) {
  const map = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  return String(n)
    .split('')
    .map((d) => map[d] || d)
    .join('');
}

function lToLetter(l) {
  return ['s', 'p', 'd', 'f'][l] || '?';
}

// Simple 3D renderer: draws s, p, d, f approximations with rotation
export default function OrbitalViewer({ Z, elementSymbol, onSnapshot }) {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState({ x: 0.8, y: 0.6 });
  const [zoom, setZoom] = useState(1);
  const config = buildElectronConfiguration(Z);

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const W = cvs.clientWidth;
    const H = cvs.clientHeight;
    cvs.width = W * dpr;
    cvs.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Background
    ctx.clearRect(0, 0, W, H);
    const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H));
    grd.addColorStop(0, 'rgba(15,23,42,1)');
    grd.addColorStop(1, 'rgba(2,6,23,1)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Draw nucleus glow
    drawGlow(ctx, W / 2, H / 2, 16 * zoom, 'rgba(59,130,246,0.5)');

    // Draw occupied subshells with neon edges
    const scale = 32 * zoom;
    config.orbitals
      .filter((o) => o.e > 0)
      .forEach((o, idx) => {
        const radius = (o.n + 0.5) * scale;
        const hue = 180 + o.l * 60 + idx * 7;
        const color = `hsla(${hue}, 85%, 60%, 0.55)`;
        drawSubshell(ctx, W / 2, H / 2, radius, angle, o.l, color, o.perMl);
      });

    // Quantum labels
    ctx.fillStyle = 'rgba(226,232,240,0.9)';
    ctx.font = '12px ui-sans-serif, system-ui, -apple-system, Segoe UI';
    let y = 18;
    config.subs
      .filter((s) => s.e > 0)
      .forEach((s) => {
        ctx.fillText(`n=${s.n}, l=${s.l} (${lToLetter(s.l)}), e⁻=${s.e}`, 12, y);
        y += 14;
      });

    // Watermark symbol
    ctx.fillStyle = 'rgba(148,163,184,0.6)';
    ctx.font = 'bold 48px ui-sans-serif, system-ui';
    ctx.fillText(elementSymbol, W - 80, H - 20);
  }, [angle, zoom, Z, elementSymbol]);

  // Interaction
  useEffect(() => {
    const cvs = canvasRef.current;
    let dragging = false;
    let lx = 0,
      ly = 0;
    const down = (e) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    };
    const move = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      setAngle((a) => ({ x: a.x + dy * 0.01, y: a.y + dx * 0.01 }));
    };
    const up = () => (dragging = false);
    cvs.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      cvs.removeEventListener('mousedown', down);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <div className="relative rounded-xl border border-cyan-500/30 bg-slate-900/60 backdrop-blur overflow-hidden">
      <div className="absolute top-2 left-2 text-xs text-slate-300/90 bg-slate-800/60 rounded px-2 py-1 pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[360px] sm:h-[420px]"
        onWheel={(e) => {
          e.preventDefault();
          const delta = Math.sign(e.deltaY);
          setZoom((z) => Math.min(1.6, Math.max(0.6, z - delta * 0.05)));
        }}
      />
      <div className="p-4 border-t border-slate-800/80">
        <div className="text-sm text-slate-300">Electron configuration</div>
        <div className="text-cyan-300 font-mono text-sm mt-1 break-words">{config.notation}</div>
      </div>
    </div>
  );
}

function drawGlow(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawSubshell(ctx, cx, cy, radius, angle, l, color, perMl) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle.y);
  // s: sphere glow
  if (l === 0) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    g.addColorStop(0, color.replace('0.55', '0.22'));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  // p: two lobes along axes
  if (l === 1) {
    const a = radius * 1.2;
    drawLobe(ctx, 0, -a, radius * 0.8, color, 0.45);
    drawLobe(ctx, 0, a, radius * 0.8, color, 0.45);
  }
  // d: clover (four lobes)
  if (l === 2) {
    const a = radius * 0.9;
    drawLobe(ctx, a, 0, radius * 0.7, color, 0.38);
    drawLobe(ctx, -a, 0, radius * 0.7, color, 0.38);
    drawLobe(ctx, 0, a, radius * 0.7, color, 0.38);
    drawLobe(ctx, 0, -a, radius * 0.7, color, 0.38);
  }
  // f: complex flower (six lobes)
  if (l === 3) {
    const a = radius * 1.1;
    for (let i = 0; i < 6; i++) {
      const t = (i * Math.PI) / 3;
      drawLobe(ctx, Math.cos(t) * a, Math.sin(t) * a, radius * 0.6, color, 0.32);
    }
  }
  ctx.restore();

  // Indicate electrons per ml as small neon dots on a ring
  if (perMl && perMl.length) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle.y);
    const ring = radius + 12;
    perMl.forEach((occ, i) => {
      const t = (i / perMl.length) * Math.PI * 2;
      const x = Math.cos(t) * ring;
      const y = Math.sin(t) * ring;
      for (let k = 0; k < occ; k++) {
        const off = (k - (occ - 1) / 2) * 4;
        neonDot(ctx, x + off, y + off, 2.5, 'rgba(34,211,238,0.9)');
      }
    });
    ctx.restore();
  }
}

function drawLobe(ctx, x, y, r, color, alpha) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.ellipse(x, y, r * 0.6, r, 0, 0, Math.PI * 2);
  ctx.stroke();
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color.replace('0.55', String(alpha)));
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(x, y, r * 0.6, r, 0, 0, Math.PI * 2);
  ctx.fill();
}

function neonDot(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r * 3, 0, Math.PI * 2);
  ctx.fill();
}
