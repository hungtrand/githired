module.exports = function(database, Sequelize) {
	// 0 to 10 rating if a skill is important to a job
	var jobSkillsContext = database.define('jobSkills', {
		importance: Sequelize.INTEGER
	});

	return jobSkillsContext;
}