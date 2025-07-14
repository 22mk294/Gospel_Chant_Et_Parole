# 🚀 Déploiement Manuel Vercel - Gospel Admin

## 📋 Instructions Étape par Étape

### Étape 1: Préparation
```bash
# Naviguer vers le dossier admin
cd admin

# Vérifier que le build fonctionne
npm run build
```

### Étape 2: Déploiement Vercel
```bash
# Installer Vercel CLI (si pas déjà fait)
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer en production
vercel --prod
```

### Étape 3: Configuration Vercel
Lors du déploiement, Vercel posera quelques questions :

1. **Set up and deploy?** → `Y`
2. **Which scope?** → Sélectionner votre compte
3. **Link to existing project?** → `N` (nouveau projet)
4. **Project name?** → `gospel-admin` ou autre nom
5. **Directory?** → `.` (dossier actuel)
6. **Override settings?** → `N` (utiliser vercel.json)

### Étape 4: Vérification
- Vercel donnera une URL comme `https://gospel-admin-xxx.vercel.app`
- Tester la connexion avec les credentials:
  - **Username**: `joelmike`
  - **Password**: `Beckyshawetu268563`

## 🔧 Configuration Actuelle

### Variables d'Environnement (dans vercel.json)
```json
{
  "VITE_API_URL": "https://gospel-chant-et-parole.onrender.com",
  "VITE_API_BASE_URL": "https://gospel-chant-et-parole.onrender.com",
  "VITE_NODE_ENV": "production",
  "VITE_JWT_STORAGE_KEY": "gospel_admin_token"
}
```

### Fichiers de Configuration
- ✅ `vercel.json` - Configuration Vercel
- ✅ `.vercelignore` - Fichiers ignorés
- ✅ `package.json` - Scripts et dépendances
- ✅ `dist/` - Build prêt

## 🎯 Alternative: Déploiement depuis GitHub

Si le déploiement manuel échoue, créer un nouveau projet Vercel via l'interface web :

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer "New Project"
3. Sélectionner le repository `Gospel_Chant_Et_Parole`
4. Définir le **Root Directory** comme `admin`
5. Configurer les variables d'environnement
6. Déployer

## 🔍 Debugging

Si des erreurs surviennent :

1. **Vérifier les logs** : `vercel logs`
2. **Tester en local** : `npm run build && npm run preview`
3. **Vérifier les variables** : Ouvrir la console du navigateur

## 📊 Status Backend
- **URL**: https://gospel-chant-et-parole.onrender.com
- **Status**: ✅ Opérationnel
- **Endpoints**: `/api/auth/login`, `/api/chants`, `/api/categories`

---

**Commit actuel**: `79ec32b`
**Configuration**: Simplifiée et testée
**Prochaine étape**: Exécuter `vercel --prod` depuis le dossier admin
