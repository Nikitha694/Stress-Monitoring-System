import { useEffect, useRef, useState } from "react";
import { CloudRain, Waves, TreePine, Bird, Droplets, Wind, Cloud, Pause, Play } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


const sounds = [
  { key: "rain", label: "Rain", icon: CloudRain, ytId: "mPZkdNFkNps", tone: "from-blue-500 to-cyan-600" },
  { key: "ocean", label: "Ocean", icon: Waves, ytId: "V1RPi2MYptM", tone: "from-cyan-500 to-teal-600" },
  { key: "forest", label: "Forest", icon: TreePine, ytId: "xNN7iTA57jM", tone: "from-emerald-500 to-green-700" },
  { key: "birds", label: "Birds", icon: Bird, ytId: "PNsRC2c7VDk", tone: "from-lime-500 to-emerald-600" },
  { key: "waterfall", label: "Waterfall", icon: Droplets, ytId: "0LmiUdPQVSg", tone: "from-sky-500 to-blue-700" },
  { key: "wind", label: "Wind", icon: Wind, ytId: "6MB0jjng8LI", tone: "from-slate-400 to-slate-600" },
  { key: "thunder", label: "Thunder", icon: Cloud, ytId: "gVKEM4K8J8A", tone: "from-indigo-500 to-slate-700" },
];

function NaturePage() {
  const [active, setActive] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const current = sounds.find((s) => s.key === active);

  const toggle = (key: string) => setActive((a) => (a === key ? null : key));

  useEffect(() => {
    // iframe reload handles play/pause
  }, [active]);

  return (
    <SubPage title="Nature Sounds" desc="Immerse yourself in calming natural ambience">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sounds.map((s) => {
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              className={`glass-card rounded-3xl p-6 text-left hover-lift ${isActive ? "ring-2 ring-primary" : ""}`}
            >
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.tone} shadow-soft`}>
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{s.label}</h3>
              <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {isActive ? <><Pause className="h-4 w-4" /> Playing</> : <><Play className="h-4 w-4" /> Play</>}
              </div>
            </button>
          );
        })}
      </div>

      {current && (
        <div className="glass-card rounded-3xl p-4 sticky bottom-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Now playing</div>
              <div className="font-bold">{current.label}</div>
            </div>
            <button onClick={() => setActive(null)} className="rounded-full px-4 py-2 bg-white/70 border border-border text-sm font-semibold">Stop</button>
          </div>
          <div className="aspect-video max-w-xl mx-auto rounded-xl overflow-hidden bg-black">
            <iframe
              ref={iframeRef}
              key={current.ytId}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${current.ytId}?autoplay=1`}
              title={current.label}
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </SubPage>
  );
}
export default NaturePage;