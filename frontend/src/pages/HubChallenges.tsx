import { useEffect, useState } from "react";
import { Trophy, RefreshCcw, Check } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


const CHALLENGES = [
  { title: "Walk 5,000 steps", target: 5000, unit: "steps" },
  { title: "Meditate 10 minutes", target: 10, unit: "min" },
  { title: "Drink 3 liters of water", target: 3000, unit: "ml" },
  { title: "Sleep before 10 PM", target: 1, unit: "night" },
  { title: "Reduce screen time to 4 hours", target: 4, unit: "hours" },
  { title: "Practice gratitude — list 3 things", target: 3, unit: "notes" },
  { title: "Read for 20 minutes", target: 20, unit: "min" },
  { title: "Stretch for 5 minutes", target: 5, unit: "min" },
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

type State = { date: string; idx: number; progress: number };

function ChallengesPage() {
  const [state, setState] = useState<State>(() => {
    const idx = Math.floor(Math.random() * CHALLENGES.length);
    return { date: todayKey(), idx, progress: 0 };
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("daily-challenge");
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        if (parsed.date === todayKey()) { setState(parsed); return; }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("daily-challenge", JSON.stringify(state)); } catch {}
  }, [state]);

  const c = CHALLENGES[state.idx];
  const pct = Math.min(100, Math.round((state.progress / c.target) * 100));
  const complete = state.progress >= c.target;

  const shuffle = () => {
    const idx = Math.floor(Math.random() * CHALLENGES.length);
    setState({ date: todayKey(), idx, progress: 0 });
  };
  const step = c.target >= 1000 ? 250 : c.target >= 100 ? 10 : 1;

  return (
    <SubPage title="Daily Challenge" desc="One small win every day">
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-soft">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Today's challenge</div>
            <h2 className="text-2xl font-bold">{c.title}</h2>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">{state.progress} / {c.target} {c.unit}</span>
            <span className="text-muted-foreground">{pct}%</span>
          </div>
          <div className="h-4 rounded-full bg-white/70 overflow-hidden border border-border">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => setState((s) => ({ ...s, progress: Math.min(c.target, s.progress + step) }))} className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold">
            + {step} {c.unit}
          </button>
          <button onClick={() => setState((s) => ({ ...s, progress: c.target }))} className="rounded-full bg-emerald-500 text-white px-5 py-2.5 font-semibold inline-flex items-center gap-2">
            <Check className="h-4 w-4" /> Mark complete
          </button>
          <button onClick={shuffle} className="rounded-full bg-white/70 border border-border px-5 py-2.5 font-semibold inline-flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" /> New challenge
          </button>
        </div>

        {complete && <p className="mt-6 text-center font-semibold text-emerald-600">🎉 Challenge complete! Great work.</p>}
      </div>
    </SubPage>
  );
}
export default ChallengesPage;