import { Activity, Wifi, Cpu, Clock, RefreshCcw } from 'lucide-react';

export default function SystemHealth() {
  return (
    <div className="p-6 lg:p-8 space-y-8 pb-24">
      <section className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">System Health</h1>
          <p className="text-muted-foreground mt-2">Hardware diagnostics and connectivity.</p>
        </div>
        <button className="flex items-center gap-2 bg-muted hover:bg-border text-foreground px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <RefreshCcw size={16} /> Run Diagnostics
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthCard title="ESP32 Controller" status="Online" icon={Cpu} />
        <HealthCard title="Sensor Connectivity" status="Optimal" icon={Wifi} />
        <HealthCard title="Pump Status" status="Standby" icon={Activity} />
        <HealthCard title="System Uptime" status="99.9%" icon={Clock} isPercent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Hardware Info</h3>
          <div className="space-y-4">
            <InfoRow label="Firmware Version" value="v2.4.1-stable" />
            <InfoRow label="IP Address" value="192.168.1.145" />
            <InfoRow label="MAC Address" value="24:6F:28:XX:XX:XX" />
            <InfoRow label="Last Communication" value="Just now" />
            <InfoRow label="Power Source" value="Solar + Battery (84%)" />
          </div>
        </div>

        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Diagnostic Logs</h3>
          <div className="bg-muted/30 rounded-xl p-4 h-48 overflow-y-auto font-mono text-xs text-muted-foreground space-y-2">
            <p>[10:45:02] System OK.</p>
            <p>[10:45:03] MQTT connected to broker.</p>
            <p>[10:46:12] Heartbeat sent.</p>
            <p>[10:47:00] Sensor payload delivered.</p>
            <p>[10:48:12] Heartbeat sent.</p>
            <p className="text-success">[10:49:00] Moisture baseline re-calibrated.</p>
            <p>[10:49:12] Heartbeat sent.</p>
            <div className="animate-pulse">_</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthCard({ title, status, icon: Icon, isPercent }: any) {
  const isGood = status === 'Online' || status === 'Optimal' || status === 'Standby' || isPercent;
  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between h-36">
      <div className="flex justify-between items-start">
        <div className="text-muted-foreground font-medium text-sm">{title}</div>
        <div className={`p-2 rounded-xl ${isGood ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-2xl font-bold mt-4">{status}</div>
    </div>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}
