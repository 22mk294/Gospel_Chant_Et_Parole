// Test simple de connexion PostgreSQL
require('dotenv').config();
const { Sequelize } = require('sequelize');

async function testConnection() {
  console.log('🔍 Test de connexion PostgreSQL...');
  console.log('📍 NODE_ENV:', process.env.NODE_ENV);
  console.log('🔗 DATABASE_URL présente:', !!process.env.DATABASE_URL);
  
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL non définie');
    process.exit(1);
  }
  
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: console.log
  });

  try {
    await sequelize.authenticate();
    console.log('✅ Connexion PostgreSQL établie avec succès');
    
    await sequelize.query('SELECT version();');
    console.log('✅ Test de requête réussi');
    
    await sequelize.close();
    console.log('✅ Connexion fermée proprement');
    
  } catch (error) {
    console.error('❌ Erreur de connexion PostgreSQL:', error.message);
    process.exit(1);
  }
}

testConnection();
