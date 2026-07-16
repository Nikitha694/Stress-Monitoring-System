import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Result from "./pages/Result";
import Report from "./pages/Report";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";
import Games from "./pages/Games";

import HubIndex from "./pages/HubIndex";
import HubBreathing from "./pages/HubBreathing";
import HubExercise from "./pages/HubExercise";
import HubMeditation from "./pages/HubMeditation";
import HubMusic from "./pages/HubMusic";
import HubNature from "./pages/HubNature";
import HubPomodoro from "./pages/HubPomodoro";
import HubQuotes from "./pages/HubQuotes";
import HubSleep from "./pages/HubSleep";
import HubWater from "./pages/HubWater";
import HubYoga from "./pages/HubYoga";
import HubDiet from "./pages/HubDiet";
import HubChallenges from "./pages/HubChallenges";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/result" element={<Result />} />
          <Route path="/report" element={<Report />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />

          <Route path="/hub" element={<HubIndex />} />
          <Route path="/hub/breathing" element={<HubBreathing />} />
          <Route path="/hub/exercise" element={<HubExercise />} />
          <Route path="/hub/meditation" element={<HubMeditation />} />
          <Route path="/hub/music" element={<HubMusic />} />
          <Route path="/hub/nature" element={<HubNature />} />
          <Route path="/hub/pomodoro" element={<HubPomodoro />} />
          <Route path="/hub/quotes" element={<HubQuotes />} />
          <Route path="/hub/sleep" element={<HubSleep />} />
          <Route path="/hub/water" element={<HubWater />} />
          <Route path="/hub/yoga" element={<HubYoga />} />
          <Route path="/hub/diet" element={<HubDiet />} />
          <Route path="/hub/challenges" element={<HubChallenges />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;