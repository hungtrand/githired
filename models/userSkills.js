var Sequelize = require("sequelize");
var database = require("./../database");
var usersContext = require("./users");
var skillsContext = require("./skills");

var userSkillsContext = database.define('userSkills', {
	userSkillId: {
		type: Sequelize.INTEGER
		, primaryKey: true
		, autoIncrement: true
		, allowNull: false
	}
	, description: Sequelize.STRING
	, yearsOfExperience: Sequelize.INTEGER
});

userSkillsContext.belongsTo(
	usersContext, 
	{ foreignKey: 'fk_userId', targetKey: 'userId' }
);

userSkillsContext.belongsTo(
	skillsContext, 
	{ foreignKey: 'fk_skillId', targetKey: 'skillId' }
);

userSkillsContext.sync();

module.exports = userSkillsContext;

