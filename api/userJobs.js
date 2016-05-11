var express = require('express');
var router = express.Router();
var userJobs = require('./../models').jobs;

/**
 *  @api {get} /api/user/:userId/userjobs user views current posted jobs.
 *  @apiName View Jobs
 *  @apiGroup User Jobs
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view currently jobs.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/userjobs
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
		"userId": 1,
		"jobId" : 1,
		"jobType" : "software engineer" 
 	}
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 */
router.get("/:userId/userjobs", function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	var id = req.param('userId');
	userJobs
		.findAll({
			where: {
				userId: id	
			},
			attributes: ['jobId', 'jobTitle', 'jobDescription'
				, 'minimumWage','maximumWage', 'jobType'
				, 'position', 'startingDate', 'endDate'
				, 'location', 'userId']
		})
		.then(function(jobs){
			if(jobs){
				res.send(JSON.stringify(jobs));
			}else{
				res.sendStatus(401);
			}
		})
		.catch(function(err){
			res.send(JSON.stringify(err));
		})

});

module.exports = router;

