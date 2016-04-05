var Sequelize = require("sequelize");
var database = require("./../database");

var userSkills = database.define('userSkills', {
	UserSkillId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
		, allowNull: false
	}
	, Description: Sequelize.STRING
	, YearsOfExperiences: Sequelize.INTEGER
});

module.exports = userSkills;

