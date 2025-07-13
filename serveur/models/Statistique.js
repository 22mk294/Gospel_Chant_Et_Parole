const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Statistique = sequelize.define('Statistique', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type_stat: {
    type: DataTypes.ENUM(
      'vue_chant',
      'telechargement',
      'partage',
      'creation_playlist',
      'connexion_utilisateur',
      'recherche',
      'favori_ajoute'
    ),
    allowNull: false
  },
  chant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'chants',
      key: 'id'
    }
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  valeur: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  },
  date_stat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  periode: {
    type: DataTypes.ENUM('jour', 'semaine', 'mois', 'annee'),
    defaultValue: 'jour'
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'statistiques',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['type_stat', 'date_stat']
    },
    {
      fields: ['chant_id', 'type_stat']
    },
    {
      fields: ['utilisateur_id', 'type_stat']
    }
  ]
});

module.exports = Statistique;
