// Contrôleur pour les statistiques
const { Statistique, Chant, Category } = require('../models');
const { Op } = require('sequelize');

// Enregistrer une statistique
exports.trackAction = async (req, res, next) => {
  try {
    const { user_id, chant_id, action, metadata } = req.body;
    
    // Vérifier que le chant existe si chant_id est fourni
    if (chant_id) {
      const chant = await Chant.findByPk(chant_id);
      if (!chant) {
        return res.status(404).json({
          message: 'Chant non trouvé'
        });
      }
    }

    const statistique = await Statistique.create({
      user_id,
      chant_id: chant_id || null,
      action,
      metadata: metadata || null
    });

    res.status(201).json({
      message: 'Action trackée avec succès',
      data: statistique
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les statistiques globales
exports.getGlobalStats = async (req, res, next) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculer la date de début selon la période
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Statistiques générales
    const totalActions = await Statistique.count({
      where: {
        created_at: {
          [Op.gte]: startDate
        }
      }
    });

    const uniqueUsers = await Statistique.count({
      distinct: true,
      col: 'user_id',
      where: {
        created_at: {
          [Op.gte]: startDate
        }
      }
    });

    // Actions par type
    const actionsByType = await Statistique.findAll({
      attributes: [
        'action',
        [require('sequelize').fn('COUNT', 'action'), 'count']
      ],
      where: {
        created_at: {
          [Op.gte]: startDate
        }
      },
      group: ['action']
    });

    // Chants les plus vus
    const topViewedChants = await Statistique.findAll({
      attributes: [
        'chant_id',
        [require('sequelize').fn('COUNT', 'chant_id'), 'count']
      ],
      where: {
        action: 'view',
        chant_id: {
          [Op.ne]: null
        },
        created_at: {
          [Op.gte]: startDate
        }
      },
      include: [{
        model: Chant,
        attributes: ['title'],
        include: [{
          model: Category,
          attributes: ['name']
        }]
      }],
      group: ['chant_id'],
      order: [[require('sequelize').fn('COUNT', 'chant_id'), 'DESC']],
      limit: 10
    });

    // Activité par jour
    const dailyActivity = await Statistique.findAll({
      attributes: [
        [require('sequelize').fn('DATE', require('sequelize').col('created_at')), 'date'],
        [require('sequelize').fn('COUNT', '*'), 'count']
      ],
      where: {
        created_at: {
          [Op.gte]: startDate
        }
      },
      group: [require('sequelize').fn('DATE', require('sequelize').col('created_at'))],
      order: [[require('sequelize').fn('DATE', require('sequelize').col('created_at')), 'ASC']]
    });

    res.json({
      message: 'Statistiques globales',
      period,
      stats: {
        totalActions,
        uniqueUsers,
        actionsByType,
        topViewedChants,
        dailyActivity
      }
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les statistiques d'un chant spécifique
exports.getChantStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { period = '7d' } = req.query;
    
    // Vérifier que le chant existe
    const chant = await Chant.findByPk(id);
    if (!chant) {
      return res.status(404).json({
        message: 'Chant non trouvé'
      });
    }

    // Calculer la date de début selon la période
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Statistiques du chant
    const totalViews = await Statistique.count({
      where: {
        chant_id: id,
        action: 'view',
        created_at: {
          [Op.gte]: startDate
        }
      }
    });

    const totalFavoris = await Statistique.count({
      where: {
        chant_id: id,
        action: 'favori',
        created_at: {
          [Op.gte]: startDate
        }
      }
    });

    const uniqueViewers = await Statistique.count({
      distinct: true,
      col: 'user_id',
      where: {
        chant_id: id,
        action: 'view',
        created_at: {
          [Op.gte]: startDate
        }
      }
    });

    res.json({
      message: 'Statistiques du chant',
      chant: {
        id: chant.id,
        title: chant.title
      },
      period,
      stats: {
        totalViews,
        totalFavoris,
        uniqueViewers
      }
    });
  } catch (err) {
    next(err);
  }
};
