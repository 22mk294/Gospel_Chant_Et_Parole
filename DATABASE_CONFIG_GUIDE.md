# 🔒 Configuration de la base de données PostgreSQL

## 📋 Informations de votre base de données

### Détails de connexion Render
- **Hostname**: `dpg-d1ptb7vfte5s73cnq080-a`
- **Port**: `5432`
- **Region**: Oregon (probablement)

### 🔧 Configuration des variables d'environnement Render

Allez dans votre service web Render et ajoutez ces variables d'environnement :

#### Variables obligatoires
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://[USERNAME]:[PASSWORD]@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com:5432/[DATABASE_NAME]
JWT_SECRET=gospel-super-secret-jwt-key-2025-production
CORS_ORIGIN=*
```

### 🔍 Comment trouver les informations manquantes

#### 1. Trouver l'URL complète de votre base
1. Allez dans votre dashboard Render
2. Cliquez sur votre base de données PostgreSQL
3. Dans l'onglet "Info", vous trouverez :
   - **Username** (généralement commence par le nom de votre DB)
   - **Password** (généré automatiquement)
   - **Database Name** (généralement le même que le nom de votre DB)
   - **External Database URL** (l'URL complète)

#### 2. URL complète typique
```
postgresql://username:password@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com:5432/database_name
```

### 📋 Étapes de configuration

#### Étape 1 : Récupérer l'URL complète
1. Dashboard Render → Votre base PostgreSQL
2. Onglet "Info" → Copier "External Database URL"

#### Étape 2 : Configurer le service web
1. Dashboard Render → Votre service web
2. Onglet "Environment" → Ajouter les variables :

```
NODE_ENV=production
PORT=5000
DATABASE_URL=[COLLER_L_URL_COMPLETE_ICI]
JWT_SECRET=gospel-super-secret-jwt-key-2025-production
CORS_ORIGIN=*
```

#### Étape 3 : Redéployer
1. Sauvegarder les variables d'environnement
2. Le service va automatiquement se redéployer
3. Vérifier les logs pour confirmer la connexion

### 🧪 Test de connexion

Une fois configuré, testez la connexion :

#### 1. Vérifier les logs
- Cherchez : `✅ Base de données synchronisée.`
- Pas d'erreur `DATABASE_URL undefined`

#### 2. Tester l'endpoint de santé
```
GET https://votre-service.onrender.com/api/health
```

#### 3. Initialiser la base de données
Dans le Shell de votre service Render :
```bash
npm run init-postgres
```

### ⚠️ Important

#### Sécurité
- Ne jamais exposer l'URL complète publiquement
- Utiliser uniquement dans les variables d'environnement Render
- Ne pas commiter les vraies valeurs dans Git

#### Structure attendue
```
postgresql://username:password@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com:5432/database_name
```

### 🎯 Résultat attendu

Une fois configuré correctement :
- ✅ Service démarre sans erreur DATABASE_URL
- ✅ Connexion PostgreSQL établie
- ✅ Tables créées automatiquement
- ✅ API fonctionnelle

### 📞 Dépannage

Si vous avez encore des erreurs :
1. Vérifier que DATABASE_URL est bien définie
2. Vérifier que l'URL est complète et correcte
3. Vérifier les logs pour plus de détails
4. Réessayer le déploiement

**Avez-vous récupéré l'URL complète de votre base de données ?** 🔍
