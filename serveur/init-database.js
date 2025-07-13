const { sequelize } = require('./models');

async function initializeDatabase() {
  try {
    console.log('🔄 Initialisation de la base de données...');
    
    // Authentification
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie');
    
    // Synchronisation des modèles
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Synchronisation des modèles terminée');
    
    // Création des données de test pour les nouvelles tables
    const { Admin, Category, Chant, Utilisateur, Tag, Evenement } = require('./models');
    
    // Vérifier si l'admin par défaut existe
    const adminExists = await Admin.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        email: 'admin@gospel.com'
      });
      console.log('✅ Admin par défaut créé');
    }
    
    // Créer quelques tags par défaut
    const defaultTags = [
      { nom: 'Louange', couleur: '#FF6B6B', description: 'Chants de louange' },
      { nom: 'Adoration', couleur: '#4ECDC4', description: 'Chants d\'adoration' },
      { nom: 'Prière', couleur: '#45B7D1', description: 'Chants de prière' },
      { nom: 'Noël', couleur: '#96CEB4', description: 'Chants de Noël' },
      { nom: 'Pâques', couleur: '#FFEAA7', description: 'Chants de Pâques' },
      { nom: 'Français', couleur: '#DDA0DD', description: 'Chants en français' },
      { nom: 'Anglais', couleur: '#98D8C8', description: 'Chants en anglais' },
      { nom: 'Moderne', couleur: '#F7DC6F', description: 'Style moderne' },
      { nom: 'Traditionnel', couleur: '#BB8FCE', description: 'Style traditionnel' }
    ];
    
    for (const tagData of defaultTags) {
      const tagExists = await Tag.findOne({ where: { nom: tagData.nom } });
      if (!tagExists) {
        await Tag.create(tagData);
        console.log(`✅ Tag "${tagData.nom}" créé`);
      }
    }
    
    // Créer un utilisateur de démonstration
    const demoUser = await Utilisateur.findOne({ where: { email: 'demo@gospel.com' } });
    if (!demoUser) {
      await Utilisateur.create({
        nom: 'Utilisateur',
        prenom: 'Demo',
        email: 'demo@gospel.com',
        mot_de_passe: 'demo123',
        date_naissance: new Date('1990-01-01'),
        sexe: 'M',
        pays: 'France',
        ville: 'Paris',
        statut: 'actif',
        email_verifie: true,
        preferences: {
          notifications_email: true,
          notifications_push: true,
          qualite_audio: 'haute',
          lecture_automatique: true
        }
      });
      console.log('✅ Utilisateur de démonstration créé');
    }
    
    // Créer un événement de démonstration
    const demoEvent = await Evenement.findOne({ where: { titre: 'Concert Gospel de Noël' } });
    if (!demoEvent) {
      await Evenement.create({
        titre: 'Concert Gospel de Noël',
        description: 'Un magnifique concert gospel pour célébrer Noël avec des chants traditionnels et modernes.',
        date_debut: new Date('2024-12-24T19:00:00'),
        date_fin: new Date('2024-12-24T22:00:00'),
        lieu: 'Église Saint-Pierre',
        adresse: '123 Rue de la Paix, Paris, France',
        type: 'concert',
        organisateur: 'Chorale Gospel Unity',
        contact: 'contact@gospelunity.fr',
        prix: 15.00,
        capacite_max: 200,
        statut: 'publie'
      });
      console.log('✅ Événement de démonstration créé');
    }
    
    console.log('🎉 Initialisation de la base de données terminée avec succès !');
    
    // Afficher les statistiques
    const stats = await Promise.all([
      Admin.count(),
      Category.count(),
      Chant.count(),
      Utilisateur.count(),
      Tag.count(),
      Evenement.count()
    ]);
    
    console.log('\n📊 Statistiques de la base de données :');
    console.log(`- Admins: ${stats[0]}`);
    console.log(`- Catégories: ${stats[1]}`);
    console.log(`- Chants: ${stats[2]}`);
    console.log(`- Utilisateurs: ${stats[3]}`);
    console.log(`- Tags: ${stats[4]}`);
    console.log(`- Événements: ${stats[5]}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await sequelize.close();
  }
}

// Exécuter l'initialisation si ce fichier est appelé directement
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
