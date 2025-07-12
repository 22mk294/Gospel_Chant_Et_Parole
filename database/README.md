# 🗄️ Database Migration Guide

## 📋 Vue d'ensemble

Ce guide vous aide à migrer votre base de données Gospel Chant et Parole de la version 1.0 vers la version 2.0 avec toutes les nouvelles fonctionnalités.

## 🔄 Changements dans la version 2.0

### Nouvelles Tables
- **Favoris** - Gestion des chants favoris des utilisateurs
- **Signalements** - Système de signalement de contenu
- **Statistiques** - Analytics et suivi d'utilisation
- **Synchronizations** - Support pour la synchronisation hors ligne

### Tables Modifiées
- **Admins** - Ajout du champ `email` (optionnel)
- **Categories** - Ajout du champ `description` et contrainte unique
- **Chants** - Ajout des champs `author`, `audio_url`, `video_url`, `view_count`, `is_active`

## 🚀 Instructions de Migration

### Option 1: Script Automatique (Recommandé)

#### Sur Windows:
```batch
cd database
migrate.bat
```

#### Sur Linux/Mac:
```bash
cd database
chmod +x migrate.sh
./migrate.sh
```

### Option 2: Migration Manuelle

1. **Backup de la base de données actuelle:**
```sql
mysqldump -u root -p gospelchantetparole > backup_$(date +%Y%m%d).sql
```

2. **Exécuter la migration:**
```sql
mysql -u root -p gospelchantetparole < migration_v2.sql
```

## 📊 Vérification Post-Migration

Après la migration, vérifiez que toutes les tables ont été créées:

```sql
USE gospelchantetparole;
SHOW TABLES;
```

Vous devriez voir:
- Admins
- Categories
- Chants
- Favoris
- Signalements
- Statistiques
- Synchronizations

## 🔧 Configuration Backend

Après la migration, assurez-vous que votre backend est configuré avec:

1. **Variables d'environnement** dans `.env`:
```env
DB_HOST=localhost
DB_NAME=gospelchantetparole
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_jwt_secret
```

2. **Redémarrez votre serveur:**
```bash
npm run dev
```

## 📝 Structure des Nouvelles Tables

### Favoris
```sql
CREATE TABLE Favoris (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  chant_id INT NOT NULL,
  device_id VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE CASCADE
);
```

### Signalements
```sql
CREATE TABLE Signalements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chant_id INT NOT NULL,
  user_id VARCHAR(255) DEFAULT NULL,
  type ENUM('inappropriate_content', 'copyright', 'spam', 'technical_issue', 'other') NOT NULL,
  description TEXT,
  status ENUM('pending', 'reviewed', 'resolved', 'rejected') DEFAULT 'pending',
  admin_notes TEXT DEFAULT NULL,
  resolved_by INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Statistiques
```sql
CREATE TABLE Statistiques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) DEFAULT NULL,
  chant_id INT DEFAULT NULL,
  action ENUM('view', 'search', 'download', 'share', 'favorite', 'unfavorite') NOT NULL,
  metadata JSON DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Synchronizations
```sql
CREATE TABLE Synchronizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) DEFAULT NULL,
  last_sync DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_hash VARCHAR(255) DEFAULT NULL,
  sync_type ENUM('full', 'incremental') DEFAULT 'incremental',
  status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🆘 Dépannage

### Erreur de connexion
Si vous avez une erreur de connexion:
1. Vérifiez que MySQL est en cours d'exécution
2. Vérifiez vos identifiants dans `.env`
3. Vérifiez les privilèges de l'utilisateur MySQL

### Tables manquantes
Si certaines tables ne sont pas créées:
```sql
-- Vérifier les erreurs
SHOW WARNINGS;

-- Forcer la création manuelle
SOURCE migration_v2.sql;
```

### Restauration en cas de problème
```sql
mysql -u root -p gospelchantetparole < backup_YYYYMMDD.sql
```

## 🎯 Nouvelles API Endpoints

Après la migration, votre backend supportera ces nouveaux endpoints:

- `GET/POST /api/favoris` - Gestion des favoris
- `GET/POST /api/signalements` - Système de signalement
- `GET /api/stats` - Statistiques d'utilisation
- `POST /api/sync` - Synchronisation hors ligne
- `GET /health` - Vérification de santé

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs du serveur
2. Consultez la documentation API
3. Vérifiez que tous les tests passent: `npm test`

## ✅ Checklist Post-Migration

- [ ] Backup de la base de données créé
- [ ] Migration exécutée avec succès
- [ ] 7 tables présentes dans la base
- [ ] Backend redémarré
- [ ] Tests passent (41/41)
- [ ] Endpoints API fonctionnels
- [ ] Données existantes préservées

🎉 **Félicitations! Votre base de données est maintenant prête pour la version 2.0!**
