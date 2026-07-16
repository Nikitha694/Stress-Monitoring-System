import { Link, useLocation } from "react-router-dom";
import {
  Download,
  RotateCw,
  Activity,
  Heart,
  Moon,
  TrendingUp,
} from "lucide-react";

type Level = "Low" | "Medium" | "High";

const styles: Record<
  Level,
  { color: string; text: string; label: string }
> = {
  Low: {
    color: "bg-success",
    text: "text-success",
    label: "Low Stress",
  },
  Medium: {
    color: "bg-warning",
    text: "text-warning",
    label: "Medium Stress",
  },
  High: {
    color: "bg-destructive",
    text: "text-destructive",
    label: "High Stress",
  },
};

const recommendations: Record<Level, string[]> = {
  Low: [
    "Maintain your healthy lifestyle.",
    "Continue regular exercise.",
    "Keep a consistent sleep schedule.",
    "Practice meditation regularly.",
  ],

  Medium: [
    "Reduce screen time.",
    "Take frequent breaks while working.",
    "Practice deep breathing.",
    "Go for a daily walk.",
  ],

  High: [
    "Sleep at least 8 hours.",
    "Reduce workload where possible.",
    "Practice meditation daily.",
    "Consult a mental health professional if needed.",
  ],
};

function RiskMeter({ score }: { score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>

      <div className="relative h-4 rounded-full bg-muted overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right,#22c55e,#facc15,#ef4444)",
          }}
        />

        <div
          className="absolute top-0 h-full w-1 bg-black"
          style={{ left: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function Result() {
  const location = useLocation();

  const prediction =
    location.state?.prediction ?? "Medium Stress";

  let level: Level = "Medium";

  if (prediction === "Low Stress") level = "Low";
  else if (prediction === "Medium Stress") level = "Medium";
  else level = "High";

  const score =
    level === "Low"
      ? 30
      : level === "Medium"
      ? 60
      : 90;

  const style = styles[level];

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="text-center">
        <h1 className="text-4xl font-bold">
          Stress Prediction Result
        </h1>

        <p className="mt-2 text-muted-foreground">
          Based on your lifestyle information
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="glass-card rounded-3xl p-8 text-center">

          <div
            className={`h-40 w-40 rounded-full ${style.color} text-white flex items-center justify-center mx-auto`}
          >
            <div>
              <h1 className="text-5xl font-bold">{score}</h1>
              <p>/100</p>
            </div>
          </div>

          <div
            className={`mt-6 inline-block rounded-full ${style.color} text-white px-6 py-2 font-semibold`}
          >
            {prediction}
          </div>

        </div>

        <div className="glass-card rounded-3xl p-8 lg:col-span-2">

          <h2 className="text-xl font-bold mb-4">
            Risk Meter
          </h2>

          <RiskMeter score={score} />

          <div className="grid md:grid-cols-2 gap-4 mt-8">

            <div className="flex gap-3 items-center">
              <Moon />
              <div>
                <p className="text-sm text-muted-foreground">
                  Sleep
                </p>
                <p>Healthy Sleep Recommended</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Activity />
              <div>
                <p className="text-sm text-muted-foreground">
                  Activity
                </p>
                <p>Regular Exercise</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Heart />
              <div>
                <p className="text-sm text-muted-foreground">
                  Health
                </p>
                <p>Stay Hydrated</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <TrendingUp />
              <div>
                <p className="text-sm text-muted-foreground">
                  Progress
                </p>
                <p>Track Weekly</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="glass-card rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Personalized Recommendations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {recommendations[level].map((item) => (
            <div
              key={item}
              className="rounded-xl border bg-white/70 p-4"
            >
              {item}
            </div>
          ))}

        </div>

      </div>

      <div className="flex gap-4 justify-center">

        <button
          onClick={() => window.print()}
          className="rounded-full bg-primary text-white px-6 py-3 flex items-center gap-2"
        >
          <Download size={18} />
          Download Report
        </button>

        <Link
          to="/prediction"
          className="rounded-full border px-6 py-3 flex items-center gap-2"
        >
          <RotateCw size={18} />
          Predict Again
        </Link>

      </div>
    </div>
  );
}