const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publicite = sequelize.define('Publicite', {
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
  type: {
    type: DataTypes.ENUM('banniere', 'video', 'audio', 'popup', 'native'),
    allowNull: false,
    defaultValue: 'banniere'
  },
  format: {
    type: DataTypes.ENUM('image', 'video', 'audio', 'html'),
    allowNull: false,
    defaultValue: 'image'
  },
  contenu_url: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'URL du contenu publicitaire'
  },
  lien_cible: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL de destination du clic'
  },
  annonceur: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contact_annonceur: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  cout_par_clic: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true
  },
  cout_par_impression: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true
  },
  impressions_max: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  impressions_actuelles: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clics_actuels: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  position: {
    type: DataTypes.ENUM('header', 'sidebar', 'footer', 'content', 'popup'),
    allowNull: false,
    defaultValue: 'sidebar'
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  approuve: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Données supplémentaires de ciblage'
  }
}, {
  tableName: 'publicites',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['actif', 'approuve', 'date_debut', 'date_fin']
    },
    {
      fields: ['type', 'position']
    }
  ]
});

module.exports = Publicite;
