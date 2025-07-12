# 📱 GUIDE D'INTÉGRATION APPLICATION MOBILE
## API Gospel Chant et Parole - Version 2.0

### 🎯 **ENDPOINTS ESSENTIELS POUR L'APPLICATION MOBILE**

---

## 📋 **FLUX D'UTILISATION MOBILE**

### **1. Démarrage de l'Application**

#### **Synchronisation initiale**
```javascript
// GET /api/sync?device_id=DEVICE_ID
const syncData = await fetch(`${API_BASE}/api/sync?device_id=${deviceId}`);
const { categories, chants, sync_info } = await syncData.json();

// Stocker en local pour utilisation hors ligne
localStorage.setItem('categories', JSON.stringify(categories));
localStorage.setItem('chants', JSON.stringify(chants));
localStorage.setItem('last_sync', sync_info.last_sync);
```

#### **Chargement des catégories**
```javascript
// GET /api/categories
const categories = await fetch(`${API_BASE}/api/categories`);
const categoriesData = await categories.json();

// Afficher dans l'interface utilisateur
displayCategories(categoriesData.data);
```

---

### **2. Navigation dans les Chants**

#### **Liste des chants par catégorie**
```javascript
// GET /api/chants?category_id=1&page=1&limit=20
const chants = await fetch(`${API_BASE}/api/chants?category_id=1&page=1&limit=20`);
const chantsData = await chants.json();

// Afficher la liste avec pagination
displayChants(chantsData.data);
setupPagination(chantsData.pagination);
```

#### **Recherche de chants**
```javascript
// GET /api/chants?search=amazing&page=1&limit=10
const searchResults = await fetch(`${API_BASE}/api/chants?search=${searchTerm}&page=1&limit=10`);
const results = await searchResults.json();

// Afficher les résultats
displaySearchResults(results.data);
```

#### **Détail d'un chant**
```javascript
// GET /api/chants/1
const chant = await fetch(`${API_BASE}/api/chants/1`);
const chantData = await chant.json();

// Afficher le chant complet
displayChantDetails(chantData.data);

// Enregistrer la vue (optionnel)
trackView(chantData.data.id);
```

---

### **3. Gestion des Favoris**

#### **Ajouter aux favoris**
```javascript
// POST /api/favoris
const addToFavorites = async (chantId, userId) => {
  const response = await fetch(`${API_BASE}/api/favoris`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
      'X-Device-Id': deviceId
    },
    body: JSON.stringify({
      user_id: userId,
      chant_id: chantId,
      device_id: deviceId
    })
  });
  return response.json();
};
```

#### **Retirer des favoris**
```javascript
// DELETE /api/favoris
const removeFromFavorites = async (chantId, userId) => {
  const response = await fetch(`${API_BASE}/api/favoris`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId
    },
    body: JSON.stringify({
      user_id: userId,
      chant_id: chantId
    })
  });
  return response.json();
};
```

#### **Liste des favoris**
```javascript
// GET /api/favoris?user_id=USER_ID
const favorites = await fetch(`${API_BASE}/api/favoris?user_id=${userId}`);
const favoritesData = await favorites.json();

// Afficher les favoris
displayFavorites(favoritesData.data);
```

---

### **4. Signalement de Contenu**

#### **Signaler un chant**
```javascript
// POST /api/signalements
const reportChant = async (chantId, type, description, userId) => {
  const response = await fetch(`${API_BASE}/api/signalements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId
    },
    body: JSON.stringify({
      chant_id: chantId,
      user_id: userId,
      type: type, // 'inappropriate_content', 'copyright', 'spam', 'technical_issue', 'other'
      description: description
    })
  });
  return response.json();
};
```

---

### **5. Synchronisation Hors Ligne**

#### **Synchronisation complète**
```javascript
const fullSync = async (deviceId) => {
  // Récupérer toutes les données
  const response = await fetch(`${API_BASE}/api/sync?device_id=${deviceId}`);
  const data = await response.json();
  
  // Stocker localement
  localStorage.setItem('gospel_categories', JSON.stringify(data.data.categories));
  localStorage.setItem('gospel_chants', JSON.stringify(data.data.chants));
  localStorage.setItem('gospel_last_sync', data.data.sync_info.last_sync);
  
  // Enregistrer la synchronisation
  await fetch(`${API_BASE}/api/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': deviceId
    },
    body: JSON.stringify({
      device_id: deviceId,
      sync_type: 'full',
      data_hash: data.data.sync_info.hash
    })
  });
};
```

#### **Synchronisation incrémentale**
```javascript
const incrementalSync = async (deviceId, lastSync) => {
  const response = await fetch(`${API_BASE}/api/sync?device_id=${deviceId}&last_sync=${lastSync}`);
  const data = await response.json();
  
  // Mettre à jour les données locales
  updateLocalData(data.data);
  
  // Enregistrer la synchronisation
  await fetch(`${API_BASE}/api/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': deviceId
    },
    body: JSON.stringify({
      device_id: deviceId,
      sync_type: 'incremental',
      data_hash: data.data.sync_info.hash
    })
  });
};
```

---

## 🔧 **CONFIGURATION MOBILE**

### **Configuration API**
```javascript
// Configuration de base
const API_CONFIG = {
  baseURL: 'https://your-api-domain.com', // Remplacer par votre domaine
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Générateur d'ID unique pour l'appareil
const generateDeviceId = () => {
  return 'mobile_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

// ID utilisateur (peut être généré ou saisi)
const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};
```

### **Gestion des Erreurs**
```javascript
const handleApiError = (error) => {
  if (error.code === 'NETWORK_ERROR') {
    // Mode hors ligne
    return loadFromLocalStorage();
  }
  
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Attendre avant de réessayer
    setTimeout(() => retryRequest(), 60000);
  }
  
  // Afficher l'erreur à l'utilisateur
  showErrorMessage(error.message);
};
```

---

## 📊 **TRACKING ET ANALYTICS**

### **Tracker les vues**
```javascript
const trackView = async (chantId, userId) => {
  // Le tracking est automatique via middleware
  // Aucune action requise côté mobile
  
  // Optionnel: tracker localement
  const views = JSON.parse(localStorage.getItem('local_views') || '[]');
  views.push({
    chant_id: chantId,
    user_id: userId,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('local_views', JSON.stringify(views));
};
```

### **Tracker les recherches**
```javascript
const trackSearch = async (searchTerm, userId) => {
  // Le tracking est automatique via middleware
  // Aucune action requise côté mobile
  
  // Optionnel: tracker localement
  const searches = JSON.parse(localStorage.getItem('local_searches') || '[]');
  searches.push({
    query: searchTerm,
    user_id: userId,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('local_searches', JSON.stringify(searches));
};
```

---

## 🎵 **FONCTIONNALITÉS SPÉCIALES**

### **Lecture Audio/Vidéo**
```javascript
const playAudio = (chant) => {
  if (chant.audio_url) {
    const audio = new Audio(chant.audio_url);
    audio.play();
    
    // Tracker la lecture
    trackView(chant.id, userId);
  }
};

const playVideo = (chant) => {
  if (chant.video_url) {
    // Ouvrir le lecteur vidéo
    openVideoPlayer(chant.video_url);
    
    // Tracker la vue
    trackView(chant.id, userId);
  }
};
```

### **Partage de Chants**
```javascript
const shareChant = (chant) => {
  const shareData = {
    title: chant.title,
    text: `Découvrez ce chant: ${chant.title} par ${chant.author}`,
    url: `https://gospel-app.com/chant/${chant.id}`
  };
  
  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback pour les plateformes qui ne supportent pas Web Share API
    copyToClipboard(shareData.url);
  }
};
```

---

## 🔄 **STRATÉGIE HORS LIGNE**

### **Stockage Local**
```javascript
// Structure de données hors ligne
const offlineData = {
  categories: [],
  chants: [],
  favorites: [],
  lastSync: null,
  settings: {}
};

// Sauvegarder
localStorage.setItem('gospel_offline_data', JSON.stringify(offlineData));

// Charger
const loadOfflineData = () => {
  const data = localStorage.getItem('gospel_offline_data');
  return data ? JSON.parse(data) : null;
};
```

### **Détection de Connexion**
```javascript
const checkConnection = () => {
  return navigator.onLine;
};

// Écouter les changements de connexion
window.addEventListener('online', () => {
  console.log('Connexion rétablie');
  syncWhenOnline();
});

window.addEventListener('offline', () => {
  console.log('Mode hors ligne');
  showOfflineMode();
});
```

---

## 🎯 **EXEMPLE D'IMPLÉMENTATION COMPLETE**

### **Service API**
```javascript
class GospelApiService {
  constructor(baseURL, deviceId, userId) {
    this.baseURL = baseURL;
    this.deviceId = deviceId;
    this.userId = userId;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': this.deviceId,
        'X-User-Id': this.userId,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur API');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Méthodes principales
  async getCategories() {
    return this.request('/api/categories');
  }

  async getChants(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/chants?${query}`);
  }

  async getChant(id) {
    return this.request(`/api/chants/${id}`);
  }

  async getFavorites() {
    return this.request(`/api/favoris?user_id=${this.userId}`);
  }

  async addToFavorites(chantId) {
    return this.request('/api/favoris', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.userId,
        chant_id: chantId,
        device_id: this.deviceId
      })
    });
  }

  async removeFromFavorites(chantId) {
    return this.request('/api/favoris', {
      method: 'DELETE',
      body: JSON.stringify({
        user_id: this.userId,
        chant_id: chantId
      })
    });
  }

  async reportChant(chantId, type, description) {
    return this.request('/api/signalements', {
      method: 'POST',
      body: JSON.stringify({
        chant_id: chantId,
        user_id: this.userId,
        type: type,
        description: description
      })
    });
  }

  async sync(lastSync = null) {
    const params = { device_id: this.deviceId };
    if (lastSync) params.last_sync = lastSync;
    
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/sync?${query}`);
  }
}

// Utilisation
const apiService = new GospelApiService(
  'https://your-api-domain.com',
  generateDeviceId(),
  generateUserId()
);
```

---

## ✅ **CHECKLIST D'INTÉGRATION**

### **Configuration**
- [ ] URL de l'API configurée
- [ ] Device ID généré et stocké
- [ ] User ID généré et stocké
- [ ] Gestion des erreurs implémentée

### **Fonctionnalités Core**
- [ ] Affichage des catégories
- [ ] Liste des chants avec pagination
- [ ] Recherche de chants
- [ ] Détail des chants
- [ ] Lecture audio/vidéo

### **Fonctionnalités Avancées**
- [ ] Gestion des favoris
- [ ] Signalement de contenu
- [ ] Synchronisation hors ligne
- [ ] Partage de chants

### **Performance**
- [ ] Pagination implémentée
- [ ] Cache local pour mode hors ligne
- [ ] Lazy loading des images
- [ ] Optimisation des requêtes

### **Tests**
- [ ] Tests de connexion API
- [ ] Tests en mode hors ligne
- [ ] Tests de synchronisation
- [ ] Tests sur différents appareils

---

**🎉 Votre application mobile est maintenant prête à être intégrée avec le backend Gospel Chant et Parole !**

Le backend fournit toutes les fonctionnalités nécessaires pour une application mobile complète et performante.
