// Middleware pour gérer les résultats de validation
const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Erreurs de validation',
      errors: errors.array()
    });
  }
  next();
};
