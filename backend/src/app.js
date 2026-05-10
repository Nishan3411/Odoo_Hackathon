const express = require('express');
const cors = require('cors');

const app = express();

// CORS middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:4173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS policy: origin not allowed'))
    }
  },
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/stops', require('./routes/stopRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/checklist', require('./routes/checklistRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // For analytics
app.use('/api/public', require('./routes/publicRoutes')); // For public sharing

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Traveloop Backend is healthy!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use(require('./middleware/errorMiddleware'));

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;