// Middleware to validate integer ID parameters (for MySQL/Sequelize)
const validateObjectId = (req, res, next) => {
  const params = Object.keys(req.params);

  for (const param of params) {
    const value = req.params[param];
    if (value && (!Number.isInteger(Number(value)) || Number(value) <= 0)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${param} ID format - must be a positive integer`
      });
    }
  }

  next();
};

module.exports = { validateObjectId };