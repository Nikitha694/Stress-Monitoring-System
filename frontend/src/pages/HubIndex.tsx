import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Video, Wind, Music, TreePine, Quote, Salad, Trophy, Droplet, Moon, Dumbbell, Timer, Flower2,
} from "lucide-react";

const cards = [
  { to: "/hub/meditation", icon: Video, title: "Meditation Videos", desc: "Guided sessions from 5–30 mins", tone: "from-sky-500 to-blue-600" },
  { to: "/hub/yoga", icon: Flower2, title: "Yoga Videos", desc: "Beginner to advanced flows", tone: "from-emerald-500 to-green-600" },
  { to: "/hub/breathing", icon: Wind, title: "Breathing Exercises", desc: "4-4-6 guided breathing", tone: "from-cyan-500 to-teal-600" },
  { to: "/hub/music", icon: Music, title: "Relaxing Music", desc: "Curated calming playlists", tone: "from-amber-500 to-orange-600" },
  { to: "/hub/nature", icon: TreePine, title: "Nature Sounds", desc: "Rain, forest, ocean, wind", tone: "from-green-500 to-emerald-700" },
  { to: "/hub/quotes", icon: Quote, title: "Motivational Quotes", desc: "Random daily inspiration", tone: "from-indigo-500 to-blue-600" },
  { to: "/hub/diet", icon: Salad, title: "Healthy Diet Tips", desc: "Stress-reducing foods", tone: "from-lime-500 to-green-600" },
  { to: "/hub/challenges", icon: Trophy, title: "Daily Challenges", desc: "Small wellness wins", tone: "from-yellow-500 to-amber-600" },
  { to: "/hub/water", icon: Droplet, title: "Water Reminder", desc: "Track daily hydration", tone: "from-blue-500 to-cyan-600" },
  { to: "/hub/sleep", icon: Moon, title: "Sleep Reminder", desc: "Bedtime tracker", tone: "from-violet-500 to-indigo-700" },
  { to: "/hub/exercise", icon: Dumbbell, title: "Exercise Reminder", desc: "Workout timers", tone: "from-rose-500 to-red-600" },
  { to: "/hub/pomodoro", icon: Timer, title: "Pomodoro Timer", desc: "25/5 focus cycles", tone: "from-fuchsia-500 to-pink-600" },
] as const;

function HubIndex() {
  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">Interactive Wellness Hub</h1>
        <p className="mt-2 text-muted-foreground">Everything you need for calm, focus, and healthy habits.</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -6 }}
          >
            <Link to={c.to} className="glass-card rounded-3xl p-6 block h-full">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c.tone} shadow-soft`}>
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <p className="mt-3 text-xs font-semibold text-primary">Open →</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default HubIndex;