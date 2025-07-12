// Configuration pour les tests
const sequelize = require('../config/database');

// Configuration Jest
jest.setTimeout(30000);

// Configuration de la base de données de test
beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données de test établie');
    
    // Sync la base de données pour les tests
    await sequelize.sync({ force: true });
    console.log('✅ Base de données de test synchronisée');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données de test:', error);
  }
});

// Nettoyage après tous les tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log('✅ Connexion à la base de données de test fermée');
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture de la base de données de test:', error);
  }
});

// Configuration globale pour les tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'testsecret';
process.env.DB_NAME = 'gospelchantetparole_test';
