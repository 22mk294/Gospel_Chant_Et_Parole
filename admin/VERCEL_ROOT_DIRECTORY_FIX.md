# 🔧 Configuration Vercel - Root Directory Fix

## ❌ Problème Identifié
**Erreur** : `Command "cd admin && npm install" exited with 1`
**Cause** : Vercel essaie d'exécuter `cd admin` depuis la racine, mais le contexte d'exécution est déjà à la racine du repository

## ✅ Solution Finale

### Étape 1 : Configuration Vercel via Interface Web
1. Aller sur [vercel.com](https://vercel.com)
2. Sélectionner le projet `Gospel_Chant_Et_Parole`
3. Aller dans **Settings** → **General**
4. Configurer :
   - **Root Directory** : `admin`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

### Étape 2 : Variables d'Environnement
Ajouter dans **Settings** → **Environment Variables** :
```
VITE_API_URL=https://gospel-chant-et-parole.onrender.com
VITE_API_BASE_URL=https://gospel-chant-et-parole.onrender.com
VITE_NODE_ENV=production
VITE_JWT_STORAGE_KEY=gospel_admin_token
VITE_JWT_EXPIRE_TIME=604800000
VITE_LOGIN_REDIRECT_URL=/dashboard
VITE_LOGOUT_REDIRECT_URL=/login
```

### Étape 3 : Redéploiement
1. Aller dans **Deployments**
2. Cliquer sur **Redeploy** pour le dernier déploiement
3. Ou faire un nouveau commit pour déclencher un redéploiement

## 🎯 Alternative : Créer un Nouveau Projet
Si les paramètres ne se sauvegardent pas :

1. **Supprimer le projet actuel** sur Vercel
2. **Créer un nouveau projet** :
   - Sélectionner le repository `Gospel_Chant_Et_Parole`
   - **Root Directory** : `admin`
   - **Framework** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

## 📋 Fichiers Corrects

### admin/vercel.json
```json
{
  "version": 2,
  "name": "gospel-admin",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "env": {
    "VITE_API_URL": "https://gospel-chant-et-parole.onrender.com",
    "VITE_API_BASE_URL": "https://gospel-chant-et-parole.onrender.com",
    "VITE_NODE_ENV": "production",
    "VITE_JWT_STORAGE_KEY": "gospel_admin_token"
  }
}
```

### admin/package.json
```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

## 🚀 Test Local
Avant de redéployer, vérifier que le build fonctionne :

```bash
cd admin
npm install
npm run build
```

## 📊 Status
- **Backend** : ✅ Opérationnel
- **Admin** : ✅ Créé (joelmike / Beckyshawetu268563)
- **Build Local** : ✅ Fonctionne
- **Configuration** : ✅ Corrigée

---

**Prochaine étape** : Configurer **Root Directory = admin** dans les paramètres Vercel
