var Sequelize = require("sequelize");
var database = require("./../database");

var skillsContext = database.define('skills', {
	SkillId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allwoNull: false
	},
	Name: Sequelize.STRING
});

module.exports = skillsContext;