// EcoLearn_CORE High-Fidelity Mock Data System v1.1
// This file serves as the single source of truth for the EcoLearn Demo Mode.

export const MOCK_ADMIN = {
  uid: 'ecolearn-admin-01',
  email: 'admin@ecolearn.in',
  first_name: 'Admin',
  last_name: '(Demo User)',
  role: 'admin',
  level: 99,
  xp: 1000000,
  rank: 1,
  badges: ['eco-leader', 'system-master'],
  impact: { trees: 1000, water: 50000, waste: 2000, co2: 12000 }
};

export const MOCK_SAIYAM = {
  uid: 'ecolearn-user-02',
  email: 'saiyam@ecolearn.in',
  first_name: 'Saiyam',
  last_name: 'Jain',
  role: 'student',
  level: 18,
  xp: 152400,
  rank: 4,
  badges: ['green-thumb', 'water-saver', 'waste-warrior', 'solar-pioneer'],
  impact: {
    trees: 56,
    water: 4200, 
    waste: 120,    
    co2: 850      
  },
  stats: {
      velocity: '+18%',
      survival_streak: '12 DAYS',
      monthly_xp: [3400, 4100, 3800, 5200, 4900, 6100, 5800, 7200, 6500, 8100, 7800, 9200]
  }
};

export const MOCK_USER = MOCK_ADMIN; // Default for prototype preview

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
    { from: 'Uplink #404', to: 'EcoLearn_Core', action: 'Node synchronization success', time: '5h ago' },
    { from: 'KV No. 1', to: 'St. Joseph', action: 'Exchanged 1.2k Water Credits', time: '8h ago' },
    { from: 'Eco Wizards', to: 'Earth First', action: 'Traded 300 Saplings', time: '10h ago' },
    { from: 'St. Marys', to: 'DPS Bhopal', action: 'Merged Alliances', time: '12h ago' },
    { from: 'EcoLearn_Uplink', to: 'Sagar Public', action: 'Achievement: Zero Waste Campus', time: 'Yesterday' },
    { from: 'Indore North', to: 'Central India Hub', action: 'Pushed 1.5MW Surplus Energy', time: 'Yesterday' },
];

export const MOCK_SUBMISSIONS = [
  {
    id: 1,
    user: { first_name: 'Aryan', last_name: 'Jain', username: 'aryan' },
    challenge: { title: 'Plant a Sapling', category: 'Plant', points_reward: 150 },
    proof_image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'pending'
  },
  {
    id: 2,
    user: { first_name: 'Sanya', last_name: 'Malhotra', username: 'sanya' },
    challenge: { title: 'Compost Waste', category: 'Waste', points_reward: 200 },
    proof_image_url: 'https://images.unsplash.com/photo-1591193520257-c030ea85780c?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'pending'
  },
  {
    id: 3,
    user: { first_name: 'Rahul', last_name: 'Sharma', username: 'rahul' },
    challenge: { title: 'Save Water', category: 'Water', points_reward: 100 },
    proof_image_url: 'https://images.unsplash.com/photo-1548932813-7da36bbd926a?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: 'approved'
  },
  {
    id: 4,
    user: { first_name: 'Priya', last_name: 'Verma', username: 'priya' },
    challenge: { title: 'Solar Pulse Sync', category: 'Energy', points_reward: 300 },
    proof_image_url: 'https://images.unsplash.com/photo-1509391366360-fe5bb5858345?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: 'pending'
  },
  {
    id: 5,
    user: { first_name: 'Ishaan', last_name: 'Singh', username: 'ishaan' },
    challenge: { title: 'Bio-Logician', category: 'Plant', points_reward: 180 },
    proof_image_url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    status: 'pending'
  },
  {
    id: 6,
    user: { first_name: 'Meera', last_name: 'Patel', username: 'meera' },
    challenge: { title: 'Plastic Purge', category: 'Waste', points_reward: 220 },
    proof_image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    status: 'approved'
  },
  {
    id: 7,
    user: { first_name: 'Aditya', last_name: 'Rao', username: 'aditya' },
    challenge: { title: 'Energy Phantom', category: 'Energy', points_reward: 120 },
    proof_image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: 'rejected'
  },
  {
    id: 8,
    user: { first_name: 'Kavya', last_name: 'Nair', username: 'kavya' },
    challenge: { title: 'Rain Guard', category: 'Water', points_reward: 400 },
    proof_image_url: 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: 'approved'
  },
  {
    id: 9,
    user: { first_name: 'Rohan', last_name: 'Deshmukh', username: 'rohan' },
    challenge: { title: 'Seed Master', category: 'Plant', points_reward: 350 },
    proof_image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    status: 'pending'
  },
  {
    id: 10,
    user: { first_name: 'Ananya', last_name: 'Bhatt', username: 'ananya' },
    challenge: { title: 'Green Cycle', category: 'Waste', points_reward: 180 },
    proof_image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    status: 'rejected'
  }
];

export const MOCK_STUDENTS = [
  { id: 1,  name: 'Aryan Jain',        class_grade: 'X-B',   eco_points_total: 4240,  challenges_done: 32, last_active: '2026-03-19T10:30:00Z' },
  { id: 2,  name: 'Sanya Malhotra',    class_grade: 'IX-A',  eco_points_total: 3800,  challenges_done: 28, last_active: '2026-03-18T15:45:00Z' },
  { id: 3,  name: 'Rahul Sharma',      class_grade: 'X-B',   eco_points_total: 3560,  challenges_done: 25, last_active: '2026-03-19T09:12:00Z' },
  { id: 4,  name: 'Priya Verma',       class_grade: 'VIII-C', eco_points_total: 3210,  challenges_done: 22, last_active: '2026-03-17T11:20:00Z' },
  { id: 5,  name: 'Ishaan Singh',      class_grade: 'X-A',   eco_points_total: 2980,  challenges_done: 19, last_active: '2026-03-19T12:05:00Z' },
  { id: 6,  name: 'Neha Gupta',        class_grade: 'VII-B', eco_points_total: 2650,  challenges_done: 18, last_active: '2026-03-16T14:30:00Z' },
  { id: 7,  name: 'Kunal Kapoor',      class_grade: 'IX-C',  eco_points_total: 2480,  challenges_done: 16, last_active: '2026-03-15T09:00:00Z' },
  { id: 8,  name: 'Tanvi Shah',        class_grade: 'VIII-A', eco_points_total: 2320,  challenges_done: 14, last_active: '2026-03-19T08:15:00Z' },
  { id: 9,  name: 'Vikram Kaushal',    class_grade: 'X-A',   eco_points_total: 2190,  challenges_done: 13, last_active: '2026-03-18T16:20:00Z' },
  { id: 10, name: 'Saira Khan',        class_grade: 'XII-C', eco_points_total: 2050,  challenges_done: 12, last_active: '2026-03-17T10:45:00Z' },
  { id: 11, name: 'Meera Patel',       class_grade: 'XI-A',  eco_points_total: 1920,  challenges_done: 11, last_active: '2026-03-19T07:30:00Z' },
  { id: 12, name: 'Aditya Rao',        class_grade: 'IX-B',  eco_points_total: 1780,  challenges_done: 10, last_active: '2026-03-18T13:15:00Z' },
  { id: 13, name: 'Kavya Nair',        class_grade: 'X-C',   eco_points_total: 1640,  challenges_done: 9,  last_active: '2026-03-17T09:45:00Z' },
  { id: 14, name: 'Rohan Deshmukh',    class_grade: 'VIII-B', eco_points_total: 1520,  challenges_done: 8,  last_active: '2026-03-16T11:30:00Z' },
  { id: 15, name: 'Ananya Bhatt',      class_grade: 'VII-A', eco_points_total: 1380,  challenges_done: 7,  last_active: '2026-03-19T14:20:00Z' },
  { id: 16, name: 'Dev Rathore',       class_grade: 'XI-B',  eco_points_total: 1250,  challenges_done: 6,  last_active: '2026-03-15T16:45:00Z' },
  { id: 17, name: 'Shruti Iyer',       class_grade: 'X-A',   eco_points_total: 1120,  challenges_done: 5,  last_active: '2026-03-18T08:00:00Z' },
  { id: 18, name: 'Harsh Pandey',      class_grade: 'IX-A',  eco_points_total: 980,   challenges_done: 5,  last_active: '2026-03-14T12:30:00Z' },
  { id: 19, name: 'Riya Choudhary',    class_grade: 'VIII-C', eco_points_total: 840,   challenges_done: 4,  last_active: '2026-03-19T10:00:00Z' },
  { id: 20, name: 'Aman Tripathi',     class_grade: 'XII-A', eco_points_total: 720,   challenges_done: 3,  last_active: '2026-03-13T15:20:00Z' },
];

export const MOCK_LEADERBOARD = [
    { name: 'DPS Bhopal', points: 42850, students: 412, color: '#2D5A27' },
    { name: 'Kendriya Vidyalaya S4', points: 38200, students: 385, color: '#E8573A' },
    { name: 'Sagar Public School', points: 31450, students: 298, color: '#F4A07A' },
    { name: 'Campian School', points: 28900, students: 256, color: '#00F2FE' },
    { name: 'St. Joseph Co-ed', points: 24500, students: 210, color: '#0891B2' },
    { name: 'Billabong High', points: 21200, students: 185, color: '#10B981' },
    { name: 'Mount Carmel', points: 19800, students: 160, color: '#F59E0B' },
    { name: 'Sanskar Valley', points: 17500, students: 142, color: '#06B6D4' },
    { name: 'Holy Family', points: 15100, students: 120, color: '#F97316' },
    { name: 'Ryan International', points: 12400, students: 95, color: '#00F2FE' },
];
