// Middleware pour le tracking des statistiques
const { Statistique } = require('../models');

// Middleware pour tracker automatiquement les vues de chants
const trackChantView = async (req, res, next) => {
  try {
    // Désactiver le tracking pendant les tests
    if (process.env.NODE_ENV === 'test') {
      return next();
    }
    
    // Récupérer l'user_id depuis les headers ou générer un UUID temporaire
    const user_id = req.headers['x-user-id'] || req.headers['x-device-id'] || 'anonymous';
    const chant_id = req.params.id;
    
    if (chant_id && user_id) {
      // Enregistrer la vue en arrière-plan (ne pas bloquer la réponse)
      setImmediate(async () => {
        try {
          await Statistique.create({
            user_id,
            chant_id: parseInt(chant_id),
            action: 'view',
            metadata: {
              user_agent: req.headers['user-agent'],
              ip: req.ip,
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Erreur lors du tracking de la vue:', error);
        }
      });
    }
    
    next();
  } catch (error) {
    // En cas d'erreur, ne pas bloquer la requête principale
    console.error('Erreur dans le middleware de tracking:', error);
    next();
  }
};

// Middleware pour tracker les recherches
const trackSearch = async (req, res, next) => {
  try {
    const user_id = req.headers['x-user-id'] || req.headers['x-device-id'] || 'anonymous';
    const searchTerm = req.query.search;
    
    if (searchTerm && user_id) {
      // Enregistrer la recherche en arrière-plan
      setImmediate(async () => {
        try {
          await Statistique.create({
            user_id,
            chant_id: null,
            action: 'search',
            metadata: {
              search_term: searchTerm,
              user_agent: req.headers['user-agent'],
              ip: req.ip,
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Erreur lors du tracking de la recherche:', error);
        }
      });
    }
    
    next();
  } catch (error) {
    console.error('Erreur dans le middleware de tracking de recherche:', error);
    next();
  }
};

// Fonction utilitaire pour tracker une action personnalisée
const trackAction = async (user_id, action, chant_id = null, metadata = {}) => {
  try {
    await Statistique.create({
      user_id,
      chant_id,
      action,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erreur lors du tracking de l\'action:', error);
  }
};

module.exports = {
  trackChantView,
  trackSearch,
  trackAction
};
