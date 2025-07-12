// Routes des signalements
const express = require('express');
const router = express.Router();
const signalementController = require('../controllers/signalementController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middlewares/validators/validationHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Signalement:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré du signalement
 *         chant_id:
 *           type: integer
 *           description: ID du chant signalé
 *         description:
 *           type: string
 *           description: Description du problème
 *         user_id:
 *           type: string
 *           description: UUID anonyme ou ID utilisateur (optionnel)
 *         status:
 *           type: string
 *           enum: [pending, reviewed, resolved, rejected]
 *           description: Statut du signalement
 *         created_at:
 *           type: string
 *           format: date-time
 */

// Validation pour créer un signalement
const createSignalementValidation = [
  body('chant_id')
    .isInt({ min: 1 })
    .withMessage('chant_id doit être un entier positif'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description est requise')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description doit contenir entre 10 et 500 caractères')
    .escape(),
  
  body('user_id')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('user_id doit contenir entre 1 et 100 caractères')
    .escape()
];

// Validation pour mettre à jour un signalement
const updateSignalementValidation = [
  body('status')
    .isIn(['pending', 'reviewed', 'resolved', 'rejected'])
    .withMessage('Status doit être: pending, reviewed, resolved ou rejected')
];

/**
 * @swagger
 * /api/signalements:
 *   post:
 *     summary: Créer un signalement
 *     tags: [Signalements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chant_id
 *               - description
 *             properties:
 *               chant_id:
 *                 type: integer
 *                 description: ID du chant à signaler
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *                 description: Description du problème
 *               user_id:
 *                 type: string
 *                 description: UUID anonyme (optionnel)
 *     responses:
 *       201:
 *         description: Signalement créé avec succès
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Chant non trouvé
 */
router.post('/', createSignalementValidation, handleValidationErrors, signalementController.createSignalement);

/**
 * @swagger
 * /api/signalements:
 *   get:
 *     summary: Récupérer tous les signalements (admin)
 *     tags: [Signalements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, reviewed, resolved, rejected]
 *     responses:
 *       200:
 *         description: Signalements récupérés avec succès
 *       401:
 *         description: Non autorisé
 */
router.get('/', verifyToken, signalementController.getAllSignalements);

/**
 * @swagger
 * /api/signalements/stats:
 *   get:
 *     summary: Obtenir les statistiques des signalements
 *     tags: [Signalements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *       401:
 *         description: Non autorisé
 */
router.get('/stats', verifyToken, signalementController.getStatsSignalements);

/**
 * @swagger
 * /api/signalements/{id}:
 *   get:
 *     summary: Récupérer un signalement par ID (admin)
 *     tags: [Signalements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du signalement
 *     responses:
 *       200:
 *         description: Signalement récupéré avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Signalement non trouvé
 */
router.get('/:id', verifyToken, signalementController.getSignalementById);

/**
 * @swagger
 * /api/signalements/{id}:
 *   put:
 *     summary: Mettre à jour le statut d'un signalement (admin)
 *     tags: [Signalements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du signalement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, reviewed, resolved, rejected]
 *     responses:
 *       200:
 *         description: Statut mis à jour avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Signalement non trouvé
 */
router.put('/:id', verifyToken, updateSignalementValidation, handleValidationErrors, signalementController.updateSignalement);

/**
 * @swagger
 * /api/signalements/{id}:
 *   delete:
 *     summary: Supprimer un signalement (admin)
 *     tags: [Signalements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du signalement
 *     responses:
 *       200:
 *         description: Signalement supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Signalement non trouvé
 */
router.delete('/:id', verifyToken, signalementController.deleteSignalement);

module.exports = router;
