# 🎵 Gospel Admin - Interface d'Administration

Interface d'administration React pour la gestion de l'application Gospel Chant et Parole.

## 🚀 Démarrage rapide

### Installation

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build pour la production
npm run build

# Aperçu de la build de production
npm run preview
```

## 📋 Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec JWT
- Protection des routes
- Gestion des sessions

### 🎵 Gestion des Chants
- Créer, modifier, supprimer des chants
- Ajouter des URLs audio et vidéo
- Recherche et filtrage par catégorie
- Pagination des résultats

### 📂 Gestion des Catégories
- Créer, modifier, supprimer des catégories
- Organisation hiérarchique
- Gestion des relations avec les chants

### 📊 Tableau de bord
- Statistiques en temps réel
- Aperçu des chants récents
- Métriques d'utilisation

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript
- **Vite** - Build tool
- **Material-UI** - Interface utilisateur
- **React Router** - Navigation
- **React Hook Form** - Gestion des formulaires
- **Yup** - Validation des données
- **Axios** - Requêtes HTTP
- **React Toastify** - Notifications

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

Assurez-vous que le backend est démarré sur le port 5000 :

```bash
# Dans le dossier backend
npm run dev
```

## 📁 Structure du projet

```
admin/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── AdminLayout.jsx  # Layout principal
│   │   └── ProtectedRoute.jsx # Protection des routes
│   ├── contexts/           # Contextes React
│   │   └── AuthContext.jsx # Contexte d'authentification
│   ├── pages/             # Pages de l'application
│   │   ├── Login.jsx      # Page de connexion
│   │   ├── Dashboard.jsx  # Tableau de bord
│   │   ├── Chants.jsx     # Gestion des chants
│   │   └── Categories.jsx # Gestion des catégories
│   ├── services/          # Services API
│   │   ├── api.js         # Configuration Axios
│   │   ├── authService.js # Service d'authentification
│   │   ├── chantService.js # Service des chants
│   │   ├── categoryService.js # Service des catégories
│   │   └── statsService.js # Service des statistiques
│   └── App.jsx            # Composant principal
├── public/                # Fichiers statiques
└── package.json           # Configuration du projet
```

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

### Serveur de production

Les fichiers de build sont générés dans le dossier `dist/`. Vous pouvez les servir avec n'importe quel serveur web statique.

## 🔒 Sécurité

- Authentification JWT
- Protection CSRF
- Validation des données côté client
- Gestion sécurisée des tokens

## 📱 Responsive Design

L'interface est entièrement responsive et s'adapte à tous les écrans :
- Desktop
- Tablet
- Mobile

## 🎨 Personnalisation

### Thème

Modifiez le thème dans `src/App.jsx` :

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Couleur principale
    },
    secondary: {
      main: '#dc004e', // Couleur secondaire
    },
  },
});
```

## 🐛 Débogage

### Problèmes courants

1. **Erreur de connexion API** : Vérifiez que le backend est démarré
2. **Token expiré** : Reconnectez-vous à l'interface
3. **Problèmes de CORS** : Configurez CORS dans le backend

### Logs

Les erreurs sont affichées dans la console du navigateur.

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@gospelchantetparole.com
- 📚 Documentation : [Backend API](../API_DOCUMENTATION.md)

## 📝 Licence

© 2025 Gospel Chant et Parole. Tous droits réservés.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
