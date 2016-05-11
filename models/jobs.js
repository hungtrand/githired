module.exports = function(database, Sequelize) {

	var jobsContext = database.define('jobs', {
		jobId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		jobTitle: Sequelize.STRING,
		jobDescription: Sequelize.STRING,
		minimumWage: Sequelize.DOUBLE,
		maximumWage: Sequelize.DOUBLE,
		setWage: Sequelize.DOUBLE,
		jobType: Sequelize.STRING,
		position: Sequelize.STRING,
		startingDate: Sequelize.DATE,
		endDate: Sequelize.DATE,
		location: Sequelize.STRING,
		timestamp: {
			type: Sequelize.DATE,
			Timestamp: true
		},
                rating: Sequelize.DOUBLE
	});

	return jobsContext;
}
