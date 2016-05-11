var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skillsContext = require('./../models').skills;
var jobContext = require('./../models').jobs;
var commentContext = require('./../models').comments;


//view user's comments.
router.get("/:userId/Comments", function(req,res,next){
	res.setHeader('Content-Type', 'application/json');
	var userId = req.param('userId');
	var viewComments = commentContext.findAll({
		
		where: {userId: userId}

	}).then(function(comments){
		if(comments){
			res.send(JSON.stringify(comments));
		}else{
			res.send(401, JSON.stringify(comments));
		}
	}).catch(function(err){
		res.send(500, JSON.stringify(err));
	});

});


router.post("/:userId/jobs/:jobId/comments", function(req,res,next){
	var userId = req.param('userId');
	var jobId = req.param('jobId');
	var time = new Date();

	var createComments = commentContext.build({
		comments: req.body["comments"]
		,userId: userId
		, jobId: jobId
		, timestamp: time
		, updateAt: time
		, createdAt: time
	});

	createComments.save().then(function(results){
		res.send(JSON.stringify(results.dataValues));
	}).catch(function(err){
		res.send(JSON.stringify(err));
	});
});





//base path.
module.exports = function(app) {
    app.use("/api/user", router);
}
