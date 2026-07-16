import { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


function minsBetween(from: string, to: string) {
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  let mins = (th * 60 + tm) - (fh * 60 + fm);
  if (mins <= 0) mins += 24 * 60;
  return mins;
}

function untilBedtime(bed: string) {
  const [bh, bm] = bed.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(bh, bm, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return Math.max(0, target.getTime() - now.getTime());
}

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
}

function SleepPage() {
  const [bedtime, setBedtime] = useState("22:00");
  const [waketime, setWaketime] = useState("06:30");
  const [notify, setNotify] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sleep-config");
      if (raw) { const p = JSON.parse(raw); setBedtime(p.bedtime); setWaketime(p.waketime); }
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("sleep-config", JSON.stringify({ bedtime, waketime })); } catch {}
  }, [bedtime, waketime]);

  useEffect(() => {
    const tick = () => setCountdown(untilBedtime(bedtime));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [bedtime]);

  useEffect(() => {
    if (!notify) return;
    if (countdown > 0 && countdown < 1000) {
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification("🌙 Bedtime!", { body: "It's time to wind down and sleep." });
      } else {
        alert("🌙 Bedtime! It's time to wind down and sleep.");
      }
    }
  }, [countdown, notify]);

  const enableNotify = async () => {
    if (typeof Notification !== "undefined") {
      const p = await Notification.requestPermission();
      setNotify(p === "granted");
    } else {
      setNotify(true);
    }
  };

  const duration = minsBetween(bedtime, waketime);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;

  return (
    <SubPage title="Sleep Reminder" desc="Build a healthy sleep routine">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700"><Moon className="h-5 w-5 text-white" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Bedtime</div>
              <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} className="text-2xl font-bold bg-transparent focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500"><Sun className="h-5 w-5 text-white" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Wake-up</div>
              <input type="time" value={waketime} onChange={(e) => setWaketime(e.target.value)} className="text-2xl font-bold bg-transparent focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="text-xs text-muted-foreground">Countdown to bedtime</div>
          <div className="text-4xl font-extrabold gradient-text tabular-nums mt-1">{fmt(countdown)}</div>
          <div className="mt-6 text-xs text-muted-foreground">Sleep duration</div>
          <div className="text-2xl font-bold">{hours}h {mins}m</div>
          <button onClick={enableNotify} className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold ${notify ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground"}`}>
            <Bell className="h-4 w-4" /> {notify ? "Reminder on" : "Enable reminder"}
          </button>
        </div>
      </div>
    </SubPage>
  );
}
export default SleepPage;