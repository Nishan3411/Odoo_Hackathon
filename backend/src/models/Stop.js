module.exports = (sequelize, DataTypes) => {
  const Stop = sequelize.define('Stop', {
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        len: { args: [1, 100], msg: 'City name cannot exceed 100 characters' }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Country is required' },
        len: { args: [1, 100], msg: 'Country name cannot exceed 100 characters' }
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Start date must be a valid date' }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'End date must be a valid date' },
        isAfterStartDate(value) {
          if (value && this.startDate && new Date(value) < new Date(this.startDate)) {
            throw new Error('End date must be after start date');
          }
        }
      }
    },
    stopOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'Order must be at least 1' }
      }
    }
  }, {
    tableName: 'stops',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['tripId', 'stopOrder']
      }
    ]
  });

  // Associations
  Stop.associate = (models) => {
    Stop.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE'
    });
    Stop.hasMany(models.Activity, {
      foreignKey: 'stopId',
      as: 'activities',
      onDelete: 'CASCADE'
    });
    Stop.hasMany(models.Note, {
      foreignKey: 'stopId',
      as: 'notes',
      onDelete: 'CASCADE'
    });
  };

  return Stop;
};