module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Trip title is required' },
        len: { args: [1, 100], msg: 'Title cannot exceed 100 characters' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: { args: [0], msg: 'Budget cannot be negative' }
      }
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shareId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'trips',
    timestamps: true,
    hooks: {
      beforeCreate: (trip) => {
        if (trip.isPublic && !trip.shareId) {
          trip.shareId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
      },
      beforeUpdate: (trip) => {
        if (trip.isPublic && !trip.shareId) {
          trip.shareId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
      }
    }
  });

  // Associations
  Trip.associate = (models) => {
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
    Trip.hasMany(models.Stop, {
      foreignKey: 'tripId',
      as: 'stops',
      onDelete: 'CASCADE'
    });
    Trip.hasMany(models.Activity, {
      foreignKey: 'tripId',
      as: 'activities',
      onDelete: 'CASCADE'
    });
    Trip.hasMany(models.ChecklistItem, {
      foreignKey: 'tripId',
      as: 'checklistItems',
      onDelete: 'CASCADE'
    });
    Trip.hasMany(models.Note, {
      foreignKey: 'tripId',
      as: 'notes',
      onDelete: 'CASCADE'
    });
  };

  return Trip;
};