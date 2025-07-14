#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🚀 Démarrage du build pour Vercel..."

# Vérifier si nous sommes dans le bon dossier
if [ ! -d "admin" ]; then
    echo "❌ Erreur: Dossier 'admin' non trouvé"
    exit 1
fi

# Aller dans le dossier admin
cd admin

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build

# Revenir au dossier racine
cd ..

echo "✅ Build terminé avec succès!"
