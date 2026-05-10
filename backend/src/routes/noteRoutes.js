const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/trips/:tripId/notes')
  .get(validateObjectId, getNotes)
  .post(validateObjectId, createNote);

router.route('/:id')
  .put(validateObjectId, updateNote)
  .delete(validateObjectId, deleteNote);

module.exports = router;