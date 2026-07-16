import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


type Phase = "inhale" | "hold" | "exhale";
const DURATIONS: Record<Phase, number> = { inhale: 4, hold: 4, exhale: 6 };
const NEXT: Record<Phase, Phase> = { inhale: "hold", hold: "exhale", exhale: "inhale" };
const LABEL: Record<Phase, string> = { inhale: "Breathe In", hold: "Hold", exhale: "Breathe Out" };

function BreathingPage() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [secs, setSecs] = useState(DURATIONS.inhale);
  const [cycles, setCycles] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecs((s) => {
        if (s > 1) return s - 1;
        const cur = phaseRef.current;
        const nxt = NEXT[cur];
        if (cur === "exhale") setCycles((c) => c + 1);
        setPhase(nxt);
        return DURATIONS[nxt];
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const reset = () => { setRunning(false); setPhase("inhale"); setSecs(DURATIONS.inhale); setCycles(0); };

  const scale = phase === "inhale" ? 1.4 : phase === "hold" ? 1.4 : 0.8;
  const dur = DURATIONS[phase];

  return (
    <SubPage title="Breathing Exercises" desc="4-4-6 guided breathing — inhale, hold, exhale">
      <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.2), transparent 60%)",
              "radial-gradient(circle at 70% 70%, rgba(16,185,129,0.2), transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(6,182,212,0.2), transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(59,130,246,0.2), transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="grid place-items-center min-h-[420px]">
          <div className="relative grid place-items-center">
            <motion.div
              className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 shadow-[0_0_80px_rgba(59,130,246,0.4)]"
              animate={{ scale: running ? scale : 1 }}
              transition={{ duration: running ? dur : 0.5, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center text-white drop-shadow">
                <div className="text-3xl md:text-4xl font-bold">{LABEL[phase]}</div>
                <div className="text-6xl md:text-7xl font-extrabold tabular-nums mt-1">{secs}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setRunning((r) => !r)} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-soft">
            {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
          </button>
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-6 py-3 font-semibold">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Cycles completed: <span className="font-semibold text-foreground">{cycles}</span></p>
      </div>
    </SubPage>
  );
}
export default BreathingPage;