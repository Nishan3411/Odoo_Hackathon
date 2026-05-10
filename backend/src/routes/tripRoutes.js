const express = require('express');
const { getTrips, getTrip, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
  .get(getTrips)
  .post(createTrip);

router.route('/:id')
  .get(validateObjectId, getTrip)
  .put(validateObjectId, updateTrip)
  .delete(validateObjectId, deleteTrip);

module.exports = router;