#!/usr/bin/env node

// Script de test de connexion PostgreSQL pour Render
const { Client } = require('pg');

async function testPostgreSQLConnection() {
  console.log('🔍 Test de connexion PostgreSQL...\n');
  
  // Informations de base connues
  const hostname = 'dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com';
  const port = 5432;
  
  console.log(`📡 Hostname: ${hostname}`);
  console.log(`🔌 Port: ${port}`);
  console.log();
  
  // Vérifier si DATABASE_URL est définie
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL n\'est pas définie dans les variables d\'environnement');
    console.log('💡 Pour tester localement, définissez DATABASE_URL :');
    console.log('   export DATABASE_URL="postgresql://username:password@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com:5432/database_name"');
    console.log();
    console.log('📋 Sur Render, ajoutez DATABASE_URL dans les variables d\'environnement du service web');
    return;
  }
  
  try {
    console.log('🔄 Tentative de connexion...');
    
    // Configuration du client PostgreSQL
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Connexion
    await client.connect();
    console.log('✅ Connexion PostgreSQL réussie !');
    
    // Test de requête simple
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log(`⏰ Heure serveur: ${result.rows[0].current_time}`);
    console.log(`🗄️  Version PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]}`);
    
    // Vérifier si les tables existent
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log('\n📊 Tables existantes:');
    if (tablesResult.rows.length === 0) {
      console.log('   ❌ Aucune table trouvée');
      console.log('   💡 Exécutez: npm run init-postgres');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`   ✅ ${row.tablename}`);
      });
    }
    
    await client.end();
    console.log('\n🎉 Test de connexion terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifier que DATABASE_URL est correcte');
    console.log('2. Vérifier que la base de données PostgreSQL est active sur Render');
    console.log('3. Vérifier les permissions de connexion');
    console.log('4. Attendre quelques minutes si la base vient d\'être créée');
  }
}

// Fonction pour afficher le format attendu de l'URL
function showURLFormat() {
  console.log('\n📝 Format attendu de DATABASE_URL:');
  console.log('postgresql://username:password@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com:5432/database_name');
  console.log();
  console.log('🔍 Pour trouver vos valeurs:');
  console.log('1. Render Dashboard → Votre base PostgreSQL');
  console.log('2. Onglet "Info" → Copier "External Database URL"');
  console.log('3. Coller cette URL dans DATABASE_URL du service web');
}

// Exécution du script
if (require.main === module) {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showURLFormat();
  } else {
    testPostgreSQLConnection();
  }
}

module.exports = { testPostgreSQLConnection, showURLFormat };
