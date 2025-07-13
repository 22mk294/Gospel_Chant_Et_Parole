const sequelize = require('../config/database');

// Importer tous les modèles
const Admin = require('./Admin');
const Category = require('./Category');
const Chant = require('./Chant');
const Utilisateur = require('./Utilisateur');
const Favoris = require('./Favoris');
const Playlist = require('./Playlist');
const PlaylistChant = require('./PlaylistChant');
const Commentaire = require('./Commentaire');
const Note = require('./Note');
const Signalement = require('./Signalement');
const Historique = require('./Historique');
const Statistique = require('./Statistique');
const Notification = require('./Notification');
const Abonnement = require('./Abonnement');
const Tag = require('./Tag');
const ChantTag = require('./ChantTag');
const Evenement = require('./Evenement');
const EvenementParticipant = require('./EvenementParticipant');
const Message = require('./Message');
const Publicite = require('./Publicite');

// Définir les relations principales
// Category -> Chant
Category.hasMany(Chant, { foreignKey: 'category_id' });
Chant.belongsTo(Category, { foreignKey: 'category_id' });

// Utilisateur -> Relations
Utilisateur.hasMany(Favoris, { foreignKey: 'utilisateur_id' });
Favoris.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.hasMany(Playlist, { foreignKey: 'utilisateur_id' });
Playlist.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.hasMany(Commentaire, { foreignKey: 'utilisateur_id' });
Commentaire.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.hasMany(Note, { foreignKey: 'utilisateur_id' });
Note.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.hasMany(Historique, { foreignKey: 'utilisateur_id' });
Historique.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.hasMany(Notification, { foreignKey: 'utilisateur_id' });
Notification.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Utilisateur.hasOne(Abonnement, { foreignKey: 'utilisateur_id' });
Abonnement.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

// Chant -> Relations
Chant.hasMany(Favoris, { foreignKey: 'chant_id' });
Favoris.belongsTo(Chant, { foreignKey: 'chant_id' });

Chant.hasMany(Commentaire, { foreignKey: 'chant_id' });
Commentaire.belongsTo(Chant, { foreignKey: 'chant_id' });

Chant.hasMany(Note, { foreignKey: 'chant_id' });
Note.belongsTo(Chant, { foreignKey: 'chant_id' });

Chant.hasMany(Signalement, { foreignKey: 'chant_id' });
Signalement.belongsTo(Chant, { foreignKey: 'chant_id' });

Chant.hasMany(Historique, { foreignKey: 'chant_id' });
Historique.belongsTo(Chant, { foreignKey: 'chant_id' });

Chant.hasMany(Statistique, { foreignKey: 'chant_id' });
Statistique.belongsTo(Chant, { foreignKey: 'chant_id' });

// Playlist -> Relations Many-to-Many
Playlist.belongsToMany(Chant, { 
  through: PlaylistChant, 
  foreignKey: 'playlist_id',
  otherKey: 'chant_id',
  as: 'chants'
});
Chant.belongsToMany(Playlist, { 
  through: PlaylistChant, 
  foreignKey: 'chant_id',
  otherKey: 'playlist_id',
  as: 'playlists'
});

// Tags -> Relations Many-to-Many
Tag.belongsToMany(Chant, { 
  through: ChantTag, 
  foreignKey: 'tag_id',
  otherKey: 'chant_id',
  as: 'chants'
});
Chant.belongsToMany(Tag, { 
  through: ChantTag, 
  foreignKey: 'chant_id',
  otherKey: 'tag_id',
  as: 'tags'
});

// Evenements -> Relations
Evenement.belongsToMany(Utilisateur, { 
  through: EvenementParticipant, 
  foreignKey: 'evenement_id',
  otherKey: 'utilisateur_id',
  as: 'participants'
});
Utilisateur.belongsToMany(Evenement, { 
  through: EvenementParticipant, 
  foreignKey: 'utilisateur_id',
  otherKey: 'evenement_id',
  as: 'evenements'
});

// Messages -> Relations (auto-référence)
Message.belongsTo(Utilisateur, { foreignKey: 'expediteur_id', as: 'expediteur' });
Message.belongsTo(Utilisateur, { foreignKey: 'destinataire_id', as: 'destinataire' });
Message.belongsTo(Message, { foreignKey: 'parent_id', as: 'parent' });
Message.hasMany(Message, { foreignKey: 'parent_id', as: 'reponses' });

// Statistiques -> Relations
Statistique.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(Statistique, { foreignKey: 'utilisateur_id' });

module.exports = {
  sequelize,
  Admin,
  Category,
  Chant,
  Utilisateur,
  Favoris,
  Playlist,
  PlaylistChant,
  Commentaire,
  Note,
  Signalement,
  Historique,
  Statistique,
  Notification,
  Abonnement,
  Tag,
  ChantTag,
  Evenement,
  EvenementParticipant,
  Message,
  Publicite
};
