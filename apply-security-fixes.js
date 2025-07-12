#!/usr/bin/env node

/**
 * Script pour appliquer les corrections de sécurité critiques
 * À exécuter après l'analyse de sécurité
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔒 Application des corrections de sécurité critiques...\n');

// 1. Générer un JWT secret fort
console.log('1. 🔐 Génération d\'un JWT secret cryptographiquement fort...');
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log(`   Nouveau JWT_SECRET: ${jwtSecret}`);

// 2. Créer un fichier .env sécurisé
console.log('\n2. 📝 Création du fichier .env sécurisé...');
const envContent = `# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASS=VotreMotDePasseComplexe123!
DB_NAME=gospelchantetparole
DB_NAME_TEST=gospelchantetparole_test

# JWT Secret - GÉNÉRÉ AUTOMATIQUEMENT
JWT_SECRET=${jwtSecret}

# Configuration du serveur
PORT=5000
NODE_ENV=development

# Configuration pour la production
# SSL_CERT_PATH=/path/to/certificate.pem
# SSL_KEY_PATH=/path/to/private-key.pem
`;

fs.writeFileSync('.env', envContent);
console.log('   ✅ Fichier .env créé avec secret sécurisé');

// 3. Créer un script d'installation des dépendances de sécurité
console.log('\n3. 📦 Création du script d\'installation sécurisé...');
const installScript = `#!/bin/bash
# Installation des dépendances de sécurité

echo "🔒 Installation des packages de sécurité..."

# Helmet pour headers sécurisés
npm install helmet

# Winston pour logging
npm install winston

# Express-slow-down pour protection brute force
npm install express-slow-down

# Joi pour validation avancée (optionnel)
npm install joi

echo "✅ Packages de sécurité installés"
echo "📝 Consultez SECURITY_ANALYSIS.md pour les étapes suivantes"
`;

fs.writeFileSync('install-security.sh', installScript);
fs.chmodSync('install-security.sh', '755');
console.log('   ✅ Script install-security.sh créé');

// 4. Créer un middleware de sécurité amélioré
console.log('\n4. 🛡️ Création des middlewares de sécurité...');
const securityMiddleware = `// Middleware de sécurité avancé
const helmet = require('helmet');
const slowDown = require('express-slow-down');

// Configuration Helmet
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
};

// Protection contre brute force sur auth
const authLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // ralentir après 5 tentatives
  delayMs: 500, // délai de 500ms
  maxDelayMs: 20000, // délai max 20s
  skipSuccessfulRequests: true
});

// Validation des IDs numériques
const validateNumericId = (req, res, next) => {
  const id = req.params.id;
  if (id && !Number.isInteger(parseInt(id))) {
    return res.status(400).json({
      message: 'ID doit être un nombre entier'
    });
  }
  next();
};

module.exports = {
  helmet: helmet(helmetConfig),
  authLimiter,
  validateNumericId
};
`;

fs.writeFileSync('serveur/middlewares/security.js', securityMiddleware);
console.log('   ✅ Middleware security.js créé');

// 5. Créer un système de logging sécurisé
console.log('\n5. 📊 Création du système de logging...');
const logger = `// Système de logging sécurisé
const winston = require('winston');
const path = require('path');

// Configuration du logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'gospel-backend' },
  transports: [
    // Erreurs dans fichier séparé
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), 
      level: 'error' 
    }),
    // Tous les logs
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/combined.log') 
    })
  ]
});

// En développement, logger aussi dans la console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Fonctions utilitaires
const logAuth = (action, user, req) => {
  logger.info('Auth', {
    action,
    user,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
};

const logError = (error, req) => {
  logger.error('Error', {
    error: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
};

module.exports = {
  logger,
  logAuth,
  logError
};
`;

// Créer le dossier logs
if (!fs.existsSync('serveur/logs')) {
  fs.mkdirSync('serveur/logs', { recursive: true });
}

fs.writeFileSync('serveur/services/logger.js', logger);
console.log('   ✅ Système de logging créé');

// 6. Créer un endpoint health check
console.log('\n6. 🩺 Création du health check...');
const healthCheck = `// Health check endpoint
const { sequelize } = require('../models');

exports.health = async (req, res) => {
  try {
    // Vérifier la connexion DB
    await sequelize.authenticate();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      uptime: process.uptime()
    };
    
    res.json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed'
    });
  }
};
`;

fs.writeFileSync('serveur/controllers/healthController.js', healthCheck);
console.log('   ✅ Health check créé');

// 7. Créer un guide d'implémentation
console.log('\n7. 📚 Création du guide d\'implémentation...');
const implementationGuide = `# 🔒 GUIDE D'IMPLÉMENTATION DES CORRECTIONS DE SÉCURITÉ

## 1. Installation des dépendances
\`\`\`bash
./install-security.sh
\`\`\`

## 2. Mise à jour de app.js
\`\`\`javascript
// Ajouter en haut du fichier
const { helmet, authLimiter } = require('./middlewares/security');
const { logger } = require('./services/logger');

// Ajouter après les middlewares existants
app.use(helmet);

// Ajouter sur les routes d'authentification
app.use('/api/auth', authLimiter);

// Ajouter route health check
app.get('/health', require('./controllers/healthController').health);
\`\`\`

## 3. Mise à jour du modèle Admin
\`\`\`javascript
// Dans serveur/models/Admin.js, changer:
timestamps: false,
// Par:
timestamps: true,
\`\`\`

## 4. Mise à jour des routes avec validation ID
\`\`\`javascript
// Dans chaque route avec :id, ajouter:
const { validateNumericId } = require('../middlewares/security');

router.get('/:id', validateNumericId, controller.getById);
router.put('/:id', validateNumericId, controller.update);
router.delete('/:id', validateNumericId, controller.delete);
\`\`\`

## 5. Mise à jour du gestionnaire d'erreurs
\`\`\`javascript
// Dans serveur/middlewares/errorHandler.js, supprimer:
...(process.env.NODE_ENV === 'development' && { stack: err.stack })
\`\`\`

## 6. Redémarrer le serveur
\`\`\`bash
npm run dev
\`\`\`

## 7. Tester les améliorations
- Vérifier /health
- Tester les headers sécurisés
- Vérifier les logs
- Tester la limitation de débit
`;

fs.writeFileSync('SECURITY_IMPLEMENTATION.md', implementationGuide);
console.log('   ✅ Guide d\'implémentation créé');

console.log('\n🎉 Corrections de sécurité appliquées avec succès !');
console.log('\n📝 Prochaines étapes :');
console.log('   1. Exécuter: ./install-security.sh');
console.log('   2. Suivre le guide: SECURITY_IMPLEMENTATION.md');
console.log('   3. Consulter l\'analyse: SECURITY_ANALYSIS.md');
console.log('   4. Tester avec: npm run dev');
console.log('\n🔒 Votre backend sera alors sécurisé pour la production !');
