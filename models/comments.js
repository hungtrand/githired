var Sequelize = require("sequelize");
var database = require("./../database");
var usersContext = require("./users");

var commentsContext = database.define('comments', {
	commentId: {
		type: Sequelize.INTEGER
		, primaryKey: true
	}
	, comment: Sequelize.STRING
	, timestamp: {
		type: Sequelize.DATE
		, Timestamp: true
	}
});

commentsContext.belongsTo(
	usersContext, 
	{ foreignKey: 'fk_userId', targetKey: 'userId' }
);

commentsContext.sync();

module.exports = commentsContext;