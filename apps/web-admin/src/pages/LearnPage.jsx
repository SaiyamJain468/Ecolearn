import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlayCircle, Clock, Star, Lock, X, ChevronRight, CheckCircle2, ArrowLeft, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';

const lessonContent = {
  1: {
    overview: 'Composting is the natural process of recycling organic matter into a valuable fertilizer that enriches soil and plants.',
    sections: [
      { heading: 'What is Composting?', body: 'Composting transforms kitchen scraps, yard waste, and other organic materials into humus — a dark, crumbly, earth-smelling substance. This process is carried out by microorganisms (bacteria, fungi) that break down organic matter in the presence of oxygen.' },
      { heading: 'Why Compost?', body: 'Composting reduces landfill waste by up to 30%, reduces methane emissions, enriches soil with essential nutrients (N-P-K), reduces the need for chemical fertilizers, and helps soil retain moisture up to 6× better.' },
      { heading: 'How to Start', body: '1. Choose a dry, shady spot near a water source.\n2. Add brown materials (twigs, dead leaves) as the first layer.\n3. Alternate between green (wet) and brown (dry) materials.\n4. Keep the pile moist and turn it every 2-3 weeks.\n5. Compost is ready in 2-5 months when it looks dark and crumbly.' },
    ],
    quiz: { q: 'What is the ideal ratio of green to brown materials?', a: '1:3 (one part green to three parts brown)', choices: ['1:1', '1:3', '2:1', '3:1'] },
  },
  2: {
    overview: 'Rainwater harvesting captures and stores rainwater for later use, reducing dependence on municipal supply and groundwater.',
    sections: [
      { heading: 'Basics of Collection', body: 'A typical 1,000 sq ft roof can capture approximately 600 gallons of water per inch of rainfall. Systems range from simple rain barrels to large underground cisterns. The key components are: catchment area (roof), conveyance (gutters/pipes), and storage (tank/barrel).' },
      { heading: 'Filtration Methods', body: 'First-flush diverters discard the initial dirty water. Mesh filters remove leaves and debris. Sand filters handle sediment. UV sterilization treats water for drinking. For irrigation use, basic filtration is usually sufficient.' },
      { heading: 'Applications', body: 'Harvested rainwater can be used for garden irrigation, toilet flushing, laundry, car washing, and with proper treatment, even drinking. A school campus can save 40-60% on water bills using rainwater harvesting.' },
    ],
    quiz: { q: 'How many gallons can a 1,000 sq ft roof capture per inch of rain?', a: '~600 gallons', choices: ['100 gallons', '~600 gallons', '1,000 gallons', '50 gallons'] },
  },
  3: {
    overview: 'Indoor air quality (IAQ) directly impacts health, productivity, and cognitive function in schools and workplaces.',
    sections: [
      { heading: 'Key Pollutants', body: 'Common indoor pollutants include VOCs (from paints, cleaners), CO₂ (from respiration), particulate matter (PM2.5 from cooking, dust), formaldehyde (from furniture), and mold spores. CO₂ levels above 1,000 ppm cause drowsiness and poor concentration.' },
      { heading: 'Measurement', body: 'Use affordable sensors to track CO₂ (ppm), humidity (%), temperature (°C), and PM2.5 (µg/m³). Ideal classroom conditions: CO₂ < 800 ppm, humidity 40-60%, temperature 20-24°C.' },
      { heading: 'Improvement Strategies', body: 'Natural ventilation (open windows 10 min/hour), indoor plants (Snake Plant, Peace Lily absorb VOCs), HEPA air purifiers for PM2.5, low-VOC paints and materials, and regular HVAC maintenance.' },
    ],
    quiz: { q: 'At what CO₂ level does drowsiness typically begin?', a: 'Above 1,000 ppm', choices: ['500 ppm', 'Above 1,000 ppm', '2,000 ppm', '100 ppm'] },
  },
  4: {
    overview: 'Seed bombing is a guerrilla gardening technique that disperses seeds into vacant, degraded, or hard-to-reach land areas.',
    sections: [
      { heading: 'What is a Seed Bomb?', body: 'A seed bomb is a compressed ball of clay, compost, and seeds. The clay protects seeds from birds and harsh conditions, while compost provides initial nutrients. When rain falls, the clay softens and seeds germinate naturally.' },
      { heading: 'Making Seed Bombs', body: '1. Mix 5 parts dry red clay with 1 part compost and 1 part native seeds.\n2. Add water slowly until the mixture holds together.\n3. Roll into marble-sized balls.\n4. Dry in shade for 24-48 hours.\n5. Store in paper bags. Best deployed before monsoon season.' },
      { heading: 'Best Seeds for India', body: 'Neem, Peepal, Banyan (long-term shade), Marigold, Sunflower (quick results), native wildflower mixes for biodiversity. Avoid invasive species. Always use locally sourced, non-GMO seeds.' },
    ],
    quiz: { q: 'What is the ideal ratio for seed bomb ingredients?', a: '5 parts clay : 1 compost : 1 seeds', choices: ['Equal parts', '5:1:1', '3:2:1', '10:1:1'] },
  },
  5: {
    overview: 'Solar energy is the conversion of sunlight into electricity using photovoltaic cells or concentrated solar thermal systems.',
    sections: [
      { heading: 'How Solar Panels Work', body: 'Photovoltaic (PV) cells are made of semiconductor materials (usually silicon). When photons hit the cell, they knock electrons loose, creating an electrical current. A typical panel contains 60-72 cells and produces 250-400 watts.' },
      { heading: 'Types of Solar Systems', body: 'Grid-tied: Connected to the utility grid, excess power is sold back. Off-grid: Requires battery storage, used in remote areas. Hybrid: Combines both with battery backup for outages. School installations are typically grid-tied for cost efficiency.' },
      { heading: 'Maintenance & Efficiency', body: 'Clean panels monthly (dust reduces output by 15-25%). Optimal tilt angle = latitude of location. Peak generation: 10 AM - 3 PM. A 10 kW school rooftop system can save ₹1.5-2 lakhs annually and offset 14 tonnes of CO₂ per year.' },
    ],
    quiz: { q: 'How much can dust reduce solar panel output?', a: '15-25%', choices: ['5%', '15-25%', '50%', '1-2%'] },
  },
  6: {
    overview: 'Carbon credits are tradable certificates representing the right to emit one tonne of CO₂ or equivalent greenhouse gas.',
    sections: [
      { heading: 'How Carbon Markets Work', body: 'Organizations earn carbon credits by reducing emissions below mandatory caps or through voluntary offset projects (reforestation, renewable energy). One credit = 1 tonne CO₂ reduced. Credits can be sold to entities that exceed their emission limits.' },
      { heading: 'Types of Markets', body: 'Compliance markets: Government-regulated (EU ETS, California Cap-and-Trade). Voluntary markets: Organizations and individuals buy credits voluntarily (Gold Standard, Verra). Schools can participate through tree-planting and energy-saving verification programs.' },
      { heading: 'School Carbon Projects', body: 'Calculate your school\'s carbon footprint using emission factors. Implement reduction projects (solar, composting, tree planting). Get third-party verification. Register credits on platforms like Gold Standard. Revenue can fund more green initiatives.' },
    ],
    quiz: { q: 'What does one carbon credit represent?', a: '1 tonne of CO₂ reduced', choices: ['1 kg CO₂', '1 tonne CO₂', '100 kg CO₂', '10 tonnes CO₂'] },
  },
  7: {
    overview: 'Permaculture is a design philosophy that mimics patterns found in natural ecosystems to create sustainable, self-sufficient agricultural systems.',
    sections: [
      { heading: 'Core Principles', body: 'Observe and interact with nature. Catch and store energy. Obtain a yield. Self-regulate and accept feedback. Use renewable resources. Produce no waste. Design from pattern to detail. Integrate rather than segregate.' },
      { heading: 'School Garden Design', body: 'Zone planning: Zone 0 (classroom), Zone 1 (herbs, salad greens near kitchen), Zone 2 (food forest, fruit trees), Zone 3 (field crops, compost). Use companion planting — tomatoes with basil, corn with beans and squash (Three Sisters).' },
      { heading: 'Water & Soil Management', body: 'Swales capture and slow rainwater. Mulching retains moisture and builds soil. Worm bins produce vermicompost. Sheet mulching converts lawn to garden bed. Keyhole gardens maximize space in small areas.' },
    ],
    quiz: { q: 'What is the famous companion planting trio?', a: 'Corn, beans, and squash (Three Sisters)', choices: ['Tomato, basil, pepper', 'Corn, beans, squash', 'Rice, wheat, millet', 'Carrot, onion, garlic'] },
  },
  8: {
    overview: 'Greywater systems recycle wastewater from sinks, showers, and laundry for irrigation and non-potable uses.',
    sections: [
      { heading: 'What is Greywater?', body: 'Greywater is gently used water from bathroom sinks, showers, tubs, and washing machines. It makes up 50-80% of residential wastewater. Unlike blackwater (from toilets), greywater can be safely reused with minimal treatment.' },
      { heading: 'Simple DIY System', body: 'Laundry-to-landscape: Redirect washing machine outflow directly to fruit trees and garden beds via a branched drain. No pump needed if the garden is downhill. Use biodegradable, plant-friendly detergent. Cost: under ₹2,000.' },
      { heading: 'Safety Guidelines', body: 'Don\'t store greywater longer than 24 hours. Don\'t use on root vegetables eaten raw. Avoid greywater from kitchen sinks (too much grease). Use mulch basin distribution to prevent pooling. Rotate irrigation areas.' },
    ],
    quiz: { q: 'How much of home wastewater is greywater?', a: '50-80%', choices: ['10-20%', '30-40%', '50-80%', '90-100%'] },
  },
  9: {
    overview: 'The circular economy eliminates waste by designing products and systems where materials are continuously reused, repaired, and recycled.',
    sections: [
      { heading: 'Linear vs Circular', body: 'Linear economy: Take → Make → Dispose. Circular economy: Make → Use → Return → Remanufacture. The goal is to decouple economic growth from resource consumption. 91% of the world economy is NOT circular — huge opportunity for improvement.' },
      { heading: 'The 5 Rs (In Order)', body: 'Refuse: Say no to what you don\'t need. Reduce: Minimize consumption. Reuse: Use items multiple times. Repurpose: Give items new functions. Recycle: Last resort processing. Only 9% of plastic ever made has been recycled.' },
      { heading: 'School Implementation', body: 'Stationery exchange programs. Uniform donation drives. E-waste collection partnerships. Composting organic cafeteria waste. Refillable water stations. Paper-free digital assignments. Repair cafés for electronics and clothes.' },
    ],
    quiz: { q: 'What percentage of global economy is currently circular?', a: 'Only 9%', choices: ['50%', '25%', 'Only 9%', '75%'] },
  },
  10: {
    overview: 'Wind turbines convert kinetic energy from wind into mechanical power and then into electricity through a generator.',
    sections: [
      { heading: 'How Wind Turbines Work', body: 'Wind turns the blades → blades spin a shaft → shaft connects to a generator → generator produces electricity. Modern turbines start generating at wind speeds of 3-4 m/s (cut-in speed) and shut down above 25 m/s for safety.' },
      { heading: 'Types of Turbines', body: 'Horizontal-axis (HAWT): Most common, large-scale. 3-blade design facing into the wind. Vertical-axis (VAWT): Smaller, works in any wind direction, suitable for urban/school installations. Micro turbines (< 1 kW) can power individual devices.' },
      { heading: 'Wind in India', body: 'India is the 4th largest wind energy producer globally. Major wind corridors: Tamil Nadu, Gujarat, Rajasthan, Karnataka, Maharashtra. Total installed capacity: ~42 GW. Government subsidies available for educational institution installations.' },
    ],
    quiz: { q: 'What is India\'s rank in global wind energy production?', a: '4th largest', choices: ['1st', '2nd', '4th', '10th'] },
  },
};

const lessons = [
  { id: 1, title: 'Introduction to Composting', cat: 'Waste',  dur: '15 min', stars: 4, color: '#F59E0B', xp: 60,  unlocked: true,  done: true  },
  { id: 2, title: 'Rainwater Harvesting',        cat: 'Water',  dur: '20 min', stars: 5, color: '#06B6D4', xp: 90,  unlocked: true,  done: true  },
  { id: 3, title: 'Indoor Air Quality',           cat: 'Energy', dur: '12 min', stars: 3, color: '#F97316', xp: 45,  unlocked: true,  done: false },
  { id: 4, title: 'Seed Bombing Techniques',      cat: 'Plant',  dur: '18 min', stars: 4, color: '#10B981', xp: 75,  unlocked: true,  done: false },
  { id: 5, title: 'Solar Panel Basics',           cat: 'Energy', dur: '25 min', stars: 5, color: '#00F2FE', xp: 120, unlocked: true,  done: false },
  { id: 6, title: 'Carbon Credit Trading',        cat: 'Adv',    dur: '30 min', stars: 5, color: '#0891B2', xp: 150, unlocked: true,  done: false },
  { id: 7, title: 'Permaculture Design',          cat: 'Plant',  dur: '45 min', stars: 5, color: '#10B981', xp: 200, unlocked: true,  done: false },
  { id: 8, title: 'Greywater Systems',            cat: 'Water',  dur: '35 min', stars: 4, color: '#06B6D4', xp: 180, unlocked: true,  done: false },
  { id: 9, title: 'Circular Economy 101',         cat: 'Waste',  dur: '25 min', stars: 4, color: '#F59E0B', xp: 130, unlocked: true,  done: false },
  { id: 10, title: 'Wind Turbine Mechanics',      cat: 'Energy', dur: '50 min', stars: 5, color: '#00F2FE', xp: 250, unlocked: true,  done: false },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const CATS = ['All', 'Plant', 'Water', 'Waste', 'Energy'];

export default function LearnPage() {
  const [sel, setSel] = useState(null);
  const [catFilter, setCatFilter] = useState('All');
  const [viewing, setViewing] = useState(null); // lesson being read
  const [completedIds, setCompletedIds] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('ecolearn_completed_lessons') || '[1,2]'); } catch { return [1, 2]; }
  });
  const [quizAnswer, setQuizAnswer] = useState(null);

  const done = completedIds.length;
  const totalXp = lessons.filter(l => completedIds.includes(l.id)).reduce((a, l) => a + l.xp, 0);

  const filteredLessons = catFilter === 'All' ? lessons : lessons.filter(l => l.cat === catFilter);

  const handleCompleteLesson = (lesson) => {
    if (!completedIds.includes(lesson.id)) {
      const next = [...completedIds, lesson.id];
      setCompletedIds(next);
      sessionStorage.setItem('ecolearn_completed_lessons', JSON.stringify(next));
      toast.success(`+${lesson.xp} XP earned! Lesson complete.`, { icon: '🎓' });
    }
    setViewing(null);
    setQuizAnswer(null);
  };

  // Full lesson viewer
  if (viewing) {
    const content = lessonContent[viewing.id];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Lesson Header */}
        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setViewing(null); setQuizAnswer(null); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={16} className="text-white/60" />
          </motion.button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-accent" style={{ fontSize: '8px', padding: '2px 8px' }}>{viewing.cat}</span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: '#475569' }}><Clock size={10} />{viewing.dur}</span>
            </div>
            <h1 className="text-[22px] font-bold text-white tracking-tight">{viewing.title}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="badge badge-success" style={{ fontSize: '9px', padding: '3px 10px' }}>+{viewing.xp} XP</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${viewing.color}, #00F2FE)` }} />
        </div>

        {/* Overview */}
        <div className="surface p-6">
          <h3 className="text-[14px] font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen size={16} style={{ color: viewing.color }} /> Overview
          </h3>
          <p className="text-[13px] leading-relaxed" style={{ color: '#94A3B8' }}>{content.overview}</p>
        </div>

        {/* Sections */}
        {content.sections.map((sec, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="surface p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold"
                style={{ background: `${viewing.color}15`, color: viewing.color }}>{i + 1}</div>
              <h3 className="text-[14px] font-bold text-white">{sec.heading}</h3>
            </div>
            <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: '#94A3B8' }}>{sec.body}</p>
          </motion.div>
        ))}

        {/* Quick Quiz */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="surface p-6" style={{ border: `1px solid ${viewing.color}20` }}>
          <h3 className="text-[14px] font-bold text-white mb-1 flex items-center gap-2">
            <Award size={16} style={{ color: '#FBBF24' }} /> Quick Check
          </h3>
          <p className="text-[12px] mb-4" style={{ color: '#64748B' }}>{content.quiz.q}</p>
          <div className="grid grid-cols-2 gap-2">
            {content.quiz.choices.map((c, i) => {
              const isCorrect = c === content.quiz.a;
              const isSelected = quizAnswer === c;
              return (
                <motion.button key={i} whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setQuizAnswer(c);
                    if (isCorrect) toast.success('Correct! 🎯');
                    else toast.error('Not quite — try again!');
                  }}
                  className="px-4 py-3 rounded-xl text-[11px] font-semibold text-left transition-all cursor-pointer"
                  style={{
                    background: isSelected ? (isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)') : 'rgba(255,255,255,0.04)',
                    border: isSelected ? (isCorrect ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(239,68,68,0.4)') : '1px solid rgba(255,255,255,0.08)',
                    color: isSelected ? (isCorrect ? '#10B981' : '#EF4444') : '#94A3B8',
                  }}>
                  {c}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Complete Button */}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="btn-primary w-full" style={{ padding: '14px', fontSize: '14px' }}
          onClick={() => handleCompleteLesson(viewing)}>
          {completedIds.includes(viewing.id) ? '✅ Lesson Already Completed — Review Done' : `Complete Lesson · +${viewing.xp} XP`}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Learning Hub</h1>
          <p className="text-[12px] mt-0.5" style={{ color: '#64748B' }}>{done} of {lessons.length} lessons completed · {totalXp} XP earned from lessons</p>
        </div>
        {/* Tab filter */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {CATS.map(c => (
            <motion.button key={c} onClick={() => setCatFilter(c)} whileTap={{ scale: 0.96 }}
              className="px-3 py-[6px] rounded-lg text-[11px] font-semibold transition-all cursor-pointer relative"
              style={{ color: catFilter === c ? 'white' : '#64748B' }}>
              {catFilter === c && <motion.div layoutId="ltab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, #0891B2, #00F2FE)' }} />}
              <span className="relative z-10">{c}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((l) => {
          const isDone = completedIds.includes(l.id);
          return (
            <motion.div key={l.id} variants={fadeUp}
              whileHover={{ y: -4 }}
              onClick={() => setViewing(l)}
              className="surface p-5 flex flex-col h-full cursor-pointer"
              style={{ transition: 'all 0.25s ease' }}
            >
              <div className="flex justify-between items-start mb-4">
                <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}12` }}>
                  <PlayCircle size={18} style={{ color: l.color }} />
                </motion.div>
                {isDone && <CheckCircle2 size={16} style={{ color: '#10B981' }} />}
              </div>
              <h3 className="text-[14px] font-semibold text-white mb-1 group-hover:text-[#22D3EE] transition-colors">{l.title}</h3>
              <p className="text-[10px] mb-auto" style={{ color: '#475569' }}>{lessonContent[l.id]?.overview?.substring(0, 80)}...</p>
              <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: '#475569' }}><Clock size={10} />{l.dur}</span>
                <span className="badge badge-accent" style={{ fontSize: '8px', padding: '1px 7px' }}>+{l.xp} XP</span>
                <div className="flex ml-auto">{Array.from({ length: 5 }, (_, j) => <Star key={j} size={9} style={{ color: j < l.stars ? '#F59E0B' : 'rgba(255,255,255,0.1)', fill: j < l.stars ? '#F59E0B' : 'transparent' }} />)}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
