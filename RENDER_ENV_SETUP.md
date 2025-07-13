# 🚀 CONFIGURATION RENDER - Variables d'environnement

## 📋 Variables à ajouter dans votre service web Render

### **ÉTAPE 1 : Accéder aux variables d'environnement**
1. Allez dans votre **service web** Render
2. Cliquez sur l'onglet **"Environment"**
3. Cliquez sur **"Add Environment Variable"**

### **ÉTAPE 2 : Ajouter ces variables une par une**

#### **Variables OBLIGATOIRES :**

```
NODE_ENV=production
```

```
PORT=5000
```

```
DATABASE_URL=postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole
```

```
JWT_SECRET=gospel-super-secret-jwt-key-2025-production-render
```

```
CORS_ORIGIN=*
```

#### **Variables OPTIONNELLES (recommandées) :**

```
RATE_LIMIT_WINDOW_MS=900000
```

```
RATE_LIMIT_MAX_REQUESTS=100
```

```
LOG_LEVEL=info
```

```
APP_NAME=Gospel_Chant_Et_Parole_Backend
```

```
APP_VERSION=1.0.0
```

```
DB_SSL=true
```

```
TZ=UTC
```

## 🎯 **Configuration pas à pas**

### **Variable 1 : NODE_ENV**
- **Name** : `NODE_ENV`
- **Value** : `production`

### **Variable 2 : PORT**
- **Name** : `PORT`
- **Value** : `5000`

### **Variable 3 : DATABASE_URL** (LA PLUS IMPORTANTE)
- **Name** : `DATABASE_URL`
- **Value** : `postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole`

### **Variable 4 : JWT_SECRET**
- **Name** : `JWT_SECRET`
- **Value** : `gospel-super-secret-jwt-key-2025-production-render`

### **Variable 5 : CORS_ORIGIN**
- **Name** : `CORS_ORIGIN`
- **Value** : `*`

## ⚠️ **Points importants**

### **Sécurité**
- ✅ **DATABASE_URL** contient votre mot de passe - c'est normal
- ✅ **JWT_SECRET** doit être unique et secret
- ✅ **CORS_ORIGIN=*** autorise toutes les origines (ok pour les tests)

### **Vérification**
- Toutes les variables doivent être **sauvegardées**
- Le service va **automatiquement se redéployer**
- Vérifiez les **logs** pour confirmer la connexion

## 🎉 **Après la configuration**

### **1. Vérification des logs**
Recherchez ces messages :
- ✅ `🚀 Serveur Node.js prêt sur http://localhost:5000`
- ✅ `✅ Base de données synchronisée.`
- ❌ Plus d'erreur `DATABASE_URL undefined`

### **2. Initialisation de la base**
Dans le **Shell** de votre service :
```bash
npm run init-postgres
```

### **3. Test de l'API**
```
GET https://votre-service.onrender.com/api/health
```

## 🔧 **Dépannage**

### **Erreur "DATABASE_URL undefined"**
→ Vérifiez que la variable `DATABASE_URL` est bien ajoutée et sauvegardée

### **Erreur de connexion PostgreSQL**
→ Vérifiez que l'URL est exactement celle fournie (avec le bon mot de passe)

### **Service ne démarre pas**
→ Vérifiez les logs pour plus de détails

## 💡 **Conseil**

Ajoutez les variables **5 obligatoires** d'abord, puis testez. Si ça marche, ajoutez les variables optionnelles.

**Prêt à configurer vos variables d'environnement ?** 🚀
