import api from './api.js';

// Service de vérification de la connexion
class ConnectionService {
  
  // Vérifier la connexion au backend
  async checkBackendConnection() {
    try {
      console.log('🔍 Vérification de la connexion au backend...');
      const response = await api.get('/health');
      
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: 'Backend connecté avec succès'
      };
    } catch (error) {
      console.error('❌ Erreur de connexion au backend:', error);
      return {
        success: false,
        status: error.response?.status || 0,
        error: error.response?.data?.message || error.message || 'Erreur de connexion',
        message: 'Impossible de se connecter au backend'
      };
    }
  }

  // Vérifier la connexion à la base de données
  async checkDatabaseConnection() {
    try {
      console.log('🔍 Vérification de la connexion à la base de données...');
      const response = await api.get('/health/database');
      
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: 'Base de données connectée avec succès'
      };
    } catch (error) {
      console.error('❌ Erreur de connexion à la base de données:', error);
      return {
        success: false,
        status: error.response?.status || 0,
        error: error.response?.data?.message || error.message || 'Erreur de connexion',
        message: 'Impossible de se connecter à la base de données'
      };
    }
  }

  // Vérifier l'authentification
  async checkAuthentication() {
    try {
      console.log('🔍 Vérification de l\'authentification...');
      const response = await api.get('/auth/me');
      
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: 'Authentification valide'
      };
    } catch (error) {
      console.error('❌ Erreur d\'authentification:', error);
      return {
        success: false,
        status: error.response?.status || 0,
        error: error.response?.data?.message || error.message || 'Erreur d\'authentification',
        message: 'Authentification invalide'
      };
    }
  }

  // Vérification complète du système
  async checkSystemStatus() {
    console.log('🔍 Vérification complète du système...');
    
    const results = {
      backend: await this.checkBackendConnection(),
      database: await this.checkDatabaseConnection(),
      auth: await this.checkAuthentication()
    };

    const allConnected = results.backend.success && results.database.success;
    const authValid = results.auth.success;

    return {
      overall: {
        connected: allConnected,
        authenticated: authValid,
        message: allConnected ? 'Système opérationnel' : 'Problème de connexion détecté'
      },
      details: results,
      timestamp: new Date().toISOString()
    };
  }

  // Obtenir des statistiques de connexion
  async getConnectionStats() {
    try {
      const response = await api.get('/stats/connection');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Tester la vitesse de connexion
  async testConnectionSpeed() {
    const startTime = performance.now();
    
    try {
      await api.get('/health');
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      return {
        success: true,
        responseTime,
        quality: this.getConnectionQuality(responseTime)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        responseTime: null
      };
    }
  }

  // Évaluer la qualité de la connexion
  getConnectionQuality(responseTime) {
    if (responseTime < 500) return 'Excellente';
    if (responseTime < 1000) return 'Bonne';
    if (responseTime < 2000) return 'Moyenne';
    return 'Lente';
  }

  // Obtenir des informations détaillées sur le système
  async getSystemInfo() {
    try {
      const response = await api.get('/system/info');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new ConnectionService();
