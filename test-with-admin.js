// Script de test pour créer une catégorie et un chant
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Données de connexion admin
const adminCredentials = {
    username: 'joelmike',
    password: 'Beckyshawetu268563'
};

// Données de test
const testCategory = {
    name: 'Louange et Adoration'
};

const testChant = {
    title: 'Amazing Grace',
    lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.

Through many dangers, toils and snares,
I have already come;
'Tis grace hath brought me safe thus far,
And grace will lead me home.`
};

async function testApiWithAdmin() {
    try {
        console.log('🔄 Début du test avec l\'administrateur...\n');
        
        // 1. Connexion administrateur
        console.log('1️⃣ Connexion de l\'administrateur...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, adminCredentials);
        
        if (loginResponse.status === 200) {
            console.log('✅ Connexion réussie !');
            console.log(`👤 Admin: ${loginResponse.data.admin.username}`);
            console.log(`📧 Email: ${loginResponse.data.admin.email}`);
            console.log(`🔑 Token reçu: ${loginResponse.data.token.substring(0, 20)}...`);
        }
        
        const token = loginResponse.data.token;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        console.log('\n' + '='.repeat(50));
        
        // 2. Créer une catégorie
        console.log('\n2️⃣ Création d\'une catégorie...');
        const categoryResponse = await axios.post(`${BASE_URL}/categories`, testCategory, { headers });
        
        if (categoryResponse.status === 201) {
            console.log('✅ Catégorie créée avec succès !');
            console.log(`📂 Nom: ${categoryResponse.data.data.name}`);
            console.log(`🆔 ID: ${categoryResponse.data.data.id}`);
        }
        
        const categoryId = categoryResponse.data.data.id;
        
        console.log('\n' + '='.repeat(50));
        
        // 3. Créer un chant dans cette catégorie
        console.log('\n3️⃣ Création d\'un chant...');
        const chantWithCategory = {
            ...testChant,
            category_id: categoryId
        };
        
        const chantResponse = await axios.post(`${BASE_URL}/chants`, chantWithCategory, { headers });
        
        if (chantResponse.status === 201) {
            console.log('✅ Chant créé avec succès !');
            console.log(`🎵 Titre: ${chantResponse.data.data.title}`);
            console.log(`🆔 ID: ${chantResponse.data.data.id}`);
            console.log(`📂 Catégorie: ${chantResponse.data.data.Category.name}`);
        }
        
        console.log('\n' + '='.repeat(50));
        
        // 4. Vérifier les données créées
        console.log('\n4️⃣ Vérification des données...');
        
        // Récupérer toutes les catégories
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
        console.log(`📊 Total catégories: ${categoriesResponse.data.total}`);
        
        // Récupérer tous les chants
        const chantsResponse = await axios.get(`${BASE_URL}/chants`);
        console.log(`📊 Total chants: ${chantsResponse.data.total}`);
        
        console.log('\n' + '='.repeat(50));
        console.log('\n🎉 TEST TERMINÉ AVEC SUCCÈS !');
        console.log('\n📋 Résumé:');
        console.log(`✅ Admin connecté: ${loginResponse.data.admin.username}`);
        console.log(`✅ Catégorie créée: ${categoryResponse.data.data.name} (ID: ${categoryId})`);
        console.log(`✅ Chant créé: ${chantResponse.data.data.title} (ID: ${chantResponse.data.data.id})`);
        
    } catch (error) {
        console.error('❌ Erreur pendant le test:', error.response?.data || error.message);
        
        if (error.response) {
            console.error('📊 Status:', error.response.status);
            console.error('📄 Response:', error.response.data);
        }
    }
}

// Exécuter le test
testApiWithAdmin();
