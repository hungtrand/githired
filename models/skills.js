var Sequelize = require("sequelize");
var database = require("./../database");

var skillsContext = database.define('skills', {
	skillId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allwoNull: false
	},
	name: Sequelize.STRING
});

skillsContext.sync();
module.exports = skillsContext;