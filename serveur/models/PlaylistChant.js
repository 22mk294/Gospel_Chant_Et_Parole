const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlaylistChant = sequelize.define('PlaylistChant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  playlist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'playlists',
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
  ordre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  date_ajout: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ajoute_par: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  }
}, {
  tableName: 'playlist_chants',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['playlist_id', 'chant_id']
    }
  ]
});

module.exports = PlaylistChant;
