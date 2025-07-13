import api from './api';

export const chantService = {
  // Récupérer tous les chants avec pagination et recherche
  async getChants(params = {}) {
    try {
      console.log('🔄 Récupération des chants avec params:', params);
      const response = await api.get('/chants', { params });
      console.log('✅ Chants récupérés:', response.data);
      
      // Vérifier la structure de la réponse
      if (response.data && response.data.data) {
        return { success: true, data: response.data.data, total: response.data.total };
      } else if (Array.isArray(response.data)) {
        return { success: true, data: response.data, total: response.data.length };
      } else {
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('❌ Erreur récupération chants:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Erreur lors de la récupération des chants'
      };
    }
  },

  // Récupérer un chant par ID
  async getChant(id) {
    try {
      const response = await api.get(`/chants/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération du chant'
      };
    }
  },

  // Créer un nouveau chant
  async createChant(chantData) {
    try {
      console.log('🔄 Création d\'un nouveau chant:', chantData);
      const response = await api.post('/chants', chantData);
      console.log('✅ Chant créé:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Erreur création chant:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Erreur lors de la création du chant'
      };
    }
  },

  // Mettre à jour un chant
  async updateChant(id, chantData) {
    try {
      const response = await api.put(`/chants/${id}`, chantData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour du chant'
      };
    }
  },

  // Supprimer un chant
  async deleteChant(id) {
    try {
      const response = await api.delete(`/chants/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression du chant'
      };
    }
  }
};

export default chantService;
