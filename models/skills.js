module.exports = function(database, Sequelize) {
	var skillsContext = database.define('skills', {
		skillId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allwoNull: false
		},
		name: Sequelize.STRING
	});

	return skillsContext;
}