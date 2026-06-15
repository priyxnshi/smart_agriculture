import React, { useState, useEffect } from 'react';
import { 
  Droplets, Thermometer, Wind, Database, Activity, Sun, Cloud, 
  CheckCircle2, BrainCircuit, AlertTriangle, Info, Sprout, Wifi, Zap,
  Target, Cpu, Network, MonitorSmartphone, ArrowRight, ExternalLink
} from 'lucide-react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Shared Data ---
const sparklineData1 = [{v: 60}, {v: 62}, {v: 61}, {v: 65}, {v: 68}, {v: 67}, {v: 68}];
const sparklineData2 = [{v: 25}, {v: 24}, {v: 23}, {v: 22}, {v: 23}, {v: 24}, {v: 24}];
const sparklineData3 = [{v: 50}, {v: 51}, {v: 53}, {v: 52}, {v: 54}, {v: 55}, {v: 55}];

// Mock ThingSpeak Data
const generateTSData = (base: number, variance: number) => {
  return Array.from({length: 20}).map((_, i) => ({
    time: `00:${(i * 5).toString().padStart(2, '0')}`,
    value: Math.max(0, base + (Math.random() * variance * 2 - variance))
  }));
};
const tsHumidity = generateTSData(50, 3);
const tsTemp = generateTSData(24.8, 0.2);
const tsLight = generateTSData(35.5, 1);
const tsNitrogen = generateTSData(120, 150); // Spiky mock data like the image
const tsPhosphorus = generateTSData(100, 150);

// --- Main Page Component ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6 text-foreground bg-background min-h-screen">
      <DashboardHeader />
      
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
        <TabButton id="overview" label="Overview" active={activeTab} set={setActiveTab} />
        <TabButton id="architecture" label="System Architecture" active={activeTab} set={setActiveTab} />
        <TabButton id="sdgs" label="SDG Alignment" active={activeTab} set={setActiveTab} />
        <TabButton id="thingspeak" label="ThingSpeak Live" active={activeTab} set={setActiveTab} />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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

// --- Header ---
function DashboardHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          Good Morning, Farmer! <Sprout className="text-primary-light" />
        </h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Here's what's happening on your farm today.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="bg-card border border-border shadow-saas px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-foreground">
          <Wifi size={16} className="text-success" /> ESP32 Connected
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Last Updated</span>
          <div className="font-bold text-sm">{time.toLocaleTimeString()}</div>
        </div>
        <div className="bg-card border border-border shadow-saas px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-3">
          <span className="text-muted-foreground">Automation</span>
          <div className="w-9 h-5 bg-success rounded-full flex items-center px-0.5 justify-end shadow-inner cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full text-[8px] font-bold text-success flex items-center justify-center">ON</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TabButton({ id, label, active, set }: any) {
  return (
    <button 
      onClick={() => set(id)}
      className={cn(
        "px-4 py-2.5 rounded-t-lg font-bold text-sm transition-colors whitespace-nowrap border-b-2",
        active === id ? "border-success text-success bg-success/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {label}
    </button>
  );
}

// --- Tabs ---

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Farm Health Score */}
        <div className="col-span-2 bg-card border border-border shadow-saas rounded-[20px] p-5 flex flex-col items-center justify-center relative">
          <h3 className="absolute top-4 left-5 text-sm font-bold text-foreground">Farm Health Score</h3>
          <div className="relative w-32 h-32 mt-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="8" />
              <motion.circle 
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 * (1 - 0.92) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="8" strokeDasharray="251" strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">92</span>
              <span className="text-[10px] text-muted-foreground font-bold">/ 100</span>
            </div>
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-success font-bold text-xs">
            <Sprout size={14} /> Excellent
          </div>
        </div>

        {/* Metric Cards */}
        <MetricCard title="Soil Moisture" value="68%" icon={<Droplets size={18} className="text-blue-500" />} data={sparklineData1} color="#22C55E" status="Optimal" statusColor="bg-success" trend="↑ 2%" trendColor="text-success" />
        <MetricCard title="Temperature" value="24°C" icon={<Thermometer size={18} className="text-red-500" />} data={sparklineData2} color="#3B82F6" status="Normal" statusColor="bg-success" trend="↓ 1°C" trendColor="text-blue-500" />
        <MetricCard title="Humidity" value="55%" icon={<Wind size={18} className="text-emerald-500" />} data={sparklineData3} color="#22C55E" status="Normal" statusColor="bg-success" trend="↑ 5%" trendColor="text-success" />
        
        {/* Water Tank */}
        <div className="bg-card border border-border shadow-saas rounded-[20px] p-5 relative overflow-hidden flex flex-col group">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <Database size={18} className="text-blue-500" />
            <span className="text-sm font-bold text-foreground">Water Tank</span>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-bold text-foreground mb-1">80%</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Available
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-80">
            <svg viewBox="0 0 1440 320" className="w-full h-full text-blue-500 translate-y-4 group-hover:translate-y-2 transition-transform duration-500" preserveAspectRatio="none">
              <path fill="currentColor" fillOpacity="0.4" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="currentColor" fillOpacity="0.8" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Pump Status */}
        <div className="bg-card border border-border shadow-saas rounded-[20px] p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-success" />
            <span className="text-sm font-bold text-foreground">Pump Status</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold text-foreground mb-1">Running</div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Auto Mode
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-success text-success flex items-center justify-center bg-success/10 cursor-pointer">
              <Activity size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 shadow-saas-lg rounded-[24px] relative overflow-hidden min-h-[440px] flex flex-col border border-border">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/farm_twin_bg.png)' }} />
            <div className="absolute top-0 inset-x-0 p-5 flex justify-between items-start z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sprout size={20} className="text-primary-light" /> Digital Farm Twin
                </h3>
                <p className="text-xs text-white/70 font-medium">Real-time visualization of your farm components</p>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto cursor-pointer">
                <span className="text-xs font-bold text-white">Irrigation</span>
                <div className="w-8 h-4 bg-success rounded-full flex items-center px-0.5 justify-end">
                  <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center text-[6px] font-bold text-success">ON</div>
                </div>
              </div>
            </div>

            <div className="absolute left-5 top-24 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 w-40">
              <div className="text-xs font-bold text-white mb-3">Sensors</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-white/80"><div className="w-2 h-2 rounded-full bg-success" /> Soil Moisture</div>
                <div className="flex items-center gap-2 text-[11px] text-white/80"><div className="w-2 h-2 rounded-full bg-success" /> Temperature</div>
                <div className="flex items-center gap-2 text-[11px] text-white/80"><div className="w-2 h-2 rounded-full bg-success" /> Humidity</div>
                <div className="flex items-center gap-2 text-[11px] text-white/80"><div className="w-2 h-2 rounded-full bg-success" /> Water Level</div>
              </div>
            </div>

            <div className="absolute top-[40%] left-[45%] z-10 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">
              Water Tank <br/><span className="text-success">80%</span>
            </div>
            <div className="absolute top-[50%] left-[30%] z-10 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">
              Pump <br/><span className="text-success animate-pulse">Running</span>
            </div>
            <div className="absolute top-[45%] right-[30%] z-10 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">
              ESP32 <br/><span className="text-success">Connected</span>
            </div>

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-4 text-[10px] font-bold text-white/80">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success" /> Normal</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Active</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-warning" /> Warning</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive" /> Critical</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border shadow-saas rounded-[20px] p-5">
              <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-1.5">
                <Zap size={14} className="text-muted-foreground" /> Quick Actions
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <QuickAction icon={<div className="w-3 h-3 bg-blue-500 rounded-sm" />} title="Start Irrigation" sub="Manual Override" />
                <QuickAction icon={<div className="w-3 h-3 bg-red-500 rounded-sm" />} title="Stop Irrigation" sub="Manual Override" />
                <QuickAction icon={<Activity size={14} className="text-success" />} title="View Analytics" sub="Detailed Reports" />
                <QuickAction icon={<BrainCircuit size={14} className="text-success" />} title="AI Insights" sub="Smart Analysis" />
              </div>
            </div>

            <div className="bg-card border border-border shadow-saas rounded-[20px] p-5">
              <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-1.5">
                <Cloud size={14} className="text-blue-400" /> Weather Forecast
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Today</div>
                  <Cloud size={20} className="text-slate-400 mb-1" />
                  <div className="text-xs font-bold text-foreground">24°C / 18°C</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Partly Cloudy</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                  <div className="text-[10px] font-bold text-blue-500 uppercase mb-1">Tomorrow</div>
                  <Wind size={20} className="text-blue-400 mb-1" />
                  <div className="text-xs font-bold text-foreground">26°C / 19°C</div>
                  <div className="text-[10px] text-blue-500 mt-0.5">Light Rain</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                  <div className="text-[10px] font-bold text-amber-500 uppercase mb-1">Day After</div>
                  <Sun size={20} className="text-amber-400 mb-1" />
                  <div className="text-xs font-bold text-foreground">27°C / 20°C</div>
                  <div className="text-[10px] text-amber-500 mt-0.5">Sunny</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111827] text-white border border-[#1F2937] shadow-saas-lg rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit size={16} className="text-success" /> AI Recommendations
              </h3>
              <span className="text-xs font-bold text-success cursor-pointer">View All</span>
            </div>
            
            <div className="bg-[#166534] rounded-[16px] p-4 relative overflow-hidden flex flex-col justify-between min-h-[160px] border border-[#22c55e]/30 shadow-inner">
              <div className="relative z-10 w-2/3">
                <h4 className="text-sm font-bold text-white mb-2">Irrigation Recommended</h4>
                <p className="text-white/80 text-[11px] leading-relaxed mb-4">
                  Soil moisture is below optimal level. Recommended action: Start irrigation within 20 minutes.
                </p>
              </div>

              <div className="absolute right-3 top-3 bottom-3 w-[100px] bg-black/20 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
                 <img src="/ai_sprout_icon.png" alt="AI Sprout" className="w-full h-full object-cover opacity-90 mix-blend-screen" />
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto border-t border-white/10 pt-3">
                <div className="flex gap-4">
                  <div>
                    <div className="text-[10px] text-white/60 font-medium mb-0.5">Confidence</div>
                    <div className="font-bold text-white text-xs">89%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60 font-medium mb-0.5">Expected Benefit</div>
                    <div className="font-bold text-white text-xs">+12% Yield</div>
                  </div>
                </div>
                <button className="bg-success hover:bg-[#16A34A] text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-colors shadow-lg shadow-success/20">
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-[#1F2937] shadow-saas rounded-[24px] p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold">Recent Alerts</h3>
              <span className="text-xs font-bold text-success cursor-pointer">View All</span>
            </div>
            
            <div className="space-y-4">
              <AlertItem 
                icon={<AlertTriangle size={14} className="text-warning-foreground" />} 
                bg="bg-warning" title="Low Soil Moisture" desc="Field 1 - Moisture below 60%" time="5 min ago" badge="Warning" badgeColor="text-warning border-warning/30" />
              <div className="h-px bg-white/10 w-full" />
              <AlertItem 
                icon={<Info size={14} className="text-white" />} 
                bg="bg-blue-500" title="Tank Level Medium" desc="Water tank level is 80%" time="15 min ago" badge="Info" badgeColor="text-blue-400 border-blue-400/30" />
              <div className="h-px bg-white/10 w-full" />
              <AlertItem 
                icon={<CheckCircle2 size={14} className="text-white" />} 
                bg="bg-success" title="System Check" desc="All systems operational" time="32 min ago" badge="Info" badgeColor="text-success border-success/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- New Tabs: Architecture, SDGs, ThingSpeak ---

function ArchitectureTab() {
  return (
    <div className="space-y-6">
      {/* Flow Chart Section */}
      <div className="bg-card border border-border shadow-saas rounded-[24px] p-8">
        <h3 className="text-lg font-bold text-foreground mb-8 text-center flex justify-center items-center gap-2">
          <Network size={20} className="text-success" /> End-to-End Architecture
        </h3>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <FlowNode icon={<Target className="text-success" />} title="Sensors" desc="NPK, pH, Moisture, DHT22, BH1750" />
          <FlowArrow />
          <FlowNode icon={<Cpu className="text-success" />} title="ESP32" desc="Embedded processing & ADC" />
          <FlowArrow />
          <FlowNode icon={<Wifi className="text-success" />} title="WiFi" desc="Wireless data transmission" />
          <FlowArrow />
          <FlowNode icon={<Cloud className="text-success" />} title="ThingSpeak" desc="Cloud storage & visualization" />
          <FlowArrow />
          <FlowNode icon={<MonitorSmartphone className="text-success" />} title="Dashboard" desc="Real-time web monitoring" />
        </div>
      </div>

      {/* Circuit Diagram Section */}
      <div className="bg-card border border-border shadow-saas rounded-[24px] p-8">
        <h3 className="text-lg font-bold text-foreground mb-6 text-center">Complete Hardware Connection Diagram - ESP32 Soil Monitoring System</h3>
        <div className="relative w-full max-w-4xl mx-auto bg-muted/30 rounded-2xl overflow-hidden border border-border flex items-center justify-center p-4">
           {/* Fallback to text if image fails to load, but the image is perfectly generated 3D mockup */}
           <img src="/circuit_diagram.png" alt="Circuit Diagram" className="w-full h-auto object-cover rounded-xl shadow-sm border border-border/50" />
        </div>
      </div>
    </div>
  );
}

function FlowNode({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card border border-border shadow-saas-md rounded-[20px] w-full lg:w-48 h-48 justify-center hover:border-success transition-colors cursor-default">
      <div className="mb-4">
        {React.cloneElement(icon, { size: 36, strokeWidth: 2 })}
      </div>
      <h4 className="font-bold text-foreground mb-2">{title}</h4>
      <p className="text-xs text-muted-foreground font-medium px-2 leading-relaxed">{desc}</p>
    </div>
  );
}
function FlowArrow() {
  return (
    <div className="text-success/50 lg:rotate-0 rotate-90">
      <ArrowRight size={24} />
    </div>
  );
}

function SDGsTab() {
  const sdgs = [
    { num: "2", title: "Zero Hunger", desc: "Optimizing crop yield through soil intelligence" },
    { num: "9", title: "Industry & Innovation", desc: "IoT-driven agricultural infrastructure" },
    { num: "12", title: "Responsible Consumption", desc: "Efficient resource usage via data" },
    { num: "13", title: "Climate Action", desc: "Reducing environmental impact of farming" }
  ];

  return (
    <div className="bg-card border border-border shadow-saas rounded-[24px] p-10">
      <h3 className="text-2xl font-bold text-foreground mb-10 text-center">SDG Alignment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {sdgs.map((sdg) => (
          <div key={sdg.num} className="bg-card border border-border shadow-saas-md rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-saas-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success to-primary-light flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-md shadow-success/20">
              {sdg.num}
            </div>
            <h4 className="font-bold text-foreground mb-2 text-lg">{sdg.title}</h4>
            <p className="text-sm text-muted-foreground font-medium">{sdg.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThingSpeakTab() {
  return (
    <div className="bg-muted/30 border border-border shadow-saas rounded-[24px] p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Activity className="text-blue-500" /> ThingSpeak Live Feeds
        </h3>
        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">
          Connected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TSChartCard title="Field 3 — Humidity" data={tsHumidity} yLabel="Humidity (%)" color="#ef4444" />
        <TSChartCard title="Field 4 — Temperature" data={tsTemp} yLabel="Temperature (°C)" color="#ef4444" />
        <TSChartCard title="Field 5 — Light Intensity" data={tsLight} yLabel="Light Intensity (Lux)" color="#ef4444" />
        <TSChartCard title="Field 6 — Nitrogen" data={tsNitrogen} yLabel="Nitrogen (mg/kg)" color="#ef4444" />
        <TSChartCard title="Field 7 — Phosphorus" data={tsPhosphorus} yLabel="Phosphorus (mg/kg)" color="#ef4444" />
        
        {/* NPK Placeholder */}
        <div className="bg-white dark:bg-card border border-border shadow-md rounded-xl overflow-hidden flex flex-col min-h-[300px]">
          <div className="bg-[#3498DB] text-white px-4 py-2 font-bold text-sm">
            Field 8 — NPK Composite
          </div>
          <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-slate-300 dark:border-slate-600">
              <Sprout size={24} className="text-slate-400" />
            </div>
            <h4 className="text-slate-500 dark:text-slate-400 font-bold mb-1">NPK Sensor Data</h4>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
              (To be added)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TSChartCard({ title, data, yLabel, color }: any) {
  return (
    <div className="bg-white dark:bg-card border border-border shadow-md rounded-xl overflow-hidden flex flex-col">
      <div className="bg-[#3498DB] text-white px-4 py-2 font-bold text-sm flex justify-between items-center">
        {title}
      </div>
      <div className="p-4 flex-1">
        <div className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 p-2 h-[220px]">
          <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 px-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Smart Soil Monitor</span>
            <div className="flex gap-2">
              <ExternalLink size={12} className="cursor-pointer hover:text-blue-500" />
            </div>
          </div>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                <YAxis tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Line 
                  type="linear" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={1.5} 
                  dot={{ r: 2.5, fill: color, strokeWidth: 0 }} 
                  activeDot={{ r: 4 }} 
                  isAnimationActive={false}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-1 text-[10px] text-red-500 font-bold tracking-tight">ThingSpeak.com</div>
        </div>
      </div>
      <div className="px-4 pb-3 pt-1 text-[11px] text-slate-500 font-medium">
        {yLabel}
      </div>
    </div>
  );
}

// --- Minor Components ---
function MetricCard({ title, value, icon, data, color, status, statusColor, trend, trendColor }: any) {
  return (
    <div className="bg-card border border-border shadow-saas rounded-[20px] p-4 flex flex-col justify-between relative group hover:shadow-saas-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-bold text-foreground">{title}</span>
        </div>
        <span className={cn("text-[10px] font-bold", trendColor)}>{trend}</span>
      </div>
      <div className="mt-2 relative z-10">
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <div className={cn("w-1.5 h-1.5 rounded-full", statusColor)} /> {status}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 h-8 w-16 opacity-80 z-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function QuickAction({ icon, title, sub }: any) {
  return (
    <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-border hover:border-success hover:bg-success/5 transition-all group bg-background">
      <div className="mb-2">{icon}</div>
      <span className="text-[11px] font-bold text-foreground group-hover:text-success transition-colors text-center leading-tight">{title}</span>
      <span className="text-[9px] text-muted-foreground mt-1 text-center leading-tight">{sub}</span>
    </button>
  );
}

function AlertItem({ icon, bg, title, desc, time, badge, badgeColor }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", bg)}>
          {icon}
        </div>
        <div>
          <div className="font-bold text-sm text-white">{title}</div>
          <div className="text-xs text-white/50 font-medium">{desc}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-medium text-white/40">{time}</span>
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border bg-transparent", badgeColor)}>
          {badge}
        </span>
      </div>
    </div>
  );
}
