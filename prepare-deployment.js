#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Préparation des fichiers pour le déploiement GitHub/Render...\n');

// Fichiers essentiels à vérifier
const essentialFiles = [
  'package.json',
  'Procfile',
  'render.yaml',
  'build.sh',
  'README.md',
  'serveur/app.js',
  'serveur/server.js',
  'serveur/config/database.js'
];

// Créer le dossier de sortie
const outputDir = path.join(__dirname, 'deploy-ready');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📋 Vérification des fichiers essentiels...');
let allGood = true;

essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MANQUANT`);
    allGood = false;
  }
});

if (!allGood) {
  console.log('\n❌ Certains fichiers essentiels sont manquants!');
  process.exit(1);
}

console.log('\n📦 Préparation des instructions...');

// Créer un fichier d'instructions
const instructions = `
# 🚀 Instructions de déploiement

## 📂 Fichiers à uploader sur GitHub

### 1. Créer un nouveau repository
- Nom: Gospel_Chant_Et_Parole_Backend
- Public ou Private selon votre choix

### 2. Uploader ces fichiers À LA RACINE du repository:

#### Fichiers de configuration
- package.json
- Procfile
- render.yaml
- build.sh
- README.md
- .gitignore

#### Dossier serveur complet
- serveur/ (tout le dossier)

#### Fichiers de documentation
- RENDER_DEPLOYMENT_GUIDE.md
- GITHUB_STRUCTURE_GUIDE.md
- MIGRATION_SUMMARY.md

### 3. Structure finale sur GitHub
\`\`\`
Gospel_Chant_Et_Parole_Backend/
├── package.json              # À la racine
├── Procfile                  # À la racine
├── render.yaml               # À la racine
├── build.sh                  # À la racine
├── README.md                 # À la racine
├── serveur/                  # Dossier complet
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── scripts/
└── documentation/
\`\`\`

## 🔧 Configuration Render

### Variables d'environnement requises:
\`\`\`
NODE_ENV=production
PORT=5000
DATABASE_URL=<URL_de_votre_base_PostgreSQL>
JWT_SECRET=gospel-super-secret-jwt-key-2025-production
CORS_ORIGIN=*
\`\`\`

### Configuration du service:
- Build Command: npm install
- Start Command: npm start
- Root Directory: (laisser vide)

## ⚠️ Important
- Créer la base PostgreSQL AVANT le service web
- Copier l'URL de connexion de la base
- La coller dans DATABASE_URL du service web
- Initialiser la base avec: npm run init-postgres

## 🎯 Ordre des opérations
1. Créer le nouveau repository GitHub
2. Uploader tous les fichiers à la racine
3. Créer la base PostgreSQL sur Render
4. Créer le service web sur Render
5. Configurer les variables d'environnement
6. Déployer
7. Initialiser la base de données
`;

fs.writeFileSync(path.join(outputDir, 'DEPLOYMENT_INSTRUCTIONS.md'), instructions);

console.log('✅ Instructions créées dans deploy-ready/DEPLOYMENT_INSTRUCTIONS.md');
console.log('\n🎉 Préparation terminée!');
console.log('\n📋 Prochaines étapes:');
console.log('1. Créer un nouveau repository GitHub "Gospel_Chant_Et_Parole_Backend"');
console.log('2. Uploader TOUS les fichiers du backend à la racine');
console.log('3. Suivre les instructions dans deploy-ready/DEPLOYMENT_INSTRUCTIONS.md');
console.log('\n💡 La clé du succès: package.json doit être à la RACINE du repository!');
