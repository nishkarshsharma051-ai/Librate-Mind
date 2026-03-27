import AppShell from '@/components/layout/AppShell';
import DynamicIcon from '@/components/DynamicIcon';
import { USAGE_DATA, APP_BREAKDOWN, HABIT_PATTERNS, CAT_META } from '@/lib/data';
import { TrendingDown, TrendingUp, Minus, Lightbulb, PieChart, Info } from 'lucide-react';

const MAX_HOURS = 10;

export default function AnalyticsPage() {
  const totalThisWeek = USAGE_DATA.reduce((s, d) => s + d.hours, 0).toFixed(1);
  const avg = (USAGE_DATA.reduce((s, d) => s + d.hours, 0) / USAGE_DATA.length).toFixed(1);
  const bestDay = [...USAGE_DATA].sort((a, b) => a.hours - b.hours)[0];
  const worstDay = [...USAGE_DATA].sort((a, b) => b.hours - a.hours)[0];

  const donutTotal = APP_BREAKDOWN.reduce((s, a) => s + a.pct, 0);
  let cumulativePct = 0;

  // SVG donut
  const donutR = 60;
  const donutCirc = 2 * Math.PI * donutR;
  const segments = APP_BREAKDOWN.map(a => {
    const start = (cumulativePct / donutTotal) * donutCirc;
    const dash = (a.pct / donutTotal) * donutCirc;
    const offset = donutCirc - start;
    cumulativePct += a.pct;
    return { ...a, dash, offset };
  });

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8 page-enter">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-smoke">Analytics</h1>
          <p className="text-sm text-slate mt-1">Your digital usage insights this week</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total this week', value: `${totalThisWeek}h`, icon: Minus, iconColor: '#8A8A8A' },
            { label: 'Daily average', value: `${avg}h`, icon: TrendingUp, iconColor: '#FF7C7C' },
            { label: 'Best day', value: `${bestDay.hours}h`, sub: bestDay.day, icon: TrendingDown, iconColor: '#6ABF8E' },
          ].map(({ label, value, sub, icon: Icon, iconColor }) => (
            <div key={label} className="card p-4 flex flex-col gap-2">
              <Icon size={16} style={{ color: iconColor }} />
              <p className="text-xl font-bold text-smoke">{value}</p>
              {sub && <p className="text-[10px] text-slate -mt-1">{sub}</p>}
              <p className="text-[11px] text-slate leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="card p-6">
          <h2 className="text-sm font-bold text-smoke uppercase tracking-wide mb-6">Daily Screen Time</h2>
          <div className="flex items-end justify-between gap-2 h-32">
            {USAGE_DATA.map(d => {
              const pct = (d.hours / MAX_HOURS) * 100;
              const isToday = d.day === new Date().toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-[10px] text-slate">{d.label}</span>
                  <div className="w-full rounded-t-xl overflow-hidden neu-inset" style={{ height: '80px' }}>
                    <div
                      className="w-full rounded-t-xl transition-all duration-700"
                      style={{
                        height: `${pct}%`,
                        background: isToday
                          ? 'linear-gradient(to top, #8A8A8A, #C0C0C0)'
                          : d.hours > 7 ? 'linear-gradient(to top, #FFB0B0, #FFCECE)' : 'linear-gradient(to top, #D0D0D0, #E8E8E8)',
                        marginTop: `${100-pct}%`,
                      }}
                    />
                  </div>
                  <span className={`text-[11px] font-semibold ${isToday ? 'text-iron' : 'text-slate'}`}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* App Breakdown Donut */}
        <div className="card p-6">
          <h2 className="text-sm font-bold text-smoke uppercase tracking-wide mb-6">App Breakdown</h2>
          <div className="flex items-center gap-8">
            <div className="relative flex-shrink-0" style={{ width: 144, height: 144 }}>
              <svg width={144} height={144}>
                {segments.map((s, i) => (
                  <circle
                    key={i}
                    cx={72} cy={72} r={donutR}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={18}
                    strokeDasharray={`${s.dash} ${donutCirc - s.dash}`}
                    strokeDashoffset={s.offset}
                    transform="rotate(-90 72 72)"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-slate font-medium">This week</span>
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
              {APP_BREAKDOWN.map(a => (
                <div key={a.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: a.color }} />
                  <span className="text-xs font-medium text-iron flex-1">{a.name}</span>
                  <span className="text-xs font-bold text-slate">{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={16} className="text-slate" />
            <h2 className="text-sm font-bold text-smoke uppercase tracking-wide">Habit Insights</h2>
          </div>
          <div className="space-y-4">
            {HABIT_PATTERNS.slice(0, 3).map((h, i) => {
              const meta = CAT_META[h.category];
              return (
                <div key={i} className="card p-5 flex gap-4 items-start group hover:shadow-card-hover transition-all">
                  <div className="w-10 h-10 rounded-2xl neu-surface-sm flex items-center justify-center flex-shrink-0 text-slate group-hover:text-iron transition-colors">
                    <DynamicIcon name={meta.icon} size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-iron leading-snug">{h.pattern}</p>
                    <p className="text-xs text-slate leading-relaxed opacity-90">{h.alternative}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
