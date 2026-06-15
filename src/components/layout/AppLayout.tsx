import { useState } from 'react';
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
  Wifi,
  Menu,
  X,
  Sprout,
  ChevronLeft,
  ChevronRight
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

export function Sidebar({ mobileMenuOpen, setMobileMenuOpen, collapsed, setCollapsed }: any) {
  const location = useLocation();

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <motion.div 
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 glass-panel flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)]",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-border/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-primary/20 p-2 rounded-xl text-primary box-glow flex-shrink-0">
              <Sprout size={24} />
            </div>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-lg font-bold tracking-tight whitespace-nowrap"
              >
                AgriSense AI
              </motion.span>
            )}
          </div>
          <button 
            className="hidden lg:flex text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button 
            className="lg:hidden text-muted-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto space-y-1.5 scrollbar-none">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                title={collapsed ? item.name : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/30 box-glow rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={20} className={cn("relative z-10 flex-shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!collapsed && (
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <div className={cn("bg-muted/50 rounded-2xl flex flex-col gap-2 transition-all", collapsed ? "p-2 items-center" : "p-4")}>
            {collapsed ? (
              <div className="relative">
                <Wifi size={20} className="text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full border-2 border-card" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ESP32 Core</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-success/15 text-success rounded-full text-[10px] font-bold tracking-wide uppercase">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                  <Activity size={12} /> Sync: 2s ago
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex selection:bg-primary/20">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-2">
            <Sprout size={24} className="text-primary" />
            <span className="text-lg font-bold tracking-tight">AgriSense</span>
          </div>
          <button 
            className="text-muted-foreground p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
