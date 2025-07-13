const sequelize = require('./serveur/config/database');

async function addNewColumnsToChants() {
    console.log('🚀 Ajout des nouvelles colonnes aux chants...\n');
    
    try {
        const queryInterface = sequelize.getQueryInterface();
        
        // Vérifier si les colonnes existent déjà
        const tableDescription = await queryInterface.describeTable('chants');
        
        const columnsToAdd = [
            {
                name: 'artist',
                definition: {
                    type: sequelize.Sequelize.STRING,
                    allowNull: true
                }
            },
            {
                name: 'audio_url',
                definition: {
                    type: sequelize.Sequelize.STRING,
                    allowNull: true
                }
            },
            {
                name: 'video_url',
                definition: {
                    type: sequelize.Sequelize.STRING,
                    allowNull: true
                }
            },
            {
                name: 'duration',
                definition: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true
                }
            },
            {
                name: 'language',
                definition: {
                    type: sequelize.Sequelize.STRING(10),
                    allowNull: true,
                    defaultValue: 'fr'
                }
            },
            {
                name: 'tags',
                definition: {
                    type: sequelize.Sequelize.STRING,
                    allowNull: true
                }
            },
            {
                name: 'is_active',
                definition: {
                    type: sequelize.Sequelize.BOOLEAN,
                    defaultValue: true
                }
            }
        ];
        
        for (const column of columnsToAdd) {
            if (!tableDescription[column.name]) {
                console.log(`➕ Ajout de la colonne '${column.name}'...`);
                await queryInterface.addColumn('chants', column.name, column.definition);
                console.log(`✅ Colonne '${column.name}' ajoutée`);
            } else {
                console.log(`📋 Colonne '${column.name}' existe déjà`);
            }
        }
        
        console.log('\n🎉 Migration terminée avec succès !');
        
    } catch (error) {
        console.error('❌ Erreur lors de la migration:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

// Exécuter la migration
if (require.main === module) {
    addNewColumnsToChants();
}

module.exports = { addNewColumnsToChants };
