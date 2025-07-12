// Routes pour le health check
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

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

module.exports = router;
