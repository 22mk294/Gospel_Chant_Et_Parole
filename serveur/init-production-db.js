const { sequelize } = require('./models');

async function initializeProductionDatabase() {
  try {
    console.log('🔄 Initialisation de la base de données de production...');
    
    // Authentification
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie');
    
    // Synchronisation des modèles (sans forcer la suppression des données existantes)
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Synchronisation des modèles terminée');
    
    // Créer seulement l'admin par défaut si nécessaire
    const { Admin } = require('./models');
    
    const adminExists = await Admin.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        email: 'admin@gospel.com'
      });
      console.log('✅ Admin par défaut créé');
    } else {
      console.log('ℹ️ Admin par défaut existe déjà');
    }
    
    console.log('🎉 Base de données de production initialisée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
    throw error;
  }
}

// Exécuter l'initialisation si ce fichier est appelé directement
if (require.main === module) {
  initializeProductionDatabase()
    .then(() => {
      console.log('✅ Initialisation terminée');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur fatale:', error);
      process.exit(1);
    });
}

module.exports = initializeProductionDatabase;
