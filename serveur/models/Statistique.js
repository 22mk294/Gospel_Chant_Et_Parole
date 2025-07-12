const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Statistique = sequelize.define('Statistique', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'UUID anonyme ou device_id'
  },
  chant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Chants',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.ENUM('view', 'favori', 'search', 'signalement'),
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Données supplémentaires (terme recherche, etc.)'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'statistiques',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Statistique;
