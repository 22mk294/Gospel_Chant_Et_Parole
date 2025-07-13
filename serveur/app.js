// Fichier principal de l'application Express
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const slowDown = require('express-slow-down');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const chantRoutes = require('./routes/chantRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const favorisRoutes = require('./routes/favorisRoutes');
const signalementRoutes = require('./routes/signalementRoutes');
const statistiqueRoutes = require('./routes/statistiqueRoutes');
const syncRoutes = require('./routes/syncRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middlewares/errorHandler');
const serveFavicon = require('./middlewares/favicon');

const app = express();

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GospelChantetParole API',
      version: '1.0.0',
      description: 'API pour la gestion de chants gospel'
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://votre-domaine.com' : `http://localhost:${process.env.PORT || 5000}`,
        description: process.env.NODE_ENV === 'production' ? 'Serveur de production' : 'Serveur de développement'
      }
    ]
  },
  apis: ['./serveur/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Configuration Helmet pour la sécurité
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
};

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requêtes par IP par fenêtre
  message: {
    message: 'Trop de requêtes depuis cette IP, réessayez plus tard'
  }
});

// Protection contre brute force sur auth
const authLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // ralentir après 5 tentatives
  delayMs: () => 500, // délai de 500ms
  maxDelayMs: 20000, // délai max 20s
  skipSuccessfulRequests: true,
  validate: { delayMs: false } // Désactiver l'avertissement
});

// Middlewares globaux
app.use(helmet(helmetConfig));
app.use(serveFavicon);
app.use(limiter);
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/chants', chantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/signalements', signalementRoutes);
app.use('/api/stats', statistiqueRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/health', healthRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'API GospelChantetParole opérationnelle 🚀',
    version: '1.0.0',
    documentation: '/api-docs',
    test: '/test'
  });
});

// Page de test
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, '../test-api.html'));
});

// Route de health check pour Render
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Gospel Chante et Parole API',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route non trouvée'
  });
});

// Middleware de gestion des erreurs (doit être en dernier)
app.use(errorHandler);

// Synchronisation de la base de données
sequelize.sync().then(() => {
  console.log('✅ Base de données synchronisée.');
}).catch(err => {
  console.error('❌ Erreur de synchronisation DB:', err);
});

module.exports = app;
