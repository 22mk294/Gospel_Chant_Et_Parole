// Script pour tester les modèles sans connexion DB
const path = require('path');

// Mock Sequelize pour éviter la connexion à la base de données
const mockSequelize = {
  define: () => ({
    hasMany: () => {},
    belongsTo: () => {},
    belongsToMany: () => {},
    hasOne: () => {}
  }),
  authenticate: () => Promise.resolve(),
  sync: () => Promise.resolve(),
  close: () => Promise.resolve()
};

// Mock du module de configuration database
const mockConfig = {
  database: mockSequelize
};

// Remplacer temporairement le module de configuration
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  if (id === '../config/database') {
    return mockSequelize;
  }
  return originalRequire.apply(this, arguments);
};

try {
  console.log('🔄 Test des modèles...');
  
  // Tester le chargement des modèles
  const models = require('./serveur/models');
  console.log('✅ Modèles chargés avec succès !');
  
  // Afficher la liste des modèles
  console.log('\n📋 Modèles disponibles :');
  Object.keys(models).forEach(modelName => {
    if (modelName !== 'sequelize') {
      console.log(`  - ${modelName}`);
    }
  });
  
  console.log('\n🎉 Tous les modèles sont valides !');
  
} catch (error) {
  console.error('❌ Erreur lors du chargement des modèles:', error.message);
  console.error('Stack:', error.stack);
} finally {
  // Restaurer le require original
  Module.prototype.require = originalRequire;
}
