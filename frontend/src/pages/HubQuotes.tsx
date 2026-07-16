import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Copy, Share2, Heart, Check } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";


const QUOTES = [
  { q: "You are stronger than you think.", a: "Unknown" },
  { q: "This too shall pass.", a: "Persian Proverb" },
  { q: "Breathe. It's just a bad day, not a bad life.", a: "Unknown" },
  { q: "Peace begins with a smile.", a: "Mother Teresa" },
  { q: "Almost everything will work again if you unplug it for a few minutes — including you.", a: "Anne Lamott" },
  { q: "The greatest weapon against stress is our ability to choose one thought over another.", a: "William James" },
  { q: "You don't have to control your thoughts. You just have to stop letting them control you.", a: "Dan Millman" },
  { q: "Rest when you're weary. Refresh and renew yourself.", a: "Ralph Marston" },
  { q: "Slow down and everything you are chasing will come around and catch you.", a: "John De Paola" },
  { q: "Calm mind brings inner strength and self-confidence.", a: "Dalai Lama" },
  { q: "Little by little, one travels far.", a: "J.R.R. Tolkien" },
  { q: "You are allowed to be both a masterpiece and a work in progress.", a: "Sophia Bush" },
];

function QuotesPage() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const [favs, setFavs] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("quote-favs");
      if (raw) setFavs(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (arr: number[]) => {
    setFavs(arr);
    try { localStorage.setItem("quote-favs", JSON.stringify(arr)); } catch {}
  };

  const next = () => setI(Math.floor(Math.random() * QUOTES.length));
  const current = QUOTES[i];
  const text = `"${current.q}" — ${current.a}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ text }); } catch {} } else { copy(); }
  };
  const toggleFav = () => {
    persist(favs.includes(i) ? favs.filter((f) => f !== i) : [...favs, i]);
  };

  return (
    <SubPage title="Motivational Quotes" desc="A fresh dose of inspiration">
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100/40 via-transparent to-sky-100/40" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-3xl font-semibold leading-relaxed max-w-3xl mx-auto"
          >
            "{current.q}"
            <footer className="mt-4 text-base font-medium text-muted-foreground">— {current.a}</footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold">
            <Shuffle className="h-4 w-4" /> Next Quote
          </button>
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-5 py-2.5 font-semibold">
            {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
          </button>
          <button onClick={share} className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-5 py-2.5 font-semibold">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button onClick={toggleFav} className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold border ${favs.includes(i) ? "bg-rose-500 text-white border-rose-500" : "bg-white/70 border-border"}`}>
            <Heart className={`h-4 w-4 ${favs.includes(i) ? "fill-current" : ""}`} /> {favs.includes(i) ? "Favorited" : "Favorite"}
          </button>
        </div>
      </div>

      {favs.length > 0 && (
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-bold mb-3">Your favorites ({favs.length})</h3>
          <ul className="space-y-2 text-sm">
            {favs.map((f) => (
              <li key={f} className="p-3 rounded-xl bg-white/60">"{QUOTES[f].q}" — <span className="text-muted-foreground">{QUOTES[f].a}</span></li>
            ))}
          </ul>
        </div>
      )}
    </SubPage>
  );
}
export default QuotesPage;