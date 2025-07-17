# 🚀 Guide de Déploiement Netlify - Gospel Chant et Parole

## 📋 Prérequis
- ✅ Backend déployé sur Render
- ✅ Base de données PostgreSQL opérationnelle
- ✅ Compte Netlify (gratuit)
- ✅ Configuration netlify.toml prête

## 🔧 Configuration Actuelle

### Backend
- **URL**: https://gospel-chant-et-parole.onrender.com
- **Base de données**: PostgreSQL sur Render
- **Statut**: ✅ Opérationnel

### Admin Créé
- **Nom d'utilisateur**: joelmike
- **Email**: joelmikemukendi22mk294@gospelchantetparole.com
- **Mot de passe**: Beckyshawetu268563

## 🌐 Méthodes de Déploiement

### Méthode 1: Interface Web Netlify (Recommandée)

#### Étape 1: Préparation
```bash
cd admin
npm install
npm run build
```

#### Étape 2: Déploiement Manual
1. Allez sur https://netlify.com
2. Connectez-vous ou créez un compte
3. Cliquez sur "Add new site" → "Deploy manually"
4. Glissez-déposez le dossier `dist/` généré
5. Votre site sera déployé immédiatement !

#### Étape 3: Configuration du Domaine
1. Dans votre tableau de bord Netlify
2. Allez à "Domain settings"
3. Changez le nom de domaine si désiré
4. Activez HTTPS (automatique)

### Méthode 2: Git Integration (Automatique)

#### Étape 1: Push sur GitHub
```bash
git add .
git commit -m "Configuration Netlify prête"
git push origin main
```

#### Étape 2: Connecter à Netlify
1. Sur Netlify: "Add new site" → "Import an existing project"
2. Choisir "GitHub" et autoriser l'accès
3. Sélectionner votre repository
4. Configurer:
   - **Branch**: main
   - **Base directory**: admin
   - **Build command**: npm run build
   - **Publish directory**: admin/dist

#### Étape 3: Variables d'Environnement
Netlify lira automatiquement le fichier `netlify.toml` mais vous pouvez aussi les ajouter manuellement:
1. Site settings → Environment variables
2. Ajouter les variables importantes

### Méthode 3: Netlify CLI

#### Installation
```bash
npm install -g netlify-cli
netlify login
```

#### Déploiement
```bash
cd admin
npm run build
netlify deploy --prod --dir=dist
```

## 🔍 Variables d'Environnement Configurées

```bash
VITE_API_URL=https://gospel-chant-et-parole.onrender.com
VITE_API_BASE_URL=https://gospel-chant-et-parole.onrender.com
VITE_NODE_ENV=production
VITE_JWT_STORAGE_KEY=gospel_admin_token
# + autres variables de configuration
```

## 🏃‍♂️ Déploiement Rapide (5 minutes)

1. **Construire le projet**:
   ```bash
   cd admin
   npm run build
   ```

2. **Déployer sur Netlify**:
   - Allez sur https://netlify.com
   - Drag & drop le dossier `dist/`
   - ✅ Déployé !

3. **Tester l'application**:
   - Ouvrez l'URL fournie par Netlify
   - Connectez-vous avec les credentials admin
   - Vérifiez que tout fonctionne

## 🔧 Résolution de Problèmes

### Problème: Page blanche après déploiement
**Solution**: Vérifiez que les variables d'environnement sont correctes

### Problème: Erreur 404 sur les routes
**Solution**: Le fichier `netlify.toml` contient déjà la redirection nécessaire

### Problème: Erreur API
**Solution**: Vérifiez que le backend Render est opérationnel

## 📊 Vérifications Post-Déploiement

- [ ] Site accessible via l'URL Netlify
- [ ] Connexion admin fonctionnelle
- [ ] API calls vers le backend Render
- [ ] Toutes les fonctionnalités admin testées

## 🎯 Prochaines Étapes

1. **Domaine personnalisé**: Configurer un domaine custom
2. **HTTPS**: Activé automatiquement par Netlify
3. **CDN**: Inclus avec Netlify
4. **Analytics**: Configurer Netlify Analytics

## 🆘 Support

- **Netlify Docs**: https://docs.netlify.com/
- **Status Backend**: https://gospel-chant-et-parole.onrender.com/api/health
- **Logs Netlify**: Dashboard → Functions → View logs

---

🎉 **Félicitations !** Votre application Gospel Chant et Parole sera bientôt en ligne !
