import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  LineChart, 
  BrainCircuit, 
  Cpu, 
  MessageSquare, 
  Bell, 
  Activity, 
  Rocket, 
  Settings,
  Menu,
  X,
  Sprout,
  Moon,
  Sun,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'AI Insights', href: '/ai-insights', icon: BrainCircuit },
  { name: 'AI Copilot', href: '/ai-copilot', icon: Cpu },
  { name: 'AgriBot', href: '/agribot', icon: MessageSquare },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'System Health', href: '/health', icon: Activity },
  { name: 'Future Tech', href: '/future-tech', icon: Rocket },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <motion.div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-900 lg:bg-[#E8F8ED]/40 lg:dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-y-0 lg:h-[calc(100vh-2rem)] lg:m-4 lg:mr-0 lg:rounded-[24px] lg:border lg:border-emerald-200/50 lg:dark:border-white/10 lg:backdrop-blur-xl shadow-lg dark:shadow-2xl overflow-hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        
        {/* Glow Sphere in Sidebar Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-light/5 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center gap-3 h-20 px-6 border-b border-emerald-200/50 dark:border-white/5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-success to-primary-light shadow-md shadow-success/20">
            <Sprout size={20} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-slate-200 dark:border-slate-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-foreground via-[#0f3d23] dark:via-slate-200 to-success bg-clip-text text-transparent">
              AgriSense AI
            </span>
            <div className="text-[10px] text-success/80 font-bold flex items-center gap-1 mt-0.5">
              <ShieldCheck size={10} /> Core Active
            </div>
          </div>
          <button 
            className="lg:hidden text-slate-500 dark:text-white/50 hover:text-foreground dark:hover:text-white ml-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 px-3 py-4 overflow-y-auto space-y-1.5 scrollbar-none">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 group outline-none",
                  isActive ? "text-success" : "text-slate-500 dark:text-slate-400 hover:text-foreground dark:hover:text-slate-100 hover:bg-emerald-500/5 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-emerald-500/10 dark:bg-white/[0.06] border border-emerald-500/20 dark:border-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                
                <item.icon size={18} className={cn("relative z-10 transition-colors duration-300", isActive ? "text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "text-slate-400 group-hover:text-foreground dark:group-hover:text-slate-100")} />
                <span className="relative z-10">{item.name}</span>
                
                {isActive && (
                  <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-success drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Hardware Telemetry Card */}
        <div className="relative p-4 mt-auto border-t border-emerald-200/50 dark:border-white/5 bg-emerald-50/10 dark:bg-white/[0.02] backdrop-blur-md">
          <div className="rounded-2xl border border-emerald-200/40 dark:border-white/5 p-3.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">ESP32 Telemetry</span>
                <div className="flex items-center gap-1 text-[10px] text-success font-extrabold">
                  <div className="w-1.5 h-1.5 bg-success rounded-full animate-signal-pulse" />
                  Live Sync
                </div>
              </div>
              
              <div className="h-px bg-emerald-200/40 dark:bg-white/5" />
              
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-450 dark:text-slate-500 block">Ping Latency</span>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">14 ms</span>
                </div>
                <div>
                  <span className="text-slate-450 dark:text-slate-500 block">Uptime Ratio</span>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">99.98%</span>
                </div>
              </div>
            </div>
            
            <button className="mt-3.5 w-full bg-gradient-to-r from-success to-primary-light hover:from-[#16A34A] hover:to-[#22C55E] transition-all duration-300 text-white text-[10px] font-extrabold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-success/15 hover:shadow-success/25 active:scale-[0.98]">
              <Zap size={10} />
              System Operational
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden relative bg-dot-grid">
      
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="mesh-glow-sphere w-[500px] h-[500px] bg-success/10 -top-40 -left-40 animate-pulse duration-10000" />
        <div className="mesh-glow-sphere w-[600px] h-[600px] bg-blue-500/5 -bottom-60 -right-60 animate-pulse duration-8000" />
        <div className="mesh-glow-sphere w-[400px] h-[400px] bg-primary-light/5 top-[30%] right-[10%] animate-pulse duration-9000" />
      </div>

      <div className="relative z-10 flex flex-1 overflow-hidden min-h-screen">
        <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative lg:p-4">
          
          {/* Mobile Header */}
          <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-md z-30 sticky top-0 shadow-saas">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-success to-primary-light p-1.5 rounded-lg text-white shadow-sm shadow-success/15">
                <Sprout size={18} />
              </div>
              <span className="text-base font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/90 to-success bg-clip-text text-transparent">
                AgriSense
              </span>
            </div>
            <button 
              className="text-muted-foreground p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </header>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full glass-panel border border-border shadow-saas-lg text-foreground hover:bg-muted transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
            title="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <main className="flex-1 overflow-y-auto scrollbar-none rounded-t-[20px] lg:rounded-[20px] border border-transparent lg:border-border/40 lg:bg-card/30 lg:backdrop-blur-sm relative shadow-inner">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
