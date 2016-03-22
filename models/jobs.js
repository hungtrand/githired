var Sequelize = require("sequelize");
var database = require("./../database")

var jobsContext = database.define('jobs', {
	JobId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
	}
	, JobTitle: Sequelize.STRING
	, JobDescription: Sequelize.STRING
	, MinimumWage: Sequelize.INTEGER
	, MaximumWage: Sequelize.INTEGER
});

module.exports = jobsContext;