const data = [
  { label: 'Mon', value: 32 },
  { label: 'Tue', value: 45 },
  { label: 'Wed', value: 58 },
  { label: 'Thu', value: 52 },
  { label: 'Fri', value: 64 },
  { label: 'Sat', value: 49 },
  { label: 'Sun', value: 72 },
];

export default function ActivityChart() {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800">Daily Active Users</h3>
        <div className="text-xs text-slate-500">Last 7 days</div>
      </div>
      <div className="h-56 sm:h-64">
        <div className="grid grid-cols-7 items-end gap-3 h-full">
          {data.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2">
              <div className="relative w-full rounded-md bg-slate-100 h-full flex items-end">
                <div
                  className="w-full rounded-md bg-gradient-to-t from-indigo-500 to-violet-400"
                  style={{ height: `${(d.value / max) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
