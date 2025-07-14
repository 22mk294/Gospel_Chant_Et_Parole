# 🚀 Guide de Déploiement Vercel - Frontend Gospel

## 📋 Prérequis
- ✅ Build réussi (`npm run build`)
- ✅ Vercel CLI installé
- ✅ Connexion Vercel établie

## 🔧 Méthode 1 : Déploiement via Interface Web

### 1. Aller sur https://vercel.com/dashboard
1. Cliquez sur "Add New..." → "Project"
2. Connectez votre repository GitHub : `22mk294/Gospel_Chant_Et_Parole`
3. Sélectionnez le dossier `admin` comme root directory
4. Configurez les variables d'environnement

### 2. Configuration Vercel (via interface web)
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run dev
```

### 3. Variables d'environnement
```
VITE_API_URL=https://gospel-chant-et-parole.onrender.com/api
```

## 🔧 Méthode 2 : Déploiement via CLI (Terminal propre)

### 1. Ouvrir un nouveau terminal PowerShell
```powershell
cd C:\Users\joelm\Documents\gospel\gospelchantetparole-backend\admin
```

### 2. Lancer le déploiement
```powershell
vercel --prod
```

### 3. Répondre aux questions :
- `Link to existing project?` → **N** (non)
- `What's your project's name?` → **gospel-admin**
- `In which directory is your code located?` → **./** (ou appuyer Entrée)
- `Want to override the settings?` → **N** (non)

## 🔧 Méthode 3 : Configuration manuelle

### 1. Créer un projet Vercel via le dashboard
1. Allez sur https://vercel.com/dashboard
2. Cliquez sur "Add New..." → "Project"
3. Importez depuis GitHub : `22mk294/Gospel_Chant_Et_Parole`

### 2. Configuration du projet
```json
{
  "name": "gospel-admin",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "rootDirectory": "admin"
}
```

### 3. Variables d'environnement (dans Vercel Dashboard)
```
VITE_API_URL = https://gospel-chant-et-parole.onrender.com/api
```

## 📁 Structure des fichiers (déjà créés)

### ✅ `/admin/vercel.json`
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### ✅ `/admin/.env.production`
```bash
VITE_API_URL=https://gospel-chant-et-parole.onrender.com/api
```

### ✅ `/admin/package.json`
```json
{
  "name": "admin",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🎯 Résultat attendu

Après le déploiement, vous devriez avoir :
- **URL Frontend** : `https://gospel-admin-[hash].vercel.app`
- **URL Backend** : `https://gospel-chant-et-parole.onrender.com`

## 🔗 Connexion Backend-Frontend

Le frontend est déjà configuré pour utiliser votre backend hébergé sur Render :
```javascript
// Dans src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://gospel-chant-et-parole.onrender.com/api';
```

## 🚀 Déploiement automatique

Une fois configuré, chaque push sur `main` déclenchera automatiquement :
1. **Render** : Redéploiement du backend
2. **Vercel** : Redéploiement du frontend

## 📝 Étapes suivantes

1. **Choisir une méthode** de déploiement (Interface Web recommandée)
2. **Configurer le projet** sur Vercel
3. **Tester l'application** déployée
4. **Personnaliser le domaine** (optionnel)

## 🆘 En cas de problème

Si vous rencontrez des erreurs :
1. Vérifiez les logs de build sur Vercel
2. Assurez-vous que `VITE_API_URL` est correctement configuré
3. Testez le backend manuellement : https://gospel-chant-et-parole.onrender.com/api/health

---

🎵 **Votre plateforme Gospel sera bientôt live !** 🎵
