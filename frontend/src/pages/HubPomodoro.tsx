import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";

type Mode = "focus" | "short" | "long";
const DUR: Record<Mode, number> = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABEL: Record<Mode, string> = { focus: "25 Min Focus", short: "5 Min Break", long: "Long Break" };

function beep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; o.type = "sine";
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    o.start(); o.stop(ctx.currentTime + 1.2);
  } catch {}
}

function PomodoroPage() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secs, setSecs] = useState(DUR.focus);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const notifiedRef = useRef(false);

  useEffect(() => { setSecs(DUR[mode]); setRunning(false); notifiedRef.current = false; }, [mode]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (running && secs === 0 && !notifiedRef.current) {
      notifiedRef.current = true;
      setRunning(false);
      beep();
      if (mode === "focus") setSessions((n) => n + 1);
    }
  }, [secs, running, mode]);

  const total = DUR[mode];
  const pct = 1 - secs / total;
  const R = 120;
  const C = 2 * Math.PI * R;
  const dash = C * pct;

  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");

  return (
    <SubPage title="Pomodoro Timer" desc="25 minutes focus, 5 minutes break">
      <div className="glass-card rounded-3xl p-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(["focus", "short", "long"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === m ? "bg-primary text-primary-foreground" : "bg-white/70 border border-border"}`}>
              {LABEL[m]}
            </button>
          ))}
        </div>

        <div className="grid place-items-center">
          <div className="relative">
            <svg width={280} height={280} className="-rotate-90">
              <circle cx={140} cy={140} r={R} strokeWidth={14} className="fill-none stroke-white/60" />
              <circle
                cx={140} cy={140} r={R}
                strokeWidth={14}
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - dash}
                className="fill-none stroke-[url(#pomo-grad)] transition-[stroke-dashoffset] duration-1000"
              />
              <defs>
                <linearGradient id="pomo-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-6xl font-extrabold tabular-nums">{m}:{s}</div>
                <div className="text-sm text-muted-foreground mt-1">{LABEL[mode]}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => setRunning((r) => !r)} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">
            {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
          </button>
          <button onClick={() => { setRunning(false); setSecs(DUR[mode]); notifiedRef.current = false; }} className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-6 py-3 font-semibold">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">Focus sessions completed: <span className="font-semibold text-foreground">{sessions}</span></p>
      </div>
    </SubPage>
  );
}
export default PomodoroPage;