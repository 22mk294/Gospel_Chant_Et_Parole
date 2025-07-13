# Guide de déploiement sur Render

## Étapes de déploiement

### 1. Préparer le code
- Tous les fichiers sont prêts pour le déploiement
- PostgreSQL est configuré pour la production
- MySQL reste pour le développement local

### 2. Créer un compte Render
- Aller sur https://render.com
- Créer un compte gratuit
- Connecter votre compte GitHub

### 3. Créer une base de données PostgreSQL
1. Dans le dashboard Render, cliquer sur "New +"
2. Sélectionner "PostgreSQL"
3. Nom: gospelchantetparole-db
4. User: gospeluser
5. Database: gospelchantetparole
6. Plan: Free
7. Cliquer sur "Create Database"
8. Noter l'URL de connexion (DATABASE_URL)

### 4. Créer le service web
1. Dans le dashboard Render, cliquer sur "New +"
2. Sélectionner "Web Service"
3. Connecter votre repository GitHub
4. Sélectionner le repository gospelchantetparole-backend
5. Configuration:
   - Name: gospelchantetparole-backend
   - Environment: Node
   - Branch: main (ou master)
   - Build Command: npm install
   - Start Command: npm start
   - Plan: Free

### 5. Variables d'environnement
Dans les settings du service web, ajouter ces variables:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=<URL_de_votre_base_PostgreSQL>
JWT_SECRET=votre-secret-jwt-super-securise
CORS_ORIGIN=https://votre-frontend-url.vercel.app
```

### 6. Déploiement
1. Cliquer sur "Create Web Service"
2. Render va automatiquement déployer votre application
3. Une fois déployé, vous aurez une URL comme: https://votre-app.onrender.com

### 7. Initialiser la base de données
Une fois déployé, vous pouvez initialiser la base de données:
1. Aller dans le dashboard de votre service
2. Ouvrir le "Shell"
3. Exécuter: `npm run init-postgres`

### 8. Déployer le frontend
Le frontend peut être déployé sur Vercel:
1. Connecter votre repository frontend à Vercel
2. Configurer l'URL de l'API vers votre service Render
3. Déployer

## Notes importantes
- Le plan gratuit de Render a une limite de 750 heures/mois
- Le service s'endort après 15 minutes d'inactivité
- Le premier démarrage peut prendre 30 secondes
- Pour un usage en production, considérez le plan payant
