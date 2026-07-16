import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


const tracks = [
  { title: "Nature Sounds", ytId: "eKFTSSKCzWA" },
  { title: "Rain Sounds", ytId: "mPZkdNFkNps" },
  { title: "Forest Ambience", ytId: "xNN7iTA57jM" },
  { title: "Ocean Waves", ytId: "V1RPi2MYptM" },
  { title: "White Noise", ytId: "nMfPqeZjc2c" },
  { title: "Piano Relaxation", ytId: "lFcSrYw-ARY" },
  { title: "Meditation Music", ytId: "1ZYbU82GVz4" },
  { title: "Focus Music", ytId: "5qap5aO4i9A" },
];

function MusicPage() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const post = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  useEffect(() => { post(playing ? "playVideo" : "pauseVideo"); }, [playing, idx]);
  useEffect(() => { post("setVolume", [volume]); }, [volume]);

  const next = () => { setIdx((i) => (i + 1) % tracks.length); setPlaying(true); };
  const prev = () => { setIdx((i) => (i - 1 + tracks.length) % tracks.length); setPlaying(true); };

  const t = tracks[idx];

  return (
    <SubPage title="Relaxing Music" desc="Curated calming audio to help you unwind">
      <div className="glass-card rounded-3xl p-6 md:p-8">
        <div className="aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            key={t.ytId}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${t.ytId}?enablejsapi=1&autoplay=${playing ? 1 : 0}`}
            title={t.title}
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="mt-6 text-center">
          <div className="text-sm text-muted-foreground">Now playing</div>
          <div className="text-2xl font-bold">{t.title}</div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button onClick={prev} className="grid h-11 w-11 place-items-center rounded-full bg-white/70 border border-border hover:bg-white"><SkipBack className="h-5 w-5" /></button>
          <button onClick={() => setPlaying((p) => !p)} className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <button onClick={next} className="grid h-11 w-11 place-items-center rounded-full bg-white/70 border border-border hover:bg-white"><SkipForward className="h-5 w-5" /></button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-3 max-w-sm mx-auto">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-primary" />
          <span className="text-sm w-8 text-right tabular-nums">{volume}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {tracks.map((tr, i) => (
          <button
            key={tr.ytId}
            onClick={() => { setIdx(i); setPlaying(true); }}
            className={`glass-card rounded-2xl p-4 text-left hover-lift ${i === idx ? "ring-2 ring-primary" : ""}`}
          >
            <div className="font-semibold text-sm">{tr.title}</div>
            <div className="text-xs text-muted-foreground mt-1">Track {i + 1}</div>
          </button>
        ))}
      </div>
    </SubPage>
  );
}
export default MusicPage;