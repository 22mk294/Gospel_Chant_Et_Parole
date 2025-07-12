// Point d'entrée du serveur
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur Node.js prêt sur http://localhost:${PORT}`);
});
