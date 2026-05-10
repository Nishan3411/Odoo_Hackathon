const db = require('../models');
const ChecklistItem = db.ChecklistItem;
const Trip = db.Trip;
const { sendResponse } = require('../utils/response');

// @desc    Get all checklist items for a trip
// @route   GET /api/trips/:tripId/checklist
// @access  Private
const getChecklist = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    const checklist = await ChecklistItem.findAll({
      where: { tripId: req.params.tripId },
      order: [['createdAt', 'DESC']]
    });

    sendResponse(res, 200, true, 'Checklist retrieved successfully', { checklist });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new checklist item
// @route   POST /api/trips/:tripId/checklist
// @access  Private
const createChecklistItem = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    const { item, category, packed } = req.body;

    const checklistItem = await ChecklistItem.create({
      tripId: req.params.tripId,
      item,
      category,
      packed
    });

    sendResponse(res, 201, true, 'Checklist item created successfully', { checklistItem });
  } catch (error) {
    next(error);
  }
};

// @desc    Update checklist item
// @route   PUT /api/checklist/:id
// @access  Private
const updateChecklistItem = async (req, res, next) => {
  try {
    const { item, category, packed } = req.body;

    // Find checklist item and verify ownership through trip
    const checklistItem = await ChecklistItem.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!checklistItem || checklistItem.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Checklist item not found');
    }

    await checklistItem.update({ item, category, packed });

    sendResponse(res, 200, true, 'Checklist item updated successfully', { checklistItem });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete checklist item
// @route   DELETE /api/checklist/:id
// @access  Private
const deleteChecklistItem = async (req, res, next) => {
  try {
    // Find checklist item and verify ownership through trip
    const checklistItem = await ChecklistItem.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!checklistItem || checklistItem.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Checklist item not found');
    }

    await checklistItem.destroy();

    sendResponse(res, 200, true, 'Checklist item deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChecklist,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem
};