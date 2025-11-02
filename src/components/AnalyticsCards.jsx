import { Activity, ArrowUpRight, BarChart2, LineChart, Users } from 'lucide-react';

const metrics = [
  {
    name: 'Active Users',
    value: '2,431',
    change: '+8.4%',
    positive: true,
    icon: Users,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    name: 'New Signups',
    value: '384',
    change: '+3.2%',
    positive: true,
    icon: Activity,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Sessions',
    value: '12,947',
    change: '-1.1%',
    positive: false,
    icon: BarChart2,
    color: 'from-rose-500 to-orange-500',
  },
  {
    name: 'Conversion',
    value: '4.6%',
    change: '+0.4%',
    positive: true,
    icon: LineChart,
    color: 'from-sky-500 to-cyan-500',
  },
];

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.name} className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">{m.name}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <h3 className="text-2xl font-semibold text-slate-900">{m.value}</h3>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium ${
                    m.positive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-rose-700 bg-rose-50'
                  }`}
                >
                  <ArrowUpRight className={`h-3.5 w-3.5 ${m.positive ? '' : 'rotate-90'}`} />
                  {m.change}
                </span>
              </div>
            </div>
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${m.color} text-white flex items-center justify-center`}>
              <m.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
