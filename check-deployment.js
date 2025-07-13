#!/usr/bin/env node

// Script de vérification avant déploiement
const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification avant déploiement...\n');

const checks = [
  {
    name: 'package.json',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.scripts.start === 'node serveur/server.js' && 
             pkg.dependencies.pg && 
             pkg.dependencies['pg-hstore'];
    }
  },
  {
    name: 'Procfile',
    check: () => fs.existsSync('Procfile')
  },
  {
    name: 'render.yaml',
    check: () => fs.existsSync('render.yaml')
  },
  {
    name: 'build.sh',
    check: () => fs.existsSync('build.sh')
  },
  {
    name: 'Configuration PostgreSQL',
    check: () => {
      const dbConfig = fs.readFileSync('serveur/config/database.js', 'utf8');
      return dbConfig.includes('postgres') && dbConfig.includes('DATABASE_URL');
    }
  },
  {
    name: 'Script init-postgres',
    check: () => fs.existsSync('serveur/scripts/init-postgres.js')
  },
  {
    name: 'Endpoint health',
    check: () => {
      const appJs = fs.readFileSync('serveur/app.js', 'utf8');
      return appJs.includes('/api/health');
    }
  },
  {
    name: 'Documentation',
    check: () => fs.existsSync('RENDER_DEPLOYMENT_GUIDE.md')
  }
];

let allPassed = true;

checks.forEach(check => {
  try {
    const passed = check.check();
    console.log(`${passed ? '✅' : '❌'} ${check.name}`);
    if (!passed) allPassed = false;
  } catch (error) {
    console.log(`❌ ${check.name} (erreur: ${error.message})`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 Toutes les vérifications sont passées !');
  console.log('✅ Votre application est prête pour le déploiement sur Render');
  console.log('\n📋 Prochaines étapes :');
  console.log('1. Aller sur https://render.com');
  console.log('2. Créer une base de données PostgreSQL');
  console.log('3. Créer un service web');
  console.log('4. Configurer les variables d\'environnement');
  console.log('5. Déployer !');
  console.log('\n📖 Guide complet : RENDER_DEPLOYMENT_GUIDE.md');
} else {
  console.log('❌ Certaines vérifications ont échoué');
  console.log('🔧 Veuillez corriger les problèmes avant le déploiement');
}

console.log('\n' + '='.repeat(50));
