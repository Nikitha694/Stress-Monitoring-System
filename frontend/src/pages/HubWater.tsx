import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplet, Plus, RotateCcw } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


const TARGET = 3000; // ml
const CUP = 250;

function todayKey() { return "water-" + new Date().toISOString().slice(0, 10); }

function WaterPage() {
  const [ml, setMl] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(todayKey());
      if (raw) setMl(Number(raw) || 0);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(todayKey(), String(ml)); } catch {}
  }, [ml]);

  const pct = Math.min(100, (ml / TARGET) * 100);

  return (
    <SubPage title="Water Reminder" desc={`Target: ${TARGET / 1000}L / day`}>
      <div className="glass-card rounded-3xl p-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="grid place-items-center">
          <div className="relative h-72 w-40 rounded-[2.5rem] border-4 border-sky-300 overflow-hidden bg-white/60 shadow-inner">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-500 to-cyan-400"
              initial={false}
              animate={{ height: `${pct}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-3xl font-extrabold drop-shadow">{ml}ml</div>
                <div className="text-sm text-muted-foreground">of {TARGET}ml</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="h-6 w-6 text-sky-500" />
            <div className="text-2xl font-bold">{Math.round(pct)}% hydrated</div>
          </div>
          <div className="h-3 rounded-full bg-white/70 overflow-hidden border border-border">
            <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all" style={{ width: `${pct}%` }} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setMl((m) => Math.min(TARGET * 2, m + CUP))} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold">
              <Plus className="h-4 w-4" /> Add {CUP}ml
            </button>
            <button onClick={() => setMl((m) => Math.min(TARGET * 2, m + 500))} className="rounded-full bg-white/70 border border-border px-5 py-2.5 font-semibold">+ 500ml</button>
            <button onClick={() => setMl(0)} className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-5 py-2.5 font-semibold">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>

          {ml >= TARGET && <p className="mt-4 font-semibold text-emerald-600">🎉 You hit your hydration goal!</p>}
        </div>
      </div>
    </SubPage>
  );
}
export default WaterPage;