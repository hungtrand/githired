var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skillsContext = require('./../models').skills;
var jobContext = require('./../models').jobs;
var commentContext = require('./../models').comments;


//view user's comments.
/**
 *  @api {get} /api/user/:userId/comments user views comments.
 *  @apiName View comments
 *  @apiGroup Comments
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view comments.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/comments
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
    	{
        "commentId": 1,
        "comment": null,
        "timestamp": "2016-05-11T02:14:09.000Z",
        "createdAt": "2016-05-11T02:14:09.000Z",
        "updatedAt": "2016-05-11T02:14:09.000Z",
        "userId": 1,
        "jobId": 1
    	}
		]
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 */
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

/**
 *  @api {post} /api/user/:userId/jobs/:jobId/comments biding amount.
 *  @apiName Post New Comments
 *  @apiGroup Comments
 *  @apiVersion 1.0.0
 *  @apiParam {String} comments user creates some new comments.
 *  @apiDescription Method Description : 
 *  Users use this method to give comments on the job.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/jobs/:jobId/comments
 *  @apiSuccess {String} comment The new comment has been created.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    	"commentId": 2,
    	"userId": "1",
    	"jobId": "2",
    	"timestamp": "2016-05-11T19:08:50.908Z",
    	"createdAt": "2016-05-11T19:08:50.908Z",
    	"updatedAt": "2016-05-11T19:08:50.000Z"
		}
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "comments": "It is a good experience working here."
 *     }
 *  
 */
router.post("/:userId/jobs/:jobId/comments", function(req,res,next){
	res.setHeader('Content-Type', 'application/json');
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
