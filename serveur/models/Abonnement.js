const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Abonnement = sequelize.define('Abonnement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('gratuit', 'premium', 'vip'),
    allowNull: false,
    defaultValue: 'gratuit'
  },
  statut: {
    type: DataTypes.ENUM('actif', 'suspendu', 'expire', 'annule'),
    allowNull: false,
    defaultValue: 'actif'
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  monnaie: {
    type: DataTypes.STRING(3),
    allowNull: true,
    defaultValue: 'EUR'
  },
  methode_paiement: {
    type: DataTypes.ENUM('stripe', 'paypal', 'mobile_money', 'carte_bancaire'),
    allowNull: true
  },
  transaction_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'ID de transaction du fournisseur de paiement'
  },
  auto_renouvellement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  privileges: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Permissions spéciales (téléchargement illimité, qualité audio, etc.)'
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Données supplémentaires de l\'abonnement'
  }
}, {
  tableName: 'abonnements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['utilisateur_id', 'statut']
    },
    {
      fields: ['type', 'date_fin']
    },
    {
      fields: ['transaction_id']
    }
  ]
});

module.exports = Abonnement;
