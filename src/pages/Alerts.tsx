import { AlertTriangle, Info, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Alerts() {
  const alerts = [
    { id: 1, type: 'critical', title: 'Pump Failure Detected', time: '10 mins ago', status: 'Unresolved', desc: 'Water pump failed to start during scheduled irrigation cycle.' },
    { id: 2, type: 'warning', title: 'Low Water Level', time: '2 hours ago', status: 'Resolved', desc: 'Main water tank level dropped below 20%.' },
    { id: 3, type: 'info', title: 'System Update Completed', time: '1 day ago', status: 'Resolved', desc: 'Firmware updated to v2.4.1-stable.' },
    { id: 4, type: 'warning', title: 'High Temperature Alert', time: '2 days ago', status: 'Resolved', desc: 'Greenhouse temperature exceeded 35°C.' },
    { id: 5, type: 'critical', title: 'Sensor Offline', time: '1 week ago', status: 'Resolved', desc: 'Node 2 stopped responding to heartbeat requests.' }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 pb-24">
      <section>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Alerts & Notifications</h1>
        <p className="text-muted-foreground mt-2">System events and historical notifications.</p>
      </section>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <FilterBadge label="All Alerts" active />
        <FilterBadge label="Critical" count={1} color="bg-destructive/10 text-destructive border-destructive/20" />
        <FilterBadge label="Warning" count={2} color="bg-warning/10 text-warning border-warning/20" />
        <FilterBadge label="Information" count={1} color="bg-primary/10 text-primary border-primary/20" />
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-border">
          {alerts.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterBadge({ label, active, count, color }: any) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 whitespace-nowrap transition-colors",
      active ? "bg-foreground text-background border-foreground" : cn("bg-card hover:bg-muted border-border", color)
    )}>
      {label}
      {count !== undefined && <span className="bg-background/20 px-1.5 rounded text-xs">{count}</span>}
    </button>
  );
}

function AlertRow({ alert }: any) {
  const isCritical = alert.type === 'critical';
  const isWarning = alert.type === 'warning';

  const Icon = isCritical ? AlertOctagon : (isWarning ? AlertTriangle : Info);
  
  return (
    <div className="p-4 sm:p-6 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center">
      <div className={cn(
        "p-3 rounded-2xl flex-shrink-0 self-start",
        isCritical ? "bg-destructive/10 text-destructive" :
        isWarning ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
      )}>
        <Icon size={24} />
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-lg">{alert.title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{alert.desc}</p>
        <div className="flex items-center gap-4 mt-3 text-xs font-medium text-muted-foreground">
          <span>{alert.time}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className={cn(
            "flex items-center gap-1",
            alert.status === 'Resolved' ? "text-success" : "text-destructive"
          )}>
            {alert.status === 'Resolved' ? <CheckCircle2 size={14} /> : null}
            {alert.status}
          </span>
        </div>
      </div>
      
      <div className="hidden sm:block">
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
