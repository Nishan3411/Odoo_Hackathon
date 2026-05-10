const User = require('../models/User');
const Trip = require('../models/Trip');
const Activity = require('../models/Activity');
const { sendResponse } = require('../utils/response');

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin only - in real app, add admin role check)
const getAnalytics = async (req, res, next) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();

    // Get total trips
    const totalTrips = await Trip.countDocuments();

    // Get total activities
    const totalActivities = await Activity.countDocuments();

    // Get top cities (from stops)
    const topCities = await Trip.aggregate([
      {
        $lookup: {
          from: 'stops',
          localField: '_id',
          foreignField: 'tripId',
          as: 'stops'
        }
      },
      { $unwind: '$stops' },
      {
        $group: {
          _id: { city: '$stops.city', country: '$stops.country' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const analytics = {
      totalUsers,
      totalTrips,
      totalActivities,
      topCities: topCities.map(city => ({
        city: `${city._id.city}, ${city._id.country}`,
        tripCount: city.count
      }))
    };

    sendResponse(res, 200, true, 'Analytics retrieved successfully', { analytics });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics
};