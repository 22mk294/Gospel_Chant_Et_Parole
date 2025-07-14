# Variables d'environnement pour le Frontend

## Configuration du Backend et Base de Données PostgreSQL

Voici les variables d'environnement configurées pour connecter le frontend React à votre backend déployé sur Render avec PostgreSQL :

### API Backend (Production)
```env
VITE_API_URL=https://gospel-chant-et-parole.onrender.com
VITE_API_BASE_URL=https://gospel-chant-et-parole.onrender.com/api
VITE_API_VERSION=v1
```

### Base de Données PostgreSQL (Affichage uniquement)
```env
VITE_DB_TYPE=PostgreSQL
VITE_DB_HOST=dpg-d1ptb7vfte5s73cnq080-a.oregon-postgres.render.com
VITE_DB_NAME=gospelchantetparole
VITE_DB_PORT=5432
VITE_DB_SSL=true
```

### Endpoints API
```env
VITE_API_AUTH_ENDPOINT=/auth
VITE_API_CHANTS_ENDPOINT=/chants
VITE_API_CATEGORIES_ENDPOINT=/categories
VITE_API_STATS_ENDPOINT=/stats
VITE_API_HEALTH_ENDPOINT=/health
VITE_API_UPLOAD_ENDPOINT=/upload
```

### Authentification
```env
VITE_JWT_STORAGE_KEY=gospel_admin_token
VITE_JWT_EXPIRE_TIME=604800000
VITE_LOGIN_REDIRECT_URL=/dashboard
VITE_LOGOUT_REDIRECT_URL=/login
```

### Administrateur par défaut
```env
VITE_DEFAULT_ADMIN_USERNAME=joelmike
VITE_DEFAULT_ADMIN_EMAIL=joelmikemukendi22mk294@gospelchantetparole.com
VITE_DEFAULT_ADMIN_PASSWORD=Beckyshawetu268563
```

## Utilisation

1. **Développement local** : Les variables sont dans le fichier `.env`
2. **Production** : Les variables sont dans le fichier `.env.production`
3. **Déploiement Vercel** : Les variables sont configurées dans `vercel.json`

## Fichiers de configuration créés

- `admin/.env` - Configuration pour le développement
- `admin/.env.production` - Configuration pour la production
- `admin/vercel.json` - Configuration pour le déploiement Vercel

## Connexion au Backend

Le frontend utilise ces variables pour :
- Se connecter à l'API backend sur Render
- Afficher les informations de la base de données PostgreSQL
- Gérer l'authentification avec JWT
- Configurer les endpoints API

## Sécurité

- Les variables sensibles comme les mots de passe ne sont utilisées que pour les tests
- La configuration inclut des headers de sécurité
- Le SSL est activé pour la base de données PostgreSQL

## Prochaines étapes

1. Vérifier que toutes les variables sont correctement configurées
2. Tester la connexion au backend depuis le frontend
3. Déployer sur Vercel en utilisant la configuration `vercel.json`
