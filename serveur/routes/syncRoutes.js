// Routes de synchronisation
const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');
const { query } = require('express-validator');
const { handleValidationErrors } = require('../middlewares/validators/validationHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     SyncResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         since:
 *           type: integer
 *           description: Timestamp de début
 *         current_timestamp:
 *           type: integer
 *           description: Timestamp actuel du serveur
 *         updates:
 *           type: object
 *           properties:
 *             chants:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chant'
 *             categories:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *         counts:
 *           type: object
 *           properties:
 *             chants:
 *               type: integer
 *             categories:
 *               type: integer
 *             total:
 *               type: integer
 */

// Validation pour les paramètres de synchronisation
const syncValidation = [
  query('since')
    .notEmpty()
    .withMessage('Paramètre "since" (timestamp) requis')
    .isNumeric()
    .withMessage('Le paramètre "since" doit être un timestamp numérique')
];

/**
 * @swagger
 * /api/sync/updates:
 *   get:
 *     summary: Obtenir les mises à jour depuis un timestamp
 *     tags: [Synchronisation]
 *     parameters:
 *       - in: query
 *         name: since
 *         required: true
 *         schema:
 *           type: integer
 *         description: Timestamp (ms) depuis lequel récupérer les mises à jour
 *         example: 1626876543000
 *     responses:
 *       200:
 *         description: Mises à jour récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SyncResponse'
 *       400:
 *         description: Paramètre since manquant ou invalide
 */
router.get('/updates', syncValidation, handleValidationErrors, syncController.getUpdates);

/**
 * @swagger
 * /api/sync/full:
 *   get:
 *     summary: Obtenir une synchronisation complète (première sync)
 *     tags: [Synchronisation]
 *     responses:
 *       200:
 *         description: Synchronisation complète réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     chants:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Chant'
 *                     categories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *                 counts:
 *                   type: object
 *                   properties:
 *                     chants:
 *                       type: integer
 *                     categories:
 *                       type: integer
 *                     total:
 *                       type: integer
 */
router.get('/full', syncController.getFullSync);

/**
 * @swagger
 * /api/sync/metadata:
 *   get:
 *     summary: Obtenir les métadonnées de synchronisation
 *     tags: [Synchronisation]
 *     responses:
 *       200:
 *         description: Métadonnées récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     last_update:
 *                       type: integer
 *                       description: Timestamp de la dernière modification
 *                     total_chants:
 *                       type: integer
 *                     total_categories:
 *                       type: integer
 *                     server_timestamp:
 *                       type: integer
 */
router.get('/metadata', syncController.getSyncMetadata);

module.exports = router;
