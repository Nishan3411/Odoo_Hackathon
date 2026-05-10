const db = require('../models');
const Activity = db.Activity;
const Trip = db.Trip;
const { sendResponse } = require('../utils/response');

// @desc    Get all activities for a stop
// @route   GET /api/stops/:stopId/activities
// @access  Private
const getActivities = async (req, res, next) => {
  try {
    // Verify stop belongs to user's trip
    const activities = await Activity.findAll({
      where: { stopId: req.params.stopId },
      include: [{ model: Trip, as: 'trip' }],
      order: [['date', 'ASC'], ['time', 'ASC']]
    });

    if (activities.length > 0 && activities[0].trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Activities not found');
    }

    sendResponse(res, 200, true, 'Activities retrieved successfully', { activities });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new activity
// @route   POST /api/stops/:stopId/activities
// @access  Private
const createActivity = async (req, res, next) => {
  try {
    // Verify stop belongs to user's trip
    const stop = await Activity.findOne({
      where: { stopId: req.params.stopId },
      include: [{ model: Trip, as: 'trip' }]
    });

    if (stop && stop.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Stop not found');
    }

    const { tripId, title, type, cost, duration, description, date, time } = req.body;

    const activity = await Activity.create({
      tripId,
      stopId: req.params.stopId,
      title,
      type,
      cost,
      duration,
      description,
      date,
      time
    });

    sendResponse(res, 201, true, 'Activity created successfully', { activity });
  } catch (error) {
    next(error);
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
const updateActivity = async (req, res, next) => {
  try {
    const { title, type, cost, duration, description, date, time } = req.body;

    // Find activity and verify ownership through trip
    const activity = await Activity.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!activity || activity.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Activity not found');
    }

    await activity.update({ title, type, cost, duration, description, date, time });

    sendResponse(res, 200, true, 'Activity updated successfully', { activity });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
const deleteActivity = async (req, res, next) => {
  try {
    // Find activity and verify ownership through trip
    const activity = await Activity.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!activity || activity.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Activity not found');
    }

    await activity.destroy();

    sendResponse(res, 200, true, 'Activity deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
};