const db = require('../models');
const Trip = db.Trip;
const { sendResponse } = require('../utils/response');

// @desc    Get all trips for user
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    sendResponse(res, 200, true, 'Trips retrieved successfully', { trips });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
const getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    sendResponse(res, 200, true, 'Trip retrieved successfully', { trip });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res, next) => {
  try {
    const { title, description, startDate, endDate, budget, coverImage, isPublic } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      title,
      description,
      startDate,
      endDate,
      budget,
      coverImage,
      isPublic
    });

    sendResponse(res, 201, true, 'Trip created successfully', { trip });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res, next) => {
  try {
    const { title, description, startDate, endDate, budget, coverImage, isPublic } = req.body;

    const [updatedRowsCount, updatedRows] = await Trip.update(
      {
        title,
        description,
        startDate,
        endDate,
        budget,
        coverImage,
        isPublic
      },
      {
        where: { id: req.params.id, userId: req.user.id },
        returning: true
      }
    );

    if (updatedRowsCount === 0) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    sendResponse(res, 200, true, 'Trip updated successfully', { trip: updatedRows[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res, next) => {
  try {
    const deletedRowsCount = await Trip.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (deletedRowsCount === 0) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    sendResponse(res, 200, true, 'Trip deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip
};