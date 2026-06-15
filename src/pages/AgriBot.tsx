import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Sprout, ArrowRight, Activity, TrendingUp, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AgriBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Priyanshi. I am AgriSense AI. I have analyzed your 12 active sensors and today\'s weather forecast. How can I assist with your farm operations today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "Analyze my farm", icon: Activity },
    { label: "Check irrigation status", icon: Droplets },
    { label: "Explain health score", icon: Sprout },
    { label: "Show risk assessment", icon: TrendingUp },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: `Based on the latest telemetry, the system is performing optimally. Regarding "${userMsg}", I recommend maintaining the current automation schedule as soil moisture is at an ideal 68%.` }]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] lg:h-screen bg-background">
      {/* Left Pane: Intelligence Context */}
      <div className="hidden lg:flex w-80 xl:w-96 border-r border-border bg-card/30 flex-col p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-primary" size={20} />
          <h2 className="font-bold text-lg">Intelligence Center</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Suggested Queries</h3>
            <div className="flex flex-col gap-2">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(action.label)}
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-muted/50 transition-all text-sm font-medium text-left group"
                >
                  <span className="flex items-center gap-2 text-foreground/80 group-hover:text-foreground">
                    <action.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    {action.label}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <Activity size={12} /> Active Context
            </h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              AgriBot has access to live telemetry from 12 sensors, 30-day historical data, and predictive models for crop yield.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane: Chat Interface */}
      <div className="flex-1 flex flex-col relative max-w-4xl mx-auto w-full">
        {/* Chat Header for Mobile */}
        <div className="lg:hidden flex items-center gap-2 p-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
          <Sparkles className="text-primary" size={20} />
          <h2 className="font-bold text-lg">AgriSense AI</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-none">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'assistant' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={cn(
                "px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                msg.role === 'user' ? "bg-foreground text-background rounded-tr-sm" : "bg-card border border-border rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex gap-4 max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot size={18} />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-card border border-border rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-background">
          <div className="relative max-w-3xl mx-auto flex items-end gap-2 bg-card border border-border rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask AgriSense AI anything..."
              className="w-full bg-transparent p-3 outline-none resize-none min-h-[44px] max-h-32 text-sm placeholder:text-muted-foreground/70 scrollbar-none"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-3 font-medium">AgriSense AI can make mistakes. Verify critical actions before applying them to physical hardware.</p>
        </div>
      </div>
    </div>
  );
}
