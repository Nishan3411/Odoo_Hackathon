const express = require('express');
const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const Activity = require('../models/Activity');
const ChecklistItem = require('../models/ChecklistItem');
const Note = require('../models/Note');
const { sendResponse } = require('../utils/response');

const router = express.Router();

// @desc    Get public trip details
// @route   GET /api/public/trips/:shareId
// @access  Public
const getPublicTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found or not public');
    }

    // Get related data
    const stops = await Stop.find({ tripId: trip._id }).sort({ order: 1 });
    const activities = await Activity.find({ tripId: trip._id }).sort({ date: 1 });
    const checklistCount = await ChecklistItem.countDocuments({ tripId: trip._id });
    const notesCount = await Note.countDocuments({ tripId: trip._id });

    // Calculate budget summary
    const activityCost = activities.reduce((total, activity) => total + (activity.cost || 0), 0);
    const budgetSummary = {
      totalBudget: trip.budget,
      activityCost,
      remainingBudget: trip.budget - activityCost
    };

    const publicTrip = {
      trip: {
        title: trip.title,
        description: trip.description,
        startDate: trip.startDate,
        endDate: trip.endDate,
        coverImage: trip.coverImage
      },
      stops,
      activities,
      budgetSummary,
      checklistCount,
      notesCount
    };

    sendResponse(res, 200, true, 'Public trip retrieved successfully', { trip: publicTrip });
  } catch (error) {
    next(error);
  }
};

router.get('/trips/:shareId', getPublicTrip);

module.exports = router;