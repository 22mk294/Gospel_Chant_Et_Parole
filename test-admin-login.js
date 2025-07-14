// Script pour tester la connexion de l'administrateur
require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://gospel-chant-et-parole.onrender.com/api'
  : 'http://localhost:5000/api';

async function testAdminLogin() {
  console.log('🔐 Test de connexion administrateur...');
  console.log(`🌐 URL API: ${API_URL}`);
  
  const adminData = {
    username: 'joelmike',
    email: 'joelmikemukendi22mk294@gospelchantetparole.com',
    password: 'Beckyshawetu268563'
  };
  
  // Test 1: Connexion avec username
  try {
    console.log('\n1️⃣ Test connexion avec username...');
    const response1 = await axios.post(`${API_URL}/auth/login`, {
      username: adminData.username,
      password: adminData.password
    });
    
    console.log('✅ Connexion avec username réussie !');
    console.log('📋 Réponse:', {
      success: response1.data.success,
      message: response1.data.message,
      token: response1.data.token ? 'Token généré' : 'Pas de token',
      admin: response1.data.admin ? {
        id: response1.data.admin.id,
        username: response1.data.admin.username,
        email: response1.data.admin.email
      } : 'Pas d\'info admin'
    });
    
  } catch (error) {
    console.log('❌ Erreur connexion username:', error.response?.data || error.message);
  }
  
  // Test 2: Connexion avec email
  try {
    console.log('\n2️⃣ Test connexion avec email...');
    const response2 = await axios.post(`${API_URL}/auth/login`, {
      username: adminData.email,
      password: adminData.password
    });
    
    console.log('✅ Connexion avec email réussie !');
    console.log('📋 Réponse:', {
      success: response2.data.success,
      message: response2.data.message,
      token: response2.data.token ? 'Token généré' : 'Pas de token',
      admin: response2.data.admin ? {
        id: response2.data.admin.id,
        username: response2.data.admin.username,
        email: response2.data.admin.email
      } : 'Pas d\'info admin'
    });
    
  } catch (error) {
    console.log('❌ Erreur connexion email:', error.response?.data || error.message);
  }
  
  // Test 3: Test avec mauvais mot de passe
  try {
    console.log('\n3️⃣ Test avec mauvais mot de passe...');
    const response3 = await axios.post(`${API_URL}/auth/login`, {
      username: adminData.username,
      password: 'mauvais_password'
    });
    
    console.log('⚠️ Connexion avec mauvais mot de passe réussie (ne devrait pas arriver)');
    
  } catch (error) {
    console.log('✅ Connexion avec mauvais mot de passe correctement rejetée');
    console.log('📋 Erreur:', error.response?.data?.message || error.message);
  }
  
  console.log('\n🎉 Tests de connexion terminés !');
  console.log('\n🔐 Identifiants validés:');
  console.log(`   - Username: ${adminData.username}`);
  console.log(`   - Email: ${adminData.email}`);
  console.log(`   - Mot de passe: ${adminData.password}`);
}

testAdminLogin();
