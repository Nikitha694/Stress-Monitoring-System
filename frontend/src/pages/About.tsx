import { Brain, LineChart, Sparkles, Gamepad2, Code2 } from "lucide-react";



function About() {
  const features = [
    { icon: Brain, title: "Machine Learning Prediction", desc: "Random Forest classifier trained on 20+ lifestyle indicators.", tone: "bg-primary" },
    { icon: LineChart, title: "Visualization Dashboard", desc: "Interactive charts to understand your stress patterns.", tone: "bg-success" },
    { icon: Sparkles, title: "Personalized Recommendations", desc: "Tailored advice based on your specific stress profile.", tone: "bg-warning" },
    { icon: Gamepad2, title: "Stress Relief Activities", desc: "Mini-games, breathing, meditation and reminders.", tone: "bg-chart-5" },
  ];
  const tech = ["Python", "Flask", "Random Forest", "Pandas", "Scikit-learn", "React", "TypeScript", "Tailwind CSS", "Recharts"];

  return (
    <div className="space-y-10 animate-fade-up">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">About the Project</h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          The Stress Monitoring and Assistance System is an AI-powered platform that predicts stress levels
          using machine learning and provides personalized wellness recommendations. It combines predictive
          analytics with interactive tools to help users understand and manage their mental well-being.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass-card hover-lift rounded-3xl p-6">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${f.tone}`}><f.icon className="h-6 w-6 text-white" /></div>
              <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Developer</h2>
        <div className="glass-card rounded-3xl p-6 flex items-center gap-5">
          <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-hero text-white text-2xl font-bold">SC</div>
          <div>
            <div className="font-bold text-lg">StressCare AI Team</div>
            <div className="text-sm text-muted-foreground">ML Engineers · UI Designers · Wellness Advocates</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Code2 className="h-6 w-6 text-primary" /> Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="rounded-full bg-white/70 border border-border px-4 py-1.5 text-sm font-medium hover-lift">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
export default About;