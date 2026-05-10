const express = require('express');
const { getChecklist, createChecklistItem, updateChecklistItem, deleteChecklistItem } = require('../controllers/checklistController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/trips/:tripId/checklist')
  .get(validateObjectId, getChecklist)
  .post(validateObjectId, createChecklistItem);

router.route('/:id')
  .put(validateObjectId, updateChecklistItem)
  .delete(validateObjectId, deleteChecklistItem);

module.exports = router;