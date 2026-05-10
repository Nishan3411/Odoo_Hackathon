const express = require('express');
const { generateSummary, generateRecommendations, generateBudgetTips } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.post('/summary', generateSummary);
router.post('/recommend', generateRecommendations);
router.post('/budget-tips', generateBudgetTips);

module.exports = router;