-- 🔄 Migration pour ajouter les nouvelles tables
-- À exécuter sur la base de données existante
-- Version: 1.0 -> 2.0

USE gospelchantetparole;

-- 🔄 Modifier la table Admins pour ajouter l'email
ALTER TABLE Admins 
ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE DEFAULT NULL AFTER username,
ADD COLUMN IF NOT EXISTS createdAt DATETIME DEFAULT CURRENT_TIMESTAMP AFTER password,
ADD COLUMN IF NOT EXISTS updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER createdAt;

-- 🔄 Modifier la table Categories
ALTER TABLE Categories 
ADD COLUMN IF NOT EXISTS description TEXT DEFAULT NULL AFTER name,
ADD UNIQUE KEY IF NOT EXISTS unique_category_name (name);

-- 🔄 Modifier la table Chants pour ajouter de nouveaux champs
ALTER TABLE Chants 
ADD COLUMN IF NOT EXISTS author VARCHAR(255) DEFAULT NULL AFTER lyrics,
ADD COLUMN IF NOT EXISTS audio_url VARCHAR(500) DEFAULT NULL AFTER author,
ADD COLUMN IF NOT EXISTS video_url VARCHAR(500) DEFAULT NULL AFTER audio_url,
ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0 AFTER video_url,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE AFTER view_count;

-- ❤️ Créer la table des favoris
CREATE TABLE IF NOT EXISTS Favoris (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  chant_id INT NOT NULL,
  device_id VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY unique_user_chant (user_id, chant_id)
);

-- 🚨 Créer la table des signalements
CREATE TABLE IF NOT EXISTS Signalements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chant_id INT NOT NULL,
  user_id VARCHAR(255) DEFAULT NULL,
  type ENUM('inappropriate_content', 'copyright', 'spam', 'technical_issue', 'other') NOT NULL,
  description TEXT,
  status ENUM('pending', 'reviewed', 'resolved', 'rejected') DEFAULT 'pending',
  admin_notes TEXT DEFAULT NULL,
  resolved_by INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (resolved_by) REFERENCES Admins(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 📊 Créer la table des statistiques
CREATE TABLE IF NOT EXISTS Statistiques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) DEFAULT NULL,
  chant_id INT DEFAULT NULL,
  action ENUM('view', 'search', 'download', 'share', 'favorite', 'unfavorite') NOT NULL,
  metadata JSON DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chant_id) REFERENCES Chants(id) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX idx_action (action),
  INDEX idx_created_at (created_at),
  INDEX idx_chant_id (chant_id),
  INDEX idx_user_id (user_id)
);

-- 🔄 Créer la table de synchronisation
CREATE TABLE IF NOT EXISTS Synchronizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) DEFAULT NULL,
  last_sync DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_hash VARCHAR(255) DEFAULT NULL,
  sync_type ENUM('full', 'incremental') DEFAULT 'incremental',
  status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_device (device_id)
);

-- 🔍 Ajouter les index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_chants_category ON Chants(category_id);
CREATE INDEX IF NOT EXISTS idx_chants_title ON Chants(title);
CREATE INDEX IF NOT EXISTS idx_chants_active ON Chants(is_active);
CREATE INDEX IF NOT EXISTS idx_favoris_user ON Favoris(user_id);
CREATE INDEX IF NOT EXISTS idx_favoris_chant ON Favoris(chant_id);
CREATE INDEX IF NOT EXISTS idx_signalements_status ON Signalements(status);
CREATE INDEX IF NOT EXISTS idx_signalements_type ON Signalements(type);

-- 📝 Insérer des catégories par défaut si elles n'existent pas
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

-- ✅ Vérifier que toutes les tables ont été créées
SELECT 
    TABLE_NAME as 'Table',
    TABLE_ROWS as 'Lignes',
    CREATE_TIME as 'Créée le'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'gospelchantetparole'
ORDER BY TABLE_NAME;

-- 📊 Statistiques des tables
SELECT 
    'Migration terminée avec succès!' as 'Status',
    COUNT(*) as 'Nombre_de_tables'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'gospelchantetparole';
