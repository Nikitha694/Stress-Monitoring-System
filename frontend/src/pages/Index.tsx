import { Link } from "react-router-dom";
import { Activity, Heart, Moon, Sparkles, ArrowRight, Brain, LineChart, Shield } from "lucide-react";
import { stats } from "../lib/mock-data";


function StatCard({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string | number; tone: string }) {
  return (
    <div className="glass-card hover-lift rounded-3xl p-6">
      <div className={`grid h-11 w-11 place-items-center rounded-2xl ${tone}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="mt-4 text-3xl font-bold gradient-text">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Home() {
  return (
    <div className="space-y-16"><section className="relative overflow-hidden rounded-[2.5rem] gradient-hero shadow-elegant px-6 py-16 lg:px-16 lg:py-24 text-white animate-fade-up w-full">
        <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl animate-float" />
        <div className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-4 w-4" /> AI-Powered Wellness Platform
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Stress Monitoring &<br />Assistance System
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">
            Predict your stress levels using machine learning and receive personalized wellness recommendations tailored to your lifestyle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/prediction" className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-semibold px-6 py-3 shadow-elegant hover:scale-105 transition-transform">
              Start Stress Prediction <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/30 px-6 py-3 font-semibold hover:bg-white/25 transition-colors">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard icon={Activity} label="Total Predictions" value={stats.totalPredictions.toLocaleString()} tone="bg-primary" />
          <StatCard icon={LineChart} label="Average Stress Level" value={`${stats.avgStress}%`} tone="bg-warning" />
          <StatCard icon={Heart} label="Healthy Days" value={stats.healthyDays} tone="bg-success" />
          <StatCard icon={Moon} label="Meditation Sessions" value={stats.meditationSessions} tone="bg-chart-5" />
        </div>
      </section>

      <section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need for mental wellness</h2>
          <p className="mt-3 text-muted-foreground">A complete toolkit for tracking, understanding, and improving your stress.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "ML Prediction", desc: "Random Forest model analyzes 20+ lifestyle factors to predict stress accurately.", tone: "bg-primary" },
            { icon: LineChart, title: "Rich Analytics", desc: "Visual dashboards, weekly trends, and detailed reports at your fingertips.", tone: "bg-success" },
            { icon: Shield, title: "Personalized Care", desc: "Recommendations, games, meditations, and reminders that adapt to you.", tone: "bg-chart-5" },
          ].map((f) => (
            <div key={f.title} className="glass-card hover-lift rounded-3xl p-7">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${f.tone}`}><f.icon className="h-6 w-6 text-white" /></div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home;