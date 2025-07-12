// Contrôleur pour les signalements
const { Signalement, Chant, Category } = require('../models');

// Créer un signalement
exports.createSignalement = async (req, res, next) => {
  try {
    const { chant_id, description, user_id } = req.body;
    
    // Vérifier que le chant existe
    const chant = await Chant.findByPk(chant_id);
    if (!chant) {
      return res.status(404).json({
        message: 'Chant non trouvé'
      });
    }

    const signalement = await Signalement.create({
      chant_id,
      description,
      user_id: user_id || null,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Signalement créé avec succès',
      data: signalement
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir tous les signalements (pour admin)
exports.getAllSignalements = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0, status } = req.query;
    
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    const signalements = await Signalement.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: Chant,
        attributes: ['id', 'title'],
        include: [{
          model: Category,
          attributes: ['name']
        }]
      }],
      order: [['created_at', 'DESC']]
    });

    res.json({
      message: 'Signalements récupérés avec succès',
      total: signalements.count,
      data: signalements.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        totalPages: Math.ceil(signalements.count / limit),
        currentPage: Math.floor(offset / limit) + 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir un signalement par ID
exports.getSignalementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const signalement = await Signalement.findByPk(id, {
      include: [{
        model: Chant,
        include: [Category]
      }]
    });

    if (!signalement) {
      return res.status(404).json({
        message: 'Signalement non trouvé'
      });
    }

    res.json({
      message: 'Signalement récupéré avec succès',
      data: signalement
    });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour le statut d'un signalement
exports.updateSignalement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const signalement = await Signalement.findByPk(id);
    if (!signalement) {
      return res.status(404).json({
        message: 'Signalement non trouvé'
      });
    }

    signalement.status = status;
    await signalement.save();

    res.json({
      message: 'Statut du signalement mis à jour avec succès',
      data: signalement
    });
  } catch (err) {
    next(err);
  }
};

// Supprimer un signalement
exports.deleteSignalement = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const signalement = await Signalement.findByPk(id);
    if (!signalement) {
      return res.status(404).json({
        message: 'Signalement non trouvé'
      });
    }

    await signalement.destroy();
    
    res.json({
      message: 'Signalement supprimé avec succès'
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les statistiques des signalements
exports.getStatsSignalements = async (req, res, next) => {
  try {
    const totalSignalements = await Signalement.count();
    const signalementsByStatus = await Signalement.findAll({
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', 'status'), 'count']
      ],
      group: ['status']
    });

    // Chants les plus signalés
    const topSignaledChants = await Signalement.findAll({
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
      message: 'Statistiques des signalements',
      stats: {
        totalSignalements,
        signalementsByStatus,
        topSignaledChants
      }
    });
  } catch (err) {
    next(err);
  }
};
