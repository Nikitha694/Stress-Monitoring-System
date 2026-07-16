import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";

const videos = [
  { id: "inpok4MKVLM", title: "5 Minute Meditation", duration: "5 min" },
  { id: "O-6f5wQXSu8", title: "10 Minute Meditation", duration: "10 min" },
  { id: "aEqlQvczMJQ", title: "Sleep Meditation", duration: "30 min" },
  { id: "z6X5oEIg6Ak", title: "Stress Relief Meditation", duration: "15 min" },
  { id: "ssss7V1_eyA", title: "Mindfulness Meditation", duration: "20 min" },
  { id: "j734gLbQFbU", title: "Morning Meditation", duration: "10 min" },
  { id: "MIr3RsUWrdo", title: "Anxiety Relief Meditation", duration: "15 min" },
  { id: "1vx8iUvfyCY", title: "Deep Relaxation Meditation", duration: "25 min" },
];

function MeditationPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <SubPage title="Meditation Videos" desc="Guided sessions to calm your mind">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v, i) => (
          <motion.button
            key={v.id}
            onClick={() => setActive(v.id)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl overflow-hidden text-left group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 grid place-items-center bg-black/30">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-lg">
                  <Play className="h-6 w-6 text-primary ml-1" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{v.duration}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 hover:bg-white">
                <X className="h-5 w-5" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${active}?autoplay=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SubPage>
  );
}
export default MeditationPage;