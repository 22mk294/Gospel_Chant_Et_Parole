const { Admin } = require('./serveur/models');
const bcrypt = require('bcrypt');

async function testAdminLogin() {
  try {
    console.log('🔍 Test de connexion administrateur...');
    
    // Récupérer l'admin
    const admin = await Admin.findOne({ where: { username: 'admin' } });
    
    if (!admin) {
      console.log('❌ Aucun admin trouvé avec username: admin');
      return;
    }
    
    console.log('✅ Admin trouvé:', admin.username);
    console.log('📧 Email:', admin.email);
    console.log('🔑 Hash du mot de passe:', admin.password);
    
    // Test du mot de passe
    const isValidPassword = await bcrypt.compare('admin123', admin.password);
    console.log('🔐 Mot de passe valide:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ Le mot de passe ne correspond pas');
      // Créer un nouveau hash pour tester
      const newHash = await bcrypt.hash('admin123', 12);
      console.log('🔄 Nouveau hash généré:', newHash);
      
      // Mettre à jour l'admin
      await admin.update({ password: newHash });
      console.log('✅ Mot de passe mis à jour');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

testAdminLogin();
