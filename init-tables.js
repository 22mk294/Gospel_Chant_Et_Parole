// Script pour initialiser les tables PostgreSQL
require('dotenv').config();
const { Sequelize } = require('sequelize');

async function initializeTables() {
  console.log('🔄 Initialisation des tables PostgreSQL...');
  
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });

  try {
    await sequelize.authenticate();
    console.log('✅ Connexion PostgreSQL établie');
    
    // Importer les modèles
    const { Admin, Category, Chant } = require('./serveur/models');
    
    // Synchroniser les tables
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Tables synchronisées');
    
    // Créer des données de test
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        email: 'admin@gospel.com'
      });
      console.log('✅ Admin par défaut créé');
    }
    
    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      await Category.bulkCreate([
        { name: 'Louange', description: 'Chants de louange' },
        { name: 'Adoration', description: 'Chants d\'adoration' },
        { name: 'Évangélisation', description: 'Chants d\'évangélisation' }
      ]);
      console.log('✅ Catégories par défaut créées');
    }
    
    await sequelize.close();
    console.log('🎉 Initialisation terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initializeTables();
