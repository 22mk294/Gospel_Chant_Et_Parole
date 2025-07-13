const axios = require('axios');

async function testAuthentication() {
    console.log('🔧 Test d\'authentification et d\'accès aux données...\n');
    
    try {
        // 1. Test de connexion
        console.log('1. 🔐 Test de connexion...');
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            username: 'joelmike',
            password: 'Beckyshawetu268563'
        });
        
        console.log('✅ Connexion réussie');
        console.log('Token reçu:', loginResponse.data.token ? 'Oui' : 'Non');
        
        const token = loginResponse.data.token;
        
        // 2. Test d'accès aux catégories sans token
        console.log('\n2. 📂 Test d\'accès aux catégories sans token...');
        try {
            const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
            console.log('✅ Catégories récupérées sans token');
            console.log('Nombre de catégories:', categoriesResponse.data.total);
        } catch (error) {
            console.log('❌ Erreur sans token:', error.response?.status, error.response?.data?.message);
        }
        
        // 3. Test d'accès aux catégories avec token
        console.log('\n3. 🔑 Test d\'accès aux catégories avec token...');
        try {
            const categoriesWithTokenResponse = await axios.get('http://localhost:5000/api/categories', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('✅ Catégories récupérées avec token');
            console.log('Nombre de catégories:', categoriesWithTokenResponse.data.total);
        } catch (error) {
            console.log('❌ Erreur avec token:', error.response?.status, error.response?.data?.message);
        }
        
        // 4. Test d'accès aux chants
        console.log('\n4. 🎵 Test d\'accès aux chants...');
        try {
            const chantsResponse = await axios.get('http://localhost:5000/api/chants');
            console.log('✅ Chants récupérés');
            console.log('Nombre de chants:', chantsResponse.data.total);
        } catch (error) {
            console.log('❌ Erreur chants:', error.response?.status, error.response?.data?.message);
        }
        
        // 5. Test d'accès aux statistiques
        console.log('\n5. 📊 Test d\'accès aux statistiques...');
        try {
            const statsResponse = await axios.get('http://localhost:5000/api/stats/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('✅ Statistiques récupérées');
            console.log('Stats:', statsResponse.data);
        } catch (error) {
            console.log('❌ Erreur stats:', error.response?.status, error.response?.data?.message);
        }
        
        // 6. Test de création d'une catégorie
        console.log('\n6. ➕ Test de création d\'une catégorie...');
        try {
            const createResponse = await axios.post('http://localhost:5000/api/categories', {
                name: 'Test Category',
                description: 'Catégorie de test'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('✅ Catégorie créée');
            console.log('Nouvelle catégorie:', createResponse.data);
        } catch (error) {
            console.log('❌ Erreur création:', error.response?.status, error.response?.data?.message);
        }
        
    } catch (error) {
        console.error('❌ Erreur générale:', error.message);
    }
}

// Exécuter le test
if (require.main === module) {
    testAuthentication();
}

module.exports = { testAuthentication };
