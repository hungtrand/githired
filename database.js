var Sequelize = require("sequelize");

var connection = new Sequelize(
	'githired', 'githired', 'githired', {
		host: 'localhost',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
	}
);

module.exports = connection;