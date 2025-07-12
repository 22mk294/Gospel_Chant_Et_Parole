// Routes des favoris
const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favorisController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middlewares/validators/validationHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Favoris:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré du favori
 *         user_id:
 *           type: string
 *           description: UUID anonyme ou ID utilisateur
 *         chant_id:
 *           type: integer
 *           description: ID du chant mis en favori
 *         created_at:
 *           type: string
 *           format: date-time
 */

// Validation pour la synchronisation des favoris
const syncFavorisValidation = [
  body('user_id')
    .trim()
    .notEmpty()
    .withMessage('user_id est requis')
    .isLength({ min: 1, max: 100 })
    .withMessage('user_id doit contenir entre 1 et 100 caractères'),
  
  body('favoris')
    .isArray()
    .withMessage('favoris doit être un tableau'),
  
  body('favoris.*.chant_id')
    .isInt({ min: 1 })
    .withMessage('chant_id doit être un entier positif')
];

/**
 * @swagger
 * /api/favoris:
 *   get:
 *     summary: Récupérer tous les favoris (admin)
 *     tags: [Favoris]
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
 *     responses:
 *       200:
 *         description: Favoris récupérés avec succès
 *       401:
 *         description: Non autorisé
 */
router.get('/', verifyToken, favorisController.getAllFavoris);

/**
 * @swagger
 * /api/favoris/sync:
 *   post:
 *     summary: Synchroniser les favoris depuis l'app mobile
 *     tags: [Favoris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - favoris
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: UUID anonyme ou ID utilisateur
 *               favoris:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     chant_id:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Synchronisation terminée
 *       400:
 *         description: Erreur de validation
 */
router.post('/sync', syncFavorisValidation, handleValidationErrors, favorisController.syncFavoris);

/**
 * @swagger
 * /api/favoris/stats:
 *   get:
 *     summary: Obtenir les statistiques des favoris
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *       401:
 *         description: Non autorisé
 */
router.get('/stats', verifyToken, favorisController.getStatsFavoris);

/**
 * @swagger
 * /api/favoris/{id}:
 *   delete:
 *     summary: Supprimer un favori (admin)
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du favori
 *     responses:
 *       200:
 *         description: Favori supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Favori non trouvé
 */
router.delete('/:id', verifyToken, favorisController.deleteFavori);

module.exports = router;
