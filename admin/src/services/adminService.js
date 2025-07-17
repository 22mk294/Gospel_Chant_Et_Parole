import apiService from '../services/apiService';

class AdminService {
  async getDashboard() {
    try {
      const response = await apiService.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du dashboard:', error);
      throw error;
    }
  }

  async getDatabaseInfo() {
    try {
      const response = await apiService.get('/admin/database');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des infos de la base de données:', error);
      throw error;
    }
  }

  async getRealtimeData(type = 'all', limit = 10, page = 1) {
    try {
      const response = await apiService.get(`/admin/realtime-data?type=${type}&limit=${limit}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données en temps réel:', error);
      throw error;
    }
  }

  async getApiRoutes() {
    try {
      const response = await apiService.get('/admin/api-routes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des routes API:', error);
      throw error;
    }
  }

  async getSystemInfo() {
    try {
      const response = await apiService.get('/admin/system-info');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des infos système:', error);
      throw error;
    }
  }
}

export default new AdminService();
