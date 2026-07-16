import { useEffect, useState } from "react";
import { Footprints, StretchHorizontal, Flower2, PersonStanding, Bike, Play, Pause, RotateCcw, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";

type Workout = { key: string; label: string; mins: number; icon: LucideIcon; tone: string };
const workouts: Workout[] = [
  { key: "walking", label: "Walking", mins: 20, icon: Footprints, tone: "from-emerald-500 to-green-600" },
  { key: "stretching", label: "Stretching", mins: 10, icon: StretchHorizontal, tone: "from-sky-500 to-blue-600" },
  { key: "yoga", label: "Yoga", mins: 15, icon: Flower2, tone: "from-violet-500 to-purple-600" },
  { key: "running", label: "Running", mins: 25, icon: PersonStanding, tone: "from-rose-500 to-red-600" },
  { key: "cycling", label: "Cycling", mins: 30, icon: Bike, tone: "from-amber-500 to-orange-600" },
];

function ExercisePage() {
  const [active, setActive] = useState<Workout | null>(null);
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (running && secs === 0 && active) {
      setRunning(false);
      setDone((d) => ({ ...d, [active.key]: true }));
    }
  }, [secs, running, active]);

  const start = (w: Workout) => { setActive(w); setSecs(w.mins * 60); setRunning(true); };
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");

  return (
    <SubPage title="Exercise Reminder" desc="Pick a workout and start the timer">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {workouts.map((w) => (
          <div key={w.key} className="glass-card rounded-3xl p-6 hover-lift">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${w.tone} shadow-soft`}>
              <w.icon className="h-6 w-6 text-white" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{w.label}</h3>
                <p className="text-sm text-muted-foreground">{w.mins} minutes</p>
              </div>
              {done[w.key] && <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white"><Check className="h-4 w-4" /></div>}
            </div>
            <button onClick={() => start(w)} className="mt-4 w-full rounded-full bg-primary text-primary-foreground px-4 py-2.5 font-semibold">Start workout</button>
          </div>
        ))}
      </div>

      {active && (
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="text-sm text-muted-foreground">Now working out</div>
          <div className="text-2xl font-bold">{active.label}</div>
          <div className="text-6xl md:text-7xl font-extrabold gradient-text tabular-nums mt-4">{m}:{s}</div>
          <div className="mt-5 flex justify-center gap-2">
            <button onClick={() => setRunning((r) => !r)} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold">
              {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Resume</>}
            </button>
            <button onClick={() => { setRunning(false); setSecs(active.mins * 60); }} className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-5 py-2.5 font-semibold">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      )}
    </SubPage>
  );
}
export default ExercisePage;