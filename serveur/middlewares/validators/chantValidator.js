// Validators pour les chants
const { body, query } = require('express-validator');

exports.createChant = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis')
    .isLength({ min: 2, max: 200 })
    .withMessage('Le titre doit contenir entre 2 et 200 caractères')
    .escape(),
  
  body('lyrics')
    .trim()
    .notEmpty()
    .withMessage('Les paroles sont requises')
    .isLength({ min: 5 })
    .withMessage('Les paroles doivent contenir au moins 5 caractères'),
  
  body('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de catégorie invalide')
];

exports.updateChant = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Le titre doit contenir entre 2 et 200 caractères')
    .escape(),
  
  body('lyrics')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Les paroles doivent contenir au moins 5 caractères'),
  
  body('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de catégorie invalide')
];

exports.paginationQuery = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite doit être entre 1 et 100'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset doit être positif'),
    
  query('search')
    .optional()
    .trim()
    .escape()
];
