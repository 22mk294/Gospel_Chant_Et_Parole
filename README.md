# Gospel Chanté Parole - Backend

## Vue d'ensemble
Backend pour l'application Gospel Chanté Parole - Un système de gestion de chants gospel avec interface d'administration.

## Fonctionnalités
- ✅ API REST complète pour la gestion des chants et catégories
- ✅ Authentification JWT sécurisée
- ✅ Interface d'administration avec dashboard moderne
- ✅ Statistiques en temps réel avec graphiques
- ✅ Support MySQL (développement) et PostgreSQL (production)
- ✅ Tests unitaires et d'intégration
- ✅ Déploiement prêt pour Render

## Technologies utilisées
- **Backend**: Node.js, Express.js
- **Base de données**: MySQL (dev) / PostgreSQL (production)
- **ORM**: Sequelize
- **Authentification**: JWT
- **Tests**: Jest
- **Déploiement**: Render

## Installation locale

### Prérequis
- Node.js 16+
- MySQL (pour le développement local)
- npm ou yarn

### Étapes
1. Cloner le repository
```bash
git clone <repository-url>
cd gospelchantetparole-backend
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
Créer un fichier `.env` :
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_NAME=gospelchantetparole
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your-secret-key
```

4. Démarrer le serveur de développement
```bash
npm run dev
```

## Déploiement en production

### Render (PostgreSQL)
Le backend est configuré pour utiliser PostgreSQL en production avec Render.

1. Suivre le guide complet dans `DEPLOY_GUIDE.md`
2. Créer une base de données PostgreSQL sur Render
3. Configurer les variables d'environnement
4. Déployer le service web

### Variables d'environnement de production
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Connexion administrateur
- `POST /api/auth/register` - Inscription (admin uniquement)

### Chants
- `GET /api/chants` - Liste des chants (avec pagination)
- `POST /api/chants` - Créer un chant
- `GET /api/chants/:id` - Détails d'un chant
- `PUT /api/chants/:id` - Modifier un chant
- `DELETE /api/chants/:id` - Supprimer un chant

### Catégories
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie
- `GET /api/categories/:id` - Détails d'une catégorie
- `PUT /api/categories/:id` - Modifier une catégorie
- `DELETE /api/categories/:id` - Supprimer une catégorie

### Statistiques
- `GET /api/stats/dashboard` - Statistiques du dashboard

### Santé
- `GET /api/health` - Vérification de l'état du service

## Tests
```bash
# Exécuter tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

## Structure du projet
```
serveur/
├── app.js                 # Configuration Express
├── server.js              # Point d'entrée
├── config/
│   └── database.js        # Configuration base de données
├── controllers/           # Contrôleurs API
├── middlewares/          # Middlewares personnalisés
├── models/               # Modèles Sequelize
├── routes/               # Routes API
├── services/             # Services utilitaires
├── scripts/              # Scripts d'initialisation
└── tests/                # Tests unitaires
```

## Authentification
L'application utilise JWT pour l'authentification. Les credentials par défaut sont :
- Username: `admin`
- Password: `admin123`

## Contribution
1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Créer une Pull Request

## Licence
MIT License
