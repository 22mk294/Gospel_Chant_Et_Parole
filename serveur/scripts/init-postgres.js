const { Sequelize } = require('sequelize');
const Admin = require('./models/Admin');
const Category = require('./models/Category');
const Chant = require('./models/Chant');
const hashService = require('./services/hashService');

// Configuration pour PostgreSQL en production
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log
});

async function initializeDatabase() {
  try {
    console.log('🔄 Connexion à la base de données PostgreSQL...');
    
    // Test de connexion
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à PostgreSQL');
    
    // Synchronisation des modèles
    console.log('🔄 Synchronisation des modèles...');
    await sequelize.sync({ force: true });
    console.log('✅ Modèles synchronisés');
    
    // Création de l'administrateur par défaut
    console.log('🔄 Création de l\'administrateur par défaut...');
    const hashedPassword = await hashService.hashPassword('admin123');
    await Admin.create({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@gospelchantetparole.com'
    });
    console.log('✅ Administrateur créé');
    
    // Création de catégories d'exemple
    console.log('🔄 Création de catégories d\'exemple...');
    const categories = await Category.bulkCreate([
      { name: 'Louange', description: 'Chants de louange et d\'adoration' },
      { name: 'Culte', description: 'Chants pour le culte' },
      { name: 'Prière', description: 'Chants de prière' },
      { name: 'Évangélisation', description: 'Chants d\'évangélisation' }
    ]);
    console.log('✅ Catégories créées');
    
    // Création de chants d'exemple
    console.log('🔄 Création de chants d\'exemple...');
    await Chant.bulkCreate([
      {
        title: 'Amazing Grace',
        artist: 'Traditionnel',
        lyrics: 'Amazing grace, how sweet the sound...',
        categoryId: categories[0].id
      },
      {
        title: 'How Great Thou Art',
        artist: 'Stuart K. Hine',
        lyrics: 'O Lord my God, when I in awesome wonder...',
        categoryId: categories[0].id
      },
      {
        title: 'Blessed Assurance',
        artist: 'Fanny J. Crosby',
        lyrics: 'Blessed assurance, Jesus is mine...',
        categoryId: categories[1].id
      }
    ]);
    console.log('✅ Chants d\'exemple créés');
    
    console.log('🎉 Initialisation de la base de données terminée!');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Exécution du script
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
