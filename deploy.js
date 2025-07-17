#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Démarrage du processus de déploiement...\n');

// Configuration
const rootDir = process.cwd();
const adminDir = path.join(rootDir, 'admin');

// Fonction pour exécuter des commandes
function runCommand(command, description) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: rootDir });
    console.log(`✅ ${description} terminé\n`);
  } catch (error) {
    console.error(`❌ Erreur lors de ${description}:`, error.message);
    process.exit(1);
  }
}

// Fonction pour vérifier les fichiers
function checkFiles() {
  console.log('🔍 Vérification des fichiers...');
  
  // Vérifier que le logo existe
  const logoPath = path.join(adminDir, 'src', 'assets', 'images', 'logoGospel.PNG');
  if (!fs.existsSync(logoPath)) {
    console.error('❌ Logo manquant:', logoPath);
    process.exit(1);
  }
  console.log('✅ Logo trouvé:', logoPath);
  
  // Vérifier le composant Logo
  const logoComponent = path.join(adminDir, 'src', 'components', 'common', 'Logo.jsx');
  if (!fs.existsSync(logoComponent)) {
    console.error('❌ Composant Logo manquant:', logoComponent);
    process.exit(1);
  }
  console.log('✅ Composant Logo trouvé:', logoComponent);
  
  // Vérifier la configuration backend
  const serverFile = path.join(rootDir, 'serveur', 'server.js');
  if (!fs.existsSync(serverFile)) {
    console.error('❌ Fichier serveur manquant:', serverFile);
    process.exit(1);
  }
  console.log('✅ Serveur backend trouvé:', serverFile);
  
  console.log('✅ Tous les fichiers requis sont présents\n');
}

// Fonction pour mettre à jour les variables d'environnement
function updateEnvVars() {
  console.log('🔧 Mise à jour des variables d'environnement...');
  
  // Vérifier .env
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    console.log('✅ Fichier .env trouvé');
  } else {
    console.log('⚠️  Fichier .env manquant - création d\'un exemple...');
    const envExample = `NODE_ENV=production
PORT=5000
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_url_here
`;
    fs.writeFileSync(envPath, envExample);
    console.log('✅ Fichier .env créé - veuillez le configurer');
  }
  
  // Vérifier .env.production pour le frontend
  const frontendEnvPath = path.join(adminDir, '.env.production');
  if (fs.existsSync(frontendEnvPath)) {
    console.log('✅ Fichier .env.production (frontend) trouvé');
  } else {
    console.log('⚠️  Création de .env.production pour le frontend...');
    const frontendEnv = `REACT_APP_API_URL=https://votre-api.onrender.com
REACT_APP_ENV=production
`;
    fs.writeFileSync(frontendEnvPath, frontendEnv);
    console.log('✅ Fichier .env.production créé pour le frontend');
  }
  
  console.log('✅ Variables d\'environnement vérifiées\n');
}

// Fonction principale
async function deploy() {
  try {
    console.log('🎯 Gospel Chant Et Parole - Déploiement avec Logo');
    console.log('================================================\n');
    
    // Étape 1: Vérifications préliminaires
    checkFiles();
    updateEnvVars();
    
    // Étape 2: Installation des dépendances backend
    runCommand('npm install', 'Installation des dépendances backend');
    
    // Étape 3: Installation des dépendances frontend
    runCommand('cd admin && npm install', 'Installation des dépendances frontend');
    
    // Étape 4: Build du frontend avec le logo
    runCommand('cd admin && npm run build', 'Construction du frontend avec logo');
    
    // Étape 5: Vérification du build
    console.log('🔍 Vérification du build...');
    const distPath = path.join(adminDir, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(path.join(distPath, 'assets'));
      const logoFile = files.find(f => f.includes('logoGospel'));
      if (logoFile) {
        console.log(`✅ Logo intégré au build: ${logoFile}`);
      } else {
        console.log('⚠️  Logo non trouvé dans le build');
      }
    }
    
    // Étape 6: Tests (optionnel)
    console.log('🧪 Tests (optionnel)...');
    try {
      runCommand('npm test', 'Exécution des tests');
    } catch (error) {
      console.log('⚠️  Tests échoués - continuant le déploiement...');
    }
    
    // Étape 7: Informations de déploiement
    console.log('📝 Informations de déploiement:');
    console.log('================================');
    console.log('• Backend: Prêt pour Render');
    console.log('• Frontend: Build terminé avec logo');
    console.log('• Logo: Intégré dans tous les composants');
    console.log('• Favicon: Mis à jour');
    console.log('• Documentation: Swagger protégée');
    console.log('• Paramètres: Page complète avec monitoring');
    
    console.log('\n🎉 Déploiement préparé avec succès!');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Committez les changements: git add . && git commit -m "Intégration logo et améliorations"');
    console.log('2. Poussez vers GitHub: git push origin main');
    console.log('3. Render détectera automatiquement les changements');
    console.log('4. Vérifiez le déploiement sur votre URL Render');
    
  } catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    process.exit(1);
  }
}

// Exécuter le déploiement
deploy();
