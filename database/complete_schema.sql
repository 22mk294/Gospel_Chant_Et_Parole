-- 🎵 Gospel Chant et Parole - Base de données complète
-- Version: 2.0 - Production Ready
-- Date: 2025-07-12

-- 🔄 Créer la base de données
CREATE DATABASE IF NOT EXISTS gospelchantetparole DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE gospelchantetparole;

-- 👤 Table des admins
CREATE TABLE IF NOT EXISTS Admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 📁 Table des catégories
CREATE TABLE IF NOT EXISTS Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT DEFAULT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 🎵 Table des chants
CREATE TABLE IF NOT EXISTS Chants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  lyrics TEXT NOT NULL,
  author VARCHAR(255) DEFAULT NULL,
  audio_url VARCHAR(500) DEFAULT NULL,
  video_url VARCHAR(500) DEFAULT NULL,
  category_id INT,
  view_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ❤️ Table des favoris
CREATE TABLE IF NOT EXISTS Favoris (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL, -- UUID ou identifiant utilisateur
  chant_id INT NOT NULL,
  device_id VARCHAR(255) DEFAULT NULL, -- Pour l'identification d'appareil
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY unique_user_chant (user_id, chant_id)
);

-- 🚨 Table des signalements
CREATE TABLE IF NOT EXISTS Signalements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chant_id INT NOT NULL,
  user_id VARCHAR(255) DEFAULT NULL,
  type ENUM('inappropriate_content', 'copyright', 'spam', 'technical_issue', 'other') NOT NULL,
  description TEXT,
  status ENUM('pending', 'reviewed', 'resolved', 'rejected') DEFAULT 'pending',
  admin_notes TEXT DEFAULT NULL,
  resolved_by INT DEFAULT NULL, -- ID de l'admin qui a résolu
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (resolved_by) REFERENCES Admins(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 📊 Table des statistiques
CREATE TABLE IF NOT EXISTS Statistiques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) DEFAULT NULL,
  chant_id INT DEFAULT NULL,
  action ENUM('view', 'search', 'download', 'share', 'favorite', 'unfavorite') NOT NULL,
  metadata JSON DEFAULT NULL, -- Informations supplémentaires (IP, user-agent, etc.)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX idx_action (action),
  INDEX idx_created_at (created_at),
  INDEX idx_chant_id (chant_id),
  INDEX idx_user_id (user_id)
);

-- 🔄 Table de synchronisation (pour le mode hors ligne)
CREATE TABLE IF NOT EXISTS Synchronizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) DEFAULT NULL,
  last_sync DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_hash VARCHAR(255) DEFAULT NULL, -- Hash pour vérifier l'intégrité
  sync_type ENUM('full', 'incremental') DEFAULT 'incremental',
  status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_device (device_id)
);

-- 🔍 Index pour optimiser les performances
CREATE INDEX idx_chants_category ON Chants(category_id);
CREATE INDEX idx_chants_title ON Chants(title);
CREATE INDEX idx_chants_active ON Chants(is_active);
CREATE INDEX idx_favoris_user ON Favoris(user_id);
CREATE INDEX idx_favoris_chant ON Favoris(chant_id);
CREATE INDEX idx_signalements_status ON Signalements(status);
CREATE INDEX idx_signalements_type ON Signalements(type);

-- 📝 Insérer des données de base
-- Catégories par défaut
INSERT IGNORE INTO Categories (name, description) VALUES 
('Louange', 'Chants de louange et d\'adoration'),
('Adoration', 'Chants d\'adoration profonde'),
('Gospel', 'Chants gospel traditionnels'),
('Contemporain', 'Chants contemporains'),
('Traditionnel', 'Chants traditionnels'),
('Jeunesse', 'Chants pour les jeunes'),
('Enfants', 'Chants pour enfants'),
('Noël', 'Chants de Noël'),
('Pâques', 'Chants de Pâques'),
('Mariage', 'Chants de mariage'),
('Funérailles', 'Chants funéraires'),
('Évangélisation', 'Chants d\'évangélisation');

-- Administrateur par défaut (mot de passe: admin123)
-- Hash bcrypt pour 'admin123' avec 12 rounds
INSERT IGNORE INTO Admins (username, password) VALUES 
('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/6aOuU1TLe');

-- 🎵 Chants de démonstration
INSERT IGNORE INTO Chants (title, lyrics, author, category_id) VALUES 
('Amazing Grace', 'Amazing grace how sweet the sound\nThat saved a wretch like me\nI once was lost but now I''m found\nWas blind but now I see', 'John Newton', 1),
('How Great Thou Art', 'O Lord my God when I in awesome wonder\nConsider all the worlds thy hands have made\nI see the stars I hear the rolling thunder\nThy power throughout the universe displayed', 'Carl Boberg', 1),
('Blessed Assurance', 'Blessed assurance Jesus is mine\nO what a foretaste of glory divine\nHeir of salvation purchase of God\nBorn of his spirit washed in his blood', 'Fanny Crosby', 2),
('Great Is Thy Faithfulness', 'Great is thy faithfulness O God my Father\nThere is no shadow of turning with thee\nThou changest not thy compassions they fail not\nAs thou hast been thou forever will be', 'Thomas Chisholm', 2);

-- ✅ Verification des tables créées
SELECT 
    TABLE_NAME as 'Table',
    TABLE_ROWS as 'Lignes',
    CREATE_TIME as 'Créée le'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'gospelchantetparole'
ORDER BY TABLE_NAME;
