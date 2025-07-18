const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favoris = sequelize.define('Favoris', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  chant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'chants',
      key: 'id'
    }
  },
  date_ajout: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes_personnelles: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'favoris',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['utilisateur_id', 'chant_id']
    }
  ]
});

module.exports = Favoris;
