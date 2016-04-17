module.exports = function(database, Sequelize) {

	var userSkillsContext = database.define('userSkills', {
		userSkillId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		description: Sequelize.STRING,
		yearsOfExperience: Sequelize.INTEGER
	});

	return userSkillsContext;
}