const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Initialize Sequelize instance
const db = {};

// Add Sequelize instance and class to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, DataTypes);
db.Trip = require('./Trip')(sequelize, DataTypes);
db.Stop = require('./Stop')(sequelize, DataTypes);
db.Activity = require('./Activity')(sequelize, DataTypes);
db.ChecklistItem = require('./ChecklistItem')(sequelize, DataTypes);
db.Note = require('./Note')(sequelize, DataTypes);

// Define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;