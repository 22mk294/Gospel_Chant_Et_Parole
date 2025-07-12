const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Signalement = sequelize.define('Signalement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chants',
      key: 'id'
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [10, 500]
    }
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'UUID anonyme ou ID utilisateur (optionnel)'
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'resolved', 'rejected'),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'signalements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Signalement;
