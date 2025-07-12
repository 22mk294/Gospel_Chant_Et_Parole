// Validators pour les catégories
const { body } = require('express-validator');

exports.createCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom de la catégorie est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères')
    .escape()
];

exports.updateCategory = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères')
    .escape()
];
