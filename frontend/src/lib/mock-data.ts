export const stats = {
  totalPredictions: 1284,
  avgStress: 42,
  healthyDays: 87,
  meditationSessions: 156,
};

export const stressDistribution = [
  { name: "Low", value: 45, color: "oklch(0.68 0.16 155)" },
  { name: "Medium", value: 35, color: "oklch(0.78 0.15 70)" },
  { name: "High", value: 20, color: "oklch(0.62 0.2 20)" },
];

export const weeklyTrend = [
  { day: "Mon", stress: 35, mood: 72 },
  { day: "Tue", stress: 48, mood: 65 },
  { day: "Wed", stress: 62, mood: 55 },
  { day: "Thu", stress: 40, mood: 70 },
  { day: "Fri", stress: 55, mood: 60 },
  { day: "Sat", stress: 28, mood: 85 },
  { day: "Sun", stress: 22, mood: 90 },
];

export const sleepVsStress = [
  { hours: "<5h", stress: 82 },
  { hours: "5-6h", stress: 68 },
  { hours: "6-7h", stress: 52 },
  { hours: "7-8h", stress: 32 },
  { hours: ">8h", stress: 28 },
];

export const workVsStress = [
  { hours: "<6h", stress: 30 },
  { hours: "6-8h", stress: 42 },
  { hours: "8-10h", stress: 58 },
  { hours: "10-12h", stress: 74 },
  { hours: ">12h", stress: 88 },
];

export const screenVsStress = [
  { screen: 2, stress: 25 },
  { screen: 3, stress: 32 },
  { screen: 4, stress: 40 },
  { screen: 5, stress: 48 },
  { screen: 6, stress: 58 },
  { screen: 7, stress: 65 },
  { screen: 8, stress: 72 },
  { screen: 10, stress: 82 },
  { screen: 12, stress: 90 },
];

export const activityVsStress = [
  { level: "None", stress: 78 },
  { level: "Light", stress: 55 },
  { level: "Moderate", stress: 38 },
  { level: "High", stress: 28 },
];

export const stressCounts = [
  { level: "Low", count: 45 },
  { level: "Medium", count: 35 },
  { level: "High", count: 20 },
];

export const stressCategories = [
  { name: "Work", value: 38, color: "oklch(0.58 0.17 240)" },
  { name: "Sleep", value: 24, color: "oklch(0.68 0.16 155)" },
  { name: "Screen", value: 18, color: "oklch(0.78 0.15 70)" },
  { name: "Lifestyle", value: 20, color: "oklch(0.55 0.15 300)" },
];
