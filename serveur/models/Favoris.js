const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favoris = sequelize.define('Favoris', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'UUID anonyme ou ID utilisateur'
  },
  chant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chants',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'favoris',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Favoris;
