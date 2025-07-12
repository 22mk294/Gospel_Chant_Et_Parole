// Script pour créer l'administrateur principal
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const sequelize = require('./serveur/config/database');
const { Admin } = require('./serveur/models');

async function createMainAdmin() {
  try {
    // Synchroniser la base de données
    await sequelize.sync({ alter: true });
    console.log('✅ Base de données synchronisée');
    
    // Données de l'admin
    const adminData = {
      username: 'joelmike',
      email: 'joelmikemukendi22mk294@gospelchantetparole.com',
      password: 'Beckyshawetu268563'
    };
    
    // Vérifier si l'admin existe déjà
    const existingAdmin = await Admin.findOne({
      where: {
        [Op.or]: [
          { username: adminData.username },
          { email: adminData.email }
        ]
      }
    });
    
    if (existingAdmin) {
      console.log('⚠️ Cet administrateur existe déjà');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      return;
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(adminData.password, 12);
    
    // Créer l'admin
    const admin = await Admin.create({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword
    });
    
    console.log('🎉 Administrateur créé avec succès !');
    console.log('ID:', admin.id);
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Créé le:', new Date().toLocaleString('fr-FR'));
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'administrateur:', error);
  } finally {
    await sequelize.close();
    console.log('✅ Connexion fermée');
  }
}

// Exécuter le script
createMainAdmin();
