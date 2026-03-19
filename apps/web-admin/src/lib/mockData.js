// GAIA_CORE High-Fidelity Mock Data System v1.1
// This file serves as the single source of truth for the GAIA Demo Mode.

export const MOCK_USER = {
  uid: 'gaia-admin-01',
  email: 'gaia.admin@ecolearn.in',
  first_name: 'ARYAN',
  last_name: 'SHARMA',
  role: 'student',
  level: 14,
  xp: 124500,
  rank: 2,
  badges: ['green-thumb', 'water-saver', 'waste-warrior', 'solar-pioneer', 'eco-leader'],
  impact: {
    trees: 42,
    water: 1250, // Liters
    waste: 85,    // KG
    co2: 450      // KG offset
  },
  stats: {
      velocity: '+12%',
      survival_streak: '7 DAYS',
      monthly_xp: [2400, 3100, 2800, 4200, 3900, 5100, 4800, 6200, 5500, 7100, 6800, 8200]
  }
};

export const MOCK_LOGS = [
  { id: 1,  type: 'ECO',      message: 'Completed waste segregation mission',       time: '10:00', status: 'success', xp: 150 },
  { id: 2,  type: 'NODE',     message: 'Quiz passed — Biodiversity Basics',          time: '09:45', status: 'success', xp: 90  },
  { id: 3,  type: 'ECO',      message: 'Badge unlocked: Solar Pioneer ⚡',           time: '09:20', status: 'success', xp: 200 },
  { id: 4,  type: 'NETWORK',  message: 'Joined alliance: Green Guardians',           time: '08:55', status: 'info',    xp: null },
  { id: 5,  type: 'ECO',      message: 'Carbon Guardian Alpha — submitted proof',    time: '08:30', status: 'warning', xp: null },
  { id: 6,  type: 'ECO',      message: 'Daily check-in streak bonus claimed',        time: '08:00', status: 'success', xp: 50  },
  { id: 7,  type: 'SYSTEM',   message: 'Hydraulic Master approved by teacher',       time: '07:45', status: 'success', xp: 850 },
  { id: 8,  type: 'ALERT',    message: 'Low XP velocity — complete 1 more mission',  time: '07:30', status: 'warning', xp: null },
  { id: 9,  type: 'NODE',     message: 'Bio-Logician mission started',               time: '07:00', status: 'info',    xp: null },
  { id: 10, type: 'ADMIN',    message: 'School rank updated: #1 → #1 (maintained)', time: '06:00', status: 'info',    xp: null },
  { id: 11, type: 'SYSTEM',   message: 'Atmospheric telemetry sync: 100%',           time: '05:45', status: 'success', xp: null },
  { id: 12, type: 'ECO',      message: 'Planting_Protocol: 400 new saplings detected',time:'05:20', status: 'success', xp: null },
  { id: 13, type: 'NODE',     message: 'Ujjain_Nexus: Latency 0.4ms',                time: '05:00', status: 'success', xp: null },
  { id: 14, type: 'ADMIN',    message: 'Leaderboard recalibration in progress',      time: '04:00', status: 'info',    xp: null },
  { id: 15, type: 'SYSTEM',   message: 'Night_Mode: Power conservation active',      time: '03:45', status: 'info',    xp: null },
  { id: 16, type: 'ECO',      message: 'Solar Pulse Sync efficiency: 98.4%',         time: 'Yesterday', status: 'success', xp: 300 },
  { id: 17, type: 'NETWORK',  message: 'New trade offer from DPS Indore',            time: 'Yesterday', status: 'info',    xp: null },
  { id: 18, type: 'ECO',      message: 'Rainwater collector maintenance done',       time: 'Yesterday', status: 'success', xp: 120 },
  { id: 19, type: 'SYSTEM',   message: 'Biometric login successful',                 time: '2 days ago', status: 'success', xp: null },
  { id: 20, type: 'ALERT',    message: 'Extreme Heat Warning: Adjust watering schedule', time: '2 days ago', status: 'warning', xp: null },
];

export const MOCK_MISSIONS = [
  { id: 'm1', title: 'Carbon Guardian Alpha', category: 'plant', xp: 1200, time: '3 HR', difficulty: 3, status: 'available', description: 'Plant 5 native saplings in your designated school zone. GPS verify every 1 meter.' },
  { id: 'm2', title: 'Hydraulic Master', category: 'water', xp: 850, time: '1 HR', difficulty: 1, status: 'available', description: 'Audit all school taps for leaks. Report secondary flow rates.' },
  { id: 'm3', title: 'Waste Entropy Zero', category: 'waste', xp: 1500, time: '4 HR', difficulty: 2, status: 'pending', description: 'Collect and segregate 10KG of plastic waste. Photo evidence required for each bin.' },
  { id: 'm4', title: 'Solar Pulse Sync', category: 'energy', xp: 2000, time: '6 HR', difficulty: 3, status: 'available', description: 'Clean school solar panels and log peak wattage during solar noon.' },
  { id: 'm5', title: 'Bio-Logician', category: 'plant', xp: 950, time: '2 HR', difficulty: 2, status: 'approved', description: 'Identify 10 local bird species. Document with clear imagery.' },
  { id: 'm6', title: 'Plastic Purge', category: 'waste', xp: 1100, time: '3 HR', difficulty: 1, status: 'available', description: 'Coordinate with 5 peers to clear a local drainage zone of plastic.' },
  { id: 'm7', title: 'Greywater Relay', category: 'water', xp: 1800, time: '5 HR', difficulty: 3, status: 'available', description: 'Design a simple filtration system using pebbles and sand for AC water reuse.' },
  { id: 'm8', title: 'Energy Phantom', category: 'energy', xp: 600, time: '1 HR', difficulty: 1, status: 'approved', description: 'Ensure all campus screens are powered off after 6 PM.' },
  { id: 'm9', title: 'Soil Alchemist', category: 'plant', xp: 1300, time: '4 HR', difficulty: 2, status: 'available', description: 'Measure soil PH in 3 different campus zones and suggest bio-fertilizers.' },
  { id: 'm10', title: 'Leaf Logic', category: 'plant', xp: 750, time: '2 HR', difficulty: 1, status: 'available', description: 'Catalog all tree types in the south-west quadrant.' },
  { id: 'm11', title: 'Aqua Pulse', category: 'water', xp: 900, time: '2 HR', difficulty: 2, status: 'available', description: 'Check water quality of the school pond using testing kits.' },
  { id: 'm12', title: 'Watt Watcher', category: 'energy', xp: 1400, time: '3 HR', difficulty: 2, status: 'available', description: 'Record hourly meter readings during school peak hours.' },
  { id: 'm13', title: 'Green Cycle', category: 'waste', xp: 1000, time: '2 HR', difficulty: 1, status: 'available', description: 'Organize a recycling competition between sections.' },
  { id: 'm14', title: 'Seed Master', category: 'plant', xp: 1600, time: '5 HR', difficulty: 3, status: 'available', description: 'Prepare 50 seed balls using organic compost and red soil.' },
  { id: 'm15', title: 'Rain Guard', category: 'water', xp: 2500, time: '8 HR', difficulty: 3, status: 'available', description: 'Install a prototype gutter-diverter for the terrace garden.' },
];

export const MOCK_MAP_NODES = [
    { id: 1, position: [23.2599, 77.4126], label: 'Bhopal_Core_Nexus', status: 'active', strength: 0.9, type: 'BIO_HUB' },
    { id: 2, position: [22.7196, 75.8577], label: 'Indore_Solar_Array', status: 'active', strength: 0.8, type: 'ENERGY_GRID' },
    { id: 3, position: [23.1765, 75.7885], label: 'Ujjain_Water_Sanctuary', status: 'warning', strength: 0.4, type: 'WATER_SYNC' },
    { id: 4, position: [21.1702, 72.8311], label: 'Surat_Waste_Vault', status: 'active', strength: 0.7, type: 'RECYCLE_POINT' },
    { id: 5, position: [26.2183, 78.1828], label: 'Gwalior_Arbor_Net', status: 'active', strength: 0.6, type: 'BIO_HUB' },
    { id: 6, position: [24.5854, 73.7125], label: 'Udaipur_Solar_Relay', status: 'active', strength: 0.9, type: 'ENERGY_GRID' },
    { id: 7, position: [26.8467, 80.9462], label: 'Lucknow_Eco_Logic', status: 'active', strength: 0.5, type: 'BIO_HUB' },
    { id: 8, position: [28.6139, 77.2090], label: 'Delhi_Global_Uplink', status: 'active', strength: 1.0, type: 'NODE_MASTER' },
    { id: 9, position: [19.0760, 72.8777], label: 'Mumbai_Ocean_Guard', status: 'active', strength: 0.8, type: 'WATER_SYNC' },
    { id: 10, position: [12.9716, 77.5946], label: 'Bangalore_Tech_Green', status: 'active', strength: 0.9, type: 'BIO_HUB' },
];

export const MOCK_ANALYTICS = {
    monthly_offset: [
        { month: 'APR', offset: 180 },
        { month: 'MAY', offset: 210 },
        { month: 'JUN', offset: 195 },
        { month: 'JUL', offset: 230 },
        { month: 'AUG', offset: 250 },
        { month: 'SEP', offset: 220 },
        { month: 'OCT', offset: 240 },
        { month: 'NOV', offset: 310 },
        { month: 'DEC', offset: 280 },
        { month: 'JAN', offset: 420 },
        { month: 'FEB', offset: 390 },
        { month: 'MAR', offset: 510 },
    ],
    sector_performance: [
        { subject: 'Planting', A: 120, B: 110, fullMark: 150 },
        { subject: 'Waste', A: 98, B: 130, fullMark: 150 },
        { subject: 'Water', A: 86, B: 130, fullMark: 150 },
        { subject: 'Energy', A: 99, B: 100, fullMark: 150 },
        { subject: 'Alliance', A: 85, B: 90, fullMark: 150 },
    ]
};

export const MOCK_TRADES = [
    { from: 'DPS Bhopal', to: 'Carmel Convent', action: 'Transferred 5,200 Eco-Credits', time: '2m ago' },
    { from: 'Green Guardians', to: 'Solar Sentinels', action: 'Co-sponsored "Mega Reforest"', time: '14m ago' },
    { from: 'Arya Sharma', to: 'Global Fund', action: 'Donated 500 XP to Clean Ocean', time: '1h ago' },
    { from: 'Sagar Public', to: 'DPS Indore', action: 'Leased 12 Solar Arrays', time: '4h ago' },
    { from: 'Uplink #404', to: 'Gaia_Core', action: 'Node synchronization success', time: '5h ago' },
    { from: 'KV No. 1', to: 'St. Joseph', action: 'Exchanged 1.2k Water Credits', time: '8h ago' },
    { from: 'Eco Wizards', to: 'Earth First', action: 'Traded 300 Saplings', time: '10h ago' },
    { from: 'St. Marys', to: 'DPS Bhopal', action: 'Merged Alliances', time: '12h ago' },
    { from: 'Gaia_Uplink', to: 'Sagar Public', action: 'Achievement: Zero Waste Campus', time: 'Yesterday' },
    { from: 'Indore North', to: 'Central India Hub', action: 'Pushed 1.5MW Surplus Energy', time: 'Yesterday' },
];
