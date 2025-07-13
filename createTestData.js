const { Chant, Category } = require('./serveur/models');

async function createTestData() {
    console.log('🚀 Création des données de test...\n');
    
    try {
        // Créer des catégories de test
        const categories = [
            { name: 'Louange', description: 'Chants de louange et d\'adoration' },
            { name: 'Prière', description: 'Chants de prière et méditation' },
            { name: 'Adoration', description: 'Chants d\'adoration profonde' },
            { name: 'Évangélisation', description: 'Chants pour l\'évangélisation' },
            { name: 'Communion', description: 'Chants de communion fraternelle' }
        ];

        console.log('📂 Création des catégories...');
        const createdCategories = [];
        for (const category of categories) {
            const [cat, created] = await Category.findOrCreate({
                where: { name: category.name },
                defaults: category
            });
            createdCategories.push(cat);
            console.log(`  ${created ? '✅ Créée' : '📋 Existe déjà'}: ${cat.name}`);
        }

        // Créer des chants de test
        const chants = [
            {
                title: 'Que ton nom soit sanctifié',
                artist: 'Chœur Gospel',
                lyrics: `Que ton nom soit sanctifié
Que ton règne vienne
Que ta volonté soit faite
Sur la terre comme au ciel

Refrain:
Gloire à toi Seigneur
Gloire à toi Roi des rois
Tu es notre Père
Tu es notre Dieu`,
                category_id: createdCategories[0].id, // Louange
                audio_url: 'https://example.com/audio1.mp3',
                video_url: 'https://example.com/video1.mp4'
            },
            {
                title: 'Jésus tu es mon Sauveur',
                artist: 'Groupe de Prière',
                lyrics: `Jésus tu es mon Sauveur
Tu es mon Rédempteur
Dans les épreuves tu es là
Pour me consoler

Refrain:
Alleluia, Alleluia
Jésus tu es vivant
Alleluia, Alleluia
Tu es ressuscité`,
                category_id: createdCategories[1].id, // Prière
                audio_url: 'https://example.com/audio2.mp3',
                video_url: 'https://example.com/video2.mp4'
            },
            {
                title: 'Saint, Saint, Saint',
                artist: 'Chœur Céleste',
                lyrics: `Saint, Saint, Saint
Est l'Éternel des armées
Toute la terre est pleine
De sa gloire

Les séraphins crient
Saint, Saint, Saint
Devant le trône de grâce
De notre Dieu`,
                category_id: createdCategories[2].id, // Adoration
                audio_url: 'https://example.com/audio3.mp3',
                video_url: 'https://example.com/video3.mp4'
            },
            {
                title: 'Venez à Jésus',
                artist: 'Équipe Évangélisation',
                lyrics: `Venez à Jésus
Tous vous qui êtes fatigués
Venez à Jésus
Vous trouverez le repos

Il vous appelle
Il vous aime
Venez à lui sans tarder
Il vous sauvera`,
                category_id: createdCategories[3].id, // Évangélisation
                audio_url: 'https://example.com/audio4.mp3',
                video_url: 'https://example.com/video4.mp4'
            },
            {
                title: 'Nous sommes un en Christ',
                artist: 'Assemblée Fraternelle',
                lyrics: `Nous sommes un en Christ
Unis par son amour
Nous sommes un en Christ
Marchons ensemble

Frères et sœurs
Dans la foi
Partageons la paix
Du Seigneur`,
                category_id: createdCategories[4].id, // Communion
                audio_url: 'https://example.com/audio5.mp3',
                video_url: 'https://example.com/video5.mp4'
            },
            {
                title: 'Merveilleux Jésus',
                artist: 'Chœur Gospel',
                lyrics: `Merveilleux Jésus
Admirable conseiller
Prince de la paix
Dieu puissant

Tu es mon espoir
Tu es ma joie
Tu es ma vie
Mon Sauveur`,
                category_id: createdCategories[0].id, // Louange
                audio_url: 'https://example.com/audio6.mp3',
                video_url: 'https://example.com/video6.mp4'
            }
        ];

        console.log('\n🎵 Création des chants...');
        const createdChants = [];
        for (const chant of chants) {
            const [song, created] = await Chant.findOrCreate({
                where: { title: chant.title },
                defaults: chant
            });
            createdChants.push(song);
            console.log(`  ${created ? '✅ Créé' : '📋 Existe déjà'}: ${song.title}`);
        }

        console.log('\n🎉 DONNÉES DE TEST CRÉÉES AVEC SUCCÈS !');
        console.log('=====================================');
        console.log(`📂 Catégories: ${createdCategories.length}`);
        console.log(`🎵 Chants: ${createdChants.length}`);
        
        // Afficher les statistiques
        console.log('\n📊 Statistiques:');
        createdCategories.forEach(cat => {
            const count = createdChants.filter(chant => chant.category_id === cat.id).length;
            console.log(`  ${cat.name}: ${count} chant(s)`);
        });
        
        console.log('\n✅ Votre application dispose maintenant de données de test !');
        console.log('🎯 Vous pouvez maintenant tester les pages Chants et Catégories');
        
    } catch (error) {
        console.error('❌ Erreur lors de la création des données de test:', error);
        process.exit(1);
    }
}

// Exécuter le script
if (require.main === module) {
    createTestData();
}

module.exports = { createTestData };
