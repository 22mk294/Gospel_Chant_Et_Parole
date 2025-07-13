const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  expediteur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  destinataire_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  sujet: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date_lecture: {
    type: DataTypes.DATE,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('prive', 'systeme', 'notification'),
    allowNull: false,
    defaultValue: 'prive'
  },
  priorite: {
    type: DataTypes.ENUM('basse', 'normale', 'haute', 'urgente'),
    allowNull: false,
    defaultValue: 'normale'
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'messages',
      key: 'id'
    },
    comment: 'ID du message parent (pour les réponses)'
  },
  archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'messages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['destinataire_id', 'lu']
    },
    {
      fields: ['expediteur_id', 'created_at']
    },
    {
      fields: ['parent_id']
    }
  ]
});

module.exports = Message;
