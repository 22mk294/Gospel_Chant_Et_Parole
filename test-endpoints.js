// Script de test des endpoints API
const axios = require('axios');

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://gospel-chant-et-parole.onrender.com'
  : 'http://localhost:5000';

async function testEndpoints() {
  console.log('🧪 Test des endpoints API...');
  console.log(`🔗 Base URL: ${BASE_URL}`);
  
  const tests = [
    {
      name: 'Health Check',
      url: `${BASE_URL}/api/health`,
      method: 'GET'
    },
    {
      name: 'Categories',
      url: `${BASE_URL}/api/categories`,
      method: 'GET'
    },
    {
      name: 'Chants',
      url: `${BASE_URL}/api/chants`,
      method: 'GET'
    },
    {
      name: 'Stats Dashboard',
      url: `${BASE_URL}/api/stats/dashboard`,
      method: 'GET'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`\n🔍 Test: ${test.name}`);
      const response = await axios({
        method: test.method,
        url: test.url,
        timeout: 10000
      });
      
      console.log(`✅ ${test.name}: ${response.status} - ${response.statusText}`);
      if (response.data && typeof response.data === 'object') {
        console.log(`📊 Data: ${JSON.stringify(response.data).substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Data: ${JSON.stringify(error.response.data).substring(0, 200)}`);
      }
    }
  }
  
  console.log('\n🎉 Tests terminés !');
}

testEndpoints();
