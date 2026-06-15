import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const data = [
  { time: '00:00', moisture: 60, temp: 22, water: 0 },
  { time: '04:00', moisture: 58, temp: 21, water: 0 },
  { time: '08:00', moisture: 55, temp: 25, water: 10 },
  { time: '12:00', moisture: 75, temp: 30, water: 0 },
  { time: '16:00', moisture: 68, temp: 28, water: 0 },
  { time: '20:00', moisture: 65, temp: 24, water: 0 },
  { time: '24:00', moisture: 62, temp: 22, water: 0 },
];

export default function Analytics() {
  const [filter, setFilter] = useState('24h');

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Executive Analytics
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">Telemetry & Performance</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted p-1 rounded-xl">
            {['24h', '7d', '30d', 'Custom'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all", filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="bg-card border border-border p-2 rounded-xl text-muted-foreground hover:text-foreground shadow-sm">
            <Download size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard 
          title="Soil Moisture Trends" 
          dataKey="moisture" 
          color="hsl(var(--primary))" 
          fill="url(#colorMoisture)"
        />
        <ChartCard 
          title="Ambient Temperature" 
          dataKey="temp" 
          color="hsl(var(--warning))" 
          fill="url(#colorTemp)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MiniStatCard title="Total Water Consumption" value="142L" desc="-12% from last week" good />
        <MiniStatCard title="System Efficiency" value="98.4%" desc="Optimal operational state" good />
        <MiniStatCard title="Sensor Reliability" value="99.9%" desc="0 missed pings in 24h" good />
      </div>
    </div>
  );
}

function ChartCard({ title, dataKey, color, fill }: any) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <button className="text-muted-foreground hover:text-foreground"><Filter size={18} /></button>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fillOpacity={1} fill={fill} activeDot={{ r: 6, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MiniStatCard({ title, value, desc, good }: any) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <h4 className="text-sm font-semibold text-muted-foreground mb-2">{title}</h4>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={cn("text-xs font-semibold px-2 py-1 inline-block rounded-md", good ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive")}>
        {desc}
      </div>
    </div>
  );
}
