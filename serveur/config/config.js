// Configuration pour différents environnements
require('dotenv').config();

const config = {
  development: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'gospelchantetparole',
      dialect: 'mysql',
      logging: console.log
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'fallback_secret_key',
      expiresIn: '24h'
    },
    server: {
      port: process.env.PORT || 5000
    }
  },
  
  test: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME_TEST || 'gospelchantetparole_test',
      dialect: 'mysql',
      logging: false
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'test_secret_key',
      expiresIn: '1h'
    },
    server: {
      port: process.env.PORT || 5001
    }
  },
  
  production: {
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h'
    },
    server: {
      port: process.env.PORT || 5000
    }
  }
};

const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];
