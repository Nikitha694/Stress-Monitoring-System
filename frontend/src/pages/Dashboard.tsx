import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Moon, Briefcase, Activity, Heart } from "lucide-react";
import { stressDistribution, weeklyTrend, sleepVsStress, workVsStress, screenVsStress, activityVsStress, stressCounts, stressCategories } from "../lib/mock-data";


function ChartCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-3xl p-6 ${className}`}>
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: any) {
  return (
    <div className="glass-card hover-lift rounded-3xl p-5 flex items-center gap-4">
      <div className={`grid h-11 w-11 place-items-center rounded-2xl ${tone}`}><Icon className="h-5 w-5 text-white" /></div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

const CHART_COLORS = ["oklch(0.58 0.17 240)", "oklch(0.68 0.16 155)", "oklch(0.78 0.15 70)", "oklch(0.55 0.15 300)", "oklch(0.62 0.2 20)"];

function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">Visualization Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Interactive analytics of stress patterns across your data.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Moon} label="Average Sleep" value="7.2 hrs" tone="bg-primary" />
        <Stat icon={Briefcase} label="Average Work" value="8.6 hrs" tone="bg-chart-5" />
        <Stat icon={Activity} label="Average Stress" value="42%" tone="bg-warning" />
        <Stat icon={Heart} label="Healthy Users" value="68%" tone="bg-success" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Stress Distribution">
          <ResponsiveContainer><PieChart>
            <Pie data={stressDistribution} dataKey="value" outerRadius={90} label>
              {stressDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip /><Legend />
          </PieChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Stress Level Count">
          <ResponsiveContainer><BarChart data={stressCounts}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="level" /><YAxis /><Tooltip />
            <Bar dataKey="count" fill="oklch(0.58 0.17 240)" radius={[8, 8, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Weekly Stress Trend" className="lg:col-span-2">
          <ResponsiveContainer><LineChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="day" /><YAxis /><Tooltip /><Legend />
            <Line type="monotone" dataKey="stress" stroke="oklch(0.62 0.2 20)" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="mood" stroke="oklch(0.68 0.16 155)" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sleep Duration vs Stress">
          <ResponsiveContainer><BarChart data={sleepVsStress}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="hours" /><YAxis /><Tooltip />
            <Bar dataKey="stress" fill="oklch(0.68 0.16 155)" radius={[8, 8, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Work Hours vs Stress">
          <ResponsiveContainer><BarChart data={workVsStress}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="hours" /><YAxis /><Tooltip />
            <Bar dataKey="stress" fill="oklch(0.55 0.15 300)" radius={[8, 8, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Screen Time vs Stress">
          <ResponsiveContainer><ScatterChart>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="screen" name="hrs" /><YAxis dataKey="stress" name="stress" /><Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={screenVsStress} fill="oklch(0.78 0.15 70)" />
          </ScatterChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Physical Activity vs Stress">
          <ResponsiveContainer><BarChart data={activityVsStress}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="level" /><YAxis /><Tooltip />
            <Bar dataKey="stress" fill="oklch(0.62 0.2 20)" radius={[8, 8, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Stress Categories" className="lg:col-span-2">
          <ResponsiveContainer><PieChart>
            <Pie data={stressCategories} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={4} label>
              {stressCategories.map((e, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
            </Pie><Tooltip /><Legend />
          </PieChart></ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
export default Dashboard;