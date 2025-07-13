const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
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
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(
      'nouveau_chant',
      'nouvelle_categorie',
      'commentaire_reponse',
      'playlist_partagee',
      'admin_message',
      'maintenance',
      'mise_a_jour'
    ),
    allowNull: false
  },
  lue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  action_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL vers laquelle rediriger quand on clique sur la notification'
  },
  expire_a: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date d\'expiration de la notification'
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Données supplémentaires (chant_id, category_id, etc.)'
  }
}, {
  tableName: 'notifications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['utilisateur_id', 'lue']
    },
    {
      fields: ['type', 'created_at']
    }
  ]
});

module.exports = Notification;
