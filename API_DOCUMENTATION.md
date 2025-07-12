# API Gospel Chant et Parole

## 📋 Table des matières

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Démarrage](#démarrage)
4. [Endpoints](#endpoints)
5. [Tests](#tests)
6. [Sécurité](#sécurité)

## 🚀 Installation

```bash
# Cloner le projet
git clone [votre-repo]
cd gospelchantetparole-backend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

## ⚙️ Configuration

Configurez vos variables d'environnement dans le fichier `.env` :

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=gospelchantetparole
DB_NAME_TEST=gospelchantetparole_test

# JWT
JWT_SECRET=votre_super_secret_jwt

# Serveur
PORT=5000
NODE_ENV=development
```

## 🎯 Démarrage

```bash
# Développement
npm run dev

# Production
npm start

# Tests
npm test

# Tests avec surveillance
npm run test:watch

# Couverture de tests
npm run test:coverage
```

## 📚 Documentation

Une fois le serveur démarré, accédez à la documentation Swagger :
- **URL** : `http://localhost:5000/api-docs`

## 🔗 Endpoints

### 🔐 Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/register` | Créer un admin | ❌ |
| POST | `/api/auth/login` | Connexion admin | ❌ |
| GET | `/api/auth/profile` | Profil admin | ✅ |

### 🎵 Chants

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/chants` | Liste des chants | ❌ |
| GET | `/api/chants/:id` | Détails d'un chant | ❌ |
| POST | `/api/chants` | Créer un chant | ✅ |
| PUT | `/api/chants/:id` | Modifier un chant | ✅ |
| DELETE | `/api/chants/:id` | Supprimer un chant | ✅ |

### 📂 Catégories

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/categories` | Liste des catégories | ❌ |
| GET | `/api/categories/:id` | Détails d'une catégorie | ❌ |
| POST | `/api/categories` | Créer une catégorie | ✅ |
| PUT | `/api/categories/:id` | Modifier une catégorie | ✅ |
| DELETE | `/api/categories/:id` | Supprimer une catégorie | ✅ |

## 🔍 Paramètres de requête

### Pagination (GET /api/chants)
- `limit` : Nombre d'éléments par page (1-100, défaut: 10)
- `offset` : Décalage pour la pagination (défaut: 0)
- `search` : Recherche dans le titre et les paroles

### Exemples
```bash
# Récupérer 5 chants à partir du 10ème
GET /api/chants?limit=5&offset=10

# Rechercher des chants contenant "Jesus"
GET /api/chants?search=Jesus

# Combiner pagination et recherche
GET /api/chants?search=grace&limit=20&offset=0
```

## 🛡️ Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification :

1. **Inscription** : `POST /api/auth/register`
2. **Connexion** : `POST /api/auth/login` → Retourne un token
3. **Utilisation** : Inclure le token dans l'en-tête :
   ```
   Authorization: Bearer votre_token_jwt
   ```

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests avec surveillance
npm run test:watch

# Couverture de tests
npm run test:coverage
```

### Structure des tests
- `auth.test.js` : Tests d'authentification
- `chant.test.js` : Tests des chants
- `category.test.js` : Tests des catégories

## 🚫 Gestion des erreurs

L'API retourne des erreurs structurées :

```json
{
  "message": "Description de l'erreur",
  "errors": [
    {
      "msg": "Détail de l'erreur",
      "param": "champ_concerné",
      "location": "body"
    }
  ]
}
```

## 🔒 Sécurité

### Mesures implémentées :
- ✅ **Rate Limiting** : 100 requêtes/15min par IP
- ✅ **Validation des données** : Express-validator
- ✅ **Sanitization** : Échappement des caractères spéciaux
- ✅ **Hashage des mots de passe** : bcrypt (12 rounds)
- ✅ **JWT sécurisé** : Expiration et secret robuste
- ✅ **CORS configuré** : Protection cross-origin
- ✅ **Gestion centralisée des erreurs**

### Recommandations production :
- Utiliser HTTPS
- Configurer un reverse proxy (Nginx)
- Surveiller les logs
- Mettre en place des sauvegardes DB
- Utiliser des variables d'environnement sécurisées

## 📊 Codes de réponse

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Erreur de validation |
| 401 | Non authentifié |
| 403 | Accès interdit |
| 404 | Ressource non trouvée |
| 429 | Trop de requêtes |
| 500 | Erreur serveur |

## 🐛 Débogage

```bash
# Logs détaillés en développement
NODE_ENV=development npm run dev

# Vérifier la connexion DB
npm run test -- --testNamePattern="database"
```

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@gospelchantetparole.com
- 📚 Documentation : `/api-docs`
- 🐛 Issues : [GitHub Issues]
