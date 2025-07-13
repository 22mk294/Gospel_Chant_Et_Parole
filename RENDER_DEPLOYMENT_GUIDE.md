# 🚀 Guide de déploiement sur Render - Étape par étape

## ✅ Prérequis (déjà terminés)
- [x] Code prêt avec PostgreSQL
- [x] Fichiers de déploiement créés
- [x] Tests passants
- [x] Documentation complète

## 🔥 ÉTAPES DE DÉPLOIEMENT

### ÉTAPE 1 : Créer un compte Render
1. Aller sur **https://render.com**
2. Cliquer sur "Get Started"
3. Créer un compte avec GitHub (recommandé)
4. Connecter votre repository GitHub

### ÉTAPE 2 : Créer la base de données PostgreSQL
1. Dans le dashboard Render, cliquer sur **"New +"**
2. Sélectionner **"PostgreSQL"**
3. Configuration :
   - **Name**: `gospelchantetparole-db`
   - **Database**: `gospelchantetparole`
   - **User**: `gospeluser`
   - **Region**: `Frankfurt (EU Central)` (ou le plus proche)
   - **Plan**: **Free**
4. Cliquer sur **"Create Database"**
5. ⚠️ **IMPORTANT** : Noter l'URL de connexion qui apparaît (Database URL)

### ÉTAPE 3 : Créer le service web
1. Retourner au dashboard, cliquer sur **"New +"**
2. Sélectionner **"Web Service"**
3. Connecter votre repository **"22mk294/Gospel_Chant_Et_Parole"**
4. Configuration :
   - **Name**: `gospelchantetparole-backend`
   - **Branch**: `main`
   - **Root Directory**: *(laisser vide)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### ÉTAPE 4 : Configurer les variables d'environnement
Dans les "Environment Variables" du service web, ajouter :

```
NODE_ENV=production
PORT=5000
DATABASE_URL=<COLLER_L_URL_DE_VOTRE_BASE_POSTGRESQL>
JWT_SECRET=gospel-super-secret-jwt-key-2025-production
CORS_ORIGIN=*
```

⚠️ **Remplacez `<COLLER_L_URL_DE_VOTRE_BASE_POSTGRESQL>`** par l'URL de votre base PostgreSQL de l'étape 2.

### ÉTAPE 5 : Déployer
1. Cliquer sur **"Create Web Service"**
2. Render va automatiquement :
   - Cloner votre repository
   - Installer les dépendances
   - Démarrer le service
3. ⏱️ **Attendre 2-3 minutes** pour le premier déploiement

### ÉTAPE 6 : Initialiser la base de données
1. Une fois le service déployé, aller dans l'onglet **"Shell"**
2. Exécuter la commande : `npm run init-postgres`
3. Vous devriez voir :
   ```
   ✅ Connexion réussie à PostgreSQL
   ✅ Modèles synchronisés
   ✅ Administrateur créé
   ✅ Catégories créées
   ✅ Chants d'exemple créés
   ```

### ÉTAPE 7 : Tester le déploiement
1. Votre URL sera : `https://gospelchantetparole-backend.onrender.com`
2. Tester ces endpoints :
   - **Santé** : `https://votre-url.onrender.com/api/health`
   - **Chants** : `https://votre-url.onrender.com/api/chants`
   - **Catégories** : `https://votre-url.onrender.com/api/categories`

## 🎯 Après le déploiement

### Connecter le frontend
1. Mettre à jour l'URL de l'API dans votre frontend
2. Remplacer `http://localhost:5000` par `https://votre-url.onrender.com`
3. Déployer le frontend sur Vercel

### Credentials d'administration
- **Username** : `admin`
- **Password** : `admin123`

## 🔧 Dépannage

### Si le déploiement échoue :
1. Vérifier les logs dans l'onglet "Logs"
2. Vérifier que toutes les variables d'environnement sont correctes
3. Vérifier que l'URL de la base de données est correcte

### Si la base de données ne se connecte pas :
1. Vérifier que la base PostgreSQL est bien créée
2. Vérifier que l'URL DATABASE_URL est correcte
3. Réexécuter `npm run init-postgres`

## 📊 Monitoring

### Render fournit :
- **Logs** en temps réel
- **Métriques** CPU/RAM
- **Alertes** en cas de problème
- **SSL** automatique

### Limitations du plan gratuit :
- 750 heures/mois
- Le service s'endort après 15 minutes d'inactivité
- Temps de démarrage : ~30 secondes

## 🎉 Félicitations !

Une fois ces étapes terminées, votre API sera accessible publiquement et prête pour la production !

**URL de votre API** : `https://gospelchantetparole-backend.onrender.com`

---

💡 **Besoin d'aide ?** Les logs Render sont très détaillés et vous aideront à diagnostiquer tout problème.
