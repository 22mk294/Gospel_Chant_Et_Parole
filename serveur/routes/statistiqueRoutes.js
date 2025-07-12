// Routes des statistiques
const express = require('express');
const router = express.Router();
const statistiqueController = require('../controllers/statistiqueController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { body, query } = require('express-validator');
const { handleValidationErrors } = require('../middlewares/validators/validationHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Statistique:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de la statistique
 *         user_id:
 *           type: string
 *           description: UUID anonyme ou device_id
 *         chant_id:
 *           type: integer
 *           description: ID du chant (optionnel)
 *         action:
 *           type: string
 *           enum: [view, favori, search, signalement]
 *           description: Type d'action
 *         metadata:
 *           type: object
 *           description: Données supplémentaires
 *         created_at:
 *           type: string
 *           format: date-time
 */

// Validation pour tracker une action
const trackActionValidation = [
  body('user_id')
    .trim()
    .notEmpty()
    .withMessage('user_id est requis')
    .isLength({ min: 1, max: 100 })
    .withMessage('user_id doit contenir entre 1 et 100 caractères'),
  
  body('action')
    .isIn(['view', 'favori', 'search', 'signalement'])
    .withMessage('action doit être: view, favori, search ou signalement'),
  
  body('chant_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('chant_id doit être un entier positif'),
  
  body('metadata')
    .optional()
    .isObject()
    .withMessage('metadata doit être un objet')
];

// Validation pour les paramètres de période
const periodValidation = [
  query('period')
    .optional()
    .isIn(['1d', '7d', '30d'])
    .withMessage('period doit être: 1d, 7d ou 30d')
];

/**
 * @swagger
 * /api/stats/track:
 *   post:
 *     summary: Enregistrer une action utilisateur
 *     tags: [Statistiques]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - action
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: UUID anonyme ou device_id
 *               action:
 *                 type: string
 *                 enum: [view, favori, search, signalement]
 *               chant_id:
 *                 type: integer
 *                 description: ID du chant (optionnel)
 *               metadata:
 *                 type: object
 *                 description: Données supplémentaires
 *     responses:
 *       201:
 *         description: Action trackée avec succès
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Chant non trouvé
 */
router.post('/track', trackActionValidation, handleValidationErrors, statistiqueController.trackAction);

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Obtenir les statistiques globales (admin)
 *     tags: [Statistiques]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [1d, 7d, 30d]
 *           default: 7d
 *         description: Période pour les statistiques
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *       401:
 *         description: Non autorisé
 */
router.get('/', verifyToken, periodValidation, handleValidationErrors, statistiqueController.getGlobalStats);

/**
 * @swagger
 * /api/stats/chants/{id}:
 *   get:
 *     summary: Obtenir les statistiques d'un chant spécifique (admin)
 *     tags: [Statistiques]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du chant
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [1d, 7d, 30d]
 *           default: 7d
 *         description: Période pour les statistiques
 *     responses:
 *       200:
 *         description: Statistiques du chant récupérées avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Chant non trouvé
 */
router.get('/chants/:id', verifyToken, periodValidation, handleValidationErrors, statistiqueController.getChantStats);

module.exports = router;
