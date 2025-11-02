import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Save, User } from 'lucide-react';
import { buildElectronConfiguration } from './OrbitalViewer.jsx';

export default function PropertiesPanel({ element, onSaveSimulation }) {
  const { notation, subs } = useMemo(() => buildElectronConfiguration(element.atomic_number), [element.atomic_number]);
  const [notes, setNotes] = useState('');

  useEffect(() => setNotes(''), [element.atomic_number]);

  const valence = subs.filter((s) => s.e > 0).slice(-1)[0];

  return (
    <div className="rounded-xl border border-violet-500/30 bg-slate-900/60 divide-y divide-slate-800/60">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-300">Selected Element</div>
            <div className="text-xl font-semibold text-slate-100">{element.name} ({element.symbol})</div>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>Atomic No: {element.atomic_number}</div>
            <div>Mass: {element.atomic_mass}</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Category: {element.category}</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Period: {element.period}</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Group: {element.group}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-slate-300">Electron configuration</div>
        <div className="font-mono text-cyan-300 mt-1 break-words">{notation}</div>
        {valence && (
          <div className="mt-2 text-xs text-slate-400">Valence shell: n={valence.n}, l={valence.l}</div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm text-slate-300 mb-2">Quantum numbers</div>
        <ul className="text-xs text-slate-400 space-y-1">
          <li><b className="text-slate-200">n</b> (principal): energy level and size (1-7)</li>
          <li><b className="text-slate-200">l</b> (azimuthal): shape (0=s, 1=p, 2=d, 3=f)</li>
          <li><b className="text-slate-200">mₗ</b> (magnetic): orientation (−l ... +l)</li>
          <li><b className="text-slate-200">mₛ</b> (spin): +½ or −½</li>
        </ul>
      </div>
      <div className="p-4">
        <div className="text-sm text-slate-300 mb-2">Save simulation</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, 500))}
          placeholder="Add study notes (max 500 chars)"
          className="w-full h-20 rounded-lg bg-slate-950/70 text-slate-200 border border-slate-700 focus:border-violet-400 focus:outline-none p-2 text-sm"
        />
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={() => onSaveSimulation({ notes })}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 text-sm"
          >
            <Save className="h-4 w-4" />
            Save locally
          </button>
          <div className="text-xs text-slate-500 inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> autosaves in your browser
          </div>
        </div>
      </div>
      <div className="p-4 text-xs text-slate-400">
        <div className="inline-flex items-center gap-1 mb-1">
          <User className="h-3.5 w-3.5" /> Client-side only • No account needed
        </div>
        <p>All data is stored in this browser using localStorage. Clear your browser data to reset.</p>
      </div>
    </div>
  );
}
