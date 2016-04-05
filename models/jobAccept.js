var Sequelize = require("sequelize");
var database = require("./../database");

var jobAccept = database.define('jobAccept', {
	AcceptanceId: {
		type: Sequelize.INTEGER
		,primaryKey: true
		, autoIncrement: true
		, allowNull: false
	}
	, Amount: Sequelize.DOUBLE
	, Timestamp: {
		type: Sequelize.DATE
		, Timestamp: true
	}
	, Finalized: Sequelize.STRING

});

module.exports = jobAccept;