# 🔑 VARIABLES D'ENVIRONNEMENT RENDER - COPIER-COLLER

## 📋 **VARIABLES À AJOUTER UNE PAR UNE**

### **Variable 1 : NODE_ENV**
```
NODE_ENV
```
**Valeur :**
```
production
```

### **Variable 2 : PORT**
```
PORT
```
**Valeur :**
```
5000
```

### **Variable 3 : DATABASE_URL**
```
DATABASE_URL
```
**Valeur :**
```
postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole
```

### **Variable 4 : JWT_SECRET**
```
JWT_SECRET
```
**Valeur :**
```
gospel-super-secret-jwt-key-2025-production-render
```

### **Variable 5 : CORS_ORIGIN**
```
CORS_ORIGIN
```
**Valeur :**
```
*
```

## 🎯 **CONFIGURATION RENDER**

### **Service Web Settings :**
```
Name: gospel-chant-et-parole
Region: Oregon (US West)
Branch: main
Root Directory: (laisser VIDE)
Build Command: npm install
Start Command: npm start
```

## ⚠️ **IMPORTANT**

### **Start Command :**
**Utilisez :** `npm start`
**PAS :** `node serveur/server.js`

### **Pourquoi ?**
- `npm start` execute `node serveur/start-production.js`
- `start-production.js` configure l'environnement correctement
- Plus robuste pour la production

## 🔍 **VÉRIFICATION POST-DÉPLOIEMENT**

### **URL de test :**
```
https://votre-service.onrender.com/api/health
```

### **Réponse attendue :**
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

🎯 **PRÊT POUR LE DÉPLOIEMENT !**
