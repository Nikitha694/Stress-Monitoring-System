
import { useEffect, useMemo, useRef, useState } from "react";
import { Brain, Palette, Circle, Wind, Puzzle, Smile, Zap, Hand, Map } from "lucide-react";


type GameKey = "memory" | "color" | "bubble" | "breathe" | "puzzle" | "emoji" | "reaction" | "rps" | "maze";

const gameList: { key: GameKey; title: string; icon: any; tone: string }[] = [
  { key: "memory", title: "Memory Cards", icon: Brain, tone: "bg-primary" },
  { key: "color", title: "Color Match", icon: Palette, tone: "bg-warning" },
  { key: "bubble", title: "Bubble Pop", icon: Circle, tone: "bg-success" },
  { key: "breathe", title: "Breathing Bubble", icon: Wind, tone: "bg-chart-5" },
  { key: "puzzle", title: "Slide Puzzle", icon: Puzzle, tone: "bg-primary" },
  { key: "emoji", title: "Emoji Match", icon: Smile, tone: "bg-warning" },
  { key: "reaction", title: "Reaction Time", icon: Zap, tone: "bg-destructive" },
  { key: "rps", title: "Rock Paper Scissors", icon: Hand, tone: "bg-success" },
  { key: "maze", title: "Mini Maze", icon: Map, tone: "bg-chart-5" },
];

/* ---------------- individual games ---------------- */

function shuffle<T>(arr: T[]) { return [...arr].sort(() => Math.random() - 0.5); }

function MemoryGame({ onScore }: { onScore: (n: number) => void }) {
  const emojis = ["🌸", "🌿", "🌊", "☀️", "🌙", "⭐", "🍃", "🌈"];
  const [cards, setCards] = useState(() => shuffle([...emojis, ...emojis]).map((v, i) => ({ id: i, v, flip: false, done: false })));
  const [sel, setSel] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  useEffect(() => {
    if (sel.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = sel;
      if (cards[a].v === cards[b].v) {
        setTimeout(() => setCards((c) => c.map((x, i) => (i === a || i === b ? { ...x, done: true } : x))), 400);
      } else {
        setTimeout(() => setCards((c) => c.map((x, i) => (i === a || i === b ? { ...x, flip: false } : x))), 700);
      }
      setTimeout(() => setSel([]), 700);
    }
  }, [sel]);
  useEffect(() => { if (cards.every((c) => c.done)) onScore(Math.max(0, 100 - moves * 4)); }, [cards]);
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-3">Moves: {moves}</div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((c, i) => (
          <button key={c.id} disabled={c.done || c.flip} onClick={() => { if (sel.length < 2) { setCards((x) => x.map((k, j) => (j === i ? { ...k, flip: true } : k))); setSel((s) => [...s, i]); } }}
            className={`aspect-square rounded-2xl text-3xl font-bold transition-all ${c.done ? "bg-success/20" : c.flip ? "bg-white" : "gradient-hero"}`}>
            {c.flip || c.done ? c.v : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorMatch({ onScore }: { onScore: (n: number) => void }) {
  const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];
  const colorMap: Record<string, string> = { Red: "text-red-500", Blue: "text-blue-500", Green: "text-green-500", Yellow: "text-yellow-500", Purple: "text-purple-500" };
  const [word, setWord] = useState(colors[0]);
  const [color, setColor] = useState(colors[1]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  useEffect(() => { setWord(colors[Math.floor(Math.random() * 5)]); setColor(colors[Math.floor(Math.random() * 5)]); }, [round]);
  const pick = (c: string) => {
    if (c === color) setScore((s) => s + 10);
    if (round >= 9) onScore(score);
    setRound((r) => r + 1);
  };
  return (
    <div className="text-center">
      <div className="text-sm text-muted-foreground mb-2">Round {round + 1}/10 — Score {score}</div>
      <div className="text-sm mb-3">Pick the <b>color</b> of the word (not the word itself):</div>
      <div className={`text-6xl font-extrabold mb-6 ${colorMap[color]}`}>{word}</div>
      <div className="flex flex-wrap justify-center gap-2">
        {colors.map((c) => <button key={c} onClick={() => pick(c)} className="rounded-full bg-white/70 border border-border px-4 py-2 text-sm font-semibold">{c}</button>)}
      </div>
    </div>
  );
}

function BubblePop({ onScore }: { onScore: (n: number) => void }) {
  const [bubbles, setBubbles] = useState(() => Array.from({ length: 20 }, (_, i) => ({ id: i, popped: false })));
  const popped = bubbles.filter((b) => b.popped).length;
  useEffect(() => { if (popped === bubbles.length) onScore(bubbles.length * 5); }, [popped]);
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-3">Popped: {popped}/{bubbles.length}</div>
      <div className="grid grid-cols-5 gap-2">
        {bubbles.map((b, i) => (
          <button key={b.id} onClick={() => setBubbles((x) => x.map((k, j) => (j === i ? { ...k, popped: true } : k)))}
            className={`aspect-square rounded-full transition-all ${b.popped ? "bg-muted scale-50 opacity-40" : "gradient-hero shadow-soft hover:scale-110"}`} />
        ))}
      </div>
    </div>
  );
}

function BreathingBubble() {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  useEffect(() => {
    const seq: any[] = [["Inhale", 4000], ["Hold", 4000], ["Exhale", 6000]];
    let i = 0;
    const tick = () => { setPhase(seq[i][0]); i = (i + 1) % seq.length; setTimeout(tick, seq[i][1]); };
    tick();
  }, []);
  return (
    <div className="text-center py-6">
      <div className={`mx-auto rounded-full gradient-hero shadow-elegant transition-all duration-[4000ms] ${phase === "Inhale" ? "h-56 w-56" : phase === "Exhale" ? "h-24 w-24" : "h-56 w-56"}`} />
      <div className="mt-6 text-2xl font-bold gradient-text">{phase}</div>
    </div>
  );
}

function SlidePuzzle({ onScore }: { onScore: (n: number) => void }) {
  const [tiles, setTiles] = useState(() => shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]));
  const [moves, setMoves] = useState(0);
  const move = (i: number) => {
    const zero = tiles.indexOf(0);
    const [r1, c1] = [Math.floor(i / 3), i % 3];
    const [r2, c2] = [Math.floor(zero / 3), zero % 3];
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
      const n = [...tiles]; [n[i], n[zero]] = [n[zero], n[i]];
      setTiles(n); setMoves((m) => m + 1);
      if (n.every((v, k) => v === (k + 1) % 9)) onScore(Math.max(0, 200 - moves * 4));
    }
  };
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-3">Moves: {moves}</div>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {tiles.map((t, i) => (
          <button key={i} onClick={() => move(i)} className={`aspect-square rounded-2xl text-2xl font-bold ${t === 0 ? "bg-transparent" : "gradient-hero text-white shadow-soft"}`}>{t || ""}</button>
        ))}
      </div>
    </div>
  );
}

function EmojiMatch({ onScore }: { onScore: (n: number) => void }) {
  const emojis = ["😀", "😎", "🥳", "😴", "🤩"];
  const [target, setTarget] = useState(emojis[0]);
  const [options, setOptions] = useState<string[]>(emojis);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  useEffect(() => {
    const t = emojis[Math.floor(Math.random() * emojis.length)];
    setTarget(t); setOptions(shuffle(emojis));
  }, [round]);
  const pick = (e: string) => {
    if (e === target) setScore((s) => s + 10);
    if (round >= 9) onScore(score);
    setRound((r) => r + 1);
  };
  return (
    <div className="text-center">
      <div className="text-sm text-muted-foreground mb-2">Round {round + 1}/10 — Score {score}</div>
      <div className="text-7xl mb-6">{target}</div>
      <div className="flex justify-center gap-2 flex-wrap">
        {options.map((e) => <button key={e} onClick={() => pick(e)} className="text-4xl rounded-2xl bg-white/70 border border-border p-3 hover:scale-110 transition-transform">{e}</button>)}
      </div>
    </div>
  );
}

function ReactionTime({ onScore }: { onScore: (n: number) => void }) {
  const [state, setState] = useState<"idle" | "wait" | "go" | "done">("idle");
  const [time, setTime] = useState<number>(0);
  const startRef = useRef(0);
  const start = () => {
    setState("wait");
    const delay = 1000 + Math.random() * 3000;
    setTimeout(() => { setState("go"); startRef.current = performance.now(); }, delay);
  };
  const click = () => {
    if (state === "go") { const t = Math.round(performance.now() - startRef.current); setTime(t); setState("done"); onScore(Math.max(0, 500 - t)); }
    else if (state === "wait") { setState("idle"); }
  };
  return (
    <div className="text-center">
      <button onClick={state === "idle" || state === "done" ? start : click}
        className={`w-full h-56 rounded-3xl text-white text-2xl font-bold transition-colors ${state === "wait" ? "bg-warning" : state === "go" ? "bg-success" : "bg-primary"}`}>
        {state === "idle" && "Click to start"}
        {state === "wait" && "Wait for green..."}
        {state === "go" && "CLICK NOW!"}
        {state === "done" && `${time} ms — Click to retry`}
      </button>
    </div>
  );
}

function RPS({ onScore }: { onScore: (n: number) => void }) {
  const opts = ["Rock", "Paper", "Scissors"];
  const emoji: any = { Rock: "🪨", Paper: "📄", Scissors: "✂️" };
  const [me, setMe] = useState<string | null>(null);
  const [cpu, setCpu] = useState<string | null>(null);
  const [wins, setWins] = useState(0);
  const play = (c: string) => {
    const ai = opts[Math.floor(Math.random() * 3)];
    setMe(c); setCpu(ai);
    const win = (c === "Rock" && ai === "Scissors") || (c === "Paper" && ai === "Rock") || (c === "Scissors" && ai === "Paper");
    if (win) { setWins((w) => w + 1); onScore(wins * 10 + 10); }
  };
  return (
    <div className="text-center">
      <div className="text-sm text-muted-foreground mb-4">Wins: {wins}</div>
      <div className="flex justify-center gap-6 mb-4 text-5xl">
        <div><div className="text-xs mb-1">You</div>{me ? emoji[me] : "❓"}</div>
        <div><div className="text-xs mb-1">CPU</div>{cpu ? emoji[cpu] : "❓"}</div>
      </div>
      <div className="flex justify-center gap-2">
        {opts.map((o) => <button key={o} onClick={() => play(o)} className="rounded-full bg-white/70 border border-border px-4 py-2 text-sm font-semibold">{emoji[o]} {o}</button>)}
      </div>
    </div>
  );
}

function MiniMaze({ onScore }: { onScore: (n: number) => void }) {
  // Simple 6x6 with fixed walls
  const grid = useMemo(() => [
    [0,0,1,0,0,0],
    [0,1,1,0,1,0],
    [0,0,0,0,1,0],
    [1,1,0,1,0,0],
    [0,0,0,1,0,1],
    [0,1,0,0,0,0],
  ], []);
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [moves, setMoves] = useState(0);
  const move = (dr: number, dc: number) => {
    const nr = pos.r + dr, nc = pos.c + dc;
    if (nr < 0 || nc < 0 || nr > 5 || nc > 5 || grid[nr][nc] === 1) return;
    setPos({ r: nr, c: nc }); setMoves((m) => m + 1);
    if (nr === 5 && nc === 5) onScore(Math.max(0, 150 - moves * 5));
  };
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") move(-1, 0);
      if (e.key === "ArrowDown") move(1, 0);
      if (e.key === "ArrowLeft") move(0, -1);
      if (e.key === "ArrowRight") move(0, 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-3">Reach the ⭐ · Moves: {moves} · Use arrow keys or buttons</div>
      <div className="grid grid-cols-6 gap-1 max-w-xs mx-auto">
        {grid.map((row, r) => row.map((v, c) => (
          <div key={`${r}-${c}`} className={`aspect-square rounded-lg flex items-center justify-center text-xl ${v ? "bg-foreground/80" : "bg-white/70 border border-border"}`}>
            {pos.r === r && pos.c === c ? "🟢" : r === 5 && c === 5 ? "⭐" : ""}
          </div>
        )))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-1">
        <button onClick={() => move(-1, 0)} className="rounded-lg bg-white/70 border border-border px-4 py-1">▲</button>
        <div className="flex gap-1">
          <button onClick={() => move(0, -1)} className="rounded-lg bg-white/70 border border-border px-4 py-1">◀</button>
          <button onClick={() => move(1, 0)} className="rounded-lg bg-white/70 border border-border px-4 py-1">▼</button>
          <button onClick={() => move(0, 1)} className="rounded-lg bg-white/70 border border-border px-4 py-1">▶</button>
        </div>
      </div>
    </div>
  );
}

function Games() {
  const [active, setActive] = useState<GameKey>("memory");
  const [scores, setScores] = useState<Record<string, number>>({});
  const setScore = (k: GameKey) => (n: number) => setScores((s) => ({ ...s, [k]: Math.max(s[k] || 0, n) }));

  const renderGame = () => {
    switch (active) {
      case "memory": return <MemoryGame onScore={setScore("memory")} />;
      case "color": return <ColorMatch onScore={setScore("color")} />;
      case "bubble": return <BubblePop onScore={setScore("bubble")} />;
      case "breathe": return <BreathingBubble />;
      case "puzzle": return <SlidePuzzle onScore={setScore("puzzle")} />;
      case "emoji": return <EmojiMatch onScore={setScore("emoji")} />;
      case "reaction": return <ReactionTime onScore={setScore("reaction")} />;
      case "rps": return <RPS onScore={setScore("rps")} />;
      case "maze": return <MiniMaze onScore={setScore("maze")} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">Stress Relief Games</h1>
        <p className="mt-2 text-muted-foreground">Relax, unwind, and improve your focus with mini-games.</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {gameList.map((g) => (
          <button key={g.key} onClick={() => setActive(g.key)} className={`glass-card rounded-2xl p-3 text-center transition-all ${active === g.key ? "ring-2 ring-primary scale-[1.03]" : "hover-lift"}`}>
            <div className={`mx-auto grid h-10 w-10 place-items-center rounded-xl ${g.tone}`}><g.icon className="h-5 w-5 text-white" /></div>
            <div className="mt-2 text-xs font-semibold">{g.title}</div>
            {scores[g.key] !== undefined && <div className="text-[10px] text-muted-foreground mt-0.5">Best: {scores[g.key]}</div>}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{gameList.find((g) => g.key === active)?.title}</h2>
          {scores[active] !== undefined && <div className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">Best: {scores[active]}</div>}
        </div>
        {renderGame()}
      </div>
    </div>
  );
}
export default Games;