// Contrôleur pour les favoris
const { Favoris, Chant, Category } = require('../models');

// Obtenir tous les favoris (pour admin/debug)
exports.getAllFavoris = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const favoris = await Favoris.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: Chant,
        include: [Category]
      }],
      order: [['created_at', 'DESC']]
    });

    res.json({
      message: 'Favoris récupérés avec succès',
      total: favoris.count,
      data: favoris.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        totalPages: Math.ceil(favoris.count / limit),
        currentPage: Math.floor(offset / limit) + 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Synchroniser les favoris depuis l'app mobile
exports.syncFavoris = async (req, res, next) => {
  try {
    const { user_id, favoris } = req.body;
    
    if (!user_id || !Array.isArray(favoris)) {
      return res.status(400).json({
        message: 'user_id et favoris (array) sont requis'
      });
    }

    const created = [];
    const errors = [];

    for (const favori of favoris) {
      try {
        // Vérifier que le chant existe
        const chant = await Chant.findByPk(favori.chant_id);
        if (!chant) {
          errors.push(`Chant ${favori.chant_id} non trouvé`);
          continue;
        }

        // Vérifier si le favori existe déjà
        const existingFavori = await Favoris.findOne({
          where: {
            user_id: user_id,
            chant_id: favori.chant_id
          }
        });

        if (!existingFavori) {
          const newFavori = await Favoris.create({
            user_id: user_id,
            chant_id: favori.chant_id
          });
          created.push(newFavori);
        }
      } catch (error) {
        errors.push(`Erreur pour chant ${favori.chant_id}: ${error.message}`);
      }
    }

    res.json({
      message: 'Synchronisation terminée',
      created: created.length,
      errors: errors.length > 0 ? errors : null
    });
  } catch (err) {
    next(err);
  }
};

// Supprimer un favori (pour admin)
exports.deleteFavori = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const favori = await Favoris.findByPk(id);
    if (!favori) {
      return res.status(404).json({
        message: 'Favori non trouvé'
      });
    }

    await favori.destroy();
    
    res.json({
      message: 'Favori supprimé avec succès'
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les statistiques des favoris
exports.getStatsFavoris = async (req, res, next) => {
  try {
    const totalFavoris = await Favoris.count();
    const uniqueUsers = await Favoris.count({
      distinct: true,
      col: 'user_id'
    });
    
    // Top 5 des chants les plus mis en favoris
    const topChants = await Favoris.findAll({
      attributes: [
        'chant_id',
        [require('sequelize').fn('COUNT', 'chant_id'), 'count']
      ],
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
      limit: 5
    });

    res.json({
      message: 'Statistiques des favoris',
      stats: {
        totalFavoris,
        uniqueUsers,
        topChants
      }
    });
  } catch (err) {
    next(err);
  }
};
