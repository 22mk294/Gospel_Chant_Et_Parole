const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Configuration avec timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

async function testCompleteAPI() {
  try {
    console.log('🚀 Test complet de l\'API avec interface admin');
    console.log('================================================');
    
    // 1. Test de connexion
    console.log('\n1. Test de connexion admin...');
    const loginResponse = await api.post('/auth/login', {
      username: 'admin',
      password: 'admin123'
    });
    console.log('✅ Connexion réussie');
    
    // Récupération du token
    const token = loginResponse.data.token;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // 2. Test récupération des statistiques
    console.log('\n2. Test statistiques dashboard...');
    try {
      const statsResponse = await api.get('/stats/dashboard');
      console.log('✅ Statistiques récupérées:', statsResponse.data);
    } catch (error) {
      console.log('❌ Erreur stats:', error.response?.data || error.message);
    }
    
    // 3. Test récupération des catégories
    console.log('\n3. Test récupération catégories...');
    const categoriesResponse = await api.get('/categories');
    console.log('✅ Catégories récupérées:', categoriesResponse.data.data ? categoriesResponse.data.data.length : categoriesResponse.data.length, 'catégories');
    
    // 4. Test récupération des chants
    console.log('\n4. Test récupération chants...');
    const chantsResponse = await api.get('/chants');
    console.log('✅ Chants récupérés:', chantsResponse.data.data ? chantsResponse.data.data.length : chantsResponse.data.length, 'chants');
    
    // 5. Test création d'une catégorie
    console.log('\n5. Test création catégorie...');
    const newCategory = {
      name: 'Test Frontend',
      description: 'Catégorie de test pour le frontend'
    };
    
    try {
      const createCategoryResponse = await api.post('/categories', newCategory);
      console.log('✅ Catégorie créée:', createCategoryResponse.data);
    } catch (error) {
      console.log('❌ Erreur création catégorie:', error.response?.data || error.message);
    }
    
    // 6. Test création d'un chant
    console.log('\n6. Test création chant...');
    const newChant = {
      title: 'Chant de test frontend',
      artist: 'Test Artist',
      category_id: 1,
      lyrics: 'Paroles de test pour le frontend',
      duration: 180,
      language: 'fr',
      tags: 'test,frontend'
    };
    
    try {
      const createChantResponse = await api.post('/chants', newChant);
      console.log('✅ Chant créé:', createChantResponse.data);
    } catch (error) {
      console.log('❌ Erreur création chant:', error.response?.data || error.message);
    }
    
    // 7. Test avec paramètres de pagination
    console.log('\n7. Test chants avec pagination...');
    const chantsWithPagination = await api.get('/chants?limit=5&offset=0');
    console.log('✅ Chants avec pagination:', chantsWithPagination.data.data ? chantsWithPagination.data.data.length : chantsWithPagination.data.length, 'chants');
    
    // 8. Test recherche de chants
    console.log('\n8. Test recherche chants...');
    const searchResponse = await api.get('/chants?search=test');
    console.log('✅ Recherche effectuée:', searchResponse.data.data ? searchResponse.data.data.length : searchResponse.data.length, 'résultats');
    
    console.log('\n================================================');
    console.log('✅ Tous les tests terminés avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Exécution du test
testCompleteAPI();
