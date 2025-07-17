# 🔧 CONFIGURATION RENDER BACKEND - VARIABLES PRÉCISES

## 📋 **CONFIGURATION VÉRIFIÉE**

### **Base de données PostgreSQL :**
La configuration dans `serveur/config/database.js` utilise `process.env.DATABASE_URL` pour la production, ce qui est correct.

### **Start Command :**
⚠️ **IMPORTANT** : Ne pas utiliser `node serveur/server.js` directement

**Utilisez plutôt :**
```
node serveur/start-production.js
```

**OU** (selon package.json) :
```
npm start
```

## 🔑 **VARIABLES D'ENVIRONNEMENT À AJOUTER DANS RENDER**

### **Variables OBLIGATOIRES :**

1. **NODE_ENV**
   ```
   NODE_ENV=production
   ```

2. **PORT**
   ```
   PORT=5000
   ```

3. **DATABASE_URL** (URL complète PostgreSQL)
   ```
   DATABASE_URL=postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole
   ```

4. **JWT_SECRET**
   ```
   JWT_SECRET=gospel-super-secret-jwt-key-2025-production-render
   ```

5. **CORS_ORIGIN**
   ```
   CORS_ORIGIN=*
   ```

## 🎯 **CONFIGURATION RENDER EXACTE**

### **Service Web Settings :**
```
Name: gospel-chant-et-parole
Region: Oregon (US West)
Branch: main
Root Directory: (laisser VIDE)
Build Command: npm install
Start Command: npm start
```

### **Pourquoi npm start ?**
- Le `package.json` définit : `"start": "node serveur/start-production.js"`
- `start-production.js` configure l'environnement puis appelle `server.js`
- Plus robuste que d'appeler `server.js` directement

## 🔍 **VÉRIFICATION DE LA CONFIGURATION**

### **Base de données :**
✅ **Host** : `dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com`
✅ **Port** : `5432`
✅ **Database** : `gospelchantetparole`
✅ **User** : `gospeluser`
✅ **Password** : `9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0`
✅ **SSL** : Activé (configuré dans database.js)

### **URL complète testée :**
```
postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole
```

## 🚀 **ÉTAPES DE DÉPLOIEMENT**

### 1. **Créer le service web**
- https://render.com/dashboard
- New + → Web Service
- Repository: Gospel_Chant_Et_Parole

### 2. **Configuration basique**
```
Name: gospel-chant-et-parole
Branch: main
Root Directory: (VIDE)
Build Command: npm install
Start Command: npm start
```

### 3. **Variables d'environnement**
Ajouter les 5 variables listées ci-dessus, une par une.

### 4. **Déployer**
Cliquer "Create Web Service"

## 🔧 **APRÈS LE DÉPLOIEMENT**

### **Tests automatiques :**
1. **Health check** : `https://votre-service.onrender.com/api/health`
2. **Base de données** : Connexion automatique via DATABASE_URL
3. **Admin** : Credentials existants fonctionnels

### **Si problème :**
- Vérifier les logs dans le dashboard Render
- Exécuter `npm run init-postgres` dans le shell du service
- Tester chaque endpoint individuellement

## 📊 **RÉSULTAT ATTENDU**

```json
{
  "status": "healthy",
  "timestamp": "2025-07-17T...",
  "version": "1.0.0",
  "environment": "production",
  "database": "connected",
  "uptime": "..."
}
```

---

🎯 **IMPORTANT** : Utilisez `npm start` comme Start Command, pas `node serveur/server.js`
