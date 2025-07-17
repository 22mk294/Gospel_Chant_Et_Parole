import api from './api';

export const authService = {
  // Connexion admin
  async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', credentials);
      const { token, admin } = response.data;
      
      // Stocker le token et les données admin
      localStorage.setItem('authToken', token);
      localStorage.setItem('adminData', JSON.stringify(admin));
      
      return { success: true, data: { token, admin } };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion'
      };
    }
  },

  // Inscription admin
  async register(adminData) {
    try {
      const response = await api.post('/api/auth/register', adminData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'inscription'
      };
    }
  },

  // Récupérer le profil admin
  async getProfile() {
    try {
      const response = await api.get('/api/auth/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération du profil'
      };
    }
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminData');
    window.location.href = '/login';
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  // Récupérer les données admin depuis le localStorage
  getAdminData() {
    const adminData = localStorage.getItem('adminData');
    return adminData ? JSON.parse(adminData) : null;
  }
};

export default authService;
