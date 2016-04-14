var Sequelize = require("sequelize");
var database = require("./../database");
var usersContext = require("./users");

// 0 to 10 rating if a skill is important to a job
var jobSkillsContext = database.define('jobSkills', {
	importance: Sequelize.INTEGER
});

jobSkillsContext.belongsTo(
	usersContext, 
	{ foreignKey: 'fk_userId', targetKey: 'userId' }
);

jobSkillsContext.sync();
module.exports = jobSkillsContext;

