const express = require('express');
const { getStops, createStop, updateStop, deleteStop } = require('../controllers/stopController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/trips/:tripId/stops')
  .get(validateObjectId, getStops)
  .post(validateObjectId, createStop);

router.route('/:id')
  .put(validateObjectId, updateStop)
  .delete(validateObjectId, deleteStop);

module.exports = router;