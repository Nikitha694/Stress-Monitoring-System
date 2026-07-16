
import { useState } from "react";
import { CheckCircle2, AlertCircle, PhoneCall, HeartPulse } from "lucide-react";

const data = {
  Low: {
    color: "bg-success",
    ring: "ring-success/30",
    items: ["Maintain a healthy lifestyle", "Drink 2–3L of water daily", "Continue regular exercise", "Keep a regular sleep schedule", "Practice mindful meditation"],
  },
  Medium: {
    color: "bg-warning",
    ring: "ring-warning/30",
    items: ["Reduce screen time before bed", "Take short breaks every hour", "Try yoga & stretching", "Go for daily walks", "Listen to calming music", "Deep breathing exercises"],
  },
  High: {
    color: "bg-destructive",
    ring: "ring-destructive/30",
    items: ["Consult a mental health professional", "Prioritize daily meditation", "Exercise 30+ minutes daily", "Reconnect with family & friends", "Sleep at least 8 hours", "Avoid caffeine & alcohol"],
  },
} as const;

function Recommendations() {
  const [tab, setTab] = useState<"Low" | "Medium" | "High">("Medium");
  const d = data[tab];
  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">Personalized Recommendations</h1>
        <p className="mt-2 text-muted-foreground">Guidance tailored to your stress level.</p>
      </header>

      <div className="glass-card rounded-full p-1.5 inline-flex gap-1">
        {(["Low", "Medium", "High"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${tab === k ? `${data[k].color} text-white shadow-soft` : "text-foreground/70 hover:bg-white/60"}`}>
            {k} Stress
          </button>
        ))}
      </div>

      <div className={`glass-card rounded-3xl p-8 ring-4 ${d.ring}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`grid h-12 w-12 place-items-center rounded-2xl ${d.color}`}><CheckCircle2 className="h-6 w-6 text-white" /></div>
          <div>
            <div className="text-sm text-muted-foreground">Recommendations for</div>
            <div className="text-2xl font-bold">{tab} Stress Level</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {d.items.map((r, i) => (
            <div key={r} className="rounded-2xl bg-white/60 border border-white/60 p-4 flex items-start gap-3 hover-lift" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`mt-1 h-2 w-2 rounded-full ${d.color}`} />
              <span className="text-sm font-medium">{r}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-destructive/10 border border-destructive/30 p-6 md:p-8 flex flex-col md:flex-row items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-destructive text-white"><AlertCircle className="h-6 w-6" /></div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg">Emergency Support</h2>
          <p className="text-sm text-muted-foreground mt-1">If you feel overwhelmed or in crisis, please reach out for immediate help.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="tel:988" className="inline-flex items-center gap-2 rounded-full bg-destructive text-white px-5 py-2.5 text-sm font-semibold hover:scale-105 transition-transform"><PhoneCall className="h-4 w-4" /> Crisis Helpline: 988</a>
            <a href="tel:112" className="inline-flex items-center gap-2 rounded-full bg-white border border-destructive/30 text-destructive px-5 py-2.5 text-sm font-semibold"><HeartPulse className="h-4 w-4" /> Emergency: 112</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Recommendations;