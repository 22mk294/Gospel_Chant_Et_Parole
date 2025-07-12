const axios = require('axios');

const baseURL = 'http://localhost:5000/api';

async function testChantModificationAndDeletion() {
  try {
    console.log('🔐 Connexion admin...');
    const loginResponse = await axios.post(baseURL + '/auth/login', {
      username: 'joelmike',
      password: 'Beckyshawetu268563'
    });
    
    const token = loginResponse.data.token;
    const authHeaders = { Authorization: `Bearer ${token}` };
    
    console.log('✅ Admin connecté');
    
    // 1. Récupérer la liste des chants
    console.log('\n📋 Liste des chants existants...');
    const chantsResponse = await axios.get(baseURL + '/chants', { headers: authHeaders });
    const chants = chantsResponse.data.data || chantsResponse.data.chants || [];
    
    console.log(`Total chants: ${chants.length}`);
    chants.forEach((chant, index) => {
      console.log(`${index + 1}. ID: ${chant.id} - ${chant.title} (Catégorie: ${chant.Category?.name || 'N/A'})`);
    });
    
    if (chants.length === 0) {
      console.log('❌ Aucun chant trouvé pour les tests');
      return;
    }
    
    // 2. Modifier le premier chant
    const chantToModify = chants[0];
    console.log(`\n📝 Modification du chant ID: ${chantToModify.id} - ${chantToModify.title}`);
    
    const modifiedData = {
      title: chantToModify.title + ' (Modifié)',
      lyrics: chantToModify.lyrics + '\n\n[Couplet ajouté lors du test de modification]',
      category_id: chantToModify.category_id
    };
    
    const modifyResponse = await axios.put(`${baseURL}/chants/${chantToModify.id}`, modifiedData, { headers: authHeaders });
    console.log('✅ Chant modifié avec succès');
    console.log('Nouveau titre:', modifyResponse.data.title);
    
    // 3. Vérifier la modification
    console.log('\n🔍 Vérification de la modification...');
    const verifyResponse = await axios.get(`${baseURL}/chants/${chantToModify.id}`, { headers: authHeaders });
    console.log('Titre actuel:', verifyResponse.data.title);
    console.log('Paroles contiennent "[Couplet ajouté]":', verifyResponse.data.lyrics.includes('[Couplet ajouté lors du test de modification]'));
    
    // 4. Supprimer le dernier chant (pour éviter de supprimer celui qu'on vient de modifier)
    if (chants.length > 1) {
      const chantToDelete = chants[chants.length - 1];
      console.log(`\n🗑️ Suppression du chant ID: ${chantToDelete.id} - ${chantToDelete.title}`);
      
      const deleteResponse = await axios.delete(`${baseURL}/chants/${chantToDelete.id}`, { headers: authHeaders });
      console.log('✅ Chant supprimé avec succès');
      
      // 5. Vérifier la suppression
      console.log('\n🔍 Vérification de la suppression...');
      try {
        await axios.get(`${baseURL}/chants/${chantToDelete.id}`, { headers: authHeaders });
        console.log('❌ Erreur: Le chant devrait être supprimé mais il existe encore');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('✅ Confirmé: Le chant a été correctement supprimé (404 Not Found)');
        } else {
          console.log('❓ Erreur inattendue:', error.message);
        }
      }
      
      // 6. Vérifier le nombre total de chants après suppression
      console.log('\n📊 Vérification du nombre total après suppression...');
      const finalResponse = await axios.get(`${baseURL}/chants`, { headers: authHeaders });
      console.log('Nombre de chants avant suppression:', chants.length);
      console.log('Nombre de chants après suppression:', finalResponse.data.data.length);
      console.log('Différence:', chants.length - finalResponse.data.data.length);
    } else {
      console.log('\n⚠️ Un seul chant disponible, suppression non testée pour éviter de vider la base');
    }
    
    console.log('\n🎉 Test de modification et suppression terminé !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.response ? error.response.data : error.message);
  }
}

testChantModificationAndDeletion();
