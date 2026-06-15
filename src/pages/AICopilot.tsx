import { useState } from 'react';
import { Cpu, FlaskConical, Droplets, Thermometer, Wind, Database, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AICopilot() {
  const [temp, setTemp] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [moisture, setMoisture] = useState(70);
  const [tank, setTank] = useState(80);

  const healthScore = Math.max(0, Math.min(100, 100 - Math.abs(25 - temp) * 2 - Math.abs(60 - humidity) * 0.5 - (100 - moisture) * 0.3));

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-8 pb-32">
      <header className="border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Cpu size={14} /> AI Copilot Engine
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">Farm Analyst</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
          Advanced scenario modeling and predictive risk assessment. Run simulations to optimize resource allocation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold">Top Recommendations</h2>
          
          <RecommendationAccordion 
            title="Refill water tank within 24 hours"
            impact="Possible irrigation interruption within 48 hours."
            confidence={93}
            severity="warning"
            reasoning="The predictive model indicates that the tank levels are declining 15% faster than the 30-day moving average due to sustained high temperatures. Current capacity (80%) will not support the next 3 scheduled irrigation cycles without entering the critical red-zone threshold."
          />
          
          <RecommendationAccordion 
            title="Maintain current automation schedule"
            impact="Optimal crop hydration and energy saving."
            confidence={98}
            severity="success"
            reasoning="Soil moisture is perfectly aligned with the target curve for this growth stage. There is no need to override the ESP32 automated relays. The AI predicts a 12% energy saving by avoiding manual pump triggers today."
          />

          <h2 className="text-xl font-bold mt-12">Predicted Risks & Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RiskCard title="Heat Stress Risk" desc="Low probability for the next 72 hours based on weather forecast." type="success" />
            <RiskCard title="Water Waste Opportunity" desc="Delaying evening irrigation by 1 hour could save 5L of water due to lower evaporation." type="info" />
          </div>
        </div>

        {/* Right Column: Simulator */}
        <div className="lg:col-span-5">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FlaskConical className="text-accent" /> What-If Simulator
              </h3>
              <span className="text-2xl font-bold text-primary">{Math.round(healthScore)}<span className="text-sm text-muted-foreground font-normal">/100</span></span>
            </div>
            
            <div className="space-y-8">
              <SliderControl icon={Thermometer} label="Temperature (°C)" value={temp} setValue={setTemp} min={10} max={50} />
              <SliderControl icon={Wind} label="Humidity (%)" value={humidity} setValue={setHumidity} min={0} max={100} />
              <SliderControl icon={Droplets} label="Soil Moisture (%)" value={moisture} setValue={setMoisture} min={0} max={100} />
              <SliderControl icon={Database} label="Water Tank (%)" value={tank} setValue={setTank} min={0} max={100} />
            </div>

            <div className="mt-10 p-4 bg-muted/50 rounded-2xl border border-border/50">
              <p className="text-sm font-medium text-muted-foreground mb-2">Simulated Outcome</p>
              <div className="flex items-center gap-3">
                <ArrowRight size={16} className="text-primary" />
                <span className="font-semibold text-sm">
                  {healthScore < 50 ? "Critical yield reduction predicted." : healthScore < 80 ? "Sub-optimal growth efficiency." : "Excellent growth trajectory."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationAccordion({ title, impact, confidence, severity, reasoning }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const isWarning = severity === 'warning';

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition-colors hover:border-border/80">
      <div 
        className="p-6 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-xl flex-shrink-0 ${isWarning ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
            {isWarning ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
          </div>
          <div>
            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1"><strong>Impact:</strong> {impact}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="text-right">
            <div className="text-sm font-bold">{confidence}%</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</div>
          </div>
          <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-muted/30 border-t border-border/50"
          >
            <div className="p-6 text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground block mb-2">Why this recommendation?</strong>
              {reasoning}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RiskCard({ title, desc, type }: any) {
  return (
    <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-success' : 'bg-primary'}`} />
        {title}
      </h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function SliderControl({ icon: Icon, label, value, setValue, min, max }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
          <Icon size={16} /> {label}
        </label>
        <span className="text-sm font-bold px-3 py-1 bg-muted rounded-lg">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}
