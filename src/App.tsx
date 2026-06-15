import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';
import AICopilot from './pages/AICopilot';
import AgriBot from './pages/AgriBot';
import Alerts from './pages/Alerts';
import SystemHealth from './pages/SystemHealth';
import FutureTech from './pages/FutureTech';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="ai-copilot" element={<AICopilot />} />
          <Route path="agribot" element={<AgriBot />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="health" element={<SystemHealth />} />
          <Route path="future-tech" element={<FutureTech />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
