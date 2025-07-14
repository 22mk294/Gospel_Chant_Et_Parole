// Configuration spécifique pour la production sur Render
require('dotenv').config();

// Forcer l'environnement de production
process.env.NODE_ENV = 'production';

console.log('🚀 Démarrage en mode production');
console.log('📍 NODE_ENV:', process.env.NODE_ENV);
console.log('🔗 DATABASE_URL présente:', !!process.env.DATABASE_URL);

// Démarrer directement le serveur sans initialisation complexe
console.log('🔄 Démarrage du serveur Express...');
require('./server');
