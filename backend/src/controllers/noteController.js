const db = require('../models');
const Note = db.Note;
const Trip = db.Trip;
const { sendResponse } = require('../utils/response');

// @desc    Get all notes for a trip
// @route   GET /api/trips/:tripId/notes
// @access  Private
const getNotes = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    const notes = await Note.findAll({
      where: { tripId: req.params.tripId },
      order: [['createdAt', 'DESC']]
    });

    sendResponse(res, 200, true, 'Notes retrieved successfully', { notes });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new note
// @route   POST /api/trips/:tripId/notes
// @access  Private
const createNote = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    const { stopId, content } = req.body;

    const note = await Note.create({
      tripId: req.params.tripId,
      stopId,
      content
    });

    sendResponse(res, 201, true, 'Note created successfully', { note });
  } catch (error) {
    next(error);
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
  try {
    const { content } = req.body;

    // Find note and verify ownership through trip
    const note = await Note.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!note || note.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Note not found');
    }

    await note.update({ content });

    sendResponse(res, 200, true, 'Note updated successfully', { note });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
  try {
    // Find note and verify ownership through trip
    const note = await Note.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!note || note.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Note not found');
    }

    await note.destroy();

    sendResponse(res, 200, true, 'Note deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};