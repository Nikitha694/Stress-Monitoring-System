
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Download, CalendarDays, TrendingUp, TrendingDown } from "lucide-react";
import { weeklyTrend } from "../lib/mock-data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const stressPerDay = [35, 48, 62, 40, 55, 28, 22];

function levelColor(v: number) {
  if (v < 40) return "bg-success text-white";
  if (v < 65) return "bg-warning text-white";
  return "bg-destructive text-white";
}

function Report() {
  const avgStress = Math.round(stressPerDay.reduce((a, b) => a + b) / 7);
  const maxIdx = stressPerDay.indexOf(Math.max(...stressPerDay));
  const minIdx = stressPerDay.indexOf(Math.min(...stressPerDay));

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Weekly Report</h1>
          <p className="mt-2 text-muted-foreground">Your stress and wellness summary for the past 7 days.</p>
        </div>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold shadow-soft hover:scale-105 transition-transform">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Average Stress", value: `${avgStress}%`, tone: "bg-primary" },
          { label: "Average Sleep", value: "7.2 hrs", tone: "bg-success" },
          { label: "Avg Screen Time", value: "5.6 hrs", tone: "bg-warning" },
          { label: "Meditation Days", value: "5 / 7", tone: "bg-chart-5" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-3xl p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.tone}`}><CalendarDays className="h-5 w-5 text-white" /></div>
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h2 className="font-bold mb-4">Weekly Calendar</h2>
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {days.map((d, i) => (
            <div key={d} className="rounded-2xl bg-white/60 border border-white/60 p-3 text-center hover-lift">
              <div className="text-xs text-muted-foreground">{d}</div>
              <div className={`mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${levelColor(stressPerDay[i])}`}>{stressPerDay[i]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-destructive" /> Highest: <span className="font-semibold">{days[maxIdx]} ({stressPerDay[maxIdx]}%)</span></div>
          <div className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-success" /> Lowest: <span className="font-semibold">{days[minIdx]} ({stressPerDay[minIdx]}%)</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-bold mb-4">Progress Graph</h3>
          <div className="h-64">
            <ResponsiveContainer><AreaChart data={weeklyTrend}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.58 0.17 240)" stopOpacity={0.5} /><stop offset="100%" stopColor="oklch(0.58 0.17 240)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="day" /><YAxis /><Tooltip />
              <Area type="monotone" dataKey="stress" stroke="oklch(0.58 0.17 240)" fill="url(#g1)" strokeWidth={3} />
            </AreaChart></ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-bold mb-4">Mood Trend</h3>
          <div className="h-64">
            <ResponsiveContainer><LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="day" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="mood" stroke="oklch(0.68 0.16 155)" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart></ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Report;