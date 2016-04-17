module.exports = function(database, Sequelize) {

	var jobAcceptancesContext = database.define('jobAcceptances', {
		acceptanceId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		amount: Sequelize.DOUBLE,
		timestamp: {
			type: Sequelize.DATE,
			Timestamp: true
		},
		finalized: Sequelize.BOOLEAN

	});

	return jobAcceptancesContext;
}