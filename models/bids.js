module.exports = function(database, Sequelize) {
	var bidsContext = database.define('bids', {
		bidId: {
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
	});
	
	return bidsContext;
}