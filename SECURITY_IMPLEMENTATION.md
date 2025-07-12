# 🔒 GUIDE D'IMPLÉMENTATION DES CORRECTIONS DE SÉCURITÉ

## 1. Installation des dépendances
```bash
./install-security.sh
```

## 2. Mise à jour de app.js
```javascript
// Ajouter en haut du fichier
const { helmet, authLimiter } = require('./middlewares/security');
const { logger } = require('./services/logger');

// Ajouter après les middlewares existants
app.use(helmet);

// Ajouter sur les routes d'authentification
app.use('/api/auth', authLimiter);

// Ajouter route health check
app.get('/health', require('./controllers/healthController').health);
```

## 3. Mise à jour du modèle Admin
```javascript
// Dans serveur/models/Admin.js, changer:
timestamps: false,
// Par:
timestamps: true,
```

## 4. Mise à jour des routes avec validation ID
```javascript
// Dans chaque route avec :id, ajouter:
const { validateNumericId } = require('../middlewares/security');

router.get('/:id', validateNumericId, controller.getById);
router.put('/:id', validateNumericId, controller.update);
router.delete('/:id', validateNumericId, controller.delete);
```

## 5. Mise à jour du gestionnaire d'erreurs
```javascript
// Dans serveur/middlewares/errorHandler.js, supprimer:
...(process.env.NODE_ENV === 'development' && { stack: err.stack })
```

## 6. Redémarrer le serveur
```bash
npm run dev
```

## 7. Tester les améliorations
- Vérifier /health
- Tester les headers sécurisés
- Vérifier les logs
- Tester la limitation de débit
