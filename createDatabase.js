const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
    console.log('🚀 Création de la base de données...\n');
    
    try {
        // Connexion sans spécifier de base de données
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || ''
        });
        
        console.log('✅ Connexion à MySQL établie');
        
        // Créer la base de données si elle n'existe pas
        const dbName = process.env.DB_NAME || 'gospelchantetparole';
        await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        
        console.log(`✅ Base de données '${dbName}' créée ou déjà existante`);
        
        // Créer également la base de données de test
        const testDbName = process.env.DB_NAME_TEST || 'gospelchantetparole_test';
        await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${testDbName}\``);
        
        console.log(`✅ Base de données de test '${testDbName}' créée ou déjà existante`);
        
        await connection.end();
        console.log('\n🎉 Configuration de la base de données terminée !');
        
    } catch (error) {
        console.error('❌ Erreur lors de la création de la base de données:', error);
        process.exit(1);
    }
}

// Exécuter le script
if (require.main === module) {
    createDatabase();
}

module.exports = { createDatabase };
