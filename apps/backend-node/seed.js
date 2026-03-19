const mongoose = require('mongoose');
const Student = require('./src/models/Student');
const Submission = require('./src/models/Submission');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecolearn');
    console.log('>>> GAIA_SEEDING_INITIALIZED');

    // Clear existing
    await Student.deleteMany({});
    await Submission.deleteMany({});

    // Seed Students
    const student1 = await Student.create({
      uid: 'gaia-user-01',
      first_name: 'ARYAN',
      email: 'aryan@gaia.com',
      password: 'password123',
      role: 'student',
      eco_points_total: 124500,
      streak_days: 7,
      level: 14,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan'
    });

    const student2 = await Student.create({
        uid: 'gaia-user-02',
        first_name: 'ZARA',
        email: 'zara@gaia.com',
        password: 'password123',
        role: 'student',
        eco_points_total: 98200,
        streak_days: 12,
        level: 11,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zara'
    });

    // Seed Submissions (Missions)
    await Submission.create([
      {
        student: student1._id,
        challenge_id: 'solar-audit-01',
        challenge_title: 'Home Solar Audit',
        category: 'ENERGY',
        description: 'Verified solar panel efficiency for household grid.',
        status: 'approved',
        evidence_url: 'https://example.com/solar.jpg',
        eco_points_awarded: 500
      },
      {
        student: student1._id,
        challenge_id: 'reforest-01',
        challenge_title: 'Community Reforest',
        category: 'PLANT',
        description: 'Planted 5 native saplings in school territory.',
        status: 'approved',
        evidence_url: 'https://example.com/trees.jpg',
        eco_points_awarded: 1200
      },
      {
        student: student2._id,
        challenge_id: 'water-save-01',
        challenge_title: 'Hydro-Efficiency Check',
        category: 'WATER',
        description: 'Installed low-flow aerators in school facilities.',
        status: 'pending',
        evidence_url: 'https://example.com/water.jpg'
      }
    ]);

    console.log('>>> GAIA_SEEDING_COMPLETE');
    process.exit();
  } catch (err) {
    console.error('>>> GAIA_SEEDING_FAILURE:', err);
    process.exit(1);
  }
};

seedData();
