// Contrôleur des catégories
const { Category, Chant } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Chant,
        attributes: ['id', 'title']
      }],
      order: [['name', 'ASC']]
    });
    
    res.json({
      total: categories.length,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [{
        model: Chant,
        attributes: ['id', 'title', 'createdAt']
      }]
    });
    
    if (!category) {
      return res.status(404).json({
        message: 'Catégorie non trouvée'
      });
    }
    
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    // Vérifier si la catégorie existe déjà
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({
        message: 'Cette catégorie existe déjà'
      });
    }
    
    const category = await Category.create({ name });
    
    res.status(201).json({
      message: 'Catégorie créée avec succès',
      data: category
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        message: 'Catégorie non trouvée'
      });
    }
    
    // Vérifier si le nouveau nom existe déjà
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({
          message: 'Cette catégorie existe déjà'
        });
      }
    }
    
    await category.update({ name: name || category.name });
    
    res.json({
      message: 'Catégorie mise à jour avec succès',
      data: category
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        message: 'Catégorie non trouvée'
      });
    }
    
    // Vérifier s'il y a des chants associés
    const chantsCount = await Chant.count({ where: { category_id: id } });
    if (chantsCount > 0) {
      return res.status(400).json({
        message: `Impossible de supprimer cette catégorie car elle contient ${chantsCount} chant(s)`
      });
    }
    
    await category.destroy();
    
    res.json({
      message: 'Catégorie supprimée avec succès'
    });
  } catch (err) {
    next(err);
  }
};
