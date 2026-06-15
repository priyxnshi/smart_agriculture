import { Bell, User, Shield, Zap } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6 lg:p-8 space-y-8 pb-24 max-w-4xl">
      <section>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and application preferences.</p>
      </section>

      <div className="space-y-6">
        <SettingsCard title="Profile Settings" icon={User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Farm Name</label>
              <input type="text" defaultValue="Green Valley Farm" className="w-full p-2 border border-border rounded-lg bg-card" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Email</label>
              <input type="email" defaultValue="admin@greenvalley.com" className="w-full p-2 border border-border rounded-lg bg-card" />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Automation Preferences" icon={Zap}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">AI Auto-Irrigation</h4>
                <p className="text-sm text-muted-foreground">Let AI control the water pump automatically.</p>
              </div>
              <Toggle checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Smart Fertilizer Insights</h4>
                <p className="text-sm text-muted-foreground">Enable predictive NPK recommendations.</p>
              </div>
              <Toggle checked={true} />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Notifications" icon={Bell}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Critical Alerts (SMS)</h4>
                <p className="text-sm text-muted-foreground">Receive SMS for hardware failures.</p>
              </div>
              <Toggle checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Daily AI Reports</h4>
                <p className="text-sm text-muted-foreground">Get farm health summary via email.</p>
              </div>
              <Toggle checked={false} />
            </div>
          </div>
        </SettingsCard>
        
        <SettingsCard title="Security" icon={Shield}>
          <button className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors font-medium text-sm">
            Reset API Keys
          </button>
        </SettingsCard>
      </div>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, children }: any) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
        <Icon className="text-muted-foreground" size={20} /> {title}
      </h3>
      {children}
    </div>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-primary' : 'bg-muted border border-border'}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
}
