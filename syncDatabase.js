const sequelize = require('./serveur/config/database');
const { Chant, Category, Admin, Favoris, Signalement, Statistique } = require('./serveur/models');

async function syncDatabase() {
    console.log('🚀 Synchronisation de la base de données...\n');
    
    try {
        // Tester la connexion
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données établie');
        
        // Synchroniser les modèles (créer les tables)
        await sequelize.sync({ force: false });
        console.log('✅ Tables synchronisées avec succès');
        
        console.log('\n📋 Tables disponibles :');
        const queryInterface = sequelize.getQueryInterface();
        const tables = await queryInterface.showAllTables();
        
        tables.forEach(table => {
            console.log(`  📝 ${table}`);
        });
        
        await sequelize.close();
        console.log('\n🎉 Synchronisation terminée !');
        
    } catch (error) {
        console.error('❌ Erreur lors de la synchronisation:', error);
        process.exit(1);
    }
}

// Exécuter le script
if (require.main === module) {
    syncDatabase();
}

module.exports = { syncDatabase };
