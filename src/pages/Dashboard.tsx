import { useState, useEffect } from 'react';
import { Droplets, Thermometer, Wind, Database, Zap, Activity, Sun, Leaf, CheckCircle2, ChevronRight, BrainCircuit } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { motion } from 'framer-motion';

const sparklineData1 = [{v: 60}, {v: 62}, {v: 61}, {v: 65}, {v: 68}, {v: 67}, {v: 68}];
const sparklineData2 = [{v: 22}, {v: 24}, {v: 25}, {v: 24}, {v: 23}, {v: 24}, {v: 24}];

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 pb-32 animate-float" style={{ animationDuration: '15s', animationTimingFunction: 'linear' }}>
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight heading-gradient mb-2">Good Morning, Priyanshi 🌱</h1>
          <p className="text-muted-foreground mt-1 font-medium text-lg">Here is the latest intelligence on your acreage.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex gap-4">
          <div className="glass-card px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border border-primary/20 box-glow text-primary">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary relative z-10" /> 
            Live View
          </div>
          <div className="glass-card px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground border border-white/5">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </motion.div>
      </header>

      {/* Top Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Summary Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
        >
          {/* Animated Background Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-50 group-hover:bg-primary/30 transition-colors duration-1000" />
          
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-700">
            <Leaf size={160} className="text-primary transform rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest mb-8 box-glow">
              <Activity size={14} /> AI Daily Assessment
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold leading-tight max-w-2xl text-foreground/90">
              Farm conditions are <span className="text-primary text-glow font-bold">excellent</span> today. Soil moisture remains within optimal range. No critical issues detected.
            </h2>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
            <p className="text-muted-foreground font-medium flex items-center gap-2 text-lg">
              <Database size={20} className="text-secondary" />
              Expected water requirement tomorrow: <strong className="text-foreground text-glow">38L</strong>.
            </p>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all group-hover:pr-4 hover:gap-3 box-glow">
              Full Report <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Farm Health Radial */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center relative border border-white/10 hover:border-success/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-success/5 rounded-3xl" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 absolute top-8">Health Score</h3>
          <div className="relative w-44 h-44 flex items-center justify-center mt-6">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full border border-success/20 box-glow" />
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-muted/10" strokeWidth="6" />
              <motion.circle 
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 * (1 - 0.92) }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-primary" strokeWidth="6" strokeDasharray="283" strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold tracking-tighter text-glow">92</span>
            </div>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 bg-success/10 border border-success/20 text-success rounded-full text-sm font-bold tracking-wide box-glow">
            <CheckCircle2 size={18} /> Excellent
          </div>
        </motion.div>
      </div>

      {/* Command Center Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBadge label="Active Sensors" value="12/12" icon={Activity} delay={0.3} />
        <StatBadge label="Automation" value="Enabled" icon={Zap} color="text-warning" delay={0.4} />
        <StatBadge label="AI Confidence" value="98%" icon={BrainCircuit} color="text-primary" delay={0.5} />
        <StatBadge label="Water Usage" value="142 L" icon={Droplets} color="text-secondary" delay={0.6} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold heading-gradient">Telemetry</h3>
          </div>
          {/* Advanced Sensor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AdvancedSensorCard 
              title="Soil Moisture" value="68%" trend="Stable" icon={Droplets} data={sparklineData1} 
              insight="Optimal moisture range maintained." color="hsl(var(--primary))" delay={0.7}
            />
            <AdvancedSensorCard 
              title="Temperature" value="24°C" trend="Slight Increase" icon={Thermometer} data={sparklineData2} 
              insight="Within safe bounds for current crop cycle." color="hsl(var(--warning))" delay={0.8}
            />
            <AdvancedSensorCard 
              title="Humidity" value="55%" trend="Stable" icon={Wind} data={sparklineData1} 
              insight="Ideal conditions, low risk of fungal growth." color="hsl(var(--accent))" delay={0.9}
            />
            <AdvancedSensorCard 
              title="Main Tank" value="80%" trend="Dropping" icon={Database} data={sparklineData2} 
              insight="Refill estimated in 4 days." color="hsl(var(--secondary))" delay={1.0}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold heading-gradient">Environment & Twin</h3>
          {/* Weather Center Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }}
            className="glass-card p-6 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <h4 className="font-semibold flex items-center gap-3 text-lg"><Sun size={24} className="text-warning text-glow" /> Local Weather</h4>
              <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full box-glow">API Ready</span>
            </div>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Temp</p>
                <p className="text-3xl font-bold">26°C</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rain Prob.</p>
                <p className="text-3xl font-bold text-secondary">10%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">UV Index</p>
                <p className="text-xl font-bold text-warning">High (6)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wind</p>
                <p className="text-xl font-bold">12 km/h</p>
              </div>
            </div>
          </motion.div>

          {/* Digital Farm Twin Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }}
            className="glass-card p-6 rounded-3xl relative overflow-hidden group min-h-[280px] flex flex-col border border-primary/10 hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay" />
            <h4 className="font-semibold mb-6 z-10 text-lg">Digital Farm Map</h4>
            <div className="flex-1 bg-background/40 backdrop-blur-md rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden shadow-inner">
              
              {/* ESP32 Node */}
              <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                <div className="w-5 h-5 bg-primary rounded-md shadow-[0_0_20px_rgba(34,197,94,0.8)] relative border border-white/20">
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-success rounded-full animate-ping opacity-75" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full" />
                </div>
                <span className="text-xs mt-2 font-bold text-muted-foreground">ESP32</span>
              </div>

              {/* Tank */}
              <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
                <div className="w-10 h-14 border-2 border-secondary rounded-b-xl rounded-t-sm relative overflow-hidden bg-background/50 backdrop-blur-sm shadow-[0_0_15px_rgba(100,116,139,0.2)]">
                  <motion.div 
                    initial={{ height: "0%" }}
                    animate={{ height: "80%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-secondary/50 backdrop-blur-md border-t border-secondary" 
                  />
                </div>
                <span className="text-xs mt-2 font-bold text-muted-foreground">Tank</span>
              </div>

              {/* Animated Pipeline */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_5px_rgba(100,116,139,0.5)]" style={{ zIndex: 0 }}>
                <path d="M 30% 30% L 30% 70% L 70% 70%" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" strokeDasharray="4 4" className="opacity-20" />
                <motion.path 
                  d="M 30% 30% L 30% 70% L 70% 70%" 
                  fill="none" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth="3" 
                  strokeDasharray="15 25"
                  animate={{ strokeDashoffset: [-40, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ label, value, icon: Icon, color = "text-foreground", delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
      className="glass-card p-5 rounded-2xl flex flex-col gap-3 border border-white/5 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.1)] transition-all cursor-default group"
    >
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-background/50 ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={20} />
        </div>
        <span className="font-bold text-2xl tracking-tight">{value}</span>
      </div>
    </motion.div>
  );
}

function AdvancedSensorCard({ title, value, trend, icon: Icon, data, insight, color, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay }}
      className="glass-card rounded-3xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-500 group flex flex-col justify-between hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background/50 border border-white/5 rounded-2xl text-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors group-hover:border-primary/30 box-glow shadow-inner">
              <Icon size={22} />
            </div>
            <span className="font-bold text-lg">{title}</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold tracking-tight text-glow">{value}</div>
            <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">{trend}</div>
          </div>
        </div>
        
        {/* Sparkline */}
        <div className="h-16 w-full mt-2 mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
              <Line type="monotone" dataKey="v" stroke={color} strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={2000} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-background/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex gap-3 items-start relative z-10 group-hover:border-white/10 transition-colors">
        <div className="mt-0.5"><BrainCircuit size={16} className="text-primary animate-pulse" /></div>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
          {insight}
        </p>
      </div>
    </motion.div>
  );
}
