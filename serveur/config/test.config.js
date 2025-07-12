const { Sequelize } = require('sequelize');

// Configuration pour les tests utilisant SQLite en mémoire
const testDatabase = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});

module.exports = testDatabase;
