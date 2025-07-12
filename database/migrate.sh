#!/bin/bash

# 🎵 Gospel Chant et Parole - Script de migration de base de données
# Version: 2.0
# Date: 2025-07-12

echo "🎵 Gospel Chant et Parole - Migration de base de données"
echo "========================================================"

# Variables de configuration
DB_HOST="localhost"
DB_NAME="gospelchantetparole"
DB_USER="root"

# Demander le mot de passe MySQL
echo "🔐 Veuillez entrer le mot de passe MySQL pour l'utilisateur root:"
read -s DB_PASSWORD

# Vérifier la connexion
echo "🔍 Vérification de la connexion à la base de données..."
mysql -h$DB_HOST -u$DB_USER -p$DB_PASSWORD -e "SELECT 1" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Erreur: Impossible de se connecter à la base de données"
    echo "Vérifiez vos paramètres de connexion"
    exit 1
fi

echo "✅ Connexion à la base de données réussie"

# Créer un backup de la base de données existante
echo "💾 Création d'un backup de la base de données existante..."
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
mysqldump -h$DB_HOST -u$DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_FILE 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Backup créé: $BACKUP_FILE"
else
    echo "⚠️  Attention: Impossible de créer le backup"
    echo "Voulez-vous continuer sans backup? (y/N)"
    read -r CONTINUE
    if [[ ! $CONTINUE =~ ^[Yy]$ ]]; then
        echo "❌ Migration annulée"
        exit 1
    fi
fi

# Exécuter la migration
echo "🔄 Exécution de la migration..."
mysql -h$DB_HOST -u$DB_USER -p$DB_PASSWORD $DB_NAME < migration_v2.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration terminée avec succès!"
    echo "📊 Vérification des tables créées:"
    mysql -h$DB_HOST -u$DB_USER -p$DB_PASSWORD $DB_NAME -e "SHOW TABLES;"
else
    echo "❌ Erreur lors de la migration"
    echo "💾 Vous pouvez restaurer la base de données avec:"
    echo "mysql -h$DB_HOST -u$DB_USER -p$DB_PASSWORD $DB_NAME < $BACKUP_FILE"
    exit 1
fi

echo ""
echo "🎉 Migration terminée avec succès!"
echo "🚀 Votre base de données est maintenant prête pour la version 2.0"
echo "📋 Nouvelles tables ajoutées:"
echo "   - Favoris (gestion des favoris)"
echo "   - Signalements (signalement de contenu)"
echo "   - Statistiques (analytics)"
echo "   - Synchronizations (sync hors ligne)"
echo ""
echo "🔧 N'oubliez pas de redémarrer votre serveur backend!"
