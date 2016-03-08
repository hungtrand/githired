module.exports = function() {
	var port = process.env.PORT || 80,
		host = process.env.IP || 'localhost';
		
	var connection = new Sequelize(
		'githired', 'githired', 'githired', {
			host: host,
			dialect: 'mysql',
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			},
		}
	);

	return connection;
}