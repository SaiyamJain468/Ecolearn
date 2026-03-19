import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GlassCard from "@/components/GlassCard";
import { Cpu, Shield, Zap, Globe } from "lucide-react";

const stats = [
  { icon: Cpu, label: "Core Speed", value: "3.8 GHz", color: "cyan" as const },
  { icon: Shield, label: "Security", value: "Level 10", color: "purple" as const },
  { icon: Zap, label: "Latency", value: "0.4 ms", color: "cyan" as const },
  { icon: Globe, label: "Network", value: "Global", color: "purple" as const },
];

export default function Home() {
  return (
    <main className="bg-dark-bg min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">System Performance</h2>
          <p className="text-white/40">Real-time metrics from the Nebula edge nodes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <GlassCard key={i} glowColor={stat.color} className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-2xl mb-6 ${stat.color === 'cyan' ? 'bg-cyan-vibrant/10 text-cyan-vibrant' : 'bg-purple-vibrant/10 text-purple-vibrant'}`}>
                <stat.icon size={32} />
              </div>
              <p className="text-white/40 text-sm font-mono uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Footer-like Banner Area */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-vibrant/5 to-transparent pointer-events-none" />
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to sync with the nebula?</h3>
        <button className="px-12 py-5 rounded-full bg-linear-to-r from-cyan-vibrant to-purple-vibrant text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.4)]">
          Initialize Uplink
        </button>
      </section>

      {/* Waving header banner equivalent / decorative separator */}
      <div className="w-full h-1 bg-linear-to-r from-transparent via-cyan-vibrant to-transparent opacity-30 blur-sm" />
    </main>
  );
}
