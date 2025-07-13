#!/usr/bin/env node

// Script de correction pour la synchronisation des tables PostgreSQL
// Ce script doit être exécuté dans le Shell de Render

const sequelize = require('../config/database');
const { Chant, Category, Admin } = require('../models');

async function fixDatabaseSync() {
  try {
    console.log('🔄 Correction de la synchronisation des tables PostgreSQL...');
    
    // Étape 1 : Supprimer toutes les tables existantes
    console.log('🗑️  Suppression des tables existantes...');
    await sequelize.drop();
    console.log('✅ Tables supprimées');
    
    // Étape 2 : Créer les tables dans le bon ordre
    console.log('🔄 Création des tables dans l\'ordre correct...');
    
    // D'abord les tables de base (sans dépendances)
    await Admin.sync({ force: true });
    console.log('✅ Table Admin créée');
    
    await Category.sync({ force: true });
    console.log('✅ Table Category créée');
    
    await Chant.sync({ force: true });
    console.log('✅ Table Chant créée');
    
    console.log('🎉 Synchronisation corrigée avec succès !');
    
    // Étape 3 : Créer les données d'exemple
    console.log('🔄 Création des données d\'exemple...');
    
    // Créer l'admin
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@gospelchantetparole.com'
    });
    console.log('✅ Administrateur créé');
    
    // Créer les catégories
    const categories = await Category.bulkCreate([
      { name: 'Louange', description: 'Chants de louange et d\'adoration' },
      { name: 'Culte', description: 'Chants pour le culte' },
      { name: 'Prière', description: 'Chants de prière' },
      { name: 'Évangélisation', description: 'Chants d\'évangélisation' }
    ]);
    console.log('✅ Catégories créées');
    
    // Créer les chants d'exemple
    await Chant.bulkCreate([
      {
        title: 'Amazing Grace',
        artist: 'Traditionnel',
        lyrics: 'Amazing grace, how sweet the sound\nThat saved a wretch like me...',
        category_id: categories[0].id
      },
      {
        title: 'How Great Thou Art',
        artist: 'Stuart K. Hine',
        lyrics: 'O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made...',
        category_id: categories[0].id
      },
      {
        title: 'Blessed Assurance',
        artist: 'Fanny J. Crosby',
        lyrics: 'Blessed assurance, Jesus is mine\nO what a foretaste of glory divine...',
        category_id: categories[1].id
      },
      {
        title: 'Great Is Thy Faithfulness',
        artist: 'Thomas O. Chisholm',
        lyrics: 'Great is Thy faithfulness, O God my Father\nThere is no shadow of turning with Thee...',
        category_id: categories[2].id
      },
      {
        title: 'Jesus Loves Me',
        artist: 'Anna B. Warner',
        lyrics: 'Jesus loves me, this I know\nFor the Bible tells me so...',
        category_id: categories[3].id
      }
    ]);
    console.log('✅ Chants d\'exemple créés');
    
    console.log('🎉 Base de données initialisée avec succès !');
    console.log('📋 Résumé :');
    console.log('- Admin : admin / admin123');
    console.log('- 4 catégories créées');
    console.log('- 5 chants d\'exemple créés');
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction :', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Exécution
if (require.main === module) {
  fixDatabaseSync()
    .then(() => {
      console.log('✅ Correction terminée avec succès !');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Erreur fatale :', error);
      process.exit(1);
    });
}

module.exports = fixDatabaseSync;
