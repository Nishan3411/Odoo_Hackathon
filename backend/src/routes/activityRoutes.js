const express = require('express');
const { getActivities, createActivity, updateActivity, deleteActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/stops/:stopId/activities')
  .get(validateObjectId, getActivities)
  .post(validateObjectId, createActivity);

router.route('/:id')
  .put(validateObjectId, updateActivity)
  .delete(validateObjectId, deleteActivity);

module.exports = router;