import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Sun
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

export function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: any) {
  const location = useLocation();

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <motion.div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-[#052E16] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 text-white rounded-tr-[40px] rounded-br-[40px] shadow-[4px_0_24px_rgba(0,0,0,0.1)]",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        {/* Header */}
        <div className="flex items-center gap-3 h-24 px-8">
          <div className="text-white flex-shrink-0">
            <Sprout size={28} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            AgriSense AI
          </span>
          <button 
            className="lg:hidden text-white/50 hover:text-white ml-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-2 scrollbar-none">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold transition-all duration-200 group",
                  isActive ? "text-white bg-[#16A34A]/20" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={cn("flex-shrink-0 transition-colors", isActive ? "text-[#22C55E]" : "text-white/60 group-hover:text-white")} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Card */}
        <div className="p-6">
          <div className="border border-white/10 rounded-[20px] p-4 bg-white/5 backdrop-blur-sm relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 font-medium">ESP32 Status</span>
                <div className="flex items-center gap-1.5 text-xs text-[#22C55E] font-medium">
                  <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
                  Connected
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 font-medium">Last Sync</span>
                <span className="text-xs text-white font-medium">12 sec ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 font-medium">Uptime</span>
                <span className="text-xs text-white font-medium">2h 45m 12s</span>
              </div>
            </div>
            
            <button className="mt-4 w-full bg-[#16A34A] hover:bg-[#22C55E] transition-colors text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2">
              System Online
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#16A34A] rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card z-30 sticky top-0 shadow-saas">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Sprout size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">AgriSense</span>
          </div>
          <button 
            className="text-muted-foreground p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Theme Toggle Overlay Button */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-saas-lg text-foreground hover:bg-muted transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
