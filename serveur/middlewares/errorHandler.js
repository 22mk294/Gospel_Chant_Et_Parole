// Middleware de gestion des erreurs
module.exports = (err, req, res, next) => {
  console.error('❌ Erreur capturée:', err.stack);
  
  // Erreur de validation Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: err.errors.map(e => e.message)
    });
  }
  
  // Erreur de clé étrangère
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      message: 'Référence invalide - vérifiez les données liées'
    });
  }
  
  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token invalide'
    });
  }
  
  // Erreur générique
  res.status(err.statusCode || 500).json({
    message: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
