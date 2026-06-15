import { Flame, Sun, TestTube, Sparkles } from 'lucide-react';

export default function FutureTech() {
  return (
    <div className="p-6 lg:p-8 space-y-8 pb-24">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
          <Sparkles size={16} /> Research & Development
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Future Technologies</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          We are continuously expanding the AgriSense ecosystem. Here is a sneak peek into the intelligence modules coming in the next hardware revision.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Flame Sensor */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm group hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-md">Coming Soon</span>
          </div>
          <div className="w-14 h-14 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Flame size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Flame Sensor</h3>
          <p className="text-sm text-muted-foreground mb-6 h-10">Advanced fire detection to protect your farm assets and crops.</p>
          
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Future AI Capabilities</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-destructive" /> Fire Risk Prediction</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-destructive" /> Emergency Alerts Integration</li>
            </ul>
          </div>
        </div>

        {/* Light Sensor */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm group hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-md">Coming Soon</span>
          </div>
          <div className="w-14 h-14 bg-warning/10 text-warning rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sun size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Light Sensor (LDR)</h3>
          <p className="text-sm text-muted-foreground mb-6 h-10">Monitor sunlight exposure to maximize photosynthetic efficiency.</p>
          
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Future AI Capabilities</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warning" /> Sunlight Optimization</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warning" /> Crop Growth Analysis</li>
            </ul>
          </div>
        </div>

        {/* NPK Sensor */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm group hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-md">In Development</span>
          </div>
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <TestTube size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">NPK Sensor</h3>
          <p className="text-sm text-muted-foreground mb-6 h-10">Real-time measurement of Nitrogen, Phosphorus, and Potassium levels.</p>
          
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Future AI Capabilities</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Automated Nutrient Advisor</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Yield Improvement Predictions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
