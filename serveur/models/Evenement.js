const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evenement = sequelize.define('Evenement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lieu: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  adresse: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('concert', 'conference', 'culte', 'formation', 'autre'),
    allowNull: false,
    defaultValue: 'culte'
  },
  organisateur: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contact: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  monnaie: {
    type: DataTypes.STRING(3),
    defaultValue: 'EUR'
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  lien_inscription: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  capacite_max: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  inscriptions_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  statut: {
    type: DataTypes.ENUM('brouillon', 'publie', 'annule', 'reporte'),
    allowNull: false,
    defaultValue: 'brouillon'
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Données supplémentaires de l\'événement'
  }
}, {
  tableName: 'evenements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['date_debut', 'statut']
    },
    {
      fields: ['type', 'actif']
    }
  ]
});

module.exports = Evenement;
