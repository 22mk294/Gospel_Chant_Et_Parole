// Contrôleur des chants
const { Chant, Category } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || '';
    
    const whereCondition = search ? {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { lyrics: { [Op.like]: `%${search}%` } }
      ]
    } : {};
    
    const chants = await Chant.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      total: chants.count,
      data: chants.rows,
      pagination: {
        limit,
        offset,
        totalPages: Math.ceil(chants.count / limit),
        currentPage: Math.floor(offset / limit) + 1
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chant = await Chant.findByPk(id, {
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }]
    });
    
    if (!chant) {
      return res.status(404).json({
        message: 'Chant non trouvé'
      });
    }
    
    res.json(chant);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, lyrics, category_id } = req.body;
    
    // Vérifier que la catégorie existe si fournie
    if (category_id) {
      const categoryExists = await Category.findByPk(category_id);
      if (!categoryExists) {
        return res.status(400).json({
          message: 'Catégorie non trouvée'
        });
      }
    }
    
    const chant = await Chant.create({ 
      title, 
      lyrics, 
      category_id: category_id || null 
    });
    
    // Récupérer le chant créé avec sa catégorie
    const createdChant = await Chant.findByPk(chant.id, {
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }]
    });
    
    res.status(201).json({
      message: 'Chant créé avec succès',
      data: createdChant
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, lyrics, category_id } = req.body;
    
    const chant = await Chant.findByPk(id);
    if (!chant) {
      return res.status(404).json({
        message: 'Chant non trouvé'
      });
    }
    
    // Vérifier que la catégorie existe si fournie
    if (category_id) {
      const categoryExists = await Category.findByPk(category_id);
      if (!categoryExists) {
        return res.status(400).json({
          message: 'Catégorie non trouvée'
        });
      }
    }
    
    await chant.update({ 
      title: title || chant.title,
      lyrics: lyrics || chant.lyrics,
      category_id: category_id !== undefined ? category_id : chant.category_id
    });
    
    // Récupérer le chant mis à jour avec sa catégorie
    const updatedChant = await Chant.findByPk(id, {
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }]
    });
    
    res.json({
      message: 'Chant mis à jour avec succès',
      data: updatedChant
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const chant = await Chant.findByPk(id);
    if (!chant) {
      return res.status(404).json({
        message: 'Chant non trouvé'
      });
    }
    
    await chant.destroy();
    
    res.json({
      message: 'Chant supprimé avec succès'
    });
  } catch (err) {
    next(err);
  }
};
