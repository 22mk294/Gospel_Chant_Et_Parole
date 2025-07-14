# 🌐 Déploiement Frontend via Interface Web Vercel

## 📋 Méthode Recommandée : Interface Web

### 1. 🚀 Accédez à Vercel Dashboard
- Allez sur : https://vercel.com/dashboard
- Connectez-vous avec votre compte GitHub (22mk294@esisalama.org)

### 2. 📁 Créer un nouveau projet
1. Cliquez sur **"Add New..."** → **"Project"**
2. Cherchez votre repository : `22mk294/Gospel_Chant_Et_Parole`
3. Cliquez sur **"Import"**

### 3. ⚙️ Configuration du projet
```
Project Name: gospel-admin
Framework Preset: Vite
Root Directory: admin
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run dev
```

### 4. 🔧 Variables d'environnement
Ajoutez cette variable dans la section "Environment Variables" :
```
Name: VITE_API_URL
Value: https://gospel-chant-et-parole.onrender.com/api
```

### 5. 🚀 Déployer
Cliquez sur **"Deploy"** et attendez que le build se termine.

## 📱 Résultat attendu

Après le déploiement (environ 2-3 minutes), vous aurez :
- **URL Frontend** : `https://gospel-admin-[hash].vercel.app`
- **Dashboard Admin** accessible via cette URL
- **Connexion automatique** avec votre backend sur Render

## 🔗 Architecture finale

```
Frontend (Vercel)     Backend (Render)
     ↓                      ↓
gospel-admin.vercel.app → gospel-chant-et-parole.onrender.com
     ↓                      ↓
  Interface Admin    →   API + Database PostgreSQL
```

## 🎯 Test après déploiement

1. **Accédez à votre URL Vercel**
2. **Connectez-vous** avec : `admin` / `admin123`
3. **Vérifiez les fonctionnalités** :
   - ✅ Connexion
   - ✅ Dashboard avec graphiques
   - ✅ Gestion des chants
   - ✅ Gestion des catégories
   - ✅ Statistiques

## 🔄 Déploiement automatique

Une fois configuré, chaque modification poussée sur GitHub déclenchera automatiquement :
- **Render** : Redéploiement du backend
- **Vercel** : Redéploiement du frontend

## 📝 Personnalisation du domaine (optionnel)

1. Dans Vercel Dashboard → **Settings** → **Domains**
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions

---

🎵 **Votre plateforme Gospel sera live en quelques minutes !** 🎵
