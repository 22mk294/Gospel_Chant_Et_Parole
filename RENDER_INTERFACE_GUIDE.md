# 🎯 GUIDE RENDER - INTERFACE EXACTE

## 📋 **ÉTAPES PRÉCISES DANS L'INTERFACE RENDER**

### 1️⃣ **Créer le service**
1. Allez sur https://render.com/dashboard
2. Cliquez **"New +"** (bouton bleu en haut à droite)
3. Sélectionnez **"Web Service"**
4. Connectez votre repository **"Gospel_Chant_Et_Parole"**

### 2️⃣ **Configuration du service**

**Champs à remplir :**
- **Name** : `gospel-chant-et-parole`
- **Region** : `Oregon (US West)`
- **Branch** : `main`
- **Root Directory** : **LAISSEZ VIDE** (très important !)
- **Environment** : `Node` (détecté automatiquement)
- **Build Command** : `npm install`
- **Start Command** : `npm start`

### 3️⃣ **Variables d'environnement**

**Cliquez sur "Advanced" puis "Add Environment Variable"**

**Ajoutez ces 5 variables une par une :**

1. **Key** : `NODE_ENV` → **Value** : `production`
2. **Key** : `PORT` → **Value** : `5000`
3. **Key** : `DATABASE_URL` → **Value** : `postgresql://gospeluser:9UrdWQbfUlBcbFjWxWKsVYX8RlQvr8e0@dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com/gospelchantetparole`
4. **Key** : `JWT_SECRET` → **Value** : `gospel-super-secret-jwt-key-2025-production-render`
5. **Key** : `CORS_ORIGIN` → **Value** : `*`

### 4️⃣ **Déploiement**
1. Cliquez **"Create Web Service"** (bouton bleu en bas)
2. Render va automatiquement :
   - Détecter Node.js
   - Installer les dépendances
   - Démarrer le service

## 🔍 **POINTS CRUCIAUX**

### **Root Directory**
- ✅ **Laissez VIDE** (ne mettez pas `serveur`)
- ✅ Le package.json est à la racine du projet
- ✅ Le start command pointe vers `serveur/start-production.js`

### **Environment**
- ✅ **Node.js** sera détecté automatiquement
- ✅ Pas besoin de spécifier "Runtime: Node"
- ✅ Render détecte automatiquement grâce au package.json

### **Build vs Start**
- ✅ **Build Command** : `npm install` (installe les dépendances)
- ✅ **Start Command** : `npm start` (démarre l'application)

## 🚀 **APRÈS LE DÉPLOIEMENT**

### **URL générée**
Render vous donnera une URL comme :
`https://gospel-chant-et-parole-[random].onrender.com`

### **Test immédiat**
Testez : `https://votre-url.onrender.com/api/health`

### **Réponse attendue**
```json
{
  "status": "healthy",
  "database": "connected",
  "environment": "production"
}
```

## 📊 **RÉSUMÉ CONFIGURATION**

```
✅ Service Type: Web Service
✅ Repository: Gospel_Chant_Et_Parole
✅ Branch: main
✅ Root Directory: (vide)
✅ Build Command: npm install
✅ Start Command: npm start
✅ Environment Variables: 5 variables ajoutées
```

---

🎯 **PRÊT POUR LE DÉPLOIEMENT !**
La configuration est maintenant correcte pour l'interface Render.
