var Sequelize = require("sequelize");
var database = require("./../database");

var usersContext = database.define('users', {
	userId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
	}
	, firstName: Sequelize.STRING
	, lastName: Sequelize.STRING
	, company: Sequelize.STRING
	, email: Sequelize.STRING
	, password: Sequelize.STRING
	, isEmployer: Sequelize.BOOLEAN
	, isEmployee: Sequelize.BOOLEAN
});

usersContext.sync();
module.exports = usersContext;