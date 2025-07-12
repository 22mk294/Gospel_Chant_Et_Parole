// Routes des chants
const express = require('express');
const router = express.Router();
const chantController = require('../controllers/chantController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { createChant, updateChant, paginationQuery } = require('../middlewares/validators/chantValidator');
const { handleValidationErrors } = require('../middlewares/validators/validationHandler');
const { trackChantView, trackSearch } = require('../middlewares/trackingMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Chant:
 *       type: object
 *       required:
 *         - title
 *         - lyrics
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré du chant
 *         title:
 *           type: string
 *           description: Titre du chant
 *         lyrics:
 *           type: string
 *           description: Paroles du chant
 *         category_id:
 *           type: integer
 *           description: ID de la catégorie associée
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/chants:
 *   get:
 *     summary: Récupérer tous les chants avec pagination
 *     tags: [Chants]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Nombre de chants par page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Nombre de chants à ignorer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche dans le titre et les paroles
 *     responses:
 *       200:
 *         description: Liste des chants récupérée avec succès
 */
router.get('/', paginationQuery, handleValidationErrors, trackSearch, chantController.getAll);

/**
 * @swagger
 * /api/chants/{id}:
 *   get:
 *     summary: Récupérer un chant par ID
 *     tags: [Chants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du chant
 *     responses:
 *       200:
 *         description: Chant récupéré avec succès
 *       404:
 *         description: Chant non trouvé
 */
router.get('/:id', trackChantView, chantController.getById);

/**
 * @swagger
 * /api/chants:
 *   post:
 *     summary: Créer un nouveau chant
 *     tags: [Chants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - lyrics
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 200
 *               lyrics:
 *                 type: string
 *                 minLength: 5
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Chant créé avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 */
router.post('/', verifyToken, createChant, handleValidationErrors, chantController.create);

/**
 * @swagger
 * /api/chants/{id}:
 *   put:
 *     summary: Mettre à jour un chant
 *     tags: [Chants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du chant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 200
 *               lyrics:
 *                 type: string
 *                 minLength: 5
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Chant mis à jour avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Chant non trouvé
 */
router.put('/:id', verifyToken, updateChant, handleValidationErrors, chantController.update);

/**
 * @swagger
 * /api/chants/{id}:
 *   delete:
 *     summary: Supprimer un chant
 *     tags: [Chants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du chant
 *     responses:
 *       200:
 *         description: Chant supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Chant non trouvé
 */
router.delete('/:id', verifyToken, chantController.delete);

module.exports = router;
