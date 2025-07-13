const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EvenementParticipant = sequelize.define('EvenementParticipant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  evenement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'evenements',
      key: 'id'
    }
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  statut: {
    type: DataTypes.ENUM('interesse', 'participant', 'annule'),
    allowNull: false,
    defaultValue: 'interesse'
  },
  date_inscription: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  nombre_personnes: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  a_paye: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  montant_paye: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'evenement_participants',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['evenement_id', 'utilisateur_id']
    },
    {
      fields: ['statut', 'date_inscription']
    }
  ]
});

module.exports = EvenementParticipant;
