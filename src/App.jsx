import { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import PeriodicTable, { ELEMENTS } from './components/PeriodicTable.jsx';
import OrbitalViewer from './components/OrbitalViewer.jsx';
import RadialDistribution from './components/RadialDistribution.jsx';
import PropertiesPanel from './components/PropertiesPanel.jsx';

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
}

const LS_KEYS = {
  users: 'eos_users',
  elements: 'eos_elements',
  saved: 'eos_saved_simulations',
  assignments: 'eos_assignments',
  studentAssignments: 'eos_student_assignments',
  analytics: 'eos_analytics',
  sessionStart: 'eos_session_start',
  currentUser: 'eos_current_user',
};

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function nowISO() {
  return new Date().toISOString();
}

function App() {
  // Initialize data once
  useEffect(() => {
    // elements: persist once to allow future offline tweaks
    if (!localStorage.getItem(LS_KEYS.elements)) {
      writeLS(LS_KEYS.elements, ELEMENTS);
    }
    // users demo: create a default student & teacher profiles for local testing
    if (!localStorage.getItem(LS_KEYS.users)) {
      writeLS(LS_KEYS.users, [
        { username: 'student', role: 'student', created_at: nowISO(), last_login: null },
        { username: 'teacher', role: 'teacher', created_at: nowISO(), last_login: null },
      ]);
    }
    // init others
    ['saved', 'assignments', 'studentAssignments', 'analytics'].forEach((k) => {
      if (!localStorage.getItem(LS_KEYS[k])) writeLS(LS_KEYS[k], []);
    });
    if (!localStorage.getItem(LS_KEYS.sessionStart)) writeLS(LS_KEYS.sessionStart, nowISO());
    // auto-login student by default for demo
    if (!localStorage.getItem(LS_KEYS.currentUser)) {
      writeLS(LS_KEYS.currentUser, { username: 'student', role: 'student', last_login: nowISO() });
    }
  }, []);

  const elements = useMemo(() => readLS(LS_KEYS.elements, ELEMENTS), []);
  const currentUser = useMemo(() => readLS(LS_KEYS.currentUser, { username: 'student', role: 'student' }), []);

  const [selected, setSelected] = useState(elements[25] || elements[0]); // default Iron if available

  // Log analytics on selection
  const logAnalytics = (element, action) => {
    const arr = readLS(LS_KEYS.analytics, []);
    arr.push({
      username: currentUser?.username || 'guest',
      element_id: element.atomic_number,
      action_type: action,
      timestamp: nowISO(),
      session_duration: Date.now() - Date.parse(readLS(LS_KEYS.sessionStart, nowISO())),
    });
    writeLS(LS_KEYS.analytics, arr);
  };

  const handleSelect = (el) => {
    setSelected(el);
    logAnalytics(el, 'element_select');
  };

  // Save simulation locally
  const handleSave = ({ notes }) => {
    const saved = readLS(LS_KEYS.saved, []);
    const sim = {
      simulation_id: uid('sim'),
      username: currentUser.username,
      element_id: selected.atomic_number,
      quantum_numbers: {},
      viewing_angle: {},
      zoom_level: 1,
      timestamp: nowISO(),
      notes: String(notes || '').slice(0, 500),
    };
    saved.push(sim);
    writeLS(LS_KEYS.saved, saved);
    logAnalytics(selected, 'simulation_save');
    alert('Simulation saved to your browser!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative h-[280px] sm:h-[360px]">
        <Spline scene="https://prod.spline.design/Ao-qpnKUMOxV2eTA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Electron Orbital Simulator
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base">
              Explore quantum orbitals with neon-dark visuals. Rotate 3D probability clouds, study
              configurations, and save notes locally.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Comparison view: left visualization, right properties */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <OrbitalViewer Z={selected.atomic_number} elementSymbol={selected.symbol} />
            <RadialDistribution Z={selected.atomic_number} />
          </div>
          <div className="space-y-4">
            <PropertiesPanel element={selected} onSaveSimulation={handleSave} />
          </div>
        </div>

        {/* Periodic table */}
        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Periodic Table</h2>
            <p className="text-slate-400 text-sm">
              Click any element to update the orbital visualization. Categories are neon color-coded.
            </p>
          </div>
          <PeriodicTable selectedZ={selected.atomic_number} onSelect={handleSelect} />
        </section>
      </main>
    </div>
  );
}

export default App;
