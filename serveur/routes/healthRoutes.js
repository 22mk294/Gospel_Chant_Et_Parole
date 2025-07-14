// Routes pour le health check
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const { sequelize } = require('../models');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Vérifier l'état du serveur
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Serveur en bonne santé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 version:
 *                   type: string
 *                 environment:
 *                   type: string
 *                 database:
 *                   type: string
 *                   example: connected
 *                 uptime:
 *                   type: number
 *                   description: Temps de fonctionnement en secondes
 *       503:
 *         description: Serveur en mauvaise santé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: unhealthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 error:
 *                   type: string
 */
router.get('/', healthController.health);

// Endpoint de santé de la base de données
router.get('/database', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Test de connexion à la base de données
    await sequelize.authenticate();
    
    // Test de requête simple
    const [results] = await sequelize.query('SELECT 1 as test');
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'ok',
      message: 'Base de données opérationnelle',
      timestamp: new Date().toISOString(),
      responseTime,
      database: {
        dialect: sequelize.getDialect(),
        host: sequelize.config.host,
        database: sequelize.config.database,
        connected: true,
        testQuery: results[0]?.test === 1
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur de base de données',
      error: error.message,
      timestamp: new Date().toISOString(),
      database: {
        connected: false
      }
    });
  }
});

// Endpoint d'informations système
router.get('/system/info', async (req, res) => {
  try {
    const { Admin, Category, Chant } = require('../models');
    
    // Compter les enregistrements
    const [adminCount, categoryCount, chantCount] = await Promise.all([
      Admin.count(),
      Category.count(),
      Chant.count()
    ]);
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch
      },
      database: {
        dialect: sequelize.getDialect(),
        modelsLoaded: Object.keys(sequelize.models).length,
        counts: {
          admins: adminCount,
          categories: categoryCount,
          chants: chantCount
        }
      },
      api: {
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des informations système',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
