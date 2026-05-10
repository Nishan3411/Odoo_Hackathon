module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'id'
      }
    },
    stopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stops',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Activity title is required' },
        len: { args: [1, 100], msg: 'Title cannot exceed 100 characters' }
      }
    },
    type: {
      type: DataTypes.ENUM('sightseeing', 'food', 'shopping', 'entertainment', 'sports', 'culture', 'nature', 'other'),
      allowNull: false,
      defaultValue: 'other'
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: { args: [0], msg: 'Cost cannot be negative' }
      }
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      defaultValue: 60,
      validate: {
        min: { args: [1], msg: 'Duration must be at least 1 minute' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Date must be a valid date' }
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
      validate: {
        is: {
          args: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
          msg: 'Time must be in HH:MM format'
        }
      }
    }
  }, {
    tableName: 'activities',
    timestamps: true
  });

  // Associations
  Activity.associate = (models) => {
    Activity.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE'
    });
    Activity.belongsTo(models.Stop, {
      foreignKey: 'stopId',
      as: 'stop',
      onDelete: 'CASCADE'
    });
  };

  return Activity;
};