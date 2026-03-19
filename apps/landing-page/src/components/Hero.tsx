"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import GlobeCanvas from "./GlobeCanvas";
import Particles from "./Particles";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <Particles />
      <GlobeCanvas />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-block px-4 py-1.5 rounded-full border border-cyan-vibrant/30 bg-cyan-vibrant/10 text-cyan-vibrant text-xs font-bold tracking-widest uppercase mb-8 neon-glow-cyan"
        >
          Version 2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          Design the <span className="text-gradient">Future</span> <br />
          of Digital Reality
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/60 mb-12 h-8"
        >
          <TypeAnimation
            sequence={[
              "AI-powered blockchain infrastructure.",
              2000,
              "Holographic interface generation.",
              2000,
              "Decentralized cloud computing.",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-cyan-vibrant transition-colors">
            Start Deploying
          </button>
          <button className="w-full sm:w-auto px-10 py-4 rounded-full glass text-white font-bold text-lg hover:border-cyan-vibrant/50">
            View Documentation
          </button>
        </motion.div>
      </div>

      {/* Hero Gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-linear-to-t from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-vibrant/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-vibrant/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
    </section>
  );
}
