const express = require('express');
const { getBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.get('/trips/:tripId/budget', validateObjectId, getBudget);

module.exports = router;