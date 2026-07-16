import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";

const videos = [
  { id: "hJbRpHZr_d0", title: "Yoga for Stress Relief", duration: "20 min" },
  { id: "v7AYKMP6rOE", title: "Yoga for Beginners", duration: "25 min" },
  { id: "VaoV1PrYft4", title: "Morning Yoga", duration: "15 min" },
  { id: "tAUf7aajBWE", title: "Office Stretch", duration: "10 min" },
  { id: "2NOsE-VPpkE", title: "Neck & Shoulder Relaxation", duration: "12 min" },
  { id: "sTANio_2E0Q", title: "15 Minute Yoga", duration: "15 min" },
  { id: "BiWDsfZ3zbo", title: "Evening Yoga", duration: "20 min" },
  { id: "sTxC3J3gQEU", title: "Full Body Stretch", duration: "30 min" },
];

function YogaPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <SubPage title="Yoga Videos" desc="Move your body, calm your mind">
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
export default YogaPage;