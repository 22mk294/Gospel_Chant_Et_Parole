const express = require('express');
const router = express.Router();
const { Admin, Chant, Category } = require('../models');
const { verifyToken } = require('../middlewares/authMiddleware');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Récupère les données du tableau de bord administrateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données du tableau de bord
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalChants:
 *                       type: number
 *                     totalCategories:
 *                       type: number
 *                     totalAdmins:
 *                       type: number
 *                 recentActivity:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       title:
 *                         type: string
 *                       date:
 *                         type: string
 *                       action:
 *                         type: string
 */
router.get('/dashboard', verifyToken, async (req, res, next) => {
  try {
    // Statistiques générales
    const [totalChants, totalCategories, totalAdmins] = await Promise.all([
      Chant.count(),
      Category.count(),
      Admin.count()
    ]);

    // Activité récente
    const recentChants = await Chant.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'title', 'createdAt', 'updatedAt']
    });

    const recentCategories = await Category.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'name', 'createdAt', 'updatedAt']
    });

    // Formatage de l'activité récente
    const recentActivity = [];
    
    recentChants.forEach(chant => {
      recentActivity.push({
        type: 'chant',
        title: chant.title,
        date: chant.createdAt,
        action: 'Créé'
      });
      
      if (chant.updatedAt > chant.createdAt) {
        recentActivity.push({
          type: 'chant',
          title: chant.title,
          date: chant.updatedAt,
          action: 'Modifié'
        });
      }
    });

    recentCategories.forEach(category => {
      recentActivity.push({
        type: 'category',
        title: category.name,
        date: category.createdAt,
        action: 'Créée'
      });
      
      if (category.updatedAt > category.createdAt) {
        recentActivity.push({
          type: 'category',
          title: category.name,
          date: category.updatedAt,
          action: 'Modifiée'
        });
      }
    });

    // Tri par date décroissante
    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      stats: {
        totalChants,
        totalCategories,
        totalAdmins
      },
      recentActivity: recentActivity.slice(0, 10) // Limite à 10 éléments
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/admin/database:
 *   get:
 *     summary: Récupère l'état de la base de données en temps réel
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: État de la base de données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 connection:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     database:
 *                       type: string
 *                     host:
 *                       type: string
 *                 tables:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       rowCount:
 *                         type: number
 *                       size:
 *                         type: string
 *                 performance:
 *                   type: object
 *                   properties:
 *                     averageQueryTime:
 *                       type: string
 *                     activeConnections:
 *                       type: number
 */
router.get('/database', verifyToken, async (req, res, next) => {
  try {
    // Test de connexion à la base de données
    await sequelize.authenticate();
    
    // Informations de connexion
    const connection = {
      status: 'connected',
      database: sequelize.config.database,
      host: sequelize.config.host,
      dialect: sequelize.getDialect()
    };

    // Comptage des enregistrements par table
    const tables = [];
    
    const chantCount = await Chant.count();
    const categoryCount = await Category.count();
    const adminCount = await Admin.count();

    tables.push(
      { name: 'chants', rowCount: chantCount, size: 'N/A' },
      { name: 'categories', rowCount: categoryCount, size: 'N/A' },
      { name: 'admins', rowCount: adminCount, size: 'N/A' }
    );

    // Informations de performance simulées
    const performance = {
      averageQueryTime: '~50ms',
      activeConnections: 1,
      uptime: process.uptime()
    };

    res.json({
      connection,
      tables,
      performance
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/admin/realtime-data:
 *   get:
 *     summary: Récupère les données en temps réel
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [chants, categories, all]
 *         description: Type de données à récupérer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments à retourner
 *     responses:
 *       200:
 *         description: Données en temps réel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 */
router.get('/realtime-data', verifyToken, async (req, res, next) => {
  try {
    const { type = 'all', limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    let data = [];
    let total = 0;

    if (type === 'chants' || type === 'all') {
      const chants = await Chant.findAndCountAll({
        order: [['updatedAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          {
            model: Category,
            attributes: ['name']
          }
        ]
      });

      if (type === 'chants') {
        data = chants.rows;
        total = chants.count;
      } else {
        data = data.concat(chants.rows.map(chant => ({
          ...chant.toJSON(),
          type: 'chant'
        })));
      }
    }

    if (type === 'categories' || type === 'all') {
      const categories = await Category.findAndCountAll({
        order: [['updatedAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          {
            model: Chant,
            attributes: ['id']
          }
        ]
      });

      if (type === 'categories') {
        data = categories.rows;
        total = categories.count;
      } else {
        data = data.concat(categories.rows.map(category => ({
          ...category.toJSON(),
          type: 'category'
        })));
      }
    }

    if (type === 'all') {
      // Trier par date de mise à jour
      data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      data = data.slice(0, limit);
      total = data.length;
    }

    res.json({
      data,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        hasNextPage: offset + limit < total
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/admin/api-routes:
 *   get:
 *     summary: Récupère toutes les routes API disponibles
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des routes API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                       path:
 *                         type: string
 *                       description:
 *                         type: string
 *                       protected:
 *                         type: boolean
 *                       category:
 *                         type: string
 */
router.get('/api-routes', verifyToken, async (req, res, next) => {
  try {
    const routes = [
      // Routes d'authentification
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Connexion administrateur',
        protected: false,
        category: 'Authentification'
      },
      {
        method: 'POST',
        path: '/api/auth/register',
        description: 'Inscription administrateur',
        protected: false,
        category: 'Authentification'
      },
      {
        method: 'POST',
        path: '/api/auth/logout',
        description: 'Déconnexion',
        protected: true,
        category: 'Authentification'
      },
      {
        method: 'GET',
        path: '/api/auth/profile',
        description: 'Profil utilisateur',
        protected: true,
        category: 'Authentification'
      },
      
      // Routes des chants
      {
        method: 'GET',
        path: '/api/chants',
        description: 'Liste des chants',
        protected: false,
        category: 'Chants'
      },
      {
        method: 'GET',
        path: '/api/chants/:id',
        description: 'Détails d\'un chant',
        protected: false,
        category: 'Chants'
      },
      {
        method: 'POST',
        path: '/api/chants',
        description: 'Créer un chant',
        protected: true,
        category: 'Chants'
      },
      {
        method: 'PUT',
        path: '/api/chants/:id',
        description: 'Modifier un chant',
        protected: true,
        category: 'Chants'
      },
      {
        method: 'DELETE',
        path: '/api/chants/:id',
        description: 'Supprimer un chant',
        protected: true,
        category: 'Chants'
      },
      
      // Routes des catégories
      {
        method: 'GET',
        path: '/api/categories',
        description: 'Liste des catégories',
        protected: false,
        category: 'Catégories'
      },
      {
        method: 'GET',
        path: '/api/categories/:id',
        description: 'Détails d\'une catégorie',
        protected: false,
        category: 'Catégories'
      },
      {
        method: 'POST',
        path: '/api/categories',
        description: 'Créer une catégorie',
        protected: true,
        category: 'Catégories'
      },
      {
        method: 'PUT',
        path: '/api/categories/:id',
        description: 'Modifier une catégorie',
        protected: true,
        category: 'Catégories'
      },
      {
        method: 'DELETE',
        path: '/api/categories/:id',
        description: 'Supprimer une catégorie',
        protected: true,
        category: 'Catégories'
      },
      
      // Routes d'administration
      {
        method: 'GET',
        path: '/api/admin/dashboard',
        description: 'Tableau de bord admin',
        protected: true,
        category: 'Administration'
      },
      {
        method: 'GET',
        path: '/api/admin/database',
        description: 'État de la base de données',
        protected: true,
        category: 'Administration'
      },
      {
        method: 'GET',
        path: '/api/admin/realtime-data',
        description: 'Données en temps réel',
        protected: true,
        category: 'Administration'
      },
      {
        method: 'GET',
        path: '/api/admin/api-routes',
        description: 'Liste des routes API',
        protected: true,
        category: 'Administration'
      },
      
      // Documentation
      {
        method: 'GET',
        path: '/api-docs',
        description: 'Documentation Swagger',
        protected: true,
        category: 'Documentation'
      }
    ];

    // Grouper par catégorie
    const groupedRoutes = routes.reduce((acc, route) => {
      if (!acc[route.category]) {
        acc[route.category] = [];
      }
      acc[route.category].push(route);
      return acc;
    }, {});

    res.json({
      routes: groupedRoutes,
      total: routes.length,
      categories: Object.keys(groupedRoutes)
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/admin/system-info:
 *   get:
 *     summary: Récupère les informations système
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations système
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 system:
 *                   type: object
 *                   properties:
 *                     nodeVersion:
 *                       type: string
 *                     platform:
 *                       type: string
 *                     arch:
 *                       type: string
 *                     uptime:
 *                       type: number
 *                 memory:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: string
 *                     used:
 *                       type: string
 *                     free:
 *                       type: string
 *                 database:
 *                   type: object
 *                   properties:
 *                     dialect:
 *                       type: string
 *                     version:
 *                       type: string
 *                     status:
 *                       type: string
 */
router.get('/system-info', verifyToken, async (req, res, next) => {
  try {
    const system = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      pid: process.pid
    };

    const memory = process.memoryUsage();
    const memoryInfo = {
      total: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      used: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      free: `${((memory.heapTotal - memory.heapUsed) / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memory.external / 1024 / 1024).toFixed(2)} MB`
    };

    const database = {
      dialect: sequelize.getDialect(),
      version: sequelize.version,
      status: 'connected'
    };

    res.json({
      system,
      memory: memoryInfo,
      database,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
