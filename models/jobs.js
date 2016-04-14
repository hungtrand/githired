var Sequelize = require("sequelize");

var database = require("./../database");

var jobsContext = database.define('jobs', {
	jobId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	}
	, jobTitle: Sequelize.STRING
	, jobDescription: Sequelize.STRING 
	, minimumPrice: Sequelize.DOUBLE
	, maximumWage: Sequelize.DOUBLE
	, setWage: Sequelize.DOUBLE
	, jobType: Sequelize.STRING
	, position: Sequelize.STRING
	, startingDate: Sequelize.DATE
	, endDate: Sequelize.DATE
	, location: Sequelize.STRING
	, timestamp: {
		type: Sequelize.DATE
		, Timestamp: true 
	}
});

jobsContext.sync();
module.exports = jobsContext;

