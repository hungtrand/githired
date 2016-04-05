var Sequelize = require("sequelize");
var database = require("./../database");

var commetsContext = database.define('comments', {
	CommentId: {
		type: Sequelize.INTEGER
		, primaryKey: true;
	}

});