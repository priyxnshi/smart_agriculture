import { FileText, CheckCircle2, AlertTriangle, TrendingUp, CalendarDays } from 'lucide-react';

export default function AIInsights() {
  return (
    <div className="p-6 lg:p-10 max-w-[1000px] mx-auto space-y-8 pb-32">
      <header className="border-b border-border pb-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <CalendarDays size={14} /> Daily Farm Briefing
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground font-serif">Today's Executive Report</h1>
        <p className="text-muted-foreground mt-4 text-lg">Generated automatically by AgriSense AI at 06:00 AM.</p>
      </header>

      <div className="bg-card border border-border shadow-md rounded-3xl p-8 md:p-12 space-y-12 relative overflow-hidden">
        {/* Fake paper texture or subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] pointer-events-none" />
        
        <section className="relative z-10">
          <h2 className="text-2xl font-bold border-b-2 border-primary/20 pb-2 mb-6 font-serif">1. Executive Summary</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            The farm is operating at <strong className="text-success">98.4% efficiency</strong>. Soil moisture levels are stabilized across all zones following yesterday's automated irrigation cycle. No immediate manual intervention is required.
          </p>
        </section>

        <section className="relative z-10">
          <h2 className="text-2xl font-bold border-b-2 border-primary/20 pb-2 mb-6 font-serif">2. Key Achievements</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <CheckCircle2 className="text-success flex-shrink-0 mt-1" />
              <p className="text-foreground/80 leading-relaxed"><strong>Water Conservation:</strong> Saved 15L of water compared to the historical average by skipping the morning cycle due to detected high humidity.</p>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-success flex-shrink-0 mt-1" />
              <p className="text-foreground/80 leading-relaxed"><strong>Hardware Reliability:</strong> 100% uptime on the ESP32 core and all connected I2C sensors over the last 24 hours.</p>
            </li>
          </ul>
        </section>

        <section className="relative z-10">
          <h2 className="text-2xl font-bold border-b-2 border-warning/20 pb-2 mb-6 font-serif">3. Active Warnings</h2>
          <div className="bg-warning/5 border border-warning/20 rounded-2xl p-6">
            <div className="flex gap-4">
              <AlertTriangle className="text-warning flex-shrink-0" />
              <div>
                <h4 className="font-bold text-warning-foreground mb-1">Upcoming Heat Wave</h4>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  Temperatures are expected to rise by 4°C tomorrow afternoon. The AI will pre-emptively adjust the irrigation schedule to hydrate the soil prior to peak evaporation hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10">
          <h2 className="text-2xl font-bold border-b-2 border-primary/20 pb-2 mb-6 font-serif">4. Predictions for Tomorrow</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <TrendingUp className="text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground/80 leading-relaxed"><strong>Water Usage:</strong> Expected to increase by 20% (approx 38L) to combat the forecasted temperature rise.</p>
            </li>
          </ul>
        </section>
        
        <div className="pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground relative z-10">
          <span className="flex items-center gap-2"><FileText size={16} /> Report ID: AS-2026-0614</span>
          <span>Verified by AgriSense Core Engine</span>
        </div>
      </div>
    </div>
  );
}
