const express = require('express');
const router = express.Router();
const { getStats, getDashboardStats } = require('../controllers/statsController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Routes protégées pour les statistiques
router.get('/dashboard', authenticateToken, getStats);
router.get('/general', authenticateToken, getStats);

module.exports = router;
