#!/usr/bin/env node

/**
 * Script de déploiement automatique pour Gospel Chant et Parole
 * Ce script vérifie l'état du backend et déploie le frontend
 */

import https from 'https';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  backend: {
    url: 'https://gospel-chant-et-parole.onrender.com',
    healthEndpoint: '/health',
    timeout: 60000
  },
  frontend: {
    buildDir: 'dist',
    vercelConfig: 'vercel.json'
  }
};

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkBackendHealth() {
  return new Promise((resolve, reject) => {
    log('🔍 Vérification de l\'état du backend...', 'blue');
    
    const req = https.get(`${CONFIG.backend.url}${CONFIG.backend.healthEndpoint}`, {
      timeout: CONFIG.backend.timeout
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const health = JSON.parse(data);
            log(`✅ Backend opérationnel : ${health.status}`, 'green');
            log(`📊 Base de données : ${health.database}`, 'green');
            resolve(health);
          } catch (error) {
            log(`❌ Erreur de parsing de la réponse backend : ${error.message}`, 'red');
            reject(error);
          }
        } else {
          log(`❌ Backend non disponible (Status: ${res.statusCode})`, 'red');
          reject(new Error(`Backend status: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      log(`❌ Erreur de connexion au backend : ${error.message}`, 'red');
      reject(error);
    });

    req.on('timeout', () => {
      log(`❌ Timeout de connexion au backend`, 'red');
      req.destroy();
      reject(new Error('Backend timeout'));
    });
  });
}

function buildFrontend() {
  return new Promise((resolve, reject) => {
    log('🔨 Construction du frontend...', 'blue');
    
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        log(`❌ Erreur lors de la construction : ${error.message}`, 'red');
        reject(error);
        return;
      }
      
      if (stderr) {
        log(`⚠️  Avertissements de build : ${stderr}`, 'yellow');
      }
      
      log('✅ Frontend construit avec succès', 'green');
      resolve(stdout);
    });
  });
}

function checkDeploymentFiles() {
  log('📁 Vérification des fichiers de déploiement...', 'blue');
  
  const requiredFiles = [
    '.env',
    '.env.production',
    'vercel.json',
    'package.json',
    'vite.config.js'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    log(`❌ Fichiers manquants : ${missingFiles.join(', ')}`, 'red');
    return false;
  }
  
  log('✅ Tous les fichiers de déploiement sont présents', 'green');
  return true;
}

function displayDeploymentInfo() {
  log('\n📋 Informations de déploiement :', 'blue');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  
  // Informations Backend
  log('🔧 Backend :', 'green');
  log(`   URL : ${CONFIG.backend.url}`, 'reset');
  log(`   Status : Opérationnel`, 'green');
  log(`   Base de données : PostgreSQL`, 'reset');
  log(`   Host : dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com`, 'reset');
  log(`   Database : gospelchantetparole`, 'reset');
  
  // Informations Frontend
  log('\n🎨 Frontend :', 'green');
  log(`   Framework : React + Vite`, 'reset');
  log(`   Build Status : Prêt`, 'green');
  log(`   Déploiement : Vercel`, 'reset');
  log(`   Configuration : vercel.json`, 'reset');
  
  // Administrateur
  log('\n👤 Administrateur :', 'green');
  log(`   Username : joelmike`, 'reset');
  log(`   Email : joelmikemukendi22mk294@gospelchantetparole.com`, 'reset');
  log(`   Status : Créé et validé`, 'green');
  
  log('\n📝 Commandes de déploiement :', 'yellow');
  log('   npm install -g vercel', 'reset');
  log('   vercel login', 'reset');
  log('   vercel --prod', 'reset');
  
  log('\n🚀 Prêt pour le déploiement !', 'green');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
}

async function main() {
  try {
    log('🚀 Démarrage du processus de déploiement...', 'blue');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
    
    // Vérification du backend
    await checkBackendHealth();
    
    // Vérification des fichiers
    if (!checkDeploymentFiles()) {
      process.exit(1);
    }
    
    // Construction du frontend
    await buildFrontend();
    
    // Affichage des informations de déploiement
    displayDeploymentInfo();
    
    log('\n✅ Processus de préparation terminé avec succès !', 'green');
    
  } catch (error) {
    log(`\n❌ Erreur durant le processus : ${error.message}`, 'red');
    process.exit(1);
  }
}

// Exécution
main();
