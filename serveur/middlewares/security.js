// Middleware de sécurité avancé
const helmet = require('helmet');
const slowDown = require('express-slow-down');

// Configuration Helmet
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
};

// Protection contre brute force sur auth
const authLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // ralentir après 5 tentatives
  delayMs: 500, // délai de 500ms
  maxDelayMs: 20000, // délai max 20s
  skipSuccessfulRequests: true
});

// Validation des IDs numériques
const validateNumericId = (req, res, next) => {
  const id = req.params.id;
  if (id && !Number.isInteger(parseInt(id))) {
    return res.status(400).json({
      message: 'ID doit être un nombre entier'
    });
  }
  next();
};

module.exports = {
  helmet: helmet(helmetConfig),
  authLimiter,
  validateNumericId
};
