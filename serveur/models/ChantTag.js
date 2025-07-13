const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChantTag = sequelize.define('ChantTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'chants',
      key: 'id'
    }
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tags',
      key: 'id'
    }
  },
  ajoute_par: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'utilisateurs',
      key: 'id'
    },
    comment: 'Utilisateur qui a ajouté ce tag'
  }
}, {
  tableName: 'chant_tags',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['chant_id', 'tag_id']
    },
    {
      fields: ['tag_id']
    }
  ]
});

module.exports = ChantTag;
