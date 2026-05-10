const app = require('./app');
const { connectDB } = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MySQL
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Traveloop Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});