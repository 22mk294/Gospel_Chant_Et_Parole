const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chant = sequelize.define('Chant', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lyrics: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Chant;
