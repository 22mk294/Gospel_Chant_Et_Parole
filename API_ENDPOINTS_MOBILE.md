# 📱 API ENDPOINTS - Application Mobile
## Gospel Chant et Parole

### 🌐 Base URL
```
https://your-api-domain.com
```

---

## 🔐 **AUTHENTIFICATION**

### POST /api/auth/login
**Description**: Connexion administrateur
```json
{
  "method": "POST",
  "url": "/api/auth/login",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "username": "admin",
    "password": "password123"
  },
  "response": {
    "message": "Connexion réussie",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
}
```

### GET /api/auth/profile
**Description**: Profil utilisateur connecté
```json
{
  "method": "GET",
  "url": "/api/auth/profile",
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "response": {
    "data": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
}
```

---

## 📁 **CATÉGORIES**

### GET /api/categories
**Description**: Liste toutes les catégories
```json
{
  "method": "GET",
  "url": "/api/categories",
  "response": {
    "data": [
      {
        "id": 1,
        "name": "Louange",
        "description": "Chants de louange et d'adoration",
        "createdAt": "2025-07-12T10:00:00.000Z",
        "updatedAt": "2025-07-12T10:00:00.000Z"
      },
      {
        "id": 2,
        "name": "Adoration",
        "description": "Chants d'adoration profonde",
        "createdAt": "2025-07-12T10:00:00.000Z",
        "updatedAt": "2025-07-12T10:00:00.000Z"
      }
    ]
  }
}
```

### GET /api/categories/:id
**Description**: Détail d'une catégorie spécifique
```json
{
  "method": "GET",
  "url": "/api/categories/1",
  "response": {
    "data": {
      "id": 1,
      "name": "Louange",
      "description": "Chants de louange et d'adoration",
      "createdAt": "2025-07-12T10:00:00.000Z",
      "updatedAt": "2025-07-12T10:00:00.000Z"
    }
  }
}
```

---

## 🎵 **CHANTS**

### GET /api/chants
**Description**: Liste des chants avec pagination et filtres
```json
{
  "method": "GET",
  "url": "/api/chants?page=1&limit=10&search=amazing&category_id=1",
  "response": {
    "data": [
      {
        "id": 1,
        "title": "Amazing Grace",
        "lyrics": "Amazing grace how sweet the sound\nThat saved a wretch like me...",
        "author": "John Newton",
        "audio_url": "https://example.com/audio/amazing-grace.mp3",
        "video_url": "https://example.com/video/amazing-grace.mp4",
        "view_count": 150,
        "is_active": true,
        "category_id": 1,
        "createdAt": "2025-07-12T10:00:00.000Z",
        "updatedAt": "2025-07-12T10:00:00.000Z",
        "Category": {
          "id": 1,
          "name": "Louange",
          "description": "Chants de louange et d'adoration"
        }
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /api/chants/:id
**Description**: Détail d'un chant spécifique
```json
{
  "method": "GET",
  "url": "/api/chants/1",
  "response": {
    "data": {
      "id": 1,
      "title": "Amazing Grace",
      "lyrics": "Amazing grace how sweet the sound\nThat saved a wretch like me\nI once was lost but now I'm found\nWas blind but now I see",
      "author": "John Newton",
      "audio_url": "https://example.com/audio/amazing-grace.mp3",
      "video_url": "https://example.com/video/amazing-grace.mp4",
      "view_count": 150,
      "is_active": true,
      "category_id": 1,
      "createdAt": "2025-07-12T10:00:00.000Z",
      "updatedAt": "2025-07-12T10:00:00.000Z",
      "Category": {
        "id": 1,
        "name": "Louange",
        "description": "Chants de louange et d'adoration"
      }
    }
  }
}
```

---

## ❤️ **FAVORIS**

### GET /api/favoris
**Description**: Liste des favoris d'un utilisateur
```json
{
  "method": "GET",
  "url": "/api/favoris?user_id=user123",
  "response": {
    "data": [
      {
        "id": 1,
        "user_id": "user123",
        "chant_id": 1,
        "device_id": "device456",
        "created_at": "2025-07-12T10:00:00.000Z",
        "Chant": {
          "id": 1,
          "title": "Amazing Grace",
          "lyrics": "Amazing grace how sweet the sound...",
          "author": "John Newton",
          "audio_url": "https://example.com/audio/amazing-grace.mp3",
          "video_url": "https://example.com/video/amazing-grace.mp4",
          "Category": {
            "id": 1,
            "name": "Louange"
          }
        }
      }
    ]
  }
}
```

### POST /api/favoris
**Description**: Ajouter un chant aux favoris
```json
{
  "method": "POST",
  "url": "/api/favoris",
  "headers": {
    "Content-Type": "application/json",
    "X-User-Id": "user123",
    "X-Device-Id": "device456"
  },
  "body": {
    "user_id": "user123",
    "chant_id": 1,
    "device_id": "device456"
  },
  "response": {
    "message": "Chant ajouté aux favoris",
    "data": {
      "id": 1,
      "user_id": "user123",
      "chant_id": 1,
      "device_id": "device456",
      "created_at": "2025-07-12T10:00:00.000Z"
    }
  }
}
```

### DELETE /api/favoris
**Description**: Retirer un chant des favoris
```json
{
  "method": "DELETE",
  "url": "/api/favoris",
  "headers": {
    "Content-Type": "application/json",
    "X-User-Id": "user123"
  },
  "body": {
    "user_id": "user123",
    "chant_id": 1
  },
  "response": {
    "message": "Chant retiré des favoris"
  }
}
```

---

## 🚨 **SIGNALEMENTS**

### POST /api/signalements
**Description**: Signaler un contenu problématique
```json
{
  "method": "POST",
  "url": "/api/signalements",
  "headers": {
    "Content-Type": "application/json",
    "X-User-Id": "user123"
  },
  "body": {
    "chant_id": 1,
    "user_id": "user123",
    "type": "inappropriate_content",
    "description": "Ce contenu contient des éléments inappropriés"
  },
  "response": {
    "message": "Signalement créé avec succès",
    "data": {
      "id": 1,
      "chant_id": 1,
      "user_id": "user123",
      "type": "inappropriate_content",
      "description": "Ce contenu contient des éléments inappropriés",
      "status": "pending",
      "created_at": "2025-07-12T10:00:00.000Z"
    }
  }
}
```

**Types de signalement disponibles:**
- `inappropriate_content`: Contenu inapproprié
- `copyright`: Violation de droits d'auteur
- `spam`: Contenu indésirable
- `technical_issue`: Problème technique
- `other`: Autre problème

---

## 🔄 **SYNCHRONISATION**

### GET /api/sync
**Description**: Récupérer les données pour synchronisation
```json
{
  "method": "GET",
  "url": "/api/sync?device_id=device456&last_sync=2025-07-12T09:00:00.000Z",
  "response": {
    "data": {
      "categories": [
        {
          "id": 1,
          "name": "Louange",
          "description": "Chants de louange et d'adoration"
        }
      ],
      "chants": [
        {
          "id": 1,
          "title": "Amazing Grace",
          "lyrics": "Amazing grace how sweet the sound...",
          "author": "John Newton",
          "audio_url": "https://example.com/audio/amazing-grace.mp3",
          "video_url": "https://example.com/video/amazing-grace.mp4",
          "category_id": 1,
          "is_active": true
        }
      ],
      "sync_info": {
        "last_sync": "2025-07-12T10:00:00.000Z",
        "total_items": 100,
        "hash": "abc123def456789"
      }
    }
  }
}
```

### POST /api/sync
**Description**: Enregistrer une synchronisation
```json
{
  "method": "POST",
  "url": "/api/sync",
  "headers": {
    "Content-Type": "application/json",
    "X-Device-Id": "device456"
  },
  "body": {
    "device_id": "device456",
    "user_id": "user123",
    "sync_type": "full",
    "data_hash": "abc123def456789"
  },
  "response": {
    "message": "Synchronisation enregistrée",
    "data": {
      "id": 1,
      "device_id": "device456",
      "user_id": "user123",
      "last_sync": "2025-07-12T10:00:00.000Z",
      "sync_type": "full",
      "status": "completed"
    }
  }
}
```

---

## 📊 **STATISTIQUES** (Admin uniquement)

### GET /api/stats
**Description**: Statistiques générales d'utilisation
```json
{
  "method": "GET",
  "url": "/api/stats?period=month",
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "response": {
    "data": {
      "total_views": 1500,
      "total_searches": 300,
      "total_favorites": 250,
      "total_reports": 5,
      "popular_chants": [
        {
          "chant_id": 1,
          "title": "Amazing Grace",
          "view_count": 150
        },
        {
          "chant_id": 2,
          "title": "How Great Thou Art",
          "view_count": 120
        }
      ],
      "daily_stats": [
        {
          "date": "2025-07-12",
          "views": 50,
          "searches": 10,
          "favorites": 5
        }
      ]
    }
  }
}
```

---

## ❤️ **SANTÉ SYSTÈME**

### GET /health
**Description**: Vérification de l'état du système
```json
{
  "method": "GET",
  "url": "/health",
  "response": {
    "status": "healthy",
    "timestamp": "2025-07-12T10:00:00.000Z",
    "version": "2.0.0",
    "services": {
      "database": "connected",
      "api": "operational",
      "cache": "active"
    },
    "uptime": "2 days, 5 hours, 30 minutes"
  }
}
```

---

## 🔧 **CODES D'ERREUR**

### Erreurs Communes
```json
{
  "400": {
    "message": "Requête invalide",
    "code": "BAD_REQUEST"
  },
  "401": {
    "message": "Non autorisé",
    "code": "UNAUTHORIZED"
  },
  "403": {
    "message": "Accès refusé",
    "code": "FORBIDDEN"
  },
  "404": {
    "message": "Ressource non trouvée",
    "code": "NOT_FOUND"
  },
  "429": {
    "message": "Trop de requêtes",
    "code": "RATE_LIMIT_EXCEEDED"
  },
  "500": {
    "message": "Erreur interne du serveur",
    "code": "INTERNAL_SERVER_ERROR"
  }
}
```

---

## 📱 **HEADERS RECOMMANDÉS**

### Pour toutes les requêtes
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-User-Id": "user123",
  "X-Device-Id": "device456",
  "User-Agent": "GospelApp/1.0 (iOS/Android)"
}
```

### Pour les requêtes authentifiées
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎯 **UTILISATION TYPIQUE**

### Flux d'initialisation de l'app
1. `GET /health` - Vérifier l'état du serveur
2. `GET /api/sync` - Synchroniser les données
3. `GET /api/categories` - Charger les catégories
4. `GET /api/chants?limit=20` - Charger les premiers chants

### Flux de navigation
1. `GET /api/chants?category_id=1` - Chants par catégorie
2. `GET /api/chants/1` - Détail d'un chant
3. `POST /api/favoris` - Ajouter aux favoris
4. `GET /api/favoris` - Voir les favoris

### Flux de recherche
1. `GET /api/chants?search=amazing` - Rechercher
2. `GET /api/chants/1` - Voir le résultat
3. Tracking automatique des statistiques

---

**🎉 Cette API est prête pour votre application mobile Gospel Chant et Parole !**
