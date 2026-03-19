const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecolearn');
    console.log('>>> GAIA_DATABASE_UPLINK_SUCCESS');
  } catch (err) {
    console.error('>>> GAIA_DATABASE_UPLINK_CRITICAL_FAILURE:', err.message);
    process.exit(1);
  }
};

connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'GAIA_OS_BACKEND_ONLINE', version: '1.0.0-SINGULARITY' });
});

// Import Routes
const studentRoutes = require('./routes/students');
const submissionRoutes = require('./routes/submissions');

app.use('/api/students', studentRoutes);
app.use('/api/submissions', submissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`>>> GAIA_CORE_LISTENING_ON_PORT_${PORT}`);
});
