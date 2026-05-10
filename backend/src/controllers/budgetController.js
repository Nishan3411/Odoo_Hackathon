const db = require('../models');
const Activity = db.Activity;
const Trip = db.Trip;
const { sendResponse } = require('../utils/response');

// @desc    Get budget summary for a trip
// @route   GET /api/trips/:tripId/budget
// @access  Private
const getBudget = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    // Calculate activity costs
    const activities = await Activity.findAll({
      where: { tripId: req.params.tripId }
    });
    const activityCost = activities.reduce((total, activity) => total + parseFloat(activity.cost || 0), 0);

    // Calculate trip duration in days
    const tripDuration = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;

    // Placeholder costs (in a real app, these would come from other models)
    const stayCost = 0; // Placeholder
    const transportCost = 0; // Placeholder
    const mealsCost = 0; // Placeholder

    const totalCost = activityCost + stayCost + transportCost + mealsCost;
    const averageCostPerDay = tripDuration > 0 ? totalCost / tripDuration : 0;
    const overBudget = parseFloat(trip.budget) > 0 && totalCost > parseFloat(trip.budget);

    const budget = {
      tripBudget: parseFloat(trip.budget),
      totalCost,
      activityCost,
      stayCost,
      transportCost,
      mealsCost,
      averageCostPerDay,
      tripDuration,
      overBudget,
      remainingBudget: parseFloat(trip.budget) - totalCost
    };

    sendResponse(res, 200, true, 'Budget retrieved successfully', { budget });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBudget
};