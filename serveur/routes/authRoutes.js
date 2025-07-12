// Routes d'authentification
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { register, login } = require('../middlewares/validators/authValidator');
const { handleValidationErrors } = require('../middlewares/validators/validationHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'admin
 *         username:
 *           type: string
 *           description: Nom d'utilisateur de l'admin
 *         password:
 *           type: string
 *           description: Mot de passe de l'admin
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un nouvel administrateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès
 *       400:
 *         description: Erreur de validation ou utilisateur existant
 */
router.post('/register', register, handleValidationErrors, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion administrateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login, handleValidationErrors, authController.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obtenir le profil de l'administrateur connecté
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/profile', verifyToken, authController.profile);

module.exports = router;
