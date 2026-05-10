module.exports = (sequelize, DataTypes) => {
  const ChecklistItem = sequelize.define('ChecklistItem', {
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
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Item is required' },
        len: { args: [1, 200], msg: 'Item cannot exceed 200 characters' }
      }
    },
    category: {
      type: DataTypes.ENUM('documents', 'clothing', 'electronics', 'toiletries', 'medication', 'food', 'entertainment', 'other'),
      allowNull: false,
      defaultValue: 'other'
    },
    packed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'checklist_items',
    timestamps: true
  });

  // Associations
  ChecklistItem.associate = (models) => {
    ChecklistItem.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE'
    });
  };

  return ChecklistItem;
};