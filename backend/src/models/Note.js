module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
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
      allowNull: true,
      references: {
        model: 'stops',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Content is required' },
        len: { args: [1, 1000], msg: 'Content cannot exceed 1000 characters' }
      }
    }
  }, {
    tableName: 'notes',
    timestamps: true
  });

  // Associations
  Note.associate = (models) => {
    Note.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE'
    });
    Note.belongsTo(models.Stop, {
      foreignKey: 'stopId',
      as: 'stop',
      onDelete: 'CASCADE'
    });
  };

  return Note;
};