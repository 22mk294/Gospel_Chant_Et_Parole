# ✅ Checklist de Déploiement Netlify

## 🔍 Vérifications Pré-Déploiement

### Backend (Render)
- [ ] ✅ Backend accessible: https://gospel-chant-et-parole.onrender.com
- [ ] ✅ API Health: https://gospel-chant-et-parole.onrender.com/api/health
- [ ] ✅ Base de données PostgreSQL opérationnelle
- [ ] ✅ Admin créé et testé

### Configuration Frontend
- [ ] ✅ Variables d'environnement configurées dans netlify.toml
- [ ] ✅ Build réussi (npm run build)
- [ ] ✅ Dossier dist/ généré
- [ ] ✅ Redirections SPA configurées

### Fichiers Présents
- [ ] ✅ netlify.toml
- [ ] ✅ package.json
- [ ] ✅ NETLIFY_DEPLOYMENT_GUIDE.md
- [ ] ✅ deploy-netlify.ps1

## 🚀 Déploiement Rapide (3 étapes)

### 1. Build
```bash
cd admin
npm run build
```

### 2. Déploiement
- Allez sur https://netlify.com
- Cliquez "Add new site" → "Deploy manually"
- Glissez-déposez le dossier `dist/`

### 3. Test
- Ouvrez l'URL Netlify fournie
- Testez la connexion admin:
  - Email: joelmikemukendi22mk294@gospelchantetparole.com
  - Mot de passe: Beckyshawetu268563

## 🔧 Configuration Netlify

### Variables d'Environnement
```
VITE_API_BASE_URL=https://gospel-chant-et-parole.onrender.com
VITE_NODE_ENV=production
VITE_JWT_STORAGE_KEY=gospel_admin_token
```

### Paramètres de Build
```
Build command: npm run build
Publish directory: dist
```

## 📊 Post-Déploiement

### Tests à Effectuer
- [ ] Page d'accueil se charge
- [ ] Connexion admin fonctionne
- [ ] Dashboard accessible
- [ ] API calls vers backend Render
- [ ] Toutes les fonctionnalités testées

### Optimisations
- [ ] Domaine personnalisé (optionnel)
- [ ] HTTPS activé (automatique)
- [ ] CDN configuré (automatique)
- [ ] Analytics Netlify (optionnel)

## 🆘 Résolution de Problèmes

### Erreur de Build
- Vérifiez les dépendances: `npm install`
- Nettoyez le cache: `npm run build -- --force`

### Erreur API
- Vérifiez le backend Render est opérationnel
- Vérifiez les variables d'environnement

### Page Blanche
- Vérifiez les redirections dans netlify.toml
- Vérifiez la console navigateur (F12)

## 📞 Support

- **Netlify Status**: https://status.netlify.com/
- **Render Status**: https://status.render.com/
- **Backend Health**: https://gospel-chant-et-parole.onrender.com/api/health

---

🎉 **Prêt pour le déploiement !** Suivez les 3 étapes ci-dessus.
