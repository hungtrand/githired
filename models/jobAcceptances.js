var Sequelize = require("sequelize");
var database = require("./../database");
var usersContext = require("./users");
var jobsContext = require("./jobs");

var jobAcceptancesContext = database.define('jobAcceptances', {
	acceptanceId: {
		type: Sequelize.INTEGER
		,primaryKey: true
		, autoIncrement: true
		, allowNull: false
	}
	, amount: Sequelize.DOUBLE
	, timestamp: {
		type: Sequelize.DATE
		, Timestamp: true
	}
	, finalized: Sequelize.BOOLEAN

});

jobAcceptancesContext.belongsTo(
	usersContext, 
	{ foreignKey: 'fk_userId', targetKey: 'userId' }
);

jobAcceptancesContext.belongsTo(
	jobsContext, 
	{ foreignKey: 'fk_jobId', targetKey: 'jobId' }
);

jobAcceptancesContext.sync();
module.exports = jobAcceptancesContext;