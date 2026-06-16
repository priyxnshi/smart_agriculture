import React, { useState, useEffect } from 'react';
import { 
  Droplets, Thermometer, Wind, Database, Activity, Sun, Cloud, 
  CheckCircle2, BrainCircuit, AlertTriangle, Info, Sprout, Wifi, Zap,
  Target, Cpu, Network, MonitorSmartphone, ExternalLink,
  Play, Square, RefreshCw, BarChart2, ShieldAlert
} from 'lucide-react';
import { 
  Area, AreaChart as RechartsAreaChart, ResponsiveContainer, 
  YAxis, XAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Shared Data ---
const sparklineData1 = [{v: 60}, {v: 62}, {v: 61}, {v: 65}, {v: 68}, {v: 67}, {v: 68}];
const sparklineData2 = [{v: 25}, {v: 24}, {v: 23}, {v: 22}, {v: 23}, {v: 24}, {v: 24}];
const sparklineData3 = [{v: 50}, {v: 51}, {v: 53}, {v: 52}, {v: 54}, {v: 55}, {v: 55}];

// Mock ThingSpeak Data
const generateTSData = (base: number, variance: number) => {
  return Array.from({length: 20}).map((_, i) => ({
    time: `${(i * 5).toString().padStart(2, '0')}m`,
    value: parseFloat(Math.max(0, base + (Math.random() * variance * 2 - variance)).toFixed(1))
  }));
};
const tsHumidity = generateTSData(50, 3);
const tsTemp = generateTSData(24.8, 0.2);
const tsLight = generateTSData(35.5, 1);
const tsNitrogen = generateTSData(120, 20); 
const tsPhosphorus = generateTSData(100, 15);

// --- Main Page Component ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 text-foreground min-h-screen relative pb-24">
      <DashboardHeader />
      
      {/* Sliding Glassmorphic Tab Switcher */}
      <div className="relative flex items-center p-1.5 rounded-2xl glass-tabs-container max-w-max overflow-x-auto scrollbar-none z-20">
        <div className="flex gap-1">
          <TabButton id="overview" label="Overview" active={activeTab} set={setActiveTab} />
          <TabButton id="architecture" label="System Architecture" active={activeTab} set={setActiveTab} />
          <TabButton id="sdgs" label="SDG Alignment" active={activeTab} set={setActiveTab} />
          <TabButton id="thingspeak" label="ThingSpeak Live" active={activeTab} set={setActiveTab} />
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pt-2"
      >
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'architecture' && <ArchitectureTab />}
        {activeTab === 'sdgs' && <SDGsTab />}
        {activeTab === 'thingspeak' && <ThingSpeakTab />}
      </motion.div>
    </div>
  );
}

// --- Header Component ---
function DashboardHeader() {
  const [time, setTime] = useState(new Date());
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hours = time.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border/40 relative z-10">
      <div>
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl lg:text-4xl font-extrabold tracking-tight flex items-center gap-2.5"
        >
          {getGreeting()}, Farmer! 
          <motion.span
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, repeatDelay: 5 }}
          >
            <Sprout className="text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </motion.span>
        </motion.h1>
        <p className="text-muted-foreground mt-1.5 text-xs lg:text-sm font-semibold tracking-wide">
          AgriSense core engine status is normal. Telemetry is active.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {/* Connectivity Status */}
        <div className="bg-success/5 border border-success/20 shadow-sm px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-success">
          <Wifi size={14} className="animate-signal-pulse" />
          <span>ESP32 Gateway Online</span>
        </div>
        
        {/* Updated Last Sync */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/50 px-3.5 py-2 rounded-xl text-xs flex flex-col justify-center items-end h-10 min-w-32 shadow-sm">
          <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Live Sync</span>
          <div className="font-extrabold text-foreground tracking-tight">{time.toLocaleTimeString()}</div>
        </div>

        {/* Automation Switch Button */}
        <button 
          onClick={() => setIsAuto(!isAuto)}
          className="bg-card/40 backdrop-blur-sm border border-border/50 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-3 shadow-sm hover:border-success/30 hover:bg-card/60 transition-all select-none"
        >
          <span className="text-muted-foreground font-extrabold">Automation AI</span>
          <div className={cn(
            "w-10 h-6 rounded-full flex items-center p-0.5 transition-colors duration-300 cursor-pointer shadow-inner",
            isAuto ? "bg-success" : "bg-slate-700"
          )}>
            <motion.div 
              layout 
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[7px] font-extrabold text-slate-800 shadow-md"
            >
              {isAuto ? "ON" : "OFF"}
            </motion.div>
          </div>
        </button>
      </div>
    </header>
  );
}

function TabButton({ id, label, active, set }: { id: string; label: string; active: string; set: (id: string) => void }) {
  const isActive = active === id;
  return (
    <button 
      onClick={() => set(id)}
      className={cn(
        "relative px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap z-10",
        isActive ? "text-success" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeDashboardTab"
          className="absolute inset-0 bg-white dark:bg-card border border-border/60 dark:border-white/5 rounded-xl shadow-md"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-20">{label}</span>
    </button>
  );
}

// --- Overview Tab ---
function OverviewTab() {
  const [activePump, setActivePump] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  return (
    <div className="space-y-8 relative">
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-5">
        {/* Circular Farm Health Score */}
        <div className="sm:col-span-2 bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-success/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Farm Health Indicator</h3>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-slate-200/50 dark:text-slate-800/80" strokeWidth="6" />
              <motion.circle 
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 * (1 - 0.92) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r="40" fill="none" stroke="url(#healthGrad)" strokeWidth="8" strokeDasharray="251" strokeLinecap="round" 
                className="drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]"
              />
              <defs>
                <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold tracking-tighter text-foreground bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text">92</span>
              <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Excellent</span>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-success font-extrabold text-xs px-3 py-1 bg-success/10 rounded-full border border-success/20">
            <Sprout size={12} className="animate-pulse" /> Optimal Farm State
          </div>
        </div>

        {/* Metric Cards with Glowing Gradients */}
        <MetricCard 
          title="Soil Moisture" 
          value="68%" 
          icon={<Droplets size={16} />} 
          data={sparklineData1} 
          color="#3B82F6" 
          status="Optimal" 
          statusColor="bg-blue-500" 
          trend="↑ 2%" 
          trendColor="text-blue-500" 
          glowClass="glow-blue-hover"
        />
        
        <MetricCard 
          title="Temperature" 
          value="24.8°C" 
          icon={<Thermometer size={16} />} 
          data={sparklineData2} 
          color="#F59E0B" 
          status="Normal" 
          statusColor="bg-warning" 
          trend="↓ 0.2°C" 
          trendColor="text-warning" 
          glowClass="glow-red-hover"
        />
        
        <MetricCard 
          title="Air Humidity" 
          value="55%" 
          icon={<Wind size={16} />} 
          data={sparklineData3} 
          color="#22C55E" 
          status="Optimal" 
          statusColor="bg-success" 
          trend="↑ 5%" 
          trendColor="text-success" 
          glowClass="glow-primary-hover"
        />
        
        {/* Water Tank Component with Futuristic Liquid Tube */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-[30px] pointer-events-none" />
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Water Tank</span>
            </div>
            <span className="text-[10px] font-extrabold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">80% Full</span>
          </div>
          
          <div className="flex items-center gap-4 my-3 z-10">
            <div className="text-2xl font-extrabold tracking-tight">3,200 L</div>
            <div className="text-[10px] text-muted-foreground font-semibold">Discharging:<br/><span className="text-foreground font-extrabold">2.4L / min</span></div>
          </div>

          {/* Liquid Visualizer Cylinder */}
          <div className="relative w-full h-12 bg-slate-200/50 dark:bg-slate-800/80 rounded-xl overflow-hidden border border-border/30">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500 ease-in-out"
              style={{ height: '80%' }}
            >
              {/* Wave overlay */}
              <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden -translate-y-[90%]">
                <svg viewBox="0 0 120 28" className="w-[200%] h-full fill-blue-400 opacity-60 animate-liquid-wave translate-x-0" preserveAspectRatio="none">
                  <path d="M0 15 Q 30 0, 60 15 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pump Status Component with frequency telemetry wave */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-success/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-success/5 rounded-full blur-[30px] pointer-events-none" />
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Activity size={16} className={cn("transition-colors", activePump ? "text-success" : "text-slate-400")} />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Irrigation Pump</span>
            </div>
            
            {/* Toggle Click */}
            <button 
              onClick={() => setActivePump(!activePump)}
              className={cn(
                "w-7 h-4 rounded-full flex items-center p-0.5 transition-colors cursor-pointer",
                activePump ? "bg-success" : "bg-slate-700"
              )}
            >
              <div className={cn("w-3 h-3 bg-white rounded-full shadow transition-transform", activePump ? "translate-x-3" : "translate-x-0")} />
            </button>
          </div>

          <div className="my-2 z-10">
            <span className="text-2xl font-extrabold tracking-tight">{activePump ? "Running" : "Standby"}</span>
            <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">
              Mode: <span className="text-foreground font-extrabold">{activePump ? "AUTO IRRIGATION" : "MANUAL STOP"}</span>
            </div>
          </div>

          {/* Micro telemetry frequency spark wave */}
          <div className="h-8 w-full z-10 overflow-hidden relative opacity-70">
            {activePump ? (
              <svg className="w-full h-full text-success" viewBox="0 0 100 20">
                <path 
                  d="M0 10 Q 10 2, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              </svg>
            ) : (
              <div className="w-full h-[1px] bg-slate-500/30 absolute top-1/2 transform -translate-y-1/2" />
            )}
          </div>
        </div>
      </div>

      {/* Main Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Digital twin & Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Digital Twin Map Container */}
          <div className="bg-slate-950 border border-slate-900 shadow-xl rounded-3xl overflow-hidden min-h-[460px] flex flex-col relative group">
            
            {/* Scanning line indicator */}
            <div className="absolute inset-x-0 h-0.5 bg-success/20 animate-hud-scan pointer-events-none z-10 shadow-[0_0_8px_#22c55e]" />

            {/* Background grid dots overlay */}
            <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-30 z-0" />

            {/* Map image background wrapper */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 z-0 select-none pointer-events-none filter saturate-[0.8] contrast-[1.1]" style={{ backgroundImage: 'url(/farm_twin_bg.png)' }} />

            {/* Overlay Gradient Header */}
            <div className="absolute top-0 inset-x-0 p-5 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2 tracking-wide uppercase">
                  <Sprout size={16} className="text-success drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" /> 
                  <span>Digital Farm Twin HUD</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Click active telemetry hotspots to inspect sensor modules.</p>
              </div>
              
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-auto shadow-lg text-[10px] font-bold">
                <div className="w-2 h-2 rounded-full bg-success animate-signal-pulse" />
                <span className="text-white font-extrabold tracking-wide uppercase">HUD ONLINE</span>
              </div>
            </div>

            {/* Interactive Hotspot Nodes */}
            
            {/* Hotspot 1: ESP32 Hub */}
            <Hotspot 
              id="controller" 
              top="38%" 
              left="70%" 
              label="ESP32 Gateway" 
              activeId={selectedHotspot} 
              setActive={setSelectedHotspot} 
            />

            {/* Hotspot 2: Water Tank */}
            <Hotspot 
              id="tank" 
              top="40%" 
              left="45%" 
              label="Water Reservoir" 
              activeId={selectedHotspot} 
              setActive={setSelectedHotspot} 
            />

            {/* Hotspot 3: Pump */}
            <Hotspot 
              id="pump" 
              top="60%" 
              left="28%" 
              label="Irrigation Pump" 
              activeId={selectedHotspot} 
              setActive={setSelectedHotspot} 
            />

            {/* Hotspot 4: Soil Node */}
            <Hotspot 
              id="soil" 
              top="70%" 
              left="55%" 
              label="Soil Probe Alpha" 
              activeId={selectedHotspot} 
              setActive={setSelectedHotspot} 
            />

            {/* Selected Hotspot Detailed Telemetry Flyout Overlay */}
            <AnimatePresence>
              {selectedHotspot && (
                <HotspotModal id={selectedHotspot} close={() => setSelectedHotspot(null)} />
              )}
            </AnimatePresence>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-5 left-5 z-10 flex flex-wrap gap-4 text-[9px] font-bold bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-success"><div className="w-2 h-2 rounded-full bg-success animate-pulse" /> Active</div>
              <div className="flex items-center gap-1.5 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-500" /> Transmitting</div>
              <div className="flex items-center gap-1.5 text-warning"><div className="w-2 h-2 rounded-full bg-warning" /> Check Info</div>
            </div>
          </div>

          {/* Quick Actions & Weather row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Quick Actions */}
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 flex flex-col justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Zap size={14} className="text-success" /> Quick Commands
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                <QuickAction icon={<Play size={14} />} title="Start Irrigation" sub="Run manual cycle" color="text-blue-500 hover:bg-blue-500/5 hover:border-blue-500/20" />
                <QuickAction icon={<Square size={14} />} title="Stop System" sub="Kill pump loop" color="text-red-500 hover:bg-red-500/5 hover:border-red-500/20" />
                <QuickAction icon={<BarChart2 size={14} />} title="Telemetry Logs" sub="Download CSV" color="text-success hover:bg-success/5 hover:border-success/20" />
                <QuickAction icon={<RefreshCw size={14} />} title="Force Sync" sub="Ping I2C core" color="text-warning hover:bg-warning/5 hover:border-warning/20" />
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 flex flex-col justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Cloud size={14} className="text-blue-400" /> Microclimate Forecast
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                <WeatherDay title="Today" temp="24°C / 18°C" desc="Cloudy" icon={<Cloud className="text-slate-400" />} />
                <WeatherDay title="Tomorrow" temp="26°C / 19°C" desc="Showers" icon={<Wind className="text-blue-400" />} active />
                <WeatherDay title="Thursday" temp="27°C / 20°C" desc="Sunny" icon={<Sun className="text-amber-400" />} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Panel & Alerts list */}
        <div className="space-y-8">
          
          {/* AI Intelligence recommendations */}
          <div className="bg-slate-900 border border-slate-800/80 shadow-lg rounded-3xl p-6 text-white relative overflow-hidden flex flex-col min-h-[260px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-[40px] pointer-events-none" />
            <div className="flex justify-between items-center mb-5 relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-success flex items-center gap-2">
                <BrainCircuit size={16} className="animate-pulse" /> AI Agent Diagnostics
              </h3>
              <span className="text-[10px] font-bold text-success/80 bg-success/15 border border-success/30 px-2 py-0.5 rounded-full cursor-pointer hover:bg-success/25 transition-colors">Analyze Hub</span>
            </div>
            
            <div className="bg-success/5 border border-success/20 rounded-2xl p-4 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 w-full pr-1">
                <h4 className="text-xs font-bold text-white mb-1">Pre-emptive Hydration Warning</h4>
                <p className="text-slate-300 text-[10.5px] leading-relaxed mb-3">
                  Ambient moisture drops detected on sensor probes. AI confidence predicts high temperature spike. Activating short irrigation within 15 minutes is advised.
                </p>
              </div>

              {/* Crop Sprout graphic inside box */}
              <div className="absolute right-3 top-3 w-[60px] h-[60px] bg-slate-950/40 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden select-none pointer-events-none">
                 <img src="/ai_sprout_icon.png" alt="AI Sprout" className="w-10 h-10 object-contain opacity-70 filter saturate-[1.2]" />
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto border-t border-white/5 pt-3">
                <div className="flex gap-4">
                  <div>
                    <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Confidence</div>
                    <div className="font-extrabold text-white text-xs">89%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Yield Impact</div>
                    <div className="font-extrabold text-success text-xs">+12% Projected</div>
                  </div>
                </div>
                
                <button className="bg-success hover:bg-success/90 text-white font-extrabold py-1.5 px-3 rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-md shadow-success/10 hover:shadow-success/20">
                  Accept Action
                </button>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 text-foreground">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ShieldAlert size={14} className="text-red-500" /> Recent Security & Events
              </h3>
              <span className="text-[10px] font-bold text-success cursor-pointer hover:underline">Clear Logs</span>
            </div>
            
            <div className="space-y-3">
              <AlertItem 
                icon={<AlertTriangle size={14} className="text-warning" />} 
                bg="bg-warning/15 border border-warning/20 text-warning" 
                title="Low Soil Moisture" 
                desc="Probes in Zone 1 fell below safety range (58%)" 
                time="5 min ago" 
                badge="Warning" 
                diagnosticText="Sensor zone Probe Alpha reports moisture levels dropping below 60% threshold. Recommended action: Check manual pump values or active irrigation schedule overlay."
              />
              
              <AlertItem 
                icon={<Info size={14} className="text-blue-500" />} 
                bg="bg-blue-500/15 border border-blue-500/20 text-blue-500" 
                title="Telemetry Re-route" 
                desc="ESP32 routing updated via ThingSpeak gateway" 
                time="15 min ago" 
                badge="System" 
                diagnosticText="Network status re-route completed successfully. Core systems are mapping MQTT endpoints through the cloud telemetry server."
              />
              
              <AlertItem 
                icon={<CheckCircle2 size={14} className="text-success" />} 
                bg="bg-success/15 border border-success/20 text-success" 
                title="Safety Loop Check" 
                desc="All connected I2C sensor checks passed" 
                time="32 min ago" 
                badge="Success" 
                diagnosticText="Automatic physical self-test has cleared hardware registers. Relays, NPK soil interface circuits, and ADC buffers are running optimally."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Digital Twin Hotspot Component ---
function Hotspot({ id, top, left, label, activeId, setActive }: { id: string; top: string; left: string; label: string; activeId: string | null; setActive: (id: string | null) => void }) {
  const isOpen = activeId === id;
  return (
    <div 
      className="absolute z-10 cursor-pointer"
      style={{ top, left }}
      onClick={() => setActive(isOpen ? null : id)}
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing telemetry glow ring */}
        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-success shadow-md shadow-success/40 border border-white" />
        
        {/* Hover label tooltips */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur border border-white/10 px-2 py-0.5 rounded text-[8px] font-extrabold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </div>
      </div>
    </div>
  );
}

// --- Digital Twin Hotspot Data Component ---
function HotspotModal({ id, close }: { id: string; close: () => void }) {
  const getData = () => {
    switch (id) {
      case 'controller':
        return {
          title: "ESP32 Gateway Core",
          status: "ONLINE",
          color: "text-success",
          details: [
            { label: "IP Address", val: "192.168.1.104" },
            { label: "RSSI Strength", val: "-64 dBm (Strong)" },
            { label: "ADC Channels", val: "4 Channels Active" },
            { label: "Bus Mode", val: "I2C Core Module" }
          ]
        };
      case 'tank':
        return {
          title: "Water Reservoir",
          status: "80% CAPACITY",
          color: "text-blue-400",
          details: [
            { label: "pH Level", val: "6.8 pH (Neutral)" },
            { label: "Water Temp", val: "19.5 °C" },
            { label: "Main Valve", val: "Auto-Gate Closed" },
            { label: "Volume Limit", val: "4,000 Liters" }
          ]
        };
      case 'pump':
        return {
          title: "Irrigation Submersible",
          status: "RUNNING",
          color: "text-success",
          details: [
            { label: "Discharge Volume", val: "12.5 Liters / min" },
            { label: "Current Draw", val: "1.25 Amperes" },
            { label: "Frequency Mod", val: "60 Hz Active" },
            { label: "Coil Temp", val: "38.2 °C (Stable)" }
          ]
        };
      case 'soil':
        return {
          title: "Soil Probe Alpha",
          status: "TRANSMITTING",
          color: "text-success",
          details: [
            { label: "Moisture Index", val: "68% (Optimal)" },
            { label: "Nitrogen (N)", val: "120 mg/kg" },
            { label: "Phosphorus (P)", val: "100 mg/kg" },
            { label: "Potassium (K)", val: "140 mg/kg" }
          ]
        };
      default:
        return { title: "Telemetry Module", status: "STANDBY", color: "text-slate-400", details: [] };
    }
  };

  const info = getData();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute bottom-5 right-5 z-20 w-[240px] bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white shadow-2xl"
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Inspecting Hotspot</h4>
        <button onClick={close} className="text-slate-400 hover:text-white text-xs font-bold">✕</button>
      </div>

      <div className="mb-3">
        <div className="font-extrabold text-xs tracking-tight">{info.title}</div>
        <div className={cn("text-[9px] font-extrabold mt-0.5 tracking-wider flex items-center gap-1", info.color)}>
          <div className="w-1.5 h-1.5 bg-current rounded-full" /> {info.status}
        </div>
      </div>

      <div className="space-y-1.5 border-t border-white/5 pt-2">
        {info.details.map((d, i) => (
          <div key={i} className="flex justify-between text-[9px]">
            <span className="text-slate-400 font-semibold">{d.label}</span>
            <span className="font-extrabold text-white">{d.val}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- System Architecture Tab ---
function ArchitectureTab() {
  return (
    <div className="space-y-8">
      {/* End to End flow visualization card */}
      <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 lg:p-8">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="px-2.5 py-1 bg-success/10 border border-success/20 text-success rounded-full text-[10px] font-bold uppercase tracking-widest">Hardware Shell Mapping</span>
          <h3 className="text-lg lg:text-xl font-extrabold tracking-tight mt-2 flex justify-center items-center gap-2 text-foreground">
            <Network size={18} className="text-success" /> End-to-End IoT Telemetry Flow
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            Real-time physical sensors feeding MQTT streams to frontend dashboards.
          </p>
        </div>

        {/* Animated Connected Network diagram */}
        <div className="relative max-w-5xl mx-auto py-8">
          
          {/* Animated Connecting Wires Background (visible on desktop) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ top: '35px', height: '3px' }}>
            <svg className="w-full h-full text-success" preserveAspectRatio="none" viewBox="0 0 800 3">
              <line 
                x1="40" y1="1" x2="760" y2="1" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-success opacity-30" 
              />
              <line 
                x1="40" y1="1" x2="760" y2="1" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-success animate-svg-flow" 
              />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <ArchitectureNode icon={<Target className="text-blue-500" />} title="Sensors" desc="NPK, Moisture, Light, Temp" label="FIELD LAYER" />
            <ArchitectureNode icon={<Cpu className="text-amber-500" />} title="ESP32 Module" desc="I2C/ADC Core Board Node" label="EDGE PROCESS" />
            <ArchitectureNode icon={<Wifi className="text-success" />} title="WiFi Gate" desc="MQTT Data Gateway" label="COMM TRANSPORT" />
            <ArchitectureNode icon={<Cloud className="text-sky-500" />} title="ThingSpeak" desc="Cloud Storage & Feeds" label="CLOUD HOST" />
            <ArchitectureNode icon={<MonitorSmartphone className="text-primary-light" />} title="Dashboard" desc="Interactive HUD frontend" label="PRESENTATION" />
          </div>
        </div>
      </div>

      {/* Hardware Connection Circuit Diagram */}
      <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-extrabold tracking-tight">Hardware Connection Topology</h3>
            <p className="text-xs text-muted-foreground mt-1">Physical routing pins mapping for I2C and ADC interfaces on ESP32.</p>
          </div>
          <span className="text-[10px] font-bold text-slate-500 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-border">v1.2 Active</span>
        </div>
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-slate-950 p-3 flex items-center justify-center">
           <img src="/circuit_diagram.png" alt="Circuit Diagram" className="w-full h-auto object-cover rounded-xl opacity-90 border border-slate-900 shadow-lg" />
           
           {/* Futuristic HUD border effects */}
           <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ArchitectureNode({ icon, title, desc, label }: { icon: React.ReactElement; title: string; desc: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center p-5 bg-card/60 backdrop-blur-sm border border-border/40 hover:border-success/30 shadow-md rounded-2xl w-full md:w-[170px] h-[190px] justify-center transition-all duration-300 relative group hover:-translate-y-1">
      <span className="absolute top-3 text-[8px] font-extrabold tracking-widest text-muted-foreground uppercase">{label}</span>
      <div className="mb-3 p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform duration-300 border border-border/10">
        {React.cloneElement(icon, { size: 24, strokeWidth: 2 } as any)}
      </div>
      <h4 className="font-extrabold text-xs text-foreground tracking-tight">{title}</h4>
      <p className="text-[10px] text-muted-foreground font-semibold mt-1 px-1 leading-relaxed">{desc}</p>
    </div>
  );
}

// --- SDGs Tab Component ---
function SDGsTab() {
  const sdgs = [
    { num: "2", title: "Zero Hunger", desc: "Optimizing crop yield through soil intelligence", pct: 85, color: "from-amber-600 to-amber-500" },
    { num: "9", title: "Industry & Innovation", desc: "IoT-driven agricultural infrastructure", pct: 92, color: "from-success to-primary-light" },
    { num: "12", title: "Responsible Consumption", desc: "Efficient resource usage via data", pct: 78, color: "from-blue-600 to-blue-500" },
    { num: "13", title: "Climate Action", desc: "Reducing environmental impact of farming", pct: 80, color: "from-emerald-600 to-emerald-500" }
  ];

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-6 lg:p-10">
      <div className="text-center max-w-lg mx-auto mb-12">
        <span className="px-2.5 py-1 bg-success/10 border border-success/20 text-success rounded-full text-[10px] font-bold uppercase tracking-widest">Sustainability Dashboard</span>
        <h3 className="text-xl lg:text-2xl font-extrabold tracking-tight mt-2">Sustainable Development Goals</h3>
        <p className="text-xs text-muted-foreground mt-2">Mapping our IoT-driven crop results against the United Nations SDG targets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {sdgs.map((sdg) => (
          <div key={sdg.num} className="bg-card/50 backdrop-blur-sm border border-border/40 shadow-sm rounded-2xl p-6 flex items-start gap-5 hover:border-success/30 hover:shadow-md transition-all duration-300">
            {/* Circle ID */}
            <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex flex-shrink-0 items-center justify-center text-white text-xl font-black shadow-md", sdg.color)}>
              {sdg.num}
            </div>
            
            <div className="space-y-1.5 flex-1">
              <h4 className="font-extrabold text-sm text-foreground">{sdg.title}</h4>
              <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">{sdg.desc}</p>
              
              {/* Progress indicator */}
              <div className="space-y-1 pt-1.5">
                <div className="flex justify-between text-[9px] font-bold text-muted-foreground">
                  <span>Target Progress</span>
                  <span>{sdg.pct}% Match</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={cn("h-full bg-gradient-to-r", sdg.color)} style={{ width: `${sdg.pct}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ThingSpeak Live Tab Component ---
function ThingSpeakTab() {
  return (
    <div className="bg-slate-950 border border-slate-900 shadow-xl rounded-3xl p-6 lg:p-8 space-y-6">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-20 z-0 rounded-3xl" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6 relative z-10">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Activity className="text-blue-500 animate-pulse" /> ThingSpeak Live Telemetry
          </h3>
          <p className="text-xs text-slate-400 mt-1">Direct HTTPS data feed pipelines tracking active sensor registers.</p>
        </div>
        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-extrabold border border-blue-500/20 uppercase tracking-widest">
          CONNECTED VIA SSL
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <TSChartCard title="Field 3 — Humidity" data={tsHumidity} yLabel="Humidity (%)" color="#3B82F6" gradientId="chartBlue" />
        <TSChartCard title="Field 4 — Temperature" data={tsTemp} yLabel="Temperature (°C)" color="#F59E0B" gradientId="chartYellow" />
        <TSChartCard title="Field 5 — Light Intensity" data={tsLight} yLabel="Light Intensity (Lux)" color="#10B981" gradientId="chartGreen" />
        <TSChartCard title="Field 6 — Nitrogen" data={tsNitrogen} yLabel="Nitrogen (mg/kg)" color="#8B5CF6" gradientId="chartPurple" />
        <TSChartCard title="Field 7 — Phosphorus" data={tsPhosphorus} yLabel="Phosphorus (mg/kg)" color="#EC4899" gradientId="chartPink" />
        
        {/* NPK Composite Card Placeholder styled as dark console */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-md rounded-2xl overflow-hidden flex flex-col min-h-[300px]">
          <div className="bg-white/[0.03] border-b border-white/5 px-4 py-3 font-extrabold text-xs text-slate-300 flex items-center justify-between">
            <span>Field 8 — Potassium Index</span>
            <span className="text-[8px] font-bold text-slate-500">Telemetry Active</span>
          </div>
          
          <div className="flex-1 p-5 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-inner">
              <Sprout size={20} className="text-slate-500" />
            </div>
            <h4 className="text-slate-300 font-extrabold text-xs tracking-tight">K-Sensor Mapping</h4>
            <p className="text-[10px] text-slate-500 px-4 mt-1.5 leading-relaxed">Composite sensor register integration will map live potassium data to this chart node.</p>
            
            <span className="text-[9px] text-slate-400 font-bold px-3 py-1 bg-white/[0.03] rounded-full border border-white/5 mt-4">
              Awaiting Gateway Calibration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Live Telemetry Chart Component ---
function TSChartCard({ title, data, yLabel, color, gradientId }: { title: string; data: { time: string; value: number }[]; yLabel: string; color: string; gradientId: string }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-md rounded-2xl overflow-hidden flex flex-col">
      <div className="bg-white/[0.03] border-b border-white/5 px-4 py-3 font-extrabold text-xs text-slate-300 flex justify-between items-center">
        <span>{title}</span>
        <ExternalLink size={10} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
      </div>
      
      <div className="p-4 flex-1">
        <div className="border border-white/5 rounded-xl bg-slate-950 p-2 h-[220px] shadow-inner relative">
          
          <div className="flex justify-between items-center text-[8px] text-slate-500 mb-2 px-1 border-b border-white/5 pb-1.5 font-extrabold">
            <span>SMART SOIL TELEMETRY MODULE</span>
            <span className="text-success uppercase">Active Sync</span>
          </div>
          
          <div className="h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="time" tick={{fontSize: 9, fill: '#64748b'}} tickLine={false} axisLine={false} />
                <YAxis tick={{fontSize: 9, fill: '#64748b'}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
                  labelStyle={{ fontSize: '9px', fontWeight: 'bold', color: '#94a3b8' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#f8fafc' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2} 
                  fillOpacity={1}
                  fill={`url(#${gradientId})`}
                  dot={{ r: 1.5, fill: color, strokeWidth: 0 }} 
                  activeDot={{ r: 4 }} 
                  isAnimationActive={false}
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="absolute bottom-1 right-2 text-[8px] text-slate-500 font-bold uppercase tracking-wider">ThingSpeak API</div>
        </div>
      </div>
      
      <div className="px-4 pb-3 text-[10px] text-slate-400 font-bold flex justify-between items-center">
        <span>{yLabel}</span>
        <span className="text-[8px] text-slate-500">Register: SSL SECURE</span>
      </div>
    </div>
  );
}

// --- Minor Metrics Component ---
function MetricCard({ title, value, icon, data, color, status, statusColor, trend, trendColor, glowClass }: { title: string; value: string; icon: React.ReactNode; data: { v: number }[]; color: string; status: string; statusColor: string; trend: string; trendColor: string; glowClass: string }) {
  const gradientId = `sparkGrad-${title.replace(/\s+/g, '')}`;
  return (
    <div className={cn(
      "bg-card/40 backdrop-blur-sm border border-border/40 shadow-md rounded-3xl p-5 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-0.5",
      glowClass
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 group-hover:text-foreground transition-colors border border-border/10">
            {icon}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
        </div>
        <span className={cn("text-[9px] font-extrabold uppercase tracking-wide", trendColor)}>{trend}</span>
      </div>
      
      <div className="mt-2 relative z-10 flex items-end justify-between">
        <div>
          <div className="text-2xl font-extrabold tracking-tight text-foreground">{value}</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground mt-1">
            <div className={cn("w-1.5 h-1.5 rounded-full animate-signal-pulse", statusColor)} /> {status}
          </div>
        </div>

        {/* Recharts Area sparkline */}
        <div className="h-8 w-16 opacity-70 z-0">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
              <Area 
                type="monotone" 
                dataKey="v" 
                stroke={color} 
                strokeWidth={1.5} 
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                dot={false} 
                isAnimationActive={false} 
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- Quick Actions Button ---
function QuickAction({ icon, title, sub, color }: { icon: React.ReactNode; title: string; sub: string; color: string }) {
  return (
    <button className={cn(
      "flex flex-col items-start p-3.5 rounded-2xl border border-border/50 hover:border-success/30 transition-all text-left bg-background/50 hover:bg-card relative group shadow-sm active:scale-[0.98]",
      color
    )}>
      <div className="mb-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg group-hover:scale-105 transition-transform duration-300 border border-border/10">
        {icon}
      </div>
      <span className="text-[11px] font-extrabold text-foreground tracking-tight">{title}</span>
      <span className="text-[8.5px] text-slate-500 font-semibold mt-0.5 leading-tight">{sub}</span>
    </button>
  );
}

// --- Weather item ---
function WeatherDay({ title, temp, desc, icon, active }: { title: string; temp: string; desc: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center",
      active 
        ? "bg-success/5 border-success/30 shadow-md shadow-success/5" 
        : "bg-background/40 border-border/50 hover:bg-card"
    )}>
      <div className="text-[9px] font-bold text-muted-foreground uppercase mb-1">{title}</div>
      <div className="mb-1">{icon}</div>
      <div className="text-[10px] font-extrabold text-foreground">{temp}</div>
      <div className="text-[8px] text-muted-foreground font-semibold mt-0.5">{desc}</div>
    </div>
  );
}

// --- Alert Item Component with expandable diagnostics details ---
function AlertItem({ icon, bg, title, desc, time, badge, diagnosticText }: { icon: React.ReactNode; bg: string; title: string; desc: string; time: string; badge: string; diagnosticText: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div 
      className="border border-border/40 hover:border-success/20 rounded-2xl p-3 bg-background/40 hover:bg-card cursor-pointer transition-all duration-300 shadow-sm"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm", bg)}>
            {icon}
          </div>
          <div>
            <div className="font-extrabold text-xs text-foreground leading-snug">{title}</div>
            <div className="text-[9.5px] text-muted-foreground font-semibold mt-0.5 leading-none">{desc}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-semibold text-slate-500">{time}</span>
          <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-md border border-border bg-card/65 font-mono uppercase">
            {badge}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 10 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden border-t border-border/30 pt-2.5 text-[9.5px] text-muted-foreground font-medium leading-relaxed"
          >
            {diagnosticText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
