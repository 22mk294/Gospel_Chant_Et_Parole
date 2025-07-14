#!/bin/bash

# Script de déploiement pour Gospel Chant et Parole Backend

echo "🚀 Déploiement du backend Gospel Chant et Parole"
echo "=================================================="

# Vérifier le statut git
echo "📋 Vérification du statut Git..."
git status

# Ajouter tous les fichiers modifiés
echo "📦 Ajout des fichiers modifiés..."
git add .

# Commit avec message automatique
echo "💾 Commit des modifications..."
git commit -m "Fix: Configuration PostgreSQL pour production Render - $(date)"

# Push vers le repository
echo "🚀 Push vers GitHub..."
git push origin main

echo "✅ Déploiement terminé !"
echo "🔗 Render va automatiquement redéployer votre application"
echo "🌐 URL: https://gospel-chant-et-parole.onrender.com"
