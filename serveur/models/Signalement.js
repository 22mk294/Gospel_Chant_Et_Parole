const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Signalement = sequelize.define('Signalement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type_contenu: {
    type: DataTypes.ENUM('chant', 'commentaire', 'utilisateur', 'playlist'),
    allowNull: false
  },
  contenu_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  raison: {
    type: DataTypes.ENUM(
      'contenu_inapproprie',
      'copyright',
      'spam',
      'fausses_informations',
      'harcelement',
      'autre'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  statut: {
    type: DataTypes.ENUM('en_attente', 'traite', 'rejete', 'valide'),
    defaultValue: 'en_attente'
  },
  traite_par: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  date_traitement: {
    type: DataTypes.DATE,
    allowNull: true
  },
  action_prise: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  priorite: {
    type: DataTypes.ENUM('faible', 'moyenne', 'haute', 'critique'),
    defaultValue: 'moyenne'
  }
}, {
  tableName: 'signalements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Signalement;
