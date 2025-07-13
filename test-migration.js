# Test PostgreSQL Migration
# Ce script teste la migration de MySQL vers PostgreSQL

require('dotenv').config();

const mysql = require('mysql2/promise');
const { Client } = require('pg');

async function testMigration() {
  console.log('🔄 Test de migration MySQL vers PostgreSQL...');
  
  try {
    // Test de connexion MySQL (développement)
    console.log('📍 Test connexion MySQL...');
    const mysqlConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'gospelchantetparole'
    });
    
    const [rows] = await mysqlConnection.execute('SELECT COUNT(*) as count FROM chants');
    console.log(`✅ MySQL: ${rows[0].count} chants trouvés`);
    await mysqlConnection.end();
    
    // Test de connexion PostgreSQL (production)
    if (process.env.DATABASE_URL) {
      console.log('📍 Test connexion PostgreSQL...');
      const pgClient = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
      
      await pgClient.connect();
      const result = await pgClient.query('SELECT NOW()');
      console.log(`✅ PostgreSQL: Connexion réussie - ${result.rows[0].now}`);
      await pgClient.end();
    } else {
      console.log('⚠️  PostgreSQL: DATABASE_URL non configurée');
    }
    
    console.log('🎉 Tests de migration terminés!');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

testMigration();
