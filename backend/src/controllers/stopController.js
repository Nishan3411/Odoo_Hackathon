const db = require('../models');
const Stop = db.Stop;
const Trip = db.Trip;
const { sendResponse } = require('../utils/response');

// @desc    Get all stops for a trip
// @route   GET /api/trips/:tripId/stops
// @access  Private
const getStops = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    const stops = await Stop.findAll({
      where: { tripId: req.params.tripId },
      order: [['stopOrder', 'ASC']]
    });

    sendResponse(res, 200, true, 'Stops retrieved successfully', { stops });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new stop
// @route   POST /api/trips/:tripId/stops
// @access  Private
const createStop = async (req, res, next) => {
  try {
    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: req.params.tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    const { city, country, startDate, endDate, stopOrder } = req.body;

    const stop = await Stop.create({
      tripId: req.params.tripId,
      city,
      country,
      startDate,
      endDate,
      stopOrder
    });

    sendResponse(res, 201, true, 'Stop created successfully', { stop });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stop
// @route   PUT /api/stops/:id
// @access  Private
const updateStop = async (req, res, next) => {
  try {
    const { city, country, startDate, endDate, stopOrder } = req.body;

    // Find stop and verify ownership through trip
    const stop = await Stop.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!stop || stop.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Stop not found');
    }

    await stop.update({ city, country, startDate, endDate, stopOrder });

    sendResponse(res, 200, true, 'Stop updated successfully', { stop });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete stop
// @route   DELETE /api/stops/:id
// @access  Private
const deleteStop = async (req, res, next) => {
  try {
    // Find stop and verify ownership through trip
    const stop = await Stop.findByPk(req.params.id, {
      include: [{ model: Trip, as: 'trip' }]
    });

    if (!stop || stop.trip.userId !== req.user.id) {
      return sendResponse(res, 404, false, 'Stop not found');
    }

    await stop.destroy();

    sendResponse(res, 200, true, 'Stop deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStops,
  createStop,
  updateStop,
  deleteStop
};