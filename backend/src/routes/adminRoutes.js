const express = require('express');
const { getAnalytics } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.get('/analytics', getAnalytics);

module.exports = router;