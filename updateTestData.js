const { Chant, Category } = require('./serveur/models');
const sequelize = require('./serveur/config/database');

async function updateTestDataWithNewFields() {
    console.log('🚀 Mise à jour des données de test avec les nouveaux champs...\n');
    
    try {
        // Mettre à jour les chants existants
        const chants = await Chant.findAll();
        
        const chantsData = [
            {
                title: 'Que ton nom soit sanctifié',
                artist: 'Chœur Gospel de Paris',
                duration: 245,
                language: 'fr',
                tags: 'louange, prière, sanctification'
            },
            {
                title: 'Jésus tu es mon Sauveur',
                artist: 'Groupe Espoir',
                duration: 180,
                language: 'fr',
                tags: 'sauveur, espoir, foi'
            },
            {
                title: 'Saint, Saint, Saint',
                artist: 'Chœur Céleste',
                duration: 210,
                language: 'fr',
                tags: 'sainteté, adoration, gloire'
            },
            {
                title: 'Venez à Jésus',
                artist: 'Équipe Évangélisation',
                duration: 195,
                language: 'fr',
                tags: 'évangélisation, invitation, salut'
            },
            {
                title: 'Nous sommes un en Christ',
                artist: 'Assemblée Fraternelle',
                duration: 160,
                language: 'fr',
                tags: 'unité, fraternité, communion'
            },
            {
                title: 'Merveilleux Jésus',
                artist: 'Chœur Gospel de Paris',
                duration: 225,
                language: 'fr',
                tags: 'merveilleux, jésus, louange'
            }
        ];
        
        console.log('📝 Mise à jour des chants...');
        for (let i = 0; i < Math.min(chants.length, chantsData.length); i++) {
            const chant = chants[i];
            const data = chantsData[i];
            
            await chant.update({
                artist: data.artist,
                duration: data.duration,
                language: data.language,
                tags: data.tags,
                is_active: true
            });
            
            console.log(`✅ Chant mis à jour: ${chant.title}`);
        }
        
        // Ajouter quelques nouveaux chants avec des données complètes
        const newChants = [
            {
                title: 'Amazing Grace',
                artist: 'John Newton',
                lyrics: `Amazing grace, how sweet the sound
That saved a wretch like me
I once was lost, but now am found
Was blind, but now I see

'Twas grace that taught my heart to fear
And grace my fears relieved
How precious did that grace appear
The hour I first believed`,
                category_id: 1, // Louange
                duration: 270,
                language: 'en',
                tags: 'grace, salvation, classic',
                audio_url: 'https://example.com/amazing-grace.mp3',
                video_url: 'https://youtube.com/watch?v=amazing-grace',
                is_active: true
            },
            {
                title: 'How Great Thou Art',
                artist: 'Carl Boberg',
                lyrics: `O Lord my God, when I in awesome wonder
Consider all the worlds Thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed

Then sings my soul, my Savior God, to Thee
How great Thou art! How great Thou art!
Then sings my soul, my Savior God, to Thee
How great Thou art! How great Thou art!`,
                category_id: 2, // Adoration
                duration: 240,
                language: 'en',
                tags: 'greatness, worship, nature',
                audio_url: 'https://example.com/how-great-thou-art.mp3',
                video_url: 'https://youtube.com/watch?v=how-great-thou-art',
                is_active: true
            },
            {
                title: 'El Shaddai',
                artist: 'Michael Card',
                lyrics: `El Shaddai, El Shaddai
El Elyon na Adonai
Age to age You're still the same
By the power of the name

El Shaddai, El Shaddai
Erkamka na Adonai
We will praise and lift You high
El Shaddai`,
                category_id: 2, // Adoration
                duration: 195,
                language: 'en',
                tags: 'hebrew, names of god, worship',
                audio_url: 'https://example.com/el-shaddai.mp3',
                video_url: 'https://youtube.com/watch?v=el-shaddai',
                is_active: true
            }
        ];
        
        console.log('\n🎵 Ajout de nouveaux chants...');
        for (const chantData of newChants) {
            const [chant, created] = await Chant.findOrCreate({
                where: { title: chantData.title },
                defaults: chantData
            });
            
            console.log(`${created ? '✅ Créé' : '📋 Existe déjà'}: ${chant.title}`);
        }
        
        console.log('\n🎉 DONNÉES DE TEST MISES À JOUR AVEC SUCCÈS !');
        console.log('=====================================');
        
        const totalChants = await Chant.count();
        console.log(`🎵 Total des chants: ${totalChants}`);
        
        const chantsWithArtist = await Chant.count({ 
            where: { 
                artist: { 
                    [require('sequelize').Op.ne]: null 
                } 
            } 
        });
        console.log(`👨‍🎤 Chants avec artiste: ${chantsWithArtist}`);
        
        const chantsWithAudio = await Chant.count({ 
            where: { 
                audio_url: { 
                    [require('sequelize').Op.ne]: null 
                } 
            } 
        });
        console.log(`🎵 Chants avec audio: ${chantsWithAudio}`);
        
        const chantsWithVideo = await Chant.count({ 
            where: { 
                video_url: { 
                    [require('sequelize').Op.ne]: null 
                } 
            } 
        });
        console.log(`📹 Chants avec vidéo: ${chantsWithVideo}`);
        
        console.log('\n✅ Votre application dispose maintenant de données complètes !');
        console.log('🎯 Testez le nouveau formulaire d\'ajout de chants amélioré');
        
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour des données:', error);
        process.exit(1);
    }
}

// Exécuter le script
if (require.main === module) {
    updateTestDataWithNewFields();
}

module.exports = { updateTestDataWithNewFields };
