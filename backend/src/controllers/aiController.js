const db = require('../models');
const Trip = db.Trip;
const Stop = db.Stop;
const Activity = db.Activity;
const { sendResponse } = require('../utils/response');

// @desc    Generate trip summary
// @route   POST /api/ai/summary
// @access  Private
const generateSummary = async (req, res, next) => {
  try {
    const { tripId } = req.body;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    // Get trip data
    const stops = await Stop.findAll({
      where: { tripId },
      order: [['stopOrder', 'ASC']]
    });
    const activities = await Activity.findAll({
      where: { tripId }
    });

    // Calculate duration
    const duration = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;

    // Generate summary
    const cities = stops.map(stop => stop.city).join(', ');
    const activityTypes = [...new Set(activities.map(activity => activity.type))];
    const totalCost = activities.reduce((sum, activity) => sum + parseFloat(activity.cost || 0), 0);

    let summary = `Your ${duration}-day trip to ${cities} includes ${activities.length} activities `;
    summary += `across ${activityTypes.length} categories. `;
    summary += `Estimated activity cost: $${totalCost}. `;

    if (trip.description) {
      summary += trip.description;
    }

    sendResponse(res, 200, true, 'Summary generated successfully', { summary });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate activity recommendations
// @route   POST /api/ai/recommend
// @access  Private
const generateRecommendations = async (req, res, next) => {
  try {
    const { tripId, city } = req.body;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    // Simple recommendation logic based on city and budget
    const recommendations = [];

    if (city.toLowerCase().includes('paris')) {
      recommendations.push({
        title: 'Visit Eiffel Tower',
        type: 'sightseeing',
        estimatedCost: parseFloat(trip.budget) > 1000 ? 50 : 30,
        description: 'Iconic landmark with stunning views'
      });
      recommendations.push({
        title: 'Louvre Museum',
        type: 'culture',
        estimatedCost: parseFloat(trip.budget) > 1000 ? 25 : 17,
        description: 'World-famous art museum'
      });
    } else if (city.toLowerCase().includes('tokyo')) {
      recommendations.push({
        title: 'Senso-ji Temple',
        type: 'culture',
        estimatedCost: 0,
        description: 'Ancient Buddhist temple in Asakusa'
      });
      recommendations.push({
        title: 'Shibuya Crossing',
        type: 'sightseeing',
        estimatedCost: 0,
        description: 'World\'s busiest pedestrian crossing'
      });
    } else {
      // Generic recommendations
      recommendations.push({
        title: 'City Walking Tour',
        type: 'sightseeing',
        estimatedCost: 20,
        description: 'Explore the city center on foot'
      });
      recommendations.push({
        title: 'Local Restaurant',
        type: 'food',
        estimatedCost: 30,
        description: 'Try authentic local cuisine'
      });
    }

    sendResponse(res, 200, true, 'Recommendations generated successfully', { recommendations });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate budget tips
// @route   POST /api/ai/budget-tips
// @access  Private
const generateBudgetTips = async (req, res, next) => {
  try {
    const { tripId } = req.body;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, userId: req.user.id }
    });
    if (!trip) {
      return sendResponse(res, 404, false, 'Trip not found');
    }

    // Get current spending
    const activities = await Activity.findAll({
      where: { tripId }
    });
    const currentSpending = activities.reduce((sum, activity) => sum + parseFloat(activity.cost || 0), 0);

    const tips = [];

    if (currentSpending > parseFloat(trip.budget)) {
      tips.push('Consider reducing the number of paid activities or look for free alternatives.');
      tips.push('Check for discount passes or combo tickets for multiple attractions.');
    } else if (currentSpending > parseFloat(trip.budget) * 0.8) {
      tips.push('You\'re approaching your budget limit. Consider some free activities.');
      tips.push('Look for happy hour deals or cheaper meal options.');
    } else {
      tips.push('Great job staying within budget! You have room for a few more activities.');
      tips.push('Consider saving some budget for unexpected expenses.');
    }

    tips.push('Use public transportation instead of taxis to save money.');
    tips.push('Eat at local markets or street food for authentic and affordable meals.');

    sendResponse(res, 200, true, 'Budget tips generated successfully', { tips });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateSummary,
  generateRecommendations,
  generateBudgetTips
};