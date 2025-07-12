// Health check endpoint
const { sequelize } = require('../models');

exports.health = async (req, res) => {
  let dbStatus = 'disconnected';
  
  try {
    // Vérifier la connexion DB
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch (error) {
    console.log('DB health check failed:', error.message);
  }
  
  const health = {
    status: dbStatus === 'connected' ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    uptime: process.uptime()
  };
  
  // Retourner 200 même si la DB n'est pas connectée
  res.json(health);
};
