// Point d'entrée des modèles
const Chant = require('./Chant');
const Category = require('./Category');
const Admin = require('./Admin');
const Favoris = require('./Favoris');
const Signalement = require('./Signalement');
const Statistique = require('./Statistique');

// Relations
Category.hasMany(Chant, { foreignKey: 'category_id' });
Chant.belongsTo(Category, { foreignKey: 'category_id' });

// Relations Favoris
Chant.hasMany(Favoris, { foreignKey: 'chant_id' });
Favoris.belongsTo(Chant, { foreignKey: 'chant_id' });

// Relations Signalements
Chant.hasMany(Signalement, { foreignKey: 'chant_id' });
Signalement.belongsTo(Chant, { foreignKey: 'chant_id' });

// Relations Statistiques
Chant.hasMany(Statistique, { foreignKey: 'chant_id' });
Statistique.belongsTo(Chant, { foreignKey: 'chant_id' });

module.exports = {
  Chant,
  Category,
  Admin,
  Favoris,
  Signalement,
  Statistique,
};
