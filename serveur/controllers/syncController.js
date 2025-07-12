// Contrôleur pour la synchronisation
const { Chant, Category } = require('../models');
const { Op } = require('sequelize');

// Obtenir les updates depuis un timestamp
exports.getUpdates = async (req, res, next) => {
  try {
    const { since } = req.query;
    
    if (!since) {
      return res.status(400).json({
        message: 'Paramètre "since" (timestamp) requis'
      });
    }

    // Convertir le timestamp en date
    const sinceDate = new Date(parseInt(since));
    
    if (isNaN(sinceDate.getTime())) {
      return res.status(400).json({
        message: 'Format de timestamp invalide'
      });
    }

    // Récupérer les chants modifiés
    const chantsUpdated = await Chant.findAll({
      where: {
        updatedAt: {
          [Op.gte]: sinceDate
        }
      },
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }],
      order: [['updatedAt', 'ASC']]
    });

    // Récupérer les catégories modifiées
    const categoriesUpdated = await Category.findAll({
      where: {
        updatedAt: {
          [Op.gte]: sinceDate
        }
      },
      order: [['updatedAt', 'ASC']]
    });

    // Timestamp actuel pour la prochaine sync
    const currentTimestamp = Date.now();

    res.json({
      message: 'Updates récupérés avec succès',
      since: parseInt(since),
      current_timestamp: currentTimestamp,
      updates: {
        chants: chantsUpdated,
        categories: categoriesUpdated
      },
      counts: {
        chants: chantsUpdated.length,
        categories: categoriesUpdated.length,
        total: chantsUpdated.length + categoriesUpdated.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir un snapshot complet pour la première sync
exports.getFullSync = async (req, res, next) => {
  try {
    // Récupérer tous les chants
    const allChants = await Chant.findAll({
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }],
      order: [['id', 'ASC']]
    });

    // Récupérer toutes les catégories
    const allCategories = await Category.findAll({
      order: [['id', 'ASC']]
    });

    // Timestamp actuel
    const currentTimestamp = Date.now();

    res.json({
      message: 'Synchronisation complète',
      timestamp: currentTimestamp,
      data: {
        chants: allChants,
        categories: allCategories
      },
      counts: {
        chants: allChants.length,
        categories: allCategories.length,
        total: allChants.length + allCategories.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les metadata de synchronisation
exports.getSyncMetadata = async (req, res, next) => {
  try {
    // Dernière modification de chant
    const lastChantUpdate = await Chant.findOne({
      attributes: ['updatedAt'],
      order: [['updatedAt', 'DESC']]
    });

    // Dernière modification de catégorie
    const lastCategoryUpdate = await Category.findOne({
      attributes: ['updatedAt'],
      order: [['updatedAt', 'DESC']]
    });

    // Compteurs
    const totalChants = await Chant.count();
    const totalCategories = await Category.count();

    const lastUpdate = Math.max(
      lastChantUpdate ? new Date(lastChantUpdate.updatedAt).getTime() : 0,
      lastCategoryUpdate ? new Date(lastCategoryUpdate.updatedAt).getTime() : 0
    );

    res.json({
      message: 'Metadata de synchronisation',
      metadata: {
        last_update: lastUpdate,
        total_chants: totalChants,
        total_categories: totalCategories,
        server_timestamp: Date.now()
      }
    });
  } catch (err) {
    next(err);
  }
};
