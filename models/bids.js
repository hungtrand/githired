var Sequelize = require("sequelize");
var database = require("./../database");

var bids = database.define('bids', {
	BidId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
		, allowNull: false
	}
	, Amount: Sequelize.DOUBLE
	, Timestamp: {
		type: Sequelize.DATE
		, Timestamp: true;
	}


});

module.exports = bids;