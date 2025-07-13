// Script pour créer un admin par défaut
const { Admin } = require('./serveur/models');
const bcrypt = require('bcrypt');

async function createDefaultAdmin() {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await Admin.findOne({ where: { username: 'admin' } });
    
    if (existingAdmin) {
      console.log('✅ Admin par défaut existe déjà');
      console.log('Username: admin');
      console.log('Password: admin123');
      return;
    }

    // Créer un nouvel admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@gospelchantetparole.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin par défaut créé avec succès!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@gospelchantetparole.com');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin:', error);
  }
}

createDefaultAdmin();
