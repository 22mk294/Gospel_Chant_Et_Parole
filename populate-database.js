// Script pour remplir la base de données avec plusieurs catégories et chants
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Données de connexion admin
const adminCredentials = {
    username: 'joelmike',
    password: 'Beckyshawetu268563'
};

// Données de test complètes
const testData = {
    categories: [
        { name: 'Louange et Adoration' },
        { name: 'Chants d\'évangélisation' },
        { name: 'Méditation et Prière' },
        { name: 'Chants de Noël' },
        { name: 'Cantiques Traditionnels' }
    ],
    chants: [
        {
            title: 'Amazing Grace',
            lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.`,
            category: 'Cantiques Traditionnels'
        },
        {
            title: 'Jésus, mon Sauveur',
            lyrics: `Jésus, mon Sauveur et mon Roi
Tu es ma force et ma joie
Dans les épreuves je crois en Toi
Tu es fidèle, Tu es là

Hosanna, hosanna
Gloire à Ton nom
Hosanna, hosanna
Tu es le Saint, Tu es le Bon`,
            category: 'Louange et Adoration'
        },
        {
            title: 'Venez à moi',
            lyrics: `Venez à moi, vous qui êtes fatigués
Et je vous donnerai du repos
Venez à moi, vous qui êtes chargés
Mon joug est doux, mon fardeau léger

Jésus appelle, Jésus appelle
Venez à Lui sans tarder
Jésus appelle, Jésus appelle
Il veut vous sauver`,
            category: 'Chants d\'évangélisation'
        },
        {
            title: 'Dans le silence de la nuit',
            lyrics: `Dans le silence de la nuit
Seigneur, je viens vers Toi
Mon cœur cherche Ta présence
Dans la prière et la foi

Parle-moi, Seigneur
Ton serviteur écoute
Montre-moi le chemin
Que Tu veux que je suive`,
            category: 'Méditation et Prière'
        },
        {
            title: 'Il est né le divin enfant',
            lyrics: `Il est né le divin enfant
Jouez, hautbois, résonnez, musettes
Il est né le divin enfant
Chantons tous son avènement

Depuis plus de quatre mille ans
Nous le promettaient les prophètes
Depuis plus de quatre mille ans
Nous attendions cet heureux temps`,
            category: 'Chants de Noël'
        }
    ]
};

async function populateDatabase() {
    try {
        console.log('🔄 Début du remplissage de la base de données...\n');
        
        // 1. Connexion administrateur
        console.log('1️⃣ Connexion de l\'administrateur...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, adminCredentials);
        
        if (loginResponse.status === 200) {
            console.log('✅ Connexion réussie !');
            console.log(`👤 Admin: ${loginResponse.data.admin.username}`);
        }
        
        const token = loginResponse.data.token;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        console.log('\n' + '='.repeat(60));
        
        // 2. Créer les catégories
        console.log('\n2️⃣ Création des catégories...');
        const createdCategories = {};
        
        for (const categoryData of testData.categories) {
            try {
                const categoryResponse = await axios.post(`${BASE_URL}/categories`, categoryData, { headers });
                
                if (categoryResponse.status === 201) {
                    createdCategories[categoryData.name] = categoryResponse.data.data.id;
                    console.log(`✅ Catégorie créée: ${categoryData.name} (ID: ${categoryResponse.data.data.id})`);
                }
            } catch (error) {
                if (error.response?.status === 400 && error.response?.data?.message?.includes('existe déjà')) {
                    console.log(`⚠️ Catégorie déjà existante: ${categoryData.name}`);
                    
                    // Récupérer l'ID de la catégorie existante
                    const existingCategories = await axios.get(`${BASE_URL}/categories`);
                    const existingCategory = existingCategories.data.data.find(cat => cat.name === categoryData.name);
                    if (existingCategory) {
                        createdCategories[categoryData.name] = existingCategory.id;
                    }
                } else {
                    console.error(`❌ Erreur création catégorie ${categoryData.name}:`, error.response?.data || error.message);
                }
            }
        }
        
        console.log('\n' + '='.repeat(60));
        
        // 3. Créer les chants
        console.log('\n3️⃣ Création des chants...');
        let createdChants = 0;
        
        for (const chantData of testData.chants) {
            try {
                const categoryId = createdCategories[chantData.category];
                
                if (!categoryId) {
                    console.log(`⚠️ Catégorie non trouvée pour: ${chantData.title}`);
                    continue;
                }
                
                const chantPayload = {
                    title: chantData.title,
                    lyrics: chantData.lyrics,
                    category_id: categoryId
                };
                
                const chantResponse = await axios.post(`${BASE_URL}/chants`, chantPayload, { headers });
                
                if (chantResponse.status === 201) {
                    createdChants++;
                    console.log(`✅ Chant créé: ${chantData.title} (ID: ${chantResponse.data.data.id}) - Catégorie: ${chantData.category}`);
                }
            } catch (error) {
                console.error(`❌ Erreur création chant ${chantData.title}:`, error.response?.data || error.message);
            }
        }
        
        console.log('\n' + '='.repeat(60));
        
        // 4. Vérification finale
        console.log('\n4️⃣ Vérification finale...');
        
        const finalCategories = await axios.get(`${BASE_URL}/categories`);
        const finalChants = await axios.get(`${BASE_URL}/chants`);
        
        console.log(`📊 Total catégories: ${finalCategories.data.total}`);
        console.log(`📊 Total chants: ${finalChants.data.total}`);
        
        // Afficher le détail des catégories
        console.log('\n📂 Détail des catégories:');
        finalCategories.data.data.forEach(category => {
            console.log(`   - ${category.name} (${category.Chants.length} chant(s))`);
        });
        
        console.log('\n' + '='.repeat(60));
        console.log('\n🎉 BASE DE DONNÉES REMPLIE AVEC SUCCÈS !');
        console.log(`\n📋 Résumé final:`);
        console.log(`✅ Admin connecté: ${loginResponse.data.admin.username}`);
        console.log(`✅ Catégories créées: ${Object.keys(createdCategories).length}`);
        console.log(`✅ Chants créés: ${createdChants}`);
        console.log(`✅ Total catégories: ${finalCategories.data.total}`);
        console.log(`✅ Total chants: ${finalChants.data.total}`);
        
    } catch (error) {
        console.error('❌ Erreur pendant le remplissage:', error.response?.data || error.message);
    }
}

// Exécuter le script
populateDatabase();
