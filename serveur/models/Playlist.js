const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Playlist = sequelize.define('Playlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  publique: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  image_couverture: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  couleur_theme: {
    type: DataTypes.STRING(7),
    allowNull: true,
    defaultValue: '#3498db'
  },
  nombre_chants: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  duree_totale: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Durée en secondes'
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  statut: {
    type: DataTypes.ENUM('brouillon', 'publique', 'privee', 'archivee'),
    defaultValue: 'brouillon'
  },
  ordre_personnalise: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'playlists',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Playlist;
