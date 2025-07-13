const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chant = sequelize.define('Chant', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 255]
    }
  },
  lyrics: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 10000]
    }
  },
  audio_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 7200 // 2 heures maximum
    }
  },
  language: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: 'fr'
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'chants'
});

module.exports = Chant;
