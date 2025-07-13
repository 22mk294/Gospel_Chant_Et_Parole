import api from './api';

export const statsService = {
  // Récupérer le dashboard des statistiques
  async getDashboard() {
    try {
      console.log('🔄 Récupération des statistiques dashboard...');
      const response = await api.get('/stats/dashboard');
      console.log('✅ Réponse stats:', response.data);
      
      // Vérifier la structure de la réponse
      if (response.data && response.data.data) {
        return { success: true, data: response.data.data };
      } else if (response.data && response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('❌ Erreur stats dashboard:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Erreur lors de la récupération du dashboard'
      };
    }
  },

  // Récupérer les statistiques des chants
  async getChantStats() {
    try {
      const response = await api.get('/stats/chants');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des stats des chants'
      };
    }
  },

  // Récupérer les statistiques des catégories
  async getCategoryStats() {
    try {
      const response = await api.get('/stats/categories');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des stats des catégories'
      };
    }
  },

  // Récupérer toutes les statistiques pour le dashboard
  async getAllStats() {
    try {
      console.log('🔄 Récupération de toutes les statistiques...');
      const response = await api.get('/stats/dashboard');
      console.log('✅ Réponse getAllStats:', response.data);
      
      // Vérifier la structure de la réponse
      if (response.data && response.data.data) {
        return response.data.data;
      } else if (response.data && response.data.success) {
        return response.data.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error('❌ Erreur getAllStats:', error);
      throw error;
    }
  },

  // Enregistrer un événement de tracking
  async trackEvent(eventData) {
    try {
      const response = await api.post('/stats/track', eventData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'enregistrement de l\'événement'
      };
    }
  }
};

export default statsService;
