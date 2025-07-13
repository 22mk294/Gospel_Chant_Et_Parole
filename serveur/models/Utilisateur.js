const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mot_de_passe: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  statut: {
    type: DataTypes.ENUM('actif', 'inactif', 'suspendu'),
    defaultValue: 'actif'
  },
  role: {
    type: DataTypes.ENUM('utilisateur', 'contributeur', 'moderateur', 'admin'),
    defaultValue: 'utilisateur'
  },
  date_derniere_connexion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  preferences: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pays: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  eglise: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  verifie: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  token_verification: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  token_reset_password: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  token_reset_expire: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'utilisateurs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Utilisateur;
