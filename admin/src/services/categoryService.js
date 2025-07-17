import api from './api';

export const categoryService = {
  // Récupérer toutes les catégories
  async getCategories() {
    try {
      console.log('🔄 Récupération des catégories...');
      const response = await api.get('/api/categories');
      console.log('✅ Catégories récupérées:', response.data);
      
      // Vérifier la structure de la réponse
      if (response.data && response.data.data) {
        return { success: true, data: response.data.data, total: response.data.total };
      } else if (Array.isArray(response.data)) {
        return { success: true, data: response.data, total: response.data.length };
      } else {
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('❌ Erreur récupération catégories:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Erreur lors de la récupération des catégories'
      };
    }
  },

  // Récupérer une catégorie par ID
  async getCategory(id) {
    try {
      const response = await api.get(`/api/categories/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération de la catégorie'
      };
    }
  },

  // Créer une nouvelle catégorie
  async createCategory(categoryData) {
    try {
      const response = await api.post('/api/categories', categoryData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création de la catégorie'
      };
    }
  },

  // Mettre à jour une catégorie
  async updateCategory(id, categoryData) {
    try {
      const response = await api.put(`/api/categories/${id}`, categoryData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour de la catégorie'
      };
    }
  },

  // Supprimer une catégorie
  async deleteCategory(id) {
    try {
      const response = await api.delete(`/api/categories/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de la catégorie'
      };
    }
  }
};

export default categoryService;
