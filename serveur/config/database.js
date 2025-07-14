require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

// Configuration pour les tests avec SQLite en mémoire
if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: false
    }
  });
} else if (process.env.NODE_ENV === 'production' || process.env.DATABASE_URL) {
  // Configuration pour la production avec PostgreSQL (Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: console.log,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: false
    }
  });
} else {
  // Configuration pour le développement avec MySQL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    }
  );
}

module.exports = sequelize;
