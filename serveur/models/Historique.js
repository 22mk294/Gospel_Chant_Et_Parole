const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Historique = sequelize.define('Historique', {
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
  date_ecoute: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  duree_ecoute: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Durée en secondes'
  },
  termine: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  appareil: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  navigateur: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  localisation: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'historiques',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Historique;
