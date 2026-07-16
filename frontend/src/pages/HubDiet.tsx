
import { Coffee, Sun, Moon, Droplet, Apple, Carrot, Leaf, Cookie, Nut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SubPage } from "../components/hub/SubPage";

type Tip = { icon: LucideIcon; title: string; desc: string; tone: string };

const tips: Tip[] = [
  { icon: Coffee, title: "Breakfast", desc: "Oats with berries, Greek yogurt, whole grain toast with avocado.", tone: "from-amber-500 to-orange-600" },
  { icon: Sun, title: "Lunch", desc: "Grilled salmon, quinoa, leafy greens, olive oil dressing.", tone: "from-yellow-500 to-amber-600" },
  { icon: Moon, title: "Dinner", desc: "Steamed veggies, brown rice, lean protein — light and early.", tone: "from-indigo-500 to-violet-600" },
  { icon: Droplet, title: "Hydration", desc: "Aim for 2.5–3L of water. Herbal teas count too.", tone: "from-sky-500 to-blue-600" },
  { icon: Apple, title: "Fruits", desc: "Berries, bananas, oranges — high in antioxidants and vitamin C.", tone: "from-rose-500 to-red-600" },
  { icon: Carrot, title: "Vegetables", desc: "Leafy greens, carrots, broccoli — fiber and magnesium.", tone: "from-orange-500 to-amber-600" },
  { icon: Leaf, title: "Stress-Reducing Foods", desc: "Fatty fish, oats, blueberries, avocado, spinach.", tone: "from-emerald-500 to-green-600" },
  { icon: Cookie, title: "Dark Chocolate", desc: "1–2 squares of 70%+ can lower cortisol. Small amounts only.", tone: "from-amber-700 to-stone-700" },
  { icon: Leaf, title: "Green Tea", desc: "L-theanine promotes calm alertness. 2–3 cups daily.", tone: "from-green-500 to-lime-600" },
  { icon: Nut, title: "Nuts", desc: "Almonds, walnuts, pistachios — magnesium and omega-3s.", tone: "from-yellow-700 to-orange-800" },
];

function DietPage() {
  return (
    <SubPage title="Healthy Diet Tips" desc="Eat well, feel calm">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tips.map((t) => (
          <div key={t.title} className="glass-card rounded-3xl p-6 hover-lift">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.tone} shadow-soft`}>
              <t.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-bold text-lg">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>
    </SubPage>
  );
}
export default DietPage;