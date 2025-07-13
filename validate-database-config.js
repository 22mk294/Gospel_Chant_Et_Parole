#!/usr/bin/env node

// Script de validation de la configuration PostgreSQL avec les vraies données
const { Client } = require('pg');

// Configuration avec vos vraies données
const config = {
  host: 'dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com',
  port: 5432,
  database: 'gospelchantetparole',
  user: 'gospeluser',
  password: '9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0',
  ssl: {
    rejectUnauthorized: false
  }
};

const DATABASE_URL = 'postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole';

async function validateDatabaseConfig() {
  console.log('🔍 Validation de la configuration PostgreSQL...\n');
  
  console.log('📋 Configuration détectée:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Password: ${config.password.substring(0, 5)}...`);
  console.log(`   SSL: Activé\n`);
  
  try {
    console.log('🔄 Test de connexion avec l\'URL complète...');
    
    // Test avec l'URL complète
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    await client.connect();
    console.log('✅ Connexion PostgreSQL réussie !');
    
    // Test de base de données
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log(`⏰ Heure serveur: ${result.rows[0].current_time}`);
    console.log(`🗄️  Version PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]}`);
    
    // Vérifier les tables existantes
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log('\n📊 Tables dans la base:');
    if (tablesResult.rows.length === 0) {
      console.log('   ❌ Aucune table trouvée');
      console.log('   💡 Après déploiement, exécutez: npm run init-postgres');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`   ✅ ${row.tablename}`);
      });
    }
    
    // Test de création de table (pour vérifier les permissions)
    try {
      await client.query('CREATE TABLE IF NOT EXISTS test_connection (id SERIAL PRIMARY KEY)');
      await client.query('DROP TABLE IF EXISTS test_connection');
      console.log('✅ Permissions de création/suppression OK');
    } catch (permError) {
      console.log('⚠️  Permissions limitées (normal pour certains hébergeurs)');
    }
    
    await client.end();
    
    console.log('\n🎉 Configuration validée avec succès !');
    console.log('\n📋 Variables d\'environnement Render à configurer:');
    console.log('NODE_ENV=production');
    console.log('PORT=5000');
    console.log(`DATABASE_URL=${DATABASE_URL}`);
    console.log('JWT_SECRET=gospel-super-secret-jwt-key-2025-production-render');
    console.log('CORS_ORIGIN=*');
    
    console.log('\n🚀 Prêt pour le déploiement Render !');
    
  } catch (error) {
    console.error('❌ Erreur de validation:', error.message);
    console.log('\n🔧 Vérifications à faire:');
    console.log('1. La base de données PostgreSQL est-elle active sur Render ?');
    console.log('2. Les informations de connexion sont-elles correctes ?');
    console.log('3. Y a-t-il des restrictions d\'accès IP ?');
    console.log('4. Le mot de passe a-t-il été changé ?');
    
    console.log('\n📋 Informations utilisées:');
    console.log(`URL: ${DATABASE_URL}`);
  }
}

// Fonction pour afficher l'URL de configuration
function showConfigurationURL() {
  console.log('\n📝 URL de configuration validée:');
  console.log(DATABASE_URL);
  console.log('\n📋 Cette URL est prête à être utilisée dans Render !');
}

// Exécution du script
if (require.main === module) {
  if (process.argv.includes('--url')) {
    showConfigurationURL();
  } else {
    validateDatabaseConfig();
  }
}

module.exports = { validateDatabaseConfig, showConfigurationURL };
