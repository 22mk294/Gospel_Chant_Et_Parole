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
  async logout() {
    try {
      // Appel au backend pour invalider le token (optionnel)
      try {
        await api.post('/api/auth/logout');
      } catch (error) {
        console.warn('Erreur lors de la déconnexion côté serveur:', error);
      }
      
      // Nettoyage du localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminData');
      
      // Redirection vers la page de connexion
      window.location.href = '/login';
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      
      // Forcer la déconnexion même en cas d'erreur
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminData');
      window.location.href = '/login';
      
      return { success: false, message: 'Erreur lors de la déconnexion' };
    }
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
