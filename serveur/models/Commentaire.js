const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commentaire = sequelize.define('Commentaire', {
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
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'commentaires',
      key: 'id'
    }
  },
  statut: {
    type: DataTypes.ENUM('publie', 'modere', 'supprime'),
    defaultValue: 'publie'
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  signale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  modere_par: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  date_moderation: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'commentaires',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Commentaire;
