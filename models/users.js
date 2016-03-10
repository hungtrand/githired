var Sequelize = require("sequelize");
var database = require("./../database")

var usersContext = database.define('users', {
	UserId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
	}
	, FirstName: Sequelize.STRING
	, LastName: Sequelize.STRING
	, Company: Sequelize.STRING
	, Email: Sequelize.STRING
	, Password: Sequelize.STRING
	, isEmployer: Sequelize.BOOLEAN
	, isEmployee: Sequelize.BOOLEAN
});

module.exports = usersContext;