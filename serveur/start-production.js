const initializeProductionDatabase = require('./init-production-db');

async function startServer() {
  try {
    console.log('🚀 Démarrage du serveur Gospel Chant et Parole...');
    
    // Initialiser la base de données
    await initializeProductionDatabase();
    
    // Démarrer le serveur
    console.log('🔄 Démarrage du serveur Express...');
    require('./server');
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
    process.exit(1);
  }
}

startServer();
