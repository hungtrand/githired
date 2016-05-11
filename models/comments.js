module.exports = function(database, Sequelize) {

	var commentsContext = database.define('comments', {
		commentId: {
			type: Sequelize.INTEGER,
			primaryKey: true, 
			autoIncrement: true,
			allowNull: false
		},
		comment: Sequelize.STRING,
		timestamp: {
			type: Sequelize.DATE,
			Timestamp: true
		}
	});

	return commentsContext;
}