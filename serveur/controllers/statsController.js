const { Chant, Category } = require('../models');

const getStats = async (req, res) => {
  try {
    console.log('📊 Récupération des statistiques...');
    
    // Compter le nombre total de chants
    const totalChants = await Chant.count();
    console.log(`📈 Total chants: ${totalChants}`);
    
    // Compter le nombre total de catégories
    const totalCategories = await Category.count();
    console.log(`📈 Total catégories: ${totalCategories}`);
    
    // Compter les chants par catégorie
    const chantsByCategory = await Category.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: Chant,
        attributes: ['id'],
        required: false
      }]
    });
    
    // Calculer les statistiques par catégorie
    const categoryStats = chantsByCategory.map(category => ({
      id: category.id,
      name: category.name,
      chantsCount: category.Chants ? category.Chants.length : 0
    }));
    
    // Obtenir les chants récents (5 derniers)
    const recentChants = await Chant.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }]
    });
    
    // Calculer la moyenne de chants par catégorie
    const averageChantsByCategory = totalCategories > 0 ? (totalChants / totalCategories).toFixed(2) : 0;
    
    // Statistiques détaillées
    const stats = {
      totalChants,
      totalCategories,
      averageChantsByCategory,
      categoryStats,
      recentChants: recentChants.map(chant => ({
        id: chant.id,
        title: chant.title,
        artist: chant.artist,
        category: chant.Category ? chant.Category.name : 'Sans catégorie',
        createdAt: chant.createdAt
      }))
    };
    
    console.log('✅ Statistiques récupérées:', stats);
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const stats = await getStats(req, res);
    return stats;
  } catch (error) {
    console.error('Erreur dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques du dashboard'
    });
  }
};

module.exports = {
  getStats,
  getDashboardStats
};
