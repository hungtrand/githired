var Sequelize = require("sequelize");

var database = require("./../database");

var jobsContext = database.define('jobs', {
	JobId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	}
	, JobTitle: Sequelize.STRING
	, JobDescription: Sequelize.STRING 
	, MinimumPrice: Sequelize.DOUBLE
	, MaximumWage: Sequelize.DOUBLE
	, SetWage: Sequelize.DOUBLE
	, JobType: Sequelize.STRING
	, Position: Sequelize.STRING
	, StartingDate: Sequelize.DATE
	, EndDate: Sequelize.DATE
	, Location: Sequelize.STRING
	, Timestamp: {
		type: Sequelize.DATE
		, Timestamp: true 
	}
});

module.exports = jobsContext

