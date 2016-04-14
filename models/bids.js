var Sequelize = require("sequelize");
var database = require("./../database");
var usersContext = require("./users");
var jobsContext = require("./jobs");

var bidsContext = database.define('bids', {
	bidId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
		, allowNull: false
	}
	, amount: Sequelize.DOUBLE
	, timestamp: {
		type: Sequelize.DATE
		, Timestamp: true
	}
	, 
});

bidsContext.belongsTo(
	usersContext, 
	{ foreignKey: 'fk_userId', targetKey: 'userId' }
);

bidsContext.belongsTo(
	jobsContext, 
	{ foreignKey: 'fk_jobId', targetKey: 'jobId' }
);

bidsContext.sync();

module.exports = bidsContext;